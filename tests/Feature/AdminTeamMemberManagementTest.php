<?php

namespace Tests\Feature;

use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminTeamMemberManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Amina Idrissi',
            'role' => ['en' => 'Backend Engineer', 'ar' => ''],
            'focus' => ['en' => 'API design and platform reliability.'],
            'photo' => null,
            'x_url' => 'https://x.com/aminaidrissi',
            'instagram_url' => null,
            'linkedin_url' => 'https://linkedin.com/in/amina-idrissi',
            'website_url' => null,
            'sort_order' => 2,
            'is_published' => true,
        ], $overrides);
    }

    public function test_admin_can_list_team_members(): void
    {
        TeamMember::factory()->count(2)->create();

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.team-members.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/TeamMembers/Index')->has('teamMembers', 2));
    }

    public function test_admin_can_create_a_team_member(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.team-members.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.team-members.index', ['locale' => 'en']));

        $teamMember = TeamMember::where('name', 'Amina Idrissi')->firstOrFail();

        $this->assertSame(['en' => 'Backend Engineer'], $teamMember->role);
        $this->assertSame('https://linkedin.com/in/amina-idrissi', $teamMember->linkedin_url);
    }

    public function test_new_team_member_is_shown_on_the_public_about_page(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.team-members.store', ['locale' => 'en']), $this->payload());

        $this->get(route('about', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('About')
                ->where('teamMembers.0.name', 'Amina Idrissi')
                ->where('teamMembers.0.role', 'Backend Engineer')
                ->where('teamMembers.0.socials.0.key', 'x')
            );
    }

    public function test_unpublished_team_members_are_hidden_from_the_about_page(): void
    {
        TeamMember::factory()->unpublished()->create();

        $this->get(route('about', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page->has('teamMembers', 0));
    }

    public function test_replacing_the_photo_deletes_the_old_upload(): void
    {
        Storage::fake('public');
        $oldPhoto = UploadedFile::fake()->create('old.jpg', 200, 'image/jpeg')->store('content', 'public');
        $teamMember = TeamMember::factory()->create(['photo' => $oldPhoto]);

        $this->actingAs(User::factory()->admin()->create())
            ->put(route('admin.team-members.update', ['locale' => 'en', 'team_member' => $teamMember]), $this->payload([
                'photo' => 'https://images.example.com/new.jpg',
            ]))
            ->assertSessionHasNoErrors();

        Storage::disk('public')->assertMissing($oldPhoto);
        $this->assertSame('https://images.example.com/new.jpg', $teamMember->refresh()->photo);
    }

    public function test_admin_can_delete_a_team_member(): void
    {
        $teamMember = TeamMember::factory()->create();

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.team-members.destroy', ['locale' => 'en', 'team_member' => $teamMember]))
            ->assertRedirect(route('admin.team-members.index', ['locale' => 'en']));

        $this->assertModelMissing($teamMember);
    }

    public function test_validation_requires_name_and_english_role(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.team-members.store', ['locale' => 'en']), $this->payload([
                'name' => '',
                'role' => ['ar' => 'فقط بالعربية'],
            ]))
            ->assertSessionHasErrors(['name', 'role.en']);
    }

    public function test_non_admin_cannot_modify_team_members(): void
    {
        $teamMember = TeamMember::factory()->create();
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('admin.team-members.store', ['locale' => 'en']), $this->payload())->assertForbidden();
        $this->actingAs($user)->delete(route('admin.team-members.destroy', ['locale' => 'en', 'team_member' => $teamMember]))->assertForbidden();

        $this->assertModelExists($teamMember);
    }
}
