import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [mode, setMode] = useState<'default' | 'link' | 'label'>('default')

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('has-cursor')
    const xD = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const yD = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    const xR = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3' })
    const yR = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e: MouseEvent) => { xD(e.clientX); yD(e.clientY); xR(e.clientX); yR(e.clientY) }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button')
      if (!t) { setMode('default'); setLabel(''); return }
      const c = t.dataset.cursor
      if (c === 'view') { setMode('label'); setLabel('View') }
      else if (c === 'explore') { setMode('label'); setLabel('Explore') }
      else { setMode('link'); setLabel('') }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  const size = mode === 'label' ? 88 : mode === 'link' ? 48 : 28
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block" aria-hidden="true">
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_#e50914]" />
      <div ref={ring}
        className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/80 mono text-[0.55rem] uppercase tracking-[0.25em] text-white transition-[width,height,background-color] duration-300"
        style={{ width: size, height: size, backgroundColor: mode === 'label' ? '#e50914' : 'transparent' }}>
        {label}
      </div>
    </div>
  )
}
