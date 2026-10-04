<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use App\Support\ContentMedia;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

#[Fillable([
    'service_id', 'slug', 'title', 'short_description', 'description',
    'client_name', 'project_url', 'featured_image', 'gallery', 'status', 'display_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory, HasLocalizedAttributes;

    public const STATUS_PUBLISHED = 'published';

    public const STATUS_DRAFT = 'draft';

    public const STATUSES = [self::STATUS_PUBLISHED, self::STATUS_DRAFT];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'short_description' => 'array',
            'description' => 'array',
            'gallery' => 'array',
            'display_order' => 'integer',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * @param  Builder<Project>  $query
     */
    #[Scope]
    protected function published(Builder $query): void
    {
        $query->where('status', self::STATUS_PUBLISHED);
    }

    public function isPublished(): bool
    {
        return $this->status === self::STATUS_PUBLISHED;
    }

    /**
     * @return array{slug: string, title: string|null, short_description: string|null, client_name: string|null, project_url: string|null, featured_image: string|null, service_title: string|null}
     */
    public function toCardArray(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->localized('title'),
            'short_description' => $this->localized('short_description'),
            'client_name' => $this->client_name,
            'project_url' => $this->project_url,
            'featured_image' => ContentMedia::url($this->featured_image),
            'service_title' => $this->service?->localized('title'),
        ];
    }

    /**
     * The localized description rendered as Markdown, with raw HTML stripped.
     */
    public function renderedDescription(): string
    {
        return Str::markdown($this->localized('description') ?? '', [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }
}
