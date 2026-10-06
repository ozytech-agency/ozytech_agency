<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use App\Models\Service;
use App\Support\PolicyCatalog;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * A single sitemap covering every locale of every indexable page, with
 * per-locale alternates annotated via the sitemap hreflang extension so
 * search engines can tell the 4 locale versions of a URL are translations
 * of one another rather than duplicate content.
 */
class SitemapController extends Controller
{
    /**
     * @var list<string>
     */
    private const LOCALES = ['en', 'ar', 'fr', 'es'];

    /**
     * Static pages, named by their route. These have no backing record to
     * take a lastmod from, so they're omitted (optional per the sitemap spec)
     * rather than guessed.
     *
     * @var list<string>
     */
    private const STATIC_ROUTES = ['home', 'about', 'contact', 'blog', 'packages', 'faq', 'services.index', 'projects.index'];

    public function index(): Response
    {
        $urls = collect();

        foreach (self::STATIC_ROUTES as $routeName) {
            $urls->push($this->entry($routeName));
        }

        Service::query()->published()->ordered()->get(['slug', 'updated_at'])->each(
            fn (Service $service) => $urls->push($this->entry('services.show', ['service' => $service->slug], $service->updated_at))
        );

        Project::query()->published()->get(['slug', 'updated_at'])->each(
            fn (Project $project) => $urls->push($this->entry('projects.show', ['project' => $project->slug], $project->updated_at))
        );

        Post::query()->published()->get(['slug', 'updated_at'])->each(
            fn (Post $post) => $urls->push($this->entry('blog.show', ['post' => $post->slug], $post->updated_at))
        );

        collect(PolicyCatalog::all())->keys()->each(
            fn (string $slug) => $urls->push($this->entry('policies.show', ['policy' => $slug]))
        );

        return response()
            ->view('sitemap', ['urls' => $urls, 'locales' => self::LOCALES])
            ->header('Content-Type', 'application/xml');
    }

    /**
     * @param  array<string, string>  $params
     * @return array{alternates: Collection<string, string>, lastmod: string|null}
     */
    private function entry(string $routeName, array $params = [], ?Carbon $lastmod = null): array
    {
        return [
            'alternates' => collect(self::LOCALES)->mapWithKeys(
                fn (string $locale) => [$locale => route($routeName, [...$params, 'locale' => $locale])]
            ),
            'lastmod' => $lastmod?->toAtomString(),
        ];
    }
}
