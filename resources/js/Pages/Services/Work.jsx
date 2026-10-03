import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function ProjectWork({ slug, title, summary, client, testimonial, technologies, previews }) {
    const t = useTranslations();

    return (
        <SiteLayout>
            <Seo title={`${title} | Ozytech Agency`} description={summary} image={previews?.[0]?.src} />

            <section className="w-full bg-surface">
                <div className="mx-[6%] max-w-[860px] pt-space-3xl pb-space-xl flex flex-col">
                    <Link
                        href={route('services.show', slug)}
                        className="self-start mb-space-lg font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors inline-flex items-center gap-2"
                    >
                        <i className="fa-solid fa-arrow-left"></i> {t('services.work.back')}
                    </Link>
                    <span className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.work.kicker')}</span>
                    <h1 className="font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1] text-on-surface">{title}</h1>
                    <p className="mt-space-md max-w-[680px] text-on-surface-variant text-body-lg leading-relaxed">{summary}</p>
                </div>
            </section>

            {previews?.length > 0 && (
                <section className="w-full pb-space-2xl bg-surface">
                    <div className="mx-[6%] max-w-[860px] grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                        {previews.map((preview) => (
                            <div key={preview.src} className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container-high">
                                <img src={preview.src} alt={preview.alt ?? ''} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="w-full py-space-2xl bg-surface-container-low">
                <div className="mx-[6%] max-w-[860px] grid grid-cols-1 sm:grid-cols-2 gap-space-xl">
                    <div>
                        <h2 className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.work.client_label')}</h2>
                        <div className="flex items-center gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest p-space-md">
                            <img src={client.avatar} alt="" className="h-12 w-12 rounded-full object-cover shrink-0" />
                            <div>
                                <p className="font-headline-sm text-base font-bold text-on-surface">{client.name}</p>
                                <p className="text-sm text-on-surface-variant">{client.role} · {client.company}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.work.technologies_label')}</h2>
                        <div className="flex flex-wrap gap-space-xs">
                            {technologies.map((tech) => (
                                <span key={tech} className="rounded-full border border-surface-container bg-surface-container-lowest px-space-md py-space-2xs text-sm text-on-surface">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-space-3xl bg-surface">
                <div className="mx-[6%] max-w-[760px] flex flex-col">
                    <h2 className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.work.review_label')}</h2>
                    <blockquote className="rounded-2xl border border-surface-container bg-surface-container-lowest p-space-xl">
                        <p className="font-headline-sm text-lg text-on-surface leading-relaxed">&ldquo;{testimonial}&rdquo;</p>
                        <footer className="mt-space-md flex items-center gap-space-sm">
                            <img src={client.avatar} alt="" className="h-10 w-10 rounded-full object-cover shrink-0" />
                            <div>
                                <p className="font-bold text-sm text-on-surface">{client.name}</p>
                                <p className="text-sm text-on-surface-variant">{client.role} · {client.company}</p>
                            </div>
                        </footer>
                    </blockquote>
                    <a
                        href={`${route('start-a-project')}#inquiry-form`}
                        className="service-cta inline-flex items-center gap-space-xs self-start mt-space-xl px-space-lg py-space-sm rounded-lg bg-accent2 text-on-primary font-label-md text-label-md shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        {t('services.work.cta')} <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </section>
        </SiteLayout>
    );
}
