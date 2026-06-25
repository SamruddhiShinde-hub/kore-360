import { useEffect } from 'react';
import Lenis from 'lenis';

// Eases mouse-wheel/trackpad/touch scrolling with inertia across the whole site.
// Lenis drives native window scrolling, so position:fixed elements, anchor
// links and IntersectionObserver-based reveals keep working unchanged.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, smoothTouch: false });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
