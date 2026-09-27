import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { StatusBadge } from '@/Components/Admin/Field';
import { useTranslations } from '@/lib/translations';

export default function AdminDashboard({ stats, latestInquiries }) {
    const t = useTranslations();
    const { locale } = usePage().props;

    const cards = [
        { label: t('admin.dashboard.services'), total: stats.services, published: stats.services_published, icon: 'design_services', route: 'admin.services.index' },
        { label: t('admin.dashboard.packages'), total: stats.packages, published: stats.packages_published, icon: 'inventory_2', route: 'admin.packages.index' },
        { label: t('admin.dashboard.posts'), total: stats.posts, published: stats.posts_published, icon: 'article', route: 'admin.posts.index' },
        { label: t('admin.dashboard.inquiries'), total: stats.inquiries, icon: 'mail' },
    ];

    return (
        <AdminLayout title={t('admin.dashboard.title')}>
            <Head title={t('admin.dashboard.title')} />

            <p className="-mt-space-md mb-space-lg text-on-surface-variant">{t('admin.dashboard.subtitle')}</p>

            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div key={card.label} className="flex flex-col gap-space-xs rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/15 text-secondary">
                            <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">{card.label}</span>
                        <strong className="font-headline-lg text-headline-lg text-on-surface">{card.total}</strong>
                        {card.published !== undefined && (
                            <span className="font-body-sm text-body-sm text-outline">{t('admin.dashboard.published_of').replace(':published', card.published)}</span>
                        )}
                        {card.route && (
                            <Link href={route(card.route)} className="mt-auto inline-flex items-center gap-space-2xs pt-space-xs font-label-md text-label-md text-secondary hover:text-on-surface">
                                {t('admin.dashboard.manage')} <span className="material-symbols-outlined text-base rtl:rotate-180">arrow_forward</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <h2 className="mt-space-2xl font-headline-sm text-headline-sm text-on-surface">{t('admin.dashboard.latest_inquiries')}</h2>
            <div className="mt-space-md overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
                {latestInquiries.length === 0 ? (
                    <p className="p-space-lg text-on-surface-variant">{t('admin.dashboard.no_inquiries')}</p>
                ) : (
                    <table className="w-full min-w-[640px] text-sm">
                        <tbody>
                            {latestInquiries.map((inquiry) => (
                                <tr key={inquiry.id} className="border-b border-surface-container last:border-0">
                                    <td className="p-space-md">
                                        <span className="block font-label-md text-label-md text-on-surface">
                                            {[inquiry.first_name, inquiry.last_name].filter(Boolean).join(' ')}
                                        </span>
                                        <span className="text-on-surface-variant">{inquiry.email}</span>
                                    </td>
                                    <td className="p-space-md text-on-surface-variant">{inquiry.company}</td>
                                    <td className="p-space-md text-on-surface-variant">{inquiry.topic}</td>
                                    <td className="p-space-md">{inquiry.package && <StatusBadge>{inquiry.package}</StatusBadge>}</td>
                                    <td className="p-space-md">
                                        <StatusBadge tone={inquiry.status === 'completed' ? 'success' : 'warning'}>{inquiry.status?.replace('_', ' ')}</StatusBadge>
                                    </td>
                                    <td className="p-space-md text-end text-outline">{new Date(inquiry.created_at).toLocaleDateString(locale)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
