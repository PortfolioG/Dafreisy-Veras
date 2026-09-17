import { useEffect, useRef } from 'react'

/**
 * Scroll-driven frame-sequence player.
 * `frames` is an ordered list of image URLs for one full rotation; the last frame
 * should visually match the first so a complete pass returns to the start pose.
 * Rendering blends the two nearest frames so motion stays smooth even with a
 * sparse sequence. Swap in a dense 360° sequence (e.g. 72 frames) without
 * touching anything else.
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

    let images: HTMLImageElement[] = []
    let progress = 0
    let raf = 0
    let dirty = true
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
      // anchor slightly toward the top so the face never gets cropped
      const dx = (cw - dw) / 2, dy = (ch - dh) * 0.25
      ctx.globalAlpha = alpha
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    const render = () => {
      raf = requestAnimationFrame(render)
      if (!dirty || images.length === 0) return
      dirty = false
      const n = images.length
      const f = Math.min(Math.max(progress, 0), 1) * (n - 1)
      const i = Math.floor(f)
      const t = f - i
      ctx.fillStyle = '#0b0b0c'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawCover(images[i], 1)
      if (t > 0 && i + 1 < n) drawCover(images[i + 1], t)
      ctx.globalAlpha = 1
    }

    handleRef.current = {
      setProgress: (p) => {
        if (p !== progress) { progress = p; dirty = true }
      },
    }

    Promise.all(
      frames.map(
        (src) =>
          new Promise<HTMLImageElement>((res, rej) => {
            const img = new Image()
            img.decoding = 'async'
            img.onload = () => res(img)
            img.onerror = rej
            img.src = src
          }),
      ),
    ).then((imgs) => {
      images = imgs
      dirty = true
      onReady?.()
    })

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      handleRef.current = null
    }
  }, [frames, handleRef, onReady])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
