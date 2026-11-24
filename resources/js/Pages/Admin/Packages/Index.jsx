import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { FORMATION_STATES } from '@/Components/StateSwitcher';
import { useTranslations } from '@/lib/translations';

export default function PackagesIndex({ packages, category, routeBase }) {
    const t = useTranslations();
    const copy = category === 'website' ? 'admin.website_packages' : 'admin.packages';
    const [togglingId, setTogglingId] = useState(null);

    const toggleMostPopular = (pkg) => {
        router.patch(route(`${routeBase}.most-popular`, pkg.id), {}, {
            preserveScroll: true,
            onStart: () => setTogglingId(pkg.id),
            onFinish: () => setTogglingId(null),
        });
    };

    return (
        <AdminLayout
            title={t(`${copy}.title`)}
            actions={
                <Link href={route(`${routeBase}.create`)} className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container">
                    <span className="material-symbols-outlined text-lg">add</span> {t(`${copy}.create`)}
                </Link>
            }
        >
            <Head title={t(`${copy}.title`)} />

            {packages.length === 0 ? (
                <p className="rounded-xl border border-dashed border-outline-variant p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
            ) : (
                <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 xl:grid-cols-3">
                    {packages.map((pkg) => (
                        <article key={pkg.id} className="flex flex-col gap-space-xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                            <div className="flex flex-wrap items-center gap-1">
                                <StatusBadge>{t('admin.packages.position_badge').replace(':position', pkg.sort_order)}</StatusBadge>
                                <StatusBadge tone={pkg.is_published ? 'success' : 'neutral'}>{pkg.is_published ? t('admin.common.published') : t('admin.common.hidden')}</StatusBadge>
                                {pkg.is_featured && <StatusBadge tone="warning">{t('admin.packages.most_popular')}</StatusBadge>}
                                {FORMATION_STATES.filter((state) => pkg.formation_states.includes(state.key)).map((state) => (
                                    <StatusBadge key={state.key}>{t(state.labelKey)}</StatusBadge>
                                ))}
                            </div>
                            <Link href={route(`${routeBase}.edit`, pkg.id)} className="font-headline-sm text-xl font-bold text-on-surface hover:text-secondary">
                                {pkg.title}
                            </Link>
                            <p>
                                {pkg.old_price_amount && <s className="me-1 font-body-md text-body-md text-outline">{pkg.old_price_amount}</s>}
                                <span className="font-headline-sm text-2xl font-extrabold text-accent2">{pkg.price_amount}</span>{' '}
                                <span className="font-label-sm text-label-sm uppercase text-outline">{pkg.price_period}</span>
                            </p>
                            <p className="font-body-sm text-body-sm text-outline">
                                {pkg.key} · {t('admin.packages.features_count').replace(':count', pkg.features_count)} ·{' '}
                                {t('admin.packages.inquiries_count').replace(':count', pkg.inquiries_count)}
                            </p>
                            <div className="mt-auto flex items-center justify-end gap-1 pt-space-sm">
                                <button
                                    type="button"
                                    onClick={() => toggleMostPopular(pkg)}
                                    disabled={togglingId === pkg.id}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-container-high disabled:opacity-50 ${pkg.is_featured ? 'text-amber-500' : 'text-on-surface-variant hover:text-on-surface'}`}
                                    aria-label={pkg.is_featured ? t('admin.packages.unmark_most_popular') : t('admin.packages.mark_most_popular')}
                                    aria-pressed={pkg.is_featured}
                                    title={pkg.is_featured ? t('admin.packages.unmark_most_popular') : t('admin.packages.mark_most_popular')}
                                >
                                    <span className="material-symbols-outlined text-lg" style={pkg.is_featured ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                                        star
                                    </span>
                                </button>
                                <Link
                                    href={route(`${routeBase}.edit`, pkg.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                    aria-label={t('admin.common.edit')}
                                >
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                </Link>
                                {pkg.inquiries_count === 0 && <DeleteButton href={route(`${routeBase}.destroy`, pkg.id)} itemName={pkg.title} />}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
