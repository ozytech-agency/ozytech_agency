import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Seo from '@/Components/Seo';

const MESSAGES = {
    404: {
        title: 'Page not found',
        description: "The page you're looking for doesn't exist or may have moved.",
    },
    403: {
        title: 'Access denied',
        description: "You don't have permission to view this page.",
    },
    500: {
        title: 'Server error',
        description: 'Something went wrong on our end. Please try again shortly.',
    },
    503: {
        title: 'Service unavailable',
        description: "We're performing maintenance. Please check back soon.",
    },
};

export default function Error({ status }) {
    const { title, description } = MESSAGES[status] ?? MESSAGES[500];

    return (
        <SiteLayout>
            <Seo title={`${title} | Ozytech Agency`} description={description} noindex />

            <section className="flex w-full flex-1 flex-col items-center justify-center py-space-4xl text-center">
                <span className="font-stat-counter text-stat-counter font-bold text-secondary-container">{status}</span>
                <h1 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">{title}</h1>
                <p className="mt-space-sm max-w-md font-body-md text-body-md text-on-surface-variant">{description}</p>
                <Link
                    href={route('home')}
                    className="mt-space-xl inline-flex items-center gap-space-xs bg-accent2 text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-[0_10px_20px_-5px_rgba(233,87,71,0.35)] transition-all hover:-translate-y-0.5"
                >
                    Back to homepage <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
            </section>
        </SiteLayout>
    );
}
