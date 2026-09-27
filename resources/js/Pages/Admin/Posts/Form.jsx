import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Field, Section, TextField } from '@/Components/Admin/Field';
import ImageField from '@/Components/Admin/ImageField';
import { EditingLocaleProvider, LocaleSwitcher, LocalizedInput } from '@/Components/Admin/Localized';
import { fromDateTimeLocal, localizedOrEmpty, slugify, toDateTimeLocal } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

function initialData(post) {
    return {
        slug: post?.slug ?? '',
        category: localizedOrEmpty(post?.category),
        title: localizedOrEmpty(post?.title),
        excerpt: localizedOrEmpty(post?.excerpt),
        body: localizedOrEmpty(post?.body),
        cover_image: post?.cover_image ?? null,
        is_featured: post?.is_featured ?? false,
        published_at: toDateTimeLocal(post?.published_at),
    };
}

export default function PostForm({ post }) {
    const t = useTranslations();
    const isEditing = Boolean(post);
    const { data, setData, transform, post: submitPost, put, processing, errors } = useForm(initialData(post));

    transform((formData) => ({ ...formData, published_at: fromDateTimeLocal(formData.published_at) }));

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.posts.update', post.id), { preserveScroll: true });
        } else {
            submitPost(route('admin.posts.store'), { preserveScroll: true });
        }
    };

    const title = isEditing ? t('admin.posts.edit') : t('admin.posts.create');

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route('admin.posts.index')} className="font-label-md text-label-md text-secondary hover:text-on-surface">
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
                            label={t('admin.posts.fields.title')}
                            name="title"
                            value={data.title}
                            errors={errors}
                            onChange={(value) => {
                                setData((prev) => ({ ...prev, title: value, slug: isEditing || prev.slug !== slugify(prev.title.en) ? prev.slug : slugify(value.en) }));
                            }}
                        />
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.posts.fields.slug')}
                                name="slug"
                                value={data.slug}
                                onChange={(value) => setData('slug', value)}
                                error={errors.slug}
                                help={t('admin.common.slug_help')}
                                required
                            />
                            <LocalizedInput label={t('admin.posts.fields.category')} name="category" value={data.category} errors={errors} onChange={(value) => setData('category', value)} />
                        </div>
                        <LocalizedInput
                            label={t('admin.posts.fields.excerpt')}
                            name="excerpt"
                            value={data.excerpt}
                            errors={errors}
                            multiline
                            rows={2}
                            onChange={(value) => setData('excerpt', value)}
                        />
                        <LocalizedInput
                            label={t('admin.posts.fields.body')}
                            name="body"
                            value={data.body}
                            errors={errors}
                            multiline
                            rows={16}
                            help={t('admin.posts.fields.body_help')}
                            onChange={(value) => setData('body', value)}
                        />
                    </Section>

                    <Section>
                        <ImageField
                            label={t('admin.posts.fields.cover_image')}
                            value={data.cover_image}
                            previewUrl={post?.cover_image_url}
                            onChange={(value) => setData('cover_image', value)}
                            error={errors.cover_image}
                        />
                    </Section>

                    <Section>
                        <Field label={t('admin.posts.fields.published_at')} name="published_at" error={errors.published_at} help={t('admin.posts.fields.published_at_help')}>
                            <div className="mt-1 flex flex-wrap items-center gap-space-sm">
                                <input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    className="rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                                />
                                <button
                                    type="button"
                                    onClick={() => setData('published_at', toDateTimeLocal(new Date().toISOString()))}
                                    className="font-label-md text-label-md text-secondary hover:text-on-surface"
                                >
                                    {t('admin.posts.fields.publish_now')}
                                </button>
                                {data.published_at && (
                                    <button type="button" onClick={() => setData('published_at', '')} className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface">
                                        {t('admin.posts.fields.make_draft')}
                                    </button>
                                )}
                            </div>
                        </Field>
                        <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                            <Checkbox checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} />
                            {t('admin.posts.fields.is_featured')}
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
