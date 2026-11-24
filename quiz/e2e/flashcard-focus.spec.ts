import { readFileSync } from 'node:fs'
import type { Page } from '@playwright/test'
import { test, expect } from './test'

// Focus mode locks the page behind the ground. The study card used to sit in
// normal flow under that lock, so a revealed card taller than a phone (Lift,
// with its definition and formula boxes) could never be scrolled: the rest of
// the card and the Again / Got it buttons stayed out of reach under the foot.
// The study area now brings its own scroller.
const VAULT_ROOT = new URL('../../', import.meta.url)
// A short phone, so the revealed card is sure to run past the bottom of the
// screen.
const SCREEN_HEIGHT = 568

// A card's back is fetched from the vault's raw GitHub URL when it isn't
// bundled: serve it from the checkout so the tests don't need the network.
async function serveVault(page: Page) {
  await page.route('https://raw.githubusercontent.com/**', route => {
    const vaultPath = new URL(route.request().url()).pathname.split('/').slice(3).join('/')
    route.fulfill({ body: readFileSync(new URL(decodeURIComponent(vaultPath), VAULT_ROOT), 'utf8') })
  })
}

test.describe('flashcard focus mode on a phone', () => {
  test.use({ viewport: { width: 390, height: SCREEN_HEIGHT }, hasTouch: true, isMobile: true })

  test('a tall card scrolls, and a tap on the empty backdrop still exits', async ({ page, context }) => {
    await serveVault(page)
    await page.addInitScript(() => {
      localStorage.setItem('actuarial_flashcards', JSON.stringify([
        // Lift alone: the deck orders cards by exam and syllabus, so a second
        // card could come first and the test would be reading the wrong card.
        { kind: 'concept', name: 'Lift', addedAt: 1 },
      ]))
    })

    await page.goto('/flashcards')
    // Focus mode is a row of the screen's More menu.
    await page.getByRole('button', { name: 'More', exact: true }).click()
    await page.getByRole('dialog', { name: 'More' }).getByRole('button', { name: 'Focus mode' }).click()
    const card = page.locator('[data-tour="flip-card"]')
    await card.click()
    const gotIt = page.getByRole('button', { name: /Got it/ })
    await expect(gotIt).toBeVisible()
    await expect(card).toContainText('vertical distance')

    // The revealed card runs past the bottom of the screen.
    const before = (await card.boundingBox())!
    expect(before.y + before.height).toBeGreaterThan(SCREEN_HEIGHT)

    // Drag up on the card with a finger — a vertical drag is a scroll, not a
    // swipe to the next card.
    const cdp = await context.newCDPSession(page)
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 450 }] })
    for (let i = 1; i <= 20; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y: 450 - i * 15 }] })
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })

    await expect.poll(async () => (await card.boundingBox())!.y).toBeLessThan(before.y - 100)
    // Still the same card, still in focus mode.
    await expect(card).toContainText('vertical distance')
    const exit = page.getByTitle('Exit focus mode (Esc)')
    await expect(exit).toBeVisible()

    // At the end of the scroll, Got it is above the foot rather than under it.
    // (The drag above proves a finger scrolls; how far one drag goes depends on
    // how tall the card's content is, so finish the scroll directly.)
    await page.evaluate(() => {
      const scroller = document.querySelector('[data-tour="flip-card"]')?.closest<HTMLElement>('.overflow-y-auto')
      if (scroller) scroller.scrollTop = scroller.scrollHeight
    })
    const footTop = (await page.getByTestId('flashcards-foot').boundingBox())!.y
    await expect.poll(async () => { const b = (await gotIt.boundingBox())!; return b.y + b.height }).toBeLessThan(footTop)
    const got = (await gotIt.boundingBox())!

    // The empty space below the card, above the foot, is still the backdrop.
    await page.mouse.click(195, (got.y + got.height + footTop) / 2)
    await expect(exit).toHaveCount(0)
  })
})

test.describe('flashcards under Practice', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('the Deck popup lists the cards and a tap goes to one; the foot is Previous, Practice, Next', async ({ page }) => {
    await serveVault(page)
    await page.addInitScript(() => {
      localStorage.setItem('actuarial_flashcards', JSON.stringify([
        { kind: 'concept', name: 'Combination', addedAt: 1 },
        { kind: 'concept', name: 'Permutation', addedAt: 2 },
        { kind: 'concept', name: 'Lift', addedAt: 3 },
      ]))
    })
    await page.goto('/flashcards')

    const card = page.getByTestId('flashcard')
    await expect(card).toBeVisible()
    // The foot is the concept reader's.
    await expect(page.getByRole('button', { name: 'Previous card' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Next card' })).toBeVisible()

    await page.getByRole('button', { name: /^Deck, 3 cards/ }).click()
    const deck = page.getByRole('dialog', { name: 'Deck' })
    await expect(deck).toBeVisible()
    await expect(deck.getByTestId('deck-card')).toHaveCount(3)
    await expect(deck.getByTestId('deck-count')).toHaveText('3 cards')

    await deck.locator('[data-card-name="Permutation"]').getByTestId('deck-card').click()
    await expect(deck).toBeHidden()
    await expect(card).toContainText('Permutation')

    // Permutation has questions in the bank, so its card can be practised.
    const practice = page.getByTestId('flashcards-foot').getByRole('link', { name: 'Practice', exact: true })
    await expect(practice).toBeVisible({ timeout: 20_000 })
    await expect(practice).toHaveAttribute('href', /^\/search\?tab=questions&concept=Permutation$/)

    // Removing a card in the deck takes it out.
    await page.getByRole('button', { name: /^Deck, 3 cards/ }).click()
    await deck.getByRole('button', { name: 'Remove Lift' }).click()
    await expect(deck.getByTestId('deck-card')).toHaveCount(2)
  })
})

