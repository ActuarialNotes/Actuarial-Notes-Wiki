import { test, expect, type Page } from '@playwright/test'

// Concept Craft (docs/concept-craft.md): the way in from the Quiz tab, a
// connection found by dropping one concept on another — and nothing to close
// afterwards — a pair nothing connects going back, the tap-then-tap way in,
// the app's concept popup a card opens, and a connection's own card. Every
// flow is signed out, so the board lives in localStorage alone, which is also
// what it does for a reader. The day's challenge puts two concepts on a fresh
// board and which two depends on the date, so nothing here assumes what is on
// the board before the test put it there.

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

function deckTile(page: Page, name: string) {
  const exactly = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`)
  return page.getByTestId('craft-deck-tile').filter({ hasText: exactly })
}

/** Press, travel and let go, the way a hand does. */
async function dragBetween(page: Page, from: Point, to: Point) {
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  for (let i = 1; i <= 10; i++) await page.mouse.move(from.x + (to.x - from.x) * (i / 10), from.y + (to.y - from.y) * (i / 10))
  await page.mouse.up()
}

const centre = (box: { x: number; y: number; width: number; height: number }): Point => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 })

/** A point on the board with no card under it. */
async function emptySpot(page: Page): Promise<Point> {
  const board = await page.getByTestId('craft-board').boundingBox()
  if (!board) throw new Error('no board')
  for (const [fx, fy] of [[0.85, 0.3], [0.85, 0.6], [0.6, 0.25], [0.6, 0.75]]) {
    const p = { x: board.x + board.width * fx, y: board.y + board.height * fy }
    const free = await page.evaluate(({ x, y }) => !document.elementFromPoint(x, y)?.closest('[data-craft-node], [data-testid="craft-strength"]'), p)
    if (free) return p
  }
  throw new Error('no empty spot on the board')
}

/** Put a concept from the deck down on empty board. */
async function putDown(page: Page, name: string) {
  const tile = deckTile(page, name)
  await tile.scrollIntoViewIfNeeded()
  const from = await tile.boundingBox()
  if (!from) throw new Error(`${name} is not in the deck`)
  await dragBetween(page, centre(from), await emptySpot(page))
  await restingBox(page, name)
}

/** Drop a concept from the deck on a card on the board. */
async function dropOn(page: Page, name: string, onto: string) {
  const tile = deckTile(page, name)
  await tile.scrollIntoViewIfNeeded()
  const from = await tile.boundingBox()
  const to = await restingBox(page, onto)
  if (!from || !to) throw new Error(`${name} or ${onto} is missing`)
  await dragBetween(page, centre(from), centre(to))
}

const strength = (page: Page, a: string, b: string) => page.locator(`[data-testid="craft-strength"][aria-label^="${a} and ${b}:"]`)

test.describe('concept craft', () => {
  test('opens from the Quiz tab onto the topic picker', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('concept-craft-entry').click()
    await expect(page).toHaveURL(/\/craft$/)
    await page.getByTestId('craft-topic').filter({ hasText: 'General Probability' }).click()
    await expect(page).toHaveURL(new RegExp(`${TOPIC}$`))
    await expect(page.getByTestId('craft-tally')).toHaveText(/^0 of \d+ connections/)
    // The day's challenge sets its two concepts on the board.
    await expect(page.getByTestId('craft-challenge')).toContainText('What connects')
    await expect(page.locator('[data-craft-node]')).toHaveCount(2)
  })

  test('finds a connection by dropping one concept on another, with nothing to close, and keeps it', async ({ page }) => {
    await page.goto(TOPIC)
    await putDown(page, 'Bayes Theorem')
    await dropOn(page, 'The Law of Total Probability', 'Bayes Theorem')

    await expect(strength(page, 'Bayes Theorem', 'The Law of Total Probability')).toHaveText(/^\d+$/)
    await expect(page.getByTestId('craft-tally')).toHaveText(/^1 of \d+ connections/)
    // The map is the answer: no card, no popup.
    await expect(page.getByTestId('craft-connection')).toHaveCount(0)
    await expect(page.getByRole('complementary', { name: /^Concept:/ })).toHaveCount(0)

    await page.reload()
    await expect(page.getByTestId('craft-tally')).toHaveText(/^1 of \d+ connections/)
    await expect(strength(page, 'Bayes Theorem', 'The Law of Total Probability')).toBeVisible()
  })

  test('sends back a pair nothing connects', async ({ page }) => {
    await page.goto(TOPIC)
    await putDown(page, 'Bayes Theorem')
    await dropOn(page, 'Discrete Mathematics', 'Bayes Theorem')
    await expect(page.getByTestId('craft-notice')).toHaveText('No connection between these two')
    await expect(page.getByTestId('craft-tally')).toHaveText(/^0 of \d+ connections/)
  })

  test('connects by tapping a deck card, then a card on the board', async ({ page }) => {
    await page.goto(TOPIC)
    await putDown(page, 'Bayes Theorem')
    await deckTile(page, 'Conditional Probability').click()
    await expect(deckTile(page, 'Conditional Probability')).toHaveAttribute('aria-pressed', 'true')
    await page.locator('[data-craft-node="Bayes Theorem"]').click()
    await expect(strength(page, 'Bayes Theorem', 'Conditional Probability')).toBeVisible()
  })

  test('reads a concept on the board in the app’s concept popup', async ({ page }) => {
    await page.goto(TOPIC)
    await putDown(page, 'Bayes Theorem')
    await page.locator('[data-craft-node="Bayes Theorem"]').click()
    await expect(page.getByRole('complementary', { name: 'Concept: Bayes Theorem' })).toBeVisible()
    await expect(page.locator('[data-craft-node="Bayes Theorem"]')).toHaveAttribute('aria-current', 'true')
  })

  test('opens a connection: its strength, what the pages say, and a quiz on its questions', async ({ page }) => {
    await page.goto(TOPIC)
    await putDown(page, 'Bayes Theorem')
    await dropOn(page, 'The Law of Total Probability', 'Bayes Theorem')
    // Off the cards, so nothing is lit and every strength shows.
    await page.mouse.move(5, 5)
    await strength(page, 'Bayes Theorem', 'The Law of Total Probability').click()

    const card = page.getByTestId('craft-connection')
    await expect(card).toBeVisible()
    await expect(card.getByTestId('craft-connection-strength')).toHaveText(/^\d+$/)
    await expect(card).toContainText('What the pages say')
    const practice = card.getByRole('button', { name: /^Practice \d+ questions?$/ })
    await expect(practice).toBeVisible({ timeout: 15_000 })
    await practice.click()
    await expect(page).toHaveURL(/\/quiz\?selection=stored/)
  })
})
