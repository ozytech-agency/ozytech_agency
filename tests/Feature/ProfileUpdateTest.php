<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_name_email_and_phone(): void
    {
        $user = User::factory()->create(['phone_number' => '+212600000000']);

        $response = $this->actingAs($user)->patch(route('profile.update', ['locale' => 'en']), [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'phone_number' => '+212611111111',
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit', ['locale' => 'en']));

        $user->refresh();
        $this->assertSame('Updated Name', $user->name);
        $this->assertSame('updated@example.com', $user->email);
        $this->assertSame('+212611111111', $user->phone_number);
    }

    public function test_changing_phone_number_resets_phone_verification(): void
    {
        $user = User::factory()->create([
            'phone_number' => '+212600000000',
            'phone_verified_at' => now(),
        ]);

        $this->actingAs($user)->patch(route('profile.update', ['locale' => 'en']), [
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => '+212622222222',
        ])->assertSessionHasNoErrors();

        $user->refresh();
        $this->assertNull($user->phone_verified_at);
    }

    public function test_leaving_phone_number_unchanged_keeps_verification(): void
    {
        $user = User::factory()->create([
            'phone_number' => '+212600000000',
            'phone_verified_at' => now(),
        ]);

        $this->actingAs($user)->patch(route('profile.update', ['locale' => 'en']), [
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => '+212600000000',
        ])->assertSessionHasNoErrors();

        $this->assertNotNull($user->refresh()->phone_verified_at);
    }

    public function test_duplicate_phone_number_fails_validation(): void
    {
        User::factory()->create(['phone_number' => '+212633333333']);
        $user = User::factory()->create(['phone_number' => '+212600000000']);

        $response = $this->actingAs($user)->patch(route('profile.update', ['locale' => 'en']), [
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => '+212633333333',
        ]);

        $response->assertSessionHasErrors('phone_number');
    }

    public function test_phone_number_is_required(): void
    {
        $user = User::factory()->create(['phone_number' => '+212600000000']);

        $response = $this->actingAs($user)->patch(route('profile.update', ['locale' => 'en']), [
            'name' => $user->name,
            'email' => $user->email,
            'phone_number' => '',
        ]);

        $response->assertSessionHasErrors('phone_number');
    }
}
