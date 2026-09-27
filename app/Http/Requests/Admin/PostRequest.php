<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Admin\Concerns\ValidatesLocalizedFields;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
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
            'slug' => ['required', 'string', 'max:150', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('posts', 'slug')->ignore($this->route('post'))],
            ...$this->localizedRules('category', max: 100),
            ...$this->localizedRules('title'),
            ...$this->localizedRules('excerpt', max: 500),
            ...$this->localizedRules('body', max: 50000),
            'cover_image' => ['nullable', 'string', 'max:2048'],
            'is_featured' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function postAttributes(): array
    {
        return [
            'slug' => $this->validated('slug'),
            'category' => $this->cleanLocalized($this->validated('category')),
            'title' => $this->cleanLocalized($this->validated('title')),
            'excerpt' => $this->cleanLocalized($this->validated('excerpt')),
            'body' => $this->cleanLocalized($this->validated('body')),
            'cover_image' => $this->validated('cover_image'),
            'is_featured' => $this->boolean('is_featured'),
            'published_at' => $this->validated('published_at'),
        ];
    }
}
