<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login(): void
    {
        $this->get(route('admin.dashboard', ['locale' => 'en']))
            ->assertRedirect(route('login', ['locale' => 'en']));
    }

    public function test_non_admin_is_forbidden(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('admin.dashboard', ['locale' => 'en']))
            ->assertForbidden();
    }

    public function test_admin_can_view_the_dashboard(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.dashboard', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Dashboard')
                ->has('stats')
                ->where('auth.can_access_admin', true)
                ->has('translations.admin')
            );
    }

    public function test_admin_translations_and_flag_are_not_shared_with_regular_users(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('dashboard', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page
                ->where('auth.can_access_admin', false)
                ->missing('translations.admin')
            );
    }

    public function test_is_admin_cannot_be_set_through_the_profile_form(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->patch(route('profile.update', ['locale' => 'en']), [
            'name' => $user->name,
            'email' => $user->email,
            'is_admin' => true,
        ]);

        $this->assertFalse($user->refresh()->is_admin);
    }

    public function test_make_admin_command_grants_and_revokes_access(): void
    {
        $user = User::factory()->create(['email' => 'owner@ozytech.test']);

        $this->artisan('app:make-admin', ['email' => 'owner@ozytech.test'])->assertSuccessful();
        $this->assertTrue($user->refresh()->is_admin);

        $this->artisan('app:make-admin', ['email' => 'owner@ozytech.test', '--revoke' => true])->assertSuccessful();
        $this->assertFalse($user->refresh()->is_admin);
    }

    public function test_make_admin_command_fails_for_unknown_email(): void
    {
        $this->artisan('app:make-admin', ['email' => 'nobody@ozytech.test'])->assertFailed();
    }

    public function test_admin_can_upload_an_image(): void
    {
        Storage::fake('public');

        $response = $this->actingAs(User::factory()->admin()->create())
            ->postJson(route('admin.uploads.store', ['locale' => 'en']), [
                'image' => UploadedFile::fake()->create('cover.jpg', 200, 'image/jpeg'),
            ]);

        $response->assertCreated()->assertJsonStructure(['path', 'url']);
        Storage::disk('public')->assertExists($response->json('path'));

        $this->get($response->json('url'))->assertOk();
    }

    public function test_upload_rejects_non_images(): void
    {
        Storage::fake('public');

        $this->actingAs(User::factory()->admin()->create())
            ->postJson(route('admin.uploads.store', ['locale' => 'en']), [
                'image' => UploadedFile::fake()->create('notes.pdf', 10, 'application/pdf'),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('image');
    }

    public function test_non_admin_cannot_upload(): void
    {
        Storage::fake('public');

        $this->actingAs(User::factory()->create())
            ->postJson(route('admin.uploads.store', ['locale' => 'en']), [
                'image' => UploadedFile::fake()->create('cover.jpg', 200, 'image/jpeg'),
            ])
            ->assertForbidden();
    }
}
