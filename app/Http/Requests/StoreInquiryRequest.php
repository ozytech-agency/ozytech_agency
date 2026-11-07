<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Logged-in visitors always submit as their account, whatever the request says;
     * guests provide their own identity in the form.
     * The domain is reduced to a bare host so a pasted URL still validates.
     */
    protected function prepareForValidation(): void
    {
        $domain = $this->input('domain_name');
        if (is_string($domain) && trim($domain) !== '') {
            $domain = preg_replace(['#^[a-z][a-z0-9+.-]*://#i', '#^www\.#i', '#[/?\#].*$#'], '', strtolower(trim($domain)));
        }

        $this->merge([
            ...$this->accountIdentity(),
            'domain_name' => $domain,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isGuest = $this->user() === null;

        return [
            'topic' => ['required', 'string', Rule::in(['new-project', 'partnership', 'support', 'careers', 'press', 'general'])],
            'first_name' => ['required', 'string', 'max:255'],
            // Account names can be a single word, so only guests must fill in a last name.
            'last_name' => [$isGuest ? 'required' : 'nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => $isGuest
                ? ['nullable', 'string', 'max:30', 'regex:/^\+?[0-9\s\-\(\)]{6,20}$/']
                : ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'domain_name' => ['nullable', 'string', 'max:255', 'regex:/^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/i'],
            'role' => ['nullable', 'string', 'max:255'],
            'work_area' => ['nullable', 'string', 'max:100'],
            'package' => ['nullable', 'string', Rule::exists('packages', 'key')->where('is_published', true)],
            'message' => ['required', 'string', 'max:1500'],
            'referral' => ['nullable', 'string', 'max:150'],
            'nda_requested' => ['boolean'],
            'consent' => ['required', 'accepted'],
        ];
    }

    /**
     * Identity fields taken from the authenticated account, or none for a guest.
     *
     * @return array{first_name?: string, last_name?: string, email?: string, phone?: string|null}
     */
    private function accountIdentity(): array
    {
        $user = $this->user();

        if ($user === null) {
            return [];
        }

        [$firstName, $lastName] = array_pad(preg_split('/\s+/', trim($user->name), 2), 2, '');

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $user->email,
            'phone' => $user->phone_number,
        ];
    }
}
