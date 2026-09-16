<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class PhoneVerificationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function registrationPayload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '+212612345678',
            'password' => 'password',
            'password_confirmation' => 'password',
        ], $overrides);
    }

    public function test_registration_requires_phone_number(): void
    {
        $response = $this->post(route('register', ['locale' => 'en']), $this->registrationPayload(['phone_number' => '']));

        $response->assertSessionHasErrors('phone_number');
    }

    public function test_registration_requires_unique_phone_number(): void
    {
        User::factory()->create(['phone_number' => '+212612345678']);

        $response = $this->post(route('register', ['locale' => 'en']), $this->registrationPayload(['email' => 'other@example.com']));

        $response->assertSessionHasErrors('phone_number');
    }

    public function test_new_user_can_register_with_phone_number(): void
    {
        $response = $this->post(route('register', ['locale' => 'en']), $this->registrationPayload());

        $response->assertRedirect(route('dashboard', ['locale' => 'en']));
        $this->assertAuthenticated();

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $this->assertSame('+212612345678', $user->phone_number);
        $this->assertNull($user->phone_verified_at);
    }

    /**
     * Submit the "send code" action and return the raw OTP code captured from the log.
     */
    private function sendAndCaptureCode(User $user): string
    {
        Log::spy();

        $this->actingAs($user)->post(route('phone-verification.send', ['locale' => 'en']));

        $capturedCode = null;
        Log::shouldHaveReceived('info')->once()->withArgs(function (string $message) use (&$capturedCode) {
            preg_match('/(\d{6})$/', $message, $matches);
            $capturedCode = $matches[1] ?? null;

            return true;
        });

        $this->assertNotNull($capturedCode);

        return $capturedCode;
    }

    public function test_send_generates_and_logs_an_otp_code(): void
    {
        $user = User::factory()->create(['phone_number' => '+212612345678']);

        $this->sendAndCaptureCode($user);

        $user->refresh();
        $this->assertNotNull($user->phone_otp_code);
        $this->assertNotNull($user->phone_otp_expires_at);
    }

    public function test_confirm_verifies_phone_with_correct_code(): void
    {
        $user = User::factory()->create(['phone_number' => '+212612345678']);
        $code = $this->sendAndCaptureCode($user);

        $response = $this->actingAs($user)->post(route('phone-verification.confirm', ['locale' => 'en']), [
            'code' => $code,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('dashboard', ['locale' => 'en']));

        $user->refresh();
        $this->assertNotNull($user->phone_verified_at);
        $this->assertNull($user->phone_otp_code);
        $this->assertNull($user->phone_otp_expires_at);
    }

    public function test_confirm_rejects_wrong_code(): void
    {
        $user = User::factory()->create(['phone_number' => '+212612345678']);
        $this->sendAndCaptureCode($user);

        $response = $this->actingAs($user)->post(route('phone-verification.confirm', ['locale' => 'en']), [
            'code' => '000000',
        ]);

        $response->assertSessionHasErrors('code');
        $this->assertNull($user->refresh()->phone_verified_at);
    }

    public function test_confirm_rejects_expired_code(): void
    {
        $user = User::factory()->create(['phone_number' => '+212612345678']);
        $code = $this->sendAndCaptureCode($user);

        $user->forceFill(['phone_otp_expires_at' => now()->subMinute()])->save();

        $response = $this->actingAs($user)->post(route('phone-verification.confirm', ['locale' => 'en']), [
            'code' => $code,
        ]);

        $response->assertSessionHasErrors('code');
        $this->assertNull($user->refresh()->phone_verified_at);
    }
}
