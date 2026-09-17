import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { testimonials } from '../data/content'

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  if (testimonials.length === 0) return null
  return (
    <section ref={ref} className="border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14" aria-label="Testimonials">
      <p className="eyebrow" data-reveal>Testimonials</p>
      <ul className="mt-12 grid gap-12 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <li key={t.name} data-reveal data-delay={String((i % 2) * 0.1)} className="border-l hairline pl-8">
            <blockquote className="serif text-2xl leading-snug tracking-tight md:text-3xl">“{t.quote}”</blockquote>
            <footer className="mt-6 text-xs uppercase tracking-[0.2em] text-mute">{t.name} · {t.role}</footer>
          </li>
        ))}
      </ul>
    </section>
  )
}
