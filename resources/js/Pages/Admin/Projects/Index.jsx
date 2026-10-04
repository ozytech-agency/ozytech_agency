import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { useTranslations } from '@/lib/translations';

const STATUS_TONES = { published: 'success', draft: 'neutral' };

export default function ProjectsIndex({ projects, filters, services }) {
    const t = useTranslations();
    const [search, setSearch] = useState(filters.search ?? '');

    const applyFilters = (next) => {
        router.get(route('admin.projects.index'), { search: search || undefined, service: filters.service || undefined, ...next }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout
            title={t('admin.projects.title')}
            actions={
                <Link href={route('admin.projects.create')} className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container">
                    <span className="material-symbols-outlined text-lg">add</span> {t('admin.projects.create')}
                </Link>
            }
        >
            <Head title={t('admin.projects.title')} />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    applyFilters({});
                }}
                className="mb-space-md flex flex-wrap items-center gap-space-sm"
            >
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('admin.common.search')}
                    className="w-full max-w-sm rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                />
                <select
                    aria-label={t('admin.projects.fields.service')}
                    value={filters.service ?? ''}
                    onChange={(e) => applyFilters({ service: e.target.value || undefined })}
                    className="rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                >
                    <option value="">{t('admin.projects.all_services')}</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.title}
                        </option>
                    ))}
                </select>
            </form>

            <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                {projects.data.length === 0 ? (
                    <p className="p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
                ) : (
                    <table className="w-full min-w-[640px] text-sm">
                        <thead>
                            <tr className="border-b border-surface-container font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                <th className="p-space-md text-start">{t('admin.projects.fields.title')}</th>
                                <th className="p-space-md text-start">{t('admin.projects.fields.service')}</th>
                                <th className="p-space-md text-start">{t('admin.common.status')}</th>
                                <th className="p-space-md text-start">{t('admin.common.order')}</th>
                                <th className="p-space-md text-end">{t('admin.common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project) => (
                                <tr key={project.id} className="border-b border-surface-container last:border-0">
                                    <td className="p-space-md">
                                        <Link href={route('admin.projects.edit', project.id)} className="block font-label-md text-label-md text-on-surface hover:text-secondary">
                                            {project.title}
                                        </Link>
                                        <span className="text-outline">/{project.slug}</span>
                                    </td>
                                    <td className="p-space-md text-on-surface-variant">{project.service}</td>
                                    <td className="p-space-md">
                                        <StatusBadge tone={STATUS_TONES[project.status]}>{t(`admin.common.${project.status}`)}</StatusBadge>
                                    </td>
                                    <td className="p-space-md text-outline">{project.display_order}</td>
                                    <td className="p-space-md">
                                        <div className="flex items-center justify-end gap-1">
                                            {project.status === 'published' && (
                                                <a
                                                    href={route('projects.show', { project: project.slug })}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                    aria-label={t('admin.common.view')}
                                                >
                                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                                </a>
                                            )}
                                            <Link
                                                href={route('admin.projects.edit', project.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                aria-label={t('admin.common.edit')}
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </Link>
                                            <DeleteButton href={route('admin.projects.destroy', project.id)} itemName={project.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {(projects.prev_page_url || projects.next_page_url) && (
                <nav className="mt-space-md flex justify-end gap-space-sm" aria-label="Pagination">
                    {projects.prev_page_url && (
                        <Link href={projects.prev_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                            {t('admin.common.previous')}
                        </Link>
                    )}
                    {projects.next_page_url && (
                        <Link href={projects.next_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                            {t('admin.common.next')}
                        </Link>
                    )}
                </nav>
            )}
        </AdminLayout>
    );
}
