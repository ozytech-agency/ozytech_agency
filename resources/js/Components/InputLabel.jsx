export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block font-label-md text-label-md text-on-surface ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
