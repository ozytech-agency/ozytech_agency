<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = Str::title(fake()->unique()->words(2, true));

        return [
            'slug' => Str::slug($title),
            'title' => ['en' => $title],
            'lead' => ['en' => fake()->sentence()],
            'body' => ['en' => fake()->paragraph()],
            'nav_description' => ['en' => fake()->sentence(4)],
            'nav_icon' => 'fa-solid fa-code',
            'nav_groups' => ['services'],
            'gallery' => [],
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
}
