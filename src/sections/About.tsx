import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { stats, marquee } from '../data/content'

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="about" ref={ref} className="relative border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal>01 — About</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="serif text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            <span data-mask className="mask"><span>More than an</span></span>
            <span data-mask className="mask"><span className="italic text-bone-2">office manager.</span></span>
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-bone-2" data-reveal>
              I run the operational side of a workplace so the people in it can do their best work — schedules that hold, records that are right, phones that get answered, and teams that know what is expected of them.
            </p>
            <p className="text-lg leading-relaxed text-bone-2" data-reveal data-delay="0.1">
              Over six years across healthcare and service businesses I’ve progressed from front desk to supervising a 30-plus person care team, with two promotions at Vitra Health inside a single year. I’m bilingual in English and Spanish and comfortable with billing, accounts payable, EHR systems and compliance.
            </p>
          </div>
          <div className="mt-16 h-px w-full origin-left bg-line" data-line />
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal data-delay={String(i * 0.08)}>
                <dt className="serif text-5xl font-medium tracking-tight md:text-6xl">{s.value}</dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="overflow-hidden border-y hairline py-6" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="serif flex items-center gap-10 text-3xl italic text-bone-2 md:text-4xl">
            {m} <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
