<?php

namespace App\Http\Controllers;

use App\Support\ContentMedia;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContentMediaController extends Controller
{
    /**
     * Stream an admin-uploaded content image from the public disk.
     */
    public function show(string $filename): StreamedResponse
    {
        $path = ContentMedia::DIRECTORY.'/'.basename($filename);

        abort_unless(Storage::disk('public')->exists($path), 404);

        return Storage::disk('public')->response($path);
    }
}
