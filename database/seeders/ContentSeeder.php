<?php

namespace Database\Seeders;

use App\Enums\ServiceItemType;
use App\Models\Package;
use App\Models\Post;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Imports the services, packages and blog posts that used to be hardcoded in
 * the lang files (all locales) into the database, so they can be managed from
 * the admin dashboard.
 *
 * Safe to re-run: records that already exist (by slug / key) are skipped, so
 * edits made from the admin dashboard are never overwritten.
 */
class ContentSeeder extends Seeder
{
    /**
     * @var list<string>
     */
    private const LOCALES = ['en', 'ar', 'fr', 'es'];

    /**
     * Service slugs, in display order.
     *
     * @var list<string>
     */
    private const SERVICE_SLUGS = [
        'software-development', 'mobile-apps', 'mvp-development', 'llc-incorporation',
        'web-development', 'cms-development', 'shopify-store-development', 'payment-solutions',
        'cloud-management', 'cloud-migration', 'it-infrastructure', 'cyber-security',
        'consulting-training', 'remote-team', 'data-refinement', 'localization',
        'ecommerce', 'ui-ux-design', 'seo-optimization', 'website-maintenance',
    ];

    /**
     * Header menu placement: slug => [nav translation key, icon, groups].
     *
     * @var array<string, array{0: string, 1: string, 2: list<string>}>
     */
    private const NAV = [
        'software-development' => ['softwareDev', 'fa-solid fa-code', ['services']],
        'mobile-apps' => ['mobileApps', 'fa-solid fa-mobile-screen-button', ['services']],
        'mvp-development' => ['mvp', 'fa-solid fa-rocket', ['services']],
        'llc-incorporation' => ['llcIncorporation', 'fa-solid fa-building', ['services']],
        'web-development' => ['webDev', 'fa-solid fa-laptop-code', ['services', 'website']],
        'cms-development' => ['cms', 'fa-brands fa-wordpress', ['services', 'website']],
        'shopify-store-development' => ['shopify', 'fa-brands fa-shopify', ['services']],
        'payment-solutions' => ['payments', 'fa-solid fa-credit-card', ['services']],
        'it-infrastructure' => ['itInfra', 'fa-solid fa-server', ['services']],
        'website-maintenance' => ['maintenance', 'fa-solid fa-screwdriver-wrench', ['services', 'website']],
        'ecommerce' => ['ecommerce', 'fa-solid fa-cart-shopping', ['website']],
        'ui-ux-design' => ['uiux', 'fa-solid fa-pen-nib', ['website']],
        'seo-optimization' => ['seo', 'fa-solid fa-magnifying-glass-chart', ['website']],
        'cloud-management' => ['cloudMgmt', 'fa-solid fa-cloud', []],
        'cloud-migration' => ['cloudMigration', 'fa-solid fa-cloud-arrow-up', []],
        'cyber-security' => ['cyberSecurity', 'fa-solid fa-shield-halved', []],
        'consulting-training' => ['consulting', 'fa-solid fa-chalkboard-user', []],
        'remote-team' => ['remoteTeam', 'fa-solid fa-users', []],
        'data-refinement' => ['dataRefinement', 'fa-solid fa-database', []],
        'localization' => ['localization', 'fa-solid fa-language', []],
    ];

