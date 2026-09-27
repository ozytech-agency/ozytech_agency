<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Images uploaded from the admin dashboard (blog covers, service galleries).
 *
 * Stored on the public disk under `content/` and streamed through
 * ContentMediaController, like avatars, so no `public/storage` symlink is
 * needed.
 */
class ContentMedia
{
    public const DIRECTORY = 'content';

    public static function store(UploadedFile $file): string
    {
        return $file->store(self::DIRECTORY, 'public');
    }

    /**
     * Resolve a stored path (or an external URL) to a public URL.
     */
    public static function url(?string $pathOrUrl): ?string
    {
        if (blank($pathOrUrl)) {
            return null;
        }

        if (Str::startsWith($pathOrUrl, ['http://', 'https://'])) {
            return $pathOrUrl;
        }

        return route('media.content', ['filename' => basename($pathOrUrl)]);
    }

    /**
     * Delete a stored file; external URLs are ignored.
     */
    public static function delete(?string $pathOrUrl): void
    {
        if (self::isStored($pathOrUrl)) {
            Storage::disk('public')->delete($pathOrUrl);
        }
    }

    public static function isStored(?string $pathOrUrl): bool
    {
        return filled($pathOrUrl) && Str::startsWith($pathOrUrl, self::DIRECTORY.'/');
    }
}
