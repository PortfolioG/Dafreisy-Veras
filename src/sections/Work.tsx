import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { roles } from '../data/content'

export default function Work() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [open, setOpen] = useState<string | null>(roles[0].n)

  return (
    <section id="work" ref={ref} className="px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal>02 — Experience</p>
          <h2 className="serif mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl">
            <span data-mask className="mask"><span>Selected</span></span>
            <span data-mask className="mask"><span className="italic text-bone-2">roles.</span></span>
          </h2>
          <p className="mt-8 max-w-sm text-bone-2" data-reveal>
            From front desk to supervision — a record of taking on more responsibility and keeping operations steady while doing it.
          </p>
        </div>

        <ol className="lg:col-span-8">
          {roles.map((r) => {
            const isOpen = open === r.n
            return (
              <li key={r.n} className="border-t hairline last:border-b" data-reveal>
                <button
                  onClick={() => setOpen(isOpen ? null : r.n)}
                  data-cursor="view"
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-8 text-left md:grid-cols-[4rem_1fr_12rem_2rem]"
                >
                  <span className="text-xs tabular-nums text-mute">{r.n}</span>
                  <span>
                    <span className={`serif block text-3xl font-medium tracking-tight transition-transform duration-500 md:text-4xl ${isOpen ? 'translate-x-2' : 'group-hover:translate-x-2'}`}>
                      {r.title}
                    </span>
                    <span className="mt-1 block text-sm text-bone-2">{r.company} · {r.place}</span>
                  </span>
                  <span className="hidden text-xs uppercase tracking-[0.2em] text-mute md:block">{r.period}</span>
                  <ArrowUpRight size={18} className={`justify-self-end text-bone-2 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 pl-12 md:grid-cols-[1fr_1.4fr] md:pl-16">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-mute md:hidden">{r.period}</p>
                          <p className="mt-2 text-lg leading-relaxed text-bone md:mt-0">{r.summary}</p>
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {r.tags.map((t) => (
                              <li key={t} className="border hairline px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-bone-2">{t}</li>
                            ))}
                          </ul>
                        </div>
                        <ul className="space-y-3 text-sm leading-relaxed text-bone-2">
                          {r.points.map((p) => (
                            <li key={p} className="flex gap-4"><span className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />{p}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
