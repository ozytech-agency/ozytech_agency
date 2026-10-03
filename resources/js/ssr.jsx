import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route } from 'ziggy-js';

createServer((page) => {
    // The browser gets route()/Ziggy from the @routes Blade script in
    // app.blade.php, which doesn't exist in this Node process — so every
    // component calling route() during render would throw. Rebuild the same
    // globals here from the `ziggy` prop shared by HandleInertiaRequests.
    const ziggyConfig = page.props.ziggy;
    globalThis.Ziggy = { ...ziggyConfig, location: new URL(ziggyConfig.location) };
    globalThis.route = (name, params, absolute) => route(name, params, absolute, globalThis.Ziggy);

    return createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? title : 'OzyTech'),
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.jsx`,
                import.meta.glob('./Pages/**/*.jsx'),
            ),
        setup: ({ App, props }) => <App {...props} />,
    });
});
