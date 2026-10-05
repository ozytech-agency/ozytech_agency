import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function Faq() {
    const t = useTranslations();
    const faqs = t('start_a_project.faq.items');
    const [query, setQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return faqs;
        return faqs.filter((faq) => faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q));
    }, [faqs, query]);

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    };

    return (
        <SiteLayout>
            <Seo title={t('faq.title')} description={t('faq.meta_description')} jsonLd={faqJsonLd} breadcrumbs={[{ name: 'FAQ', path: '/faq' }]} />

            <section className="relative w-full overflow-hidden py-space-4xl text-on-primary isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=2200&q=80"
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
                <div className="relative mx-[6%]">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('faq.hero.eyebrow')}</span>
                    <h1 className="mt-space-sm max-w-2xl font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1.1] text-white/[92%]">{t('faq.hero.title')}</h1>
                    <p className="mt-space-md max-w-xl font-body-lg text-body-lg text-white/80">{t('faq.hero.subtitle')}</p>
                </div>
            </section>

            <Reveal as="section" className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%]">
                    <div className="max-w-xl mx-auto mb-space-2xl">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute start-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setOpenIndex(null);
                                }}
                                placeholder={t('faq.search.placeholder')}
                                className="field"
                                style={{ paddingInlineStart: '2.75rem' }}
                                aria-label={t('faq.search.placeholder')}
                            />
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto flex flex-col gap-space-xs">
                        {filtered.length === 0 && (
                            <p className="text-center font-body-md text-body-md text-on-surface-variant py-space-xl">{t('faq.search.no_results')}</p>
                        )}
                        {filtered.map((faq, i) => (
                            <details
                                key={faq.q}
                                className="faq group bg-surface-container-low rounded-xl px-space-lg py-space-md"
                                open={openIndex === i}
                                onToggle={(e) => setOpenIndex(e.target.open ? i : null)}
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
            </Reveal>

            <section className="w-full py-space-4xl bg-primary-container text-on-primary">
                <div className="mx-[6%] flex flex-col md:flex-row items-center justify-between gap-space-xl">
                    <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('faq.cta.label')}</span>
                        <h2 className="mt-space-sm font-headline-lg text-headline-lg max-w-[16ch]">{t('faq.cta.title')}</h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-primary-fixed-dim leading-relaxed">{t('faq.cta.description')}</p>
                        <Link
                            href={route('contact')}
                            className="mt-space-lg inline-flex items-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                        >
                            {t('faq.cta.button')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
