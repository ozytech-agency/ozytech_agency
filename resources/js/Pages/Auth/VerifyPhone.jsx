import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';

export default function VerifyPhone({ status }) {
    const t = useTranslations();
    const sendForm = useForm({});
    const confirmForm = useForm({ code: '' });

    const sendCode = (e) => {
        e.preventDefault();
        sendForm.post(route('phone-verification.send'));
    };

    const submitCode = (e) => {
        e.preventDefault();
        confirmForm.post(route('phone-verification.confirm'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth_pages.verify_phone.title')} />

            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('auth_pages.verify_phone.kicker')}</span>
            <h2 className="mt-space-xs font-headline-lg text-headline-lg text-on-surface">{t('auth_pages.verify_phone.heading')}</h2>
            <p className="mt-space-sm text-on-surface-variant">{t('auth_pages.verify_phone.description')}</p>

            {status === 'phone-verification-code-sent' && (
                <div className="mt-space-md font-body-sm text-body-sm font-medium text-secondary-fixed-dim">
                    {t('auth_pages.verify_phone.code_sent')}
                </div>
            )}

            <form onSubmit={sendCode} className="mt-space-lg">
                <button
                    type="submit"
                    disabled={sendForm.processing}
                    className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg border border-outline-variant/50 px-space-lg font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-50"
                >
                    {t('auth_pages.verify_phone.send_code')}
                </button>
            </form>

            <form onSubmit={submitCode} className="mt-space-md flex flex-col gap-space-md">
                <div>
                    <label htmlFor="code" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.verify_phone.code_label')}
                    </label>
                    <input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        dir="ltr"
                        value={confirmForm.data.code}
                        onChange={(e) => confirmForm.setData('code', e.target.value)}
                        className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface px-space-md text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                        placeholder="123456"
                    />
                    <InputError message={confirmForm.errors.code} className="mt-2" />
                </div>

                <div className="flex items-center justify-between gap-space-md">
                    <button
                        type="submit"
                        disabled={confirmForm.processing}
                        className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container disabled:opacity-50"
                    >
                        {t('auth_pages.verify_phone.submit')}
                    </button>

                    <Link href={route('logout')} method="post" as="button" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline">
                        {t('auth_pages.verify_phone.logout')}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
