import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function ServicesIndex({ services }) {
    const t = useTranslations();
    const title = t('services.index.title');
    const description = t('services.index.description');

    return (
        <SiteLayout>
            <Seo title={`${title} | Ozytech Agency`} description={description} breadcrumbs={[{ name: title, path: '/services' }]} />

            <section className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%] flex flex-col gap-space-2xl">
                    <header className="max-w-2xl">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('services.kicker')}</span>
                        <h1 className="mt-space-sm font-display-md text-display-md text-on-surface">{title}</h1>
                        <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">{description}</p>
                    </header>

                    <div className="grid grid-cols-1 gap-space-lg sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={route('services.show', service.slug)}
                                className="group flex h-full flex-col overflow-hidden rounded-xl border border-surface-container bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                {service.image && (
                                    <div className="aspect-[16/10] overflow-hidden bg-surface-container-high">
                                        <img
                                            src={service.image}
                                            alt=""
                                            loading="lazy"
                                            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-1 flex-col gap-space-xs p-space-lg">
                                    <h2 className="font-headline-sm text-xl font-bold text-on-surface transition-colors group-hover:text-secondary">{service.title}</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{service.lead}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
