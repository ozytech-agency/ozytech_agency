<?php

namespace App\Support;

class ServiceCatalog
{
    /**
     * @var list<string>
     */
    private const SLUGS = [
        'software-development',
        'mobile-apps',
        'mvp-development',
        'llc-incorporation',
        'web-development',
        'cms-development',
        'shopify-store-development',
        'payment-solutions',
        'cloud-management',
        'cloud-migration',
        'it-infrastructure',
        'cyber-security',
        'consulting-training',
        'remote-team',
        'data-refinement',
        'localization',
        'ecommerce',
        'ui-ux-design',
        'seo-optimization',
        'website-maintenance',
    ];

    /**
     * Curated Unsplash photo ids for each service's work gallery. Images
     * aren't user-facing copy, so they live here rather than in the
     * translation files.
     *
     * @var array<string, list<string>>
     */
    private const GALLERIES = [
        'software-development' => ['1544197150-b99a580bb7a8', '1558494949-ef010cbdcc31', '1551288049-bebda4e38f71'],
        'mobile-apps' => ['1512941937669-90a1b58e7e9c', '1519389950473-47ba0277781c', '1600880292203-757bb62b4baf'],
        'mvp-development' => ['1519389950473-47ba0277781c', '1561070791-2526d30994b5', '1600880292203-757bb62b4baf'],
        'llc-incorporation' => ['1521791136064-7986c2920216', '1522202176988-66273c2fd55f', '1600880292203-757bb62b4baf'],
        'web-development' => ['1519389950473-47ba0277781c', '1461749280684-dccba630e2f6', '1561070791-2526d30994b5'],
        'cms-development' => ['1561070791-2526d30994b5', '1519389950473-47ba0277781c', '1461749280684-dccba630e2f6'],
        'shopify-store-development' => ['1556742049-0cfed4f6a45d', '1561070791-2526d30994b5', '1551288049-bebda4e38f71'],
        'payment-solutions' => ['1551288049-bebda4e38f71', '1556742049-0cfed4f6a45d', '1521791136064-7986c2920216'],
        'cloud-management' => ['1544197150-b99a580bb7a8', '1558494949-ef010cbdcc31', '1551288049-bebda4e38f71'],
        'cloud-migration' => ['1558494949-ef010cbdcc31', '1544197150-b99a580bb7a8', '1461749280684-dccba630e2f6'],
        'it-infrastructure' => ['1558494949-ef010cbdcc31', '1544197150-b99a580bb7a8', '1555949963-aa79dcee981c'],
        'cyber-security' => ['1555949963-aa79dcee981c', '1461749280684-dccba630e2f6', '1544197150-b99a580bb7a8'],
        'consulting-training' => ['1522202176988-66273c2fd55f', '1600880292203-757bb62b4baf', '1521791136064-7986c2920216'],
        'remote-team' => ['1600880292203-757bb62b4baf', '1522202176988-66273c2fd55f', '1512941937669-90a1b58e7e9c'],
        'data-refinement' => ['1551288049-bebda4e38f71', '1558494949-ef010cbdcc31', '1461749280684-dccba630e2f6'],
        'localization' => ['1561070791-2526d30994b5', '1600880292203-757bb62b4baf', '1522202176988-66273c2fd55f'],
        'ecommerce' => ['1556742049-0cfed4f6a45d', '1551288049-bebda4e38f71', '1561070791-2526d30994b5'],
        'ui-ux-design' => ['1561070791-2526d30994b5', '1519389950473-47ba0277781c', '1600880292203-757bb62b4baf'],
        'seo-optimization' => ['1551288049-bebda4e38f71', '1519389950473-47ba0277781c', '1461749280684-dccba630e2f6'],
        'website-maintenance' => ['1555949963-aa79dcee981c', '1461749280684-dccba630e2f6', '1519389950473-47ba0277781c'],
    ];

    /**
     * @return array<string, array{title: string, lead: string, body: string, features: list<string>, gallery: list<string>}>
     */
    public static function all(): array
    {
        return collect(self::SLUGS)
            ->mapWithKeys(fn (string $slug) => [$slug => self::build($slug)])
            ->all();
    }

    public static function find(string $slug): ?array
    {
        return in_array($slug, self::SLUGS, true) ? self::build($slug) : null;
    }

    /**
     * A handful of other services to cross-link from a service's detail page.
     *
     * @return list<array{slug: string, title: string, lead: string}>
     */
    public static function related(string $current, int $limit = 3): array
    {
        $position = array_search($current, self::SLUGS, true);
        $position = $position === false ? 0 : $position;
        $total = count(self::SLUGS);

        return collect(range(1, $total - 1))
            ->take($limit)
            ->map(fn (int $offset) => self::SLUGS[($position + $offset) % $total])
            ->map(fn (string $slug) => [
                'slug' => $slug,
                'title' => __("services.{$slug}.title"),
                'lead' => __("services.{$slug}.lead"),
            ])
            ->values()
            ->all();
    }

    /**
     * @return array{title: string, lead: string, body: string, features: list<string>, gallery: list<string>}
     */
    private static function build(string $slug): array
    {
        $data = __("services.{$slug}");

        $data['gallery'] = collect(self::GALLERIES[$slug] ?? [])
            ->map(fn (string $id) => "https://images.unsplash.com/photo-{$id}?auto=format&fit=crop&w=900&q=80")
            ->all();

        return $data;
    }
}
