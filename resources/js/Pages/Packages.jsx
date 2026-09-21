import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import { useTranslations } from '@/lib/translations';
import { PACKAGE_KEYS } from '@/lib/packages';

const CARD_META = [
    { icon: 'fa-solid fa-compass', featured: false },
    { icon: 'fa-solid fa-rocket', featured: true },
    { icon: 'fa-solid fa-chart-line', featured: false },
];

const ASSURANCE_ICONS = ['event_available', 'groups', 'sync_alt'];

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

export default function Packages() {
    const t = useTranslations();
    const packages = t('packages.cards');
    const assurances = t('packages.assurances');
    const comparisonRows = t('packages.comparison.rows');
    const processSteps = t('packages.process.steps');

    return (
        <SiteLayout>
            <Head title={t('packages.title')} />

            <section className="relative overflow-hidden py-space-4xl text-on-primary w-full isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2200&q=80"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgb(9 14 25 / .92) 0%, rgb(9 14 25 / .8) 55%, rgb(9 14 25 / .6) 100%), linear-gradient(180deg, rgb(9 14 25 / .3), rgb(9 14 25 / .55))',
                    }}
                ></div>
                <div className="absolute right-[-10%] top-[-30%] h-[480px] w-[480px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative mx-[6%]">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('packages.hero.kicker')}</span>
                    <h1 className="mt-space-sm max-w-3xl font-display-xl text-display-xl leading-[1.1]">{t('packages.hero.title')}</h1>
                    <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-white/80">{t('packages.hero.lead')}</p>
                </div>
            </section>

            <div className="w-full max-w-[1180px] mx-auto px-gutter-mobile py-space-3xl">
                <Reveal as="section" stagger className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Available packages">
                    {packages.map((pkg, i) => (
                        <article
                            key={pkg.title}
                            className={`relative flex h-full min-h-[390px] flex-col rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                                CARD_META[i].featured
                                    ? 'border-secondary-container/45 bg-primary-container text-on-primary'
                                    : 'border-outline-variant/25 bg-surface-container-lowest'
                            }`}
                        >
                            {pkg.badge && (
                                <span className="absolute end-5 top-5 rounded-full bg-accent2 px-3 py-1 font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-primary">
                                    {pkg.badge}
                                </span>
                            )}
                            <div
                                className={`mb-10 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl text-lg ${
                                    CARD_META[i].featured ? 'bg-white/15 text-on-primary' : 'bg-secondary-container/10 text-secondary'
                                }`}
                            >
                                <i className={CARD_META[i].icon}></i>
                            </div>
                            <span className={`font-label-sm text-[0.72rem] font-bold uppercase tracking-widest ${CARD_META[i].featured ? 'text-on-primary' : 'text-secondary'}`}>
                                {pkg.label}
                            </span>
                            <h2 className="mt-space-xs font-headline-sm text-2xl font-bold">{pkg.title}</h2>
                            <div
                                className={`mt-space-sm inline-flex w-fit items-baseline gap-1.5 rounded-lg px-3 py-2 ${
                                    CARD_META[i].featured ? 'bg-white/10' : 'bg-accent2/10'
                                }`}
                            >
                                <span className={`font-headline-lg text-4xl font-extrabold leading-none tracking-tight ${CARD_META[i].featured ? 'text-white' : 'text-accent2'}`}>
                                    {pkg.price.amount}
                                </span>
                                <span className={`font-label-sm text-[0.68rem] font-bold uppercase tracking-wider ${CARD_META[i].featured ? 'text-white/70' : 'text-on-surface-variant'}`}>
                                    {pkg.price.period}
                                </span>
                            </div>
                            <p className={`mt-space-sm font-label-sm text-label-sm ${CARD_META[i].featured ? '' : 'text-on-surface-variant'}`}>{pkg.best_for}</p>
                            <p className={`mt-space-sm text-sm leading-relaxed ${CARD_META[i].featured ? 'text-white/80' : 'text-on-surface-variant'}`}>{pkg.description}</p>
                            <ul className={`mt-space-md mb-[30px] flex flex-col gap-4 border-t pt-space-md ${CARD_META[i].featured ? 'border-white/15' : 'border-outline-variant/20'}`}>
                                {pkg.features.map((feature) => {
                                    const text = typeof feature === 'string' ? feature : feature.text;
                                    const note = typeof feature === 'string' ? null : feature.note;
                                    return (
                                        <li key={text} className="flex items-center justify-between gap-2.5 text-sm">
                                            <span className="flex items-center gap-2.5">
                                                <span
                                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] ${
                                                        CARD_META[i].featured ? 'bg-white/15 text-on-primary' : 'bg-secondary-container/10 text-secondary'
                                                    }`}
                                                >
                                                    <i className="fa-solid fa-check"></i>
                                                </span>
                                                <span className={CARD_META[i].featured ? 'text-white/80' : 'text-on-surface-variant'}>{text}</span>
                                            </span>
                                            {note && <FeatureNote note={note} dark={CARD_META[i].featured} />}
                                        </li>
                                    );
                                })}
                            </ul>
                            <a
                                href={`${route('start-a-project')}?package=${PACKAGE_KEYS[i]}#inquiry-form`}
                                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                                    CARD_META[i].featured ? 'border-white/30 text-white hover:bg-accent2 hover:border-accent2' : 'border-outline-variant/40 text-on-surface hover:bg-accent2 hover:border-accent2 hover:text-white'
                                }`}
                            >
                                {pkg.cta} <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </article>
                    ))}
                </Reveal>

                <Reveal as="section" className="mt-space-4xl">
                    <div className="max-w-2xl mb-space-xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('packages.comparison.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('packages.comparison.title')}</h2>
                        <p className="mt-space-sm text-on-surface-variant">{t('packages.comparison.subtitle')}</p>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                        <table className="w-full min-w-[640px] border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-surface-container">
                                    <th className="p-space-md text-left font-label-md text-label-md text-on-surface-variant"></th>
                                    {packages.map((pkg, i) => (
                                        <th
                                            key={pkg.title}
                                            className={`p-space-md text-left font-headline-sm text-base font-bold ${CARD_META[i].featured ? 'text-secondary' : 'text-on-surface'}`}
                                        >
                                            {pkg.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row) => (
                                    <tr key={row.label} className="border-b border-surface-container last:border-0">
                                        <td className="p-space-md font-label-md text-label-md text-on-surface whitespace-nowrap">{row.label}</td>
                                        {row.values.map((value, i) => (
                                            <td key={i} className="p-space-md">
                                                {row.type === 'bool' ? (
                                                    value ? (
                                                        <span className="material-symbols-outlined icon-fill text-secondary-container">check_circle</span>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-outline-variant">remove</span>
                                                    )
                                                ) : (
                                                    <span className="text-on-surface-variant">{value}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>

                <Reveal as="section" className="mt-space-4xl">
                    <div className="max-w-2xl mb-space-xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('packages.process.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{t('packages.process.title')}</h2>
                        <p className="mt-space-sm text-on-surface-variant">{t('packages.process.subtitle')}</p>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                        {processSteps.map((step) => (
                            <div key={step.title} className="h-full flex flex-col gap-space-xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-container font-bold">{step.label}</span>
                                <h3 className="font-headline-sm text-xl font-bold text-on-surface">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-on-surface-variant">{step.desc}</p>
                            </div>
                        ))}
                    </Reveal>
                </Reveal>

                <Reveal as="section" className="mx-auto mt-space-4xl grid max-w-4xl grid-cols-1 gap-space-lg sm:grid-cols-3">
                    {assurances.map((text, i) => (
                        <div key={text} className="flex items-start gap-space-sm">
                            <span className="material-symbols-outlined text-secondary">{ASSURANCE_ICONS[i]}</span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">{text}</p>
                        </div>
                    ))}
                </Reveal>

                <Reveal as="section" className="mt-space-4xl rounded-xl bg-primary-container p-space-2xl text-center text-on-primary">
                    <h2 className="font-headline-lg text-headline-lg">{t('packages.cta.title')}</h2>
                    <p className="mx-auto mt-space-sm max-w-xl text-primary-fixed-dim">{t('packages.cta.subtitle')}</p>
                    <a
                        href={`${route('start-a-project')}#inquiry-form`}
                        className="mt-space-lg inline-flex items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg py-space-sm font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        {t('packages.cta.button')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                    </a>
                </Reveal>
            </div>
        </SiteLayout>
    );
}
