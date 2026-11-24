<?php

namespace App\Models;

use App\Enums\PackageCategory;
use App\Models\Concerns\HasLocalizedAttributes;
use Database\Factories\PackageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'key', 'category', 'label', 'title', 'best_for', 'description', 'cta', 'badge', 'icon',
    'price_amount', 'old_price_amount', 'price_period', 'formation_states', 'is_featured', 'sort_order', 'is_published',
])]
class Package extends Model
{
    /** @use HasFactory<PackageFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * @var array<string, string>
     */
    protected $attributes = [
        'category' => 'llc',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'category' => PackageCategory::class,
            'label' => 'array',
            'title' => 'array',
            'best_for' => 'array',
            'description' => 'array',
            'cta' => 'array',
            'badge' => 'array',
            'price_period' => 'array',
            'formation_states' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function features(): HasMany
    {
        return $this->hasMany(PackageFeature::class)->orderBy('sort_order');
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class, 'package', 'key');
    }

    /**
     * Keeps a single Most Popular package per formation state, and a single one among the
     * website packages: once this package is marked, the flag is cleared from the others.
     */
    public function keepOnlyMostPopularInItsStates(): void
    {
        if (! $this->is_featured) {
            return;
        }

        $states = $this->formation_states ?? [];

        static::query()
            ->whereKeyNot($this->getKey())
            ->ofCategory($this->category)
            ->where('is_featured', true)
            ->get()
            ->filter(fn (Package $other) => $this->category === PackageCategory::Website
                || array_intersect($other->formation_states ?? [], $states) !== [])
            ->each(fn (Package $other) => $other->update(['is_featured' => false]));
    }

    /**
     * Moves the package to a 1-based position among the packages of its category, shifting
     * the others so the positions stay 1..N with no gaps or duplicates.
     */
    public function moveToPosition(int $position): void
    {
        $siblings = static::query()
            ->ofCategory($this->category)
            ->whereKeyNot($this->getKey())
            ->ordered()
            ->get();

        $position = max(1, min($position, $siblings->count() + 1));
        $siblings->splice($position - 1, 0, [$this]);

        static::savePositions($siblings->values()->all());
    }

    /**
     * Closes the gaps left in a category's positions, e.g. after a package is deleted.
     */
    public static function renumberPositions(PackageCategory $category): void
    {
        static::savePositions(static::query()->ofCategory($category)->ordered()->get()->all());
    }

    /**
     * @param  list<Package>  $packages  In display order.
     */
    private static function savePositions(array $packages): void
    {
        foreach ($packages as $index => $package) {
            if ($package->sort_order !== $index + 1) {
                $package->update(['sort_order' => $index + 1]);
            }
        }
    }

    #[Scope]
    protected function ofCategory(Builder $query, PackageCategory $category): void
    {
        $query->where('category', $category->value);
    }

    #[Scope]
    protected function published(Builder $query): void
    {
        $query->where('is_published', true);
    }

    #[Scope]
    protected function ordered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * The package as the public Packages / Start a Project pages consume it.
     *
     * @return array{key: string, category: string, icon: string|null, featured: bool, label: string|null, title: string|null, best_for: string|null, description: string|null, cta: string|null, badge: string|null, price: array{amount: string, old_amount: string|null, period: string|null}, formation_states: list<string>, features: list<array{text: string|null, note: string|null}>}
     */
    public function toPublicArray(): array
    {
        return [
            'key' => $this->key,
            'category' => $this->category->value,
            'icon' => $this->icon,
            'featured' => $this->is_featured,
            'label' => $this->localized('label'),
            'title' => $this->localized('title'),
            'best_for' => $this->localized('best_for'),
            'description' => $this->localized('description'),
            'cta' => $this->localized('cta'),
            'badge' => $this->localized('badge') ?? ($this->is_featured ? __('packages.most_popular') : null),
            'price' => [
                'amount' => $this->price_amount,
                'old_amount' => $this->old_price_amount,
                'period' => $this->localized('price_period'),
            ],
            'formation_states' => array_values($this->formation_states ?? []),
            'features' => $this->features
                ->map(fn (PackageFeature $feature) => [
                    'text' => $feature->localized('text'),
                    'note' => $feature->localized('note'),
                ])
                ->values()
                ->all(),
        ];
    }
}
