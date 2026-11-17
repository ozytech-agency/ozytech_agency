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

    /**
     * A request the client deleted before it was synced has no row to add.
     */
    public bool $deleteWhenMissingModels = true;

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

        // Fail loudly (into failed_jobs, replayable with queue:retry) rather than dropping the row.
        if (blank($url) || blank(config('services.google_sheets.secret'))) {
            $this->fail(new RuntimeException('Google Sheets delivery is not configured: set GOOGLE_SHEETS_WEBHOOK_URL and GOOGLE_SHEETS_SECRET.'));

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
            'second_email' => $inquiry->second_email,
            'phone' => $inquiry->phone,
            'date_of_birth' => $inquiry->date_of_birth?->toDateString() ?? '',
            'address' => $inquiry->address ?? '',
            'second_address' => $inquiry->second_address ?? '',
            'llc_name' => $inquiry->llc_name,
            'second_llc_name' => $inquiry->second_llc_name,
            'website' => $inquiry->website,
            'role' => $inquiry->role,
            'work_area' => $inquiry->work_area,
            'package' => $inquiry->package ? ucfirst($inquiry->package) : '',
            'message' => $inquiry->message,
            'referral' => $inquiry->referral,
            'account' => $inquiry->user_id ? 'Registered' : 'Guest',
        ];
    }
}
