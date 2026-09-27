<?php

namespace Tests\Feature;

use App\Enums\ServiceItemType;
use App\Models\Service;
use App\Models\ServiceItem;
use App\Models\User;
use App\Support\ServiceCatalog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminServiceManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'slug' => 'ai-integration',
            'title' => ['en' => 'AI Integration', 'ar' => 'تكامل الذكاء الاصطناعي', 'fr' => '', 'es' => ''],
            'lead' => ['en' => 'Put AI to work in your product.'],
            'body' => ['en' => 'We design and ship AI features.'],
            'nav_description' => ['en' => 'Useful AI, shipped.'],
            'nav_icon' => 'fa-solid fa-robot',
            'nav_groups' => ['services'],
            'gallery' => ['https://images.example.com/one.jpg'],
            'sort_order' => 5,
            'is_published' => true,
            'offer' => [
                ['label' => ['en' => 'LLM integration'], 'icon' => 'smart_toy'],
                ['label' => ['en' => 'RAG pipelines'], 'icon' => 'database'],
            ],
            'build' => [
                ['label' => ['en' => 'Support copilots'], 'icon' => null],
            ],
        ], $overrides);
    }

    public function test_admin_can_list_services(): void
    {
        Service::factory()->count(2)->create();

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.services.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Services/Index')->has('services', 2));
    }

    public function test_admin_can_create_a_service_with_items(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.services.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.services.index', ['locale' => 'en']));

        $service = Service::where('slug', 'ai-integration')->firstOrFail();

        $this->assertSame(['en' => 'AI Integration', 'ar' => 'تكامل الذكاء الاصطناعي'], $service->title);
        $this->assertSame(['services'], $service->nav_groups);
        $this->assertSame(2, $service->offerItems()->count());
        $this->assertSame('RAG pipelines', $service->offerItems()->get()[1]->localized('label'));
        $this->assertSame(1, $service->buildItems()->count());
    }

    public function test_new_service_is_shown_on_the_public_site_and_in_the_nav(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.services.store', ['locale' => 'en']), $this->payload());

        $this->get(route('services.show', ['locale' => 'ar', 'service' => 'ai-integration']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Services/Show')
                ->where('title', 'تكامل الذكاء الاصطناعي')
                ->where('lead', 'Put AI to work in your product.')
                ->has('offer', 2)
                ->where('build.0.icon', 'check_circle')
                ->where('hasCaseStudy', false)
                ->where('nav.services.0.slug', 'ai-integration')
                ->where('nav.website', [])
            );
    }

    public function test_updating_a_service_replaces_its_items_and_refreshes_the_public_page(): void
    {
        $service = Service::factory()->create(['slug' => 'ai-integration']);
        ServiceItem::factory()->for($service)->count(3)->create();

        $this->get(route('services.show', ['locale' => 'en', 'service' => 'ai-integration']))->assertOk();

        $this->actingAs(User::factory()->admin()->create())
            ->put(route('admin.services.update', ['locale' => 'en', 'service' => $service]), $this->payload([
                'title' => ['en' => 'Applied AI'],
                'offer' => [['label' => ['en' => 'Only item'], 'icon' => 'bolt']],
                'build' => [],
            ]))
            ->assertSessionHasNoErrors();

        $this->assertSame(1, $service->items()->count());
        $this->assertSame(ServiceItemType::Offer, $service->items()->first()->type);

        $this->get(route('services.show', ['locale' => 'en', 'service' => 'ai-integration']))
            ->assertInertia(fn (Assert $page) => $page->where('title', 'Applied AI')->has('offer', 1)->has('build', 0));
    }

    public function test_unpublished_services_are_hidden_from_the_public_site(): void
    {
        Service::factory()->unpublished()->create(['slug' => 'secret-service']);

        $this->get(route('services.show', ['locale' => 'en', 'service' => 'secret-service']))->assertNotFound();
        $this->assertNull(ServiceCatalog::find('secret-service'));
    }

    public function test_validation_requires_english_title_and_a_valid_unique_slug(): void
    {
        Service::factory()->create(['slug' => 'taken']);
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.services.store', ['locale' => 'en']), $this->payload([
                'slug' => 'taken',
                'title' => ['en' => '', 'fr' => 'Seulement en français'],
                'offer' => [['label' => ['en' => ''], 'icon' => 'bolt']],
            ]))
            ->assertSessionHasErrors(['slug', 'title.en', 'offer.0.label.en']);

        $this->actingAs($admin)
            ->post(route('admin.services.store', ['locale' => 'en']), $this->payload(['slug' => 'Not A Slug']))
            ->assertSessionHasErrors('slug');

        $this->actingAs($admin)
            ->post(route('admin.services.store', ['locale' => 'en']), $this->payload(['nav_groups' => ['footer']]))
            ->assertSessionHasErrors('nav_groups.0');
    }

    public function test_admin_can_delete_a_service_and_its_uploaded_images(): void
    {
        Storage::fake('public');
        $path = UploadedFile::fake()->create('work.jpg', 200, 'image/jpeg')->store('content', 'public');
        $service = Service::factory()->create(['gallery' => [$path]]);
        ServiceItem::factory()->for($service)->create();

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.services.destroy', ['locale' => 'en', 'service' => $service]))
            ->assertRedirect(route('admin.services.index', ['locale' => 'en']));

        $this->assertModelMissing($service);
        $this->assertDatabaseCount('service_items', 0);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_non_admin_cannot_modify_services(): void
    {
        $service = Service::factory()->create();
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('admin.services.store', ['locale' => 'en']), $this->payload())->assertForbidden();
        $this->actingAs($user)->delete(route('admin.services.destroy', ['locale' => 'en', 'service' => $service]))->assertForbidden();

        $this->assertModelExists($service);
    }
}
