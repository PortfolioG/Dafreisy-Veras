import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '../hooks/useLenis'
import { profile } from '../data/content'

const links = [
  ['About', '#about'], ['Experience', '#work'], ['Skills', '#skills'], ['Services', '#services'], ['Contact', '#contact'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const go = (h: string) => { setOpen(false); setTimeout(() => scrollTo(h), open ? 350 : 0) }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${scrolled ? 'border-b hairline bg-ink/70 backdrop-blur-md' : 'bg-transparent'}`}>
        <nav className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-14" aria-label="Primary">
          <button onClick={() => go('#top')} className="serif text-2xl italic tracking-tight" aria-label="Back to top">{profile.short}</button>
          <ul className="hidden items-center gap-9 md:flex">
            {links.map(([l, h]) => (
              <li key={h}>
                <button onClick={() => go(h)} className="group relative text-[0.7rem] uppercase tracking-[0.25em] text-bone-2 transition-colors hover:text-bone">
                  {l}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => go('#contact')} className="border border-bone/60 px-4 py-2 text-[0.7rem] uppercase tracking-[0.25em] transition-colors hover:bg-bone hover:text-ink">
                Let’s Work Together
              </button>
            </li>
          </ul>
          <button className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            <span className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[75] flex flex-col justify-end bg-ink px-6 pb-16 md:hidden">
            <ul className="space-y-4">
              {links.map(([l, h], i) => (
                <motion.li key={h} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <button onClick={() => go(h)} className="serif text-5xl font-medium tracking-tight">{l}</button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 border-t hairline pt-6 text-xs text-mute">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
