import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';

export default function VerifyEmail({ status }) {
    const t = useTranslations();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth_pages.verify_email.title')} />

            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('auth_pages.verify_email.kicker')}</span>
            <h2 className="mt-space-xs font-headline-lg text-headline-lg text-on-surface">{t('auth_pages.verify_email.heading')}</h2>
            <p className="mt-space-sm text-on-surface-variant">{t('auth_pages.verify_email.description')}</p>

            {status === 'verification-link-sent' && (
                <div className="mt-space-md font-body-sm text-body-sm font-medium text-secondary-fixed-dim">
                    {t('auth_pages.verify_email.link_sent')}
                </div>
            )}

            <form onSubmit={submit} className="mt-space-xl flex items-center justify-between gap-space-md">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container disabled:opacity-50"
                >
                    {t('auth_pages.verify_email.submit')}
                </button>

                <Link href={route('logout')} method="post" as="button" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline">
                    {t('auth_pages.verify_email.logout')}
                </Link>
            </form>
        </GuestLayout>
    );
}
