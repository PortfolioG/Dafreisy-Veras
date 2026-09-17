import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import { skillDeck, services, why } from '../data/content'
import { Episode } from './About'

gsap.registerPlugin(ScrollTrigger)

/**
 * Skills deck: pinned section, cards travel horizontally with scroll past a giant
 * outlined "SKILLS" wordmark. The card nearest the centre stands upright at full
 * size; neighbours tilt away and recede, so the deck reads as a hand of cards.
 */
export function Skills() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = root.current, el = track.current
    if (!section || !el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const layout = () => {
        const vw = section.clientWidth
        const cw = cards[0].offsetWidth
        const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0
        const step = cw + gap
        return { start: vw / 2 - cw / 2, dist: step * (cards.length - 1), step }
      }
      let L = layout()
      const setX = gsap.quickSetter(el, 'x', 'px')
      const place = (p: number) => {
        const x = L.start - p * L.dist
        setX(x)
        const centre = section.clientWidth / 2
        cards.forEach((c, i) => {
          const cx = x + i * L.step + c.offsetWidth / 2
          const d = (cx - centre) / L.step          // -n .. n, 0 = centred
          const t = Math.max(-1.6, Math.min(1.6, d))
          gsap.set(c, {
            rotation: t * 9,
            y: Math.abs(t) * 46,
            scale: 1 - Math.min(Math.abs(t), 1.6) * 0.09,
            opacity: 1 - Math.min(Math.abs(t), 1.6) * 0.32,
            zIndex: 100 - Math.round(Math.abs(t) * 10),
            transformOrigin: '50% 120%',
          })
        })
      }
      place(0)
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${L.dist + section.clientHeight * 0.6}`,
        pin: true,
        scrub: 0.6,
        refreshPriority: -1,
        onUpdate: (self) => place(self.progress),
        onRefreshInit: () => { L = layout() },
        onRefresh: (self) => place(self.progress),
      })
      return () => st.kill()
    })

    // Mobile: a plain horizontal swipe row, no pin.
    mm.add('(max-width: 767px)', () => {
      gsap.set(el, { x: 0 })
      cards.forEach((c) => gsap.set(c, { clearProps: 'transform,opacity,zIndex' }))
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="skills" ref={root} className="relative overflow-hidden bg-ink py-20 md:h-[100svh] md:py-0" aria-label="Skills">
      {/* ambient red bloom + outlined wordmark, as on the reference */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[70%] w-[60%] rounded-full bg-accent/15 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="outline-word text-[42vw] md:text-[30vw]">Skills</span>
      </div>

      <div className="relative px-6 md:absolute md:left-10 md:top-10 lg:left-14">
        <Episode n="03" label="Core Skills" />
      </div>

      <div ref={track}
        className="relative mt-10 flex gap-6 overflow-x-auto px-6 pb-6 md:absolute md:left-0 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:gap-8 md:overflow-visible md:px-0 md:pb-0"
        style={{ scrollSnapType: 'x mandatory' }}>
        {skillDeck.map((k, i) => (
          <article key={k.title}
            className="card w-[82vw] shrink-0 p-7 md:w-[440px] md:p-9"
            style={{ scrollSnapAlign: 'center' }}
            data-cursor="view">
            <div className="flex items-center justify-between">
              <span className="tag">{k.label}</span>
              <span className="mono text-[0.58rem] tracking-[0.2em] text-mute">[ {String(i + 1).padStart(2, '0')} / {String(skillDeck.length).padStart(2, '0')} ]</span>
            </div>
            <h3 className="mt-16 text-3xl font-bold leading-tight tracking-tight text-bone md:mt-20 md:text-[2.1rem]">{k.title}</h3>
            <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-bone-2">{k.desc}</p>
            <div className="mt-10 flex flex-wrap gap-2 pr-6">
              {k.chips.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Services() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="services" ref={ref} className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <Episode n="02" label="Core Competencies" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow" data-reveal>Director’s cut</p>
          <h2 className="display mt-3 text-6xl leading-[0.9] md:text-8xl">
            <span data-mask className="mask"><span>Operational</span></span>
            <span data-mask className="mask"><span className="text-accent">Capabilities.</span></span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-bone-2 lg:col-span-5 lg:justify-self-end" data-reveal>
          Merging front-office operations, team supervision and finance coordination into workplaces that run without drama.
        </p>
      </div>

      <div className="mt-12 grid gap-5">
        {services.map((s, i) => (
          <article key={s.n} className="card grid gap-6 p-7 transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[1fr_1.4fr] md:p-9" data-reveal data-delay={String(i * 0.05)}>
            <div>
              <div className="flex items-center justify-between md:block">
                <span className="tag">{s.meta}</span>
                <span className="display text-3xl text-mute md:absolute md:right-9 md:top-8">{s.n}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight text-bone md:mt-12 md:text-3xl">{s.title}</h3>
            </div>
            <p className="self-center text-sm leading-relaxed text-bone-2 md:pr-10">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Why() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <p className="mono text-[0.6rem] uppercase tracking-[0.22em] text-accent" data-reveal>// Why work with me</p>
      <h2 className="display mt-3 text-5xl md:text-7xl" data-reveal>Engineered for reliability.</h2>
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {why.map((w, i) => (
          <li key={w.title} className="card p-7" data-reveal data-delay={String((i % 3) * 0.08)}>
            <span className="mono text-[0.58rem] tracking-[0.2em] text-mute">[ {String(i + 1).padStart(2, '0')} ]</span>
            <h3 className="mt-6 text-xl font-bold tracking-tight text-bone">{w.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-2">{w.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
