<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MetaPixelTest extends TestCase
{
    use RefreshDatabase;

    public function test_pixel_is_loaded_when_an_id_is_configured(): void
    {
        config(['services.meta_pixel.id' => '1120357050728174']);

        $this->get(route('start-a-project', ['locale' => 'en']))
            ->assertOk()
            ->assertSee('connect.facebook.net/en_US/fbevents.js', false)
            ->assertSee("fbq('init', '1120357050728174')", false)
            ->assertSee('facebook.com/tr?id=1120357050728174', false);
    }

    public function test_pixel_is_not_loaded_without_an_id(): void
    {
        config(['services.meta_pixel.id' => null]);

        $this->get(route('start-a-project', ['locale' => 'en']))
            ->assertOk()
            ->assertDontSee('fbevents.js', false)
            ->assertDontSee('facebook.com/tr', false);
    }
}
