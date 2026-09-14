import { usePage } from '@inertiajs/react';

function resolve(translations, key) {
    return key.split('.').reduce((acc, segment) => (acc && acc[segment] !== undefined ? acc[segment] : undefined), translations);
}

export function useTranslations() {
    const { translations } = usePage().props;

    return function t(key, fallback) {
        const value = resolve(translations, key);
        return value !== undefined ? value : fallback ?? key;
    };
}

export function useLocale() {
    const { locale, available_locales: availableLocales } = usePage().props;
    return { locale, availableLocales: availableLocales ?? ['en'] };
}
