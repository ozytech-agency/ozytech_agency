<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->sentence(5);

        return [
            'slug' => Str::slug($title),
            'category' => ['en' => fake()->randomElement(['Cloud', 'AI systems', 'Delivery'])],
            'title' => ['en' => $title],
            'excerpt' => ['en' => fake()->sentence()],
            'body' => ['en' => fake()->paragraphs(3, true)],
            'cover_image' => null,
            'author_id' => null,
            'is_featured' => false,
            'published_at' => now()->subDay(),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'published_at' => null,
        ]);
    }

    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'published_at' => now()->addWeek(),
        ]);
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}
