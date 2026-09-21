<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Jobs\SendProjectRequestToGoogleSheet;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $inquiry = Inquiry::create([
            ...$validated,
            'last_name' => $validated['last_name'] ?? '',
            'user_id' => $request->user()->id,
        ]);

        if ($inquiry->topic === 'new-project') {
            SendProjectRequestToGoogleSheet::dispatch($inquiry)->afterCommit();
        }

        return Redirect::route('start-a-project');
    }
}
