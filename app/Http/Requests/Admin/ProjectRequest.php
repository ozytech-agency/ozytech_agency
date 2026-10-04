<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Admin\Concerns\ValidatesLocalizedFields;
use App\Models\Project;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    use ValidatesLocalizedFields;

    public function authorize(): bool
    {
        return (bool) $this->user()?->can('access-admin');
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_id' => ['required', 'integer', Rule::exists('services', 'id')],
            'slug' => ['required', 'string', 'max:150', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('projects', 'slug')->ignore($this->route('project'))],
            ...$this->localizedRules('title', max: 255),
            ...$this->localizedRules('short_description', required: false, max: 500),
            ...$this->localizedRules('description', max: 50000),
            'client_name' => ['nullable', 'string', 'max:255'],
            'project_url' => ['nullable', 'url:http,https', 'max:2048'],
            'featured_image' => ['nullable', 'string', 'max:2048'],
            'gallery' => ['nullable', 'array', 'max:12'],
            'gallery.*' => ['required', 'string', 'max:2048'],
            'status' => ['required', 'string', Rule::in(Project::STATUSES)],
            'display_order' => ['required', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function projectAttributes(): array
    {
        return [
            'service_id' => $this->validated('service_id'),
            'slug' => $this->validated('slug'),
            'title' => $this->cleanLocalized($this->validated('title')),
            'short_description' => $this->cleanLocalized($this->validated('short_description')),
            'description' => $this->cleanLocalized($this->validated('description')),
            'client_name' => $this->validated('client_name'),
            'project_url' => $this->validated('project_url'),
            'featured_image' => $this->validated('featured_image'),
            'gallery' => array_values($this->validated('gallery') ?? []),
            'status' => $this->validated('status'),
            'display_order' => $this->validated('display_order'),
        ];
    }
}
