import { Link } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';

const FEATURE_ICONS = ['insights', 'forum', 'receipt_long'];

export default function GuestLayout({ children }) {
    const t = useTranslations();
    const features = t('auth_pages.brand.features');

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-gutter-mobile py-space-2xl">
            <div className="w-full max-w-5xl overflow-hidden rounded-xl shadow-[0_25px_60px_-20px_rgba(11,21,40,0.25)] grid grid-cols-1 lg:grid-cols-2">
                <div className="relative hidden flex-col justify-between gap-space-2xl overflow-hidden bg-primary-container p-space-2xl text-on-primary lg:flex">
                    <div className="absolute right-[-15%] top-[-25%] h-[380px] w-[380px] rounded-full bg-secondary-container/20 blur-3xl" aria-hidden="true"></div>
                    <Link href={route('home')} className="relative flex items-center gap-space-xs">
                        <img src="/images/logo.png" alt="OzyTech" className="h-7 w-auto brightness-0 invert" />
                    </Link>
                    <div className="relative">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('auth_pages.brand.kicker')}</span>
                        <h1 className="mt-space-sm font-headline-lg text-headline-lg leading-tight">{t('auth_pages.brand.title')}</h1>
                        <p className="mt-space-md max-w-sm text-body-md text-primary-fixed-dim">{t('auth_pages.brand.subtitle')}</p>
                    </div>
                    <div className="relative flex flex-col gap-space-lg">
                        {features.map((f, i) => (
                            <div key={f.title} className="flex items-start gap-space-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-secondary-fixed-dim">
                                    <span className="material-symbols-outlined text-[20px]">{FEATURE_ICONS[i]}</span>
                                </span>
                                <div>
                                    <p className="font-label-md text-label-md text-on-primary">{f.title}</p>
                                    <p className="text-body-sm text-primary-fixed-dim">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative flex items-center gap-space-sm">
                        <span className="font-display-md text-display-md text-on-primary">98.5%</span>
                        <span className="text-body-sm text-primary-fixed-dim">{t('auth_pages.brand.stat_caption')}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-surface-container-lowest p-space-xl lg:p-space-2xl">
                    <div className="w-full max-w-md">
                        <Link href={route('home')} className="mb-space-lg flex items-center gap-space-xs lg:hidden">
                            <img src="/images/logo.png" alt="OzyTech" className="h-7 w-auto" />
                        </Link>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
