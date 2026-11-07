import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Section, TextField } from '@/Components/Admin/Field';
import { EditingLocaleProvider, LocaleSwitcher, LocalizedInput, LocalizedRichText } from '@/Components/Admin/Localized';
import { localizedOrEmpty, slugify } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

function initialData(policy, nextSortOrder) {
    return {
        slug: policy?.slug ?? '',
        title: localizedOrEmpty(policy?.title),
        summary: localizedOrEmpty(policy?.summary),
        body: localizedOrEmpty(policy?.body),
        is_published: policy?.is_published ?? true,
        sort_order: policy?.sort_order ?? nextSortOrder ?? 0,
    };
}

export default function PolicyForm({ policy, nextSortOrder }) {
    const t = useTranslations();
    const isEditing = Boolean(policy);
    const { data, setData, post, put, processing, errors } = useForm(initialData(policy, nextSortOrder));

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.policies.update', policy.id), { preserveScroll: true });
        } else {
            post(route('admin.policies.store'), { preserveScroll: true });
        }
    };

    const title = isEditing ? t('admin.policies.edit') : t('admin.policies.create');

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route('admin.policies.index')} className="font-label-md text-label-md text-secondary hover:text-on-surface">
                    {t('admin.common.back')}
                </Link>
            }
        >
            <Head title={title} />

            <EditingLocaleProvider>
                <form onSubmit={submit} className="flex flex-col gap-space-lg">
                    <LocaleSwitcher errors={errors} />

                    <Section>
                        <LocalizedInput
                            label={t('admin.policies.fields.title')}
                            name="title"
                            value={data.title}
                            errors={errors}
                            onChange={(value) => {
                                setData((prev) => ({ ...prev, title: value, slug: isEditing || prev.slug !== slugify(prev.title.en) ? prev.slug : slugify(value.en) }));
                            }}
                        />
                        <TextField
                            label={t('admin.policies.fields.slug')}
                            name="slug"
                            value={data.slug}
                            onChange={(value) => setData('slug', value)}
                            error={errors.slug}
                            help={t('admin.policies.fields.slug_help')}
                            required
                        />
                        <LocalizedInput
                            label={t('admin.policies.fields.summary')}
                            name="summary"
                            value={data.summary}
                            errors={errors}
                            multiline
                            rows={2}
                            help={t('admin.policies.fields.summary_help')}
                            onChange={(value) => setData('summary', value)}
                        />
                        <LocalizedRichText
                            label={t('admin.policies.fields.body')}
                            name="body"
                            value={data.body}
                            errors={errors}
                            help={t('admin.policies.fields.body_help')}
                            onChange={(value) => setData('body', value)}
                        />
                    </Section>

                    <Section>
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.policies.fields.sort_order')}
                                name="sort_order"
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(value) => setData('sort_order', value)}
                                error={errors.sort_order}
                                help={t('admin.policies.fields.sort_order_help')}
                            />
                        </div>
                        <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                            <Checkbox checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                            {t('admin.policies.fields.is_published')}
                        </label>
                    </Section>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? t('admin.common.saving') : t('admin.common.save')}
                        </PrimaryButton>
                    </div>
                </form>
            </EditingLocaleProvider>
        </AdminLayout>
    );
}
