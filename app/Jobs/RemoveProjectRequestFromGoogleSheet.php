<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class RemoveProjectRequestFromGoogleSheet implements ShouldQueue
{
    use Queueable;

    public int $tries = 5;

    /**
     * Takes the id rather than the model: the inquiry is already deleted, so a
     * serialized model could not be restored when the worker picks the job up.
     */
    public function __construct(public int $requestId) {}

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

        // Fail loudly (into failed_jobs, replayable with queue:retry) rather than leaving a stale row.
        if (blank($url) || blank(config('services.google_sheets.secret'))) {
            $this->fail(new RuntimeException('Google Sheets delivery is not configured: set GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_SECRET.'));

            return;
        }

        $response = Http::timeout(15)
            ->asJson()
            ->post($url, [
                'secret' => config('services.google_sheets.secret'),
                'action' => 'remove',
                'request_id' => $this->requestId,
            ])
            ->throw();

        // Apps Script answers 200 even when its own code fails, so the body has to be checked too.
        if ($response->json('ok') !== true) {
            throw new RuntimeException('Google Sheets webhook rejected the row removal: '.$response->body());
        }
    }
}
