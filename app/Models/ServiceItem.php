<?php

namespace App\Models;

use App\Enums\ServiceItemType;
use App\Models\Concerns\HasLocalizedAttributes;
use Database\Factories\ServiceItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['service_id', 'type', 'label', 'icon', 'sort_order'])]
class ServiceItem extends Model
{
    /** @use HasFactory<ServiceItemFactory> */
    use HasFactory, HasLocalizedAttributes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => ServiceItemType::class,
            'label' => 'array',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
