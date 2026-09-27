<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostRequest;
use App\Models\Post;
use App\Support\ContentMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::query()
                ->with('author:id,name')
                ->when($search !== '', fn ($query) => $query->where(fn ($query) => $query
                    ->where('slug', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")))
                ->orderByRaw('published_at is null desc')
                ->latest('published_at')
                ->latest('id')
                ->paginate(20)
                ->withQueryString()
                ->through(fn (Post $post) => [
                    'id' => $post->id,
                    'slug' => $post->slug,
                    'title' => $post->localized('title'),
                    'category' => $post->localized('category'),
                    'author' => $post->author?->name,
                    'is_featured' => $post->is_featured,
                    'status' => match (true) {
                        $post->published_at === null => 'draft',
                        $post->isPublished() => 'published',
                        default => 'scheduled',
                    },
                    'published_at' => $post->published_at?->toIso8601String(),
                ]),
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Posts/Form', [
            'post' => null,
        ]);
    }

    public function store(PostRequest $request): RedirectResponse
    {
        Post::create([
            ...$request->postAttributes(),
            'author_id' => $request->user()->id,
        ]);

        return to_route('admin.posts.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Post $post): Response
    {
        return Inertia::render('Admin/Posts/Form', [
            'post' => [
                ...$post->only(['id', 'slug', 'category', 'title', 'excerpt', 'body', 'cover_image', 'is_featured']),
                'cover_image_url' => ContentMedia::url($post->cover_image),
                'published_at' => $post->published_at?->toIso8601String(),
                'is_published' => $post->isPublished(),
            ],
        ]);
    }

    public function update(PostRequest $request, string $locale, Post $post): RedirectResponse
    {
        $previousCover = $post->cover_image;

        $post->update($request->postAttributes());

        if ($previousCover !== $post->cover_image) {
            ContentMedia::delete($previousCover);
        }

        return to_route('admin.posts.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Post $post): RedirectResponse
    {
        $post->delete();

        ContentMedia::delete($post->cover_image);

        return to_route('admin.posts.index')->with('status', __('admin.flash.deleted'));
    }
}
