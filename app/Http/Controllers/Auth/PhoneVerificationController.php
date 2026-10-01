<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Support\Sms;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PhoneVerificationController extends Controller
{
    /**
     * Display the phone verification prompt.
     */
    public function notice(Request $request): RedirectResponse|Response
    {
        return $request->user()->phone_verified_at
            ? redirect()->intended(route('dashboard', absolute: false))
            : Inertia::render('Auth/VerifyPhone', ['status' => session('status')]);
    }

    /**
     * Generate a new phone verification code and text it via Twilio.
     */
    public function send(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->phone_verified_at) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $code = (string) random_int(100000, 999999);

        $user->forceFill([
            'phone_otp_code' => Hash::make($code),
            'phone_otp_expires_at' => now()->addMinutes(10),
        ])->save();

        if (Sms::configured()) {
            Sms::send($user->phone_number, __('auth_pages.verify_phone.sms_body', ['code' => $code]));
        } else {
            // Dev-mode delivery: no SMS provider is configured, so the code is
            // logged instead of texted.
            Log::info("Phone verification code for user #{$user->id} ({$user->phone_number}): {$code}");
        }

        return back()->with('status', 'phone-verification-code-sent');
    }

    /**
     * Confirm a phone verification code.
     *
     * @throws ValidationException
     */
    public function confirm(Request $request): RedirectResponse
    {
        $request->validate(['code' => ['required', 'string']]);

        $user = $request->user();

        if (
            ! $user->phone_otp_code
            || ! $user->phone_otp_expires_at
            || $user->phone_otp_expires_at->isPast()
            || ! Hash::check($request->string('code'), $user->phone_otp_code)
        ) {
            throw ValidationException::withMessages([
                'code' => 'The provided code is invalid or has expired.',
            ]);
        }

        $user->forceFill([
            'phone_verified_at' => now(),
            'phone_otp_code' => null,
            'phone_otp_expires_at' => null,
        ])->save();

        return redirect(route('dashboard', absolute: false))->with('status', 'phone-verified');
    }
}
