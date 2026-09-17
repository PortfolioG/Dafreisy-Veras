import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CRITICAL = ['./hero/seq/d00.webp', './hero/seq/m00.webp']

export default function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let loaded = 0
    const total = CRITICAL.length
    const bump = () => { loaded += 1; setP(Math.round((loaded / total) * 100)) }
    CRITICAL.forEach((src) => { const img = new Image(); img.onload = bump; img.onerror = bump; img.src = src })
    const fallback = setTimeout(() => setP(100), 4000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (p < 100) return
    const t = setTimeout(() => { setGone(true); setTimeout(onDone, 500) }, 900)
    return () => clearTimeout(t)
  }, [p, onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: 'backOut' }}
            className="mb-4 h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_#e50914]" />
          <motion.h1 initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.32em' }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display text-5xl md:text-7xl">
            Dafreisy
          </motion.h1>
          <div className="mt-8 h-px w-48 bg-ink-3">
            <div className="h-full bg-accent shadow-[0_0_10px_#e50914] transition-[width] duration-300" style={{ width: `${p}%` }} />
          </div>
          <span className="mono mt-3 text-[0.6rem] tabular-nums tracking-[0.3em] text-mute">NOW LOADING · {p.toString().padStart(3, '0')}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
