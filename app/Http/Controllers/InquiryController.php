<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Jobs\RemoveProjectRequestFromGoogleSheet;
use App\Jobs\SendProjectRequestToGoogleSheet;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function destroy(Request $request, string $locale, Inquiry $inquiry): RedirectResponse
    {
        abort_unless($inquiry->user_id === $request->user()->id, 403);

        $wasSyncedToSheet = $inquiry->topic === 'new-project';

        $inquiry->delete();

        if ($wasSyncedToSheet) {
            RemoveProjectRequestFromGoogleSheet::dispatch($inquiry)->afterCommit();
        }

        return Redirect::route('dashboard');
    }
}
