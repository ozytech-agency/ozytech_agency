import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Field, RowControls, Section, TextField } from '@/Components/Admin/Field';
import { UploadButton } from '@/Components/Admin/ImageField';
import { EditingLocaleProvider, LocaleSwitcher, LocalizedInput } from '@/Components/Admin/Localized';
import { emptyLocalized, localizedOrEmpty, moveItem, slugify } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

const ITEM_TYPES = ['offer', 'build'];

function initialData(service, nextSortOrder) {
    const items = (list) => (list ?? []).map((item) => ({ label: localizedOrEmpty(item.label), icon: item.icon ?? '' }));

    return {
        slug: service?.slug ?? '',
        title: localizedOrEmpty(service?.title),
        lead: localizedOrEmpty(service?.lead),
        meta_description: localizedOrEmpty(service?.meta_description),
        body: localizedOrEmpty(service?.body),
        nav_description: localizedOrEmpty(service?.nav_description),
        nav_icon: service?.nav_icon ?? '',
        nav_groups: service?.nav_groups ?? [],
        gallery: service?.gallery ?? [],
        sort_order: service?.sort_order ?? nextSortOrder ?? 0,
        is_published: service?.is_published ?? true,
        offer: items(service?.offer),
        build: items(service?.build),
    };
}

export default function ServiceForm({ service, navGroups, nextSortOrder }) {
    const t = useTranslations();
    const isEditing = Boolean(service);
    const { data, setData, post, put, processing, errors } = useForm(initialData(service, nextSortOrder));
    const rowLabels = { up: t('admin.common.move_up'), down: t('admin.common.move_down'), remove: t('admin.common.remove') };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.services.update', service.id), { preserveScroll: true });
        } else {
            post(route('admin.services.store'), { preserveScroll: true });
        }
    };

    const updateItem = (type, index, changes) => setData(type, data[type].map((item, i) => (i === index ? { ...item, ...changes } : item)));

    const toggleNavGroup = (group) =>
        setData('nav_groups', data.nav_groups.includes(group) ? data.nav_groups.filter((g) => g !== group) : [...data.nav_groups, group]);

    const title = isEditing ? t('admin.services.edit') : t('admin.services.create');

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route('admin.services.index')} className="font-label-md text-label-md text-secondary hover:text-on-surface">
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
                            label={t('admin.services.fields.title')}
                            name="title"
                            value={data.title}
                            errors={errors}
                            onChange={(value) => {
                                setData((prev) => ({ ...prev, title: value, slug: isEditing || prev.slug !== slugify(prev.title.en) ? prev.slug : slugify(value.en) }));
                            }}
                        />
                        <TextField
                            label={t('admin.services.fields.slug')}
                            name="slug"
                            value={data.slug}
                            onChange={(value) => setData('slug', value)}
                            error={errors.slug}
                            help={t('admin.common.slug_help')}
                            required
                        />
                        <LocalizedInput label={t('admin.services.fields.lead')} name="lead" value={data.lead} errors={errors} onChange={(value) => setData('lead', value)} />
                        <LocalizedInput
                            label={t('admin.services.fields.meta_description')}
                            name="meta_description"
                            value={data.meta_description}
                            errors={errors}
                            required={false}
                            help={t('admin.services.fields.meta_description_help')}
                            onChange={(value) => setData('meta_description', value)}
                        />
                        <LocalizedInput label={t('admin.services.fields.body')} name="body" value={data.body} errors={errors} multiline rows={5} onChange={(value) => setData('body', value)} />
                    </Section>

                    {ITEM_TYPES.map((type) => (
                        <Section
                            key={type}
                            title={t(`admin.services.fields.${type}`)}
                            actions={
                                <button
                                    type="button"
                                    onClick={() => setData(type, [...data[type], { label: emptyLocalized(), icon: '' }])}
                                    className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-on-surface"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span> {t('admin.common.add')}
                                </button>
                            }
                        >
                            {data[type].length === 0 && <p className="text-body-sm text-outline">{t('admin.common.empty')}</p>}
                            {data[type].map((item, index) => (
                                <div key={index} className="flex flex-col gap-space-sm rounded-lg border border-surface-container p-space-md sm:flex-row sm:items-start">
                                    <div className="grid flex-1 grid-cols-1 gap-space-sm sm:grid-cols-3">
                                        <div className="sm:col-span-2">
                                            <LocalizedInput
                                                label={t('admin.services.fields.item_label')}
                                                name={`${type}.${index}.label`}
                                                value={item.label}
                                                errors={errors}
                                                onChange={(value) => updateItem(type, index, { label: value })}
                                            />
                                        </div>
                                        <Field label={t('admin.services.fields.item_icon')} name={`${type}-${index}-icon`} error={errors[`${type}.${index}.icon`]}>
                                            <div className="mt-1 flex items-center gap-space-xs">
                                                <span className="material-symbols-outlined text-secondary">{item.icon || 'check_circle'}</span>
                                                <input
                                                    id={`${type}-${index}-icon`}
                                                    type="text"
                                                    value={item.icon}
                                                    placeholder="check_circle"
                                                    onChange={(e) => updateItem(type, index, { icon: e.target.value })}
                                                    className="block w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                                                />
                                            </div>
                                        </Field>
                                    </div>
                                    <RowControls
                                        index={index}
                                        count={data[type].length}
                                        labels={rowLabels}
                                        onMove={(from, to) => setData(type, moveItem(data[type], from, to))}
                                        onRemove={(i) => setData(type, data[type].filter((_, n) => n !== i))}
                                    />
                                </div>
                            ))}
                        </Section>
                    ))}

                    <Section title={t('admin.services.fields.gallery')} actions={<UploadButton onUploaded={({ path }) => setData('gallery', [...data.gallery, path])} />}>
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

                    <Section>
                        <Field label={t('admin.services.fields.nav_groups')} name="nav_groups" error={errors.nav_groups}>
                            <div className="mt-1 flex flex-wrap gap-space-md">
                                {navGroups.map((group) => (
                                    <label key={group} className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                                        <Checkbox checked={data.nav_groups.includes(group)} onChange={() => toggleNavGroup(group)} />
                                        {t(`admin.services.nav_groups.${group}`)}
                                    </label>
                                ))}
                            </div>
                        </Field>
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.services.fields.nav_icon')}
                                name="nav_icon"
                                value={data.nav_icon}
                                onChange={(value) => setData('nav_icon', value)}
                                error={errors.nav_icon}
                                placeholder="fa-solid fa-code"
                            />
                            <TextField
                                label={t('admin.services.fields.sort_order')}
                                name="sort_order"
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(value) => setData('sort_order', value)}
                                error={errors.sort_order}
                            />
                        </div>
                        <LocalizedInput
                            label={t('admin.services.fields.nav_description')}
                            name="nav_description"
                            value={data.nav_description}
                            errors={errors}
                            required={false}
                            onChange={(value) => setData('nav_description', value)}
                        />
                        <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                            <Checkbox checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                            {t('admin.services.fields.is_published')}
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
