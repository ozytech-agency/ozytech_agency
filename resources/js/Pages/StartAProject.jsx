import { Head, Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import PhoneNumberInput from '@/Components/PhoneNumberInput';
import { useTranslations } from '@/lib/translations';

const ROUTE_META = [
    { key: 'new-project', icon: 'rocket_launch', color: 'text-secondary-container' },
    { key: 'partnership', icon: 'handshake', color: 'text-secondary' },
    { key: 'support', icon: 'support_agent', color: 'text-accent2' },
    { key: 'careers', icon: 'badge', color: 'text-secondary-container' },
    { key: 'press', icon: 'newspaper', color: 'text-secondary' },
    { key: 'general', icon: 'chat_bubble', color: 'text-on-tertiary-container' },
];

const TOPIC_META = [
    { value: 'new-project', icon: 'rocket_launch' },
    { value: 'partnership', icon: 'handshake' },
    { value: 'support', icon: 'support_agent' },
    { value: 'careers', icon: 'badge' },
    { value: 'press', icon: 'newspaper' },
    { value: 'general', icon: 'chat_bubble' },
];

const SERVICE_OPTION_META = [
    { value: 'IT Solutions & Cloud', icon: 'dns' },
    { value: 'LLC & Incorporation', icon: 'domain_add' },
    { value: 'Payments', icon: 'credit_card' },
    { value: 'Shopify & Commerce', icon: 'shopping_cart' },
    { value: 'WordPress & Woo', icon: 'web' },
    { value: 'Full Stack Web', icon: 'code' },
    { value: 'Mobile Apps', icon: 'smartphone' },
    { value: 'SaaS Product', icon: 'cloud_sync' },
    { value: 'Agentic AI', icon: 'smart_toy' },
];

const OFFICE_META = [
    { city: 'Marrakech', hq: true, address: 'Rue de la Liberté, Guéliz', addressLine2: 'Marrakech 40000, Morocco', mapQuery: 'Gu%C3%A9liz+Marrakech' },
    { city: 'London', address: '1 Finsbury Avenue', addressLine2: 'London EC2M 2PF, United Kingdom', mapQuery: '1+Finsbury+Avenue+London' },
    { city: 'New York', address: '110 Wall Street, Floor 7', addressLine2: 'New York, NY 10005, USA', mapQuery: '110+Wall+Street+New+York' },
    { city: 'Berlin', address: 'Torstraße 177', addressLine2: '10115 Berlin, Germany', mapQuery: 'Torstra%C3%9Fe+177+Berlin' },
    { city: 'Dubai', address: 'One Central, DWTC', addressLine2: 'Dubai, United Arab Emirates', mapQuery: 'One+Central+DWTC+Dubai' },
    { city: 'Singapore', address: '68 Circular Road, #02-01', addressLine2: 'Singapore 049422', mapQuery: '68+Circular+Road+Singapore' },
];

const WHEN_MAP = {
    company: ['new-project', 'partnership', 'support', 'general'],
    companySize: ['new-project', 'partnership', 'support', 'general'],
    services: ['new-project', 'partnership'],
    budgetTimeline: ['new-project'],
};

const INITIAL_INQUIRY_FORM = {
    topic: 'new-project',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    role: '',
    company_size: '',
    services: [],
    budget: '',
    timeline: '',
    message: '',
    referral: '',
    nda_requested: false,
    consent: false,
};

export default function StartAProject() {
    const t = useTranslations();
    const { data, setData, post, processing, errors } = useForm({ ...INITIAL_INQUIRY_FORM });
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const formRef = useRef(null);

    const routingItems = t('start_a_project.routing.items');
    const topicLabels = t('start_a_project.form.topics');
    const companySizeOptions = t('start_a_project.form.company_size_options');
    const serviceOptionLabels = t('start_a_project.form.service_options');
    const budgetOptions = t('start_a_project.form.budget_options');
    const timelineOptions = t('start_a_project.form.timeline_options');
    const referralOptions = t('start_a_project.form.referral_options');
    const nextSteps = t('start_a_project.sidebar.next_steps.steps');
    const officeHours = t('start_a_project.offices.hours');
    const faqs = t('start_a_project.faq.items');

    const showFor = (key) => !WHEN_MAP[key] || WHEN_MAP[key].includes(data.topic);

    const toggleService = (value) => {
        setData('services', data.services.includes(value) ? data.services.filter((v) => v !== value) : [...data.services, value]);
    };

    const selectRoute = (key) => {
        setData('topic', key);
        document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => document.getElementById('firstName')?.focus(), 400);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('start-a-project.store'), {
            preserveScroll: true,
            onSuccess: () => setSubmitted(true),
        });
    };

    const resetForm = () => {
        setData({ ...INITIAL_INQUIRY_FORM });
        setSubmitted(false);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const field = (name) => ({
        value: data[name] ?? '',
        onChange: (e) => setData(name, e.target.value),
    });

    return (
        <SiteLayout>
            <Head title={t('start_a_project.title')} />

            <section className="relative w-full py-space-3xl lg:py-space-4xl overflow-hidden text-on-primary isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=2200&q=80"
                        alt=""
                        aria-hidden="true"
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
                <div className="absolute top-0 right-[-8%] w-[560px] h-[560px] bg-secondary-container/[12%] rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="mx-[6%] relative z-10">
                    <div className="max-w-3xl flex flex-col gap-space-md">
                        <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs bg-black/30 backdrop-blur-sm border border-white/10 rounded-full shadow-sm self-start">
                            <span className="w-2 h-2 rounded-full bg-accent2 animate-ping"></span>
                            <span className="font-label-sm text-label-sm text-white/[92%] tracking-widest uppercase">{t('start_a_project.hero.badge')}</span>
                        </div>
                        <h1 className="font-display-xl text-display-xl leading-[1.1] tracking-tight text-white/[92%]">{t('start_a_project.hero.title')}</h1>
                        <p className="font-body-lg text-body-lg text-white/80 max-w-2xl">{t('start_a_project.hero.subtitle')}</p>
                        <div className="flex flex-wrap gap-space-sm pt-space-xs">
                            <a href="#inquiry-form" className="inline-flex items-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-xl py-space-sm rounded-lg shadow-[0_12px_24px_-8px_rgba(233,87,71,0.45)] transition-all hover:-translate-y-0.5">
                                {t('start_a_project.hero.cta_primary')} <span className="material-symbols-outlined text-base">arrow_downward</span>
                            </a>
                            <a href="#schedule" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:shadow-md transition-all">
                                <span className="material-symbols-outlined text-base text-secondary">videocam</span> {t('start_a_project.hero.cta_secondary')}
                            </a>
                        </div>
                        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-space-md w-full pt-space-lg border-t border-white/15 mt-space-sm">
                            {t('start_a_project.hero.stats').map((stat) => (
                                <div key={stat.label} className="flex flex-col gap-space-2xs">
                                    <dt className="font-label-sm text-label-sm uppercase tracking-wider text-white/60">{stat.label}</dt>
                                    <dd className="font-headline-sm text-headline-sm font-bold text-white/[92%]">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <Reveal as="section" className="w-full py-space-3xl bg-surface-container-low" id="inquiries">
                <div className="mx-[6%]">
                    <div className="max-w-2xl flex flex-col gap-space-xs mb-space-2xl">
                        <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest font-bold">{t('start_a_project.routing.kicker')}</span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('start_a_project.routing.title')}</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">{t('start_a_project.routing.subtitle')}</p>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                        {routingItems.map((r, i) => (
                            <button
                                key={ROUTE_META[i].key}
                                type="button"
                                onClick={() => selectRoute(ROUTE_META[i].key)}
                                className="h-full text-left bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-surface-container group"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center ${ROUTE_META[i].color} mb-space-sm group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined text-2xl">{ROUTE_META[i].icon}</span>
                                </div>
                                <h3 className="font-headline-sm text-xl font-bold text-on-surface">{r.title}</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{r.desc}</p>
                                <span className="inline-flex items-center gap-space-2xs mt-space-sm font-label-md text-label-md text-secondary">
                                    {r.cta} <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </span>
                            </button>
                        ))}
                    </Reveal>
                </div>
            </Reveal>

            <Reveal as="section" className="w-full py-space-3xl lg:py-space-4xl bg-surface" id="inquiry-form">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
                        <div className="lg:col-span-7">
                            <div ref={formRef} className="bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container p-space-lg sm:p-space-xl">
                                <div className="flex flex-col gap-space-2xs mb-space-lg">
                                    <h2 className="font-headline-md text-headline-md text-on-surface">{t('start_a_project.form.title')}</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t('start_a_project.form.required_note')}</p>
                                </div>

                                {submitted ? (
                                    <div className="rounded-xl bg-surface-container-low border border-surface-container p-space-lg flex flex-col items-start gap-space-sm">
                                        <div className="w-12 h-12 rounded-full bg-secondary-container/15 flex items-center justify-center text-secondary-container">
                                            <span className="material-symbols-outlined text-2xl icon-fill">check_circle</span>
                                        </div>
                                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{t('start_a_project.form.success.title')}</h3>
                                        <p className="font-body-md text-body-md text-on-surface-variant">
                                            {t('start_a_project.form.success.message_prefix')} <span className="font-semibold text-on-surface">{data.email}</span>. {t('start_a_project.form.success.message_suffix')}{' '}
                                            <a href="tel:+14155550142" dir="ltr" className="text-secondary font-semibold">+1 (415) 555-0142</a>.
                                        </p>
                                        <button type="button" onClick={resetForm} className="inline-flex items-center gap-space-2xs font-label-md text-label-md text-secondary hover:translate-x-0.5 transition-transform">
                                            {t('start_a_project.form.success.reset_cta')} <span className="material-symbols-outlined text-base">refresh</span>
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="flex flex-col gap-space-lg">
                                        <fieldset className="flex flex-col gap-space-xs">
                                            <legend className="font-label-md text-label-md text-on-surface mb-space-2xs">
                                                {t('start_a_project.form.topic_legend')} <span className="text-secondary-container">*</span>
                                            </legend>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-2xs p-space-2xs bg-surface-container-low rounded-xl">
                                                {TOPIC_META.map((tp, i) => (
                                                    <label key={tp.value} className="seg">
                                                        <input type="radio" name="topic" checked={data.topic === tp.value} onChange={() => setData('topic', tp.value)} />
                                                        <span>
                                                            <span className="material-symbols-outlined text-sm">{tp.icon}</span>
                                                            {topicLabels[i]}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.topic && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.topic}</p>}
                                        </fieldset>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                            <div>
                                                <label htmlFor="firstName" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.first_name')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="firstName" className="field" placeholder={t('start_a_project.form.first_name_placeholder')} {...field('first_name')} />
                                                {errors.first_name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.first_name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.last_name')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="lastName" className="field" placeholder={t('start_a_project.form.last_name_placeholder')} {...field('last_name')} />
                                                {errors.last_name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.last_name}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                            <div>
                                                <label htmlFor="email" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.email')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="email" type="email" className="field" placeholder="amina@company.com" {...field('email')} />
                                                {errors.email && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.email}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.phone')} <span className="text-outline font-normal">{t('start_a_project.form.phone_optional')}</span>
                                                </label>
                                                <PhoneNumberInput
                                                    id="phone"
                                                    value={data.phone}
                                                    onChange={(value) => setData('phone', value)}
                                                    placeholder="6 12 34 56 78"
                                                    boxClassName="field flex items-center gap-space-xs"
                                                    selectClassName="shrink-0 overflow-hidden text-ellipsis whitespace-nowrap border-outline-variant/40 bg-transparent p-0 pe-space-xs text-on-surface outline-none [border-inline-end-width:1px] [max-width:9.5rem]"
                                                    inputClassName="min-w-0 flex-1 border-0 bg-transparent p-0 text-on-surface outline-none placeholder:text-outline"
                                                />
                                                {errors.phone && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        {showFor('company') && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.company')}</label>
                                                    <input className="field" placeholder="Acme Inc." {...field('company')} />
                                                    {errors.company && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.company}</p>}
                                                </div>
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.website')}</label>
                                                    <input type="url" className="field" placeholder="https://acme.com" {...field('website')} />
                                                    {errors.website && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.website}</p>}
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                            <div>
                                                <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.role')}</label>
                                                <input className="field" placeholder={t('start_a_project.form.role_placeholder')} {...field('role')} />
                                                {errors.role && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.role}</p>}
                                            </div>
                                            {showFor('companySize') && (
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.company_size')}</label>
                                                    <select className="field" {...field('company_size')}>
                                                        <option value="">{t('start_a_project.form.select_placeholder')}</option>
                                                        {companySizeOptions.map((opt) => (
                                                            <option key={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                    {errors.company_size && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.company_size}</p>}
                                                </div>
                                            )}
                                        </div>

                                        {showFor('services') && (
                                            <fieldset className="flex flex-col gap-space-xs">
                                                <legend className="font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.services_legend')}</legend>
                                                <div className="flex flex-wrap gap-space-2xs">
                                                    {SERVICE_OPTION_META.map((s, i) => (
                                                        <label key={s.value} className="chip">
                                                            <input type="checkbox" checked={data.services.includes(s.value)} onChange={() => toggleService(s.value)} />
                                                            <span>
                                                                <span className="material-symbols-outlined text-sm">{s.icon}</span>
                                                                {serviceOptionLabels[i]}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.services && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.services}</p>}
                                            </fieldset>
                                        )}

                                        {showFor('budgetTimeline') && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.budget')}</label>
                                                    <select className="field" {...field('budget')}>
                                                        <option value="">{t('start_a_project.form.select_placeholder')}</option>
                                                        {budgetOptions.map((opt) => (
                                                            <option key={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                    {errors.budget && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.budget}</p>}
                                                </div>
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.timeline')}</label>
                                                    <select className="field" {...field('timeline')}>
                                                        <option value="">{t('start_a_project.form.select_placeholder')}</option>
                                                        {timelineOptions.map((opt) => (
                                                            <option key={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                    {errors.timeline && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.timeline}</p>}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="flex items-baseline justify-between mb-space-2xs">
                                                <label htmlFor="message" className="font-label-md text-label-md text-on-surface">
                                                    {t('start_a_project.form.message')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <span className="font-body-sm text-body-sm text-outline">{data.message.length} / 1500</span>
                                            </div>
                                            <textarea
                                                id="message"
                                                maxLength={1500}
                                                className="field min-h-[9.5rem]"
                                                placeholder={t('start_a_project.form.message_placeholder')}
                                                {...field('message')}
                                            />
                                            {errors.message && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.referral')}</label>
                                            <select className="field" {...field('referral')}>
                                                <option value="">{t('start_a_project.form.select_placeholder')}</option>
                                                {referralOptions.map((opt) => (
                                                    <option key={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            {errors.referral && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.referral}</p>}
                                        </div>

                                        <div className="flex flex-col gap-space-xs pt-space-2xs">
                                            <label className="flex items-start gap-space-xs cursor-pointer">
                                                <input type="checkbox" checked={data.nda_requested} onChange={(e) => setData('nda_requested', e.target.checked)} className="mt-1 w-4 h-4 accent-secondary-container shrink-0" />
                                                <span className="font-body-sm text-body-sm text-on-surface-variant">{t('start_a_project.form.nda_consent')}</span>
                                            </label>
                                            <label className="flex items-start gap-space-xs cursor-pointer">
                                                <input type="checkbox" checked={data.consent} onChange={(e) => setData('consent', e.target.checked)} className="mt-1 w-4 h-4 accent-secondary-container shrink-0" />
                                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                                    {t('start_a_project.form.consent')} <a href="#" className="text-secondary font-semibold underline">{t('start_a_project.form.privacy_policy_link')}</a>.{' '}
                                                    <span className="text-secondary-container">*</span>
                                                </span>
                                            </label>
                                            {errors.consent && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.consent}</p>}
                                        </div>

                                        {Object.keys(errors).length > 0 && (
                                            <p role="alert" className="font-body-sm text-body-sm text-error bg-error-container/50 rounded-lg px-space-md py-space-xs">
                                                {t('start_a_project.form.validation.generic')}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center justify-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-2xl py-space-md rounded-lg shadow-[0_12px_24px_-8px_rgba(233,87,71,0.45)] transition-all hover:-translate-y-0.5 self-start disabled:opacity-60"
                                        >
                                            {t('start_a_project.form.submit')} <span className="material-symbols-outlined text-base">send</span>
                                        </button>
                                        <p className="font-body-sm text-body-sm text-outline">
                                            {t('start_a_project.form.privacy_note_prefix')} <strong className="text-on-surface-variant">{t('start_a_project.form.privacy_note_suffix')}</strong>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>

                        <aside className="lg:col-span-5 flex flex-col gap-space-lg">
                            <div id="schedule" className="bg-primary-container text-on-primary rounded-xl p-space-lg shadow-xl">
                                <div className="w-12 h-12 rounded-xl bg-primary/60 flex items-center justify-center text-secondary-container mb-space-sm">
                                    <span className="material-symbols-outlined text-2xl">calendar_month</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary">{t('start_a_project.sidebar.schedule.title')}</h3>
                                <p className="font-body-sm text-body-sm text-outline-variant mt-space-2xs">{t('start_a_project.sidebar.schedule.desc')}</p>
                                <a
                                    href="#inquiry-form"
                                    className="inline-flex items-center justify-center gap-space-xs w-full mt-space-md bg-secondary-container text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg hover:bg-secondary transition-colors"
                                >
                                    {t('start_a_project.sidebar.schedule.cta')} <span className="material-symbols-outlined text-base">arrow_outward</span>
                                </a>
                                <p className="font-body-sm text-body-sm text-outline-variant mt-space-xs">{t('start_a_project.sidebar.schedule.slots_note')}</p>
                            </div>

                            <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-space-lg flex flex-col gap-space-md">
                                <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold">{t('start_a_project.sidebar.channels.title')}</h3>
                                {[
                                    ['alternate_email', 'newprojects@ozytech.agency', t('start_a_project.sidebar.channels.new_business')],
                                    ['support_agent', 'support@ozytech.agency', t('start_a_project.sidebar.channels.support')],
                                    ['work', 'careers@ozytech.agency', t('start_a_project.sidebar.channels.careers')],
                                    ['newspaper', 'press@ozytech.agency', t('start_a_project.sidebar.channels.press')],
                                ].map(([icon, mail, desc]) => (
                                    <a key={mail} href={`mailto:${mail}`} className="flex items-start gap-space-sm group">
                                        <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-container shrink-0">
                                            <span className="material-symbols-outlined text-lg">{icon}</span>
                                        </span>
                                        <span>
                                            <span className="block font-label-md text-label-md text-on-surface group-hover:text-secondary transition-colors">{mail}</span>
                                            <span className="block font-body-sm text-body-sm text-outline">{desc}</span>
                                        </span>
                                    </a>
                                ))}
                                <div className="flex items-start gap-space-sm">
                                    <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-container shrink-0">
                                        <span className="material-symbols-outlined text-lg">call</span>
                                    </span>
                                    <span>
                                        <a href="tel:+14155550142" dir="ltr" className="block font-label-md text-label-md text-on-surface hover:text-secondary transition-colors">+1 (415) 555-0142</a>
                                        <a href="tel:+442079460958" dir="ltr" className="block font-label-md text-label-md text-on-surface hover:text-secondary transition-colors">+44 20 7946 0958</a>
                                        <span className="block font-body-sm text-body-sm text-outline">{t('start_a_project.sidebar.channels.hours')}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-surface-container-low rounded-xl p-space-lg">
                                <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold mb-space-md">{t('start_a_project.sidebar.next_steps.title')}</h3>
                                <ol className="flex flex-col gap-space-md">
                                    {nextSteps.map((step, i) => (
                                        <li key={step.title} className="flex gap-space-sm">
                                            <span className="w-7 h-7 rounded-full bg-secondary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0">{i + 1}</span>
                                            <span>
                                                <span className="block font-label-md text-label-md text-on-surface font-bold">{step.title}</span>
                                                <span className="block font-body-sm text-body-sm text-on-surface-variant">{step.desc}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </aside>
                    </div>
                </div>
            </Reveal>

            <Reveal as="section" id="offices" className="w-full py-space-3xl lg:py-space-4xl bg-surface-container-low">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center mb-space-2xl">
                        <div className="lg:col-span-5 flex flex-col gap-space-xs">
                            <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest font-bold">{t('start_a_project.offices.kicker')}</span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('start_a_project.offices.title')}</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">{t('start_a_project.offices.subtitle')}</p>
                        </div>
                        <div className="lg:col-span-7 flex items-center justify-center rounded-xl bg-surface-container-lowest border border-surface-container p-space-xl">
                            <span className="material-symbols-outlined text-6xl text-secondary-container/40">public</span>
                        </div>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                        {OFFICE_META.map((office) => (
                            <div key={office.city} className="h-full bg-surface-container-lowest rounded-xl border border-surface-container shadow-sm p-space-lg flex flex-col gap-space-2xs">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-headline-sm text-lg font-bold text-on-surface">{office.city}</h3>
                                    {office.hq && (
                                        <span className="font-label-sm text-label-sm px-space-xs py-1 rounded bg-secondary-container text-on-primary font-semibold">{t('start_a_project.offices.hq_badge')}</span>
                                    )}
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    {office.address}
                                    <br />
                                    {office.addressLine2}
                                </p>
                                <p className="font-body-sm text-body-sm text-outline mt-space-2xs">{officeHours[office.city]}</p>
                                <a
                                    href={`https://maps.google.com/?q=${office.mapQuery}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-space-2xs mt-space-xs font-label-md text-label-md text-secondary hover:translate-x-0.5 transition-transform"
                                >
                                    {t('start_a_project.offices.directions_cta')} <span className="material-symbols-outlined text-base">north_east</span>
                                </a>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </Reveal>

            <Reveal as="section" id="faq" className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl">
                        <div className="lg:col-span-4 flex flex-col gap-space-sm">
                            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{t('start_a_project.faq.kicker')}</span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('start_a_project.faq.title')}</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">{t('start_a_project.faq.subtitle')}</p>
                            <a href="#inquiry-form" className="inline-flex items-center gap-space-xs text-secondary font-label-md text-label-md hover:translate-x-1 transition-transform pt-space-2xs">
                                {t('start_a_project.faq.go_to_form')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </a>
                        </div>
                        <div className="lg:col-span-8 flex flex-col gap-space-xs">
                            {faqs.map((faq, i) => (
                                <details
                                    key={faq.q}
                                    className="faq group bg-surface-container-low rounded-xl px-space-lg py-space-md"
                                    open={openFaq === i}
                                    onToggle={(e) => setOpenFaq(e.target.open ? i : null)}
                                >
                                    <summary className="flex items-center justify-between gap-space-md font-label-md text-label-md text-on-surface font-bold">
                                        <span>{faq.q}</span>
                                        <span className="faq-icon material-symbols-outlined text-secondary-container shrink-0">add</span>
                                    </summary>
                                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>

            <Reveal
                as="section"
                className="relative w-full py-space-3xl lg:py-space-4xl overflow-hidden text-on-secondary-fixed"
                style={{ background: 'linear-gradient(to right, rgb(var(--c-secondary-container)), rgb(var(--c-secondary-fixed-dim)), rgb(var(--c-secondary)))' }}
            >
                <div className="mx-[6%] relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-space-2xs px-space-md py-1 bg-surface-container-lowest/30 backdrop-blur-md rounded-full mb-space-sm">
                        <span className="material-symbols-outlined text-sm text-accent2">bolt</span>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-fixed font-bold">{t('start_a_project.cta.badge')}</span>
                    </div>
                    <h2 className="font-display-xl text-display-xl-mobile sm:text-display-xl text-on-secondary-fixed font-bold max-w-3xl leading-tight">{t('start_a_project.cta.title')}</h2>
                    <p className="font-body-lg text-body-lg text-on-secondary-fixed/90 max-w-2xl mt-space-sm mb-space-xl">{t('start_a_project.cta.subtitle')}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-space-md">
                        <a
                            href="#inquiry-form"
                            className="inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary font-label-md text-label-md px-space-2xl py-space-md rounded-lg shadow-xl hover:bg-primary transition-all hover:-translate-y-0.5"
                        >
                            {t('start_a_project.cta.primary')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </a>
                        <Link
                            href={route('packages')}
                            className="inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest/90 text-on-surface font-label-md text-label-md px-space-xl py-space-md rounded-lg shadow-md hover:bg-surface-container-lowest transition-all"
                        >
                            {t('start_a_project.cta.secondary')}
                        </Link>
                    </div>
                </div>
            </Reveal>
        </SiteLayout>
    );
}
