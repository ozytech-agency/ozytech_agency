import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { useTranslations } from '@/lib/translations';

export default function PolicyShow({ title, subtitle, sections }) {
    const t = useTranslations();

    return (
        <SiteLayout>
            <Head title={title} />

            <section className="relative overflow-hidden bg-primary-container py-space-4xl text-on-primary">
                <div className="absolute right-[-8%] top-[-35%] h-[520px] w-[520px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative mx-auto max-w-max-width px-gutter-mobile lg:px-gutter-desktop">
                    <p className="mb-space-sm font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('policies.eyebrow')}</p>
                    <h1 className="max-w-3xl font-display-xl text-display-xl leading-[1.1]">{title}</h1>
                    <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-primary-fixed-dim">{subtitle}</p>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-gutter-mobile py-space-3xl lg:px-gutter-desktop lg:py-space-4xl w-full">
                <p className="mb-space-2xl font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('policies.last_updated')}</p>
                <div className="flex flex-col gap-space-xl">
                    {sections.map((section) => (
                        <article key={section.heading}>
                            <h2 className="mb-space-sm font-headline-md text-headline-md">{section.heading}</h2>
                            <p className="text-on-surface-variant">{section.body}</p>
                        </article>
                    ))}
                </div>
            </section>
        </SiteLayout>
    );
}
