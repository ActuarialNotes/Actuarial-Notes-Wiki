import { readFileSync } from 'node:fs'
import { test, expect } from '@playwright/test'

// Focus mode locks the page behind a black backdrop. The study card used to sit
// in normal flow under that lock, so a revealed card taller than a phone —
// Lift, with its definition and four formula boxes — could never be scrolled:
// the rest of the card and the Again / Got it buttons stayed out of reach
// under the Previous / Next footer. The study area now brings its own scroller.
const VAULT_ROOT = new URL('../../', import.meta.url)

test.describe('flashcard focus mode on a phone', () => {
  test.use({ viewport: { width: 390, height: 664 }, hasTouch: true, isMobile: true })

  test('a tall card scrolls, and a tap on the empty backdrop still exits', async ({ page, context }) => {
    // The card's back is fetched from the vault's raw GitHub URL when it isn't
    // bundled — serve it from the checkout so the test doesn't need the network.
    await page.route('https://raw.githubusercontent.com/**', route => {
      const vaultPath = new URL(route.request().url()).pathname.split('/').slice(3).join('/')
      route.fulfill({ body: readFileSync(new URL(decodeURIComponent(vaultPath), VAULT_ROOT), 'utf8') })
    })
    await page.addInitScript(() => {
      localStorage.setItem('actuarial_flashcards', JSON.stringify([
        { kind: 'concept', name: 'Lift', addedAt: 1 },
        { kind: 'concept', name: 'Gini Index', addedAt: 2 },
      ]))
    })

    await page.goto('/flashcards')
    await page.getByRole('button', { name: 'Focus' }).click()
    const card = page.locator('[data-tour="flip-card"]')
    await card.click()
    const gotIt = page.getByRole('button', { name: /Got it/ })
    await expect(gotIt).toBeVisible()
    await expect(card).toContainText('Cumulative Lift')

    // The revealed card runs past the bottom of the screen.
    const before = (await card.boundingBox())!
    expect(before.y + before.height).toBeGreaterThan(664)

    // Drag up on the card with a finger — a vertical drag is a scroll, not a
    // swipe to the next card.
    const cdp = await context.newCDPSession(page)
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 550 }] })
    for (let i = 1; i <= 20; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y: 550 - i * 20 }] })
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })

    await expect.poll(async () => (await card.boundingBox())!.y).toBeLessThan(before.y - 100)
    // Still the same card, still in focus mode.
    await expect(card).toContainText('Cumulative Lift')
    const exit = page.getByTitle('Exit focus mode (Esc)')
    await expect(exit).toBeVisible()

    // Got it is now above the footer rather than under it.
    const got = (await gotIt.boundingBox())!
    expect(got.y + got.height).toBeLessThan(590)

    // The empty space below the card is still the backdrop.
    await page.mouse.click(195, got.y + got.height + 40)
    await expect(exit).toHaveCount(0)
  })
})
