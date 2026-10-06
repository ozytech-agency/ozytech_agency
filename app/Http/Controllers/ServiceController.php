<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Support\ServiceCatalog;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ServiceController extends Controller
{
    private const PROJECTS_PER_SERVICE = 6;

    public function index(): Response
    {
        return Inertia::render('Services/Index', [
            'services' => collect(ServiceCatalog::all())
                ->map(fn (array $service, string $slug) => [
                    'slug' => $slug,
                    'title' => $service['title'],
                    'lead' => $service['lead'],
                    'image' => $service['gallery'][0] ?? null,
                ])
                ->values()
                ->all(),
        ]);
    }

    public function show(string $locale, string $service): Response
    {
        $data = ServiceCatalog::find($service);

        if (! $data) {
            throw new NotFoundHttpException;
        }

        $record = Service::query()->where('slug', $service)->firstOrFail();

        return Inertia::render('Services/Show', [
            'slug' => $service,
            ...$data,
            'related' => ServiceCatalog::related($service),
            'projects' => $record->projects()
                ->published()
                ->with('service')
                ->orderBy('display_order')
                ->latest('id')
                ->take(self::PROJECTS_PER_SERVICE)
                ->get()
                ->map(fn ($project) => $project->toCardArray())
                ->all(),
        ]);
    }
}
