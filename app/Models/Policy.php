<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use App\Support\RichText;
use Database\Factories\PolicyFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'title', 'summary', 'body', 'sort_order', 'is_published'])]
class Policy extends Model
{
    /** @use HasFactory<PolicyFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'summary' => 'array',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * The localized HTML body. Every locale is sanitized on write, so no code
     * path (admin form, seeder, tinker) can store unsafe markup.
     */
    protected function body(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value): ?array => $value === null ? null : json_decode($value, true),
            set: fn (?array $value): ?string => $value === null ? null : json_encode(
                array_map(fn (?string $html): string => RichText::sanitize($html), $value),
                JSON_UNESCAPED_UNICODE,
            ),
        );
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
