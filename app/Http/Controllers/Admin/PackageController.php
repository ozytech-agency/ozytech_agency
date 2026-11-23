<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PackageCategory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PackageRequest;
use App\Models\Package;
use App\Models\PackageFeature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Manages LLC formation packages. WebsitePackageController reuses it for website packages.
 */
class PackageController extends Controller
{
    /**
     * The kind of package this controller manages.
     */
    protected function category(): PackageCategory
    {
        return PackageCategory::Llc;
    }

    /**
     * The route name prefix of this controller's admin screens.
     */
    protected function routeBase(): string
    {
        return 'admin.packages';
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Packages/Index', [
            ...$this->screenProps(),
            'packages' => Package::query()
                ->ofCategory($this->category())
                ->ordered()
                ->withCount(['features', 'inquiries'])
                ->get()
                ->map(fn (Package $package) => [
                    'id' => $package->id,
                    'key' => $package->key,
                    'title' => $package->localized('title'),
                    'price_amount' => $package->price_amount,
                    'old_price_amount' => $package->old_price_amount,
                    'price_period' => $package->localized('price_period'),
                    'formation_states' => $package->formation_states ?? [],
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
            ...$this->screenProps(),
            'package' => null,
            'nextSortOrder' => (int) Package::query()->ofCategory($this->category())->max('sort_order') + 1,
        ]);
    }

    public function store(PackageRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $package = Package::create([...$request->packageAttributes(), 'category' => $this->category()]);
            $package->features()->createMany($request->features());
            $package->keepOnlyMostPopularInItsStates();
        });

        return to_route($this->routeBase().'.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Package $package): Response
    {
        $this->ensureManaged($package);
        $package->load('features');

        return Inertia::render('Admin/Packages/Form', [
            ...$this->screenProps(),
            'package' => [
                ...$package->only(['id', 'key', 'label', 'title', 'best_for', 'description', 'cta', 'badge', 'icon', 'price_amount', 'old_price_amount', 'price_period', 'formation_states', 'is_featured', 'is_published', 'sort_order']),
                'features' => $package->features
                    ->map(fn (PackageFeature $feature) => ['text' => $feature->text, 'note' => $feature->note])
                    ->values(),
                'has_inquiries' => $package->inquiries()->exists(),
            ],
        ]);
    }

    public function update(PackageRequest $request, string $locale, Package $package): RedirectResponse
    {
        $this->ensureManaged($package);

        DB::transaction(function () use ($request, $package) {
            $package->update($request->packageAttributes());
            PackageFeature::where('package_id', $package->id)->delete();
            $package->features()->createMany($request->features());
            $package->keepOnlyMostPopularInItsStates();
        });

        return to_route($this->routeBase().'.index')->with('status', __('admin.flash.saved'));
    }

    /**
     * Marks the package as Most Popular, or removes the mark, straight from the package list.
     */
    public function toggleMostPopular(string $locale, Package $package): RedirectResponse
    {
        $this->ensureManaged($package);

        DB::transaction(function () use ($package) {
            $package->update(['is_featured' => ! $package->is_featured]);
            $package->keepOnlyMostPopularInItsStates();
        });

        return back()->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Package $package): RedirectResponse
    {
        $this->ensureManaged($package);

        if ($package->inquiries()->exists()) {
            return back()->withErrors(['package' => __('admin.packages.delete_blocked')]);
        }

        $package->delete();

        return to_route($this->routeBase().'.index')->with('status', __('admin.flash.deleted'));
    }

    /**
     * Tells the shared admin screens which kind of package they show and where their links go.
     *
     * @return array{category: string, routeBase: string}
     */
    protected function screenProps(): array
    {
        return [
            'category' => $this->category()->value,
            'routeBase' => $this->routeBase(),
        ];
    }

    /**
     * A package is only reachable through the admin section of its own category.
     */
    protected function ensureManaged(Package $package): void
    {
        abort_unless($package->category === $this->category(), 404);
    }
}
