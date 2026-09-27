import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/lib/translations';

const ZOOM_SCALE = 2.2;
const MAX_ZOOM = 3;
const MIN_ZOOM = 1;
const SWIPE_THRESHOLD = 50;
const DOUBLE_TAP_MS = 300;

function distance(a, b) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export default function ProjectGalleryCarousel({ images, title }) {
    const t = useTranslations();
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState(() => new Set());
    const [zoom, setZoom] = useState({ scale: MIN_ZOOM, originX: 50, originY: 50 });
    const viewportRef = useRef(null);
    const gestureRef = useRef(null);
    const lastTapRef = useRef(0);
    const handleTouchMoveRef = useRef(() => {});

    const total = images.length;
    const zoomed = zoom.scale > MIN_ZOOM;

    useEffect(() => {
        setZoom({ scale: MIN_ZOOM, originX: 50, originY: 50 });
    }, [index]);

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'ArrowLeft') {
                goTo(index - 1);
            } else if (e.key === 'ArrowRight') {
                goTo(index + 1);
            }
        }
        const el = viewportRef.current;
        el?.addEventListener('keydown', onKeyDown);
        return () => el?.removeEventListener('keydown', onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, total]);

    // React attaches JSX touch handlers as passive listeners, so
    // preventDefault() inside them can't block the page/sheet from
    // scrolling during a pan or swipe. Attaching natively with
    // `passive: false` is the only way to make it stick.
    useEffect(() => {
        const el = viewportRef.current;
        if (!el) {
            return;
        }
        const listener = (e) => handleTouchMoveRef.current(e);
        el.addEventListener('touchmove', listener, { passive: false });
        return () => el.removeEventListener('touchmove', listener);
    }, []);

    if (total === 0) {
        return null;
    }

    const goTo = (next) => {
        setIndex((current) => Math.min(Math.max(next, 0), total - 1));
    };

    const markLoaded = (src) => {
        setLoaded((prev) => new Set(prev).add(src));
    };

    const originFromPoint = (clientX, clientY) => {
        const rect = viewportRef.current.getBoundingClientRect();
        return {
            originX: Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
            originY: Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)),
        };
    };

    const toggleZoom = (clientX, clientY) => {
        if (zoomed) {
            setZoom({ scale: MIN_ZOOM, originX: 50, originY: 50 });
        } else {
            setZoom({ ...originFromPoint(clientX, clientY), scale: ZOOM_SCALE });
        }
    };

    const resetZoom = () => setZoom({ scale: MIN_ZOOM, originX: 50, originY: 50 });

    const handleDoubleClick = (e) => {
        toggleZoom(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
        if (!zoomed) {
            return;
        }
        setZoom((prev) => ({ ...prev, ...originFromPoint(e.clientX, e.clientY) }));
    };

    const handleMouseLeave = () => {
        if (zoomed) {
            resetZoom();
        }
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            gestureRef.current = {
                type: 'pinch',
                startDistance: distance(e.touches[0], e.touches[1]),
                startScale: zoom.scale,
            };
            return;
        }

        const touch = e.touches[0];
        const now = Date.now();
        const isDoubleTap = now - lastTapRef.current < DOUBLE_TAP_MS;
        lastTapRef.current = now;

        if (isDoubleTap) {
            toggleZoom(touch.clientX, touch.clientY);
            gestureRef.current = null;
            return;
        }

        gestureRef.current = zoomed
            ? { type: 'pan' }
            : { type: 'swipe', startX: touch.clientX, startY: touch.clientY, deltaX: 0 };
    };

    const handleTouchMove = (e) => {
        const gesture = gestureRef.current;
        if (!gesture) {
            return;
        }

        if (gesture.type === 'pinch' && e.touches.length === 2) {
            e.preventDefault();
            const newDistance = distance(e.touches[0], e.touches[1]);
            const scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, gesture.startScale * (newDistance / gesture.startDistance)));
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            setZoom({ ...originFromPoint(midX, midY), scale });
            return;
        }

        if (gesture.type === 'pan' && e.touches.length === 1) {
            e.preventDefault();
            const touch = e.touches[0];
            setZoom((prev) => ({ ...prev, ...originFromPoint(touch.clientX, touch.clientY) }));
            return;
        }

        if (gesture.type === 'swipe' && e.touches.length === 1) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - gesture.startX;
            const deltaY = touch.clientY - gesture.startY;
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
            }
            gestureRef.current = { ...gesture, deltaX };
        }
    };

    handleTouchMoveRef.current = handleTouchMove;

    const handleTouchEnd = () => {
        const gesture = gestureRef.current;
        if (gesture?.type === 'swipe') {
            if (gesture.deltaX > SWIPE_THRESHOLD) {
                goTo(index - 1);
            } else if (gesture.deltaX < -SWIPE_THRESHOLD) {
                goTo(index + 1);
            }
        }
        gestureRef.current = null;
    };

    return (
        <div className="flex flex-col gap-space-sm">
            <div
                ref={viewportRef}
                tabIndex={0}
                role="group"
                aria-roledescription="carousel"
                aria-label={title}
                className="group/gallery relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-container-high outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex h-full"
                    style={{
                        width: `${total * 100}%`,
                        transform: `translateX(-${(index * 100) / total}%)`,
                        transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                >
                    {images.map((img, i) => (
                        <div key={img.src} className="relative h-full shrink-0" style={{ width: `${100 / total}%` }}>
                            {!loaded.has(img.src) && (
                                <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-surface-container-high">
                                    <span className="material-symbols-outlined text-3xl text-outline">image</span>
                                </div>
                            )}
                            <img
                                src={img.src}
                                alt={img.alt ?? ''}
                                draggable={false}
                                loading={i === index ? 'eager' : 'lazy'}
                                decoding="async"
                                onLoad={() => markLoaded(img.src)}
                                onDoubleClick={i === index ? handleDoubleClick : undefined}
                                className="h-full w-full object-cover select-none"
                                style={
                                    i === index
                                        ? {
                                              transform: `scale(${zoom.scale})`,
                                              transformOrigin: `${zoom.originX}% ${zoom.originY}%`,
                                              transition: 'transform 200ms ease-out',
                                              cursor: zoomed ? 'zoom-out' : 'zoom-in',
                                          }
                                        : undefined
                                }
                            />
                        </div>
                    ))}
                </div>

                {index > 0 && (
                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        aria-label={t('services.work.prev_image')}
                        className="absolute left-space-sm top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-105"
                    >
                        <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </button>
                )}
                {index < total - 1 && (
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        aria-label={t('services.work.next_image')}
                        className="absolute right-space-sm top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-105"
                    >
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                    </button>
                )}

                {zoomed && (
                    <button
                        type="button"
                        onClick={resetZoom}
                        aria-label={t('services.work.reset_zoom')}
                        className="absolute right-space-sm top-space-sm flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
                    >
                        <span className="material-symbols-outlined text-lg">zoom_out</span>
                    </button>
                )}

                {total > 1 && (
                    <span
                        dir="ltr"
                        className="absolute bottom-space-sm left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-space-sm py-1 font-label-sm text-label-sm text-white backdrop-blur-sm"
                    >
                        {index + 1} / {total}
                    </span>
                )}
            </div>
        </div>
    );
}
