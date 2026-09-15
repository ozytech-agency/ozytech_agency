import SiteHeader from '@/Components/SiteHeader';
import SiteFooter from '@/Components/SiteFooter';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function SiteLayout({ children }) {
    return (
        <>
            <SiteHeader />
            <main id="main" className="flex w-full flex-col pt-20 bg-surface min-h-screen">
                <div className="flex flex-1 flex-col w-full overflow-hidden">{children}</div>
            </main>
            <SiteFooter />
            <LanguageSwitcher />
        </>
    );
}
