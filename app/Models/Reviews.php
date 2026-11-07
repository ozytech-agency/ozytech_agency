<?php

namespace App\Models;

use Database\Factories\ReviewsFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'name', 'email', 'role', 'rating', 'review', 'is_published'])]
class Reviews extends Model
{
    /** @use HasFactory<ReviewsFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_published' => 'boolean',
        ];
    }

    /**
     * The account the review was submitted from, if the reviewer was signed in.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    #[Scope]
    protected function published(Builder $query): void
    {
        $query->where('is_published', true);
    }

    /**
     * What visitors see. The email is private and never leaves the admin area.
     *
     * @return array{id: int, name: string, role: string|null, rating: int, review: string, avatar_url: string|null}
     */
    public function toPublicArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'rating' => $this->rating,
            'review' => $this->review,
            'avatar_url' => $this->user?->avatar_url,
        ];
    }
}
