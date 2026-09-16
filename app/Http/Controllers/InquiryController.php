<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        Inquiry::create([
            ...$request->validated(),
            'user_id' => $request->user()?->id,
        ]);

        return Redirect::route('start-a-project');
    }
}
