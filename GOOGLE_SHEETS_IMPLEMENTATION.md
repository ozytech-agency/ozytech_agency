# Start a Project → Google Sheet: Implementation Plan

Goal: every time someone submits a **project request** through the *Start a project* form (`InquiryController@store`, topic `new-project`), append one row to a Google Sheet.

Scope: **project requests only**. Other topics the form supports (partnership, support, careers, press, general) are still saved in the database but are **not** sent to the sheet.

## 1. Approach (and why)

| Option | Needs | Verdict |
|---|---|---|
| **A. Google Apps Script web app (webhook)** | A Sheet + a ~30-line script. No Google Cloud project, no service account, **no new Composer package**. | **Recommended** |
| B. Google Sheets API + service account | Google Cloud project, JSON key, `google/apiclient` or `revolution/laravel-google-sheets` (new dependency, needs your approval per CLAUDE.md). | Only if you later need read/update/delete from Laravel |

The plan uses **Option A**. Laravel's built-in `Http` client posts JSON to the script URL; the script appends the row.

The push runs in a **queued job** (`QUEUE_CONNECTION=database` is already the default), so:
- the visitor never waits on Google,
- a Google outage or bad URL never breaks form submission,
- failures are retried and land in `failed_jobs`.

The database stays the source of truth; the sheet is a copy.

## 2. Sheet layout

Create a Google Sheet, rename the first tab to `Project Requests`, and put these headers in row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Submitted at | Full name | Email | Phone number | Company name | Domain name | Work area | Package interest | Project details | Request ID |

`Request ID` is the one extra column beyond your list. It lets us backfill and avoid duplicates. Drop it if you don't want it.

Field mapping (`inquiries` table → sheet):

| Sheet column | Source |
|---|---|
| Submitted at | `created_at` |
| Full name | `first_name` + `last_name` (trimmed) |
| Email | `email` |
| Phone number | `phone` |
| Company name | `company` |
| Domain name | `domain_name` |
| Work area | `work_area` |
| Package interest | `package` → `Growth` / `Pro` / `Ultimate` (blank if none) |
| Project details | `message` |
| Request ID | `id` |

## 3. Step 1 – Google side (manual, ~5 min)

1. In the Sheet: **Extensions → Apps Script**.
2. Replace the contents with:

```javascript
const SECRET = 'PASTE_A_LONG_RANDOM_STRING_HERE'; // must equal GOOGLE_SHEETS_SECRET in .env
const SHEET_NAME = 'Project Requests';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const row = [
      data.submitted_at, data.full_name, data.email, data.phone, data.company,
      data.domain_name, data.work_area, data.package, data.message, data.request_id,
    ];

    const target = sheet.getLastRow() + 1;
    const range = sheet.getRange(target, 1, 1, row.length);
    range.setNumberFormat('@'); // plain text: keeps "+212…" phones intact and stops "=…" being run as a formula
    range.setValues([row]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorize when prompted, then copy the **Web app URL** (`https://script.google.com/macros/s/…/exec`).

Because "Anyone" can hit that URL, the `SECRET` check is what protects the sheet. Use a long random value (`php -r "echo bin2hex(random_bytes(24));"`).

> After editing the script later you must **Deploy → Manage deployments → Edit → New version**, or the old code keeps running.

## 4. Step 2 – Laravel config

`.env` and `.env.example` (leave the values empty in `.env.example`):

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SHEETS_SECRET=the-same-random-string
```

`config/services.php`, add:

```php
'google_sheets' => [
    'webhook_url' => env('GOOGLE_SHEETS_WEBHOOK_URL'),
    'secret' => env('GOOGLE_SHEETS_SECRET'),
],
```

If the URL is empty (local dev, tests) the job does nothing, so the feature is off unless configured.

## 5. Step 3 – Laravel code

Generate with Artisan (`--no-interaction`):

```
php artisan make:job SendProjectRequestToGoogleSheet --no-interaction
```

**`app/Jobs/SendProjectRequestToGoogleSheet.php`** (shape):

```php
class SendProjectRequestToGoogleSheet implements ShouldQueue
{
    use Queueable;

    public int $tries = 5;

    /** @return array<int, int> */
    public function backoff(): array
    {
        return [30, 120, 600, 1800];
    }

    public function __construct(public Inquiry $inquiry) {}

