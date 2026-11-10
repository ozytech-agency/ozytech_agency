import { useEffect, useRef, useState } from 'react';

function FeatureNote({ note, dark }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
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
    }, [open]);

    return (
        <span className="relative inline-block align-middle" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={note}
                className={`material-symbols-outlined inline-block align-middle text-[1rem] leading-none transition-colors ${dark ? 'text-white/60 hover:text-white' : 'text-outline hover:text-secondary'}`}
            >
                info
            </button>
            {open && (
                <span
                    role="tooltip"
                    className="absolute end-0 top-full z-20 mt-2 w-56 max-w-[80vw] rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-3 text-xs leading-relaxed text-on-surface shadow-xl"
                >
                    {note}
                </span>
            )}
        </span>
    );
}

/**
 * A published package with its price, features and a link that pre-selects it in the project form.
 * `titleAs` sets the heading level so the card fits the page's outline (h2 on Packages, h3 inside a home section).
 */
export default function PackageCard({ pkg, titleAs: Title = 'h2' }) {
    return (
        <article
            className={`relative flex h-full min-h-[390px] flex-col rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                pkg.featured ? 'border-secondary-container/45 bg-primary-container text-on-primary' : 'border-outline-variant/25 bg-surface-container-lowest'
            }`}
        >
            {pkg.badge && (
                <span className="absolute end-5 top-5 rounded-full bg-accent2 px-3 py-1 font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-primary">
                    {pkg.badge}
                </span>
            )}
            <div
                className={`mb-10 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl text-lg ${
                    pkg.featured ? 'bg-white/15 text-on-primary' : 'bg-secondary-container/10 text-secondary'
                }`}
            >
                <i className={pkg.icon}></i>
            </div>
            <span className={`font-label-sm text-[0.72rem] font-bold uppercase tracking-widest ${pkg.featured ? 'text-on-primary' : 'text-secondary'}`}>{pkg.label}</span>
            <Title className="mt-space-xs font-headline-sm text-2xl font-bold">{pkg.title}</Title>
            <div className={`mt-space-sm inline-flex w-fit items-baseline gap-1.5 rounded-lg px-3 py-2 ${pkg.featured ? 'bg-white/10' : 'bg-accent2/10'}`}>
                <span className={`font-headline-lg text-4xl font-extrabold leading-none tracking-tight ${pkg.featured ? 'text-white' : 'text-accent2'}`}>{pkg.price.amount}</span>
                <span className={`font-label-sm text-[0.68rem] font-bold uppercase tracking-wider ${pkg.featured ? 'text-white/70' : 'text-on-surface-variant'}`}>
                    {pkg.price.period}
                </span>
            </div>
            <p className={`mt-space-sm font-label-sm text-label-sm ${pkg.featured ? '' : 'text-on-surface-variant'}`}>{pkg.best_for}</p>
            <p className={`mt-space-sm text-sm leading-relaxed ${pkg.featured ? 'text-white/80' : 'text-on-surface-variant'}`}>{pkg.description}</p>
            <ul className={`mt-space-md mb-[30px] flex flex-col gap-4 border-t pt-space-md ${pkg.featured ? 'border-white/15' : 'border-outline-variant/20'}`}>
                {pkg.features.map((feature) => {
                    const text = typeof feature === 'string' ? feature : feature.text;
                    const note = typeof feature === 'string' ? null : feature.note;
                    return (
                        <li key={text} className="flex items-center justify-between gap-2.5 text-sm">
                            <span className="flex items-center gap-2.5">
                                <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] ${
                                        pkg.featured ? 'bg-white/15 text-on-primary' : 'bg-secondary-container/10 text-secondary'
                                    }`}
                                >
                                    <i className="fa-solid fa-check"></i>
                                </span>
                                <span className={pkg.featured ? 'text-white/80' : 'text-on-surface-variant'}>{text}</span>
                            </span>
                            {note && <FeatureNote note={note} dark={pkg.featured} />}
                        </li>
                    );
                })}
            </ul>
            <a
                href={`${route('start-a-project')}?package=${pkg.key}#inquiry-form`}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                    pkg.featured
                        ? 'border-white/30 text-white hover:bg-accent2 hover:border-accent2'
                        : 'border-outline-variant/40 text-on-surface hover:bg-accent2 hover:border-accent2 hover:text-white'
                }`}
            >
                {pkg.cta} <i className="fa-solid fa-arrow-right"></i>
            </a>
        </article>
    );
}
