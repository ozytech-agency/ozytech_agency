import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function MobileNavDropdown({ label, items, namespace, onNavigate }) {
    const t = useTranslations();
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full">
            <button
                type="button"
                className="w-full flex items-center justify-between px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                {label} <span className={`material-symbols-outlined text-lg transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {open && (
                <div className="grid grid-cols-2 gap-1 py-space-2xs">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={route('services.show', item.slug)}
                            onClick={onNavigate}
                            className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-high"
                        >
                            <i className={item.icon}></i>
                            <span className="truncate">{t(`nav.${namespace}.${item.key}.title`)}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
