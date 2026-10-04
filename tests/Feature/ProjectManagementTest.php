<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(Service $service, array $overrides = []): array
    {
        return array_merge([
            'service_id' => $service->id,
            'slug' => 'billing-platform',
            'title' => ['en' => 'Billing platform', 'ar' => 'منصة الفوترة'],
            'short_description' => ['en' => 'A billing rebuild.'],
            'description' => ['en' => "## Result\n\nZero downtime."],
            'client_name' => 'Ledgerly',
            'project_url' => 'https://example.com',
            'featured_image' => null,
            'status' => Project::STATUS_PUBLISHED,
            'display_order' => 1,
        ], $overrides);
    }

    public function test_service_has_many_projects_and_each_project_belongs_to_its_service(): void
    {
        $service = Service::factory()->create();
        $project = Project::factory()->for($service)->create();

        $this->assertTrue($service->projects->contains($project));
        $this->assertTrue($project->service->is($service));
    }

    public function test_admin_can_create_a_project_for_a_service(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service))
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.projects.index', ['locale' => 'en']));

        $this->assertDatabaseHas('projects', ['slug' => 'billing-platform', 'service_id' => $service->id]);
    }

    public function test_admin_can_update_a_project_keeping_its_own_slug(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();
        $project = Project::factory()->for($service)->create(['slug' => 'billing-platform']);

        $this->actingAs($admin)
            ->put(route('admin.projects.update', ['locale' => 'en', 'project' => $project->id]), $this->payload($service, ['display_order' => 5]))
            ->assertSessionHasNoErrors();

        $this->assertSame(5, $project->refresh()->display_order);
    }

    public function test_slug_must_be_unique_across_projects(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();
        Project::factory()->for($service)->create(['slug' => 'taken-slug']);

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service, ['slug' => 'taken-slug']))
            ->assertSessionHasErrors('slug');
    }

    public function test_service_must_exist(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service, ['service_id' => 999999]))
            ->assertSessionHasErrors('service_id');
    }

    public function test_project_url_must_be_a_valid_url_when_provided(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service, ['project_url' => 'not a url']))
            ->assertSessionHasErrors('project_url');
    }

    public function test_status_must_be_a_known_value(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service, ['status' => 'archived']))
            ->assertSessionHasErrors('status');
    }

    public function test_deleting_a_service_deletes_its_projects(): void
    {
        $service = Service::factory()->create();
        $project = Project::factory()->for($service)->create();

        $service->delete();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_service_page_shows_at_most_six_published_projects_in_display_order(): void
    {
        $service = Service::factory()->create();
        Project::factory()->for($service)->count(8)->sequence(fn ($sequence) => ['display_order' => $sequence->index])->create();
        Project::factory()->for($service)->draft()->create(['display_order' => 0]);

        $this->get(route('services.show', ['locale' => 'en', 'service' => $service->slug]))
            ->assertInertia(fn (Assert $page) => $page
                ->has('projects', 6)
                ->where('projects.0.title', Project::query()->where('service_id', $service->id)->published()->orderBy('display_order')->firstOrFail()->localized('title'))
            );
    }

    public function test_service_page_excludes_draft_projects(): void
    {
        $service = Service::factory()->create();
        Project::factory()->for($service)->draft()->create();

        $this->get(route('services.show', ['locale' => 'en', 'service' => $service->slug]))
            ->assertInertia(fn (Assert $page) => $page->has('projects', 0));
    }

    public function test_published_project_details_page_is_viewable(): void
    {
        $project = Project::factory()->create(['slug' => 'billing-platform']);

        $this->get(route('projects.show', ['locale' => 'en', 'project' => $project->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Projects/Show')->where('project.slug', 'billing-platform'));
    }

    public function test_draft_project_details_page_is_not_found(): void
    {
        $project = Project::factory()->draft()->create();

        $this->get(route('projects.show', ['locale' => 'en', 'project' => $project->slug]))
            ->assertNotFound();
    }

    public function test_admin_project_pages_render_and_filter_by_service(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();
        $other = Service::factory()->create();
        $project = Project::factory()->for($service)->create(['slug' => 'billing-platform']);
        Project::factory()->for($other)->create(['slug' => 'other-project']);

        $this->actingAs($admin)
            ->get(route('admin.projects.index', ['locale' => 'en', 'service' => $service->id]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Projects/Index')
                ->has('projects.data', 1)
                ->where('projects.data.0.slug', 'billing-platform')
            );

        $this->actingAs($admin)
            ->get(route('admin.projects.create', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Projects/Form')->has('services', 2));

        $this->actingAs($admin)
            ->get(route('admin.projects.edit', ['locale' => 'en', 'project' => $project->id]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Projects/Form')
                ->where('project.slug', 'billing-platform')
            );
    }

    public function test_admin_can_add_an_ordered_gallery_to_a_project(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();
        $gallery = ['https://images.example.com/one.jpg', 'https://images.example.com/two.jpg'];

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service, ['gallery' => $gallery]))
            ->assertSessionHasNoErrors();

        $this->assertSame($gallery, Project::where('slug', 'billing-platform')->firstOrFail()->gallery);
    }

    public function test_gallery_is_limited_to_twelve_images(): void
    {
        $admin = User::factory()->admin()->create();
        $service = Service::factory()->create();
        $gallery = array_map(fn (int $i) => "https://images.example.com/{$i}.jpg", range(1, 13));

        $this->actingAs($admin)
            ->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service, ['gallery' => $gallery]))
            ->assertSessionHasErrors('gallery');
    }

    public function test_project_page_exposes_its_gallery(): void
    {
        $project = Project::factory()->create([
            'slug' => 'billing-platform',
            'gallery' => ['https://images.example.com/one.jpg', 'https://images.example.com/two.jpg'],
        ]);

        $this->get(route('projects.show', ['locale' => 'en', 'project' => $project->slug]))
            ->assertInertia(fn (Assert $page) => $page->has('project.gallery', 2)->where('project.gallery.0', 'https://images.example.com/one.jpg'));
    }

    public function test_guests_cannot_manage_projects(): void
    {
        $service = Service::factory()->create();

        $this->post(route('admin.projects.store', ['locale' => 'en']), $this->payload($service))
            ->assertRedirect(route('login', ['locale' => 'en']));

        $this->assertDatabaseCount('projects', 0);
    }
}
