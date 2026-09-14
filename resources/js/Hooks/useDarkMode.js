import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ozytech-theme';

export default function useDarkMode() {
    const [isDark, setIsDark] = useState(
        () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
    );

    useEffect(() => {
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    }, [isDark]);

    const toggle = useCallback(() => {
        const root = document.documentElement;
        root.classList.add('theme-transition');
        root.classList.toggle('dark');
        const nowDark = root.classList.contains('dark');
        setIsDark(nowDark);
        try {
            localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
        } catch (e) {}
        window.setTimeout(() => root.classList.remove('theme-transition'), 420);
    }, []);

    return [isDark, toggle];
}
