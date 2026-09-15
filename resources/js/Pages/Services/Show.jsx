import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { useTranslations } from '@/lib/translations';

export default function ServiceShow({ title, lead, body, features, gallery, related }) {
    const t = useTranslations();
    const processSteps = t('services.details.process');

    return (
        <SiteLayout>
            <Head title={`${title} | OzyTech`} />

            <section className="w-full bg-surface">
                <div className="w-full max-w-[760px] mx-auto px-gutter-mobile pt-space-3xl pb-space-xl flex flex-col">
                    <Link href={route('home')} className="self-start mb-space-3xl font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors inline-flex items-center gap-2">
                        <i className="fa-solid fa-arrow-left"></i> {t('services.back')}
                    </Link>
                    <span className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.kicker')}</span>
                    <h1 className="font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1] text-on-surface">{title}</h1>
                    <p className="mt-space-md font-headline-sm text-secondary" style={{ fontSize: 'clamp(1.25rem,3vw,2rem)' }}>
                        {lead}
                    </p>
                    <p className="mt-space-sm max-w-[620px] text-on-surface-variant text-body-lg leading-relaxed">{body}</p>
                    <a
                        href={`${route('start-a-project')}#inquiry-form`}
                        className="service-cta inline-flex items-center gap-space-xs self-start mt-space-xl px-space-lg py-space-sm rounded-lg bg-accent2 text-on-primary font-label-md text-label-md shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        {t('services.cta')} <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </section>

            {features?.length > 0 && (
                <section className="w-full py-space-2xl bg-surface-container-low">
                    <div className="max-w-[760px] mx-auto px-gutter-mobile">
                        <h2 className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.details.included_label')}</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                            {features.map((feature) => (
                                <li key={feature} className="flex items-start gap-space-xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-md">
                                    <span className="material-symbols-outlined icon-fill text-secondary-container">check_circle</span>
                                    <span className="text-sm text-on-surface">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {gallery?.length > 0 && (
                <section className="w-full py-space-3xl bg-surface">
                    <div className="mx-[6%]">
                        <h2 className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.details.gallery_label')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                            {gallery.map((src) => (
                                <div key={src} className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container-high">
                                    <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {processSteps?.length > 0 && (
                <section className="w-full py-space-3xl bg-surface-container-low">
                    <div className="mx-[6%]">
                        <h2 className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.details.process_label')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                            {processSteps.map((step, i) => (
                                <div key={step.title} className="flex flex-col gap-space-xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container/10 font-label-sm text-label-sm font-bold text-secondary">{i + 1}</span>
                                    <h3 className="font-headline-sm text-lg font-bold text-on-surface">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-on-surface-variant">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {related?.length > 0 && (
                <section className="w-full py-space-3xl bg-surface">
                    <div className="mx-[6%]">
                        <h2 className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.details.related_label')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                            {related.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={route('services.show', item.slug)}
                                    className="group flex flex-col gap-space-2xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <h3 className="font-headline-sm text-lg font-bold text-on-surface transition-colors group-hover:text-secondary">{item.title}</h3>
                                    <p className="text-sm text-on-surface-variant">{item.lead}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}
