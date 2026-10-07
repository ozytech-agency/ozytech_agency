import { Head, usePage } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';
import SiteFooter from '@/Components/SiteFooter';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function SiteLayout({ children }) {
    const { appUrl } = usePage().props;

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ozytech Agency',
        url: appUrl,
        logo: `${appUrl}/images/logo.png`,
        sameAs: [
            'https://github.com/ozytech-agency',
            'https://www.instagram.com/ozytechaagency',
            'https://web.facebook.com/profile.php?id=61594837992868',
            'https://www.tiktok.com/@ozytech_agency',
        ],
    };

    return (
        <>
            <Head>
                <script type="application/ld+json" head-key="organization-json-ld">
                    {JSON.stringify(organizationJsonLd)}
                </script>
            </Head>
            <SiteHeader />
            <main id="main" className="flex w-full flex-col pt-20 bg-surface min-h-screen">
                <div className="flex flex-1 flex-col w-full overflow-hidden">{children}</div>
            </main>
            <SiteFooter />
            <LanguageSwitcher />
        </>
    );
}
