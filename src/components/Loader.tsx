import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content'

const CRITICAL = ['./hero/seq/d00.webp', './hero/seq/m00.webp']

export default function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let loaded = 0
    const total = CRITICAL.length
    const bump = () => { loaded += 1; setP(Math.round((loaded / total) * 100)) }
    CRITICAL.forEach((src) => {
      const img = new Image()
      img.onload = bump; img.onerror = bump; img.src = src
    })
    const fallback = setTimeout(() => setP(100), 4000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (p < 100) return
    const t = setTimeout(() => { setGone(true); setTimeout(onDone, 500) }, 450)
    return () => clearTimeout(t)
  }, [p, onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="serif text-5xl italic tracking-tight md:text-6xl"
          >
            {profile.short}
          </motion.span>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="eyebrow mt-6">
            Loading experience
          </motion.p>
          <div className="mt-8 h-px w-40 bg-ink-3">
            <div className="h-full bg-bone transition-[width] duration-300" style={{ width: `${p}%` }} />
          </div>
          <span className="mt-3 text-[0.62rem] tabular-nums tracking-[0.3em] text-mute">{p.toString().padStart(3, '0')}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
