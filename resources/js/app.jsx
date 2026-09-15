import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

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

router.on('navigate', (event) => {
    const locale = event.detail.page.props.locale;
    if (!locale) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
});

createInertiaApp({
    title: (title) => (title ? title : 'OzyTech'),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
