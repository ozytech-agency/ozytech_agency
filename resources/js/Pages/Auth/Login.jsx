import Checkbox from '@/Components/Checkbox';
import GoogleIcon from '@/Components/GoogleIcon';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function Login({ status, canResetPassword }) {
    const t = useTranslations();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth_pages.login.title')} />

            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('auth_pages.login.kicker')}</span>
            <h2 className="mt-space-xs font-headline-lg text-headline-lg text-on-surface">{t('auth_pages.login.heading')}</h2>
            <p className="mt-space-sm text-on-surface-variant">{t('auth_pages.login.subtitle')}</p>

            {status && (
                <div className="mt-space-md font-body-sm text-body-sm font-medium text-secondary-fixed-dim">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-space-xl flex flex-col gap-space-md">
                <div>
                    <label htmlFor="email" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.login.email_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">mail</span>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            required
                            onChange={(e) => setData('email', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                            placeholder="you@company.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="mb-space-2xs flex items-center justify-between gap-space-sm">
                        <label htmlFor="password" className="font-label-md text-label-md text-on-surface">
                            {t('auth_pages.login.password_label')}
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="font-label-sm text-label-sm text-secondary hover:underline">
                                {t('auth_pages.login.forgot_password')}
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-11 text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                            placeholder={t('auth_pages.login.password_placeholder')}
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-on-surface"
                        >
                            <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <label className="flex items-center gap-2">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{t('auth_pages.login.remember_me')}</span>
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container disabled:opacity-50"
                >
                    {t('auth_pages.login.submit')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                </button>
            </form>

            <div className="mt-space-lg flex items-center gap-space-sm" role="separator">
                <span className="h-px flex-1 bg-outline-variant/40" aria-hidden="true"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{t('auth_pages.login.divider_or')}</span>
                <span className="h-px flex-1 bg-outline-variant/40" aria-hidden="true"></span>
            </div>

            <a
                href={route('google.login')}
                className="mt-space-lg flex h-12 w-full items-center justify-center gap-space-xs rounded-lg border border-outline-variant/50 bg-surface font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-secondary-container/30"
            >
                <GoogleIcon /> {t('auth_pages.login.continue_with_google')}
            </a>

            <p className="mt-space-lg text-center font-body-sm text-body-sm text-on-surface-variant">
                {t('auth_pages.login.create_account_prompt')}{' '}
                <Link href={route('register')} className="font-semibold text-secondary hover:underline">
                    {t('auth_pages.login.create_account_link')}
                </Link>
            </p>
        </GuestLayout>
    );
}
