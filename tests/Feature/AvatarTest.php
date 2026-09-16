<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AvatarTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_an_avatar(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('avatar.jpg', 500, 'image/jpeg');

        $response = $this->actingAs($user)->post(route('profile.avatar.update', ['locale' => 'en']), [
            'avatar' => $file,
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect(route('profile.edit', ['locale' => 'en']));

        $user->refresh();
        $this->assertNotNull($user->avatar_path);
        Storage::disk('public')->assertExists($user->avatar_path);
        $this->assertNotNull($user->avatar_url);
    }

    public function test_uploading_a_new_avatar_deletes_the_old_one(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('profile.avatar.update', ['locale' => 'en']), [
            'avatar' => UploadedFile::fake()->create('first.jpg', 500, 'image/jpeg'),
        ]);
        $oldPath = $user->refresh()->avatar_path;

        $this->actingAs($user)->post(route('profile.avatar.update', ['locale' => 'en']), [
            'avatar' => UploadedFile::fake()->create('second.jpg', 500, 'image/jpeg'),
        ]);

        $user->refresh();
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($user->avatar_path);
        $this->assertNotSame($oldPath, $user->avatar_path);
    }

    public function test_user_can_remove_their_avatar(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('profile.avatar.update', ['locale' => 'en']), [
            'avatar' => UploadedFile::fake()->create('avatar.jpg', 500, 'image/jpeg'),
        ]);
        $path = $user->refresh()->avatar_path;

        $response = $this->actingAs($user)->delete(route('profile.avatar.destroy', ['locale' => 'en']));

        $response->assertRedirect(route('profile.edit', ['locale' => 'en']));
        Storage::disk('public')->assertMissing($path);
        $this->assertNull($user->refresh()->avatar_path);
        $this->assertNull($user->avatar_url);
    }

    public function test_avatar_upload_rejects_wrong_mime_type(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('profile.avatar.update', ['locale' => 'en']), [
            'avatar' => UploadedFile::fake()->create('resume.pdf', 500, 'application/pdf'),
        ]);

        $response->assertSessionHasErrors('avatar');
        $this->assertNull($user->refresh()->avatar_path);
    }

    public function test_avatar_upload_rejects_oversized_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('profile.avatar.update', ['locale' => 'en']), [
            'avatar' => UploadedFile::fake()->create('avatar.jpg', 3000, 'image/jpeg'),
        ]);

        $response->assertSessionHasErrors('avatar');
        $this->assertNull($user->refresh()->avatar_path);
    }
}
