# Dafreisy Veras — Portfolio

Premium editorial portfolio built from the "Premium 360° Portfolio" master prompt, adapted for an office manager / administrative operations professional.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Framer Motion · Lucide.

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```
Deploy `dist/` to Vercel (or any static host). `vite.config.ts` uses `base: './'` so it also works from a sub-path.

## Hero turntable
`src/components/Turntable.tsx` is a scroll-driven canvas frame-sequence player. `src/sections/Hero.tsx` maps scroll progress (pinned, `end: '+=220%'`) linearly onto 63 rotation frames in `public/hero/seq/` (`d00–d62` desktop 720×912, `m00–m62` mobile 400×507). Frame 0 and frame 62 are identical, so a full scroll returns exactly to the start pose. The first frame paints immediately; the rest stream in.

The frames were extracted from an AI-generated camera-orbit clip of the original portrait (`_source/turntable.mp4`, not committed). To re-generate: produce a 5 s 360° orbit clip, extract with `ffmpeg -i clip.mp4 f%03d.png`, take every 2nd frame, append frame 1, resize and save as WebP with the same names.

## Tests
End-to-end tests (Playwright) cover metadata, asset delivery, the 360° turntable range, the skills deck fan, the mobile swipe row, role dialogs and the contact form.
```bash
npx playwright install chromium   # once
npm test                          # builds, serves and runs desktop + mobile projects
```
CI (`.github/workflows/ci.yml`) runs type-check, lint and the suite on every push to `main` and on pull requests.

## Content
All copy, roles, skills, services, education and contact details live in `src/data/content.ts`. Add a LinkedIn URL to `profile.linkedin` to enable the LinkedIn links.
