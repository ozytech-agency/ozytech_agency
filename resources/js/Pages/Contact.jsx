import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function Contact() {
    const t = useTranslations();
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const field = (name) => ({
        value: data[name],
        onChange: (e) => setData(name, e.target.value),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    return (
        <SiteLayout>
            <Seo title={t('contact.title')} description={t('contact.meta_description')} breadcrumbs={[{ name: 'Contact', path: '/contact' }]} />

            <section className="relative w-full overflow-hidden py-space-4xl text-on-primary isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2200&q=80"
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
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('contact.hero.eyebrow')}</span>
                    <h1 className="mt-space-sm max-w-2xl font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1.1] text-white/[92%]">{t('contact.hero.title')}</h1>
                    <p className="mt-space-md max-w-xl font-body-lg text-body-lg text-white/80">{t('contact.hero.subtitle')}</p>
                </div>
            </section>

            <Reveal as="section" className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%] grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
                    <aside className="lg:col-span-5 flex flex-col gap-space-lg">
                        <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg shadow-sm">
                            <h2 className="mb-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('contact.details.heading')}</h2>
                            <dl className="flex flex-col gap-space-md">
                                <div className="flex items-start gap-space-sm">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-secondary-container">
                                        <span className="material-symbols-outlined text-lg">mail</span>
                                    </span>
                                    <div>
                                        <dt className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('contact.details.email_label')}</dt>
                                        <dd>
                                            <a href="mailto:contact@ozytechagency.com" className="font-label-md text-label-md text-on-surface hover:text-secondary transition-colors">
                                                contact@ozytechagency.com
                                            </a>
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-secondary-container">
                                        <span className="material-symbols-outlined text-lg">call</span>
                                    </span>
                                    <div>
                                        <dt className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('contact.details.phone_label')}</dt>
                                        <dd>
                                            <a href="https://wa.me/212654092321" dir="ltr" className="font-label-md text-label-md text-on-surface hover:text-secondary transition-colors">
                                                +212 654-092321
                                            </a>
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-secondary-container">
                                        <span className="material-symbols-outlined text-lg">location_on</span>
                                    </span>
                                    <div>
                                        <dt className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('contact.details.address_label')}</dt>
                                        <dd className="font-label-md text-label-md text-on-surface">Marrakech 40000, Morocco</dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-secondary-container">
                                        <span className="material-symbols-outlined text-lg">schedule</span>
                                    </span>
                                    <div>
                                        <dt className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('contact.details.hours_label')}</dt>
                                        <dd className="font-label-md text-label-md text-on-surface">{t('contact.details.hours_value')}</dd>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </aside>

                    <div className="lg:col-span-7">
                        <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm">
                            <h2 className="mb-space-lg font-headline-md text-headline-md text-on-surface">{t('contact.form.heading')}</h2>

                            {submitted ? (
                                <div className="flex items-start gap-space-sm rounded-xl border border-surface-container bg-surface-container-low p-space-lg">
                                    <span className="material-symbols-outlined icon-fill text-2xl text-secondary-container">check_circle</span>
                                    <p className="font-body-md text-body-md text-on-surface-variant">{t('contact.form.success')}</p>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col gap-space-md">
                                    <div>
                                        <label htmlFor="name" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                            {t('contact.form.name_label')}
                                        </label>
                                        <input id="name" className="field" placeholder={t('contact.form.name_placeholder')} {...field('name')} />
                                        {errors.name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                            {t('contact.form.email_label')}
                                        </label>
                                        <input id="email" type="email" className="field" placeholder={t('contact.form.email_placeholder')} {...field('email')} />
                                        {errors.email && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="mb-space-2xs block font-label-md text-label-md text-on-surface">
                                            {t('contact.form.message_label')}
                                        </label>
                                        <textarea id="message" className="field min-h-[9rem]" placeholder={t('contact.form.message_placeholder')} {...field('message')} />
                                        {errors.message && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center gap-space-xs self-start rounded-lg bg-accent2 px-space-xl py-space-md font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                    >
                                        {t('contact.form.submit')} <span className="material-symbols-outlined text-base">send</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Reveal>
        </SiteLayout>
    );
}
