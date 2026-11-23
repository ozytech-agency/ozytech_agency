import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import ProjectCard from '@/Components/ProjectCard';
import Reveal from '@/Components/Reveal';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function ServiceShow({ slug, title, lead, metaDescription, body, offer, build, gallery, related, projects }) {
    const t = useTranslations();
    const processSteps = t('services.details.process');
    const description = metaDescription || lead;

    const serviceJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description,
        provider: { '@type': 'Organization', name: 'Ozytech Agency' },
    };

    return (
        <SiteLayout>
            <Seo
                title={title}
                description={description}
                image={gallery?.[0]}
                jsonLd={serviceJsonLd}
                breadcrumbs={[{ name: title, path: `/services/${slug}` }]}
            />

            <section className="relative w-full overflow-hidden py-space-3xl isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2200&q=85"
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
                            'linear-gradient(90deg, rgb(9 14 25 / .9) 0%, rgb(9 14 25 / .72) 55%, rgb(9 14 25 / .4) 100%), linear-gradient(180deg, rgb(9 14 25 / .2), rgb(9 14 25 / .5))',
                    }}
                ></div>
                <div className="absolute -right-24 -top-40 h-[34rem] w-[34rem] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative mx-[6%] max-w-[760px] flex flex-col">
                    <span className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim font-bold">{t('services.kicker')}</span>
                    <h1 className="font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1] text-white/[92%]">{title}</h1>
                    <p className="mt-space-md max-w-[620px] text-white/80 text-body-lg leading-relaxed">{body}</p>
                    <a
                        href={`${route('start-a-project')}#inquiry-form`}
                        className="service-cta inline-flex items-center gap-space-xs self-start mt-space-xl px-space-lg py-space-sm rounded-lg bg-accent2 text-on-primary font-label-md text-label-md shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        {t('services.cta')} <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </section>

            {(offer?.length > 0 || build?.length > 0) && (
                <section className="w-full py-space-3xl bg-surface-container-low">
                    <Reveal as="div" className="mx-[6%] grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                        {offer?.length > 0 && <ServiceItemsPanel title={t('services.details.offer_label')} items={offer} />}
                        {build?.length > 0 && <ServiceItemsPanel title={t('services.details.build_label')} items={build} dark />}
                    </Reveal>
                </section>
            )}

            {projects?.length > 0 && (
                <section className="w-full py-space-3xl bg-surface-container-low">
                    <div className="mx-[6%]">
                        <h2 className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.details.projects_label')}</h2>
                        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <ProjectCard key={project.slug} project={project} />
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

/**
 * A service's offer or build list, shown as a panel of icon tiles. The dark variant sits on
 * navy so the two lists read as distinct.
 */
function ServiceItemsPanel({ title, items, dark = false }) {
    return (
        <div
            className={`relative h-full overflow-hidden rounded-2xl border p-space-lg sm:p-space-xl ${
                dark ? 'border-transparent bg-[#263963] text-white' : 'border-outline-variant/25 bg-surface-container-lowest shadow-sm'
            }`}
        >
            <div className={`absolute -end-16 -top-16 h-40 w-40 rounded-full blur-2xl pointer-events-none ${dark ? 'bg-accent2/25' : 'bg-accent2/10'}`} aria-hidden="true"></div>
            <h2 className={`relative mb-space-lg flex items-center gap-space-sm font-label-sm text-label-sm uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-accent2'}`}>
                <span className={`h-0.5 w-6 rounded-full ${dark ? 'bg-white' : 'bg-accent2'}`} aria-hidden="true"></span>
                {title}
            </h2>
            <ul className="relative flex flex-col gap-space-sm">
                {items.map((item) => (
                    <li
                        key={item.label}
                        className={`group flex items-center gap-space-md rounded-xl p-space-sm transition-colors duration-300 ${dark ? 'hover:bg-white/[0.06]' : 'hover:bg-surface-container-low'}`}
                    >
                        <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent2 group-hover:text-white ${
                                dark ? 'bg-white/10 text-accent2' : 'bg-accent2/10 text-accent2'
                            }`}
                        >
                            <span className="material-symbols-outlined icon-fill text-[22px]" aria-hidden="true">
                                {item.icon}
                            </span>
                        </span>
                        <span className={`font-body-md text-body-md font-medium ${dark ? 'text-white/90' : 'text-on-surface'}`}>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
