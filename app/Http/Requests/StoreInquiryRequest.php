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
     * Identity fields always come from the authenticated account, never the request.
     * The domain is reduced to a bare host so a pasted URL still validates.
     */
    protected function prepareForValidation(): void
    {
        $user = $this->user();
        [$firstName, $lastName] = array_pad(preg_split('/\s+/', trim($user->name), 2), 2, '');

        $domain = $this->input('domain_name');
        if (is_string($domain) && trim($domain) !== '') {
            $domain = preg_replace(['#^[a-z][a-z0-9+.-]*://#i', '#^www\.#i', '#[/?\#].*$#'], '', strtolower(trim($domain)));
        }

        $this->merge([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $user->email,
            'phone' => $user->phone_number,
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
        return [
            'topic' => ['required', 'string', Rule::in(['new-project', 'partnership', 'support', 'careers', 'press', 'general'])],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'domain_name' => ['nullable', 'string', 'max:255', 'regex:/^(?!-)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/i'],
            'role' => ['nullable', 'string', 'max:255'],
            'work_area' => ['nullable', 'string', 'max:100'],
            'package' => ['nullable', 'string', Rule::in(['growth', 'pro', 'ultimate'])],
            'message' => ['required', 'string', 'max:1500'],
            'referral' => ['nullable', 'string', 'max:150'],
            'nda_requested' => ['boolean'],
            'consent' => ['required', 'accepted'],
        ];
    }
}
