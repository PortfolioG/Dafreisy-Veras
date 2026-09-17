import { test, expect } from '@playwright/test'
import { ready, scrollTo, pinRange } from './helpers'

test.describe('Page & assets', () => {
  test('loads with correct metadata, no console errors', async ({ page }) => {
    const errors = await ready(page)
    await expect(page).toHaveTitle(/Dafreisy Veras/)
    const desc = await page.locator('meta[name="description"]').getAttribute('content')
    expect(desc).toMatch(/office manager/i)
    expect(errors).toEqual([])
  })

  test('every rotation frame is served', async ({ request }) => {
    for (let i = 0; i < 63; i++) {
      const n = String(i).padStart(2, '0')
      for (const k of ['d', 'm']) {
        const r = await request.get(`/hero/seq/${k}${n}.webp`)
        expect(r.status(), `${k}${n}.webp`).toBe(200)
        expect(r.headers()['content-type']).toContain('image/webp')
      }
    }
  })

  test('all nav anchors resolve to sections', async ({ page }) => {
    await ready(page)
    for (const id of ['top', 'about', 'services', 'skills', 'work', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
  })

  test('no horizontal overflow', async ({ page }) => {
    await ready(page)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })
})

test.describe('Hero — 360° turntable', () => {
  test('is pinned and rotates through the sequence, ending on the start frame', async ({ page }) => {
    await ready(page)
    const canvas = page.locator('#top canvas')
    await expect(canvas).toBeVisible()
    const { top, dist } = await pinRange(page, '#top .hero-stage')
    expect(top).toBe(0)
    expect(dist).toBeGreaterThan(1000)

    const snap = async () => canvas.evaluate((c: HTMLCanvasElement) => {
      const ctx = c.getContext('2d')!
      const w = c.width, h = c.height
      // sample a horizontal band across the middle of the canvas
      const d = ctx.getImageData(0, Math.floor(h * 0.45), w, 4).data
      let s = 0; for (let i = 0; i < d.length; i += 16) s += d[i] + d[i + 1] + d[i + 2]
      return s
    })

    await scrollTo(page, 0); const start = await snap()
    await scrollTo(page, dist * 0.5); const back = await snap()
    await scrollTo(page, dist); const end = await snap()

    expect(start).toBeGreaterThan(0)
    expect(Math.abs(back - start) / start).toBeGreaterThan(0.05)   // a different view at 180°
    expect(Math.abs(end - start) / start).toBeLessThan(0.02)       // last frame == first frame
  })
})

test.describe('Skills deck', () => {
  test('renders six cards with counters and chips', async ({ page }) => {
    await ready(page)
    const cards = page.locator('#skills article')
    await expect(cards).toHaveCount(6)
    await expect(cards.first()).toContainText('[ 01 / 06 ]')
    await expect(cards.last()).toContainText('[ 06 / 06 ]')
    expect(await cards.first().locator('.chip').count()).toBeGreaterThan(2)
  })

  test('desktop: pinned deck fans cards around the centre as you scroll', async ({ page, isMobile }) => {
    test.skip(isMobile, 'deck is a swipe row on mobile')
    await ready(page)
    const { top, dist } = await pinRange(page, '#skills')
    expect(dist).toBeGreaterThan(1500)

    const centredIndex = async () => page.evaluate(() => {
      const cards = [...document.querySelectorAll('#skills article')] as HTMLElement[]
      const centre = window.innerWidth / 2
      let best = 0, bd = Infinity
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - centre)
        if (d < bd) { bd = d; best = i }
      })
      const m = new DOMMatrix(getComputedStyle(cards[best]).transform)
      return { best, rot: Math.round(Math.atan2(m.b, m.a) * 180 / Math.PI), opacity: Number(getComputedStyle(cards[best]).opacity) }
    })

    await scrollTo(page, top + 1, 1200)
    expect((await centredIndex()).best).toBe(0)
    // Six cards = five steps, so 40% of the pin lands exactly on card 03.
    await scrollTo(page, top + dist * 0.4, 1200)
    const mid = await centredIndex()
    expect(mid.best).toBe(2)
    expect(Math.abs(mid.rot)).toBeLessThanOrEqual(3)
    expect(mid.opacity).toBeGreaterThan(0.9)
    await scrollTo(page, top + dist - 1, 1200)
    expect((await centredIndex()).best).toBe(5)

    // neighbours are tilted
    const tilt = await page.evaluate(() => {
      const c = document.querySelectorAll('#skills article')[4] as HTMLElement
      const m = new DOMMatrix(getComputedStyle(c).transform)
      return Math.abs(Math.atan2(m.b, m.a) * 180 / Math.PI)
    })
    expect(tilt).toBeGreaterThan(4)
  })

  test('mobile: cards are a horizontal swipe row', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'desktop uses the pinned deck')
    await ready(page)
    const track = page.locator('#skills article').first().locator('..')
    const { scrollWidth, clientWidth } = await track.evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }))
    expect(scrollWidth).toBeGreaterThan(clientWidth * 2)
  })
})

test.describe('Experience & contact', () => {
  test('role cards open a detail dialog', async ({ page }) => {
    await ready(page)
    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
    const first = page.locator('#work button').first()
    await expect(first).toContainText('S01 E01')
    await first.click()
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText('Clinical Supervisor')
    await page.keyboard.press('Escape').catch(() => {})
    await dialog.locator('button', { hasText: 'Close' }).click()
    await expect(dialog).toHaveCount(0)
  })

  test('contact form is present and requires its fields', async ({ page }) => {
    await ready(page)
    const form = page.locator('#contact form')
    await expect(form.locator('input[name=name]')).toHaveAttribute('required', '')
    await expect(form.locator('input[name=email]')).toHaveAttribute('type', 'email')
    await expect(form.locator('textarea[name=message]')).toHaveAttribute('required', '')
    await expect(form.locator('button[type=submit]')).toContainText(/send message/i)
  })
})
