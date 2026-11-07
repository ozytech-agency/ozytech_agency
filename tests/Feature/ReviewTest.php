<?php

namespace Tests\Feature;

use App\Models\Reviews;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Amina Benali',
            'email' => 'amina@company.com',
            'role' => 'CTO, Acme Inc.',
            'rating' => 5,
            'review' => 'They rebuilt our booking platform in six weeks. Great team.',
        ], $overrides);
    }

    public function test_guest_can_view_the_reviews_page(): void
    {
        $this->get(route('reviews.create', ['locale' => 'fr']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Reviews')->where('auth.user', null));
    }

    public function test_guest_can_submit_a_review_that_waits_for_moderation(): void
    {
        $this->post(route('reviews.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('reviews.create', ['locale' => 'en']));

        $this->assertDatabaseHas('reviews', [
            'user_id' => null,
            'name' => 'Amina Benali',
            'email' => 'amina@company.com',
            'role' => 'CTO, Acme Inc.',
            'rating' => 5,
            'is_published' => false,
        ]);
    }

    public function test_guests_cannot_publish_their_own_review(): void
    {
        $this->post(route('reviews.store', ['locale' => 'en']), $this->payload(['is_published' => true, 'user_id' => 99]))
            ->assertSessionHasNoErrors();

        $review = Reviews::firstOrFail();
        $this->assertFalse($review->is_published);
        $this->assertNull($review->user_id);
    }

    public function test_signed_in_reviewer_posts_under_their_account(): void
    {
        $user = User::factory()->create(['name' => 'Real Name', 'email' => 'real@example.com']);

        $this->actingAs($user)
            ->post(route('reviews.store', ['locale' => 'en']), $this->payload(['name' => 'Spoofed', 'email' => 'spoofed@example.com']))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('reviews', ['user_id' => $user->id, 'name' => 'Real Name', 'email' => 'real@example.com']);
    }

    public function test_review_submissions_are_validated(): void
    {
        $this->post(route('reviews.store', ['locale' => 'en']), [
            'name' => '',
            'email' => 'not-an-email',
            'rating' => 6,
            'review' => 'Short',
        ])->assertSessionHasErrors(['name', 'email', 'rating', 'review']);

        $this->post(route('reviews.store', ['locale' => 'en']), $this->payload(['review' => str_repeat('a', 501)]))
            ->assertSessionHasErrors('review');

        $this->assertDatabaseCount('reviews', 0);
    }

    public function test_review_submissions_are_rate_limited(): void
    {
        for ($attempt = 0; $attempt < 6; $attempt++) {
            $this->post(route('reviews.store', ['locale' => 'en']), $this->payload())->assertRedirect();
        }

        $this->post(route('reviews.store', ['locale' => 'en']), $this->payload())->assertTooManyRequests();
        $this->assertDatabaseCount('reviews', 6);
    }

    public function test_home_page_shows_only_published_reviews_without_emails(): void
    {
        $older = Reviews::factory()->create(['name' => 'Older', 'created_at' => now()->subDay()]);
        $newer = Reviews::factory()->create(['name' => 'Newer', 'rating' => 4]);
        Reviews::factory()->pending()->create(['name' => 'Pending']);

        $this->get(route('home', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('reviews', 2)
                ->where('reviews.0.id', $newer->id)
                ->where('reviews.0.rating', 4)
                ->where('reviews.1.id', $older->id)
                ->missing('reviews.0.email')
            );
    }

    public function test_home_page_shows_at_most_six_reviews(): void
    {
        Reviews::factory()->count(8)->create();

        $this->get(route('home', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page->has('reviews', 6));
    }

    public function test_reviews_page_is_hidden_from_search_engines(): void
    {
        $this->get(route('sitemap'))
            ->assertOk()
            ->assertDontSee('/reviews', false);

        $this->assertStringContainsString("Disallow: /*/reviews\n", file_get_contents(public_path('robots.txt')));
    }

    public function test_non_admins_cannot_manage_reviews(): void
    {
        $review = Reviews::factory()->create();

        $this->get(route('admin.reviews.index', ['locale' => 'en']))->assertRedirect(route('login', ['locale' => 'en']));

        $this->actingAs(User::factory()->create())
            ->get(route('admin.reviews.index', ['locale' => 'en']))
            ->assertForbidden();

        $this->actingAs(User::factory()->create())
            ->delete(route('admin.reviews.destroy', ['locale' => 'en', 'review' => $review]))
            ->assertForbidden();

        $this->assertModelExists($review);
    }

    public function test_admin_sees_pending_reviews_first(): void
    {
        Reviews::factory()->create(['name' => 'Published']);
        Reviews::factory()->pending()->create(['name' => 'Pending', 'created_at' => now()->subWeek()]);

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.reviews.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Reviews/Index')
                ->has('reviews.data', 2)
                ->where('reviews.data.0.name', 'Pending')
                ->where('reviews.data.0.email', fn (string $email) => $email !== '')
            );
    }

    public function test_admin_can_create_a_review(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.reviews.store', ['locale' => 'en']), [...$this->payload(), 'is_published' => true])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.reviews.index', ['locale' => 'en']));

        $this->assertDatabaseHas('reviews', ['name' => 'Amina Benali', 'is_published' => true]);
    }

    public function test_admin_can_edit_and_publish_a_pending_review(): void
    {
        $review = Reviews::factory()->pending()->create();
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.reviews.edit', ['locale' => 'en', 'review' => $review]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Reviews/Form')->where('review.id', $review->id));

        $this->actingAs($admin)
            ->put(route('admin.reviews.update', ['locale' => 'en', 'review' => $review]), [
                ...$this->payload(['review' => 'Edited for typos, same meaning.', 'rating' => 4]),
                'is_published' => true,
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.reviews.index', ['locale' => 'en']));

        $review->refresh();
        $this->assertTrue($review->is_published);
        $this->assertSame('Edited for typos, same meaning.', $review->review);
        $this->assertSame(4, $review->rating);
    }

    public function test_admin_can_delete_a_review(): void
    {
        $review = Reviews::factory()->create();

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.reviews.destroy', ['locale' => 'en', 'review' => $review]))
            ->assertRedirect(route('admin.reviews.index', ['locale' => 'en']));

        $this->assertModelMissing($review);
    }

    public function test_deleting_a_user_keeps_their_reviews(): void
    {
        $user = User::factory()->create();
        $review = Reviews::factory()->create(['user_id' => $user->id]);

        $user->delete();

        $this->assertNull($review->fresh()->user_id);
    }
}
