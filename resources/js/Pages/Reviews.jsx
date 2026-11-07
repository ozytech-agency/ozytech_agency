import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import Seo from '@/Components/Seo';
import { StarRatingInput } from '@/Components/StarRating';
import { useTranslations } from '@/lib/translations';

const REVIEW_MAX_LENGTH = 500;

const INITIAL_REVIEW_FORM = {
    name: '',
    email: '',
    role: '',
    rating: 0,
    review: '',
};

export default function Reviews() {
    const t = useTranslations();
    const { auth } = usePage().props;
    const user = auth?.user ?? null;
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm(INITIAL_REVIEW_FORM);
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef(null);

    const field = (name) => ({
        value: data[name],
        onChange: (e) => setData(name, e.target.value),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('reviews.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    const writeAnother = () => {
        clearErrors();
        setSubmitted(false);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const aside = t('reviews.aside.points');

    return (
        <SiteLayout>
            <Seo title={t('reviews.title')} description={t('reviews.meta_description')} noindex />

            <section className="relative w-full overflow-hidden py-space-4xl text-on-primary isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2200&q=80"
                        alt=""
                        aria-hidden="true"
                        fetchpriority="high"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgb(9 14 25 / .92) 0%, rgb(9 14 25 / .8) 55%, rgb(9 14 25 / .6) 100%), linear-gradient(180deg, rgb(9 14 25 / .3), rgb(9 14 25 / .55))',
                    }}
                ></div>
                <div className="absolute right-[-10%] top-[-30%] h-[480px] w-[480px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="relative mx-[6%]">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('reviews.hero.eyebrow')}</span>
                    <h1 className="mt-space-sm max-w-2xl font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1.1] text-white/[92%]">{t('reviews.hero.title')}</h1>
                    <p className="mt-space-md max-w-xl font-body-lg text-body-lg text-white/80">{t('reviews.hero.subtitle')}</p>
                </div>
            </section>

            <Reveal as="section" className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%] grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
                    <div className="lg:col-span-7">
                        <div ref={formRef} className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm">
                            <h2 className="mb-space-lg font-headline-md text-headline-md text-on-surface">{t('reviews.form.heading')}</h2>

                            {submitted ? (
                                <div className="flex flex-col items-start gap-space-sm rounded-xl border border-surface-container bg-surface-container-low p-space-lg">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container/15 text-secondary-container">
                                        <span className="material-symbols-outlined icon-fill text-2xl">check_circle</span>
                                    </span>
                                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{t('reviews.form.success.title')}</h3>
                                    <p className="font-body-md text-body-md text-on-surface-variant">{t('reviews.form.success.message')}</p>
                                    <button type="button" onClick={writeAnother} className="inline-flex items-center gap-space-2xs font-label-md text-label-md text-secondary transition-transform hover:translate-x-0.5">
                                        {t('reviews.form.success.again')} <span className="material-symbols-outlined text-base">refresh</span>
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col gap-space-md">
                                    <div>
                                        <span id="rating-label" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                            {t('reviews.form.rating_label')} <span className="text-secondary-container">*</span>
                                        </span>
                                        <StarRatingInput
                                            value={data.rating}
                                            onChange={(rating) => setData('rating', rating)}
                                            labelledBy="rating-label"
                                            starLabel={(count) => t('reviews.form.rating_star').replace(':count', count)}
                                        />
                                        {errors.rating && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.rating}</p>}
                                    </div>

                                    {user ? (
                                        <p className="rounded-lg bg-surface-container-low px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant">
                                            {t('reviews.form.account_note').replace(':name', user.name)}
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                                    {t('reviews.form.name_label')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="name" className="field" required autoComplete="name" placeholder={t('reviews.form.name_placeholder')} {...field('name')} />
                                                {errors.name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                                    {t('reviews.form.email_label')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="email" type="email" className="field" required autoComplete="email" placeholder={t('reviews.form.email_placeholder')} {...field('email')} />
                                                {errors.email && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.email}</p>}
                                            </div>
                                            <p className="-mt-2 font-body-sm text-body-sm text-outline sm:col-span-2">{t('reviews.form.email_note')}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="role" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                            {t('reviews.form.role_label')} <span className="font-normal text-outline">{t('reviews.form.optional')}</span>
                                        </label>
                                        <input id="role" className="field" autoComplete="organization-title" placeholder={t('reviews.form.role_placeholder')} {...field('role')} />
                                        {errors.role && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.role}</p>}
                                    </div>

                                    <div>
                                        <div className="mb-space-2xs flex items-baseline justify-between">
                                            <label htmlFor="review" className="font-label-md text-label-md text-on-surface">
                                                {t('reviews.form.review_label')} <span className="text-secondary-container">*</span>
                                            </label>
                                            <span className="font-body-sm text-body-sm text-outline">
                                                {data.review.length} / {REVIEW_MAX_LENGTH}
                                            </span>
                                        </div>
                                        <textarea
                                            id="review"
                                            required
                                            maxLength={REVIEW_MAX_LENGTH}
                                            className="field min-h-[9rem]"
                                            placeholder={t('reviews.form.review_placeholder')}
                                            {...field('review')}
                                        />
                                        {errors.review && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.review}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center gap-space-xs self-start rounded-lg bg-accent2 px-space-xl py-space-md font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                    >
                                        {t('reviews.form.submit')} <span className="material-symbols-outlined text-base">send</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg shadow-sm">
                            <h2 className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('reviews.aside.heading')}</h2>
                            <ul className="flex flex-col gap-space-md">
                                {aside.map((point) => (
                                    <li key={point.icon} className="flex items-start gap-space-sm">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-secondary-container">
                                            <span className="material-symbols-outlined text-lg">{point.icon}</span>
                                        </span>
                                        <p className="pt-2 font-body-md text-body-md text-on-surface-variant">{point.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </Reveal>
        </SiteLayout>
    );
}
