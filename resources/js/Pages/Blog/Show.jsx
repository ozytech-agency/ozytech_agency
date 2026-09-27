import { Head, Link, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { useTranslations } from '@/lib/translations';

const PROSE_CLASSES = [
    'text-body-lg leading-relaxed text-on-surface-variant',
    '[&_p]:mt-space-md',
    '[&_h2]:mt-space-xl [&_h2]:font-headline-sm [&_h2]:text-headline-sm [&_h2]:text-on-surface',
    '[&_h3]:mt-space-lg [&_h3]:font-headline-sm [&_h3]:text-xl [&_h3]:text-on-surface',
    '[&_ul]:mt-space-md [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:mt-space-md [&_ol]:list-decimal [&_ol]:ps-6 [&_li]:mt-space-2xs',
    '[&_a]:text-secondary [&_a]:underline hover:[&_a]:text-on-surface',
    '[&_strong]:text-on-surface',
    '[&_blockquote]:mt-space-md [&_blockquote]:border-s-4 [&_blockquote]:border-accent2 [&_blockquote]:ps-space-md [&_blockquote]:italic',
    '[&_code]:rounded [&_code]:bg-surface-container-high [&_code]:px-1 [&_code]:text-sm',
    '[&_pre]:mt-space-md [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-container-high [&_pre]:p-space-md',
    '[&_img]:mt-space-md [&_img]:rounded-xl',
].join(' ');

export default function BlogShow({ post, related }) {
    const t = useTranslations();
    const { locale } = usePage().props;

    const publishedOn = post.published_at ? new Date(post.published_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) : null;

    return (
        <SiteLayout>
            <Head title={`${post.title} | OzyTech`} />

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
                        <img src={post.cover_image} alt="" className="w-full aspect-[16/9] rounded-xl object-cover" />
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
                                    {item.cover_image && <img src={item.cover_image} alt="" className="w-full aspect-[4/3] object-cover" />}
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
