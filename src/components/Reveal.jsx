import { useRef, useEffect, useState } from 'react';

// Wraps content and fades/slides it in when it scrolls into view.
// `delay` staggers the animation (matches the export's data-reveal-delay).
export default function Reveal({ children, delay = 0, className = '', style, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay * 90}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
