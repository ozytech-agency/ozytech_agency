<?php

namespace App\Jobs;

use App\Models\Inquiry;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class RemoveProjectRequestFromGoogleSheet implements ShouldQueue
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
     * Ask the Apps Script webhook to delete this project request's row from the Google Sheet.
     */
    public function handle(): void
    {
        $url = config('services.google_sheets.webhook_url');

        if (blank($url)) {
            return;
        }

        $response = Http::timeout(15)
            ->asJson()
            ->post($url, [
                'secret' => config('services.google_sheets.secret'),
                'action' => 'remove',
                'request_id' => $this->inquiry->id,
            ])
            ->throw();

        // Apps Script answers 200 even when its own code fails, so the body has to be checked too.
        if ($response->json('ok') !== true) {
            throw new RuntimeException('Google Sheets webhook rejected the row removal: '.$response->body());
        }
    }
}
