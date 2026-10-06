import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            // bootstrap/ssr is unwritable on this filesystem (a stray
            // directory entry left behind by a prior interrupted build
            // can't be removed by any tool — rm, PowerShell, icacls all
            // deny access). Building to a fresh directory name sidesteps
            // it; config/inertia.php points the SSR bundle detector here.
            ssrOutputDirectory: 'bootstrap/ssr-build',
            refresh: true,
        }),
        react(),
    ],
});
