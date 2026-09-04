import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

function base64ToUtf8(b64) {
  try {
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}

// Streams the PDF bytes from our own token-gated endpoint (never the raw
// storage URL) and reports download progress so a ~70MB file doesn't just
// look frozen on a slow connection.
async function fetchProtectedPdf(token, onProgress) {
  const res = await fetch(`/api/ebook-file?token=${encodeURIComponent(token)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'This link is invalid.');
  }

  const watermark = base64ToUtf8(res.headers.get('X-Ebook-Watermark') || '');
  const total = Number(res.headers.get('Content-Length')) || 0;

  if (!res.body) {
    return { buffer: new Uint8Array(await res.arrayBuffer()), watermark };
  }

  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total) onProgress(received / total);
  }
  const buffer = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  return { buffer, watermark };
}

function WatermarkOverlay({ text }) {
  if (!text) return null;
  const tiles = Array.from({ length: 24 });
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
        display: 'flex', flexWrap: 'wrap', alignContent: 'space-around', justifyContent: 'space-around',
        transform: 'rotate(-28deg) scale(1.4)', userSelect: 'none',
      }}
    >
      {tiles.map((_, i) => (
        <span key={i} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', margin: '18px 22px' }}>
          {text}
        </span>
      ))}
    </div>
  );
}

export default function EbookReader() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const [watermark, setWatermark] = useState('');
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [rendering, setRendering] = useState(false);

  const pdfRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Keep the raw file off the network entirely for anyone but this exact
  // buyer, and stop the everyday save/print/devtools shortcuts and
  // right-click menu — screen recording itself can't be blocked by any web
  // page, but nothing here makes it easy or leaves an unwatermarked copy.
  useEffect(() => {
    document.title = 'Behind the Field — Reader · KORE 360';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    const blockContextMenu = (e) => e.preventDefault();
    const blockKeys = (e) => {
      const k = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      if ((mod && ['s', 'p', 'u'].includes(k)) || (mod && e.shiftKey && ['i', 'j', 'c'].includes(k)) || k === 'f12') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('keydown', blockKeys);
    return () => {
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('This link is missing or incomplete.');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { buffer, watermark: wm } = await fetchProtectedPdf(token, (p) => {
          if (!cancelled) setProgress(p);
        });
        if (cancelled) return;
        setWatermark(wm);

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        if (cancelled) return;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMsg(err.message || 'Could not load the e-book.');
      }
    })();

    return () => { cancelled = true; };
  }, [token]);

  useEffect(() => {
    if (status !== 'ready' || !pdfRef.current) return;
    let cancelled = false;

    (async () => {
      setRendering(true);
      const page = await pdfRef.current.getPage(pageNum);
      if (cancelled) return;

      const containerWidth = Math.min(containerRef.current?.clientWidth || 800, 900);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const unscaled = page.getViewport({ scale: 1 });
      const fitScale = containerWidth / unscaled.width;
      const viewport = page.getViewport({ scale: fitScale * dpr });

      const canvas = canvasRef.current;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;

      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      if (!cancelled) setRendering(false);
    })();

    return () => { cancelled = true; };
  }, [status, pageNum]);

  return (
    <div
      style={{
        minHeight: '100vh', background: '#000000', color: '#fff', display: 'flex', flexDirection: 'column',
        userSelect: 'none', WebkitUserSelect: 'none',
      }}
    >
      <style>{'@media print { body { display: none !important; } }'}</style>

      <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', fontSize: '15px' }}>Behind the Field</div>
        {status === 'ready' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setPageNum((p) => Math.max(1, p - 1))}
              disabled={pageNum <= 1 || rendering}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', padding: '6px 12px', cursor: pageNum <= 1 ? 'default' : 'pointer', opacity: pageNum <= 1 ? 0.4 : 1 }}
            >
              ← Prev
            </button>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Page {pageNum} of {numPages}</span>
            <button
              onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
              disabled={pageNum >= numPages || rendering}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', padding: '6px 12px', cursor: pageNum >= numPages ? 'default' : 'pointer', opacity: pageNum >= numPages ? 0.4 : 1 }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <div ref={containerRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', overflow: 'auto' }}>
        {status === 'loading' && (
          <div style={{ textAlign: 'center', maxWidth: '320px' }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '14px' }}>Loading your e-book…</p>
            <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.round(progress * 100)}%`, background: 'var(--kore-gradient)', transition: 'width 0.2s ease' }} />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div style={{ textAlign: 'center', maxWidth: '360px' }}>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px' }}>{errorMsg}</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Use the link from your purchase email, or reply to it if the problem continues.</p>
          </div>
        )}

        {status === 'ready' && (
          <div style={{ position: 'relative', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', lineHeight: 0 }} onContextMenu={(e) => e.preventDefault()}>
            <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '4px' }} />
            <WatermarkOverlay text={watermark} />
          </div>
        )}
      </div>

      {status === 'ready' && (
        <div style={{ textAlign: 'center', padding: '10px 16px 18px', fontSize: '11.5px', color: 'rgba(255,255,255,0.35)' }}>
          This copy is licensed to {watermark.split(' · ')[1] || 'you'} — for your personal use only.
        </div>
      )}
    </div>
  );
}
