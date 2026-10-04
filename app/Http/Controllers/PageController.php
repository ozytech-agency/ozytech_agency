<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Post;
use App\Models\TeamMember;
use App\Support\ServiceCatalog;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home', [
            'serviceImages' => collect(ServiceCatalog::all())
                ->map(fn (array $service) => $service['gallery'][0] ?? null)
                ->all(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('About', [
            'teamMembers' => TeamMember::query()
                ->published()
                ->ordered()
                ->get()
                ->map(fn (TeamMember $teamMember) => $teamMember->toPublicArray())
                ->all(),
        ]);
    }

    public function startAProject(): Response
    {
        return Inertia::render('StartAProject', [
            'packages' => $this->publishedPackages(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function blog(): Response
    {
        $featured = Post::query()->published()->where('is_featured', true)->latest('published_at')->first();

        $posts = Post::query()
            ->published()
            ->when($featured, fn ($query) => $query->whereKeyNot($featured->getKey()))
            ->latest('published_at')
            ->paginate(9)
            ->through(fn (Post $post) => $post->toCardArray());

        return Inertia::render('Blog', [
            'featuredPost' => $featured?->toCardArray(),
            'posts' => $posts,
        ]);
    }

    public function packages(): Response
    {
        return Inertia::render('Packages', [
            'packages' => $this->publishedPackages(),
        ]);
    }

    public function faq(): Response
    {
        return Inertia::render('Faq');
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function publishedPackages(): array
    {
        return Package::query()
            ->published()
            ->ordered()
            ->with('features')
            ->get()
            ->map(fn (Package $package) => $package->toPublicArray())
            ->all();
    }
}
