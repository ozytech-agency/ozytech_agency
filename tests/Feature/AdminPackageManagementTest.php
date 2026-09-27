<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\Package;
use App\Models\PackageFeature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPackageManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'key' => 'starter',
            'label' => ['en' => '00 / Start'],
            'title' => ['en' => 'Starter Pack', 'fr' => 'Pack Démarrage'],
            'best_for' => ['en' => 'Best for side projects'],
            'description' => ['en' => 'A small, focused engagement.'],
            'cta' => ['en' => 'Start small'],
            'badge' => ['en' => ''],
            'icon' => 'fa-solid fa-seedling',
            'price_amount' => '$990',
            'price_period' => ['en' => 'one-time'],
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 3,
            'features' => [
                ['text' => ['en' => 'Landing page'], 'note' => ['en' => '']],
                ['text' => ['en' => 'Free domain'], 'note' => ['en' => 'First year only.']],
            ],
        ], $overrides);
    }

    public function test_admin_can_create_a_package_with_features(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.packages.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.packages.index', ['locale' => 'en']));

        $package = Package::where('key', 'starter')->firstOrFail();

        $this->assertNull($package->badge);
        $this->assertSame(['en' => 'Starter Pack', 'fr' => 'Pack Démarrage'], $package->title);
        $this->assertSame(['Landing page', 'Free domain'], $package->features->map->localized('text')->all());
        $this->assertNull($package->features[0]->note);
        $this->assertSame('First year only.', $package->features[1]->localized('note'));
    }

    public function test_admin_can_edit_price_and_reorder_features(): void
    {
        $package = Package::factory()->create(['key' => 'growth', 'price_amount' => '$4,900']);
        PackageFeature::factory()->for($package)->create(['text' => ['en' => 'First'], 'sort_order' => 0]);
        PackageFeature::factory()->for($package)->create(['text' => ['en' => 'Second'], 'sort_order' => 1]);

        $this->actingAs(User::factory()->admin()->create())
            ->put(route('admin.packages.update', ['locale' => 'en', 'package' => $package]), $this->payload([
                'key' => 'growth',
                'price_amount' => '$5,500',
                'features' => [
                    ['text' => ['en' => 'Second'], 'note' => []],
                    ['text' => ['en' => 'First'], 'note' => []],
                ],
            ]))
            ->assertSessionHasNoErrors();

        $package->refresh();
        $this->assertSame('$5,500', $package->price_amount);
        $this->assertSame(['Second', 'First'], $package->features->map->localized('text')->all());
    }

    public function test_public_packages_page_shows_only_published_packages_in_order(): void
    {
        Package::factory()->create(['key' => 'second', 'sort_order' => 2, 'title' => ['en' => 'Second', 'es' => 'Segundo']]);
        Package::factory()->create(['key' => 'first', 'sort_order' => 1]);
        Package::factory()->unpublished()->create(['key' => 'hidden']);

        $this->get(route('packages', ['locale' => 'es']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Packages')
                ->has('packages', 2)
                ->where('packages.0.key', 'first')
                ->where('packages.1.title', 'Segundo')
            );
    }

    public function test_key_cannot_change_once_the_package_has_inquiries(): void
    {
        $package = Package::factory()->create(['key' => 'growth']);
        Inquiry::factory()->create(['package' => 'growth']);

        $this->actingAs(User::factory()->admin()->create())
            ->put(route('admin.packages.update', ['locale' => 'en', 'package' => $package]), $this->payload(['key' => 'renamed']))
            ->assertSessionHasErrors('key');

        $this->assertSame('growth', $package->refresh()->key);
    }

    public function test_package_with_inquiries_cannot_be_deleted(): void
    {
        $package = Package::factory()->create(['key' => 'growth']);
        Inquiry::factory()->create(['package' => 'growth']);

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.packages.destroy', ['locale' => 'en', 'package' => $package]))
            ->assertSessionHasErrors('package');

        $this->assertModelExists($package);
    }

    public function test_package_without_inquiries_can_be_deleted(): void
    {
        $package = Package::factory()->create();
        PackageFeature::factory()->for($package)->create();

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.packages.destroy', ['locale' => 'en', 'package' => $package]))
            ->assertRedirect(route('admin.packages.index', ['locale' => 'en']));

        $this->assertModelMissing($package);
        $this->assertDatabaseCount('package_features', 0);
    }

    public function test_validation_requires_english_copy_and_price(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.packages.store', ['locale' => 'en']), $this->payload([
                'title' => ['en' => ''],
                'price_amount' => '',
                'features' => [['text' => ['en' => ''], 'note' => []]],
            ]))
            ->assertSessionHasErrors(['title.en', 'price_amount', 'features.0.text.en']);
    }
}
