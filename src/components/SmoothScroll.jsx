import { useEffect } from 'react';

// Eases mouse-wheel/trackpad/touch scrolling with inertia across the whole site.
// Lenis drives native window scrolling, so position:fixed elements, anchor
// links and IntersectionObserver-based reveals keep working unchanged.
//
// Loaded via dynamic import rather than a static one — it's a cosmetic
// scroll-feel polish, not needed for first paint/interaction, so keeping it
// out of the initial JS bundle trims unused-JS weight off the critical path.
export default function SmoothScroll() {
  useEffect(() => {
    let lenis;
    let frameId;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, smoothTouch: false });
      const raf = (time) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
