import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import CountUp from '@/Components/CountUp';
import TechMarquee from '@/Components/TechMarquee';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

const HERO_SLIDES = [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2200&q=85',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=85',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2200&q=85',
];

// Brand marks that Material Symbols doesn't cover, keyed for SERVICE_CARD_META's `iconSvg`.
// Source: Simple Icons (CC0), so they can be recolored via `currentColor` like the Material icons.
const BRAND_ICON_PATHS = {
    shopify:
        'M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z',
};

const SERVICE_CARD_META = [
    { key: 'itSolutions', slug: 'it-infrastructure', icon: 'dns', iconColor: 'text-[#E55E4A]' },
    { key: 'llc', slug: 'llc-incorporation', icon: 'domain_add', iconColor: 'text-[#E55E4A]' },
    { key: 'payments', slug: 'payment-solutions', icon: 'credit_card', iconColor: 'text-[#E55E4A]' },
    { key: 'shopifyCommerce', slug: 'shopify-store-development', iconSvg: 'shopify', iconColor: 'text-[#E55E4A]' },
    { key: 'wordpress', slug: 'cms-development', icon: 'web', iconColor: 'text-[#E55E4A]' },
    { key: 'fullstack', slug: 'web-development', icon: 'code', iconColor: 'text-[#E55E4A]' },
    { key: 'mobile', slug: 'mobile-apps', icon: 'smartphone', iconColor: 'text-[#E55E4A]' },
    { key: 'saas', slug: 'software-development', icon: 'cloud_sync', iconColor: 'text-[#E55E4A]' },
];

const DELIVERY_PHASE_TONES = ['muted', 'active', 'muted'];

const ABOUT_PHOTOS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDkJPdW8obQp1iA3g-wc5kBgMH7qk_IcokPWD0MjBfqm4V1CKxmKh9bV_rHZccMDPGOIsXgWX9C8JcXwMwAc2fuXXXz1BW9VeXqhKZ8HRHXJrA1EOCdLYBJ10S5K4gbPK6RqmPq6pjmVaBIIGLiY9XV57wE8vmtwOKivhI5D2wbfZ1AWBVU23HqnnPfqZchXyMLMrY1Sa2Zaq675rpx1XGOkgtF37kdBRKS6UFHX0MSn3Z4yFrGZE9c',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAxO0Z6TM4lGhwttxj8_60EcWymoXuaEw_V_6VSsNopxX--UKZaLTl6pIPfK24rQIxkoVU_QFhYjVCRecMdZgn3bOpZIUt0g5WzYJ8DftYPZOM3zgRFChNUkmKweahPBEGIm9i4M7p8lgA8mRAhoAwhH39djS9chtYeVDtzQF3tI8wlJea_-gnzbbPThLlD9JBZCBJNpYGffpcKZ2wDSaz7e0KrFypXT4ZY_lxHWZ1PRTaaY0gMC3U',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCveN1pDO3glXLZsIJ29m92d6gyppXqG7WPRsLOs8MGBpOJrsM3g0lJ7yV4ifuf9FPlsNKbo7HWlj_5anaYQLgbixAoIw8l0QPEPJTp9CEu7wZ8K5_jCHB1xFRn0d3cDYsYXN9I44BT-xihameNXfNPphmspByRrmVVG1k2uj-tcO6qRwYfcDQH9swN9Aa7ldfpn-A9KQuUxZic_0hwYGHX9KPWy8ptxpDkQy2Y7yNb7fkE41NBTDM5',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAjdfoOFMNmd-6-9B2fAq6X1pc614-_IGSmykpp4Ya9hLSxMyK3SkfTW0gWavubtMqznZK5jsbtr5VV3msKbuS2dTT6Ogd9-3_qyQUYsvNnv8R984OWQMTmp2D8GLPzKjIn7YC6d4KEil_uuGQnkZxcQ5g51b6TbqlRHjNA6lTUEVFa6XhyhbRjDqwAOuUwhgnis6hV-y9tXWS1HNFpEq_Z5h7mvcMkSvH_JYeBKd1p6GQWBkjGpuTo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjQkhzoxDqTZXzASvSs-Z5CpQhnGEXWwOxCNAn5l9sB2K0MX-p5FZ0DVV4PZQfCzuHIGOXbe8l6VTEzQJtOw6U5cPDfAORy-LabpwsUlMlzJtqY1MzscxDjExM18FyzXDw-NezuRkSLkofeLJ_3pSyKuAWjug-NIn-A0VYbjbTmtNL8YFQtHpKriWb19Gr6rSv7n2naqokwiLVEq-anWdVA1FCRBId5FXoREge0Ly-ftm6bzqL0kE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBsGGa6HVZwPHZaNBEaldw2uY1irTYW3uZNgNCcK75zLvj_2Ly5QIahlLNtqE90213nHhZlqvXGMO3723M6mkKawmtjeJ5S6uCC_cPH_sljNJgycRuhsrzbVDp6PoeBf0k3YNrq2y1eyEVddUobyyFF1E253ExzjNiVIahu_-yY_7UCPFW0gL7DWF5lXJ27cShjeKvPJ1l47qte0eL21gd_BHAvSivtvrLbTDOVXBibxft7vorO6LOE',
];

