import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { useLocale } from '@/lib/translations';

const LANGS = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
];

export default function LanguageSwitcher() {
    const { locale } = useLocale();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('click', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    const select = (code) => {
        setOpen(false);
        if (code === locale) return;
        const name = route().current();
        router.visit(route(name, { ...route().params, locale: code }));
    };

    return (
        <div ref={ref} className="fixed right-5 bottom-5 z-[60]">
            <div
                className="absolute right-0 bottom-[calc(100%+0.75rem)] min-w-[12.5rem] p-2 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-[0_20px_40px_-12px_rgba(19,27,46,0.25)] flex flex-col gap-0.5 transition-all"
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0) scale(1)' : 'translateY(0.5rem) scale(0.96)',
                    pointerEvents: open ? 'auto' : 'none',
                }}
                role="menu"
                aria-label="Choose language"
            >
                {LANGS.map((l) => {
                    const current = l.code === locale;
                    return (
                        <button
                            key={l.code}
                            type="button"
                            role="menuitemradio"
                            aria-current={current}
                            onClick={() => select(l.code)}
                            className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-[0.625rem] text-sm text-left transition-colors hover:bg-surface-container-high ${
                                current ? 'bg-surface-container-high font-semibold' : ''
                            }`}
                        >
                            <span
                                className={`inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1 rounded-md text-[0.6875rem] font-bold tracking-wide ${
                                    current ? 'bg-accent2 text-white' : 'bg-surface-container-high text-on-surface-variant'
                                }`}
                            >
                                {l.code.toUpperCase()}
                            </span>
                            <span className="text-on-surface">{l.label}</span>
                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className={`ms-auto w-4 h-4 text-accent2 ${current ? 'visible' : 'invisible'}`}
                            >
                                <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" />
                            </svg>
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Change language"
                onClick={() => setOpen((v) => !v)}
                className="w-[3.25rem] h-[3.25rem] rounded-full bg-accent2 text-white flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(233,87,71,0.55),0_2px_8px_rgba(19,27,46,0.12)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6">
                    <path d="M20,2H4A2,2,0,0,0,2,4V16a2,2,0,0,0,2,2H7.59l3.7,3.71a1,1,0,0,0,1.42,0L16.41,18H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM16,9H14.93a8.33,8.33,0,0,1-1.43,3.74,3.43,3.43,0,0,0,.74.29A1,1,0,0,1,14,15l-.24,0A6.51,6.51,0,0,1,12,14.19a5.6,5.6,0,0,1-1.77.78L10,15a1,1,0,0,1-.24-2,3.81,3.81,0,0,0,.51-.17A6.75,6.75,0,0,1,9.14,11.5a1,1,0,0,1,1.72-1,5.07,5.07,0,0,0,1,1.11A6.09,6.09,0,0,0,12.9,9H8A1,1,0,0,1,8,7h3a1,1,0,0,1,2,0h3a1,1,0,0,1,0,2Z" />
                </svg>
            </button>
        </div>
    );
}
