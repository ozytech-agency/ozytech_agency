<?php

namespace Tests\Feature;

use App\Models\Policy;
use App\Models\User;
use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPolicyManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'slug' => 'cookie-policy',
            'title' => ['en' => 'Cookie Policy', 'fr' => 'Politique de cookies'],
            'summary' => ['en' => 'How we use cookies.'],
            'body' => ['en' => '<h2>Cookies</h2><p>We use <strong>essential</strong> cookies only.</p>'],
            'sort_order' => 5,
            'is_published' => true,
        ], $overrides);
    }

    public function test_non_admins_cannot_manage_policies(): void
    {
        $policy = Policy::factory()->create();

        $this->get(route('admin.policies.index', ['locale' => 'en']))->assertRedirect(route('login', ['locale' => 'en']));

        $this->actingAs(User::factory()->create())
            ->get(route('admin.policies.index', ['locale' => 'en']))
            ->assertForbidden();

        $this->actingAs(User::factory()->create())
            ->delete(route('admin.policies.destroy', ['locale' => 'en', 'policy' => $policy]))
            ->assertForbidden();

        $this->assertModelExists($policy);
    }

    public function test_admin_can_list_policies_in_display_order(): void
    {
        Policy::factory()->create(['sort_order' => 2, 'title' => ['en' => 'Second']]);
        Policy::factory()->unpublished()->create(['sort_order' => 1, 'title' => ['en' => 'First']]);

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.policies.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Policies/Index')
                ->has('policies', 2)
                ->where('policies.0.title', 'First')
                ->where('policies.0.is_published', false)
                ->where('policies.1.title', 'Second')
            );
    }

    public function test_admin_can_create_a_policy(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.policies.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.policies.index', ['locale' => 'en']));

        $policy = Policy::where('slug', 'cookie-policy')->firstOrFail();
        $this->assertSame('Politique de cookies', $policy->localized('title', 'fr'));
        $this->assertSame(['en' => '<h2>Cookies</h2><p>We use <strong>essential</strong> cookies only.</p>'], $policy->body);
        $this->assertSame(5, $policy->sort_order);
    }

    public function test_policy_html_is_sanitized_when_saved(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.policies.store', ['locale' => 'en']), $this->payload([
                'body' => [
                    'en' => '<p onclick="steal()" style="color:red">Hi</p><script>alert(1)</script><img src="x" onerror="alert(1)">'
                        .'<a href="javascript:alert(1)">bad</a> <a href="https://example.com" target="_blank">good</a>',
                    'ar' => '<p>مرحبا <em>بكم</em></p>',
                ],
            ]))
            ->assertSessionHasNoErrors();

        $body = Policy::where('slug', 'cookie-policy')->firstOrFail()->body;

        $this->assertSame(
            '<p>Hi</p>bad <a href="https://example.com" target="_blank" rel="noopener noreferrer">good</a>',
            $body['en'],
        );
        $this->assertSame('<p>مرحبا <em>بكم</em></p>', $body['ar']);
    }

    public function test_english_title_and_content_are_required(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.policies.store', ['locale' => 'en']), $this->payload([
                'title' => ['en' => '', 'fr' => 'Titre'],
                'body' => ['en' => '<p></p><p>  </p>'],
            ]))
            ->assertSessionHasErrors(['title.en', 'body.en']);

        $this->assertDatabaseCount('policies', 0);
    }

    public function test_slug_must_be_unique_and_url_safe(): void
    {
        Policy::factory()->create(['slug' => 'cookie-policy']);
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.policies.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasErrors('slug');

        $this->actingAs($admin)
            ->post(route('admin.policies.store', ['locale' => 'en']), $this->payload(['slug' => 'Not A Slug']))
            ->assertSessionHasErrors('slug');
    }

    public function test_admin_can_edit_and_update_a_policy_keeping_its_slug(): void
    {
        $policy = Policy::factory()->create(['slug' => 'cookie-policy']);
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.policies.edit', ['locale' => 'en', 'policy' => $policy]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Policies/Form')
                ->where('policy.slug', 'cookie-policy')
                ->has('policy.body.en')
            );

        $this->actingAs($admin)
            ->put(route('admin.policies.update', ['locale' => 'en', 'policy' => $policy]), $this->payload([
                'title' => ['en' => 'Updated cookies'],
                'is_published' => false,
            ]))
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.policies.index', ['locale' => 'en']));

        $policy->refresh();
        $this->assertSame('Updated cookies', $policy->localized('title'));
        $this->assertFalse($policy->is_published);
    }

    public function test_admin_can_delete_a_policy(): void
    {
        $policy = Policy::factory()->create();

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.policies.destroy', ['locale' => 'en', 'policy' => $policy]))
            ->assertRedirect(route('admin.policies.index', ['locale' => 'en']));

        $this->assertModelMissing($policy);
    }

    public function test_published_policy_is_public_in_the_visitors_language(): void
    {
        $policy = Policy::factory()->create([
            'slug' => 'cookie-policy',
            'title' => ['en' => 'Cookie Policy', 'fr' => 'Politique de cookies'],
            'body' => ['en' => '<h2>Cookies</h2><p>English</p>'],
        ]);

        $this->get(route('policies.show', ['locale' => 'fr', 'policy' => $policy->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Policies/Show')
                ->where('policy.title', 'Politique de cookies')
                // No French body yet, so it falls back to English.
                ->where('policy.body_html', '<h2>Cookies</h2><p>English</p>')
                ->has('policy.updated_at')
            );
    }

    public function test_unpublished_and_unknown_policies_are_not_found(): void
    {
        $hidden = Policy::factory()->unpublished()->create();

        $this->get(route('policies.show', ['locale' => 'en', 'policy' => $hidden->slug]))->assertNotFound();
        $this->get(route('policies.show', ['locale' => 'en', 'policy' => 'does-not-exist']))->assertNotFound();
    }

    public function test_footer_and_sitemap_list_only_published_policies(): void
    {
        Policy::factory()->create(['slug' => 'terms', 'title' => ['en' => 'Terms'], 'sort_order' => 2]);
        Policy::factory()->create(['slug' => 'privacy', 'title' => ['en' => 'Privacy'], 'sort_order' => 1]);
        Policy::factory()->unpublished()->create(['slug' => 'draft-policy']);

        $this->get(route('home', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page->where('policyLinks', [
                ['slug' => 'privacy', 'title' => 'Privacy'],
                ['slug' => 'terms', 'title' => 'Terms'],
            ]));

        $this->get(route('sitemap'))
            ->assertOk()
            ->assertSee(route('policies.show', ['locale' => 'en', 'policy' => 'privacy']), false)
            ->assertDontSee('draft-policy', false);
    }

    public function test_content_seeder_imports_the_existing_policies_as_html(): void
    {
        $this->seed(ContentSeeder::class);

        $this->assertSame(
            ['privacy-policy', 'terms-of-service', 'refunds-policy', 'trust-security'],
            Policy::ordered()->pluck('slug')->all(),
        );

        $privacy = Policy::where('slug', 'privacy-policy')->firstOrFail();
        $this->assertSame(trans('policies.privacy-policy.title', [], 'ar'), $privacy->localized('title', 'ar'));
        $this->assertStringStartsWith(
            '<h2>'.e(trans('policies.privacy-policy.sections.0.heading', [], 'fr')).'</h2>',
            $privacy->localized('body', 'fr'),
        );

        $this->get(route('policies.show', ['locale' => 'en', 'policy' => 'terms-of-service']))->assertOk();
    }
}
