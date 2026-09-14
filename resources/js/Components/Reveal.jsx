import { useEffect, useRef, useState } from 'react';

/**
 * Fades and slides content in shortly after mount. Content is never left
 * hidden waiting on scroll position — sections far below the fold (or a
 * full-page capture taken right after load) must never render as a blank
 * gap, so this animates once on mount rather than gating visibility behind
 * an IntersectionObserver.
 */
export default function Reveal({ as: Tag = 'div', stagger = false, className = '', children, ...props }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (stagger) {
        return (
            <Tag ref={ref} className={className} {...props}>
                {Array.isArray(children)
                    ? children.map((child, i) => (
                          <div
                              key={i}
                              className="h-full transition-[opacity,transform] duration-500 ease-out"
                              style={{
                                  opacity: visible ? 1 : 0,
                                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                                  transitionDelay: visible ? `${Math.min(i * 70, 500)}ms` : '0ms',
                              }}
                          >
                              {child}
                          </div>
                      ))
                    : children}
            </Tag>
        );
    }

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)',
            }}
            {...props}
        >
            {children}
        </Tag>
    );
}
