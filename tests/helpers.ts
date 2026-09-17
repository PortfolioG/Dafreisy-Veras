import { expect, type Page } from '@playwright/test'

/** Load the site and wait for the intro loader to finish and the hero to be interactive. */
export async function ready(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(String(e)))
  // Resource-load failures are reported separately with their URL; ignore third-party fonts
  // (blocked in some sandboxes) but flag anything served by the site itself.
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()) })
  page.on('requestfailed', (r) => { if (!/fonts\.g(oogleapis|static)\.com/.test(r.url())) errors.push(`request failed: ${r.url()}`) })
  page.on('response', (r) => { if (r.status() >= 400 && !/fonts\.g/.test(r.url())) errors.push(`${r.status()} ${r.url()}`) })
  await page.goto('/')
  await expect(page.locator('#top h1')).toBeVisible({ timeout: 20_000 })
  await expect(page.locator('#top h1')).toHaveCount(1)
  await page.waitForTimeout(1500) // loader exit + entrance timeline
  return errors
}

/** Scroll to an absolute position and let ScrollTrigger/Lenis settle. */
export async function scrollTo(page: Page, y: number, settle = 900) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(settle)
}

/** Top and pinned distance of a section wrapped by a ScrollTrigger pin-spacer. */
export async function pinRange(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement
    const spacer = el.parentElement as HTMLElement
    const top = spacer.getBoundingClientRect().top + window.scrollY
    return { top, dist: spacer.offsetHeight - el.offsetHeight }
  }, selector)
}
