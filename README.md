# KORE 360 — React site

The KORE 360 website rebuilt as a clean React (Vite) project. Same design as your
Claude Design export, now component-based and easy to maintain.

## Run it on your computer

You need Node.js installed (https://nodejs.org — get the "LTS" version).
Then, in this folder:

```bash
npm install      # one time, downloads dependencies
npm run dev      # starts a local preview at http://localhost:5173
```

Open the link it prints. The page reloads automatically as you edit.

## Where to change things

- **All your text, prices and links:** `src/data.js` — this is the one file you'll
  edit most. Change session prices, course names, links, etc. here.
- **Hero layout:** in `src/data.js`, set `HERO_VARIANT` to `'split'`, `'centered'`,
  or `'editorial'`.
- **Accent colour:** `ACCENT` in `src/data.js`.
- **Images:** the `IMAGES` object in `src/data.js` currently uses placeholder photos.
  Replace those URLs with your own (either hosted image links, or drop image files in
  a `public/` folder and reference them like `/my-photo.jpg`).
- **Section layout/styling:** the `src/components/` folder, one file per section
  (Nav, Hero, Sessions, Courses, Careers, Events, About, Footer).

## Put it live on Vercel (via GitHub)

1. Push this whole folder to a GitHub repo (you can drag-and-drop the files in the
   GitHub web uploader, **but do not upload the `node_modules` folder** — it's huge
   and unnecessary; the `.gitignore` already excludes it if you use git properly).
2. In Vercel: **Add New → Project → Import** your repo.
3. Vercel auto-detects Vite/React. Confirm the settings (Build command `npm run build`,
   Output directory `dist`) and click **Deploy**.
4. Every future push to GitHub redeploys automatically.

## Build it yourself (optional)

```bash
npm run build    # outputs a production site into the dist/ folder
npm run preview  # preview that production build locally
```