    /**
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
     * @var array<string, list<string>>
     */
    private const OFFER_ICONS = [
        'software-development' => ['apartment', 'receipt_long', 'api'],
        'mobile-apps' => ['phone_iphone', 'devices', 'store'],
        'mvp-development' => ['bolt', 'checklist', 'forum'],
        'llc-incorporation' => ['gavel', 'badge', 'receipt_long'],
        'web-development' => ['speed', 'accessibility_new', 'dataset'],
        'cms-development' => ['palette', 'edit_note', 'extension'],
        'shopify-store-development' => ['storefront', 'shopping_cart', 'integration_instructions'],
        'payment-solutions' => ['credit_card', 'currency_exchange', 'autorenew'],
        'cloud-management' => ['monitoring', 'savings', 'notifications_active'],
        'cloud-migration' => ['fact_check', 'sync_alt', 'security'],
        'it-infrastructure' => ['lan', 'developer_board', 'description'],
        'cyber-security' => ['gpp_maybe', 'key', 'emergency'],
        'consulting-training' => ['architecture', 'groups', 'account_tree'],
        'remote-team' => ['engineering', 'chat', 'tune'],
        'data-refinement' => ['cleaning_services', 'account_tree', 'table_chart'],
        'localization' => ['translate', 'public', 'format_textdirection_r_to_l'],
        'ecommerce' => ['storefront', 'credit_card', 'inventory_2'],
        'ui-ux-design' => ['groups', 'design_services', 'palette'],
        'seo-optimization' => ['manage_search', 'edit_document', 'speed'],
        'website-maintenance' => ['security_update_good', 'monitor_heart', 'bug_report'],
    ];

    /**
     * @var array<string, list<string>>
     */
    private const BUILD_ICONS = [
        'software-development' => ['cloud', 'dashboard', 'payments'],
        'mobile-apps' => ['smartphone', 'storefront', 'extension'],
        'mvp-development' => ['slideshow', 'rocket_launch', 'science'],
        'llc-incorporation' => ['account_balance', 'public', 'verified'],
        'web-development' => ['language', 'web', 'dns'],
        'cms-development' => ['newspaper', 'extension', 'groups'],
        'shopify-store-development' => ['store', 'extension', 'public'],
        'payment-solutions' => ['point_of_sale', 'account_tree', 'subscriptions'],
        'cloud-management' => ['insights', 'dashboard', 'auto_graph'],
        'cloud-migration' => ['cloud_upload', 'cloud_sync', 'storage'],
        'it-infrastructure' => ['business', 'dns', 'settings_suggest'],
        'cyber-security' => ['security', 'lock', 'menu_book'],
        'consulting-training' => ['map', 'school', 'psychology'],
        'remote-team' => ['groups', 'diversity_3', 'timeline'],
        'data-refinement' => ['sync_alt', 'warehouse', 'bar_chart'],
        'localization' => ['language', 'campaign', 'view_sidebar'],
        'ecommerce' => ['shopping_bag', 'hub', 'inventory'],
        'ui-ux-design' => ['dashboard', 'widgets', 'touch_app'],
        'seo-optimization' => ['travel_explore', 'campaign', 'trending_up'],
        'website-maintenance' => ['verified', 'notifications_active', 'update'],
    ];

    /**
     * Package keys and icons, in the order of `packages.cards`.
     *
     * @var list<array{0: string, 1: string}>
     */
    private const PACKAGES = [
        ['growth', 'fa-solid fa-compass'],
        ['pro', 'fa-solid fa-rocket'],
        ['ultimate', 'fa-solid fa-chart-line'],
    ];

    private const FEATURED_POST_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85';

