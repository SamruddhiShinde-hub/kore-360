import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Loads the built stylesheet non-blocking, the same "print media, then
// swap on load" trick index.html already uses for the Google Font link —
// the CSS still applies before paint (React hasn't rendered yet at that
// point), but it no longer blocks the initial render on a network round trip.
function deferStylesheetPlugin() {
  return {
    name: 'defer-stylesheet',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+)">/,
        (match, href) =>
          `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), deferStylesheetPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
