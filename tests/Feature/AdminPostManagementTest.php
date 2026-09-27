<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPostManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'slug' => 'shipping-faster',
            'category' => ['en' => 'Delivery'],
            'title' => ['en' => 'Shipping faster', 'ar' => 'الشحن بشكل أسرع'],
            'excerpt' => ['en' => 'How we cut lead time.'],
            'body' => ['en' => "## Why\n\nBecause **speed** matters."],
            'cover_image' => null,
            'is_featured' => false,
            'published_at' => now()->subHour()->toIso8601String(),
        ], $overrides);
    }

    public function test_admin_can_create_a_post_and_is_recorded_as_author(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.posts.store', ['locale' => 'en']), $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('admin.posts.index', ['locale' => 'en']));

        $post = Post::where('slug', 'shipping-faster')->firstOrFail();
        $this->assertTrue($post->author->is($admin));
        $this->assertTrue($post->isPublished());
    }

    public function test_admin_can_list_posts_with_status(): void
    {
        Post::factory()->create();
        Post::factory()->draft()->create();
        Post::factory()->scheduled()->create();

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.posts.index', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Posts/Index')
                ->has('posts.data', 3)
                ->where('posts.data.0.status', 'draft')
            );
    }

    public function test_published_post_is_visible_with_rendered_markdown(): void
    {
        $post = Post::factory()->create([
            'slug' => 'shipping-faster',
            'title' => ['en' => 'Shipping faster', 'fr' => 'Livrer plus vite'],
            'body' => ['en' => "## Why\n\nBecause **speed** matters.\n\n<script>alert(1)</script>"],
        ]);

        $this->get(route('blog.show', ['locale' => 'fr', 'post' => $post->slug]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Blog/Show')
                ->where('post.title', 'Livrer plus vite')
                ->where('post.body_html', fn (string $html) => str_contains($html, '<h2>Why</h2>')
                    && str_contains($html, '<strong>speed</strong>')
                    && ! str_contains($html, '<script>'))
            );
    }

    public function test_drafts_and_scheduled_posts_are_not_public(): void
    {
        $draft = Post::factory()->draft()->create();
        $scheduled = Post::factory()->scheduled()->create();

        $this->get(route('blog.show', ['locale' => 'en', 'post' => $draft->slug]))->assertNotFound();
        $this->get(route('blog.show', ['locale' => 'en', 'post' => $scheduled->slug]))->assertNotFound();

        $this->get(route('blog', ['locale' => 'en']))
            ->assertInertia(fn (Assert $page) => $page->has('posts.data', 0)->where('featuredPost', null));
    }

    public function test_blog_index_separates_the_featured_post(): void
    {
        $featured = Post::factory()->featured()->create();
        Post::factory()->count(2)->create();

        $this->get(route('blog', ['locale' => 'en']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Blog')
                ->where('featuredPost.slug', $featured->slug)
                ->has('posts.data', 2)
            );
    }

    public function test_replacing_the_cover_deletes_the_old_upload(): void
    {
        Storage::fake('public');
        $oldCover = UploadedFile::fake()->create('old.jpg', 200, 'image/jpeg')->store('content', 'public');
        $post = Post::factory()->create(['cover_image' => $oldCover]);

        $this->actingAs(User::factory()->admin()->create())
            ->put(route('admin.posts.update', ['locale' => 'en', 'post' => $post]), $this->payload([
                'slug' => $post->slug,
                'cover_image' => 'https://images.example.com/new.jpg',
            ]))
            ->assertSessionHasNoErrors();

        Storage::disk('public')->assertMissing($oldCover);
        $this->assertSame('https://images.example.com/new.jpg', $post->refresh()->cover_image);
    }

    public function test_admin_can_delete_a_post(): void
    {
        $post = Post::factory()->create();

        $this->actingAs(User::factory()->admin()->create())
            ->delete(route('admin.posts.destroy', ['locale' => 'en', 'post' => $post]))
            ->assertRedirect(route('admin.posts.index', ['locale' => 'en']));

        $this->assertModelMissing($post);
    }

    public function test_validation_requires_english_title_body_and_unique_slug(): void
    {
        Post::factory()->create(['slug' => 'taken']);

        $this->actingAs(User::factory()->admin()->create())
            ->post(route('admin.posts.store', ['locale' => 'en']), $this->payload([
                'slug' => 'taken',
                'title' => ['ar' => 'عنوان'],
                'body' => ['en' => ''],
                'published_at' => 'not-a-date',
            ]))
            ->assertSessionHasErrors(['slug', 'title.en', 'body.en', 'published_at']);
    }
}
