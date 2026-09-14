<?php

namespace App\Http\Controllers;

use App\Support\ServiceCatalog;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ServiceController extends Controller
{
    public function show(string $locale, string $service): Response
    {
        $data = ServiceCatalog::find($service);

        if (! $data) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('Services/Show', [
            'slug' => $service,
            ...$data,
            'related' => ServiceCatalog::related($service),
        ]);
    }
}
