import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';

export default function GuestLayout({ children }) {
    return (
        <SiteLayout>
            <Seo noindex />
            <div className="flex w-full flex-1 items-center justify-center bg-surface-container-low px-gutter-mobile py-space-3xl">
                <div className="w-full max-w-md rounded-xl bg-surface-container-lowest p-space-xl shadow-[0_25px_60px_-20px_rgba(11,21,40,0.15)] lg:p-space-2xl">
                    {children}
                </div>
            </div>
        </SiteLayout>
    );
}
