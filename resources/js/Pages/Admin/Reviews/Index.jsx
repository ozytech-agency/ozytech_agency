import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { StatusBadge } from '@/Components/Admin/Field';
import { StarRating } from '@/Components/StarRating';
import { useTranslations } from '@/lib/translations';

export default function ReviewsIndex({ reviews }) {
    const t = useTranslations();
    const { locale } = usePage().props;

    return (
        <AdminLayout
            title={t('admin.reviews.title')}
            actions={
                <div className="flex flex-wrap items-center gap-space-sm">
                    <a href={route('reviews.create')} target="_blank" rel="noreferrer" className="font-label-md text-label-md text-secondary hover:text-on-surface">
                        {t('admin.reviews.public_page')}
                    </a>
                    <Link href={route('admin.reviews.create')} className="inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-xs font-label-md text-label-md text-on-primary hover:bg-secondary-container">
                        <span className="material-symbols-outlined text-lg">add</span> {t('admin.reviews.create')}
                    </Link>
                </div>
            }
        >
            <Head title={t('admin.reviews.title')} />

            <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                {reviews.data.length === 0 ? (
                    <p className="p-space-lg text-on-surface-variant">{t('admin.common.empty')}</p>
                ) : (
                    <table className="w-full min-w-[720px] text-sm">
                        <thead>
                            <tr className="border-b border-surface-container font-label-sm text-label-sm uppercase tracking-wider text-outline">
                                <th className="p-space-md text-start">{t('admin.reviews.fields.name')}</th>
                                <th className="p-space-md text-start">{t('admin.reviews.fields.review')}</th>
                                <th className="p-space-md text-start">{t('admin.common.status')}</th>
                                <th className="p-space-md text-end">{t('admin.common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.data.map((review) => (
                                <tr key={review.id} className="border-b border-surface-container align-top last:border-0">
                                    <td className="p-space-md">
                                        <Link href={route('admin.reviews.edit', review.id)} className="block font-label-md text-label-md text-on-surface hover:text-secondary">
                                            {review.name}
                                        </Link>
                                        <span className="block text-outline">{review.email}</span>
                                        {review.role && <span className="block text-outline">{review.role}</span>}
                                    </td>
                                    <td className="max-w-md p-space-md">
                                        <StarRating rating={review.rating} label={`${review.rating}/5`} className="mb-space-2xs" />
                                        <p className="line-clamp-3 text-on-surface-variant">{review.review}</p>
                                        <span className="mt-space-2xs block text-outline">
                                            {t('admin.reviews.submitted_at').replace(':date', new Date(review.created_at).toLocaleString(locale))}
                                        </span>
                                    </td>
                                    <td className="p-space-md">
                                        <div className="flex flex-wrap gap-1">
                                            <StatusBadge tone={review.is_published ? 'success' : 'warning'}>
                                                {review.is_published ? t('admin.common.published') : t('admin.reviews.pending')}
                                            </StatusBadge>
                                            {review.from_account && <StatusBadge>{t('admin.reviews.from_account')}</StatusBadge>}
                                        </div>
                                    </td>
                                    <td className="p-space-md">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={route('admin.reviews.edit', review.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                                aria-label={t('admin.common.edit')}
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </Link>
                                            <DeleteButton href={route('admin.reviews.destroy', review.id)} itemName={review.name} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {(reviews.prev_page_url || reviews.next_page_url) && (
                <nav className="mt-space-md flex justify-end gap-space-sm" aria-label="Pagination">
                    {reviews.prev_page_url && (
                        <Link href={reviews.prev_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                            {t('admin.common.previous')}
                        </Link>
                    )}
                    {reviews.next_page_url && (
                        <Link href={reviews.next_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                            {t('admin.common.next')}
                        </Link>
                    )}
                </nav>
            )}
        </AdminLayout>
    );
}
