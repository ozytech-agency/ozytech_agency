import InputError from '@/Components/InputError';
import PhoneNumberInput from '@/Components/PhoneNumberInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function Register() {
    const t = useTranslations();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth_pages.register.title')} />

            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('auth_pages.register.kicker')}</span>
            <h2 className="mt-space-xs font-headline-lg text-headline-lg text-on-surface">{t('auth_pages.register.heading')}</h2>
            <p className="mt-space-sm text-on-surface-variant">{t('auth_pages.register.subtitle')}</p>

            <form onSubmit={submit} className="mt-space-xl flex flex-col gap-space-md">
                <div>
                    <label htmlFor="name" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.register.name_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">person</span>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            autoFocus
                            required
                            onChange={(e) => setData('name', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                            placeholder={t('auth_pages.register.name_placeholder')}
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="email" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.register.email_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">mail</span>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                            placeholder="you@company.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="phone_number" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.register.phone_label')}
                    </label>
                    <PhoneNumberInput
                        id="phone_number"
                        value={data.phone_number}
                        onChange={(value) => setData('phone_number', value)}
                        autoComplete="tel"
                        required
                        placeholder={t('auth_pages.register.phone_placeholder')}
                        leadingIcon={<span className="material-symbols-outlined shrink-0 text-[20px] text-on-surface-variant">call</span>}
                        boxClassName="flex h-12 w-full items-center gap-space-xs rounded-lg border border-outline-variant/50 bg-surface pl-space-sm pr-space-sm text-on-surface transition-colors focus-within:border-secondary-container focus-within:ring-2 focus-within:ring-secondary-container/30"
                        selectClassName="shrink-0 border-outline-variant/40 bg-transparent pe-space-xs text-on-surface outline-none [border-inline-end-width:1px] [max-width:5.5rem]"
                        inputClassName="min-w-0 flex-1 border-0 bg-transparent text-on-surface outline-none placeholder:text-outline"
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.register.password_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-11 text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                            placeholder={t('auth_pages.register.password_placeholder')}
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

                <div>
                    <label htmlFor="password_confirmation" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('auth_pages.register.confirm_password_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                        <input
                            id="password_confirmation"
                            type={showPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                            placeholder={t('auth_pages.register.confirm_password_placeholder')}
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container disabled:opacity-50"
                >
                    {t('auth_pages.register.submit')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                </button>
            </form>

            <p className="mt-space-lg text-center font-body-sm text-body-sm text-on-surface-variant">
                {t('auth_pages.register.login_prompt')}{' '}
                <Link href={route('login')} className="font-semibold text-secondary hover:underline">
                    {t('auth_pages.register.login_link')}
                </Link>
            </p>
        </GuestLayout>
    );
}
