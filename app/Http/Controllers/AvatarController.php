<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AvatarController extends Controller
{
    /**
     * Stream a stored avatar file from the public disk.
     *
     * Served through the app rather than a `public/storage` symlink, since
     * symlinks/junctions aren't available on every filesystem this app runs on
     * (e.g. removable/non-NTFS drives on Windows).
     */
    public function show(string $filename): StreamedResponse|Response
    {
        $path = 'avatars/'.basename($filename);

        abort_unless(Storage::disk('public')->exists($path), 404);

        return Storage::disk('public')->response($path);
    }
}
