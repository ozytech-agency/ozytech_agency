import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Field, RowControls, Section, TextField } from '@/Components/Admin/Field';
import { FORMATION_STATES } from '@/Components/StateSwitcher';
import { EditingLocaleProvider, LocaleSwitcher, LocalizedInput } from '@/Components/Admin/Localized';
import { emptyLocalized, localizedOrEmpty, moveItem } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

function initialData(pkg, positionCount, isWebsite) {
    return {
        key: pkg?.key ?? '',
        label: localizedOrEmpty(pkg?.label),
        title: localizedOrEmpty(pkg?.title),
        best_for: localizedOrEmpty(pkg?.best_for),
        description: localizedOrEmpty(pkg?.description),
        cta: localizedOrEmpty(pkg?.cta),
        badge: localizedOrEmpty(pkg?.badge),
        icon: pkg?.icon ?? '',
        price_amount: pkg?.price_amount ?? '',
        old_price_amount: pkg?.old_price_amount ?? '',
        formation_states: isWebsite ? [] : (pkg?.formation_states ?? FORMATION_STATES.map((state) => state.key)),
        price_period: localizedOrEmpty(pkg?.price_period),
        is_featured: pkg?.is_featured ?? false,
        is_published: pkg?.is_published ?? true,
        sort_order: pkg?.sort_order ?? positionCount ?? 1,
        features: (pkg?.features ?? []).map((feature) => ({ text: localizedOrEmpty(feature.text), note: localizedOrEmpty(feature.note) })),
    };
}

