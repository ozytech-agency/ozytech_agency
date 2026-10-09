<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Ssr\Gateway;
use Inertia\Ssr\Response as SsrResponse;
use Tests\TestCase;

class AboutPageSeoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config(['app.url' => 'https://ozytechagency.com', 'inertia.ssr.enabled' => false]);
    }

    public function test_arabic_about_page_prints_seo_head_without_ssr(): void
    {
        $response = $this->get('/ar/about')->assertOk();

        $response->assertSee('<title inertia>'.e(__('about.title', [], 'ar')).'</title>', false);
        $response->assertSee('<meta name="description" content="'.e(__('about.meta.description', [], 'ar')).'" inertia>', false);
        $response->assertSee('<link rel="canonical" href="https://ozytechagency.com/ar/about" inertia="canonical">', false);
        $response->assertSee('<meta property="og:url" content="https://ozytechagency.com/ar/about" inertia>', false);
        $response->assertSee('<meta name="twitter:card" content="summary_large_image" inertia>', false);

        foreach (['en', 'ar', 'fr', 'es'] as $locale) {
            $response->assertSee('hreflang="'.$locale.'" href="https://ozytechagency.com/'.$locale.'/about"', false);
        }
        $response->assertSee('hreflang="x-default" href="https://ozytechagency.com/en/about"', false);
    }

    public function test_arabic_about_page_prints_localized_structured_data_without_ssr(): void
    {
        $html = $this->get('/ar/about')->assertOk()->getContent();

        preg_match_all('#<script type="application/ld\+json" inertia="([^"]+)">(.*?)</script>#s', $html, $matches);
        $schemas = array_combine($matches[1], array_map(fn (string $json) => json_decode($json, true), $matches[2]));

        $this->assertSame('Organization', $schemas['organization-json-ld']['@type']);
        $this->assertSame('BreadcrumbList', $schemas['breadcrumb-json-ld']['@type']);
        $this->assertSame(
            [__('nav.home', [], 'ar'), __('nav.about', [], 'ar')],
            array_column($schemas['breadcrumb-json-ld']['itemListElement'], 'name'),
        );
        $this->assertSame('https://ozytechagency.com/ar/about', $schemas['breadcrumb-json-ld']['itemListElement'][1]['item']);
    }

    public function test_fallback_head_is_skipped_when_ssr_renders_the_page(): void
    {
        $this->app->instance(Gateway::class, new class implements Gateway
        {
            public function dispatch(array $page): ?SsrResponse
            {
                return new SsrResponse('<title inertia>SSR title</title>', '<div id="app">SSR body</div>');
            }
        });

        $this->get('/ar/about')
            ->assertOk()
            ->assertSee('<title inertia>SSR title</title>', false)
            ->assertSee('SSR body', false)
            ->assertDontSee('rel="canonical"', false)
            ->assertDontSee('application/ld+json', false);
    }
}
