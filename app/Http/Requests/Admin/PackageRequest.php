<?php

namespace App\Http\Requests\Admin;

use App\Enums\FormationState;
use App\Enums\PackageCategory;
use App\Http\Requests\Admin\Concerns\ValidatesLocalizedFields;
use App\Models\Package;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class PackageRequest extends FormRequest
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
            'key' => ['required', 'string', 'max:50', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('packages', 'key')->ignore($this->route('package'))],
            ...$this->localizedRules('label', max: 100),
            ...$this->localizedRules('title', max: 100),
            ...$this->localizedRules('best_for'),
            ...$this->localizedRules('description', max: 1000),
            ...$this->localizedRules('cta', max: 100),
            ...$this->localizedRules('badge', required: false, max: 50),
            'icon' => ['nullable', 'string', 'max:100'],
            'price_amount' => ['required', 'string', 'max:50'],
            'old_price_amount' => ['nullable', 'string', 'max:50'],
            'formation_states' => $this->isForWebsitePackage() ? ['nullable', 'array'] : ['required', 'array', 'min:1'],
            'formation_states.*' => ['distinct', Rule::enum(FormationState::class)],
            ...$this->localizedRules('price_period', max: 50),
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'sort_order' => ['required', 'integer', 'min:1', 'max:'.$this->maxPosition()],
            'features' => ['present', 'array', 'max:30'],
            ...$this->localizedRules('features.*.text'),
            ...$this->localizedRules('features.*.note', required: false, max: 500),
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'sort_order.max' => __('admin.packages.position_out_of_range', ['max' => $this->maxPosition()]),
            'sort_order.min' => __('admin.packages.position_out_of_range', ['max' => $this->maxPosition()]),
        ];
    }

    /**
     * The category this request saves a package into.
     */
    public function category(): PackageCategory
    {
        return $this->isForWebsitePackage() ? PackageCategory::Website : PackageCategory::Llc;
    }

    /**
     * Positions run from 1 to the number of packages in the category, plus one slot at the
     * end when a new package is being added.
     */
    public function maxPosition(): int
    {
        $count = Package::query()->ofCategory($this->category())->count();

        return $this->route('package') instanceof Package ? max($count, 1) : $count + 1;
    }

    /**
     * Inquiries store the package key, so it can't change once a client has
     * picked the package.
     *
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator) {
                $package = $this->route('package');

                if ($package instanceof Package
                    && $package->key !== $this->input('key')
                    && $package->inquiries()->exists()) {
                    $validator->errors()->add('key', __('admin.packages.key_locked'));
                }
            },
        ];
    }

    /**
     * Website packages aren't tied to an LLC formation state.
     */
    public function isForWebsitePackage(): bool
    {
        return $this->routeIs('admin.website-packages.*');
    }

    /**
     * @return array<string, mixed>
     */
    public function packageAttributes(): array
    {
        return [
            'key' => $this->validated('key'),
            'label' => $this->cleanLocalized($this->validated('label')),
            'title' => $this->cleanLocalized($this->validated('title')),
            'best_for' => $this->cleanLocalized($this->validated('best_for')),
            'description' => $this->cleanLocalized($this->validated('description')),
            'cta' => $this->cleanLocalized($this->validated('cta')),
            'badge' => $this->cleanLocalized($this->validated('badge')),
            'icon' => $this->validated('icon'),
            'price_amount' => $this->validated('price_amount'),
            'old_price_amount' => $this->validated('old_price_amount'),
            'formation_states' => $this->isForWebsitePackage() ? [] : array_values($this->validated('formation_states')),
            'price_period' => $this->cleanLocalized($this->validated('price_period')),
            'is_featured' => $this->boolean('is_featured'),
            'is_published' => $this->boolean('is_published'),
            'sort_order' => $this->validated('sort_order'),
        ];
    }

    /**
     * @return list<array{text: array<string, string>|null, note: array<string, string>|null, sort_order: int}>
     */
    public function features(): array
    {
        return collect($this->validated('features'))
            ->values()
            ->map(fn (array $feature, int $index) => [
                'text' => $this->cleanLocalized($feature['text'] ?? null),
                'note' => $this->cleanLocalized($feature['note'] ?? null),
                'sort_order' => $index,
            ])
            ->all();
    }
}
