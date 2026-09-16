import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslations } from '@/lib/translations';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const t = useTranslations();

    return (
        <AuthenticatedLayout
            header={<h2 className="font-headline-sm text-headline-sm text-on-surface">{t('profile.header')}</h2>}
        >
            <Head title={t('profile.title')} />

            <div className="mx-auto max-w-3xl px-gutter-mobile py-space-2xl lg:px-gutter-desktop">
                <div className="flex flex-col gap-space-lg">
                    <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                    </div>

                    <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                        <UpdatePasswordForm />
                    </div>

                    <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
