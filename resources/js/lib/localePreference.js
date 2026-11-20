// The visitor's saved language. localStorage is the client-side record; the same value is
// mirrored into a cookie so the server can send the bare domain straight to that language
// (see RedirectToPreferredLocaleController) without rendering the wrong language first.

const STORAGE_KEY = 'ozytech-locale';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function readStorage() {
    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function writeStorage(locale) {
    try {
        window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
        // Storage can be blocked (private mode, site data disabled); the cookie still carries it.
    }
}

function readCookie(name) {
    const match = document.cookie.split('; ').find((part) => part.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name, locale) {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(locale)}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
}

/**
 * Saves a language the visitor picked; it then wins over browser detection on every later visit.
 */
export function rememberLocale(locale, { cookieName, availableLocales }) {
    if (!availableLocales.includes(locale)) return;

    writeStorage(locale);
    writeCookie(cookieName, locale);
}

/**
 * Keeps localStorage and the cookie in agreement on page load. localStorage wins, because it
 * holds the visitor's own choice; the cookie alone only exists after the server detected the
 * browser language on a first visit, and is copied into localStorage. Either one can be
 * missing after the visitor clears part of their site data.
 */
export function syncStoredLocale({ cookieName, availableLocales }) {
    const stored = readStorage();
    const fromCookie = readCookie(cookieName);
    const saved = availableLocales.includes(stored) ? stored : availableLocales.includes(fromCookie) ? fromCookie : null;

    if (!saved) return;

    if (stored !== saved) writeStorage(saved);
    if (fromCookie !== saved) writeCookie(cookieName, saved);
}
