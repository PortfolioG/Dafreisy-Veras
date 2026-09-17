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
`src/components/Turntable.tsx` is a scroll-driven canvas frame-sequence player. `src/sections/Hero.tsx` lists the frames:
```ts
const DESKTOP_FRAMES = ['./hero/front.webp']
```
The hero currently uses a single portrait (pinned, with a subtle scroll drift). For a true 360° rotation, drop a dense sequence (e.g. 48–72 frames, same crop/scale, last frame = first) into `public/hero/` and list them in that array — nothing else changes. The pinned scroll distance is `end: '+=120%'` in `Hero.tsx`.

## Content
All copy, roles, skills, services, education and contact details live in `src/data/content.ts`. Add a LinkedIn URL to `profile.linkedin` to enable the LinkedIn links.
