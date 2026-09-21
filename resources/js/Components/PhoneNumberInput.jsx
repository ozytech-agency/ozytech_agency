import { useEffect, useRef, useState } from 'react';
import COUNTRY_CODES, { flagEmoji } from '@/lib/countryCodes';

function splitPhoneValue(value, defaultIso) {
    const match = value
        ? [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length).find((c) => value.startsWith(c.dial))
        : null;

    if (match) {
        return { iso: match.iso2, number: value.slice(match.dial.length).trim() };
    }

    return { iso: defaultIso, number: value ?? '' };
}

/**
 * A phone number input with a country dial-code picker, combined into a single
 * "+<dial> <number>" string passed to onChange. No external phone library —
 * dial codes come from resources/js/lib/countryCodes.js.
 *
 * The picker is a custom listbox (not a native <select>) because the collapsed
 * trigger only shows "<flag> <dial>", while the open list shows the full
 * "<flag> <name> (<dial>)" — a native <select> can't render different text for
 * its closed state vs its option list.
 */
export default function PhoneNumberInput({
    id,
    value,
    onChange,
    placeholder,
    autoComplete,
    required = false,
    disabled = false,
    defaultCountryIso = 'MA',
    boxClassName,
    selectClassName,
    inputClassName,
    leadingIcon = null,
}) {
    const [iso, setIso] = useState(() => splitPhoneValue(value, defaultCountryIso).iso);
    const [localNumber, setLocalNumber] = useState(() => splitPhoneValue(value, defaultCountryIso).number);
    const [listOpen, setListOpen] = useState(false);
    const pickerRef = useRef(null);

    // Resync when the parent externally resets the field back to empty (e.g. "send another message").
    useEffect(() => {
        if (value === '' && localNumber !== '') {
            setLocalNumber('');
            setIso(defaultCountryIso);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (!listOpen) return undefined;

        const onClick = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) setListOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setListOpen(false);
        };
        document.addEventListener('click', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [listOpen]);

    const emit = (nextIso, nextNumber) => {
        if (!nextNumber.trim()) {
            onChange('');
            return;
        }

        const dial = COUNTRY_CODES.find((c) => c.iso2 === nextIso)?.dial ?? '';
        onChange(`${dial} ${nextNumber.trim()}`);
    };

    const selectCountry = (nextIso) => {
        setIso(nextIso);
        setListOpen(false);
        emit(nextIso, localNumber);
    };

    const selectedDial = COUNTRY_CODES.find((c) => c.iso2 === iso)?.dial ?? '';

    return (
        <div className={boxClassName}>
            {leadingIcon}
            <div className="relative shrink-0" ref={pickerRef}>
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={listOpen}
                    aria-label="Country code"
                    disabled={disabled}
                    onClick={() => setListOpen((v) => !v)}
                    className={`inline-flex disabled:cursor-not-allowed items-center gap-1 whitespace-nowrap bg-transparent text-on-surface outline-none ${selectClassName}`}
                >
                    <span aria-hidden="true">{flagEmoji(iso)}</span>
                    <span>{selectedDial}</span>
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">expand_more</span>
                </button>
                {listOpen && (
                    <ul
                        role="listbox"
                        className="absolute start-0 top-full z-50 mt-space-2xs max-h-72 w-64 overflow-y-auto rounded-lg border border-outline-variant/40 bg-surface-container-lowest py-space-2xs shadow-lg"
                    >
                        {COUNTRY_CODES.map((c) => (
                            <li key={c.iso2} role="option" aria-selected={c.iso2 === iso}>
                                <button
                                    type="button"
                                    onClick={() => selectCountry(c.iso2)}
                                    className={`flex w-full items-center gap-space-xs px-space-sm py-space-2xs text-start font-body-sm text-body-sm hover:bg-surface-container-high ${c.iso2 === iso ? 'bg-surface-container-high' : ''}`}
                                >
                                    <span aria-hidden="true">{flagEmoji(c.iso2)}</span>
                                    <span className="min-w-0 flex-1 truncate text-on-surface">{c.name}</span>
                                    <span className="shrink-0 text-on-surface-variant">{c.dial}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <input
                id={id}
                type="tel"
                dir="ltr"
                inputMode="tel"
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                value={localNumber}
                placeholder={placeholder}
                onChange={(e) => {
                    setLocalNumber(e.target.value);
                    emit(iso, e.target.value);
                }}
                className={`focus:!border-transparent focus:!shadow-none focus:!outline-none focus:!ring-0 ${inputClassName}`}
            />
        </div>
    );
}
