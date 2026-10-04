<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = json_decode(File::get(database_path('seeders/data/projects.json')), true, flags: JSON_THROW_ON_ERROR);

        foreach ($projects as $project) {
            $service = Service::query()->where('slug', $project['service_slug'])->first();

            if (! $service) {
                continue;
            }

            Project::query()->updateOrCreate(
                ['slug' => $project['slug']],
                [
                    'service_id' => $service->id,
                    'title' => $project['title'],
                    'short_description' => $project['short_description'],
                    'description' => $project['description'],
                    'client_name' => $project['client_name'],
                    'project_url' => $project['project_url'],
                    'featured_image' => $project['featured_image'],
                    'gallery' => $project['gallery'] ?? [],
                    'status' => $project['status'],
                    'display_order' => $project['display_order'],
                ],
            );
        }
    }
}
