<?php

namespace App\Models\Concerns;

/**
 * Helpers for JSON columns that hold one value per locale, e.g.
 * {"en": "Growth Pack", "ar": "..."}.
 */
trait HasLocalizedAttributes
{
    /**
     * Resolve a localized attribute for the given (or current) locale,
     * falling back to English when the translation is missing.
     */
    public function localized(string $attribute, ?string $locale = null): ?string
    {
        return static::pickLocale($this->getAttribute($attribute), $locale);
    }

    /**
     * @param  array<string, string|null>|null  $values
     */
    public static function pickLocale(?array $values, ?string $locale = null): ?string
    {
        if (! $values) {
            return null;
        }

        $locale ??= app()->getLocale();

        return filled($values[$locale] ?? null)
            ? $values[$locale]
            : ($values[config('app.fallback_locale')] ?? null);
    }
}
