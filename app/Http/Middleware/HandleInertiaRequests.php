<?php

namespace App\Http\Middleware;

use App\Support\ServiceCatalog;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * The translation files shared with every page.
     *
     * @var list<string>
     */
    protected array $translationNamespaces = [
        'nav', 'footer', 'home', 'about', 'blog', 'packages', 'contact', 'start_a_project', 'services', 'policies', 'auth_pages', 'faq', 'dashboard', 'profile',
    ];

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $canAccessAdmin = (bool) $request->user()?->can('access-admin');

        $namespaces = $canAccessAdmin
            ? [...$this->translationNamespaces, 'admin']
            : $this->translationNamespaces;

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'can_access_admin' => $canAccessAdmin,
            ],
            'locale' => app()->getLocale(),
            'available_locales' => ['en', 'ar', 'fr', 'es'],
            // Only consumed by the SSR entry point (resources/js/ssr.jsx), which has
            // no access to the @routes Blade script that defines route()/Ziggy for
            // the browser. The browser already gets routes from that script, so this
            // is otherwise redundant in the page payload.
            'ziggy' => fn () => [...(new Ziggy)->toArray(), 'location' => $request->url()],
            'appUrl' => rtrim(config('app.url'), '/'),
            'currentPath' => '/'.ltrim($request->path(), '/'),
            'translations' => collect($namespaces)
                ->mapWithKeys(fn (string $namespace) => [$namespace => __($namespace)])
                ->all(),
            'nav' => fn () => ServiceCatalog::nav(),
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
            ],
        ];
    }
}
