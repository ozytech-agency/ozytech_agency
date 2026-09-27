<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use Database\Factories\PackageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'key', 'label', 'title', 'best_for', 'description', 'cta', 'badge', 'icon',
    'price_amount', 'price_period', 'is_featured', 'sort_order', 'is_published',
])]
class Package extends Model
{
    /** @use HasFactory<PackageFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'label' => 'array',
            'title' => 'array',
            'best_for' => 'array',
            'description' => 'array',
            'cta' => 'array',
            'badge' => 'array',
            'price_period' => 'array',
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
     * @return array{key: string, icon: string|null, featured: bool, label: string|null, title: string|null, best_for: string|null, description: string|null, cta: string|null, badge: string|null, price: array{amount: string, period: string|null}, features: list<array{text: string|null, note: string|null}>}
     */
    public function toPublicArray(): array
    {
        return [
            'key' => $this->key,
            'icon' => $this->icon,
            'featured' => $this->is_featured,
            'label' => $this->localized('label'),
            'title' => $this->localized('title'),
            'best_for' => $this->localized('best_for'),
            'description' => $this->localized('description'),
            'cta' => $this->localized('cta'),
            'badge' => $this->localized('badge'),
            'price' => [
                'amount' => $this->price_amount,
                'period' => $this->localized('price_period'),
            ],
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
