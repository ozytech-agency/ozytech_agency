import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export function Field({ label, name, error, help, required = false, children }) {
    return (
        <div>
            {label && (
                <InputLabel htmlFor={name}>
                    {label}
                    {required && <span className="ms-1 text-error">*</span>}
                </InputLabel>
            )}
            {children}
            {help && <p className="mt-1 font-body-sm text-body-sm text-outline">{help}</p>}
            <InputError className="mt-1" message={error} />
        </div>
    );
}

export function TextField({ label, name, value, onChange, error, help, required = false, type = 'text', ...props }) {
    return (
        <Field label={label} name={name} error={error} help={help} required={required}>
            <TextInput id={name} name={name} type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="mt-1 block w-full" {...props} />
        </Field>
    );
}

export function Section({ title, children, actions }) {
    return (
        <section className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg">
            {(title || actions) && (
                <div className="mb-space-md flex items-center justify-between gap-space-sm">
                    {title && <h2 className="font-label-md text-label-md uppercase tracking-wider text-secondary">{title}</h2>}
                    {actions}
                </div>
            )}
            <div className="flex flex-col gap-space-md">{children}</div>
        </section>
    );
}

export function StatusBadge({ tone = 'neutral', children }) {
    const tones = {
        success: 'bg-secondary-container/15 text-secondary',
        warning: 'bg-accent2/15 text-accent2',
        neutral: 'bg-surface-container-high text-on-surface-variant',
    };

    return <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-label-sm text-[11px] font-bold uppercase tracking-wider ${tones[tone]}`}>{children}</span>;
}

// Move up / move down / remove controls for a row in a repeatable list.
export function RowControls({ index, count, onMove, onRemove, labels }) {
    const buttonClasses = 'flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface disabled:opacity-30';

    return (
        <div className="flex shrink-0 items-center gap-1">
            <button type="button" className={buttonClasses} disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label={labels.up}>
                <span className="material-symbols-outlined text-lg">arrow_upward</span>
            </button>
            <button type="button" className={buttonClasses} disabled={index === count - 1} onClick={() => onMove(index, index + 1)} aria-label={labels.down}>
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
            </button>
            <button type="button" className={`${buttonClasses} hover:text-error`} onClick={() => onRemove(index)} aria-label={labels.remove}>
                <span className="material-symbols-outlined text-lg">delete</span>
            </button>
        </div>
    );
}