const TESTIMONIAL_AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAB7hoL1hha3W1Un81SUDuUgFI9U5aVC1c85SX4LSSQ_Nnef3JZ8G3BkpIZVUbZ-DSPT-n3J-UW13LDCrxV6tiaxfBCLCJWnAZSKO0GG3OzFs0m-ODKgDRu8idlpYVZe0uvOBfVBbultKs-IbCSTthUQl2KuS3-IESburDpQphCwdv59AmZ6PdUz1cmkosnDsr3B-1eaDWj9xrMKjdqv98QMGBAlvSDaR9GlRzOZlA2ECpbZ3n2CLIh',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCieF_dpdB3n49PhYMv-TA2MyHwyCwTeE0kqIZ_j_xC2mBTiVYA0N9GIlDNQzk3A7YZ_KCSG1MURi0KuE-FfFh8r-OOXzup8N-GvwV_Y9CX3SlqtzpwrhfUMUUe4h0nblgIU_dJoR5YqT2Oeq9hyJBJ4TxnscgcPjogCvuXlKF97PlT7mYH8pjLhch_0crSbCz7LP5JxIAor8Qs83LcLnPmL6GCMcANHqkj43oqC7SH1rJf6VwUOH2',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDC-rv7KbuUbaH9Usmwujp1qQjHkDe2rhGL1IU6MuSIZ55kbavp8sPV2-YQG9VAzbPF3rBiK8JO1GwD5W5eKNuTmaj3nuY_A6l8UFZjxXs5BKD1GTS9f759eDsBIxoakL7MPE9zd_oGCt0logfshaNOXQOmo9ZtTNJ592OF5raq9RBGOtb8MnlrourSs8j47SX66IcBpVtDqXApm-cDQ8Cs2PAygnSJlYd56RuPab29eB6o3Zyi9Mm9',
];

function StarRow() {
    return (
        <div className="flex items-center gap-1 text-secondary-container mb-space-sm">
            {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="material-symbols-outlined text-sm icon-fill">star</span>
            ))}
        </div>
    );
}

