import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import Turntable, { type TurntableHandle } from '../components/Turntable'
import { scrollTo } from '../hooks/useLenis'
import { heroStats } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/** 360° rotation: 63 frames, front → side → back → side → front (last frame equals the first). */
const FRAME_COUNT = 63
const DESKTOP_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `./hero/seq/d${String(i).padStart(2, '0')}.webp`)
const MOBILE_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `./hero/seq/m${String(i).padStart(2, '0')}.webp`)

export default function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null)
  const handle = useRef<TurntableHandle | null>(null)
  const frames = useMemo(
    () => (window.innerWidth < 768 ? MOBILE_FRAMES : DESKTOP_FRAMES),
    [],
  )

  useEffect(() => {
    if (!started || !root.current) return
    const ctx = gsap.context(() => {
      // Pinned hero. Scroll progress maps 1:1 to the rotation frame (linear scrub):
      // scroll down rotates forward, scroll up rotates backward, 360° over the pin distance.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: '+=220%',
        pin: '.hero-stage',
        scrub: true,
        refreshPriority: 10,
        onUpdate: (self) => handle.current?.setProgress(self.progress),
      })
      gsap.to('.hero-stage', {
        opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: root.current, start: '+=190%', end: '+=220%', scrub: true },
      })
      // Text and indicator ease away as the rotation begins.
      gsap.to('.hero-copy', {
        opacity: 0, y: -30, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=45%', scrub: true },
      })
      gsap.to('.hero-hint', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=12%', scrub: true },
      })
      // Entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.hero-visual', { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 }, 0)
        .fromTo('[data-hero-mask] > *', { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.35)
        .fromTo('.hero-fade', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.9)
    }, root)
    return () => ctx.revert()
  }, [started])

  return (
    <section id="top" ref={root} className="relative" aria-label="Introduction">
      <div className="hero-stage relative h-[100svh] w-full overflow-hidden">
        {/* Visual — pure portrait, no overlays on the subject */}
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="hero-visual absolute inset-0 flex items-start justify-center pt-[9svh] md:items-end md:pt-0">
          <div className="hero-frame relative h-[64svh] w-full max-w-[min(92vw,54svh)] md:h-[92svh] md:max-w-[min(70vw,74svh)]" data-cursor="explore">
            <Turntable frames={frames} handleRef={handle} className="h-full w-full" />
          </div>
        </div>

        {/* Copy — placed around, never over the face */}
        <div className="hero-copy pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-6 pb-14 pt-24 md:px-10 md:pb-14 md:pt-28 lg:px-14">
          <div className="hidden gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-start">
            <div data-hero-mask className="mask justify-self-start">
              <span className="inline-flex items-center gap-3 border hairline px-3 py-2">
                <span className="tag !border-0 !bg-transparent !p-0">Netflix-Style Series</span>
                <span className="mono text-[0.6rem] tracking-[0.2em] text-mute">|</span>
                <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-bone-2">Seasons 2020 – 2026</span>
              </span>
            </div>
            <div />
            <div data-hero-mask className="mask flex gap-2 md:justify-end">
              <span className="badge">Office Manager</span>
              <span className="badge">Bilingual EN / ES</span>
            </div>
          </div>

          <div className="grid items-end gap-5 md:gap-8 md:grid-cols-[1.25fr_0.7fr_1.05fr]">
            <div>
              <div data-hero-mask className="mask mb-4">
                <span className="inline-flex items-center gap-3">
                  <span className="badge badge-red">Top Performer</span>
                  <span className="mono hidden text-[0.6rem] uppercase tracking-[0.22em] text-bone-2 md:inline">Administrative Operations Lead</span>
                </span>
              </div>
              <h1 className="display text-[15vw] leading-[0.86] md:text-[7.2vw]">
                <span data-hero-mask className="mask"><span>Dafreisy</span></span>
                <span data-hero-mask className="mask"><span className="text-accent">Veras.</span></span>
              </h1>
              <p className="hero-fade mono mt-4 hidden text-[0.62rem] uppercase tracking-[0.2em] text-mute md:block">
                {heroStats.join('  •  ')}
              </p>
            </div>
            <div />
            <div className="hero-fade pointer-events-auto flex flex-col gap-6 md:items-end md:text-right">
              <p className="hidden max-w-xs text-sm leading-relaxed text-bone-2 md:block">
                Keeping teams, records and days running well — six-plus years coordinating office operations, staff, scheduling and billing across healthcare and service teams.
              </p>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <button onClick={() => scrollTo('#work')} data-cursor="link" className="btn-red">View Experience</button>
                <button onClick={() => scrollTo('#contact')} data-cursor="link" className="btn-ghost">Contact Me</button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-hint absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 mono text-[0.58rem] uppercase tracking-[0.3em] text-mute">
          Scroll to explore <ArrowDown size={12} className="animate-bounce" />
        </div>
      </div>
    </section>
  )
}
