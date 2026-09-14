export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg border border-transparent bg-error px-space-lg py-space-sm font-label-md text-label-md text-on-error transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-error/50 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
