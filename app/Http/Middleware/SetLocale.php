<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * @var list<string>
     */
    protected array $supportedLocales = ['en', 'ar', 'fr', 'es'];

    /**
     * Handle an incoming request.
     *
     * Reads the locale from the first URL segment directly (rather than the
     * route parameter) because this middleware runs as global "web"
     * middleware, before routing has resolved the {locale} parameter, so
     * that translations shared with Inertia already reflect the requested
     * locale.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        if (! in_array($locale, $this->supportedLocales, true)) {
            $locale = app()->getLocale();
        }

        App::setLocale($locale);
        URL::defaults(['locale' => $locale]);

        return $next($request);
    }
}
