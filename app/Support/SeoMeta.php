<?php

namespace App\Support;

/**
 * Server-side copy of the <head> tags that resources/js/Components/Seo.jsx
 * renders. app.blade.php prints it only when Inertia SSR did not run, so
 * crawlers that don't execute JavaScript still get the page's metadata.
 */
class SeoMeta
{
    /**
     * @var list<string>
     */
    private const LOCALES = ['en', 'ar', 'fr', 'es'];

    /**
     * Keep in sync with organizationJsonLd in resources/js/Layouts/SiteLayout.jsx.
     *
     * @var list<string>
     */
    private const SAME_AS = [
        'https://github.com/ozytech-agency',
        'https://www.instagram.com/ozytechaagency',
        'https://web.facebook.com/profile.php?id=61594837992868',
        'https://www.tiktok.com/@ozytech_agency',
    ];

    /**
     * @param  string  $path  Path after the locale segment, e.g. "/about".
     * @param  list<array{name: string, path: string}>  $breadcrumbs
     * @return array{title: string, description: string, canonical: string, image: string, alternates: array<string, string>, jsonLd: array<string, array<string, mixed>>}
     */
    public static function forPage(string $path, string $title, string $description, array $breadcrumbs = [], ?string $image = null): array
    {
        $base = rtrim(config('app.url'), '/');
        $locale = app()->getLocale();
        $urlFor = fn (string $loc): string => $base.'/'.$loc.($path === '/' ? '' : $path);
        $homeUrl = $base.'/'.$locale;

        $jsonLd = [
            'organization-json-ld' => [
                '@context' => 'https://schema.org',
                '@type' => 'Organization',
                'name' => 'Ozytech Agency',
                'url' => $base,
                'logo' => $base.'/images/logo.png',
                'sameAs' => self::SAME_AS,
            ],
        ];

        if ($breadcrumbs !== []) {
            $jsonLd['breadcrumb-json-ld'] = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => __('nav.home'), 'item' => $homeUrl],
                    ...array_map(fn (array $crumb, int $i): array => [
                        '@type' => 'ListItem',
                        'position' => $i + 2,
                        'name' => $crumb['name'],
                        'item' => $homeUrl.$crumb['path'],
                    ], $breadcrumbs, array_keys($breadcrumbs)),
                ],
            ];
        }

        return [
            'title' => $title,
            'description' => $description,
            'canonical' => $urlFor($locale),
            'image' => $image ?? $base.'/images/logo.png',
            'alternates' => [
                ...array_combine(self::LOCALES, array_map($urlFor, self::LOCALES)),
                'x-default' => $urlFor('en'),
            ],
            'jsonLd' => $jsonLd,
        ];
    }
}
