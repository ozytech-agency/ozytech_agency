import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Reveal';
import Seo from '@/Components/Seo';
import { useTranslations } from '@/lib/translations';

export default function Blog({ featuredPost, posts }) {
    const t = useTranslations();

    return (
        <SiteLayout>
            <Seo title={t('blog.title')} description={t('blog.hero.description')} />

            <section className="relative overflow-hidden py-space-3xl lg:py-space-4xl text-on-primary w-full isolate">
                <div className="absolute inset-0 -z-20">
                    <img
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2200&q=80"
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
                <div className="absolute top-[-25%] right-[-8%] w-[560px] h-[560px] rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" aria-hidden="true"></div>
                <div className="mx-[6%] relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-space-xs px-space-md py-space-2xs bg-primary-fixed/10 rounded-full font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-accent2"></span> {t('blog.hero.badge')}
                        </span>
                        <h1 className="mt-space-md font-display-xl text-display-xl leading-[1.1]">{t('blog.hero.title')}</h1>
                        <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-white/80">{t('blog.hero.description')}</p>
                    </div>
                </div>
            </section>

            <section className="w-full py-space-3xl lg:py-space-4xl bg-surface">
                <div className="mx-[6%]">
                    <div className="flex flex-col lg:flex-row gap-space-xl items-stretch">
                        {featuredPost && (
                            <article className="lg:w-3/5 relative overflow-hidden rounded-xl bg-primary-container text-on-primary min-h-[380px] flex items-end">
                                {featuredPost.cover_image && (
                                    <img
                                        src={featuredPost.cover_image}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 w-full h-full object-cover opacity-35"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/70 to-transparent"></div>
                                <div className="relative z-10 p-space-xl lg:p-space-2xl">
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed-dim">{featuredPost.category}</span>
                                    <h2 className="mt-space-sm font-headline-lg text-headline-lg">{featuredPost.title}</h2>
                                    <p className="mt-space-sm max-w-xl text-primary-fixed-dim">{featuredPost.excerpt}</p>
                                    <Link
                                        href={route('blog.show', featuredPost.slug)}
                                        className="mt-space-lg inline-flex items-center gap-space-xs font-label-md text-label-md text-on-primary hover:text-secondary-fixed-dim transition-colors"
                                    >
                                        {t('blog.read_more')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </article>
                        )}
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
                <div className="mx-[6%]">
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
                        {posts.data.map((post) => (
                            <article
                                key={post.slug}
                                className="h-full flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                {post.cover_image ? (
                                    <img src={post.cover_image} alt={post.title} className="w-full aspect-[4/3] object-cover" />
                                ) : (
                                    <div className="w-full aspect-[4/3] bg-surface-container-high" aria-hidden="true"></div>
                                )}
                                <div className="p-space-lg flex flex-1 flex-col">
                                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{post.category}</span>
                                    <h3 className="mt-space-xs font-headline-sm text-headline-sm">{post.title}</h3>
                                    <p className="mt-space-sm text-body-sm text-on-surface-variant">{post.excerpt}</p>
                                    <Link
                                        href={route('blog.show', post.slug)}
                                        className="mt-auto pt-space-md inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface transition-colors self-start"
                                    >
                                        {t('blog.read_more')} <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </Reveal>
                    {posts.data.length === 0 && !featuredPost && <p className="text-on-surface-variant">{t('blog.empty')}</p>}
                    {(posts.prev_page_url || posts.next_page_url) && (
                        <nav className="mt-space-xl flex justify-center gap-space-sm" aria-label="Pagination">
                            {posts.prev_page_url && (
                                <Link href={posts.prev_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                                    <i className="fa-solid fa-arrow-left text-xs rtl:rotate-180" aria-hidden="true"></i>
                                </Link>
                            )}
                            {posts.next_page_url && (
                                <Link href={posts.next_page_url} preserveScroll className="rounded-lg border border-outline-variant/40 px-space-md py-space-xs font-label-md text-label-md hover:bg-surface-container-high">
                                    <i className="fa-solid fa-arrow-right text-xs rtl:rotate-180" aria-hidden="true"></i>
                                </Link>
                            )}
                        </nav>
                    )}
                </div>
            </section>

            <section className="w-full py-space-3xl lg:py-space-4xl bg-primary-container text-on-primary">
                <div className="mx-[6%] flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
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
