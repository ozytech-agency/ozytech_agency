import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import PhoneNumberInput from '@/Components/PhoneNumberInput';
import { useTranslations } from '@/lib/translations';
import { PACKAGE_KEYS } from '@/lib/packages';

const ROUTE_META = [
    { key: 'new-project', icon: 'rocket_launch', color: 'text-secondary-container' },
    { key: 'partnership', icon: 'handshake', color: 'text-secondary' },
    { key: 'support', icon: 'support_agent', color: 'text-accent2' },
    { key: 'careers', icon: 'badge', color: 'text-secondary-container' },
    { key: 'press', icon: 'newspaper', color: 'text-secondary' },
    { key: 'general', icon: 'chat_bubble', color: 'text-on-tertiary-container' },
];

const WHEN_MAP = {
    company: ['new-project', 'partnership', 'support', 'general'],
    workArea: ['new-project', 'partnership', 'support', 'general'],
    packages: ['new-project', 'partnership'],
};

const INITIAL_INQUIRY_FORM = {
    topic: 'new-project',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    domain_name: '',
    role: '',
    work_area: '',
    package: '',
    message: '',
    referral: '',
    nda_requested: false,
    consent: false,
};

const LOCKED_FIELD_CLASS = 'field cursor-not-allowed opacity-70';

// Identity fields are locked to the registered account (the server enforces this too).
function inquiryFormFor(user) {
    const [firstName, ...rest] = (user.name ?? '').trim().split(/\s+/);

    return {
        ...INITIAL_INQUIRY_FORM,
        first_name: firstName ?? '',
        last_name: rest.join(' '),
        email: user.email ?? '',
        phone: user.phone_number ?? '',
    };
}

// The Packages page links here with ?package=<key> to pre-select a card.
function packageFromQuery() {
    if (typeof window === 'undefined') return '';
    const key = new URLSearchParams(window.location.search).get('package');

    return PACKAGE_KEYS.includes(key) ? key : '';
}

