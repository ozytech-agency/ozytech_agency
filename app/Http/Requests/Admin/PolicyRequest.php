<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Admin\Concerns\ValidatesLocalizedFields;
use App\Support\RichText;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PolicyRequest extends FormRequest
{
    use ValidatesLocalizedFields;

    public function authorize(): bool
    {
        return (bool) $this->user()?->can('access-admin');
    }

    /**
     * An editor left with only empty paragraphs counts as empty, so English
     * content can't be "filled in" with nothing but whitespace.
     */
    protected function prepareForValidation(): void
    {
        $body = $this->input('body');

        if (is_array($body)) {
            $this->merge([
                'body' => array_map(
                    fn (mixed $html): mixed => is_string($html) && trim(strip_tags(RichText::sanitize($html))) === '' ? null : $html,
                    $body,
                ),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'slug' => ['required', 'string', 'max:150', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('policies', 'slug')->ignore($this->route('policy'))],
            ...$this->localizedRules('title'),
            ...$this->localizedRules('summary', required: false, max: 300),
            ...$this->localizedRules('body', max: 100000),
            'sort_order' => ['required', 'integer', 'min:0', 'max:65535'],
            'is_published' => ['boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function policyAttributes(): array
    {
        return [
            'slug' => $this->validated('slug'),
            'title' => $this->cleanLocalized($this->validated('title')),
            'summary' => $this->cleanLocalized($this->validated('summary')),
            'body' => $this->cleanLocalized($this->validated('body')),
            'sort_order' => (int) $this->validated('sort_order'),
            'is_published' => $this->boolean('is_published'),
        ];
    }
}
