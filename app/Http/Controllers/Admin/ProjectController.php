<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\Project;
use App\Models\Service;
use App\Support\ContentMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $serviceId = $request->integer('service') ?: null;

        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::query()
                ->with('service:id,title,slug')
                ->when($serviceId, fn ($query) => $query->where('service_id', $serviceId))
                ->when($search !== '', fn ($query) => $query->where(fn ($query) => $query
                    ->where('slug', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")))
                ->orderBy('display_order')
                ->latest('id')
                ->paginate(20)
                ->withQueryString()
                ->through(fn (Project $project) => [
                    'id' => $project->id,
                    'slug' => $project->slug,
                    'title' => $project->localized('title'),
                    'service' => $project->service?->localized('title'),
                    'client_name' => $project->client_name,
                    'status' => $project->status,
                    'display_order' => $project->display_order,
                ]),
            'filters' => ['search' => $search, 'service' => $serviceId],
            'services' => $this->serviceOptions(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'services' => $this->serviceOptions(),
            'nextDisplayOrder' => (int) Project::max('display_order') + 1,
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        Project::create($request->projectAttributes());

        return to_route('admin.projects.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Project $project): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => [
                ...$project->only([
                    'id', 'service_id', 'slug', 'title', 'short_description', 'description',
                    'client_name', 'project_url', 'featured_image', 'gallery', 'status', 'display_order',
                ]),
                'featured_image_url' => ContentMedia::url($project->featured_image),
            ],
            'services' => $this->serviceOptions(),
        ]);
    }

    public function update(ProjectRequest $request, string $locale, Project $project): RedirectResponse
    {
        $previousImage = $project->featured_image;
        $previousGallery = $project->gallery ?? [];

        $project->update($request->projectAttributes());

        if ($previousImage !== $project->featured_image) {
            ContentMedia::delete($previousImage);
        }

        collect($previousGallery)
            ->diff($project->gallery)
            ->each(fn (string $image) => ContentMedia::delete($image));

        return to_route('admin.projects.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Project $project): RedirectResponse
    {
        $images = [$project->featured_image, ...($project->gallery ?? [])];

        $project->delete();

        collect($images)->each(fn (?string $image) => ContentMedia::delete($image));

        return to_route('admin.projects.index')->with('status', __('admin.flash.deleted'));
    }

    /**
     * @return list<array{id: int, title: string|null}>
     */
    private function serviceOptions(): array
    {
        return Service::query()
            ->ordered()
            ->get(['id', 'title'])
            ->map(fn (Service $service) => ['id' => $service->id, 'title' => $service->localized('title')])
            ->values()
            ->all();
    }
}
