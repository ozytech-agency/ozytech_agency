<?php

namespace App\Support;

use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

/**
 * Sends SMS messages (currently just the phone verification OTP) via Twilio.
 *
 * Falls back to logging the message when Twilio isn't configured, so local
 * development and tests never need real credentials or hit the network.
 */
class Sms
{
    public static function configured(): bool
    {
        return filled(config('services.twilio.sid'))
            && filled(config('services.twilio.auth_token'))
            && filled(config('services.twilio.from'));
    }

    public static function send(string $to, string $message): void
    {
        if (! self::configured()) {
            Log::info("SMS to {$to}: {$message}");

            return;
        }

        (new Client(config('services.twilio.sid'), config('services.twilio.auth_token')))
            ->messages
            ->create(self::normalize($to), [
                'from' => config('services.twilio.from'),
                'body' => $message,
            ]);
    }

    /**
     * Strip everything but digits and a leading "+", since numbers captured
     * from the registration form may contain spaces, dashes or parentheses.
     */
    private static function normalize(string $number): string
    {
        return preg_replace('/(?!^\+)[^\d]/', '', $number);
    }
}
