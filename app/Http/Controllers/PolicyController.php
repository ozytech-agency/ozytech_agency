<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use Inertia\Inertia;
use Inertia\Response;

class PolicyController extends Controller
{
    public function show(string $locale, Policy $policy): Response
    {
        abort_unless($policy->is_published, 404);

        return Inertia::render('Policies/Show', [
            'policy' => [
                'slug' => $policy->slug,
                'title' => $policy->localized('title'),
                'summary' => $policy->localized('summary'),
                'body_html' => $policy->localized('body') ?? '',
                'updated_at' => $policy->updated_at->toIso8601String(),
            ],
        ]);
    }
}
