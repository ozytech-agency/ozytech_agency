<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PolicyRequest;
use App\Models\Policy;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PolicyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Policies/Index', [
            'policies' => Policy::query()
                ->ordered()
                ->get()
                ->map(fn (Policy $policy) => [
                    'id' => $policy->id,
                    'slug' => $policy->slug,
                    'title' => $policy->localized('title'),
                    'sort_order' => $policy->sort_order,
                    'is_published' => $policy->is_published,
                    'updated_at' => $policy->updated_at->toIso8601String(),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Policies/Form', [
            'policy' => null,
            'nextSortOrder' => (int) Policy::max('sort_order') + 1,
        ]);
    }

    public function store(PolicyRequest $request): RedirectResponse
    {
        Policy::create($request->policyAttributes());

        return to_route('admin.policies.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Policy $policy): Response
    {
        return Inertia::render('Admin/Policies/Form', [
            'policy' => $policy->only(['id', 'slug', 'title', 'summary', 'body', 'sort_order', 'is_published']),
        ]);
    }

    public function update(PolicyRequest $request, string $locale, Policy $policy): RedirectResponse
    {
        $policy->update($request->policyAttributes());

        return to_route('admin.policies.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Policy $policy): RedirectResponse
    {
        $policy->delete();

        return to_route('admin.policies.index')->with('status', __('admin.flash.deleted'));
    }
}
