import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Section, TextField } from '@/Components/Admin/Field';
import ImageField from '@/Components/Admin/ImageField';
import { EditingLocaleProvider, LocaleSwitcher, LocalizedInput } from '@/Components/Admin/Localized';
import { localizedOrEmpty } from '@/lib/admin';
import { useTranslations } from '@/lib/translations';

function initialData(teamMember, nextSortOrder) {
    return {
        name: teamMember?.name ?? '',
        role: localizedOrEmpty(teamMember?.role),
        focus: localizedOrEmpty(teamMember?.focus),
        photo: teamMember?.photo ?? null,
        x_url: teamMember?.x_url ?? '',
        instagram_url: teamMember?.instagram_url ?? '',
        linkedin_url: teamMember?.linkedin_url ?? '',
        website_url: teamMember?.website_url ?? '',
        sort_order: teamMember?.sort_order ?? nextSortOrder ?? 0,
        is_published: teamMember?.is_published ?? true,
    };
}

export default function TeamMemberForm({ teamMember, nextSortOrder }) {
    const t = useTranslations();
    const isEditing = Boolean(teamMember);
    const { data, setData, post, put, processing, errors } = useForm(initialData(teamMember, nextSortOrder));

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.team-members.update', teamMember.id), { preserveScroll: true });
        } else {
            post(route('admin.team-members.store'), { preserveScroll: true });
        }
    };

    const title = isEditing ? t('admin.team_members.edit') : t('admin.team_members.create');

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route('admin.team-members.index')} className="font-label-md text-label-md text-secondary hover:text-on-surface">
                    {t('admin.common.back')}
                </Link>
            }
        >
            <Head title={title} />

            <EditingLocaleProvider>
                <form onSubmit={submit} className="flex flex-col gap-space-lg">
                    <LocaleSwitcher errors={errors} />

                    <Section>
                        <TextField
                            label={t('admin.team_members.fields.name')}
                            name="name"
                            value={data.name}
                            onChange={(value) => setData('name', value)}
                            error={errors.name}
                            required
                        />
                        <LocalizedInput label={t('admin.team_members.fields.role')} name="role" value={data.role} errors={errors} onChange={(value) => setData('role', value)} />
                        <LocalizedInput
                            label={t('admin.team_members.fields.focus')}
                            name="focus"
                            value={data.focus}
                            errors={errors}
                            multiline
                            rows={3}
                            onChange={(value) => setData('focus', value)}
                        />
                    </Section>

                    <Section>
                        <ImageField
                            label={t('admin.team_members.fields.photo')}
                            value={data.photo}
                            previewUrl={teamMember?.photo_url}
                            onChange={(value) => setData('photo', value)}
                            error={errors.photo}
                        />
                    </Section>

                    <Section title={t('admin.team_members.fields.socials')}>
                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                            <TextField
                                label={t('admin.team_members.fields.x_url')}
                                name="x_url"
                                type="url"
                                value={data.x_url}
                                onChange={(value) => setData('x_url', value)}
                                error={errors.x_url}
                            />
                            <TextField
                                label={t('admin.team_members.fields.instagram_url')}
                                name="instagram_url"
                                type="url"
                                value={data.instagram_url}
                                onChange={(value) => setData('instagram_url', value)}
                                error={errors.instagram_url}
                            />
                            <TextField
                                label={t('admin.team_members.fields.linkedin_url')}
                                name="linkedin_url"
                                type="url"
                                value={data.linkedin_url}
                                onChange={(value) => setData('linkedin_url', value)}
                                error={errors.linkedin_url}
                            />
                            <TextField
                                label={t('admin.team_members.fields.website_url')}
                                name="website_url"
                                type="url"
                                value={data.website_url}
                                onChange={(value) => setData('website_url', value)}
                                error={errors.website_url}
                            />
                        </div>
                    </Section>

                    <Section>
                        <TextField
                            label={t('admin.team_members.fields.sort_order')}
                            name="sort_order"
                            type="number"
                            min="0"
                            value={data.sort_order}
                            onChange={(value) => setData('sort_order', value)}
                            error={errors.sort_order}
                        />
                        <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                            <Checkbox checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                            {t('admin.team_members.fields.is_published')}
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
