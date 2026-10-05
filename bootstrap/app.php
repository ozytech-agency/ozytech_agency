<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(
            prepend: [
                SetLocale::class,
            ],
            append: [
                HandleInertiaRequests::class,
                AddLinkHeadersForPreloadedAssets::class,
            ],
        );

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        // A branded error page (with a title, H1 and a way back to the site)
        // instead of a bare "Not Found"/"Server Error" page, for the status
        // codes a visitor can actually hit while browsing.
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $status = $response->getStatusCode();

            if (app()->hasDebugModeEnabled() || ! in_array($status, [404, 403, 500, 503], true)) {
                return $response;
            }

            if ($request->is('api/*') || $request->expectsJson()) {
                return $response;
            }

            // A 404 for an unmatched route never reaches the 'web' middleware
            // group (routing fails before it runs), so SetLocale, StartSession
            // and HandleInertiaRequests never ran. Without them, the Error
            // page (and its SSR render, which rebuilds Ziggy from the shared
            // `ziggy` prop) has nothing to work with, and
            // HandleInertiaRequests::share() itself reads $request->session()
            // for flash messages. Replicate just enough of that setup here.
            $locale = in_array($request->segment(1), ['en', 'ar', 'fr', 'es'], true)
                ? $request->segment(1)
                : app()->getLocale();
            app()->setLocale($locale);
            URL::defaults(['locale' => $locale]);

            if (! $request->hasSession()) {
                $request->setLaravelSession(app('session')->driver());
            }

            Inertia::share(app(HandleInertiaRequests::class)->share($request));

            return Inertia::render('Error', ['status' => $status])
                ->toResponse($request)
                ->setStatusCode($status);
        });
    })->create();
