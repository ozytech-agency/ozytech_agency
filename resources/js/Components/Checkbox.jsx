export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-outline-variant text-accent2 focus:ring-secondary-container ' +
                className
            }
        />
    );
}
