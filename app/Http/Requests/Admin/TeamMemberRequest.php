<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Admin\Concerns\ValidatesLocalizedFields;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TeamMemberRequest extends FormRequest
{
    use ValidatesLocalizedFields;

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
            'name' => ['required', 'string', 'max:150'],
            ...$this->localizedRules('role', max: 150),
            ...$this->localizedRules('focus', max: 500),
            'photo' => ['nullable', 'string', 'max:2048'],
            'x_url' => ['nullable', 'url', 'max:2048'],
            'instagram_url' => ['nullable', 'url', 'max:2048'],
            'linkedin_url' => ['nullable', 'url', 'max:2048'],
            'website_url' => ['nullable', 'url', 'max:2048'],
            'sort_order' => ['integer', 'min:0'],
            'is_published' => ['boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function teamMemberAttributes(): array
    {
        return [
            'name' => $this->validated('name'),
            'role' => $this->cleanLocalized($this->validated('role')),
            'focus' => $this->cleanLocalized($this->validated('focus')),
            'photo' => $this->validated('photo'),
            'x_url' => $this->validated('x_url'),
            'instagram_url' => $this->validated('instagram_url'),
            'linkedin_url' => $this->validated('linkedin_url'),
            'website_url' => $this->validated('website_url'),
            'sort_order' => $this->validated('sort_order') ?? 0,
            'is_published' => $this->boolean('is_published'),
        ];
    }
}
