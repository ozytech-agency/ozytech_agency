<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class RedirectToPreferredLocaleController extends Controller
{
    /**
     * Sends the bare domain to the visitor's language, in priority order:
     * the saved preference, then the browser language (first visit only), then the default.
     *
     * The redirect happens on the server, so the first page already renders in the right
     * language with no flash or client-side reload. A detected language is saved straight
     * away, so later visits use it instead of detecting again.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $supportedLocales = config('app.supported_locales');
        $cookieName = config('app.locale_cookie');

        $savedLocale = $request->cookie($cookieName);
        $hasSavedLocale = in_array($savedLocale, $supportedLocales, true);

        $locale = $hasSavedLocale ? $savedLocale : $this->browserLocale($request, $supportedLocales);

        // The raw query string, so campaign parameters (utm_*, fbclid) reach the page untouched.
        $query = $request->server('QUERY_STRING');
        $response = redirect()->to('/'.$locale.($query ? '?'.$query : ''), 302)
            ->header('Cache-Control', 'private, no-store')
            ->header('Vary', 'Accept-Language, Cookie');

        if (! $hasSavedLocale) {
            // Not httpOnly: the language switcher rewrites it from JavaScript.
            $response->withCookie(Cookie::make($cookieName, $locale, 60 * 24 * 365, httpOnly: false, sameSite: 'lax'));
        }

        return $response;
    }

    /**
     * The best supported match for the browser's Accept-Language header ("fr-FR" matches "fr"),
     * or the default locale when nothing matches or no header was sent.
     *
     * @param  list<string>  $supportedLocales
     */
    private function browserLocale(Request $request, array $supportedLocales): string
    {
        $defaultLocale = config('app.locale');

        if (! $request->headers->has('Accept-Language')) {
            return $defaultLocale;
        }

        // Symfony returns the first entry when nothing matches, so the default goes first.
        $candidates = array_values(array_unique([$defaultLocale, ...$supportedLocales]));

        return $request->getPreferredLanguage($candidates) ?? $defaultLocale;
    }
}
