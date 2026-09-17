import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Reveals [data-reveal] children with a masked rise, staggered, when the section enters. */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
      gsap.utils.toArray<HTMLElement>('[data-mask] > *').forEach((el) => {
        gsap.fromTo(el, { yPercent: 110 }, {
          yPercent: 0, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [ref])
}
