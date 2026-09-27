<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\ContentMedia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    /**
     * Store an image for a blog cover or service gallery. The returned path
     * is what the admin forms submit and the models store.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:4096'],
        ]);

        $path = ContentMedia::store($request->file('image'));

        return response()->json([
            'path' => $path,
            'url' => ContentMedia::url($path),
        ], 201);
    }
}
