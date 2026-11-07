<?php

namespace Database\Factories;

use App\Models\Policy;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Policy>
 */
class PolicyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->words(3, true).' policy';

        return [
            'slug' => Str::slug($title),
            'title' => ['en' => Str::title($title)],
            'summary' => ['en' => fake()->sentence()],
            'body' => ['en' => '<h2>'.fake()->sentence(3).'</h2><p>'.fake()->paragraph().'</p>'],
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
