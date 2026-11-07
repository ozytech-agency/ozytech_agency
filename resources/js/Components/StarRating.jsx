import { useState } from 'react';

const STARS = [1, 2, 3, 4, 5];

/**
 * Read-only stars. `label` (e.g. "4 out of 5 stars") is announced to screen readers.
 */
export function StarRating({ rating = 5, label, className = '' }) {
    return (
        <div className={`flex items-center gap-1 text-secondary-container ${className}`} role="img" aria-label={label}>
            {STARS.map((star) => (
                <span key={star} className={`material-symbols-outlined text-sm ${star <= rating ? 'icon-fill' : 'text-outline-variant'}`} aria-hidden="true">
                    star
                </span>
            ))}
        </div>
    );
}

/**
 * A 1–5 star picker that behaves as a radio group. `starLabel(n)` names each option.
 */
export function StarRatingInput({ value, onChange, starLabel, labelledBy, size = 'text-3xl' }) {
    const [hovered, setHovered] = useState(0);
    const shown = hovered || value || 0;

    return (
        <div className="flex items-center gap-1" role="radiogroup" aria-labelledby={labelledBy} onMouseLeave={() => setHovered(0)}>
            {STARS.map((star) => (
                <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={value === star}
                    aria-label={starLabel(star)}
                    title={starLabel(star)}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onFocus={() => setHovered(star)}
                    onBlur={() => setHovered(0)}
                    className="rounded-md p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
                >
                    <span className={`material-symbols-outlined ${size} ${star <= shown ? 'icon-fill text-secondary-container' : 'text-outline-variant'}`} aria-hidden="true">
                        star
                    </span>
                </button>
            ))}
        </div>
    );
}
