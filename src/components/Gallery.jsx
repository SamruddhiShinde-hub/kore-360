import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { track } from '../lib/analytics.js';

// Image (or a labelled stand-in while a project still lacks the shot).
export function Media({ img, className = '', sizes, eager = false, style }) {
  if (!img?.src) {
    return <div className={`wk-missing ${className}`.trim()} style={style} aria-hidden="true"><span>{img?.caption || 'Photo needed'}</span></div>;
  }
  return (
    <img
      src={img.src}
      srcSet={img.srcSmall ? `${img.srcSmall} 800w, ${img.src} ${img.w}w` : undefined}
      sizes={img.srcSmall ? sizes : undefined}
      alt={img.alt}
      width={img.w} height={img.h}
      loading={eager ? 'eager' : 'lazy'} decoding="async"
      className={className}
      style={{ objectPosition: img.focal, ...style }}
    />
  );
}

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

// Full-screen viewer. The open photo lives in the URL (?photo=3), so:
// opening pushes one history entry, stepping between photos replaces it,
// and the browser's Back button closes the viewer instead of leaving the page.
function Lightbox({ images, index, onClose, onStep, label }) {
  const panelRef = useRef(null);
  const touch = useRef(null);
  const img = images[index];

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    panelRef.current?.querySelector('.wk-lb-close')?.focus();
    return () => { html.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onStep(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onStep(-1); }
      else if (e.key === 'Tab') {
        const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  // Warm the neighbours so stepping feels instant.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const n = images[(i + images.length) % images.length];
      if (n?.src) { const pre = new Image(); pre.src = n.src; }
    });
  }, [index, images]);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
  };

  const caption = img.caption || img.alt;
  return (
    <div className="wk-lb" role="dialog" aria-modal="true" aria-label={`${label}: photo ${index + 1} of ${images.length}`} ref={panelRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button type="button" className="wk-lb-close" onClick={onClose} aria-label="Close full-screen gallery">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
      <figure className="wk-lb-figure">
        {img.src
          ? <img key={img.src} src={img.src} alt={img.alt} className="wk-lb-img" />
          : <div className="wk-missing wk-lb-img wk-lb-missing" aria-hidden="true"><span>{img.caption || 'Photo needed'}</span></div>}
        <figcaption className="wk-lb-caption">
          <span className="wk-lb-count">{index + 1} / {images.length}</span>
          {caption && <span aria-live="polite">{caption}</span>}
        </figcaption>
      </figure>
      {images.length > 1 && (
        <>
          <button type="button" className="wk-lb-nav wk-lb-prev" onClick={() => onStep(-1)} aria-label="Previous photo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="wk-lb-nav wk-lb-next" onClick={() => onStep(1)} aria-label="Next photo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </>
      )}
    </div>
  );
}

// Thumbnail grid + viewer. `images` are already in presentation order;
// the first (lead) image spans the full row.
export default function Gallery({ images, label, id = 'gallery' }) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const thumbs = useRef([]);
  const raw = Number(params.get('photo'));
  const open = Number.isInteger(raw) && raw >= 1 && raw <= images.length ? raw - 1 : -1;
  const lastOpen = useRef(-1);

  const show = (i) => {
    const next = new URLSearchParams(params);
    next.set('photo', String(i + 1));
    setParams(next, { state: { lightbox: true }, preventScrollReset: true });
    track('select_content', { content_type: 'gallery_photo', item_id: `${label} #${i + 1}` });
  };

  const step = useCallback((d) => {
    const next = new URLSearchParams(params);
    next.set('photo', String(((open + d + images.length) % images.length) + 1));
    setParams(next, { replace: true, state: location.state, preventScrollReset: true });
  }, [params, open, images.length, setParams, location.state]);

  // Opened from the grid: go back (so Back/forward stay in step). Opened
  // from a shared link: just drop the param.
  const close = useCallback(() => {
    if (location.state?.lightbox) navigate(-1);
    else {
      const next = new URLSearchParams(params);
      next.delete('photo');
      setParams(next, { replace: true, preventScrollReset: true });
    }
  }, [location.state, navigate, params, setParams]);

  // Return focus to the thumbnail of the photo that was last on screen.
  useEffect(() => {
    if (open >= 0) lastOpen.current = open;
    else if (lastOpen.current >= 0) { thumbs.current[lastOpen.current]?.focus({ preventScroll: true }); lastOpen.current = -1; }
  }, [open]);

  if (!images.length) return null;
  return (
    <>
      <ul className="wk-gallery" id={id}>
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`} className={i === 0 ? 'is-lead' : ''}>
            <button type="button" ref={(el) => { thumbs.current[i] = el; }} className="wk-thumb" onClick={() => show(i)} aria-label={`Open photo ${i + 1} of ${images.length} full screen${img.caption ? `: ${img.caption}` : ''}`}>
              <Media img={img} sizes={i === 0 ? '(max-width: 980px) 100vw, 1200px' : '(max-width: 700px) 100vw, 600px'} />
              <span className="wk-thumb-zoom" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              </span>
            </button>
            {img.caption && <p className="wk-thumb-caption">{img.caption}</p>}
          </li>
        ))}
      </ul>
      {open >= 0 && <Lightbox images={images} index={open} onClose={close} onStep={step} label={label} />}
    </>
  );
}
