<?php

namespace App\Http\Requests\Admin\Concerns;

/**
 * Validation helpers for translatable fields submitted as
 * {en: '...', ar: '...', fr: '...', es: '...'}. English is the fallback
 * locale, so it's the only one that can be required.
 */
trait ValidatesLocalizedFields
{
    /**
     * @var list<string>
     */
    protected array $locales = ['en', 'ar', 'fr', 'es'];

    /**
     * @return array<string, list<string>>
     */
    protected function localizedRules(string $field, bool $required = true, int $max = 255): array
    {
        $rules = [$field => [$required ? 'required' : 'nullable', 'array']];

        foreach ($this->locales as $locale) {
            $rules["{$field}.{$locale}"] = [
                $required && $locale === 'en' ? 'required' : 'nullable',
                'string',
                "max:{$max}",
            ];
        }

        return $rules;
    }

    /**
     * Keep only the filled-in locales; null when none are filled.
     *
     * @param  array<string, string|null>|null  $values
     * @return array<string, string>|null
     */
    protected function cleanLocalized(?array $values): ?array
    {
        $values = collect($values ?? [])
            ->only($this->locales)
            ->filter(fn (?string $value) => filled($value))
            ->all();

        return $values ?: null;
    }
}
