<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReviewRequest;
use App\Models\Reviews;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => Reviews::query()
                // Reviews waiting for moderation first.
                ->orderBy('is_published')
                ->latest()
                ->latest('id')
                ->paginate(20)
                ->through(fn (Reviews $review) => [
                    'id' => $review->id,
                    'name' => $review->name,
                    'email' => $review->email,
                    'role' => $review->role,
                    'rating' => $review->rating,
                    'review' => $review->review,
                    'is_published' => $review->is_published,
                    'from_account' => $review->user_id !== null,
                    'created_at' => $review->created_at->toIso8601String(),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Reviews/Form', [
            'review' => null,
        ]);
    }

    public function store(ReviewRequest $request): RedirectResponse
    {
        Reviews::create($request->reviewAttributes());

        return to_route('admin.reviews.index')->with('status', __('admin.flash.saved'));
    }

    public function edit(string $locale, Reviews $review): Response
    {
        return Inertia::render('Admin/Reviews/Form', [
            'review' => [
                ...$review->only(['id', 'name', 'email', 'role', 'rating', 'review', 'is_published']),
                'created_at' => $review->created_at->toIso8601String(),
            ],
        ]);
    }

    public function update(ReviewRequest $request, string $locale, Reviews $review): RedirectResponse
    {
        $review->update($request->reviewAttributes());

        return to_route('admin.reviews.index')->with('status', __('admin.flash.saved'));
    }

    public function destroy(string $locale, Reviews $review): RedirectResponse
    {
        $review->delete();

        return to_route('admin.reviews.index')->with('status', __('admin.flash.deleted'));
    }
}
