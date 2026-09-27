import axios from 'axios';
import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import { useTranslations } from '@/lib/translations';

/**
 * Uploads an image to the admin upload endpoint and reports back the stored
 * path (what the form submits) and its public URL (for the preview). An
 * external image URL can be pasted instead.
 */
export function useImageUpload() {
    const t = useTranslations();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const upload = async (file) => {
        setUploading(true);
        setError(null);
        try {
            const body = new FormData();
            body.append('image', file);
            const { data } = await axios.post(route('admin.uploads.store'), body);
            return data;
        } catch (e) {
            setError(e.response?.data?.errors?.image?.[0] ?? t('admin.common.upload_failed'));
            return null;
        } finally {
            setUploading(false);
        }
    };

    return { upload, uploading, error };
}

export function UploadButton({ onUploaded, className = '' }) {
    const t = useTranslations();
    const inputRef = useRef(null);
    const { upload, uploading, error } = useImageUpload();

    const onChange = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        const result = await upload(file);
        if (result) onUploaded(result);
    };

    return (
        <div className={className}>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onChange} />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-space-xs rounded-lg border border-outline-variant/50 px-space-md py-space-xs font-label-md text-label-md text-on-surface hover:bg-surface-container-high disabled:opacity-50"
            >
                <span className="material-symbols-outlined text-lg">upload</span>
                {uploading ? t('admin.common.uploading') : t('admin.common.upload')}
            </button>
            <InputError className="mt-1" message={error} />
        </div>
    );
}

// A single image: preview + upload + paste URL.
export default function ImageField({ label, value, previewUrl, onChange, error }) {
    const t = useTranslations();
    const [preview, setPreview] = useState(previewUrl ?? value ?? null);
    const isExternal = typeof value === 'string' && /^https?:\/\//.test(value);

    return (
        <div>
            {label && <span className="block font-label-md text-label-md text-on-surface">{label}</span>}
            <div className="mt-1 flex flex-col gap-space-sm sm:flex-row sm:items-start">
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-surface-container-high sm:w-48">
                    {value && preview && <img src={preview} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="flex flex-1 flex-col gap-space-xs">
                    <UploadButton
                        onUploaded={({ path, url }) => {
                            onChange(path);
                            setPreview(url);
                        }}
                    />
                    <input
                        type="url"
                        value={isExternal ? value : ''}
                        placeholder={t('admin.common.or_paste_url')}
                        onChange={(e) => {
                            onChange(e.target.value || null);
                            setPreview(e.target.value || null);
                        }}
                        className="block w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-sm focus:border-secondary-container focus:ring-secondary-container"
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={() => {
                                onChange(null);
                                setPreview(null);
                            }}
                            className="self-start font-label-md text-label-md text-error hover:underline"
                        >
                            {t('admin.common.remove')}
                        </button>
                    )}
                    <InputError message={error} />
                </div>
            </div>
        </div>
    );
}
