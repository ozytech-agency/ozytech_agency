import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Field, RowControls, Section, TextField } from '@/Components/Admin/Field';
import ImageField, { UploadButton } from '@/Components/Admin/ImageField';
import { EditingLocaleProvider, LocaleSwitcher, LocalizedInput } from '@/Components/Admin/Localized';
import { localizedOrEmpty, moveItem, slugify } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

const STATUSES = ['published', 'draft'];

function initialData(project, nextDisplayOrder) {
    return {
        service_id: project?.service_id ?? '',
        slug: project?.slug ?? '',
        title: localizedOrEmpty(project?.title),
        short_description: localizedOrEmpty(project?.short_description),
        description: localizedOrEmpty(project?.description),
        client_name: project?.client_name ?? '',
        project_url: project?.project_url ?? '',
        featured_image: project?.featured_image ?? null,
        gallery: project?.gallery ?? [],
        status: project?.status ?? 'draft',
        display_order: project?.display_order ?? nextDisplayOrder,
    };
}

export default function ProjectForm({ project, services, nextDisplayOrder }) {
    const t = useTranslations();
    const isEditing = Boolean(project);
    const { data, setData, post, put, processing, errors } = useForm(initialData(project, nextDisplayOrder));

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.projects.update', project.id), { preserveScroll: true });
        } else {
            post(route('admin.projects.store'), { preserveScroll: true });
        }
    };

    const title = isEditing ? t('admin.projects.edit') : t('admin.projects.create');
    const rowLabels = { up: t('admin.common.move_up'), down: t('admin.common.move_down'), remove: t('admin.common.remove') };

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route('admin.projects.index')} className="font-label-md text-label-md text-secondary hover:text-on-surface">
                    {t('admin.common.back')}
                </Link>
            }
        >
            <Head title={title} />

            <EditingLocaleProvider>
                <form onSubmit={submit} className="flex flex-col gap-space-lg">
                    <LocaleSwitcher errors={errors} />

                    <Section>
                        <Field label={t('admin.projects.fields.service')} name="service_id" error={errors.service_id} required>
                            <select
                                id="service_id"
                                value={data.service_id}
                                onChange={(e) => setData('service_id', e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                            >
                                <option value="">{t('admin.projects.select_service')}</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.title}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <LocalizedInput
                            label={t('admin.projects.fields.title')}
                            name="title"
                            value={data.title}
                            errors={errors}
                            onChange={(value) => {
                                setData((prev) => ({ ...prev, title: value, slug: isEditing || prev.slug !== slugify(prev.title.en) ? prev.slug : slugify(value.en) }));
                            }}
                        />

                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.projects.fields.slug')}
                                name="slug"
                                value={data.slug}
                                onChange={(value) => setData('slug', value)}
                                error={errors.slug}
                                help={t('admin.common.slug_help')}
                                required
                            />
                            <TextField
                                label={t('admin.projects.fields.client_name')}
                                name="client_name"
                                value={data.client_name}
                                onChange={(value) => setData('client_name', value)}
                                error={errors.client_name}
                            />
                        </div>

                        <LocalizedInput
                            label={t('admin.projects.fields.short_description')}
                            name="short_description"
                            value={data.short_description}
                            errors={errors}
                            multiline
                            rows={2}
                            onChange={(value) => setData('short_description', value)}
                        />
                        <LocalizedInput
                            label={t('admin.projects.fields.description')}
                            name="description"
                            value={data.description}
                            errors={errors}
                            multiline
                            rows={14}
                            help={t('admin.projects.fields.description_help')}
                            onChange={(value) => setData('description', value)}
                        />
                    </Section>

                    <Section>
                        <ImageField
                            label={t('admin.projects.fields.featured_image')}
                            value={data.featured_image}
                            previewUrl={project?.featured_image_url}
                            onChange={(value) => setData('featured_image', value)}
                            error={errors.featured_image}
                        />
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3">
                            <TextField
                                label={t('admin.projects.fields.project_url')}
                                name="project_url"
                                value={data.project_url}
                                onChange={(value) => setData('project_url', value)}
                                error={errors.project_url}
                                help={t('admin.projects.fields.project_url_help')}
                            />
                            <Field label={t('admin.projects.fields.status')} name="status" error={errors.status}>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                                >
                                    {STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {t(`admin.common.${status}`)}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <Field label={t('admin.projects.fields.display_order')} name="display_order" error={errors.display_order} help={t('admin.projects.fields.display_order_help')}>
                                <input
                                    id="display_order"
                                    type="number"
                                    min="0"
                                    value={data.display_order}
                                    onChange={(e) => setData('display_order', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                                />
                            </Field>
                        </div>
                    </Section>

                    <Section title={t('admin.projects.fields.gallery')} actions={<UploadButton onUploaded={({ path }) => setData('gallery', [...data.gallery, path])} />}>
                        {data.gallery.length === 0 && <p className="text-body-sm text-outline">{t('admin.common.empty')}</p>}
                        <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3">
                            {data.gallery.map((image, index) => (
                                <div key={`${image}-${index}`} className="flex flex-col gap-1">
                                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-surface-container-high">
                                        <img src={/^https?:\/\//.test(image) ? image : route('media.content', image.split('/').pop())} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <RowControls
                                        index={index}
                                        count={data.gallery.length}
                                        labels={rowLabels}
                                        onMove={(from, to) => setData('gallery', moveItem(data.gallery, from, to))}
                                        onRemove={(i) => setData('gallery', data.gallery.filter((_, n) => n !== i))}
                                    />
                                </div>
                            ))}
                        </div>
                        {errors.gallery && <p className="font-body-sm text-body-sm text-error">{errors.gallery}</p>}
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
