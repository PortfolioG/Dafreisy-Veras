import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { skills, services, why, education, certifications } from '../data/content'

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [active, setActive] = useState(0)
  return (
    <section id="skills" ref={ref} className="border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <p className="eyebrow" data-reveal>03 — Skills</p>
      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <ul className="lg:col-span-5">
          {skills.map((g, i) => (
            <li key={g.group} data-reveal data-delay={String(i * 0.05)}>
              <button
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                className={`serif block w-full py-2 text-left text-5xl font-medium tracking-[-0.02em] transition-all duration-500 md:text-7xl ${active === i ? 'translate-x-3 text-bone' : 'text-mute hover:text-bone-2'}`}
                aria-pressed={active === i}
              >
                {g.group}
              </button>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-7 lg:pt-4">
          <div className="h-px w-full origin-left bg-line" data-line />
          <ul key={active} className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {skills[active].items.map((s, i) => (
              <li key={s} className="animate-[fadeUp_0.6s_ease_both] border-b hairline pb-4 text-lg text-bone-2" style={{ animationDelay: `${i * 60}ms` }}>
                {s}
              </li>
            ))}
          </ul>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section id="services" ref={ref} className="border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal>04 — What I take care of</p>
          <h2 className="serif mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl">
            <span data-mask className="mask"><span>Let’s build an office</span></span>
            <span data-mask className="mask"><span className="italic text-bone-2">that runs itself.</span></span>
          </h2>
        </div>
        <ul className="grid lg:col-span-8 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.n} data-reveal data-delay={String((i % 2) * 0.1)}
              className="group border-t hairline p-8 transition-colors duration-500 hover:bg-ink-2 md:[&:nth-child(odd)]:border-r">
              <div className="flex items-baseline justify-between">
                <span className="text-xs tabular-nums text-mute">{s.n}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.25em] text-mute">{s.meta}</span>
              </div>
              <h3 className="serif mt-6 text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-bone-2">{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Why() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} className="border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <p className="eyebrow" data-reveal>05 — Why work with me</p>
      <ul className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {why.map((w, i) => (
          <li key={w.title} data-reveal data-delay={String((i % 3) * 0.08)}>
            <div className="h-px w-10 bg-accent" />
            <h3 className="serif mt-5 text-3xl font-medium tracking-tight">{w.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-2">{w.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Education() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} className="border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal>06 — Education & Credentials</p>
        </div>
        <div className="lg:col-span-8">
          <ul>
            {education.map((e) => (
              <li key={e.degree} data-reveal className="grid gap-2 border-t hairline py-8 md:grid-cols-[1fr_1fr]">
                <div>
                  <h3 className="serif text-3xl font-medium tracking-tight">{e.degree}</h3>
                  <p className="mt-1 text-bone-2">{e.school}</p>
                </div>
                <p className="text-sm leading-relaxed text-mute md:text-right">{e.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3" data-reveal>
            {certifications.map((c) => (
              <span key={c} className="border hairline px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-bone-2">{c}</span>
            ))}
            <span className="border hairline px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-bone-2">English & Spanish — Native</span>
          </div>
        </div>
      </div>
    </section>
  )
}
