import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import Turntable, { type TurntableHandle } from '../components/Turntable'
import { scrollTo } from '../hooks/useLenis'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/** Rotation frames: first and last must match. Replace with a dense sequence for a full turntable. */
const DESKTOP_FRAMES = ['./hero/front.webp', './hero/quarter.webp', './hero/front.webp']
const MOBILE_FRAMES = ['./hero/front-m.webp', './hero/quarter-m.webp', './hero/front-m.webp']

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
      // Scroll → rotation, pinned. Linear scrub so position maps 1:1 to scroll.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: '+=220%',
        pin: '.hero-stage',
        scrub: true,
        onUpdate: (self) => handle.current?.setProgress(self.progress),
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
        <div className="hero-visual absolute inset-0 flex items-start justify-center pt-[9svh] md:items-end md:pt-0">
          <div className="hero-frame relative h-[64svh] w-full max-w-[min(92vw,54svh)] md:h-[92svh] md:max-w-[min(70vw,74svh)]" data-cursor="explore">
            <Turntable frames={frames} handleRef={handle} className="h-full w-full" />
          </div>
        </div>

        {/* Copy — placed around, never over the face */}
        <div className="hero-copy pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-6 pb-14 pt-24 md:px-10 md:pb-14 md:pt-28 lg:px-14">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-start">
            <div data-hero-mask className="mask">
              <p className="eyebrow">Office Manager · Administrative Operations</p>
            </div>
            <div />
            <div data-hero-mask className="mask md:text-right">
              <p className="eyebrow">{profile.location}</p>
            </div>
          </div>

          <div className="grid items-end gap-5 md:gap-8 md:grid-cols-[1.2fr_0.8fr_1.2fr]">
            <div>
              <h1 className="serif text-[11.5vw] font-medium leading-[0.92] tracking-[-0.02em] md:text-[5.6vw]">
                <span data-hero-mask className="mask"><span>Keeping teams,</span></span>
                <span data-hero-mask className="mask"><span className="italic text-bone-2">records &amp; days</span></span>
                <span data-hero-mask className="mask"><span>running well.</span></span>
              </h1>
            </div>
            <div />
            <div className="hero-fade pointer-events-auto flex flex-col gap-6 md:items-end md:text-right">
              <p className="hidden max-w-xs text-sm leading-relaxed text-bone-2 md:block">
                Six-plus years coordinating office operations, staff, scheduling, records and billing across healthcare and service teams. Bilingual in English and Spanish.
              </p>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <button onClick={() => scrollTo('#work')} data-cursor="link"
                  className="group inline-flex items-center gap-3 border border-bone/80 px-5 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-bone hover:text-ink">
                  View Experience
                </button>
                <button onClick={() => scrollTo('#contact')} data-cursor="link"
                  className="inline-flex items-center gap-3 px-2 py-3 text-xs uppercase tracking-[0.22em] text-bone-2 transition-colors hover:text-bone">
                  Let’s Work Together
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-hint absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 text-[0.62rem] uppercase tracking-[0.3em] text-mute">
          Scroll to explore <ArrowDown size={12} className="animate-bounce" />
        </div>
      </div>
    </section>
  )
}
