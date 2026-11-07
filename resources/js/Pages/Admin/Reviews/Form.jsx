import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Field, Section, TextField } from '@/Components/Admin/Field';
import { StarRatingInput } from '@/Components/StarRating';
import { useTranslations } from '@/lib/translations';

function initialData(review) {
    return {
        name: review?.name ?? '',
        email: review?.email ?? '',
        role: review?.role ?? '',
        rating: review?.rating ?? 5,
        review: review?.review ?? '',
        // Reviews an admin writes are trusted, so they go live unless unticked.
        is_published: review?.is_published ?? true,
    };
}

export default function ReviewForm({ review }) {
    const t = useTranslations();
    const { locale } = usePage().props;
    const isEditing = Boolean(review);
    const { data, setData, post, put, processing, errors } = useForm(initialData(review));

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.reviews.update', review.id), { preserveScroll: true });
        } else {
            post(route('admin.reviews.store'), { preserveScroll: true });
        }
    };

    const title = isEditing ? t('admin.reviews.edit') : t('admin.reviews.create');

    return (
        <AdminLayout
            title={title}
            actions={
                <Link href={route('admin.reviews.index')} className="font-label-md text-label-md text-secondary hover:text-on-surface">
                    {t('admin.common.back')}
                </Link>
            }
        >
            <Head title={title} />

            <form onSubmit={submit} className="flex flex-col gap-space-lg">
                <Section>
                    {isEditing && (
                        <p className="font-body-sm text-body-sm text-outline">
                            {t('admin.reviews.submitted_at').replace(':date', new Date(review.created_at).toLocaleString(locale))}
                        </p>
                    )}
                    <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                        <TextField label={t('admin.reviews.fields.name')} name="name" value={data.name} onChange={(value) => setData('name', value)} error={errors.name} required />
                        <TextField
                            label={t('admin.reviews.fields.email')}
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(value) => setData('email', value)}
                            error={errors.email}
                            help={t('admin.reviews.fields.email_help')}
                            required
                        />
                    </div>
                    <TextField label={t('admin.reviews.fields.role')} name="role" value={data.role} onChange={(value) => setData('role', value)} error={errors.role} />
                    <Field label={t('admin.reviews.fields.rating')} name="rating" error={errors.rating} required>
                        <div className="mt-1">
                            <StarRatingInput value={data.rating} onChange={(rating) => setData('rating', rating)} starLabel={(count) => `${count}/5`} size="text-2xl" />
                        </div>
                    </Field>
                    <Field label={t('admin.reviews.fields.review')} name="review" error={errors.review} help={`${data.review.length} / 500`} required>
                        <textarea
                            id="review"
                            rows={6}
                            maxLength={500}
                            value={data.review}
                            onChange={(e) => setData('review', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-outline-variant/50 bg-surface text-on-surface font-body-md focus:border-secondary-container focus:ring-secondary-container"
                        />
                    </Field>
                </Section>

                <Section>
                    <label className="inline-flex items-center gap-space-xs font-body-md text-on-surface">
                        <Checkbox checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                        {t('admin.reviews.fields.is_published')}
                    </label>
                </Section>

                <div className="flex justify-end">
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? t('admin.common.saving') : t('admin.common.save')}
                    </PrimaryButton>
                </div>
            </form>
        </AdminLayout>
    );
}
