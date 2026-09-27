// Helpers for the admin forms, whose data is nested (e.g. features.2.text.ar).

export const CONTENT_LOCALES = ['en', 'ar', 'fr', 'es'];

export function emptyLocalized() {
    return { en: '', ar: '', fr: '', es: '' };
}

// Fill missing locales so every input stays controlled.
export function localizedOrEmpty(value) {
    return { ...emptyLocalized(), ...(value ?? {}) };
}

export function getIn(object, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), object);
}

export function setIn(object, path, value) {
    const [key, ...rest] = path.split('.');
    const clone = Array.isArray(object) ? [...object] : { ...(object ?? {}) };
    clone[key] = rest.length ? setIn(clone[key], rest.join('.'), value) : value;
    return clone;
}

export function moveItem(list, from, to) {
    if (to < 0 || to >= list.length) return list;
    const next = [...list];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
}

export function slugify(value) {
    return (value ?? '')
        .toString()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// "2026-09-26T21:00:00+00:00" -> "2026-09-26T21:00" in the browser's timezone, for <input type="datetime-local">.
export function toDateTimeLocal(iso) {
    if (!iso) return '';
    const date = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Back from the browser's local time to an ISO string the server can parse unambiguously.
export function fromDateTimeLocal(value) {
    return value ? new Date(value).toISOString() : null;
}
