import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';

export default function ResetPassword({ token, email }) {
    const t = useTranslations();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth_pages.reset_password.title')} />

            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('auth_pages.reset_password.kicker')}</span>
            <h2 className="mt-space-xs font-headline-lg text-headline-lg text-on-surface">{t('auth_pages.reset_password.heading')}</h2>

            <form onSubmit={submit} className="mt-space-xl flex flex-col gap-space-md">
                <div>
                    <label htmlFor="email" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.reset_password.email_label')}
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface px-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.reset_password.new_password_label')}
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface px-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.reset_password.confirm_password_label')}
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface px-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container disabled:opacity-50"
                >
                    {t('auth_pages.reset_password.submit')}
                </button>
            </form>
        </GuestLayout>
    );
}
