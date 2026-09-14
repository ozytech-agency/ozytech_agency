import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import useDarkMode from '@/Hooks/useDarkMode';
import NavDropdown from '@/Components/NavDropdown';
import MobileNavDropdown from '@/Components/MobileNavDropdown';
import Dropdown from '@/Components/Dropdown';
import { servicesNav, websiteNav } from '@/data/nav';
import { useTranslations } from '@/lib/translations';

function getInitials(name) {
    if (!name) return '';
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

export default function SiteHeader() {
    const t = useTranslations();
    const { auth } = usePage().props;
    const user = auth?.user;
    const [isDark, toggleDark] = useDarkMode();
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobile = () => setMobileOpen(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <a href="#main" className="sr-only">{t('nav.skip_to_content')}</a>
            <div className="header-bar relative h-20 max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
                <Link href={route('home')} className="flex items-center gap-space-xs shrink-0">
                    <img width="150" src="/images/logo.png" alt={t('nav.logo_alt')} />
                </Link>

                <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-space-xs p-space-2xs bg-surface-container-low/80 rounded-xl">
                    <Link href={route('home')} className="px-space-md py-space-xs text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors rounded-lg">
                        {t('nav.home')}
                    </Link>
                    <Link href={route('about')} className="px-space-md py-space-xs text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors rounded-lg">
                        {t('nav.about')}
                    </Link>
                    <NavDropdown label={t('nav.services_trigger')} items={servicesNav} namespace="services" />
                    <Link href={route('packages')} className="px-space-md py-space-xs text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors rounded-lg">
                        {t('nav.packages')}
                    </Link>
                    <NavDropdown label={t('nav.website_trigger')} items={websiteNav} namespace="website" />
                    <Link href={route('blog')} className="px-space-md py-space-xs text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors rounded-lg">
                        {t('nav.blogs')}
                    </Link>
                </nav>

                <div className="flex items-center gap-space-md">
                    <button
                        type="button"
                        aria-label={isDark ? t('nav.theme_toggle_to_light') : t('nav.theme_toggle_to_dark')}
                        title="Toggle light / dark theme"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                        onClick={toggleDark}
                    >
                        <span className="material-symbols-outlined text-[22px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                    {user ? (
                        <div className="hidden sm:block">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-space-xs rounded-lg px-space-sm py-space-xs text-on-surface-variant transition-colors hover:text-on-surface"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent2 font-label-sm text-label-sm font-bold text-on-primary">
                                            {getInitials(user.name)}
                                        </span>
                                        <span className="max-w-[9rem] truncate font-label-md text-label-md">{user.name}</span>
                                        <span className="material-symbols-outlined text-lg">expand_more</span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" width="48">
                                    <Dropdown.Link href={route('profile.edit')}>{t('nav.profile')}</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        {t('nav.logout')}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="hidden sm:inline-flex items-center justify-center rounded-lg border border-outline-variant px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:border-secondary-container hover:text-on-surface"
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                href={route('register')}
                                className="hidden sm:inline-flex items-center justify-center bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                            >
                                {t('nav.signup')}
                            </Link>
                        </>
                    )}
                    <button
                        type="button"
                        aria-label={mobileOpen ? t('nav.close_menu') : t('nav.open_menu')}
                        aria-expanded={mobileOpen}
                        className="lg:hidden w-10 h-10 -mr-1 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-high transition-colors"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <nav aria-label="Mobile" className="lg:hidden fixed top-20 inset-x-0 z-40 bg-surface border-t border-surface-container shadow-[0_20px_40px_-12px_rgba(19,27,46,0.25)] max-h-[calc(100vh-5rem)] overflow-y-auto">
                    <div className="max-w-max-width mx-auto px-gutter-mobile py-space-md flex flex-col gap-1">
                        <Link
                            href={route('home')}
                            onClick={closeMobile}
                            className="px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            href={route('about')}
                            onClick={closeMobile}
                            className="px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                        >
                            {t('nav.about')}
                        </Link>
                        <MobileNavDropdown label={t('nav.services_trigger')} items={servicesNav} namespace="services" onNavigate={closeMobile} />
                        <Link
                            href={route('packages')}
                            onClick={closeMobile}
                            className="px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                        >
                            {t('nav.packages')}
                        </Link>
                        <MobileNavDropdown label={t('nav.website_trigger')} items={websiteNav} namespace="website" onNavigate={closeMobile} />
                        <Link
                            href={route('blog')}
                            onClick={closeMobile}
                            className="px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                        >
                            {t('nav.blogs')}
                        </Link>
                        {user ? (
                            <div className="mt-space-xs border-t border-surface-container pt-space-sm">
                                <div className="flex items-center gap-space-xs px-space-sm pb-space-xs">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent2 font-label-sm text-label-sm font-bold text-on-primary">
                                        {getInitials(user.name)}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate font-label-md text-label-md text-on-surface">{user.name}</p>
                                        <p className="truncate font-body-sm text-body-sm text-on-surface-variant">{user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href={route('profile.edit')}
                                    onClick={closeMobile}
                                    className="block px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                                >
                                    {t('nav.profile')}
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={closeMobile}
                                    className="block w-full text-start px-space-sm py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md transition-colors"
                                >
                                    {t('nav.logout')}
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-space-xs flex gap-space-xs">
                                <Link
                                    href={route('login')}
                                    onClick={closeMobile}
                                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-outline-variant px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:border-secondary-container hover:text-on-surface"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href={route('register')}
                                    onClick={closeMobile}
                                    className="inline-flex flex-1 items-center justify-center rounded-lg bg-accent2 px-space-md py-space-sm font-label-md text-label-md text-on-primary shadow-md transition-colors hover:bg-secondary-container"
                                >
                                    {t('nav.signup')}
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
