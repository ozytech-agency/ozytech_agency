<?php

namespace App\Http\Controllers;

use App\Support\PolicyCatalog;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PolicyController extends Controller
{
    public function show(string $locale, string $policy): Response
    {
        $data = PolicyCatalog::find($policy);

        if (! $data) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('Policies/Show', $data);
    }
}
