import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function UpdatePasswordForm() {
    const t = useTranslations();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section>
            <header>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('profile.sections.password.heading')}</h2>
                <p className="mt-space-2xs text-body-sm text-on-surface-variant">{t('profile.sections.password.desc')}</p>
            </header>

            <form onSubmit={updatePassword} className="mt-space-lg flex flex-col gap-space-md">
                <div>
                    <label htmlFor="current_password" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('profile.fields.current_password_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                        <input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            autoComplete="current-password"
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                        />
                    </div>
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('profile.fields.new_password_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                        <input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-11 text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
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
                        {t('profile.fields.confirm_password_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                        <input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-space-md">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex h-12 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-lg font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container disabled:opacity-50"
                    >
                        {t('profile.save')}
                    </button>

                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-body-sm text-on-surface-variant">{t('profile.saved')}</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
