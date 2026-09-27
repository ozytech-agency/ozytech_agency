<?php

namespace Tests\Feature;

use App\Models\Package;
use App\Models\Post;
use App\Models\Service;
use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContentSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_imports_the_existing_content_in_every_locale(): void
    {
        $this->seed(ContentSeeder::class);

        $this->assertSame(20, Service::count());
        $this->assertSame(['growth', 'pro', 'ultimate'], Package::ordered()->pluck('key')->all());
        $this->assertSame(4, Post::count());

        $service = Service::where('slug', 'software-development')->firstOrFail();
        $this->assertSame(trans('services.software-development.title', [], 'ar'), $service->localized('title', 'ar'));
        $this->assertSame(['services'], $service->nav_groups);
        $this->assertSame(3, $service->offerItems()->count());
        $this->assertSame('apartment', $service->offerItems()->first()->icon);

        $pro = Package::where('key', 'pro')->firstOrFail();
        $this->assertTrue($pro->is_featured);
        $this->assertSame(trans('packages.cards.1.price.amount', [], 'en'), $pro->price_amount);
        $this->assertSame(count(trans('packages.cards.1.features', [], 'en')), $pro->features()->count());
        $this->assertSame(trans('packages.cards.1.features.0.note', [], 'fr'), $pro->features()->first()->localized('note', 'fr'));

        $this->assertSame(1, Post::where('is_featured', true)->count());
    }

    public function test_it_is_idempotent_and_keeps_admin_edits(): void
    {
        $this->seed(ContentSeeder::class);

        Package::where('key', 'growth')->update(['price_amount' => '$1']);

        $this->seed(ContentSeeder::class);

        $this->assertSame(20, Service::count());
        $this->assertSame(3, Package::count());
        $this->assertSame(4, Post::count());
        $this->assertSame('$1', Package::where('key', 'growth')->value('price_amount'));
    }

    public function test_seeded_content_renders_the_same_pages_as_before(): void
    {
        $this->seed(ContentSeeder::class);

        $this->get(route('services.show', ['locale' => 'en', 'service' => 'web-development']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('title', trans('services.web-development.title', [], 'en'))
                ->has('gallery', 3)
                ->has('related', 3)
                ->where('hasCaseStudy', true)
                ->has('nav.services', 10)
                ->has('nav.website', 6)
            );

        $this->get(route('services.work', ['locale' => 'en', 'service' => 'web-development']))->assertOk();

        $this->get(route('packages', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page->has('packages', 3)->where('packages.1.badge', trans('packages.cards.1.badge', [], 'en')));
    }
}
