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
     * The website is reduced to a bare host so a pasted URL still validates.
     */
    protected function prepareForValidation(): void
    {
        $website = $this->input('website');
        if (is_string($website) && trim($website) !== '') {
            $website = preg_replace(['#^[a-z][a-z0-9+.-]*://#i', '#^www\.#i', '#[/?\#].*$#'], '', strtolower(trim($website)));
        }

        $this->merge([
            ...$this->accountIdentity(),
            'website' => $website,
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
            'second_email' => ['nullable', 'string', 'email', 'max:255'],
            'phone' => $isGuest
                ? ['required', 'string', 'max:30', 'regex:/^\+?[0-9\s\-\(\)]{6,20}$/']
                : ['nullable', 'string', 'max:50'],
            'llc_name' => ['nullable', 'string', 'max:255'],
            'second_llc_name' => ['nullable', 'string', 'max:255'],
            'has_website' => ['boolean'],
            // Only kept when the visitor says they have a website; then it must be filled in.
            'website' => [Rule::excludeIf(! $this->boolean('has_website')), 'required', 'string', 'max:255', 'regex:/^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/i'],
            'role' => ['nullable', 'string', 'max:255'],
            'work_area' => ['nullable', 'string', 'max:100'],
            'package' => ['nullable', 'string', Rule::exists('packages', 'key')->where('is_published', true)],
            'message' => ['required', 'string', 'max:1500'],
            'referral' => ['nullable', 'string', 'max:150'],
            'consent' => ['required', 'accepted'],
        ];
    }

    /**
     * Readable names for fields whose keys would read awkwardly in error messages.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'second_email' => 'second email',
            'llc_name' => 'suggested LLC name',
            'second_llc_name' => 'second suggested LLC name',
            'website' => 'website name',
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
