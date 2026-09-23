<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class GoogleController extends Controller
{
    /**
     * Send the user to Google's OAuth consent screen.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google's callback: find or create the local account, then log the user in.
     *
     * Existing email/password accounts are matched by email and linked rather
     * than duplicated; their password is never touched.
     */
    public function callback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable $e) {
            Log::warning('Google OAuth sign-in failed.', ['error' => $e->getMessage()]);

            return redirect()->route('login')->with('status', __('Unable to sign in with Google. Please try again.'));
        }

        if (blank($googleUser->getEmail())) {
            Log::warning('Google OAuth sign-in returned no email address.');

            return redirect()->route('login')->with('status', __('Unable to sign in with Google. Please try again.'));
        }

        $user = $this->findOrCreateUser($googleUser);

        Auth::login($user, remember: true);

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Match an existing account by Google ID or email, or create a new one.
     * Existing accounts are linked to the Google ID without touching their password.
     */
    private function findOrCreateUser(SocialiteUser $googleUser): User
    {
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        if ($user) {
            $user->fill([
                'google_id' => $user->google_id ?: $googleUser->getId(),
                // Google already verified this mailbox, so an unverified local
                // account can be unblocked from the 'verified' middleware.
                'email_verified_at' => $user->email_verified_at ?: now(),
            ])->save();

            return $user;
        }

        return User::create([
            'name' => $googleUser->getName() ?: $googleUser->getNickname() ?: Str::before($googleUser->getEmail(), '@'),
            'email' => $googleUser->getEmail(),
            'google_id' => $googleUser->getId(),
            // Google-only accounts still need a password to satisfy the
            // column's NOT NULL constraint; it is random and never shared, so
            // this user can only ever sign in through Google unless they use
            // "forgot password" to set a real one.
            'password' => Hash::make(Str::random(40)),
            'email_verified_at' => now(),
        ]);
    }
}
