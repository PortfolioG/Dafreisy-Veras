import { useEffect, useRef } from 'react'

/**
 * Scroll-driven frame-sequence player (the 360° turntable).
 * `frames` is an ordered list of image URLs for one full rotation; the last frame
 * matches the first so a complete pass returns to the start pose.
 * The first frame is painted as soon as it arrives; the rest stream in and the
 * player always draws the nearest frame it has, blending neighbours for smoothness.
 */
export type TurntableHandle = { setProgress: (p: number) => void }

type Props = {
  frames: string[]
  handleRef: React.MutableRefObject<TurntableHandle | null>
  className?: string
  onReady?: () => void
}

export default function Turntable({ frames, handleRef, className, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const images: (HTMLImageElement | null)[] = new Array(frames.length).fill(null)
    let progress = 0
    let raf = 0
    let dirty = true
    let cancelled = false
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      dirty = true
    }

    const drawCover = (img: HTMLImageElement, alpha: number) => {
      const cw = canvas.width, ch = canvas.height
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s
      // anchor toward the top so the face is never cropped
      const dx = (cw - dw) / 2, dy = (ch - dh) * 0.25
      ctx.globalAlpha = alpha
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    /** nearest loaded frame at or below i, else above */
    const nearest = (i: number) => {
      for (let k = i; k >= 0; k--) if (images[k]) return k
      for (let k = i + 1; k < images.length; k++) if (images[k]) return k
      return -1
    }

    const render = () => {
      raf = requestAnimationFrame(render)
      if (!dirty) return
      dirty = false
      const n = images.length
      const f = Math.min(Math.max(progress, 0), 1) * (n - 1)
      const i = Math.floor(f)
      const t = f - i
      const a = nearest(i)
      if (a < 0) return
      ctx.fillStyle = '#0b0b0c'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawCover(images[a]!, 1)
      const b = i + 1 < n ? images[i + 1] : null
      if (t > 0 && b && a === i) drawCover(b, t)
      ctx.globalAlpha = 1
    }

    handleRef.current = {
      setProgress: (p) => {
        if (p !== progress) { progress = p; dirty = true }
      },
    }

    const load = (k: number) =>
      new Promise<void>((res) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => { if (!cancelled) { images[k] = img; dirty = true } res() }
        img.onerror = () => res()
        img.src = frames[k]
      })

    // First frame first, then the rest in small parallel batches.
    load(0).then(async () => {
      onReady?.()
      const rest = frames.map((_, k) => k).slice(1)
      const batch = 6
      for (let s = 0; s < rest.length; s += batch) {
        if (cancelled) return
        await Promise.all(rest.slice(s, s + batch).map(load))
      }
    })

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(render)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      handleRef.current = null
    }
  }, [frames, handleRef, onReady])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
