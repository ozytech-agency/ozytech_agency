<?php

namespace Tests\Feature;

use App\Models\Package;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LocalePreferenceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Package::factory()->create(['key' => 'growth']);
    }

    public function test_first_visit_uses_the_browser_language(): void
    {
        $this->get('/', ['Accept-Language' => 'fr-FR,fr;q=0.9,en;q=0.8'])
            ->assertStatus(302)
            ->assertRedirect('/fr');
    }

    public function test_regional_browser_language_matches_the_base_locale(): void
    {
        $this->get('/', ['Accept-Language' => 'ar-MA'])->assertRedirect('/ar');
    }

    public function test_a_lower_ranked_supported_language_is_used_when_the_first_is_unsupported(): void
    {
        $this->get('/', ['Accept-Language' => 'de-DE,de;q=0.9,es;q=0.5'])->assertRedirect('/es');
    }

    public function test_unsupported_browser_language_falls_back_to_the_default(): void
    {
        $this->get('/', ['Accept-Language' => 'de-DE,de;q=0.9'])->assertRedirect('/en');
    }

    public function test_missing_browser_language_falls_back_to_the_default(): void
    {
        $this->get('/')->assertRedirect('/en');
    }

    public function test_detected_language_is_saved_so_detection_runs_only_once(): void
    {
        $this->get('/', ['Accept-Language' => 'es-ES'])
            ->assertPlainCookie('locale', 'es');
    }

    public function test_saved_language_wins_over_the_browser_language(): void
    {
        $this->withUnencryptedCookie('locale', 'ar')
            ->get('/', ['Accept-Language' => 'fr-FR'])
            ->assertRedirect('/ar')
            ->assertCookieMissing('locale');
    }

    public function test_an_invalid_saved_language_is_ignored(): void
    {
        $this->withUnencryptedCookie('locale', 'xx')
            ->get('/', ['Accept-Language' => 'fr-FR'])
            ->assertRedirect('/fr')
            ->assertPlainCookie('locale', 'fr');
    }

    public function test_query_string_is_kept_through_the_redirect(): void
    {
        $this->get('/?utm_source=facebook&utm_campaign=llc', ['Accept-Language' => 'fr'])
            ->assertRedirect('/fr?utm_source=facebook&utm_campaign=llc');
    }

    public function test_redirect_is_never_cached_across_visitors(): void
    {
        $response = $this->get('/', ['Accept-Language' => 'fr']);

        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
        $this->assertStringContainsString('Accept-Language', $response->headers->get('Vary'));
    }

    public function test_localized_urls_are_never_redirected_by_the_saved_language(): void
    {
        $this->withUnencryptedCookie('locale', 'ar')
            ->get('/fr/start-a-project', ['Accept-Language' => 'es'])
            ->assertOk();
    }

    public function test_saved_language_settings_are_shared_with_the_frontend(): void
    {
        $this->get('/en/start-a-project')
            ->assertInertia(fn (Assert $page) => $page
                ->where('locale_cookie', 'locale')
                ->where('available_locales', ['en', 'ar', 'fr', 'es']));
    }
}
