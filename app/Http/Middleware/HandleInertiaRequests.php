<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

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
            'translations' => collect($namespaces)
                ->mapWithKeys(fn (string $namespace) => [$namespace => __($namespace)])
                ->all(),
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
            ],
        ];
    }
}
