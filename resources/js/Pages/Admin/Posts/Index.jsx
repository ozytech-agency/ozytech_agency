import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { useTranslations } from '@/lib/translations';

const STATUS_TONES = { published: 'success', scheduled: 'warning', draft: 'neutral' };

export default function PostsIndex({ posts, filters }) {
    const t = useTranslations();
    const { locale } = usePage().props;
    const [search, setSearch] = useState(filters.search ?? '');

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.posts.index'), search ? { search } : {}, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout
            title={t('admin.posts.title')}
            actions={
                <Link href={route('admin.posts.create')} className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container">
                    <span className="material-symbols-outlined text-lg">add</span> {t('admin.posts.create')}
                </Link>
            }
        >
            <Head title={t('admin.posts.title')} />

            <form onSubmit={submitSearch} className="mb-space-md">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('admin.common.search')}
                    className="w-full max-w-sm rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                />
            </form>

            <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                {posts.data.length === 0 ? (
                    <p className="p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
                ) : (
                    <table className="w-full min-w-[640px] text-sm">
                        <thead>
                            <tr className="border-b border-surface-container font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                <th className="p-space-md text-start">{t('admin.posts.fields.title')}</th>
                                <th className="p-space-md text-start">{t('admin.posts.fields.category')}</th>
                                <th className="p-space-md text-start">{t('admin.common.status')}</th>
                                <th className="p-space-md text-start">{t('admin.posts.fields.published_at')}</th>
                                <th className="p-space-md text-end">{t('admin.common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.data.map((post) => (
                                <tr key={post.id} className="border-b border-surface-container last:border-0">
                                    <td className="p-space-md">
                                        <Link href={route('admin.posts.edit', post.id)} className="block font-label-md text-label-md text-on-surface hover:text-secondary">
                                            {post.title}
                                        </Link>
                                        <span className="text-outline">
                                            /{post.slug}
                                            {post.author && ` · ${post.author}`}
                                        </span>
                                    </td>
                                    <td className="p-space-md text-on-surface-variant">{post.category}</td>
                                    <td className="p-space-md">
                                        <div className="flex flex-wrap gap-1">
                                            <StatusBadge tone={STATUS_TONES[post.status]}>{t(`admin.common.${post.status}`)}</StatusBadge>
                                            {post.is_featured && <StatusBadge tone="warning">{t('admin.common.featured')}</StatusBadge>}
                                        </div>
                                    </td>
                                    <td className="p-space-md text-outline">{post.published_at ? new Date(post.published_at).toLocaleString(locale) : '—'}</td>
                                    <td className="p-space-md">
                                        <div className="flex items-center justify-end gap-1">
                                            {post.status === 'published' && (
                                                <a
                                                    href={route('blog.show', post.slug)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                    aria-label={t('admin.common.view')}
                                                >
                                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                                </a>
                                            )}
                                            <Link
                                                href={route('admin.posts.edit', post.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                aria-label={t('admin.common.edit')}
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </Link>
                                            <DeleteButton href={route('admin.posts.destroy', post.id)} itemName={post.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {(posts.prev_page_url || posts.next_page_url) && (
                <nav className="mt-space-md flex justify-end gap-space-sm" aria-label="Pagination">
                    {posts.prev_page_url && (
                        <Link href={posts.prev_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                            {t('admin.common.previous')}
                        </Link>
                    )}
                    {posts.next_page_url && (
                        <Link href={posts.next_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                            {t('admin.common.next')}
                        </Link>
                    )}
                </nav>
            )}
        </AdminLayout>
    );
}
