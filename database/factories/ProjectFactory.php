<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = Str::title(fake()->unique()->words(3, true));

        return [
            'service_id' => Service::factory(),
            'slug' => Str::slug($title),
            'title' => ['en' => $title],
            'short_description' => ['en' => fake()->sentence()],
            'description' => ['en' => fake()->paragraphs(2, true)],
            'client_name' => fake()->company(),
            'project_url' => null,
            'featured_image' => null,
            'status' => Project::STATUS_PUBLISHED,
            'display_order' => 0,
        ];
    }

    public function draft(): static
    {
        return $this->state(['status' => Project::STATUS_DRAFT]);
    }
}
