import { Head, usePage } from '@inertiajs/react';

const LOCALES = ['en', 'ar', 'fr', 'es'];

/**
 * Centralizes the per-page <head> content that matters for search engines:
 * title + meta description, a self-referencing canonical, hreflang
 * alternates for the other 3 locales (+ x-default), Open Graph / Twitter
 * Card tags, an optional `noindex` guard for auth-gated pages, an optional
 * JSON-LD payload, and an optional BreadcrumbList JSON-LD built from
 * `breadcrumbs` (a list of `{ name, path }`, path relative to the locale
 * root — e.g. `{ name: 'Packages', path: '/packages' }`).
 *
 * Only meaningful now that SSR is enabled (see resources/js/ssr.jsx) — these
 * tags are rendered via Inertia's <Head>, which previously only reached the
 * DOM after the JS bundle executed, invisible to crawlers that don't render
 * JS.
 */
export default function Seo({ title, description, image, noindex = false, jsonLd, breadcrumbs, children }) {
    const { props } = usePage();
    const { appUrl, currentPath, locale, translations } = props;
    const resolvedImage = image ?? `${appUrl}/images/logo.png`;

    const segments = (currentPath ?? '').split('/').filter(Boolean);
    const hasLocale = LOCALES.includes(segments[0]);
    const rest = (hasLocale ? segments.slice(1) : segments).join('/');

    const urlFor = (loc) => `${appUrl}/${loc}${rest ? `/${rest}` : ''}`;
    const canonical = hasLocale ? urlFor(locale) : appUrl;
    const homeUrl = `${appUrl}/${locale}`;

    const breadcrumbJsonLd = hasLocale && breadcrumbs?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: translations?.nav?.home ?? 'Home', item: homeUrl },
                ...breadcrumbs.map((crumb, i) => ({
                    '@type': 'ListItem',
                    position: i + 2,
                    name: crumb.name,
                    item: `${homeUrl}${crumb.path}`,
                })),
            ],
        }
        : null;

    return (
        <Head title={title}>
            {description && <meta name="description" content={description} />}

            {hasLocale && <link rel="canonical" href={canonical} head-key="canonical" />}
            {hasLocale &&
                LOCALES.map((loc) => <link key={loc} rel="alternate" hreflang={loc} href={urlFor(loc)} head-key={`hreflang-${loc}`} />)}
            {hasLocale && <link rel="alternate" hreflang="x-default" href={urlFor('en')} head-key="hreflang-x-default" />}

            {noindex && <meta name="robots" content="noindex, nofollow" />}

            <meta property="og:type" content="website" />
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={resolvedImage} />
            <meta property="og:url" content={canonical} />
            <meta name="twitter:card" content="summary_large_image" />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={resolvedImage} />

            {jsonLd && (
                <script type="application/ld+json" head-key="json-ld">
                    {JSON.stringify(jsonLd)}
                </script>
            )}

            {breadcrumbJsonLd && (
                <script type="application/ld+json" head-key="breadcrumb-json-ld">
                    {JSON.stringify(breadcrumbJsonLd)}
                </script>
            )}

            {children}
        </Head>
    );
}
