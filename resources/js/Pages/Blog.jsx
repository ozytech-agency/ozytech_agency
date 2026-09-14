import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import { useTranslations } from '@/lib/translations';

const POST_LINKS = [
    { image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85', href: 'start-a-project' },
    { image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85', href: 'home', hash: 'services' },
    { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85', href: 'start-a-project' },
];

export default function Blog() {
    const t = useTranslations();
    const posts = t('blog.posts');

    return (
        <SiteLayout>
            <Head title={t('blog.title')} />

            <section className="relative overflow-hidden bg-primary-container py-space-3xl lg:py-space-4xl text-on-primary w-full">
                <div className="absolute top-[-25%] right-[-8%] w-[560px] h-[560px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop relative z-10">
                    <Link href={route('home')} className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-fixed-dim hover:text-on-primary transition-colors">
                        <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i> {t('blog.hero.back')}
                    </Link>
                    <div className="max-w-3xl mt-space-2xl">
                        <span className="inline-flex items-center gap-space-xs px-space-md py-space-2xs bg-primary-fixed/10 rounded-full font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-accent2"></span> {t('blog.hero.badge')}
                        </span>
                        <h1 className="mt-space-md font-display-xl text-display-xl leading-[1.1]">{t('blog.hero.title')}</h1>
                        <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-primary-fixed-dim">{t('blog.hero.description')}</p>
                    </div>
                </div>
            </section>

            <section className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop">
                    <div className="flex flex-col lg:flex-row gap-space-xl items-stretch">
                        <article className="lg:w-3/5 relative overflow-hidden rounded-xl bg-primary-container text-on-primary min-h-[380px] flex items-end">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
                                alt="Close-up of a circuit board"
                                className="absolute inset-0 w-full h-full object-cover opacity-35"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/70 to-transparent"></div>
                            <div className="relative z-10 p-space-xl lg:p-space-2xl">
                                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('blog.featured.category')}</span>
                                <h2 className="mt-space-sm font-headline-lg text-headline-lg">{t('blog.featured.title')}</h2>
                                <p className="mt-space-sm max-w-xl text-primary-fixed-dim">{t('blog.featured.excerpt')}</p>
                                <Link
                                    href={route('start-a-project')}
                                    className="mt-space-lg inline-flex items-center gap-space-xs font-label-md text-label-md text-on-primary hover:text-secondary-fixed-dim transition-colors"
                                >
                                    {t('blog.featured.cta')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </article>
                        <div className="lg:w-2/5 flex flex-col justify-center gap-space-md">
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('blog.why_blog.label')}</span>
                            <h2 className="font-headline-lg text-headline-lg">{t('blog.why_blog.title')}</h2>
                            <p className="text-on-surface-variant">{t('blog.why_blog.description')}</p>
                            <div className="grid grid-cols-2 gap-space-sm pt-space-sm">
                                <div className="rounded-lg bg-surface-container-low p-space-md">
                                    <strong className="block font-headline-sm text-headline-sm">4</strong>
                                    <span className="font-body-sm text-body-sm text-outline">{t('blog.why_blog.stat1')}</span>
                                </div>
                                <div className="rounded-lg bg-surface-container-low p-space-md">
                                    <strong className="block font-headline-sm text-headline-sm">01</strong>
                                    <span className="font-body-sm text-body-sm text-outline">{t('blog.why_blog.stat2')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-surface-container-low py-space-3xl lg:py-space-4xl">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
                        <div>
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">{t('blog.latest.label')}</span>
                            <h2 className="mt-space-xs font-headline-lg text-headline-lg">{t('blog.latest.title')}</h2>
                        </div>
                        <div className="flex flex-wrap gap-space-xs" aria-label="Blog topics">
                            <span className="rounded-full bg-primary-container px-space-sm py-space-xs font-label-sm text-label-sm text-on-primary">{t('blog.latest.filter_all')}</span>
                            <span className="rounded-full bg-surface-container-high px-space-sm py-space-xs font-label-sm text-label-sm text-on-surface-variant">{t('blog.latest.filter_cloud')}</span>
                            <span className="rounded-full bg-surface-container-high px-space-sm py-space-xs font-label-sm text-label-sm text-on-surface-variant">{t('blog.latest.filter_ai')}</span>
                        </div>
                    </div>
                    <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                        {posts.map((post, i) => (
                            <article
                                key={post.title}
                                className="h-full flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <img src={POST_LINKS[i].image} alt="" className="w-full aspect-[4/3] object-cover" />
                                <div className="p-space-lg flex flex-1 flex-col">
                                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{post.category}</span>
                                    <h3 className="mt-space-xs font-headline-sm text-headline-sm">{post.title}</h3>
                                    <p className="mt-space-sm text-body-sm text-on-surface-variant">{post.excerpt}</p>
                                    <a
                                        href={POST_LINKS[i].hash ? `${route(POST_LINKS[i].href)}#${POST_LINKS[i].hash}` : route(POST_LINKS[i].href)}
                                        className="mt-auto pt-space-md inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface transition-colors self-start"
                                    >
                                        {post.cta} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className="w-full py-space-3xl lg:py-space-4xl bg-primary-container text-on-primary">
                <div className="max-w-max-width mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
                    <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{t('blog.cta_section.label')}</span>
                        <h2 className="mt-space-xs font-headline-lg text-headline-lg">{t('blog.cta_section.title')}</h2>
                        <p className="mt-space-sm text-primary-fixed-dim">{t('blog.cta_section.description')}</p>
                    </div>
                    <Link
                        href={route('start-a-project')}
                        className="inline-flex shrink-0 items-center justify-center gap-space-xs rounded-lg bg-accent2 px-space-xl py-space-sm font-label-md text-label-md text-on-primary shadow-[0_12px_24px_-8px_rgba(233,87,71,0.45)] transition-all hover:-translate-y-0.5"
                    >
                        {t('blog.cta_section.button')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
