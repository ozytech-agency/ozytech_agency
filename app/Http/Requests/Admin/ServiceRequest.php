<?php

namespace App\Http\Requests\Admin;

use App\Enums\ServiceItemType;
use App\Http\Requests\Admin\Concerns\ValidatesLocalizedFields;
use App\Models\Service;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
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
        $service = $this->route('service');

        $rules = [
            'slug' => ['required', 'string', 'max:100', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('services', 'slug')->ignore($service)],
            ...$this->localizedRules('title'),
            ...$this->localizedRules('lead', max: 500),
            ...$this->localizedRules('meta_description', required: false, max: 160),
            ...$this->localizedRules('body', max: 5000),
            ...$this->localizedRules('nav_description', required: false),
            'nav_icon' => ['nullable', 'string', 'max:100'],
            'nav_groups' => ['present', 'array'],
            'nav_groups.*' => ['string', Rule::in(Service::NAV_GROUPS)],
            'gallery' => ['present', 'array', 'max:12'],
            'gallery.*' => ['required', 'string', 'max:2048'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_published' => ['boolean'],
        ];

        foreach (ServiceItemType::cases() as $type) {
            $rules[$type->value] = ['present', 'array', 'max:20'];
            $rules["{$type->value}.*.icon"] = ['nullable', 'string', 'max:100'];
            $rules = [...$rules, ...$this->localizedRules("{$type->value}.*.label")];
        }

        return $rules;
    }

    /**
     * @return array<string, mixed>
     */
    public function serviceAttributes(): array
    {
        return [
            'slug' => $this->validated('slug'),
            'title' => $this->cleanLocalized($this->validated('title')),
            'lead' => $this->cleanLocalized($this->validated('lead')),
            'meta_description' => $this->cleanLocalized($this->validated('meta_description')),
            'body' => $this->cleanLocalized($this->validated('body')),
            'nav_description' => $this->cleanLocalized($this->validated('nav_description')),
            'nav_icon' => $this->validated('nav_icon'),
            'nav_groups' => array_values(array_unique($this->validated('nav_groups'))),
            'gallery' => array_values($this->validated('gallery')),
            'sort_order' => $this->validated('sort_order'),
            'is_published' => $this->boolean('is_published'),
        ];
    }

    /**
     * @return list<array{type: ServiceItemType, label: array<string, string>|null, icon: string|null, sort_order: int}>
     */
    public function items(): array
    {
        $items = [];

        foreach (ServiceItemType::cases() as $type) {
            foreach (array_values($this->validated($type->value)) as $index => $item) {
                $items[] = [
                    'type' => $type,
                    'label' => $this->cleanLocalized($item['label'] ?? null),
                    'icon' => $item['icon'] ?? null,
                    'sort_order' => $index,
                ];
            }
        }

        return $items;
    }
}
