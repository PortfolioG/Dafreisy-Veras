import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { stats, marquee, milestones, toolkit, education, certifications } from '../data/content'

export function Episode({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3" data-reveal>
      <span className="tag">Episode {n}</span>
      <span className="mono text-[0.6rem] text-mute">|</span>
      <span className="mono text-[0.6rem] uppercase tracking-[0.22em] text-bone-2">{label}</span>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="about" ref={ref} className="relative px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <Episode n="01" label="About the Manager" />
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-reveal>Episode synopsis</p>
          <h2 className="display mt-3 text-6xl leading-[0.9] md:text-8xl">
            <span data-mask className="mask"><span>Origin &amp;</span></span>
            <span data-mask className="mask"><span className="text-accent">Vision.</span></span>
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal data-delay={String(i * 0.08)}>
                <dt className="display text-5xl text-bone">{s.value}</dt>
                <dd className="mono mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-5 lg:col-span-7">
          <article className="card p-7 md:p-9" data-reveal>
            <div className="flex items-center justify-between">
              <span className="mono text-[0.6rem] uppercase tracking-[0.22em] text-accent">01</span>
              <span className="eyebrow">Cast &amp; Background</span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-bone md:text-lg">
              I am Dafreisy Veras, an office manager and administrative operations professional based in Lowell, Massachusetts, currently completing a B.S. in Business Administration at Southern New Hampshire University.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone-2 md:text-base">
              My work bridges the front desk and the leadership table: phones, schedules, records and billing on one side; coaching, coverage and quality on the other — translating a busy workplace into a calm, dependable one.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Office Operations', 'Staff Supervision', 'Records & Billing'].map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
          </article>

          <article className="card p-7 md:p-9" data-reveal data-delay="0.1">
            <div className="flex items-center justify-between">
              <span className="mono text-[0.6rem] uppercase tracking-[0.22em] text-accent">02</span>
              <span className="eyebrow">Milestones &amp; Accolades</span>
            </div>
            <ul className="mt-6 space-y-3">
              {milestones.map((m) => (
                <li key={m} className="flex gap-3 text-sm leading-relaxed text-bone-2"><span className="text-accent">›</span>{m}</li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 border-t hairline pt-5 sm:grid-cols-2">
              {education.map((e) => (
                <div key={e.degree}>
                  <p className="text-sm font-medium text-bone">{e.degree}</p>
                  <p className="mono mt-1 text-[0.58rem] uppercase tracking-[0.15em] text-mute">{e.school}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications.map((c) => <span key={c} className="badge">{c}</span>)}
            </div>
          </article>
        </div>
      </div>

      <div className="mt-16" data-reveal>
        <p className="mono text-[0.6rem] uppercase tracking-[0.22em] text-accent">// Season_01 Highlights</p>
        <h3 className="display mt-2 text-3xl md:text-4xl">Production Toolkit</h3>
        <p className="mt-2 max-w-md text-sm text-bone-2">Equipped with the systems that run a modern office and a clinical practice.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {toolkit.map((t) => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="overflow-hidden border-y hairline bg-ink-2 py-3" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="mono flex items-center gap-8 text-[0.62rem] uppercase tracking-[0.25em] text-bone-2">
            {m} <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
