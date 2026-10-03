<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactMessageRequest;
use App\Mail\ContactFormReceived;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Mail::to(config('services.contact.recipient'))
            ->send(new ContactFormReceived($validated['name'], $validated['email'], $validated['message']));

        return back();
    }
}
