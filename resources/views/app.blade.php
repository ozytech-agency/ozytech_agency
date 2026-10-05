<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#faf8ff">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

        {{-- Font Awesome is only used for a handful of icons (social links, the tech
             marquee). Loading it as a render-blocking stylesheet delays first paint
             for icons that are not needed for the critical path, so it's fetched
             with the standard preload-then-swap pattern instead; the <noscript>
             fallback keeps icons working with JavaScript disabled. --}}
        <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></noscript>

        <link rel="icon" type="image/png" href="/images/favicon.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Prevent a light/dark flash before React mounts -->
        <script>
            (function () {
                try {
                    var v = localStorage.getItem('ozytech-theme');
                    var d = v ? v === 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    if (d) {
                        document.documentElement.classList.add('dark');
                        document.documentElement.style.colorScheme = 'dark';
                    }
                } catch (e) {}
            }());
        </script>

        <!-- Scripts -->
        @routes
        <script>
            /* Expose the Ziggy config on window so the app bundle (an ES module,
               which can't see the plain `const Ziggy` from the classic script
               above) can keep Ziggy.defaults.locale in sync on client-side
               Inertia navigations — see the router.on('navigate') listener in
               resources/js/app.jsx. Without this, route() calls that omit an
               explicit locale silently fall back to the locale of the very
               first full page load, not the current one. */
            window.Ziggy = Ziggy;
        </script>
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-primary">
        @inertia
    </body>
</html>
