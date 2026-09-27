<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Support\ContentMedia;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function show(string $locale, Post $post): Response
    {
        abort_unless($post->isPublished(), 404);

        $related = Post::query()
            ->published()
            ->whereKeyNot($post->getKey())
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Post $related) => $related->toCardArray());

        return Inertia::render('Blog/Show', [
            'post' => [
                ...$post->toCardArray(),
                'cover_image' => ContentMedia::url($post->cover_image),
                'body_html' => $post->renderedBody(),
                'author' => $post->author?->name,
            ],
            'related' => $related,
        ]);
    }
}
