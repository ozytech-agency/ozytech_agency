import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function DeleteUserForm() {
    const t = useTranslations();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section>
            <header>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('profile.sections.delete.heading')}</h2>
                <p className="mt-space-2xs text-body-sm text-on-surface-variant">{t('profile.sections.delete.desc')}</p>
            </header>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="mt-space-lg inline-flex h-12 items-center justify-center gap-space-xs rounded-lg border border-error px-space-lg font-label-md text-label-md text-error transition-colors hover:bg-error-container/40"
            >
                {t('profile.sections.delete.trigger')}
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-space-lg">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('profile.sections.delete.modal_heading')}</h2>

                    <p className="mt-space-2xs text-body-sm text-on-surface-variant">{t('profile.sections.delete.modal_desc')}</p>

                    <div className="mt-space-lg">
                        <label htmlFor="delete_password" className="sr-only">
                            {t('profile.sections.delete.password_label')}
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">lock</span>
                            <input
                                id="delete_password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoFocus
                                placeholder={t('profile.sections.delete.password_label')}
                                className="h-12 w-full rounded-lg border border-outline-variant/50 bg-surface pl-11 pr-space-sm text-on-surface outline-none transition-colors focus:border-error focus:ring-2 focus:ring-error/20"
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-space-lg flex justify-end gap-space-sm">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-outline-variant px-space-lg font-label-md text-label-md text-on-surface-variant transition-colors hover:border-secondary-container hover:text-on-surface"
                        >
                            {t('profile.sections.delete.cancel')}
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-error px-space-lg font-label-md text-label-md text-on-error transition-colors hover:opacity-90 disabled:opacity-50"
                        >
                            {t('profile.sections.delete.confirm')}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
