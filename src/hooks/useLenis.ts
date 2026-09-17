import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null
export const getLenis = () => lenisInstance

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ lerp: reduced ? 1 : 0.09, smoothWheel: !reduced })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

export function scrollTo(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
