import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { useTranslations } from '@/lib/translations';

export default function TeamMembersIndex({ teamMembers }) {
    const t = useTranslations();

    return (
        <AdminLayout
            title={t('admin.team_members.title')}
            actions={
                <Link
                    href={route('admin.team-members.create')}
                    className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container"
                >
                    <span className="material-symbols-outlined text-lg">add</span> {t('admin.team_members.create')}
                </Link>
            }
        >
            <Head title={t('admin.team_members.title')} />

            <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                {teamMembers.length === 0 ? (
                    <p className="p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
                ) : (
                    <table className="w-full min-w-[640px] text-sm">
                        <thead>
                            <tr className="border-b border-surface-container text-start font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                <th className="p-space-md text-start">{t('admin.common.order')}</th>
                                <th className="p-space-md text-start">{t('admin.team_members.fields.name')}</th>
                                <th className="p-space-md text-start">{t('admin.team_members.fields.role')}</th>
                                <th className="p-space-md text-start">{t('admin.common.status')}</th>
                                <th className="p-space-md text-end">{t('admin.common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.map((teamMember) => (
                                <tr key={teamMember.id} className="border-b border-surface-container last:border-0">
                                    <td className="p-space-md text-outline">{teamMember.sort_order}</td>
                                    <td className="p-space-md">
                                        <Link
                                            href={route('admin.team-members.edit', teamMember.id)}
                                            className="block font-label-md text-label-md text-on-surface hover:text-secondary"
                                        >
                                            {teamMember.name}
                                        </Link>
                                    </td>
                                    <td className="p-space-md text-on-surface-variant">{teamMember.role}</td>
                                    <td className="p-space-md">
                                        <StatusBadge tone={teamMember.is_published ? 'success' : 'neutral'}>
                                            {teamMember.is_published ? t('admin.common.published') : t('admin.common.hidden')}
                                        </StatusBadge>
                                    </td>
                                    <td className="p-space-md">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={route('admin.team-members.edit', teamMember.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                aria-label={t('admin.common.edit')}
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </Link>
                                            <DeleteButton href={route('admin.team-members.destroy', teamMember.id)} itemName={teamMember.name} />
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
