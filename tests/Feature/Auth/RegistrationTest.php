<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '+212612345678',
            'password' => 'password',
            'password_confirmation' => 'password',
        ], $overrides);
    }

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get(route('register', ['locale' => 'en']));

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post(route('register', ['locale' => 'en']), $this->payload());

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', ['locale' => 'en']));
    }

    public function test_registration_requires_phone_number(): void
    {
        $response = $this->post(route('register', ['locale' => 'en']), $this->payload(['phone_number' => '']));

        $response->assertSessionHasErrors('phone_number');
    }

    public function test_registration_requires_unique_phone_number(): void
    {
        User::factory()->create(['phone_number' => '+212612345678']);

        $response = $this->post(route('register', ['locale' => 'en']), $this->payload(['email' => 'other@example.com']));

        $response->assertSessionHasErrors('phone_number');
    }

    public function test_new_user_can_register_with_phone_number(): void
    {
        $response = $this->post(route('register', ['locale' => 'en']), $this->payload());

        $response->assertRedirect(route('dashboard', ['locale' => 'en']));
        $this->assertAuthenticated();

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $this->assertSame('+212612345678', $user->phone_number);
    }
}
