<?php

namespace App\Http\Controllers;

use App\Support\ProjectCatalog;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProjectController extends Controller
{
    public function show(string $locale, string $service): Response
    {
        $data = ProjectCatalog::find($service);

        if (! $data) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('Services/Work', [
            'slug' => $service,
            ...$data,
        ]);
    }
}
