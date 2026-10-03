<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use App\Models\Service;
use App\Support\PolicyCatalog;
use Illuminate\Http\Response;
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
     * Static pages, named by their route.
     *
     * @var list<string>
     */
    private const STATIC_ROUTES = ['home', 'about', 'contact', 'blog', 'packages', 'faq'];

    public function index(): Response
    {
        $urls = collect();

        foreach (self::STATIC_ROUTES as $routeName) {
            $urls->push($this->alternates($routeName));
        }

        Service::query()->published()->ordered()->pluck('slug')->each(
            fn (string $slug) => $urls->push($this->alternates('services.show', ['service' => $slug]))
        );

        Project::query()->pluck('slug')->each(
            fn (string $slug) => $urls->push($this->alternates('services.work', ['service' => $slug]))
        );

        Post::query()->published()->pluck('slug')->each(
            fn (string $slug) => $urls->push($this->alternates('blog.show', ['post' => $slug]))
        );

        collect(PolicyCatalog::all())->keys()->each(
            fn (string $slug) => $urls->push($this->alternates('policies.show', ['policy' => $slug]))
        );

        return response()
            ->view('sitemap', ['urls' => $urls, 'locales' => self::LOCALES])
            ->header('Content-Type', 'application/xml');
    }

    /**
     * @param  array<string, string>  $params
     * @return Collection<string, string>
     */
    private function alternates(string $routeName, array $params = []): Collection
    {
        return collect(self::LOCALES)->mapWithKeys(
            fn (string $locale) => [$locale => route($routeName, [...$params, 'locale' => $locale])]
        );
    }
}
