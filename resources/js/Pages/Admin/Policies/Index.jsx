import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { useTranslations } from '@/lib/translations';

export default function PoliciesIndex({ policies }) {
    const t = useTranslations();
    const { locale } = usePage().props;

    return (
        <AdminLayout
            title={t('admin.policies.title')}
            actions={
                <Link href={route('admin.policies.create')} className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container">
                    <span className="material-symbols-outlined text-lg">add</span> {t('admin.policies.create')}
                </Link>
            }
        >
            <Head title={t('admin.policies.title')} />

            <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                {policies.length === 0 ? (
                    <p className="p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
                ) : (
                    <table className="w-full min-w-[640px] text-sm">
                        <thead>
                            <tr className="border-b border-surface-container font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                <th className="p-space-md text-start">{t('admin.common.order')}</th>
                                <th className="p-space-md text-start">{t('admin.policies.fields.title')}</th>
                                <th className="p-space-md text-start">{t('admin.common.status')}</th>
                                <th className="p-space-md text-start">{t('admin.policies.updated_at')}</th>
                                <th className="p-space-md text-end">{t('admin.common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.map((policy) => (
                                <tr key={policy.id} className="border-b border-surface-container last:border-0">
                                    <td className="p-space-md text-outline">{policy.sort_order}</td>
                                    <td className="p-space-md">
                                        <Link href={route('admin.policies.edit', policy.id)} className="block font-label-md text-label-md text-on-surface hover:text-secondary">
                                            {policy.title}
                                        </Link>
                                        <span className="text-outline">/policies/{policy.slug}</span>
                                    </td>
                                    <td className="p-space-md">
                                        <StatusBadge tone={policy.is_published ? 'success' : 'neutral'}>
                                            {policy.is_published ? t('admin.common.published') : t('admin.common.hidden')}
                                        </StatusBadge>
                                    </td>
                                    <td className="p-space-md text-outline">{new Date(policy.updated_at).toLocaleString(locale)}</td>
                                    <td className="p-space-md">
                                        <div className="flex items-center justify-end gap-1">
                                            {policy.is_published && (
                                                <a
                                                    href={route('policies.show', policy.slug)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                    aria-label={t('admin.common.view')}
                                                >
                                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                                </a>
                                            )}
                                            <Link
                                                href={route('admin.policies.edit', policy.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                aria-label={t('admin.common.edit')}
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </Link>
                                            <DeleteButton href={route('admin.policies.destroy', policy.id)} itemName={policy.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
