<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Support\ContentMedia;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProjectController extends Controller
{
    public function show(string $locale, Project $project): Response
    {
        if (! $project->isPublished()) {
            throw new NotFoundHttpException;
        }

        $project->load('service:id,slug,title');

        return Inertia::render('Projects/Show', [
            'project' => [
                'slug' => $project->slug,
                'title' => $project->localized('title'),
                'short_description' => $project->localized('short_description'),
                'description' => $project->renderedDescription(),
                'client_name' => $project->client_name,
                'project_url' => $project->project_url,
                'featured_image' => ContentMedia::url($project->featured_image),
                'gallery' => collect($project->gallery ?? [])->map(fn (string $image) => ContentMedia::url($image))->values()->all(),
                'service' => [
                    'slug' => $project->service->slug,
                    'title' => $project->service->localized('title'),
                ],
            ],
        ]);
    }
}
