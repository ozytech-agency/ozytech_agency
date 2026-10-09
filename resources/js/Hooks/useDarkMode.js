import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ozytech-theme';

export default function useDarkMode() {
    // Starts false to match the SSR markup; the saved theme (already applied
    // to <html> by the inline script in app.blade.php) is read after hydration.
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggle = useCallback(() => {
        const root = document.documentElement;
        root.classList.add('theme-transition');
        root.classList.toggle('dark');
        const nowDark = root.classList.contains('dark');
        root.style.colorScheme = nowDark ? 'dark' : 'light';
        setIsDark(nowDark);
        try {
            localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
        } catch (e) {}
        window.setTimeout(() => root.classList.remove('theme-transition'), 420);
    }, []);

    return [isDark, toggle];
}
