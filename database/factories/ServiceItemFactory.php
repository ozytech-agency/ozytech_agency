<?php

namespace Database\Factories;

use App\Enums\ServiceItemType;
use App\Models\Service;
use App\Models\ServiceItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ServiceItem>
 */
class ServiceItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_id' => Service::factory(),
            'type' => ServiceItemType::Offer,
            'label' => ['en' => fake()->sentence(3)],
            'icon' => 'check_circle',
            'sort_order' => 0,
        ];
    }

    public function build(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => ServiceItemType::Build,
        ]);
    }
}
