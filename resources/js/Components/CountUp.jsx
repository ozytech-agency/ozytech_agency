import { useEffect, useRef, useState } from 'react';

export default function CountUp({ target, prefix = '', suffix = '', decimals = 0, className = '' }) {
    const [value, setValue] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (!window.IntersectionObserver) {
            setStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setValue(target);
            return;
        }

        const duration = 1600;
        let start = null;
        let frame = requestAnimationFrame(function tick(now) {
            if (start === null) start = now;
            const progress = Math.min((now - start) / duration, 1);
            setValue(target * (1 - Math.pow(1 - progress, 3)));
            if (progress < 1) frame = requestAnimationFrame(tick);
        });
        return () => cancelAnimationFrame(frame);
    }, [started, target]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {value.toFixed(decimals)}
            {suffix}
        </span>
    );
}