    public function handle(): void
    {
        $url = config('services.google_sheets.webhook_url');

        if (blank($url)) {
            return;
        }

        $response = Http::timeout(15)->asJson()->post($url, [
            'secret' => config('services.google_sheets.secret'),
            'request_id' => $this->inquiry->id,
            'submitted_at' => $this->inquiry->created_at->toDateTimeString(),
            'full_name' => trim("{$this->inquiry->first_name} {$this->inquiry->last_name}"),
            'email' => $this->inquiry->email,
            'phone' => $this->inquiry->phone,
            'company' => $this->inquiry->company,
            'domain_name' => $this->inquiry->domain_name,
            'work_area' => $this->inquiry->work_area,
            'package' => $this->inquiry->package ? ucfirst($this->inquiry->package) : '',
            'message' => $this->inquiry->message,
        ])->throw();

        // Apps Script answers 200 even on its own errors, so check the body too.
        if ($response->json('ok') !== true) {
            throw new RuntimeException('Google Sheets webhook rejected the project request: '.$response->body());
        }
    }
}
```

Notes:
- `Http` follows Apps Script's 302 redirect automatically; the row is already written by then.
- The mapping can move to an `Inquiry::sheetPayload(): array` method if you'd rather keep the job a thin sender.

**`app/Http/Controllers/InquiryController.php`**: dispatch after the row is created, only for project requests.

```php
$inquiry = Inquiry::create([...]);

if ($inquiry->topic === 'new-project') {
    SendProjectRequestToGoogleSheet::dispatch($inquiry)->afterCommit();
}
```

No changes are needed in the React form, `StoreInquiryRequest`, or the migrations, since every field you listed is already collected and stored.

## 6. Step 4 – Run the queue

The job only runs if a worker is running:

- Local: `composer run dev` (check that its command list includes `queue:listen`; if not, run `php artisan queue:work` separately).
- Production: a persistent worker (Supervisor / systemd / your host's queue daemon) running `php artisan queue:work --tries=5`, restarted on every deploy with `php artisan queue:restart`.
- Confirm the `jobs` and `failed_jobs` tables are migrated.

## 7. Step 5 – Tests

Extend `tests/Feature/InquiryTest.php` (PHPUnit, factories, no real HTTP):

1. Submitting a `new-project` request dispatches `SendProjectRequestToGoogleSheet` (`Queue::fake()`).
2. Submitting any other topic (e.g. `support`) dispatches nothing.
3. The job posts the expected payload: `Http::fake()` + `Http::assertSent()` checking `full_name`, `email`, `phone`, `company`, `domain_name`, `work_area`, `package`, `message`, and the secret.
4. The job does nothing when `services.google_sheets.webhook_url` is empty (`Http::assertNothingSent()`).
5. The job throws (so it retries) when the webhook returns `{"ok": false}` or a 500.
6. An invalid submission dispatches nothing.

Run: `php artisan test --compact --filter=InquiryTest`, then `vendor/bin/pint --dirty --format agent`.

## 8. Step 6 – Manual end-to-end check

1. Fill the `.env` values, run `php artisan config:clear`.
2. Start the worker, submit the form as a logged-in user with topic "new project".
3. A new row should appear in the sheet within seconds. Check `php artisan queue:failed` if it doesn't.
4. Test with a phone like `+212 6…` and a message starting with `=1+1`. Both should show as plain text.

## 9. Optional follow-ups

- **Backfill** existing `new-project` inquiries with a one-off command that dispatches the job for each (the `Request ID` column lets you skip ones already in the sheet).
- **Status column**: add `sheet_synced_at` to `inquiries` to see which rows failed to sync.
- **Notification** to Slack/email on repeated failure (`config/services.php` already has a Slack block).
- **Privacy**: the sheet holds personal data (name, email, phone). Share it only with the people who need it, and mention it in the privacy policy (`PolicyCatalog`) if the policy lists processors.

## 10. Decisions to confirm before I implement

1. **Only `new-project` goes to the sheet** (assumed above). Say so if you also want partnership requests.
2. **Keep the extra `Request ID` column?** Default: yes.
3. **Google side:** you create the Sheet and Apps Script (Step 1) and give me the values for `.env`; I can't do that part.

## 11. File checklist

| Action | File |
|---|---|
| New | `app/Jobs/SendProjectRequestToGoogleSheet.php` |
| Edit | `app/Http/Controllers/InquiryController.php` (dispatch for `new-project`) |
| Edit | `config/services.php` (`google_sheets`) |
| Edit | `.env.example` (two keys) |
| Edit | `tests/Feature/InquiryTest.php` |
| Manual | Google Sheet + Apps Script deployment |
