<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
            'website' => 'https://acme.com',
            'role' => 'VP Engineering',
            'company_size' => '11–50',
            'services' => ['Full Stack Web', 'Mobile Apps'],
            'budget' => '$25k – $75k',
            'timeline' => 'Within 1 month',
            'message' => 'We need help building a new customer portal.',
            'referral' => 'Search engine',
            'nda_requested' => true,
            'consent' => true,
        ], $overrides);
    }

    public function test_guest_can_submit_inquiry(): void
    {
        $response = $this->post(route('start-a-project.store', ['locale' => 'en']), $this->payload());

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('start-a-project', ['locale' => 'en']));

        $this->assertDatabaseHas('inquiries', [
            'email' => 'amina@company.com',
            'user_id' => null,
        ]);
    }

    public function test_authenticated_users_inquiry_is_linked_to_their_account(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('start-a-project.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('inquiries', [
            'email' => 'amina@company.com',
            'user_id' => $user->id,
        ]);
    }

    public function test_topic_is_required(): void
    {
        $response = $this->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['topic' => '']));

        $response->assertSessionHasErrors('topic');
    }

    public function test_email_must_be_valid(): void
    {
        $response = $this->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['email' => 'not-an-email']));

        $response->assertSessionHasErrors('email');
    }

    public function test_consent_must_be_accepted(): void
    {
        $response = $this->post(route('start-a-project.store', ['locale' => 'en']), $this->payload(['consent' => false]));

        $response->assertSessionHasErrors('consent');
    }

    public function test_services_are_persisted_as_an_array(): void
    {
        $this->post(route('start-a-project.store', ['locale' => 'en']), $this->payload());

        $inquiry = Inquiry::query()->where('email', 'amina@company.com')->firstOrFail();

        $this->assertSame(['Full Stack Web', 'Mobile Apps'], $inquiry->services);
    }
}
