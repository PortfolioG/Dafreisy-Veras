import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import { roles } from '../data/content'
import { Episode } from './About'

/** Experience as a Netflix "Originals" row: one episode card per role. */
export default function Work() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [open, setOpen] = useState<string | null>(null)
  const active = roles.find((r) => r.n === open)

  return (
    <section id="work" ref={ref} className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Episode n="04" label="Career Archive" />
          <h2 className="display mt-6 text-6xl leading-[0.9] md:text-8xl">
            <span data-mask className="mask"><span>Originals</span></span>
          </h2>
        </div>
        <span className="mono text-[0.6rem] uppercase tracking-[0.22em] text-mute" data-reveal>Archive_slots · {roles.length} episodes</span>
      </div>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((r, i) => (
          <li key={r.n} data-reveal data-delay={String((i % 3) * 0.08)}>
            <button onClick={() => setOpen(r.n)} data-cursor="view"
              className="card group block h-full w-full p-6 text-left transition-transform duration-500 hover:-translate-y-1.5 hover:border-white/20">
              <div className="flex items-center gap-3">
                <span className="mono text-[0.6rem] tracking-[0.2em] text-bone">S01 E{r.n}</span>
                <span className="mono text-[0.6rem] tracking-[0.1em] text-[#46d369]">{r.match}</span>
                <span className="badge !px-1.5 !py-0.5 !text-[0.5rem]">HD</span>
              </div>
              <p className="tag mt-6 inline-block">{r.category}</p>
              <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-bone">{r.title}</h3>
              <p className="mono mt-1 text-[0.58rem] uppercase tracking-[0.15em] text-mute">{r.company} · {r.period}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-bone-2">{r.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2 pr-6">
                {r.tags.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="card max-h-[85vh] w-full max-w-2xl overflow-y-auto p-7 md:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="mono text-[0.6rem] tracking-[0.2em] text-bone">S01 E{active.n}</span>
                  <span className="mono text-[0.6rem] text-[#46d369]">{active.match}</span>
                </div>
                <button onClick={() => setOpen(null)} className="mono text-[0.6rem] uppercase tracking-[0.2em] text-mute hover:text-bone">Close ✕</button>
              </div>
              <p className="tag mt-6 inline-block">{active.category}</p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-bone">{active.title}</h3>
              <p className="mono mt-1 text-[0.6rem] uppercase tracking-[0.15em] text-mute">{active.company} · {active.place} · {active.period}</p>
              <p className="mt-6 text-base leading-relaxed text-bone-2">{active.summary}</p>
              <ul className="mt-6 space-y-3">
                {active.points.map((p) => <li key={p} className="flex gap-3 text-sm leading-relaxed text-bone-2"><span className="text-accent">›</span>{p}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">{active.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
