export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:border-secondary-container hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-container/50 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
