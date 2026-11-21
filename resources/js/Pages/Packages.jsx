import { usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import PackageCard from '@/Components/PackageCard';
import StateSwitcher, { useFormationState } from '@/Components/StateSwitcher';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function Packages() {
    const t = useTranslations();
    const { packages } = usePage().props;
    const [formationState, setFormationState] = useFormationState();
    const statePackages = packages.filter((pkg) => pkg.formation_states?.includes(formationState));
    const comparisonRows = t('packages.comparison.rows');
    const processSteps = t('packages.process.steps');

    return (
        <SiteLayout>
            <Seo title={t('packages.title')} description={t('packages.meta_description')} breadcrumbs={[{ name: 'Packages', path: '/packages' }]} />

            <section className="relative overflow-hidden py-space-4xl text-on-primary w-full isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2200&q=80"
                        alt=""
                        aria-hidden="true"
                        fetchpriority="high"
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
                <StateSwitcher value={formationState} onChange={setFormationState} className="mb-space-xl" />
                {statePackages.length > 0 ? (
                    // Keyed by state so the cards replay their staggered fade-in on every switch.
                    <Reveal key={formationState} as="section" stagger className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Available packages">
                        {statePackages.map((pkg) => (
                            <PackageCard key={pkg.key} pkg={pkg} />
                        ))}
                    </Reveal>
                ) : (
                    <p className="rounded-xl border border-dashed border-outline-variant p-space-lg text-center text-on-surface-variant">{t('packages.state_switcher.empty')}</p>
                )}

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
                                    {packages.map((pkg) => (
                                        <th
                                            key={pkg.key}
                                            className={`p-space-md text-left font-headline-sm text-base font-bold ${pkg.featured ? 'text-secondary' : 'text-on-surface'}`}
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