export default function Home({ serviceImages = {} }) {
    const t = useTranslations();
    const [slide, setSlide] = useState(0);
    const gridRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = window.setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
        return () => window.clearInterval(id);
    }, []);

    const scrollTestimonials = (dir) => {
        const el = gridRef.current;
        if (!el) return;
        const card = el.firstElementChild;
        if (!card) return;
        el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: 'smooth' });
    };

    const deliveryFeatures = t('home.delivery.features');
    const deliveryPhases = t('home.delivery.phases');
    const testimonials = t('home.testimonials.items');

    return (
        <SiteLayout>
            <Seo title={t('home.title')} description={t('home.meta_description')} />

            {/* 1. HERO */}
            <section className="relative w-full py-space-3xl lg:py-space-4xl overflow-hidden bg-surface isolate">
                <div className="absolute inset-0 -z-30 pointer-events-none">
                    {HERO_SLIDES.map((src, i) => (
                        <div
                            key={src}
                            className="absolute inset-0 bg-center bg-cover transition-opacity duration-[1200ms]"
                            style={{ backgroundImage: `url('${src}')`, opacity: i === slide ? 1 : 0 }}
                        />
                    ))}
                </div>
                <div
                    className="absolute inset-0 -z-20 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgb(9 14 25 / .88) 0%, rgb(9 14 25 / .68) 48%, rgb(9 14 25 / .34) 100%), linear-gradient(180deg, rgb(9 14 25 / .18), rgb(9 14 25 / .5))',
                    }}
                />
                <div className="absolute z-20 right-4 sm:right-8 bottom-8 flex items-center gap-2">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Show background ${i + 1}`}
                            aria-current={i === slide}
                            onClick={() => setSlide(i)}
                            className={`h-2 rounded-full transition-all ${i === slide ? 'w-7 bg-white/95' : 'w-2 bg-white/45'}`}
                        />
                    ))}
                </div>

                <div className="absolute top-10 right-[-5%] w-[580px] h-[580px] bg-secondary-container/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
                <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-surface-container-highest/60 rounded-full blur-2xl pointer-events-none -z-0"></div>

                <div className="mx-[6%] relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-4xl flex flex-col items-center text-center gap-space-md">
                            <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs bg-black/30 backdrop-blur-sm border border-white/10 rounded-full shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-accent2 animate-ping"></span>
                                <span className="font-label-sm text-label-sm text-white/[92%] tracking-widest uppercase">{t('home.hero.badge')}</span>
                            </div>
                            <h1 className="font-display-xl text-display-xl-mobile sm:text-display-xl text-white/[92%] leading-[1.1] tracking-tight [text-wrap:balance]">
                                {t('home.hero.title_prefix')}{' '}
                                <span className="text-accent2 relative inline-block">
                                    {t('home.hero.title_highlight')}
                                    <img src="/images/patterns/hero-underline.svg" alt="" aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3" />
                                </span>{' '}
                                {t('home.hero.title_suffix')}
                            </h1>
                            <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto">{t('home.hero.subtitle')}</p>
                            <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-xs">
                                <Link
                                    href={route('start-a-project')}
                                    className="inline-flex items-center justify-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-xl py-space-sm rounded-lg shadow-[0_12px_24px_-8px_rgba(233,87,71,0.45)] transition-all hover:-translate-y-0.5"
                                >
                                    {t('home.hero.cta_start')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </Link>
                                <Link
                                    href={route('about')}
                                    className="group inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:shadow-md transition-all"
                                >
                                    <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-accent2 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-lg icon-fill">play_arrow</span>
                                    </span>
                                    <span>{t('home.hero.cta_showreel')}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TechMarquee />

            {/* 2. SERVICES CAPABILITIES */}
            <Reveal as="section" id="services" className="relative w-full py-space-3xl lg:py-space-4xl bg-surface-container-low">
                <div className="mx-[6%] flex flex-col items-center">
                    <div className="max-w-3xl text-center flex flex-col items-center gap-space-xs mb-space-2xl">
                        <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs bg-surface-container rounded-full shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                            <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest font-bold">{t('home.services.badge')}</span>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                            {t('home.services.title_prefix')}{' '}
                            <span className="underline decoration-secondary-container decoration-4 underline-offset-8">{t('home.services.title_highlight')}</span>
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs max-w-2xl">{t('home.services.subtitle')}</p>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg w-full">
                        {SERVICE_CARD_META.map((card) => {
                            const title = t(`home.services.cards.${card.key}.title`);
                            const image = serviceImages[card.slug];

                            return (
                                <div
                                    key={card.key}
                                    className="group relative flex h-full min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-xl border border-surface-container bg-primary-container text-center shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-cover bg-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.08]"
                                        style={{
                                            backgroundImage: `linear-gradient(180deg, rgb(9 14 25 / .45) 0%, rgb(9 14 25 / .78) 60%, rgb(9 14 25 / .92) 100%)${image ? `, url('${image}')` : ''}`,
                                        }}
                                    />

                                    <div className="relative z-10 flex flex-col items-center gap-space-sm px-space-lg py-space-xl">
                                        <div
                                            aria-hidden="true"
                                            className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm ${card.iconColor}`}
                                        >
                                            {card.iconSvg ? (
                                                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                                                    <path d={BRAND_ICON_PATHS[card.iconSvg]} />
                                                </svg>
                                            ) : (
                                                <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                                            )}
                                        </div>

                                        <h3 className="font-headline-sm text-xl font-bold text-white">{title}</h3>
                                        <p className="max-w-xs font-body-sm text-body-sm text-white/80">{t(`home.services.cards.${card.key}.desc`)}</p>

                                        <Link
                                            href={route('services.show', { service: card.slug })}
                                            className="group/cta mt-space-xs inline-flex items-center gap-space-xs rounded-lg bg-accent2 px-space-md py-space-2xs font-label-md text-label-md text-on-primary shadow-[0_10px_20px_-8px_rgba(233,87,71,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-container hover:shadow-[0_14px_28px_-10px_rgba(233,87,71,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                        >
                                            <span>{t('home.services.cta')}</span>
                                            <span className="sr-only">: {title}</span>
                                            <span aria-hidden="true" className="material-symbols-outlined text-base transition-transform duration-300 motion-safe:group-hover/cta:translate-x-1">
                                                arrow_forward
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </Reveal>
                </div>
            </Reveal>

            {/* 3. DELIVERY MODEL */}
            <Reveal as="section" id="delivery" className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
                        <div className="lg:col-span-5 flex flex-col gap-space-md">
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-container font-bold">{t('home.delivery.badge')}</span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                {t('home.delivery.title_prefix')}{' '}
                                <span className="underline decoration-secondary-container decoration-4 underline-offset-8">{t('home.delivery.title_highlight')}</span>{' '}
                                {t('home.delivery.title_suffix')}
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">{t('home.delivery.subtitle')}</p>
                            <div className="flex flex-col gap-space-sm pt-space-xs">
                                {deliveryFeatures.map((f) => (
                                    <div key={f.title} className="flex items-start gap-space-sm">
                                        <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shrink-0 mt-1">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </span>
                                        <div>
                                            <h3 className="font-label-md text-label-md text-on-surface font-bold">{f.title}</h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href={route('about')}
                                className="inline-flex items-center gap-space-xs self-start mt-[20px] bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                            >
                                <span>{t('home.delivery.cta')}</span> <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="lg:col-span-7 relative">
                            <div className="absolute -right-4 top-10 w-72 h-72 rounded-full bg-secondary-fixed opacity-70 blur-xl"></div>
                            <div className="relative z-10 bg-surface-container-lowest rounded-xl shadow-xl p-space-md">
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-primary-container">
                                    <iframe
                                        className="h-full w-full"
                                        src="https://www.youtube.com/embed/"
                                        title={t('home.delivery.video_caption')}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-1 rounded-md text-xs font-mono text-on-surface">
                                        {t('home.delivery.video_caption')}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-md">
                                    {deliveryPhases.map((phase, i) => (
                                        <div
                                            key={phase.label}
                                            className={`p-space-sm rounded-lg flex flex-col justify-between ${DELIVERY_PHASE_TONES[i] === 'active' ? 'bg-surface-container-high shadow-sm' : 'bg-surface-container-low'}`}
                                        >
                                            <div>
                                                <span className={`font-label-sm text-label-sm uppercase ${DELIVERY_PHASE_TONES[i] === 'active' ? 'text-secondary font-bold' : 'text-secondary-container'}`}>
                                                    {phase.label}
                                                </span>
                                                <h5 className="font-label-md text-label-md font-bold text-on-surface mt-1">{phase.title}</h5>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-1">{phase.desc}</p>
                                            </div>
                                            <span className={`text-xs font-mono mt-3 ${DELIVERY_PHASE_TONES[i] === 'active' ? 'text-secondary font-semibold' : 'text-outline'}`}>{phase.footer}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* 4. GUILD */}
            <Reveal as="section" id="about" className="w-full py-space-3xl lg:py-space-4xl bg-surface-container-low">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
                        <div className="lg:col-span-6 grid grid-cols-3 gap-space-xs">
                            {[0, 2, 4].map((startIdx, colIdx) => (
                                <div key={colIdx} className={`flex flex-col gap-space-xs ${colIdx === 1 ? 'sm:mt-space-2xl' : ''}`}>
                                    {[ABOUT_PHOTOS[startIdx], ABOUT_PHOTOS[startIdx + 1]].map((src, i) => (
                                        <div key={src} className={`${(colIdx + i) % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} rounded-lg overflow-hidden shadow-sm bg-surface-container`}>
                                            <img
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                alt=""
                                                aria-hidden="true"
                                                loading="lazy"
                                                src={src}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-6 flex flex-col items-start gap-space-md">
                            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined text-2xl">groups</span>
                            </div>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('home.guild.title')}</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">{t('home.guild.subtitle')}</p>
                            <div className="grid grid-cols-2 gap-space-md w-full pt-space-xs">
                                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                                    <div className="font-headline-sm text-headline-sm font-bold text-on-surface">{t('home.guild.stat1_value')}</div>
                                    <div className="font-body-sm text-body-sm text-on-surface-variant">{t('home.guild.stat1_desc')}</div>
                                </div>
                                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                                    <div className="font-headline-sm text-headline-sm font-bold text-secondary-container">{t('home.guild.stat2_value')}</div>
                                    <div className="font-body-sm text-body-sm text-on-surface-variant">{t('home.guild.stat2_desc')}</div>
                                </div>
                            </div>
                            <Link
                                href={route('packages')}
                                className="inline-flex items-center gap-space-xs self-start mt-[20px] bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                            >
                                <span>{t('home.guild.cta')}</span> <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* 5. IMPACT STATS */}
            <Reveal as="section" id="impact" className="w-full py-space-3xl bg-primary-container text-on-primary">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-space-xl text-left">
                        <div className="flex flex-col gap-space-2xs">
                            <CountUp target={12} suffix="+" className="font-stat-counter text-stat-counter font-bold text-on-primary tracking-tight" />
                            <span className="font-body-sm text-body-sm text-outline-variant">{t('home.stats.builder_tenure')}</span>
                        </div>
                        <div className="flex flex-col gap-space-2xs">
                            <CountUp target={250} suffix="+" className="font-stat-counter text-stat-counter font-bold text-on-primary tracking-tight" />
                            <span className="font-body-sm text-body-sm text-outline-variant">{t('home.stats.systems_shipped')}</span>
                        </div>
                        <div className="flex flex-col gap-space-2xs">
                            <CountUp target={6} className="font-stat-counter text-stat-counter font-bold text-on-primary tracking-tight" />
                            <span className="font-body-sm text-body-sm text-outline-variant">{t('home.stats.regions_connected')}</span>
                        </div>
                        <div className="flex flex-col gap-space-2xs">
                            <CountUp target={98.5} suffix="%" decimals={1} className="font-stat-counter text-stat-counter font-bold text-on-primary tracking-tight" />
                            <span className="font-body-sm text-body-sm text-outline-variant">{t('home.stats.partner_retention')}</span>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* 6. TESTIMONIALS */}
            <Reveal as="section" id="case-studies" className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-space-md mb-space-2xl">
                        <div>
                            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{t('home.testimonials.badge')}</span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">{t('home.testimonials.title')}</h2>
                        </div>
                        <div className="flex items-center gap-space-xs">
                            <button
                                type="button"
                                aria-label={t('home.testimonials.prev')}
                                onClick={() => scrollTestimonials(-1)}
                                className="w-11 h-11 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">arrow_back</span>
                            </button>
                            <button
                                type="button"
                                aria-label={t('home.testimonials.next')}
                                onClick={() => scrollTestimonials(1)}
                                className="w-11 h-11 rounded-full bg-secondary-container text-on-primary hover:bg-secondary flex items-center justify-center shadow-md transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div ref={gridRef} className="flex gap-space-md lg:gap-space-lg overflow-x-auto snap-x snap-mandatory pb-space-xs md:grid md:grid-cols-3 md:overflow-visible">
                        {testimonials.map((t2, i) => (
                            <div key={t2.name} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col justify-between shrink-0 w-[85%] snap-center md:w-auto md:shrink">
                                <div>
                                    <StarRow />
                                    <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">{t2.quote}</p>
                                </div>
                                <div className="flex items-center gap-space-sm pt-space-md mt-space-md border-t border-surface-container">
                                    <img className="w-12 h-12 rounded-full object-cover" alt={t2.name} loading="lazy" src={TESTIMONIAL_AVATARS[i]} />
                                    <div>
                                        <div className="font-label-md text-label-md font-bold text-on-surface">{t2.name}</div>
                                        <div className="font-body-sm text-body-sm text-outline text-xs">{t2.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>

            {/* 7. SOLUTIONS */}
            <Reveal as="section" id="solutions" className="w-full py-space-3xl lg:py-space-4xl bg-surface-container-low">
                <div className="mx-[6%]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
                        <div className="lg:col-span-5 flex flex-col items-start gap-space-md">
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-container font-bold">{t('home.solutions.badge')}</span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                {t('home.solutions.title_prefix')}{' '}
                                <span className="underline decoration-secondary-container decoration-4 underline-offset-8">{t('home.solutions.title_highlight')}</span>
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">{t('home.solutions.subtitle')}</p>
                            <a href="#solutions" className="inline-flex items-center gap-space-xs text-secondary font-label-md text-label-md hover:translate-x-1 transition-transform">
                                <span>{t('home.solutions.cta')}</span> <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </a>
                        </div>
                        <div className="lg:col-span-7 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 bg-secondary-container rounded-3xl -rotate-6 opacity-85 -z-0"></div>
                            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xl flex flex-col gap-space-xs">
                                    <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase">{t('home.solutions.card1_eyebrow')}</span>
                                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{t('home.solutions.card1_title')}</h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t('home.solutions.card1_desc')}</p>
                                    <div className="mt-space-sm p-space-xs bg-surface-container rounded-md font-mono text-xs text-on-surface-variant">$ terraform apply --auto-approve</div>
                                </div>
                                <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden aspect-video sm:aspect-auto sm:h-52">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWwBRzvLCHwNLjChZfRoWdG6onokqGcZGaPfbUvlAe_FMR8FvxfRDl27EkRZ2ngc9J-FUIcjgRAKhkkF6e0pES7p9pwNz_xXXB0ppY2RvWRj36pkoGwhkkG5z0sx4MODn80ahromdqudOtYF9c3kfpZyr0aLVu_a1VpBEwfZJrm8PgLfdgks8u5YRlk8XCVlQUm0wXkw3_Q3eN2FqOf8X_fUUFKuBC3NlwImaT2oMxZMC4fPmVK7Kc"
                                    />
                                </div>
                                <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden aspect-video sm:aspect-auto sm:h-52">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmvPbOttNKM7IqRevu8N3kykN1ZO0aXeuRdXC2tkC-BbgAdFJWdoGSkgRxqGd9hu41Crld3QK0hH1mfOysWv-tG3nJATPnKzMF3V7Uf_eZyTgXCzwiewB_SG7yyTeYwofxaAY4K5jm8MSu98w96dE_EDVO0HmPWTgScEeDC7ad5FpwYf_ZOGplvGYdIYcW2tHmUoKRlK7dxzeZ0JN2c-tS9f9OTY1LlRPdTTtVPZ_MZKx-EY2KE5QA"
                                    />
                                </div>
                                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xl flex flex-col justify-between">
                                    <div>
                                        <span className="font-label-sm text-label-sm text-secondary-container uppercase">{t('home.solutions.card4_eyebrow')}</span>
                                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">{t('home.solutions.card4_title')}</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t('home.solutions.card4_desc')}</p>
                                    </div>
                                    <div className="flex items-center gap-space-xs text-xs font-mono text-outline">
                                        <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                                        <span>{t('home.solutions.card4_coverage')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* 8. CTA BANNER */}
            <Reveal
                as="section"
                id="contact"
                className="relative w-full py-space-3xl lg:py-space-4xl overflow-hidden text-on-secondary-fixed"
                style={{ background: 'linear-gradient(to right, rgb(var(--c-secondary-container)), rgb(var(--c-secondary-fixed-dim)), rgb(var(--c-secondary)))' }}
            >
                <div className="mx-[6%] relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-space-2xs px-space-md py-1 bg-surface-container-lowest/30 backdrop-blur-md rounded-full mb-space-sm">
                        <span className="material-symbols-outlined text-sm text-accent2">bolt</span>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-fixed font-bold">{t('home.cta.badge')}</span>
                    </div>
                    <h2 className="font-display-xl text-display-xl-mobile sm:text-display-xl text-on-secondary-fixed font-bold max-w-3xl leading-tight">{t('home.cta.title')}</h2>
                    <p className="font-body-lg text-body-lg text-on-secondary-fixed/90 max-w-2xl mt-space-sm mb-space-xl">{t('home.cta.subtitle')}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-space-md">
                        <Link
                            href={route('start-a-project')}
                            className="inline-flex items-center justify-center bg-primary-container text-on-primary font-label-md text-label-md px-space-2xl py-space-md rounded-lg shadow-xl hover:bg-primary transition-all hover:-translate-y-0.5"
                        >
                            {t('home.cta.primary')}
                        </Link>
                        <Link
                            href={route('packages')}
                            className="inline-flex items-center justify-center bg-surface-container-lowest/90 text-on-surface font-label-md text-label-md px-space-xl py-space-md rounded-lg shadow-md hover:bg-surface-container-lowest transition-all"
                        >
                            {t('home.cta.secondary')}
                        </Link>
                    </div>
                </div>
            </Reveal>
        </SiteLayout>
    );
}
