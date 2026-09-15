import SiteLayout from '@/Layouts/SiteLayout';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <SiteLayout>
            <div className="flex w-full flex-1 flex-col bg-surface-container-low">
                {header && (
                    <div className="border-b border-surface-container bg-surface-container-lowest">
                        <div className="mx-auto max-w-7xl px-gutter-mobile py-space-lg lg:px-gutter-desktop">{header}</div>
                    </div>
                )}
                <div className="flex-1">{children}</div>
            </div>
        </SiteLayout>
    );
}
