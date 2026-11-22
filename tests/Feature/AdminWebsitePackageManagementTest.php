<?php

namespace Tests\Feature;

use App\Enums\PackageCategory;
use App\Models\Package;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminWebsitePackageManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'key' => 'landing-page',
            'label' => ['en' => '01 / Launch'],
            'title' => ['en' => 'Landing Page'],
            'best_for' => ['en' => 'Best for new brands'],
            'description' => ['en' => 'A one-page website.'],
            'cta' => ['en' => 'Get my site'],
            'badge' => ['en' => ''],
            'icon' => 'fa-solid fa-globe',
            'price_amount' => '$490',
            'price_period' => ['en' => 'one-time'],
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 1,
            'features' => [
                ['text' => ['en' => 'Responsive design'], 'note' => ['en' => '']],
            ],
        ], $overrides);
    }

    public function test_admin_can_create_a_website_package_without_formation_states(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.website-packages.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.website-packages.index', ['locale' => 'en']));

        $package = Package::where('key', 'landing-page')->firstOrFail();

        $this->assertSame(PackageCategory::Website, $package->category);
        $this->assertSame([], $package->formation_states);
        $this->assertSame(['Responsive design'], $package->features->map->localized('text')->all());
    }

    public function test_updating_a_website_package_keeps_it_a_website_package(): void
    {
        $package = Package::factory()->website()->create(['key' => 'landing-page']);

        $this->actingAs(User::factory()->admin()->create())
            ->put(route('admin.website-packages.update', ['locale' => 'en', 'package' => $package]), $this->payload([
                'price_amount' => '$590',
                'formation_states' => ['wyoming'],
            ]))
            ->assertSessionHasNoErrors();

        $package->refresh();
        $this->assertSame('$590', $package->price_amount);
        $this->assertSame(PackageCategory::Website, $package->category);
        $this->assertSame([], $package->formation_states);
    }

    public function test_each_admin_section_lists_only_its_own_packages(): void
    {
        Package::factory()->create(['key' => 'growth']);
        Package::factory()->website()->create(['key' => 'landing-page']);
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.website-packages.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Packages/Index')
                ->where('category', 'website')
                ->where('routeBase', 'admin.website-packages')
                ->has('packages', 1)
                ->where('packages.0.key', 'landing-page')
            );

        $this->actingAs($admin)
            ->get(route('admin.packages.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('category', 'llc')
                ->has('packages', 1)
                ->where('packages.0.key', 'growth')
            );
    }

    public function test_a_package_is_not_reachable_through_the_other_admin_section(): void
    {
        $llcPackage = Package::factory()->create();
        $websitePackage = Package::factory()->website()->create();
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.website-packages.edit', ['locale' => 'en', 'package' => $llcPackage]))
            ->assertNotFound();

        $this->actingAs($admin)
            ->delete(route('admin.packages.destroy', ['locale' => 'en', 'package' => $websitePackage]))
            ->assertNotFound();

        $this->assertModelExists($websitePackage);
    }

    public function test_most_popular_website_package_does_not_affect_llc_packages(): void
    {
        $llcPopular = Package::factory()->create(['is_featured' => true]);
        $websitePopular = Package::factory()->website()->create(['is_featured' => true]);
        $package = Package::factory()->website()->create(['is_featured' => false]);

        $this->actingAs(User::factory()->admin()->create())
            ->patch(route('admin.website-packages.most-popular', ['locale' => 'en', 'package' => $package]))
            ->assertSessionHasNoErrors();

        $this->assertTrue($package->refresh()->is_featured);
        $this->assertFalse($websitePopular->refresh()->is_featured);
        $this->assertTrue($llcPopular->refresh()->is_featured);
    }

    public function test_public_packages_expose_their_category(): void
    {
        Package::factory()->create(['key' => 'growth', 'sort_order' => 1]);
        Package::factory()->website()->create(['key' => 'landing-page', 'sort_order' => 2]);

        $this->get(route('packages', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('packages.0.category', 'llc')
                ->where('packages.1.category', 'website')
                ->where('packages.1.formation_states', [])
            );
    }
}
