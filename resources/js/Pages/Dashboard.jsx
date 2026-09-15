import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';

const QUICK_LINK_META = [
    { icon: 'rocket_launch', route: 'start-a-project' },
    { icon: 'inventory_2', route: 'packages' },
    { icon: 'support_agent', route: 'contact' },
    { icon: 'help', route: 'faq' },
];

const WORKSPACE_FEATURE_ICONS = ['insights', 'forum', 'receipt_long'];

function formatMemberSince(dateString, locale) {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(locale, { year: 'numeric', month: 'long' });
}

export default function Dashboard() {
    const t = useTranslations();
    const { auth, locale } = usePage().props;
    const user = auth.user;
    const firstName = user.name?.split(' ')[0] ?? user.name;

    const workspaceFeatures = t('dashboard.workspace.features');
    const quickLinks = t('dashboard.quick_links.items');

    return (
        <AuthenticatedLayout
            header={<h2 className="font-headline-sm text-headline-sm text-on-surface">{t('dashboard.header')}</h2>}
        >
            <Head title={t('dashboard.title')} />

            <div className="mx-auto max-w-7xl px-gutter-mobile py-space-2xl lg:px-gutter-desktop">
                <div className="rounded-xl bg-primary-container p-space-xl text-on-primary lg:p-space-2xl">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('dashboard.hero.eyebrow')}</span>
                    <h1 className="mt-space-xs font-headline-lg text-headline-lg">{t('dashboard.hero.title').replace(':name', firstName)}</h1>
                    <p className="mt-space-sm max-w-xl text-primary-fixed-dim">{t('dashboard.hero.subtitle')}</p>
                </div>

                <div className="mt-space-2xl grid grid-cols-1 gap-space-lg lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('dashboard.workspace.heading')}</h2>
                        <div className="mt-space-md grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            {workspaceFeatures.map((f, i) => (
                                <div key={f.title} className="flex flex-col gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/15 text-secondary">
                                        <span className="material-symbols-outlined text-[20px]">{WORKSPACE_FEATURE_ICONS[i]}</span>
                                    </span>
                                    <p className="font-label-md text-label-md text-on-surface">{f.title}</p>
                                    <p className="text-body-sm text-on-surface-variant">{f.desc}</p>
                                </div>
                            ))}
                            <div className="flex flex-col items-start gap-space-sm rounded-xl border border-dashed border-outline-variant p-space-lg sm:col-span-2">
                                <span className="font-label-md text-label-md text-on-surface">{t('dashboard.workspace.empty.title')}</span>
                                <p className="text-body-sm text-on-surface-variant">{t('dashboard.workspace.empty.desc')}</p>
                                <Link
                                    href={route('start-a-project')}
                                    className="mt-space-xs inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:translate-x-0.5 transition-transform"
                                >
                                    {t('dashboard.workspace.empty.cta')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        <h2 className="mt-space-2xl font-headline-sm text-headline-sm text-on-surface">{t('dashboard.quick_links.heading')}</h2>
                        <div className="mt-space-md grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            {quickLinks.map((link, i) => (
                                <Link
                                    key={link.title}
                                    href={route(QUICK_LINK_META[i].route)}
                                    className="group flex items-start gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent2/10 text-accent2">
                                        <span className="material-symbols-outlined text-[20px]">{QUICK_LINK_META[i].icon}</span>
                                    </span>
                                    <div>
                                        <p className="font-label-md text-label-md text-on-surface">{link.title}</p>
                                        <p className="mt-space-2xs text-body-sm text-on-surface-variant">{link.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('dashboard.account.heading')}</h2>
                        <div className="mt-space-md flex flex-col gap-space-md rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                            <div className="flex items-center gap-space-sm">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent2 font-label-md text-label-md font-bold text-on-primary">
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-label-md text-label-md text-on-surface">{user.name}</p>
                                    <p className="truncate text-body-sm text-on-surface-variant">{user.email}</p>
                                </div>
                            </div>

                            <dl className="flex flex-col gap-space-xs border-t border-surface-container pt-space-md">
                                <div className="flex items-center justify-between gap-space-sm">
                                    <dt className="text-body-sm text-on-surface-variant">{t('dashboard.account.email_status')}</dt>
                                    <dd className="flex items-center gap-space-2xs font-label-sm text-label-sm text-on-surface">
                                        {user.email_verified_at ? (
                                            <>
                                                <span className="material-symbols-outlined icon-fill text-base text-secondary-container">verified</span>
                                                {t('dashboard.account.verified')}
                                            </>
                                        ) : (
                                            t('dashboard.account.not_verified')
                                        )}
                                    </dd>
                                </div>
                                {formatMemberSince(user.created_at, locale) && (
                                    <div className="flex items-center justify-between gap-space-sm">
                                        <dt className="text-body-sm text-on-surface-variant">{t('dashboard.account.member_since')}</dt>
                                        <dd className="font-label-sm text-label-sm text-on-surface">{formatMemberSince(user.created_at, locale)}</dd>
                                    </div>
                                )}
                            </dl>

                            <div className="flex flex-col gap-space-xs border-t border-surface-container pt-space-md">
                                <Link
                                    href={route('profile.edit')}
                                    className="inline-flex items-center justify-center gap-space-xs rounded-lg border border-outline-variant/40 px-space-md py-space-sm font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
                                >
                                    {t('dashboard.account.edit_profile')}
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center justify-center gap-space-xs rounded-lg px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                                >
                                    {t('dashboard.account.logout')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
