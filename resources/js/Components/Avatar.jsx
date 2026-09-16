import { getInitials } from '@/lib/avatar';

/**
 * Shows the user's uploaded photo when they have one, otherwise falls back to
 * an initials badge. `className` controls sizing (e.g. "h-7 w-7") and is
 * applied to whichever of the two is rendered.
 */
export default function Avatar({ user, className = '' }) {
    if (user?.avatar_url) {
        return <img src={user.avatar_url} alt={user.name} className={`shrink-0 rounded-full object-cover ${className}`} />;
    }

    return (
        <span className={`flex shrink-0 items-center justify-center rounded-full bg-accent2 font-bold text-on-primary ${className}`}>
            {getInitials(user?.name)}
        </span>
    );
}
