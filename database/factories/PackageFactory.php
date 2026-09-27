<?php

namespace Database\Factories;

use App\Models\Package;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $word = fake()->unique()->word();

        return [
            'key' => $word,
            'label' => ['en' => '01 / '.ucfirst($word)],
            'title' => ['en' => ucfirst($word).' Pack'],
            'best_for' => ['en' => fake()->sentence(4)],
            'description' => ['en' => fake()->sentence()],
            'cta' => ['en' => 'Choose this pack'],
            'badge' => null,
            'icon' => 'fa-solid fa-compass',
            'price_amount' => '$'.number_format(fake()->numberBetween(1000, 50000)),
            'price_period' => ['en' => 'one-time'],
            'is_featured' => false,
            'sort_order' => 0,
            'is_published' => true,
        ];
    }

    public function unpublished(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => false,
        ]);
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'badge' => ['en' => 'Most popular'],
        ]);
    }
}
