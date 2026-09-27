<?php

namespace Database\Factories;

use App\Models\Package;
use App\Models\PackageFeature;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PackageFeature>
 */
class PackageFeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_id' => Package::factory(),
            'text' => ['en' => fake()->sentence(3)],
            'note' => null,
            'sort_order' => 0,
        ];
    }
}