export default function StartAProject() {
    const t = useTranslations();
    const user = usePage().props.auth.user;
    const preselectedPackage = useRef(packageFromQuery()).current;
    const { data, setData, post, processing, errors } = useForm({ ...inquiryFormFor(user), package: preselectedPackage });
    const [openPackage, setOpenPackage] = useState(preselectedPackage || null);
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef(null);

    const routingItems = t('start_a_project.routing.items');
    const workAreaOptions = t('start_a_project.form.work_area_options');
    const packages = t('packages.cards');
    const referralOptions = t('start_a_project.form.referral_options');
    const nextSteps = t('start_a_project.sidebar.next_steps.steps');

    const showFor = (key) => !WHEN_MAP[key] || WHEN_MAP[key].includes(data.topic);

    const selectRoute = (key) => {
        setData('topic', key);
        document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => document.getElementById('message')?.focus(), 400);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('start-a-project.store'), {
            preserveScroll: true,
            onSuccess: () => setSubmitted(true),
        });
    };

    const resetForm = () => {
        setData(inquiryFormFor(user));
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
                                            <a href="tel:+212654092321" dir="ltr" className="text-secondary font-semibold">+212 654-092321</a>.
                                        </p>
                                        <button type="button" onClick={resetForm} className="inline-flex items-center gap-space-2xs font-label-md text-label-md text-secondary hover:translate-x-0.5 transition-transform">
                                            {t('start_a_project.form.success.reset_cta')} <span className="material-symbols-outlined text-base">refresh</span>
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="flex flex-col gap-space-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                            <div>
                                                <label htmlFor="firstName" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.first_name')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="firstName" className={LOCKED_FIELD_CLASS} disabled {...field('first_name')} />
                                                {errors.first_name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.first_name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.last_name')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="lastName" className={LOCKED_FIELD_CLASS} disabled {...field('last_name')} />
                                                {errors.last_name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.last_name}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                            <div>
                                                <label htmlFor="email" className="block font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.email')} <span className="text-secondary-container">*</span>
                                                </label>
                                                <input id="email" type="email" className={LOCKED_FIELD_CLASS} disabled {...field('email')} />
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
                                                    disabled
                                                    boxClassName={`${LOCKED_FIELD_CLASS} flex items-center gap-space-xs`}
                                                    selectClassName="shrink-0 overflow-hidden text-ellipsis whitespace-nowrap border-outline-variant/40 bg-transparent p-0 pe-space-xs text-on-surface outline-none [border-inline-end-width:1px] [max-width:9.5rem]"
                                                    inputClassName="min-w-0 flex-1 border-0 bg-transparent p-0 text-on-surface outline-none placeholder:text-outline"
                                                />
                                                {errors.phone && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.phone}</p>}
                                            </div>
                                        </div>
                                        <p className="-mt-2 font-body-sm text-body-sm text-outline">
                                            {t('start_a_project.form.account_note')}{' '}
                                            <Link href={route('profile.edit')} className="text-secondary font-semibold underline">
                                                {t('start_a_project.form.account_note_link')}
                                            </Link>
                                        </p>

                                        {showFor('company') && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.company')}</label>
                                                    <input className="field" placeholder="Acme Inc." {...field('company')} />
                                                    {errors.company && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.company}</p>}
                                                </div>
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.domain_name')}</label>
                                                    <input className="field" placeholder="acme.com" autoCapitalize="none" {...field('domain_name')} />
                                                    {errors.domain_name && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.domain_name}</p>}
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                            <div>
                                                <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.role')} <span className="text-outline font-normal">{t('start_a_project.form.optional')}</span></label>
                                                <input className="field" placeholder={t('start_a_project.form.role_placeholder')} {...field('role')} />
                                                {errors.role && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.role}</p>}
                                            </div>
                                            {showFor('workArea') && (
                                                <div>
                                                    <label className="block font-label-md text-label-md text-on-surface mb-space-2xs">{t('start_a_project.form.work_area')} <span className="text-outline font-normal">{t('start_a_project.form.optional')}</span></label>
                                                    <select className="field" {...field('work_area')}>
                                                        <option value="">{t('start_a_project.form.select_placeholder')}</option>
                                                        {workAreaOptions.map((opt) => (
                                                            <option key={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                    {errors.work_area && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.work_area}</p>}
                                                </div>
                                            )}
                                        </div>

                                        {showFor('packages') && (
                                            <fieldset className="flex flex-col gap-space-xs">
                                                <legend className="font-label-md text-label-md text-on-surface mb-space-2xs">
                                                    {t('start_a_project.form.package_legend')} <span className="text-outline font-normal">{t('start_a_project.form.optional')}</span>
                                                </legend>
                                                <div className="grid grid-cols-1 gap-space-xs sm:grid-cols-3">
                                                    {packages.map((pkg, i) => {
                                                        const key = PACKAGE_KEYS[i];
                                                        const selected = data.package === key;
                                                        const open = openPackage === key;
                                                        return (
                                                            <div
                                                                key={key}
                                                                className={`flex flex-col overflow-hidden rounded-xl border transition-colors ${
                                                                    selected ? 'border-accent2 bg-accent2/5 ring-2 ring-accent2/20' : 'border-outline-variant/40 bg-surface-container-low'
                                                                }`}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    aria-pressed={selected}
                                                                    onClick={() => setData('package', selected ? '' : key)}
                                                                    className="flex flex-1 flex-col gap-space-xs p-space-md text-start"
                                                                >
                                                                    <span className="flex items-center justify-between gap-space-xs">
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-accent2' : 'border-outline-variant'}`}
                                                                        >
                                                                            {selected && <span className="h-2.5 w-2.5 rounded-full bg-accent2"></span>}
                                                                        </span>
                                                                        {pkg.badge && (
                                                                            <span className="rounded-full bg-accent2 px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-primary">{pkg.badge}</span>
                                                                        )}
                                                                    </span>
                                                                    <span className="font-label-md text-label-md font-bold text-on-surface">{pkg.title}</span>
                                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">{pkg.best_for}</span>
                                                                    <span className="mt-auto pt-space-2xs">
                                                                        <span className="block font-headline-sm text-xl font-bold leading-tight text-accent2">{pkg.price.amount}</span>
                                                                        <span className="block font-label-sm text-[10px] uppercase tracking-wider text-outline">{pkg.price.period}</span>
                                                                    </span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    aria-expanded={open}
                                                                    aria-controls={`package-features-${key}`}
                                                                    aria-label={`${t('start_a_project.form.package_features')}: ${pkg.title}`}
                                                                    onClick={() => setOpenPackage((prev) => (prev === key ? null : key))}
                                                                    className="flex h-9 items-center justify-center border-t border-outline-variant/30 text-on-surface-variant transition-colors hover:text-accent2"
                                                                >
                                                                    <span className={`material-symbols-outlined transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {packages.map((pkg, i) => {
                                                    const key = PACKAGE_KEYS[i];
                                                    if (openPackage !== key) return null;
                                                    return (
                                                        <div key={key} id={`package-features-${key}`} className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-md">
                                                            <p className="font-label-md text-label-md font-bold text-on-surface">{pkg.title}</p>
                                                            <p className="mb-space-xs font-body-sm text-body-sm text-on-surface-variant">{pkg.description}</p>
                                                            <ul className="grid grid-cols-1 gap-space-xs sm:grid-cols-2">
                                                                {pkg.features.map((feature) => {
                                                                    const text = typeof feature === 'string' ? feature : feature.text;
                                                                    const note = typeof feature === 'string' ? null : feature.note;
                                                                    return (
                                                                        <li key={text} className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                                                                            <span className="material-symbols-outlined icon-fill mt-0.5 text-[16px] text-secondary-container">check_circle</span>
                                                                            <span>
                                                                                {text}
                                                                                {note && <span className="block text-outline">{note}</span>}
                                                                            </span>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    );
                                                })}
                                                {errors.package && <p className="mt-space-2xs font-body-sm text-body-sm text-error">{errors.package}</p>}
                                            </fieldset>
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
                                <a href="mailto:contact@ozytechagency.com" className="flex items-start gap-space-sm group">
                                    <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-container shrink-0">
                                        <span className="material-symbols-outlined text-lg">alternate_email</span>
                                    </span>
                                    <span>
                                        <span className="block font-label-md text-label-md text-on-surface group-hover:text-secondary transition-colors">contact@ozytechagency.com</span>
                                        <span className="block font-body-sm text-body-sm text-outline">{t('start_a_project.sidebar.channels.email')}</span>
                                    </span>
                                </a>
                                <a href="tel:+212654092321" className="flex items-start gap-space-sm group">
                                    <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-container shrink-0">
                                        <span className="material-symbols-outlined text-lg">call</span>
                                    </span>
                                    <span>
                                        <span dir="ltr" className="block font-label-md text-label-md text-on-surface group-hover:text-secondary transition-colors">+212 654-092321</span>
                                        <span className="block font-body-sm text-body-sm text-outline">{t('start_a_project.sidebar.channels.hours')}</span>
                                    </span>
                                </a>
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

            <Reveal as="section" id="faq" className="relative w-full py-space-3xl lg:py-space-4xl overflow-hidden isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=2200&q=80"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgb(9 14 25 / .92), rgb(9 14 25 / .88))' }}
                ></div>
                <div className="mx-[6%] relative z-10 flex flex-col items-center gap-space-md text-center">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{t('start_a_project.faq.kicker')}</span>
                    <h2 className="font-headline-lg text-headline-lg text-white/[92%]">{t('start_a_project.faq.title')}</h2>
                    <p className="font-body-md text-body-md text-white/80 max-w-xl">{t('start_a_project.faq.subtitle')}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-space-md pt-space-xs">
                        <Link
                            href={route('faq')}
                            className="inline-flex items-center justify-center gap-space-xs rounded-lg bg-secondary-container px-space-xl py-space-md font-label-md text-label-md text-on-secondary-container transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            {t('start_a_project.faq.browse_all')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center gap-space-xs text-secondary font-label-md text-label-md hover:translate-x-1 transition-transform"
                        >
                            {t('start_a_project.faq.contact_us')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </Reveal>
        </SiteLayout>
    );
}
