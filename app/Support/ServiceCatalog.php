<?php

namespace App\Support;

use App\Enums\ServiceItemType;
use App\Models\Service;
use App\Models\ServiceItem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

/**
 * Read side of the services managed from the admin dashboard.
 *
 * Published services (with all locales) are cached forever and the cache is
 * cleared whenever a service is saved or deleted; each method then resolves
 * the current locale.
 */
class ServiceCatalog
{
    /**
     * @return array<string, array{title: string, lead: string, metaDescription: string|null, body: string, offer: list<array{label: string, icon: string}>, build: list<array{label: string, icon: string}>, gallery: list<string>}>
     */
    public static function all(): array
    {
        return self::services()
            ->mapWithKeys(fn (array $service) => [$service['slug'] => self::present($service)])
            ->all();
    }

    /**
     * @return array{title: string, lead: string, metaDescription: string|null, body: string, offer: list<array{label: string, icon: string}>, build: list<array{label: string, icon: string}>, gallery: list<string>}|null
     */
    public static function find(string $slug): ?array
    {
        $service = self::services()->firstWhere('slug', $slug);

        return $service ? self::present($service) : null;
    }

    /**
     * A handful of other services to cross-link from a service's detail page.
     *
     * @return list<array{slug: string, title: string, lead: string}>
     */
    public static function related(string $current, int $limit = 3): array
    {
        $services = self::services()->values();
        $total = $services->count();

        if ($total < 2) {
            return [];
        }

        $position = $services->search(fn (array $service) => $service['slug'] === $current);
        $position = $position === false ? 0 : $position;

        return collect(range(1, $total - 1))
            ->take($limit)
            ->map(fn (int $offset) => $services[($position + $offset) % $total])
            ->map(fn (array $service) => [
                'slug' => $service['slug'],
                'title' => Service::pickLocale($service['title']),
                'lead' => Service::pickLocale($service['lead']),
            ])
            ->values()
            ->all();
    }

    /**
     * Header menu entries, grouped by menu.
     *
     * @return array<string, list<array{slug: string, icon: string|null, title: string|null, desc: string|null}>>
     */
    public static function nav(): array
    {
        return collect(Service::NAV_GROUPS)
            ->mapWithKeys(fn (string $group) => [
                $group => self::services()
                    ->filter(fn (array $service) => in_array($group, $service['nav_groups'] ?? [], true))
                    ->map(fn (array $service) => [
                        'slug' => $service['slug'],
                        'icon' => $service['nav_icon'],
                        'title' => Service::pickLocale($service['title']),
                        'desc' => Service::pickLocale($service['nav_description']) ?? Service::pickLocale($service['lead']),
                    ])
                    ->values()
                    ->all(),
            ])
            ->all();
    }

    /**
     * Published services with every locale, as plain arrays so they cache
     * cleanly.
     *
     * @return Collection<int, array<string, mixed>>
     */
    private static function services(): Collection
    {
        return collect(Cache::rememberForever(Service::CACHE_KEY, fn () => Service::query()
            ->published()
            ->ordered()
            ->with('items')
            ->get()
            ->map(fn (Service $service) => [
                ...$service->only(['slug', 'title', 'lead', 'meta_description', 'body', 'nav_description', 'nav_icon', 'nav_groups', 'gallery']),
                'items' => $service->items
                    ->map(fn (ServiceItem $item) => ['type' => $item->type->value, 'label' => $item->label, 'icon' => $item->icon])
                    ->all(),
            ])
            ->all()));
    }

    /**
     * @param  array<string, mixed>  $service
     * @return array{title: string, lead: string, metaDescription: string|null, body: string, offer: list<array{label: string, icon: string}>, build: list<array{label: string, icon: string}>, gallery: list<string>}
     */
    private static function present(array $service): array
    {
        $itemsOfType = fn (ServiceItemType $type) => collect($service['items'])
            ->where('type', $type->value)
            ->map(fn (array $item) => [
                'label' => Service::pickLocale($item['label']),
                'icon' => $item['icon'] ?: 'check_circle',
            ])
            ->values()
            ->all();

        return [
            'title' => Service::pickLocale($service['title']),
            'lead' => Service::pickLocale($service['lead']),
            'metaDescription' => Service::pickLocale($service['meta_description'] ?? null),
            'body' => Service::pickLocale($service['body']),
            'offer' => $itemsOfType(ServiceItemType::Offer),
            'build' => $itemsOfType(ServiceItemType::Build),
            'gallery' => collect($service['gallery'] ?? [])
                ->map(fn (string $image) => ContentMedia::url($image))
                ->values()
                ->all(),
        ];
    }
}
