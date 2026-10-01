<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedAttributes;
use App\Support\ContentMedia;
use Database\Factories\TeamMemberFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name', 'role', 'focus', 'photo',
    'x_url', 'instagram_url', 'linkedin_url', 'website_url',
    'sort_order', 'is_published',
])]
class TeamMember extends Model
{
    /** @use HasFactory<TeamMemberFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'role' => 'array',
            'focus' => 'array',
            'is_published' => 'boolean',
        ];
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
     * @return array{name: string, role: string|null, focus: string|null, photo: string|null, socials: list<array{key: string, href: string}>}
     */
    public function toPublicArray(): array
    {
        return [
            'name' => $this->name,
            'role' => $this->localized('role'),
            'focus' => $this->localized('focus'),
            'photo' => ContentMedia::url($this->photo),
            'socials' => collect([
                ['key' => 'x', 'href' => $this->x_url],
                ['key' => 'instagram', 'href' => $this->instagram_url],
                ['key' => 'linkedin', 'href' => $this->linkedin_url],
                ['key' => 'website', 'href' => $this->website_url],
            ])->filter(fn (array $social) => filled($social['href']))->values()->all(),
        ];
    }
}
