import { useEffect, useRef } from 'react';
import { useTranslations } from '@/lib/translations';

const TECHS = [
    ['fa-brands fa-shopify', 'Shopify'],
    ['fa-brands fa-wordpress', 'WordPress'],
    ['fa-brands fa-node-js', 'Node.js'],
    ['fa-solid fa-database', 'MySQL'],
    ['fa-brands fa-php', 'PHP'],
    ['fa-brands fa-laravel', 'Laravel'],
    ['fa-brands fa-react', 'React'],
    ['fa-brands fa-figma', 'Figma'],
    ['fa-brands fa-java', 'Java'],
    ['fa-brands fa-git', 'Git'],
    ['fa-brands fa-js', 'JavaScript'],
    ['fa-solid fa-brain', 'Claude'],
    ['fa-brands fa-python', 'Python'],
    ['fa-brands fa-docker', 'Docker'],
    ['fa-brands fa-github', 'GitHub'],
];

function TechGroup({ hidden }) {
    return (
        <div className="flex items-center gap-[4.32rem]" aria-hidden={hidden}>
            {TECHS.map(([icon, label]) => (
                <span key={label} aria-label={label} className="flex items-center justify-center text-on-surface">
                    <i className={`${icon} text-3xl text-on-surface scale-[1.5]`} aria-hidden="true"></i>
                </span>
            ))}
        </div>
    );
}

export default function TechMarquee() {
    const t = useTranslations();
    const trackRef = useRef(null);
    const offsetRef = useRef(0);
    const lastScrollYRef = useRef(0);
    const tickingRef = useRef(false);

    useEffect(() => {
        lastScrollYRef.current = window.scrollY;

        const applyScroll = () => {
            tickingRef.current = false;

            const track = trackRef.current;
            if (!track) return;

            const scrollY = window.scrollY;
            const delta = scrollY - lastScrollYRef.current;
            lastScrollYRef.current = scrollY;

            const groupWidth = track.scrollWidth / 2;
            if (groupWidth <= 0) return;

            let next = (offsetRef.current - delta) % groupWidth;
            if (next > 0) next -= groupWidth;
            if (next < -groupWidth) next += groupWidth;

            offsetRef.current = next;
            track.style.transform = `translateX(${next}px)`;
        };

        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(applyScroll);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section className="border-y border-surface-container bg-surface py-space-xl" aria-label="Technologies Ozytech Agency works with">
            <div className="flex justify-center px-gutter-mobile lg:px-gutter-desktop mb-[40px]">
                <span className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-space-md py-space-2xs font-label-sm text-label-sm uppercase tracking-widest text-secondary-container shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-accent2 animate-pulse" aria-hidden="true"></span> {t('home.tech_marquee.badge')}
                </span>
            </div>
            <div className="overflow-x-clip overflow-y-visible" dir="ltr">
                <div ref={trackRef} className="tech-marquee-track flex w-max items-center gap-[4.32rem]">
                    <TechGroup hidden={false} />
                    <TechGroup hidden={true} />
                </div>
            </div>
        </section>
    );
}
