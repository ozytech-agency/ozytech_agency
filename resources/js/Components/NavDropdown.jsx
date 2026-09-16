import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function NavDropdown({ label, items, namespace, align = 'start' }) {
    const t = useTranslations();
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

    return (
        <div className={`services-menu relative ${align === 'end' ? 'services-menu--align-end' : ''} ${open ? 'is-open' : ''}`} ref={ref}>
            <button
                type="button"
                className="inline-flex items-center gap-[0.2rem] px-space-md py-space-xs text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors rounded-lg"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                {label} <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <div className="services-dropdown" role="menu">
                {items.map((item) => (
                    <Link key={item.slug} href={route('services.show', item.slug)} role="menuitem" onClick={() => setOpen(false)}>
                        <i className={item.icon}></i>
                        <span className="service-copy min-w-0 flex-1">
                            <strong className="block overflow-hidden text-ellipsis whitespace-nowrap">{t(`nav.${namespace}.${item.key}.title`)}</strong>
                            <small>{t(`nav.${namespace}.${item.key}.desc`)}</small>
                        </span>
                        <span className="service-arrow material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
