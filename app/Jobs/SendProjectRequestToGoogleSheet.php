<?php

namespace App\Jobs;

use App\Models\Inquiry;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class SendProjectRequestToGoogleSheet implements ShouldQueue
{
    use Queueable;

    public int $tries = 5;

    public function __construct(public Inquiry $inquiry) {}

    /**
     * Seconds to wait before each retry.
     *
     * @return array<int, int>
     */
    public function backoff(): array
    {
        return [30, 120, 600, 1800];
    }

    /**
     * Append this project request as a row in the Google Sheet through the Apps Script webhook.
     */
    public function handle(): void
    {
        $url = config('services.google_sheets.webhook_url');

        if (blank($url)) {
            return;
        }

        $response = Http::timeout(15)
            ->asJson()
            ->post($url, $this->payload())
            ->throw();

        // Apps Script answers 200 even when its own code fails, so the body has to be checked too.
        if ($response->json('ok') !== true) {
            throw new RuntimeException('Google Sheets webhook rejected the project request: '.$response->body());
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(): array
    {
        $inquiry = $this->inquiry;

        return [
            'secret' => config('services.google_sheets.secret'),
            'request_id' => $inquiry->id,
            'submitted_at' => $inquiry->created_at->toDateString(),
            'full_name' => trim("{$inquiry->first_name} {$inquiry->last_name}"),
            'email' => $inquiry->email,
            'phone' => $inquiry->phone,
            'company' => $inquiry->company,
            'domain_name' => $inquiry->domain_name,
            'work_area' => $inquiry->work_area,
            'package' => $inquiry->package ? ucfirst($inquiry->package) : '',
            'message' => $inquiry->message,
        ];
    }
}
