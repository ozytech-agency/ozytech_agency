<?php

namespace App\Support;

class PolicyCatalog
{
    /**
     * @var list<string>
     */
    private const SLUGS = [
        'privacy-policy',
        'terms-of-service',
        'refunds-policy',
        'trust-security',
    ];

    /**
     * @return array<string, array{title: string, subtitle: string, sections: array<int, array{heading: string, body: string}>}>
     */
    public static function all(): array
    {
        return collect(self::SLUGS)
            ->mapWithKeys(fn (string $slug) => [$slug => __("policies.{$slug}")])
            ->all();
    }

    public static function find(string $slug): ?array
    {
        return self::all()[$slug] ?? null;
    }
}
