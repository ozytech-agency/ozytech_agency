export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'font-body-sm text-body-sm text-error ' + className}
        >
            {message}
        </p>
    ) : null;
}
