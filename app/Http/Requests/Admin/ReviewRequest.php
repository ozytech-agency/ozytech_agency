<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('access-admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'role' => ['nullable', 'string', 'max:120'],
            'rating' => ['required', 'integer', 'between:1,5'],
            'review' => ['required', 'string', 'max:500'],
            'is_published' => ['boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function reviewAttributes(): array
    {
        return [
            ...$this->safe()->only(['name', 'email', 'role', 'rating', 'review']),
            'is_published' => $this->boolean('is_published'),
        ];
    }
}
