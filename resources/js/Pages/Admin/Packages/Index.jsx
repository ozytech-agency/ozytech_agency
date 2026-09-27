import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { useTranslations } from '@/lib/translations';

export default function PackagesIndex({ packages }) {
    const t = useTranslations();

    return (
        <AdminLayout
            title={t('admin.packages.title')}
            actions={
                <Link href={route('admin.packages.create')} className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container">
                    <span className="material-symbols-outlined text-lg">add</span> {t('admin.packages.create')}
                </Link>
            }
        >
            <Head title={t('admin.packages.title')} />

            {packages.length === 0 ? (
                <p className="rounded-xl border border-dashed border-outline-variant p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
            ) : (
                <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 xl:grid-cols-3">
                    {packages.map((pkg) => (
                        <article key={pkg.id} className="flex flex-col gap-space-xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                            <div className="flex flex-wrap items-center gap-1">
                                <StatusBadge tone={pkg.is_published ? 'success' : 'neutral'}>{pkg.is_published ? t('admin.common.published') : t('admin.common.hidden')}</StatusBadge>
                                {pkg.is_featured && <StatusBadge tone="warning">{t('admin.common.featured')}</StatusBadge>}
                            </div>
                            <Link href={route('admin.packages.edit', pkg.id)} className="font-headline-sm text-xl font-bold text-on-surface hover:text-secondary">
                                {pkg.title}
                            </Link>
                            <p>
                                <span className="font-headline-sm text-2xl font-extrabold text-accent2">{pkg.price_amount}</span>{' '}
                                <span className="font-label-sm text-label-sm uppercase text-outline">{pkg.price_period}</span>
                            </p>
                            <p className="font-body-sm text-body-sm text-outline">
                                {pkg.key} · {t('admin.packages.features_count').replace(':count', pkg.features_count)} ·{' '}
                                {t('admin.packages.inquiries_count').replace(':count', pkg.inquiries_count)}
                            </p>
                            <div className="mt-auto flex items-center justify-end gap-1 pt-space-sm">
                                <Link
                                    href={route('admin.packages.edit', pkg.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                    aria-label={t('admin.common.edit')}
                                >
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                </Link>
                                {pkg.inquiries_count === 0 && <DeleteButton href={route('admin.packages.destroy', pkg.id)} itemName={pkg.title} />}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
