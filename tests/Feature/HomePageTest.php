<?php

namespace Tests\Feature;

use App\Models\Package;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_lists_only_published_packages(): void
    {
        $growth = Package::factory()->create(['key' => 'growth']);
        Package::factory()->create(['key' => 'pro']);
        Package::factory()->unpublished()->create(['key' => 'legacy']);

        $this->get(route('home', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Home')
                ->has('packages', 2)
                ->where('packages', fn ($packages) => collect($packages)->pluck('key')->doesntContain('legacy'))
                ->where('packages.0.key', $growth->key)
            );
    }

    public function test_home_page_renders_without_packages(): void
    {
        $this->get(route('home', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->has('packages', 0));
    }
}
