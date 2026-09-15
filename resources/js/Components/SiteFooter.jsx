import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function SiteFooter() {
    const t = useTranslations();
    const { auth } = usePage().props;
    const user = auth?.user;
    const [email, setEmail] = useState('');
    const [note, setNote] = useState(null);

    const submitNewsletter = (e) => {
        e.preventDefault();
        const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
        setNote(ok ? { ok: true, text: t('footer.newsletter.success') } : { ok: false, text: t('footer.newsletter.invalid') });
        if (ok) setEmail('');
    };

    const serviceLinks = t('footer.services');

    return (
        <footer className="w-full bg-primary-container text-on-surface-variant pt-space-4xl pb-space-2xl">
            <div className="mx-[6%]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-3xl">
                    <div className="lg:col-span-3 flex flex-col gap-space-md">
                        <div className="w-fit">
                            <Link href={route('home')}>
                                <img src="/images/logo.png" alt="OzyTech" className="h-7 w-auto brightness-0 invert" />
                            </Link>
                        </div>
                        <p className="font-body-sm text-body-sm text-outline-variant max-w-sm">{t('footer.about')}</p>
                        <div className="flex items-center gap-space-xs pt-space-xs">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/ozytech-agency"
                                aria-label="OzyTech on GitHub"
                                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-outline-variant hover:text-on-primary hover:bg-secondary-container transition-colors"
                            >
                                <img src="/images/patterns/github.svg" alt="" aria-hidden="true" className="w-4 h-4 scale-[1.21]" />
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.instagram.com/ozyteckagency/"
                                aria-label="OzyTech on Instagram"
                                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-outline-variant hover:text-on-primary hover:bg-secondary-container transition-colors"
                            >
                                <i className="fa-brands fa-instagram scale-[1.21]" aria-hidden="true"></i>
                            </a>
                            <a href="#" aria-label="OzyTech on Facebook" className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-outline-variant hover:text-on-primary hover:bg-secondary-container transition-colors">
                                <i className="fa-brands fa-facebook scale-[1.21]" aria-hidden="true"></i>
                            </a>
                            <a href="#" aria-label="OzyTech on TikTok" className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-outline-variant hover:text-on-primary hover:bg-secondary-container transition-colors">
                                <i className="fa-brands fa-tiktok scale-[1.21]" aria-hidden="true"></i>
                            </a>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.youtube.com/channel/UC7W51ZBkPRZkXjA3cxhD-wQ"
                                aria-label="OzyTech on YouTube"
                                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-outline-variant hover:text-on-primary hover:bg-secondary-container transition-colors"
                            >
                                <i className="fa-brands fa-youtube scale-[1.21]" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-space-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-variant font-bold">{t('footer.services_heading')}</span>
                        <div className="flex flex-col gap-space-xs">
                            {serviceLinks.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={route('services.show', service.slug)}
                                    className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors"
                                >
                                    {service.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-space-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-variant font-bold">{t('footer.company_heading')}</span>
                        <div className="flex flex-col gap-space-xs">
                            <Link href={route('about')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.company.about')}
                            </Link>
                            <Link href={route('packages')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('nav.packages')}
                            </Link>
                            <Link href={route('start-a-project')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('home.hero.cta_start')}
                            </Link>
                        </div>
                        <Link href={route('blog')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                            {t('nav.blogs')}
                        </Link>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-space-md">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-variant font-bold">{t('footer.support_heading')}</span>
                        <div className="flex flex-col gap-space-xs">
                            <Link href={route('faq')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.support.faqs')}
                            </Link>
                            <Link href={route('contact')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.support.client_support')}
                            </Link>
                            <Link href={route('policies.show', 'privacy-policy')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.support.privacy_policy')}
                            </Link>
                            <Link href={route('policies.show', 'terms-of-service')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.support.terms_of_service')}
                            </Link>
                            <Link href={route('policies.show', 'refunds-policy')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.support.refunds_policy')}
                            </Link>
                            <Link href={route(user ? 'dashboard' : 'login')} className="font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                {t('footer.support.my_account')}
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-space-md">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-variant font-bold">{t('footer.contact_heading')}</span>
                        <div className="flex flex-col gap-space-sm">
                            <a href="mailto:contact@ozytechagency.com" className="contact-detail group flex items-center gap-space-sm font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                <i className="fa-solid fa-envelope text-lg transition-transform group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true"></i>
                                <span>contact@ozytechagency.com</span>
                            </a>
                            <a href="https://wa.me/212654092321" className="contact-detail group flex items-center gap-space-sm font-body-sm text-body-sm text-outline-variant hover:text-on-primary transition-colors">
                                <i className="fa-brands fa-whatsapp text-lg transition-transform group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true"></i>
                                <span dir="ltr">+212 654-092321</span>
                            </a>
                            <span className="contact-detail group flex items-center gap-space-sm font-body-sm text-body-sm text-outline-variant">
                                <i className="fa-solid fa-location-dot text-lg transition-transform group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true"></i>
                                <span>Marrakech 40000, Morocco</span>
                            </span>
                        </div>
                        <form className="flex flex-col gap-space-xs mt-space-md" onSubmit={submitNewsletter}>
                            <label htmlFor="newsletterEmail" className="font-label-sm text-label-sm text-surface-variant">
                                {t('footer.newsletter.label')}
                            </label>
                            <div className="flex w-full max-w-md flex-col gap-space-xs sm:flex-row sm:items-center">
                                <input
                                    id="newsletterEmail"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('footer.newsletter.placeholder')}
                                    aria-label="Email address for newsletter subscription"
                                    className="h-11 min-w-0 flex-1 rounded-lg border border-outline-variant/50 bg-primary px-space-sm font-body-sm text-body-sm text-on-primary shadow-sm transition-colors placeholder:text-outline focus:border-secondary-container focus:outline-none focus:ring-2 focus:ring-secondary-container/30"
                                />
                                <button
                                    type="submit"
                                    aria-label="Subscribe to the newsletter"
                                    className="inline-flex h-11 shrink-0 items-center justify-center gap-space-2xs rounded-lg bg-accent2 px-space-md font-label-sm text-label-sm text-on-primary shadow-[0_8px_18px_-8px_rgba(233,87,71,0.8)] transition-all hover:-translate-y-0.5 hover:bg-secondary-container focus:outline-none focus:ring-2 focus:ring-secondary-container/50"
                                >
                                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                    <span>{t('footer.newsletter.cta')}</span>
                                </button>
                            </div>
                            <p className={`font-body-sm text-body-sm min-h-[1.25rem] ${note ? (note.ok ? 'text-secondary-fixed-dim' : 'text-error-container') : ''}`} aria-live="polite">
                                {note?.text}
                            </p>
                        </form>
                    </div>
                </div>
                <div className="pt-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
                    <p className="font-body-sm text-body-sm text-outline">{t('footer.copyright').replace(':year', new Date().getFullYear())}</p>
                    <p className="font-body-sm text-body-sm text-outline">
                        {t('footer.powered_by')} <span className="px-1">OzyTech Agency Inc.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
