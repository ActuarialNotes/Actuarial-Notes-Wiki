import { test, expect, type Page } from '@playwright/test'

// Concept Craft (docs/concept-craft.md): the way in from the Quiz tab, a
// connection found by dropping one concept on another — new concepts made,
// and nothing to close afterwards — a pair nothing connects going back, the
// tap-then-tap way in, the app's concept popup a card opens, and a
// connection's own card down to its quiz. Every flow is signed out, so the
// board lives in localStorage alone, which is also what it does for a reader.
//
// The cards a topic starts with are read off the vault (`seedConcepts`), so
// nothing here names them: the deck deals them in order, and the first two are
// always a connected pair — the one that makes the most.

const TOPIC = '/craft/exam-p-general-probability'

type Point = { x: number; y: number }

/** A card's box once it has stopped moving — a card thrown back is still travelling home. */
async function restingBox(page: Page, name: string) {
  const card = page.locator(`[data-craft-node="${name}"]`)
  await expect(card).toBeVisible()
  let last = await card.boundingBox()
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(60)
    const next = await card.boundingBox()
    if (last && next && Math.abs(last.x - next.x) < 0.5 && Math.abs(last.y - next.y) < 0.5) return next
    last = next
  }
  return last
}

const centre = (box: { x: number; y: number; width: number; height: number }): Point => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 })

/** Press, travel and let go, the way a hand does. */
async function dragBetween(page: Page, from: Point, to: Point) {
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  for (let i = 1; i <= 10; i++) await page.mouse.move(from.x + (to.x - from.x) * (i / 10), from.y + (to.y - from.y) * (i / 10))
  await page.mouse.up()
}

/** Drag one card on the board onto another. */
async function drop(page: Page, from: string, onto: string) {
  const a = await restingBox(page, from)
  const b = await restingBox(page, onto)
  if (!a || !b) throw new Error(`${from} or ${onto} is not on the board`)
  await dragBetween(page, centre(a), centre(b))
}

/** The cards on the board, in the order they came into hand (the deck's order). */
async function inHand(page: Page) {
  await expect(page.getByTestId('craft-deck-tile').first()).toBeVisible()
  return page.getByTestId('craft-deck-tile').evaluateAll(tiles => tiles.map(t => t.textContent?.trim() ?? ''))
}

/** The strength on the line between two cards — named in the graph's order, which is by name. */
function strength(page: Page, x: string, y: string) {
  const [a, b] = [x, y].sort((p, q) => (p.toLowerCase() < q.toLowerCase() ? -1 : 1))
  return page.locator(`[data-testid="craft-strength"][aria-label^="${a} and ${b}:"]`)
}

test.describe('concept craft', () => {
  test('opens from the Quiz tab onto the topic picker', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('concept-craft-entry').click()
    await expect(page).toHaveURL(/\/craft$/)
    await page.getByTestId('craft-topic').filter({ hasText: 'General Probability' }).click()
    await expect(page).toHaveURL(new RegExp(`${TOPIC}$`))
    await expect(page.getByTestId('craft-tally')).toContainText(/^\d+ of \d+ concepts · 0 of \d+ connections$/)
    // A hand, not the deck: a few cards to make the rest from.
    const cards = await inHand(page)
    expect(cards.length).toBeGreaterThanOrEqual(2)
    await expect(page.locator('[data-craft-node]')).toHaveCount(cards.length)
  })

  test('makes new concepts from a connection, with nothing to close, and keeps them', async ({ page }) => {
    await page.goto(TOPIC)
    const [a, b] = await inHand(page)
    const before = await page.locator('[data-craft-node]').count()
    await drop(page, a, b)

    await expect(strength(page, a, b)).toHaveText(/^\d+$/)
    await expect(page.getByTestId('craft-tally')).toContainText(/· 1 of \d+ connections$/)
    // What the pair made lands on the board, in the exam's colour.
    await expect.poll(() => page.locator('[data-craft-node]').count()).toBeGreaterThan(before)
    await expect(page.locator('[data-craft-node][data-new]').first()).toBeVisible()
    // The map is the answer: no card, no popup.
    await expect(page.getByTestId('craft-connection')).toHaveCount(0)
    await expect(page.getByRole('complementary', { name: /^Concept:/ })).toHaveCount(0)

    const made = await page.locator('[data-craft-node]').count()
    await page.reload()
    await expect(page.getByTestId('craft-tally')).toContainText(/· 1 of \d+ connections$/)
    await expect(page.locator('[data-craft-node]')).toHaveCount(made)
    await expect(strength(page, a, b)).toBeVisible()
  })

  test('sends back a pair nothing connects', async ({ page }) => {
    // PCPA's *Dealing with Data* is loosely knit, so its starting hand holds
    // pairs nothing connects; try them until one goes back.
    await page.goto('/craft/exam-pcpa-dealing-with-data')
    const cards = await inHand(page)
    let sentBack = false
    for (let i = 0; i < cards.length && !sentBack; i++) {
      for (let j = i + 1; j < cards.length && !sentBack; j++) {
        if (await strength(page, cards[i], cards[j]).count()) continue
        await drop(page, cards[i], cards[j])
        sentBack = await page.getByTestId('craft-notice').filter({ hasText: 'No connection between these two' }).isVisible()
          .catch(() => false)
        if (!sentBack) await page.waitForTimeout(300)
      }
    }
    expect(sentBack).toBe(true)
  })

  test('connects by tapping a deck card, then a card on the board', async ({ page }) => {
    await page.goto(TOPIC)
    const [a, b] = await inHand(page)
    const tile = page.getByTestId('craft-deck-tile').first()
    await tile.click()
    await expect(tile).toHaveAttribute('aria-pressed', 'true')
    await page.locator(`[data-craft-node="${b}"]`).click()
    await expect(strength(page, a, b)).toBeVisible()
  })

  test('reads a concept on the board in the app’s concept popup', async ({ page }) => {
    await page.goto(TOPIC)
    const [a] = await inHand(page)
    await page.locator(`[data-craft-node="${a}"]`).click()
    await expect(page.getByRole('complementary', { name: `Concept: ${a}` })).toBeVisible()
    await expect(page.locator(`[data-craft-node="${a}"]`)).toHaveAttribute('aria-current', 'true')
  })

  test('opens a connection: its strength, and a quiz on its questions', async ({ page }) => {
    await page.goto(TOPIC)
    const [a, b] = await inHand(page)
    await drop(page, a, b)
    // Off the cards, so nothing is lit and every strength shows.
    await page.mouse.move(5, 5)
    await strength(page, a, b).click()

    const card = page.getByTestId('craft-connection')
    await expect(card).toBeVisible()
    await expect(card.getByTestId('craft-connection-strength')).toHaveText(/^\d+$/)
    const practice = card.getByRole('button', { name: /^Practice \d+ questions?$/ })
    await expect(practice).toBeVisible()
    await practice.click()
    await expect(page).toHaveURL(/\/quiz\?selection=stored/)
  })
})
