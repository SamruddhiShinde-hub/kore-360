import { LINKS } from '../data.js';
import { track } from '../lib/analytics.js';

// Hero CTA: opens WhatsApp with a pre-filled message, so the visitor only
// has to press send. `source` tells analytics which page it came from.
export const whatsappHref = (text) => `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`;

export default function WhatsAppCta({ text, source, label = 'Chat on WhatsApp', className = 'hx-btn hx-btn--primary' }) {
  return (
    <a
      href={whatsappHref(text)} target="_blank" rel="noopener noreferrer"
      className={`${className} hx-btn--wa`}
      onClick={() => track('whatsapp_click', { source })}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.79 14.06c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.23-3.28-.68-2.78-1.1-4.54-3.95-4.68-4.13-.13-.18-1.12-1.49-1.12-2.85 0-1.35.71-2.02.96-2.29.25-.27.55-.34.73-.34h.52c.17 0 .4-.06.62.48.24.56.8 1.94.87 2.08.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.28-.12.56.16.27.71 1.17 1.53 1.9 1.05.93 1.93 1.22 2.21 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.34Z" />
      </svg>
      {label}
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}
