<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ServiceItemType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;
use App\Models\ServiceItem;
use App\Support\ContentMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::query()
                ->ordered()
                ->withCount(['items', 'projects'])
                ->get()
                ->map(fn (Service $service) => [
                    'id' => $service->id,
                    'slug' => $service->slug,
                    'title' => $service->localized('title'),
                    'nav_groups' => $service->nav_groups,
                    'is_published' => $service->is_published,
                    'sort_order' => $service->sort_order,
                    'items_count' => $service->items_count,
                    'projects_count' => $service->projects_count,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Form', [
            'service' => null,
            'navGroups' => Service::NAV_GROUPS,
            'nextSortOrder' => (int) Service::max('sort_order') + 1,
        ]);
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $service = Service::create($request->serviceAttributes());
            $service->items()->createMany($request->items());
        });

        Cache::forget(Service::CACHE_KEY);

        return to_route('admin.services.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Service $service): Response
    {
        $service->load('items');

        return Inertia::render('Admin/Services/Form', [
            'service' => [
                ...$service->only(['id', 'slug', 'title', 'lead', 'body', 'nav_description', 'nav_icon', 'nav_groups', 'gallery', 'sort_order', 'is_published']),
                ...collect(ServiceItemType::cases())->mapWithKeys(fn (ServiceItemType $type) => [
                    $type->value => $service->items
                        ->where('type', $type)
                        ->map(fn (ServiceItem $item) => ['label' => $item->label, 'icon' => $item->icon])
                        ->values(),
                ]),
            ],
            'navGroups' => Service::NAV_GROUPS,
        ]);
    }

    public function update(ServiceRequest $request, string $locale, Service $service): RedirectResponse
    {
        $previousGallery = $service->gallery ?? [];

        DB::transaction(function () use ($request, $service) {
            $service->update($request->serviceAttributes());
            ServiceItem::where('service_id', $service->id)->delete();
            $service->items()->createMany($request->items());
        });

        Cache::forget(Service::CACHE_KEY);

        collect($previousGallery)
            ->diff($service->gallery)
            ->each(fn (string $image) => ContentMedia::delete($image));

        return to_route('admin.services.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Service $service): RedirectResponse
    {
        $gallery = $service->gallery ?? [];

        $service->delete();

        collect($gallery)->each(fn (string $image) => ContentMedia::delete($image));

        return to_route('admin.services.index')->with('status', __('admin.flash.deleted'));
    }
}
