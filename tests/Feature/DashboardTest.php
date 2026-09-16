<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_away_from_dashboard(): void
    {
        $response = $this->get(route('dashboard', ['locale' => 'en']));

        $response->assertRedirect(route('login', ['locale' => 'en']));
    }

    public function test_authenticated_user_sees_only_their_own_inquiries(): void
    {
        $user = User::factory()->create();
        Inquiry::factory()->for($user)->count(2)->create();
        Inquiry::factory()->create();

        $response = $this->actingAs($user)->get(route('dashboard', ['locale' => 'en']));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->has('inquiries', 2)
            );
    }
}
