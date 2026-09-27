<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use App\Support\ContentMedia;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

#[Fillable([
    'slug', 'category', 'title', 'excerpt', 'body', 'cover_image',
    'author_id', 'is_featured', 'published_at',
])]
class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'category' => 'array',
            'title' => 'array',
            'excerpt' => 'array',
            'body' => 'array',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Posts whose publish date has been reached. Drafts have no date;
     * scheduled posts have a future one.
     */
    #[Scope]
    protected function published(Builder $query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    public function isPublished(): bool
    {
        return $this->published_at !== null && $this->published_at->lte(now());
    }

    /**
     * @return array{slug: string, category: string|null, title: string|null, excerpt: string|null, cover_image: string|null, published_at: string|null}
     */
    public function toCardArray(): array
    {
        return [
            'slug' => $this->slug,
            'category' => $this->localized('category'),
            'title' => $this->localized('title'),
            'excerpt' => $this->localized('excerpt'),
            'cover_image' => ContentMedia::url($this->cover_image),
            'published_at' => $this->published_at?->toIso8601String(),
        ];
    }

    /**
     * The localized Markdown body rendered to HTML, with raw HTML stripped.
     */
    public function renderedBody(): string
    {
        return Str::markdown($this->localized('body') ?? '', [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }
}
