<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Models\Reviews;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReviewsController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Reviews');
    }

    /**
     * Anyone can submit a review; it stays hidden until an admin publishes it.
     */
    public function store(StoreReviewRequest $request): RedirectResponse
    {
        Reviews::create([
            ...$request->validated(),
            'user_id' => $request->user()?->id,
            'is_published' => false,
        ]);

        return to_route('reviews.create');
    }
}
