import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-accent2 bg-secondary-container/10 text-secondary'
                    : 'border-transparent text-on-surface-variant hover:border-outline-variant hover:bg-surface-container-high hover:text-on-surface'
            } font-label-md text-label-md transition-colors focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
