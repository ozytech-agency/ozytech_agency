<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PackageRequest;
use App\Models\Package;
use App\Models\PackageFeature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Packages/Index', [
            'packages' => Package::query()
                ->ordered()
                ->withCount(['features', 'inquiries'])
                ->get()
                ->map(fn (Package $package) => [
                    'id' => $package->id,
                    'key' => $package->key,
                    'title' => $package->localized('title'),
                    'price_amount' => $package->price_amount,
                    'price_period' => $package->localized('price_period'),
                    'is_featured' => $package->is_featured,
                    'is_published' => $package->is_published,
                    'sort_order' => $package->sort_order,
                    'features_count' => $package->features_count,
                    'inquiries_count' => $package->inquiries_count,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Packages/Form', [
            'package' => null,
            'nextSortOrder' => (int) Package::max('sort_order') + 1,
        ]);
    }

    public function store(PackageRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $package = Package::create($request->packageAttributes());
            $package->features()->createMany($request->features());
        });

        return to_route('admin.packages.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Package $package): Response
    {
        $package->load('features');

        return Inertia::render('Admin/Packages/Form', [
            'package' => [
                ...$package->only(['id', 'key', 'label', 'title', 'best_for', 'description', 'cta', 'badge', 'icon', 'price_amount', 'price_period', 'is_featured', 'is_published', 'sort_order']),
                'features' => $package->features
                    ->map(fn (PackageFeature $feature) => ['text' => $feature->text, 'note' => $feature->note])
                    ->values(),
                'has_inquiries' => $package->inquiries()->exists(),
            ],
        ]);
    }

    public function update(PackageRequest $request, string $locale, Package $package): RedirectResponse
    {
        DB::transaction(function () use ($request, $package) {
            $package->update($request->packageAttributes());
            PackageFeature::where('package_id', $package->id)->delete();
            $package->features()->createMany($request->features());
        });

        return to_route('admin.packages.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Package $package): RedirectResponse
    {
        if ($package->inquiries()->exists()) {
            return back()->withErrors(['package' => __('admin.packages.delete_blocked')]);
        }

        $package->delete();

        return to_route('admin.packages.index')->with('status', __('admin.flash.deleted'));
    }
}
