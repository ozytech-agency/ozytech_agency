import Avatar from '@/Components/Avatar';
import InputError from '@/Components/InputError';
import PhoneNumberInput from '@/Components/PhoneNumberInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { useTranslations } from '@/lib/translations';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const t = useTranslations();
    const user = usePage().props.auth.user;
    const avatarInput = useRef(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number ?? '',
    });

    const avatarForm = useForm({ avatar: null });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const uploadAvatar = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        avatarForm.setData('avatar', file);
        avatarForm.post(route('profile.avatar.update'), {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                avatarForm.reset();
                if (avatarInput.current) avatarInput.current.value = '';
            },
        });
    };

    const removeAvatar = () => {
        avatarForm.delete(route('profile.avatar.destroy'), { preserveScroll: true });
    };

    return (
        <section>
            <header>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('profile.sections.info.heading')}</h2>
                <p className="mt-space-2xs text-body-sm text-on-surface-variant">{t('profile.sections.info.desc')}</p>
            </header>

            <div className="mt-space-lg flex items-center gap-space-md">
                <Avatar user={user} className="h-20 w-20 font-headline-sm text-headline-sm" />
                <div>
                    <div className="flex items-center gap-space-sm">
                        <button
                            type="button"
                            disabled={avatarForm.processing}
                            onClick={() => avatarInput.current?.click()}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-outline-variant px-space-md font-label-md text-label-md text-on-surface transition-colors hover:border-secondary-container disabled:opacity-50"
                        >
                            {t('profile.avatar.change')}
                        </button>
                        {user.avatar_url && (
                            <button
                                type="button"
                                disabled={avatarForm.processing}
                                onClick={removeAvatar}
                                className="font-label-md text-label-md text-on-surface-variant underline hover:text-error disabled:opacity-50"
                            >
                                {t('profile.avatar.remove')}
                            </button>
                        )}
                    </div>
                    <input
                        ref={avatarInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={uploadAvatar}
                        className="hidden"
                    />
                    <InputError message={avatarForm.errors.avatar} className="mt-2" />
                </div>
            </div>

            <form onSubmit={submit} className="mt-space-lg flex flex-col gap-space-md">
                <div>
                    <label htmlFor="name" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('profile.fields.name_label')}
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">person</span>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            required
                            onChange={(e) => setData('name', e.target.value)}
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="email" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('profile.fields.email_label')}
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
                            className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/30"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="mt-space-sm">
                            <p className="text-body-sm text-on-surface-variant">
                                {t('profile.email_unverified_notice')}{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="font-label-md text-label-md text-secondary underline hover:text-on-surface"
                                >
                                    {t('profile.resend_email_verification')}
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-space-2xs font-label-sm text-label-sm font-medium text-secondary-fixed-dim">
                                    {t('profile.email_verification_sent')}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="phone_number" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                        {t('profile.fields.phone_label')}
                    </label>
                    <PhoneNumberInput
                        id="phone_number"
                        value={data.phone_number}
                        onChange={(value) => setData('phone_number', value)}
                        autoComplete="tel"
                        required
                        placeholder={t('profile.phone_placeholder')}
                        leadingIcon={<span className="material-symbols-outlined shrink-0 text-[20px] text-on-surface-variant">call</span>}
                        boxClassName="flex h-12 w-full items-center gap-space-xs rounded-lg border border-outline-variant/50 bg-surface pl-space-sm pr-space-sm text-on-surface transition-colors focus-within:border-secondary-container focus-within:ring-2 focus-within:ring-secondary-container/30"
                        selectClassName="shrink-0 border-outline-variant/40 bg-transparent pe-space-xs text-on-surface outline-none [border-inline-end-width:1px] [max-width:5.5rem]"
                        inputClassName="min-w-0 flex-1 border-0 bg-transparent text-on-surface outline-none placeholder:text-outline"
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
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
