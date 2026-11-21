import { Link, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';
import { PROSE_CLASSES } from '@/lib/prose';
import { useTranslations } from '@/lib/translations';

export default function BlogShow({ post, related }) {
    const t = useTranslations();
    const { locale } = usePage().props;

    const publishedOn = post.published_at ? new Date(post.published_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) : null;

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.cover_image,
        datePublished: post.published_at,
        author: post.author ? { '@type': 'Person', name: post.author } : { '@type': 'Organization', name: 'Ozytech Agency' },
    };

    return (
        <SiteLayout>
            <Seo
                title={post.title}
                description={post.excerpt}
                image={post.cover_image}
                jsonLd={articleJsonLd}
                breadcrumbs={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]}
            />

            <article className="w-full bg-surface">
                <header className="mx-[6%] max-w-[760px] pt-space-3xl lg:mx-auto">
                    <Link href={route('blog')} className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface transition-colors">
                        <i className="fa-solid fa-arrow-left text-xs rtl:rotate-180" aria-hidden="true"></i> {t('blog.show.back')}
                    </Link>
                    {post.category && <p className="mt-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary">{post.category}</p>}
                    <h1 className="mt-space-sm font-display-xl text-display-xl-mobile sm:text-display-xl leading-[1.1] text-on-surface">{post.title}</h1>
                    {post.excerpt && <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">{post.excerpt}</p>}
                    <p className="mt-space-md font-body-sm text-body-sm text-outline">
                        {publishedOn && (
                            <>
                                {t('blog.show.published')} <time dateTime={post.published_at}>{publishedOn}</time>
                            </>
                        )}
                        {post.author && <> · {post.author}</>}
                    </p>
                </header>

                {post.cover_image && (
                    <div className="mx-[6%] mt-space-xl max-w-[1000px] lg:mx-auto">
                        <img src={post.cover_image} alt={post.title} className="w-full aspect-[16/9] rounded-xl object-cover" />
                    </div>
                )}

                <div className={`mx-[6%] max-w-[760px] pb-space-3xl lg:mx-auto ${PROSE_CLASSES}`} dangerouslySetInnerHTML={{ __html: post.body_html }} />
            </article>

            {related.length > 0 && (
                <section className="w-full bg-surface-container-low py-space-3xl">
                    <div className="mx-[6%]">
                        <h2 className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">{t('blog.show.related')}</h2>
                        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
                            {related.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={route('blog.show', item.slug)}
                                    className="flex flex-col overflow-hidden rounded-xl border border-surface-container bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {item.cover_image && <img src={item.cover_image} alt={item.title} className="w-full aspect-[4/3] object-cover" />}
                                    <span className="p-space-lg">
                                        <span className="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">{item.category}</span>
                                        <span className="mt-space-xs block font-headline-sm text-headline-sm text-on-surface">{item.title}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}
