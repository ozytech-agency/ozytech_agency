import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function ProjectShow({ project }) {
    const t = useTranslations();

    return (
        <SiteLayout>
            <Seo
                title={`${project.title} | Ozytech Agency`}
                description={project.short_description ?? undefined}
                breadcrumbs={[
                    { name: project.service.title, path: `/services/${project.service.slug}` },
                    { name: project.title, path: `/projects/${project.slug}` },
                ]}
            />

            <article className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%] flex flex-col gap-space-lg">
                    <Link href={route('services.show', { service: project.service.slug })} className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:translate-x-0.5 transition-transform w-fit">
                        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
                        {project.service.title}
                    </Link>

                    <header className="flex max-w-4xl flex-col gap-space-sm">
                        <h1 className="font-display-md text-display-md text-on-surface">{project.title}</h1>
                        {project.short_description && <p className="font-body-lg text-body-lg text-on-surface-variant">{project.short_description}</p>}
                    </header>

                    <dl className="flex flex-wrap gap-space-lg border-y border-surface-container py-space-md">
                        <div>
                            <dt className="font-label-sm text-label-sm uppercase tracking-widest text-outline">{t('services.projects.service')}</dt>
                            <dd className="font-label-md text-label-md text-on-surface">{project.service.title}</dd>
                        </div>
                        {project.client_name && (
                            <div>
                                <dt className="font-label-sm text-label-sm uppercase tracking-widest text-outline">{t('services.projects.client')}</dt>
                                <dd className="font-label-md text-label-md text-on-surface">{project.client_name}</dd>
                            </div>
                        )}
                    </dl>

                    {project.featured_image && (
                        <img src={project.featured_image} alt={project.title} className="w-full max-h-[560px] rounded-xl object-cover shadow-sm" />
                    )}

                    <div className="prose max-w-3xl font-body-md text-body-md text-on-surface" dangerouslySetInnerHTML={{ __html: project.description }} />

                    {project.gallery?.length > 0 && (
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
                            {project.gallery.map((src, i) => (
                                <div key={src} className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container-high">
                                    <img src={src} alt={`${project.title} — ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-fit items-center gap-space-xs rounded-lg bg-accent2 px-space-xl py-space-sm font-label-md text-label-md text-on-primary shadow-[0_12px_24px_-8px_rgba(233,87,71,0.45)] transition-all hover:-translate-y-0.5"
                        >
                            {t('services.projects.visit')} <span className="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
                        </a>
                    )}
                </div>
            </article>
        </SiteLayout>
    );
}
