import SiteLayout from '@/Layouts/SiteLayout';
import ProjectCard from '@/Components/ProjectCard';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function ProjectsIndex({ projects }) {
    const t = useTranslations();
    const title = t('services.work.index.title');
    const description = t('services.work.index.description');

    return (
        <SiteLayout>
            <Seo title={`${title} | Ozytech Agency`} description={description} breadcrumbs={[{ name: title, path: '/projects' }]} />

            <section className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%] flex flex-col gap-space-2xl">
                    <header className="max-w-2xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.work.kicker')}</span>
                        <h1 className="mt-space-sm font-display-md text-display-md text-on-surface">{title}</h1>
                        <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">{description}</p>
                    </header>

                    <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
