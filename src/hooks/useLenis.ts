import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mobile browsers resize the viewport as the address bar shows and hides while
// scrolling. Without this, every pinned section (hero turntable, skills deck)
// would re-measure mid-scroll and jump. Real orientation changes still refresh.
ScrollTrigger.config({ ignoreMobileResize: true })

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
    // Orientation change: wait for the new viewport to settle, then re-measure
    // every pin distance and the deck layout.
    const onOrientation = () => setTimeout(() => ScrollTrigger.refresh(), 350)
    window.addEventListener('orientationchange', onOrientation)
    return () => {
      window.removeEventListener('orientationchange', onOrientation)
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