export default function PackageForm({ package: pkg, positionCount = 1, category, routeBase }) {
    const t = useTranslations();
    const isEditing = Boolean(pkg);
    const isWebsite = category === 'website';
    const copy = isWebsite ? 'admin.website_packages' : 'admin.packages';
    const { data, setData, post, put, processing, errors } = useForm(initialData(pkg, positionCount, isWebsite));
    const rowLabels = { up: t('admin.common.move_up'), down: t('admin.common.move_down'), remove: t('admin.common.remove') };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route(`${routeBase}.update`, pkg.id), { preserveScroll: true });
        } else {
            post(route(`${routeBase}.store`), { preserveScroll: true });
        }
    };

    const updateFeature = (index, changes) => setData('features', data.features.map((feature, i) => (i === index ? { ...feature, ...changes } : feature)));

    const title = isEditing ? t(`${copy}.edit`) : t(`${copy}.create`);

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route(`${routeBase}.index`)} className="font-label-md text-label-md text-secondary hover:text-on-surface">
                    {t('admin.common.back')}
                </Link>
            }
        >
            <Head title={title} />

            <EditingLocaleProvider>
                <form onSubmit={submit} className="flex flex-col gap-space-lg">
                    <LocaleSwitcher errors={errors} />

                    <Section>
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <LocalizedInput label={t('admin.packages.fields.title')} name="title" value={data.title} errors={errors} onChange={(value) => setData('title', value)} />
                            <LocalizedInput label={t('admin.packages.fields.label')} name="label" value={data.label} errors={errors} onChange={(value) => setData('label', value)} />
                        </div>
                        <TextField
                            label={t('admin.packages.fields.key')}
                            name="key"
                            value={data.key}
                            onChange={(value) => setData('key', value)}
                            error={errors.key}
                            help={t('admin.packages.fields.key_help')}
                            disabled={pkg?.has_inquiries}
                            required
                        />
                        <LocalizedInput label={t('admin.packages.fields.best_for')} name="best_for" value={data.best_for} errors={errors} onChange={(value) => setData('best_for', value)} />
                        <LocalizedInput
                            label={t('admin.packages.fields.description')}
                            name="description"
                            value={data.description}
                            errors={errors}
                            multiline
                            rows={3}
                            onChange={(value) => setData('description', value)}
                        />
                    </Section>

                    <Section>
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.packages.fields.price_amount')}
                                name="price_amount"
                                value={data.price_amount}
                                onChange={(value) => setData('price_amount', value)}
                                error={errors.price_amount}
                                placeholder="$4,900"
                                required
                            />
                            <TextField
                                label={t('admin.packages.fields.old_price_amount')}
                                name="old_price_amount"
                                value={data.old_price_amount}
                                onChange={(value) => setData('old_price_amount', value)}
                                error={errors.old_price_amount}
                                placeholder="$5,900"
                                help={t('admin.packages.fields.old_price_amount_help')}
                            />
                            <LocalizedInput label={t('admin.packages.fields.price_period')} name="price_period" value={data.price_period} errors={errors} onChange={(value) => setData('price_period', value)} />
                            <LocalizedInput label={t('admin.packages.fields.cta')} name="cta" value={data.cta} errors={errors} onChange={(value) => setData('cta', value)} />
                            <LocalizedInput label={t('admin.packages.fields.badge')} name="badge" value={data.badge} errors={errors} required={false} onChange={(value) => setData('badge', value)} />
                        </div>
                    </Section>

                    <Section
                        title={t('admin.packages.fields.features')}
                        actions={
                            <button
                                type="button"
                                onClick={() => setData('features', [...data.features, { text: emptyLocalized(), note: emptyLocalized() }])}
                                className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-on-surface"
                            >
                                <span className="material-symbols-outlined text-lg">add</span> {t('admin.common.add')}
                            </button>
                        }
                    >
                        {data.features.length === 0 && <p className="text-body-sm text-outline">{t('admin.common.empty')}</p>}
                        {data.features.map((feature, index) => (
                            <div key={index} className="flex flex-col gap-space-sm rounded-lg border border-surface-container p-space-md sm:flex-row sm:items-start">
                                <div className="grid flex-1 grid-cols-1 gap-space-sm sm:grid-cols-2">
                                    <LocalizedInput
                                        label={t('admin.packages.fields.feature_text')}
                                        name={`features.${index}.text`}
                                        value={feature.text}
                                        errors={errors}
                                        onChange={(value) => updateFeature(index, { text: value })}
                                    />
                                    <LocalizedInput
                                        label={t('admin.packages.fields.feature_note')}
                                        name={`features.${index}.note`}
                                        value={feature.note}
                                        errors={errors}
                                        required={false}
                                        multiline
                                        rows={2}
                                        onChange={(value) => updateFeature(index, { note: value })}
                                    />
                                </div>
                                <RowControls
                                    index={index}
                                    count={data.features.length}
                                    labels={rowLabels}
                                    onMove={(from, to) => setData('features', moveItem(data.features, from, to))}
                                    onRemove={(i) => setData('features', data.features.filter((_, n) => n !== i))}
                                />
                            </div>
                        ))}
                    </Section>

                    <Section>
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.packages.fields.icon')}
                                name="icon"
                                value={data.icon}
                                onChange={(value) => setData('icon', value)}
                                error={errors.icon}
                                placeholder="fa-solid fa-rocket"
                            />
                            <Field label={t('admin.packages.fields.sort_order')} name="sort_order" error={errors.sort_order} help={t('admin.packages.fields.sort_order_help')} required>
                                <select id="sort_order" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} className="mt-1 w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container">
                                    {Array.from({ length: positionCount }, (_, index) => index + 1).map((position) => (
                                        <option key={position} value={position}>
                                            {t('admin.packages.position_option').replace(':position', position).replace(':count', positionCount)}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                        {!isWebsite && (
                            <Field label={t('admin.packages.fields.formation_states')} name="formation_states" error={errors.formation_states} help={t('admin.packages.fields.formation_states_help')} required>
                                <div className="flex flex-wrap gap-space-md">
                                    {FORMATION_STATES.map((state) => (
                                        <label key={state.key} className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                                            <Checkbox
                                                checked={data.formation_states.includes(state.key)}
                                                onChange={(e) =>
                                                    setData(
                                                        'formation_states',
                                                        e.target.checked
                                                            ? FORMATION_STATES.map((s) => s.key).filter((key) => key === state.key || data.formation_states.includes(key))
                                                            : data.formation_states.filter((key) => key !== state.key),
                                                    )
                                                }
                                            />
                                            {t(state.labelKey)}
                                        </label>
                                    ))}
                                </div>
                            </Field>
                        )}
                        <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                            <Checkbox checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} />
                            {t(isWebsite ? 'admin.website_packages.is_featured' : 'admin.packages.fields.is_featured')}
                        </label>
                        <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                            <Checkbox checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                            {t('admin.packages.fields.is_published')}
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
