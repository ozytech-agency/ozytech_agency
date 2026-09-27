import { createContext, useContext, useState } from 'react';
import InputError from '@/Components/InputError';
import { CONTENT_LOCALES } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

const EditingLocaleContext = createContext({ locale: 'en', setLocale: () => {} });

export function EditingLocaleProvider({ children }) {
    const [locale, setLocale] = useState('en');
    return <EditingLocaleContext.Provider value={{ locale, setLocale }}>{children}</EditingLocaleContext.Provider>;
}

export function useEditingLocale() {
    return useContext(EditingLocaleContext);
}

// One switch for the whole form: every localized field shows the selected language.
export function LocaleSwitcher({ errors = {} }) {
    const t = useTranslations();
    const { locale, setLocale } = useEditingLocale();
    const errorKeys = Object.keys(errors);

    return (
        <div className="flex flex-wrap items-center gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest px-space-lg py-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('admin.common.editing_language')}</span>
            <div className="flex gap-1" role="tablist">
                {CONTENT_LOCALES.map((code) => {
                    const hasError = errorKeys.some((key) => key.endsWith(`.${code}`));
                    return (
                        <button
                            key={code}
                            type="button"
                            role="tab"
                            aria-selected={locale === code}
                            onClick={() => setLocale(code)}
                            className={`relative rounded-lg px-space-sm py-space-2xs font-label-md text-label-md uppercase transition-colors ${
                                locale === code ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            {code}
                            {hasError && <span className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-error" aria-hidden="true"></span>}
                        </button>
                    );
                })}
            </div>
            <span className="font-body-sm text-body-sm text-outline">{t('admin.common.required_in_english')}</span>
        </div>
    );
}

const FIELD_CLASSES =
    'mt-1 block w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container';

/**
 * A text input / textarea bound to `value[locale]` of a localized field.
 * `name` is the form path (e.g. "features.0.text") used to find errors.
 */
export function LocalizedInput({ label, name, value, onChange, errors = {}, multiline = false, rows = 4, required = true, help }) {
    const { locale } = useEditingLocale();
    const id = `${name}.${locale}`.replace(/\./g, '-');
    const current = value?.[locale] ?? '';
    const fallback = locale !== 'en' ? value?.en : null;
    const inputProps = {
        id,
        value: current,
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        lang: locale,
        placeholder: fallback || '',
        onChange: (e) => onChange({ ...(value ?? {}), [locale]: e.target.value }),
        className: FIELD_CLASSES,
    };

    return (
        <div>
            {label && (
                <label htmlFor={id} className="block font-label-md text-label-md text-on-surface">
                    {label}
                    <span className="ms-1 font-label-sm text-label-sm uppercase text-outline">{locale}</span>
                    {required && locale === 'en' && <span className="ms-1 text-error">*</span>}
                </label>
            )}
            {multiline ? <textarea rows={rows} {...inputProps} /> : <input type="text" {...inputProps} />}
            {help && <p className="mt-1 font-body-sm text-body-sm text-outline">{help}</p>}
            <InputError className="mt-1" message={errors[`${name}.${locale}`] ?? errors[name]} />
        </div>
    );
}
