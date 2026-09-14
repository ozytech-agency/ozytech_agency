import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 font-label-md text-label-md transition-colors focus:outline-none ' +
                (active
                    ? 'border-accent2 text-on-surface'
                    : 'border-transparent text-on-surface-variant hover:border-outline-variant hover:text-on-surface') +
                className
            }
        >
            {children}
        </Link>
    );
}
