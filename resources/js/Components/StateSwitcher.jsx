import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/lib/translations';

/**
 * The US states an LLC can be formed in. Keys match App\Enums\FormationState and each package's `formation_states`.
 */
export const FORMATION_STATES = [
    { key: 'new-mexico', labelKey: 'packages.state_switcher.new_mexico' },
    { key: 'wyoming', labelKey: 'packages.state_switcher.wyoming' },
];

const DEFAULT_STATE = FORMATION_STATES[0].key;
const STORAGE_KEY = 'ozytech-formation-state';

/**
 * The visitor's chosen formation state, remembered across pages. Read after mount so the
 * server-rendered markup (always the default) matches the first client render.
 */
export function useFormationState() {
    const [state, setState] = useState(DEFAULT_STATE);

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (FORMATION_STATES.some((s) => s.key === saved)) setState(saved);
        } catch {
            // Storage can be blocked; the default state still works.
        }
    }, []);

    const choose = (next) => {
        setState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Not remembered, but the page still updates.
        }
    };

    return [state, choose];
}

/**
 * A segmented pill switch between the formation states. The active option sits on a coral
 * highlight that glides between options. Behaves as a radio group: arrow keys move the
 * selection, and only the active option is tabbable.
 */
export default function StateSwitcher({ value, onChange, className = '' }) {
    const t = useTranslations();
    const buttons = useRef([]);
    const activeIndex = Math.max(0, FORMATION_STATES.findIndex((s) => s.key === value));

    const select = (index) => {
        const next = (index + FORMATION_STATES.length) % FORMATION_STATES.length;
        onChange(FORMATION_STATES[next].key);
        buttons.current[next]?.focus();
    };

    const onKeyDown = (e) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        // Left/right follow reading direction, so "right" means previous in RTL.
        const isRtl = document.documentElement.dir === 'rtl' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft');
        select(activeIndex + (isRtl ? -step : step));
    };

    return (
        <div className={`flex justify-center ${className}`}>
            <div
                role="radiogroup"
                aria-label={t('packages.state_switcher.label')}
                onKeyDown={onKeyDown}
                className="relative grid grid-cols-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest p-1.5 shadow-sm"
            >
                <span
                    aria-hidden="true"
                    className={`absolute inset-y-1.5 start-1.5 w-[calc(50%-0.375rem)] rounded-full bg-accent2 shadow-[0_10px_20px_-6px_rgba(233,87,71,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
                        activeIndex === 1 ? 'translate-x-full rtl:-translate-x-full' : 'translate-x-0'
                    }`}
                ></span>
                {FORMATION_STATES.map((state, index) => {
                    const active = index === activeIndex;

                    return (
                        <button
                            key={state.key}
                            ref={(el) => (buttons.current[index] = el)}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            tabIndex={active ? 0 : -1}
                            onClick={() => select(index)}
                            className={`relative z-10 whitespace-nowrap rounded-full px-space-lg py-space-sm font-label-md text-label-md font-bold transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 sm:px-space-xl ${
                                active ? 'text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            {t(state.labelKey)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
