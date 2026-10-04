import { Link } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';

export default function ProjectCard({ project }) {
    const t = useTranslations();

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-surface-container bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md">
            <Link href={route('projects.show', { project: project.slug })} className="relative block aspect-[16/10] overflow-hidden bg-surface-container-high">
                {project.featured_image && (
                    <img
                        src={project.featured_image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                    />
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-space-xs p-space-lg">
                {project.service_title && (
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-container">{project.service_title}</span>
                )}
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                    <Link href={route('projects.show', { project: project.slug })} className="hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2">
                        {project.title}
                    </Link>
                </h3>
                {project.short_description && <p className="font-body-sm text-body-sm text-on-surface-variant">{project.short_description}</p>}
                {project.client_name && (
                    <p className="font-label-sm text-label-sm text-outline">
                        {t('services.projects.client')}: {project.client_name}
                    </p>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-space-sm pt-space-md">
                    <Link
                        href={route('projects.show', { project: project.slug })}
                        className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:translate-x-0.5 transition-transform"
                    >
                        {t('services.projects.view')} <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                    </Link>
                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
                        >
                            {t('services.projects.visit')} <span className="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
                            <span className="sr-only">({project.title})</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
