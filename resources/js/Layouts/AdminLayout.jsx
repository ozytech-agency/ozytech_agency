 import { Link, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

const NAV_ITEMS = [
    { route: 'admin.dashboard', match: 'admin.dashboard', icon: 'space_dashboard', label: 'admin.nav.overview' },
    { route: 'admin.services.index', match: 'admin.services.*', icon: 'design_services', label: 'admin.nav.services' },
    { route: 'admin.packages.index', match: 'admin.packages.*', icon: 'inventory_2', label: 'admin.nav.packages' },
    { route: 'admin.posts.index', match: 'admin.posts.*', icon: 'article', label: 'admin.nav.posts' },
    { route: 'admin.projects.index', match: 'admin.projects.*', icon: 'work', label: 'admin.nav.projects' },
    { route: 'admin.team-members.index', match: 'admin.team-members.*', icon: 'groups', label: 'admin.nav.team_members' },
];

export default function AdminLayout({ title, actions, children }) {
    const t = useTranslations();
    const { flash, errors } = usePage().props;

    return (
        <SiteLayout>
            <Seo title={title} noindex />
            <div className="flex w-full flex-1 flex-col bg-surface-container-low">
                <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-space-lg px-gutter-mobile py-space-xl lg:flex-row lg:px-gutter-desktop">
                    <aside className="lg:w-56 lg:shrink-0">
                        <p className="mb-space-sm font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('admin.title')}</p>
                        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
                            {NAV_ITEMS.map((item) => {
                                const active = route().current(item.match);
                                return (
                                    <Link
                                        key={item.route}
                                        href={route(item.route)}
                                        className={`flex shrink-0 items-center gap-space-xs rounded-lg px-space-sm py-space-xs font-label-md text-label-md transition-colors ${
                                            active ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        {t(item.label)}
                                    </Link>
                                );
                            })}
                            <Link
                                href={route('home')}
                                className="flex shrink-0 items-center gap-space-xs rounded-lg px-space-sm py-space-xs font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface lg:mt-space-md"
                            >
                                <span className="material-symbols-outlined text-lg">open_in_new</span>
                                {t('admin.nav.view_site')}
                            </Link>
                        </nav>
                    </aside>

                    <div className="min-w-0 flex-1">
                        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm">
                            <h1 className="font-headline-sm text-headline-sm text-on-surface">{title}</h1>
                            {actions}
                        </div>

                        {flash?.status && (
                            <div role="status" className="mb-space-md rounded-lg bg-secondary-container/15 px-space-md py-space-sm font-label-md text-label-md text-secondary">
                                {flash.status}
                            </div>
                        )}
                        {errors?.package && (
                            <div role="alert" className="mb-space-md rounded-lg bg-error/10 px-space-md py-space-sm font-label-md text-label-md text-error">
                                {errors.package}
                            </div>
                        )}

                        {children}
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
