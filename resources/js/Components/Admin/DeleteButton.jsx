import { router } from '@inertiajs/react';
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useTranslations } from '@/lib/translations';

export default function DeleteButton({ href, itemName }) {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const destroy = () => {
        router.delete(href, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
            },
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error"
                aria-label={`${t('admin.common.delete')} ${itemName ?? ''}`}
            >
                <span className="material-symbols-outlined text-lg">delete</span>
            </button>
            <Modal show={open} onClose={() => setOpen(false)} maxWidth="md">
                <div className="p-space-lg">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('admin.common.confirm_delete_title')}</h2>
                    {itemName && <p className="mt-space-xs font-label-md text-label-md text-on-surface">{itemName}</p>}
                    <p className="mt-space-xs text-body-sm text-on-surface-variant">{t('admin.common.confirm_delete_body')}</p>
                    <div className="mt-space-lg flex justify-end gap-space-sm">
                        <SecondaryButton onClick={() => setOpen(false)}>{t('admin.common.cancel')}</SecondaryButton>
                        <DangerButton onClick={destroy} disabled={processing}>
                            {t('admin.common.delete')}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
