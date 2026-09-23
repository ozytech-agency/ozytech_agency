<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Contracts\Provider;
use Laravel\Socialite\Contracts\User as SocialiteUserContract;
use Laravel\Socialite\Facades\Socialite;
use Mockery;
use RuntimeException;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    private function fakeGoogleUser(string $id, string $email, ?string $name = 'Amina Benali'): SocialiteUserContract
    {
        $googleUser = Mockery::mock(SocialiteUserContract::class);
        $googleUser->shouldReceive('getId')->andReturn($id);
        $googleUser->shouldReceive('getEmail')->andReturn($email);
        $googleUser->shouldReceive('getName')->andReturn($name);
        $googleUser->shouldReceive('getNickname')->andReturn(null);

        return $googleUser;
    }

    private function mockSocialiteUser(SocialiteUserContract $googleUser): void
    {
        $provider = Mockery::mock(Provider::class);
        $provider->shouldReceive('user')->andReturn($googleUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);
    }

    public function test_redirect_route_sends_the_user_to_google(): void
    {
        $response = $this->get(route('google.login'));

        $response->assertRedirect();
        $this->assertStringContainsString('accounts.google.com', $response->headers->get('Location'));
    }

    public function test_existing_user_is_matched_by_email_instead_of_duplicated(): void
    {
        $user = User::factory()->create([
            'email' => 'amina@company.com',
            'password' => Hash::make('original-password'),
            'google_id' => null,
            'email_verified_at' => null,
        ]);
        $this->mockSocialiteUser($this->fakeGoogleUser('google-123', 'amina@company.com'));

        $response = $this->get(route('google.callback'));

        $this->assertDatabaseCount('users', 1);
        $this->assertAuthenticatedAs($user->fresh());
        $response->assertRedirect(route('dashboard', ['locale' => 'en']));

        $user->refresh();
        $this->assertSame('google-123', $user->google_id);
        $this->assertNotNull($user->email_verified_at);
        $this->assertTrue(Hash::check('original-password', $user->password));
    }

    public function test_new_user_is_created_from_google_profile(): void
    {
        $this->mockSocialiteUser($this->fakeGoogleUser('google-456', 'new.person@company.com', 'New Person'));

        $response = $this->get(route('google.callback'));

        $this->assertDatabaseCount('users', 1);
        $user = User::where('email', 'new.person@company.com')->firstOrFail();
        $this->assertSame('google-456', $user->google_id);
        $this->assertSame('New Person', $user->name);
        $this->assertNotNull($user->email_verified_at);
        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', ['locale' => 'en']));
    }

    public function test_repeat_google_login_does_not_create_a_duplicate_user(): void
    {
        $this->mockSocialiteUser($this->fakeGoogleUser('google-789', 'repeat@company.com'));
        $this->get(route('google.callback'));
        $this->post(route('logout', ['locale' => 'en']));

        $this->mockSocialiteUser($this->fakeGoogleUser('google-789', 'repeat@company.com'));
        $response = $this->get(route('google.callback'));

        $this->assertDatabaseCount('users', 1);
        $response->assertRedirect(route('dashboard', ['locale' => 'en']));
    }

    public function test_oauth_failure_redirects_back_to_login_with_a_safe_message(): void
    {
        $provider = Mockery::mock(Provider::class);
        $provider->shouldReceive('user')->andThrow(new RuntimeException('invalid_client'));
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get(route('google.callback'));

        $this->assertGuest();
        $this->assertDatabaseCount('users', 0);
        $response->assertRedirect(route('login', ['locale' => 'en']));
        $response->assertSessionHas('status');
        $this->assertStringNotContainsString('invalid_client', session('status'));
    }

    public function test_missing_email_from_google_redirects_back_to_login_with_a_safe_message(): void
    {
        $this->mockSocialiteUser($this->fakeGoogleUser('google-000', ''));

        $response = $this->get(route('google.callback'));

        $this->assertGuest();
        $this->assertDatabaseCount('users', 0);
        $response->assertRedirect(route('login', ['locale' => 'en']));
    }
}
