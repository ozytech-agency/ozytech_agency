import { usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';
import { PROSE_CLASSES } from '@/lib/prose';
import { useTranslations } from '@/lib/translations';

export default function PolicyShow({ policy }) {
    const t = useTranslations();
    const { locale } = usePage().props;
    const updatedAt = new Date(policy.updated_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

    return (
        <SiteLayout>
            <Seo
                title={`${policy.title} | Ozytech Agency`}
                description={policy.summary}
                breadcrumbs={[{ name: policy.title, path: `/policies/${policy.slug}` }]}
            />

            <section className="relative overflow-hidden bg-primary-container py-space-4xl text-on-primary">
                <div className="absolute right-[-8%] top-[-35%] h-[520px] w-[520px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative mx-[6%]">
                    <p className="mb-space-sm font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('policies.eyebrow')}</p>
                    <h1 className="max-w-3xl font-display-xl text-display-xl leading-[1.1]">{policy.title}</h1>
                    {policy.summary && <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-primary-fixed-dim">{policy.summary}</p>}
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-gutter-mobile py-space-3xl lg:px-gutter-desktop lg:py-space-4xl w-full">
                <p className="mb-space-lg font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('policies.last_updated').replace(':date', updatedAt)}</p>
                <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: policy.body_html }} />
            </section>
        </SiteLayout>
    );
}
