<?php

namespace Tests\Feature;

use App\Jobs\RemoveProjectRequestFromGoogleSheet;
use App\Jobs\SendProjectRequestToGoogleSheet;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use RuntimeException;
use Tests\TestCase;

class InquiryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'topic' => 'new-project',
            'first_name' => 'Amina',
            'last_name' => 'Benali',
            'email' => 'amina@company.com',
            'phone' => '+212612345678',
            'company' => 'Acme Inc.',
            'domain_name' => 'acme.com',
            'role' => 'VP Engineering',
            'work_area' => 'Technology & SaaS',
            'package' => 'pro',
            'message' => 'We need help building a new customer portal.',
            'referral' => 'Search engine',
            'nda_requested' => true,
            'consent' => true,
        ], $overrides);
    }

    public function test_guest_is_redirected_to_login_when_visiting_start_a_project(): void
    {
        $this->get(route('start-a-project', ['locale' => 'en']))
            ->assertRedirect(route('login', ['locale' => 'en']));
    }

    public function test_guest_cannot_submit_inquiry(): void
    {
        $response = $this->post(route('start-a-project.store', ['locale' => 'en']), $this->payload());

        $response->assertRedirect(route('login', ['locale' => 'en']));
        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_authenticated_user_can_view_start_a_project(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('start-a-project', ['locale' => 'en']))
            ->assertOk();
    }

    public function test_inquiry_identity_fields_come_from_the_account_not_the_request(): void
    {
        $user = User::factory()->create([
            'name' => 'Real Person Name',
            'email' => 'real@example.com',
            'phone_number' => '+212611111111',
        ]);

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload([
                'first_name' => 'Spoofed',
                'last_name' => 'Name',
                'email' => 'spoofed@example.com',
                'phone' => '+1 999',
            ]))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('inquiries', [
            'user_id' => $user->id,
            'first_name' => 'Real',
            'last_name' => 'Person Name',
            'email' => 'real@example.com',
            'phone' => '+212611111111',
        ]);
    }

    public function test_single_word_account_name_is_accepted(): void
    {
        $user = User::factory()->create(['name' => 'Madonna']);

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('inquiries', ['user_id' => $user->id, 'first_name' => 'Madonna', 'last_name' => '']);
    }

    public function test_topic_is_required(): void
    {
        $response = $this->actingAs(User::factory()->create())
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['topic' => '']));

        $response->assertSessionHasErrors('topic');
    }

    public function test_domain_name_is_normalised_to_a_bare_host(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['domain_name' => 'https://www.Acme.com/about?x=1']))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('inquiries', ['user_id' => $user->id, 'domain_name' => 'acme.com', 'work_area' => 'Technology & SaaS']);
    }

    public function test_role_and_work_area_are_optional(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['role' => '', 'work_area' => '']))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('inquiries', ['user_id' => $user->id, 'role' => null, 'work_area' => null]);
    }

    public function test_domain_name_must_look_like_a_domain(): void
    {
        $response = $this->actingAs(User::factory()->create())
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['domain_name' => 'not a domain']));

        $response->assertSessionHasErrors('domain_name');
    }

    public function test_consent_must_be_accepted(): void
    {
        $response = $this->actingAs(User::factory()->create())
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['consent' => false]));

        $response->assertSessionHasErrors('consent');
    }

    public function test_selected_package_is_persisted(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['package' => 'ultimate']));

        $this->assertSame('ultimate', Inquiry::query()->where('user_id', $user->id)->firstOrFail()->package);
    }

    public function test_package_is_optional(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['package' => '']))
            ->assertSessionHasNoErrors();

        $this->assertNull(Inquiry::query()->where('user_id', $user->id)->firstOrFail()->package);
    }

    public function test_unknown_package_is_rejected(): void
    {
        $response = $this->actingAs(User::factory()->create())
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['package' => 'platinum']));

        $response->assertSessionHasErrors('package');
    }

    public function test_new_project_request_is_queued_for_the_google_sheet(): void
    {
        Queue::fake();
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload());

        Queue::assertPushed(
            SendProjectRequestToGoogleSheet::class,
            fn (SendProjectRequestToGoogleSheet $job) => $job->inquiry->user_id === $user->id,
        );
    }

    public function test_other_topics_are_not_sent_to_the_google_sheet(): void
    {
        Queue::fake();

        $this->actingAs(User::factory()->create())
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['topic' => 'support']));

        Queue::assertNothingPushed();
    }

    public function test_invalid_submission_is_not_sent_to_the_google_sheet(): void
    {
        Queue::fake();

        $this->actingAs(User::factory()->create())
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['consent' => false]));

        Queue::assertNothingPushed();
    }

    public function test_google_sheet_job_posts_the_project_request_to_the_webhook(): void
    {
        config([
            'services.google_sheets.webhook_url' => 'https://script.google.com/macros/s/test/exec',
            'services.google_sheets.secret' => 'top-secret',
        ]);
        Http::fake(['script.google.com/*' => Http::response(['ok' => true])]);
        $inquiry = Inquiry::factory()->create([
            'first_name' => 'Amina',
            'last_name' => 'Benali',
            'email' => 'amina@company.com',
            'phone' => '+212612345678',
            'company' => 'Acme Inc.',
            'domain_name' => 'acme.com',
            'work_area' => 'Technology & SaaS',
            'package' => 'pro',
            'message' => 'We need a portal.',
        ]);

        (new SendProjectRequestToGoogleSheet($inquiry))->handle();

        Http::assertSent(fn (Request $request) => $request->url() === 'https://script.google.com/macros/s/test/exec'
            && $request['secret'] === 'top-secret'
            && $request['request_id'] === $inquiry->id
            && $request['submitted_at'] === $inquiry->created_at->toDateString()
            && $request['full_name'] === 'Amina Benali'
            && $request['email'] === 'amina@company.com'
            && $request['phone'] === '+212612345678'
            && $request['company'] === 'Acme Inc.'
            && $request['domain_name'] === 'acme.com'
            && $request['work_area'] === 'Technology & SaaS'
            && $request['package'] === 'Pro'
            && $request['message'] === 'We need a portal.');
    }

    public function test_google_sheet_job_does_nothing_without_a_webhook_url(): void
    {
        config(['services.google_sheets.webhook_url' => '']);
        Http::fake();

        (new SendProjectRequestToGoogleSheet(Inquiry::factory()->create()))->handle();

        Http::assertNothingSent();
    }

    public function test_google_sheet_job_fails_when_the_webhook_rejects_the_request(): void
    {
        config(['services.google_sheets.webhook_url' => 'https://script.google.com/macros/s/test/exec']);
        Http::fake(['script.google.com/*' => Http::response(['ok' => false, 'error' => 'unauthorized'])]);

        $this->expectException(RuntimeException::class);

        (new SendProjectRequestToGoogleSheet(Inquiry::factory()->create()))->handle();
    }

    public function test_google_sheet_job_fails_when_the_webhook_is_down(): void
    {
        config(['services.google_sheets.webhook_url' => 'https://script.google.com/macros/s/test/exec']);
        Http::fake(['script.google.com/*' => Http::response('boom', 500)]);

        $this->expectException(RequestException::class);

        (new SendProjectRequestToGoogleSheet(Inquiry::factory()->create()))->handle();
    }

    public function test_owner_can_delete_their_own_inquiry(): void
    {
        $user = User::factory()->create();
        $inquiry = Inquiry::factory()->for($user)->create();

        $this->actingAs($user)
            ->delete(route('dashboard.requests.destroy', ['locale' => 'en', 'inquiry' => $inquiry]))
            ->assertRedirect(route('dashboard', ['locale' => 'en']));

        $this->assertDatabaseMissing('inquiries', ['id' => $inquiry->id]);
    }

    public function test_user_cannot_delete_another_users_inquiry(): void
    {
        $inquiry = Inquiry::factory()->create();

        $this->actingAs(User::factory()->create())
            ->delete(route('dashboard.requests.destroy', ['locale' => 'en', 'inquiry' => $inquiry]))
            ->assertForbidden();

        $this->assertDatabaseHas('inquiries', ['id' => $inquiry->id]);
    }

    public function test_guest_cannot_delete_an_inquiry(): void
    {
        $inquiry = Inquiry::factory()->create();

        $this->delete(route('dashboard.requests.destroy', ['locale' => 'en', 'inquiry' => $inquiry]))
            ->assertRedirect(route('login', ['locale' => 'en']));

        $this->assertDatabaseHas('inquiries', ['id' => $inquiry->id]);
    }

    public function test_deleting_a_new_project_request_is_queued_for_removal_from_the_google_sheet(): void
    {
        Queue::fake();
        $user = User::factory()->create();
        $inquiry = Inquiry::factory()->for($user)->create(['topic' => 'new-project']);

        $this->actingAs($user)
            ->delete(route('dashboard.requests.destroy', ['locale' => 'en', 'inquiry' => $inquiry]));

        Queue::assertPushed(
            RemoveProjectRequestFromGoogleSheet::class,
            fn (RemoveProjectRequestFromGoogleSheet $job) => $job->inquiry->id === $inquiry->id,
        );
    }

    public function test_deleting_a_non_new_project_request_does_not_touch_the_google_sheet(): void
    {
        Queue::fake();
        $user = User::factory()->create();
        $inquiry = Inquiry::factory()->for($user)->create(['topic' => 'support']);

        $this->actingAs($user)
            ->delete(route('dashboard.requests.destroy', ['locale' => 'en', 'inquiry' => $inquiry]));

        Queue::assertNothingPushed();
    }

    public function test_google_sheet_removal_job_posts_the_request_id_to_the_webhook(): void
    {
        config([
            'services.google_sheets.webhook_url' => 'https://script.google.com/macros/s/test/exec',
            'services.google_sheets.secret' => 'top-secret',
        ]);
        Http::fake(['script.google.com/*' => Http::response(['ok' => true])]);
        $inquiry = Inquiry::factory()->create();

        (new RemoveProjectRequestFromGoogleSheet($inquiry))->handle();

        Http::assertSent(fn (Request $request) => $request->url() === 'https://script.google.com/macros/s/test/exec'
            && $request['secret'] === 'top-secret'
            && $request['action'] === 'remove'
            && $request['request_id'] === $inquiry->id);
    }

    public function test_google_sheet_removal_job_does_nothing_without_a_webhook_url(): void
    {
        config(['services.google_sheets.webhook_url' => '']);
        Http::fake();

        (new RemoveProjectRequestFromGoogleSheet(Inquiry::factory()->create()))->handle();

        Http::assertNothingSent();
    }

    public function test_google_sheet_removal_job_fails_when_the_webhook_rejects_the_request(): void
    {
        config(['services.google_sheets.webhook_url' => 'https://script.google.com/macros/s/test/exec']);
        Http::fake(['script.google.com/*' => Http::response(['ok' => false, 'error' => 'not found'])]);

        $this->expectException(RuntimeException::class);

        (new RemoveProjectRequestFromGoogleSheet(Inquiry::factory()->create()))->handle();
    }

    public function test_google_sheet_removal_job_fails_when_the_webhook_is_down(): void
    {
        config(['services.google_sheets.webhook_url' => 'https://script.google.com/macros/s/test/exec']);
        Http::fake(['script.google.com/*' => Http::response('boom', 500)]);

        $this->expectException(RequestException::class);

        (new RemoveProjectRequestFromGoogleSheet(Inquiry::factory()->create()))->handle();
    }
}