    /**
     * Cover images, in the order of `blog.posts`.
     *
     * @var list<string>
     */
    private const POST_IMAGES = [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $this->seedServices();
            $this->seedPackages();
            $this->seedPosts();
        });

        Cache::forget(Service::CACHE_KEY);
    }

    private function seedServices(): void
    {
        foreach (self::SERVICE_SLUGS as $position => $slug) {
            if (Service::where('slug', $slug)->exists()) {
                continue;
            }

            [$navKey, $navIcon, $navGroups] = self::NAV[$slug];
            $navGroup = $navGroups[0] ?? 'services';

            $service = Service::create([
                'slug' => $slug,
                'title' => $this->localized("services.{$slug}.title"),
                'lead' => $this->localized("services.{$slug}.lead"),
                'body' => $this->localized("services.{$slug}.body"),
                'nav_description' => $this->localized("nav.{$navGroup}.{$navKey}.desc"),
                'nav_icon' => $navIcon,
                'nav_groups' => $navGroups,
                'gallery' => collect(self::GALLERIES[$slug])
                    ->map(fn (string $id) => "https://images.unsplash.com/photo-{$id}?auto=format&fit=crop&w=900&q=80")
                    ->all(),
                'sort_order' => $position,
                'is_published' => true,
            ]);

            foreach ([ServiceItemType::Offer, ServiceItemType::Build] as $type) {
                $icons = $type === ServiceItemType::Offer ? self::OFFER_ICONS[$slug] : self::BUILD_ICONS[$slug];

                foreach ($this->localizedList("services.{$slug}.{$type->value}") as $index => $label) {
                    $service->items()->create([
                        'type' => $type,
                        'label' => $label,
                        'icon' => $icons[$index] ?? 'check_circle',
                        'sort_order' => $index,
                    ]);
                }
            }
        }
    }

    private function seedPackages(): void
    {
        foreach (self::PACKAGES as $index => [$key, $icon]) {
            if (Package::where('key', $key)->exists()) {
                continue;
            }

            $base = "packages.cards.{$index}";

            $package = Package::create([
                'key' => $key,
                'label' => $this->localized("{$base}.label"),
                'title' => $this->localized("{$base}.title"),
                'best_for' => $this->localized("{$base}.best_for"),
                'description' => $this->localized("{$base}.description"),
                'cta' => $this->localized("{$base}.cta"),
                'badge' => $this->localized("{$base}.badge"),
                'icon' => $icon,
                'price_amount' => trans("{$base}.price.amount", [], 'en'),
                'price_period' => $this->localized("{$base}.price.period"),
                'is_featured' => $this->localized("{$base}.badge") !== null,
                'sort_order' => $index,
                'is_published' => true,
            ]);

            $featureCount = count(trans("{$base}.features", [], 'en'));

            for ($i = 0; $i < $featureCount; $i++) {
                $text = [];
                $note = [];

                foreach (self::LOCALES as $locale) {
                    $feature = trans("{$base}.features.{$i}", [], $locale);
                    $text[$locale] = is_array($feature) ? $feature['text'] : $feature;

                    if (is_array($feature) && isset($feature['note'])) {
                        $note[$locale] = $feature['note'];
                    }
                }

                $package->features()->create([
                    'text' => $text,
                    'note' => $note ?: null,
                    'sort_order' => $i,
                ]);
            }
        }
    }

    private function seedPosts(): void
    {
        $posts = [[
            'key' => 'blog.featured',
            'image' => self::FEATURED_POST_IMAGE,
            'featured' => true,
        ]];

        foreach (self::POST_IMAGES as $index => $image) {
            $posts[] = ['key' => "blog.posts.{$index}", 'image' => $image, 'featured' => false];
        }

        foreach ($posts as $position => $post) {
            $slug = Str::slug(trans("{$post['key']}.title", [], 'en'));

            if (Post::where('slug', $slug)->exists()) {
                continue;
            }

            $excerpt = $this->localized("{$post['key']}.excerpt");

            Post::create([
                'slug' => $slug,
                'category' => $this->localized("{$post['key']}.category"),
                'title' => $this->localized("{$post['key']}.title"),
                'excerpt' => $excerpt,
                'body' => $excerpt,
                'cover_image' => $post['image'],
                'is_featured' => $post['featured'],
                'published_at' => now()->subMinutes(count($posts) - $position),
            ]);
        }
    }

    /**
     * Collect a translation string for every locale, or null when missing.
     *
     * @return array<string, string>|null
     */
    private function localized(string $key): ?array
    {
        $values = collect(self::LOCALES)
            ->mapWithKeys(fn (string $locale) => [$locale => trans($key, [], $locale)])
            ->filter(fn (mixed $value) => is_string($value) && $value !== $key)
            ->all();

        return $values ?: null;
    }

    /**
     * Turn a per-locale list (e.g. services.x.offer) into a list of
     * per-item localized values.
     *
     * @return list<array<string, string>>
     */
    private function localizedList(string $key): array
    {
        $items = [];

        foreach (self::LOCALES as $locale) {
            $list = trans($key, [], $locale);

            if (! is_array($list)) {
                continue;
            }

            foreach (array_values($list) as $index => $label) {
                $items[$index][$locale] = $label;
            }
        }

        return $items;
    }
}
