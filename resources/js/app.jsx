import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { syncStoredLocale } from './lib/localePreference';

// Keep Ziggy's default route parameters in sync with the current page's
// locale. Ziggy.defaults is only ever set once, from the server, on the very
// first full page load — client-side Inertia navigations never refresh it,
// so any route(name) call that omits an explicit `locale` (most nav links
// do) would otherwise keep resolving to that first locale forever,
// regardless of which locale is actually being browsed. This must run in
// beforeUpdate (fired just before Inertia swaps in the new page props) and
// not navigate (fired after React has already re-rendered with them),
// otherwise components that compute a route() href during that render
// (e.g. every <Link> in the header/footer) would still see the stale value.
router.on('beforeUpdate', (event) => {
    const locale = event.detail.page.props.locale;
    if (!locale || !window.Ziggy) return;
    window.Ziggy.defaults = { ...window.Ziggy.defaults, locale };
});

// Stops images being dragged out of the site in every browser (the CSS rule in app.css
// doesn't cover Firefox). Images inside the rich-text editor can still be moved.
document.addEventListener('dragstart', (event) => {
    if (event.target instanceof HTMLImageElement && !event.target.closest('[contenteditable="true"]')) {
        event.preventDefault();
    }
});

// Runs once, on the first full page load: repairs the saved language if the visitor cleared
// either localStorage or the cookie, so the bare domain keeps honouring their choice.
const stopLocaleSync = router.on('navigate', (event) => {
    stopLocaleSync();
    const { locale_cookie: cookieName, available_locales: availableLocales } = event.detail.page.props;
    if (cookieName && availableLocales) syncStoredLocale({ cookieName, availableLocales });
});

// Inertia fires `navigate` on the first page load and on every client-side visit, so this
// counts each page once; app.blade.php only initialises the Meta Pixel when it is configured.
router.on('navigate', () => {
    window.fbq?.('track', 'PageView');
});

router.on('navigate', (event) => {
    const locale = event.detail.page.props.locale;
    if (!locale) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
});

createInertiaApp({
    title: (title) => (title ? title : 'Ozytech Agency'),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        // Without server-rendered markup (SSR down), hydrating an empty
        // container throws a hydration error and React re-renders anyway.
        if (el.hasChildNodes()) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }
    },
    progress: {
        color: '#4B5563',
    },
});
