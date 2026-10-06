<?php

namespace App\Models;

use App\Enums\ServiceItemType;
use App\Models\Concerns\HasLocalizedAttributes;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

#[Fillable([
    'slug', 'title', 'lead', 'meta_description', 'body', 'nav_description', 'nav_icon', 'nav_groups',
    'gallery', 'sort_order', 'is_published',
])]
class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * Header menus a service can be listed in.
     *
     * @var list<string>
     */
    public const NAV_GROUPS = ['services', 'website'];

    public const CACHE_KEY = 'content.services';

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget(self::CACHE_KEY));
        static::deleted(fn () => Cache::forget(self::CACHE_KEY));
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'lead' => 'array',
            'meta_description' => 'array',
            'body' => 'array',
            'nav_description' => 'array',
            'nav_groups' => 'array',
            'gallery' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(ServiceItem::class)->orderBy('sort_order');
    }

    public function offerItems(): HasMany
    {
        return $this->items()->where('type', ServiceItemType::Offer);
    }

    public function buildItems(): HasMany
    {
        return $this->items()->where('type', ServiceItemType::Build);
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
}
