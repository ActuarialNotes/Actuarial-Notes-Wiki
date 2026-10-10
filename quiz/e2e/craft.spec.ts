import { test, expect, type Page } from '@playwright/test'

// Concept Craft (docs/concept-craft.md): the way in from the Quiz tab onto an
// empty board, a starter pack added from the + menu, a connection found by dropping one concept on another — new concepts made,
// and nothing to close afterwards — any pair connecting and scoring, the
// tap-then-tap way in, the app's concept popup a card opens, and a
// connection's own card down to its quiz. Every flow is signed out, so the
// board lives in localStorage alone, which is also what it does for a reader.
//
// The cards a pack starts with are read off the vault (`seedConcepts`), so
// nothing here names them: the deck deals them in order, and the first two are
// always a connected pair — the one whose recipe its page states most plainly,
// so the first drop makes something. Most flows open the board through a
// topic's link (`/craft/<topic>`), which adds that pack and shows the board.

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
  test('opens from the Quiz tab onto an empty board, and adds a starter pack from the + menu', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('concept-craft-entry').click()
    await expect(page).toHaveURL(/\/craft$/)
    await expect(page.getByTestId('craft-empty')).toBeVisible()
    await expect(page.locator('[data-craft-node]')).toHaveCount(0)

    await page.getByTestId('craft-add').click()
    const menu = page.getByTestId('craft-pack-menu')
    await expect(menu).toBeVisible()
    await menu.getByTestId('craft-pack').filter({ hasText: 'General Probability' }).click()
    await expect(menu).toHaveCount(0)
    await expect(page.getByTestId('craft-empty')).toHaveCount(0)
    await expect(page.getByTestId('craft-tally')).toContainText(/^\d+ of \d+ concepts · 0 of \d+ key connections$/)
    // A hand, not the deck: a few cards to make the rest from.
    const cards = await inHand(page)
    expect(cards.length).toBeGreaterThanOrEqual(2)
    await expect(page.locator('[data-craft-node]')).toHaveCount(cards.length)

    // A pack on the board is ticked off; another adds its cards beside the first's.
    await page.getByTestId('craft-add').click()
    await expect(menu.locator('[data-pack="exam-p-general-probability"]')).toBeDisabled()
    await menu.getByTestId('craft-pack').filter({ hasText: 'Time Value of Money' }).first().click()
    await expect.poll(async () => (await inHand(page)).length).toBeGreaterThan(cards.length)
    expect((await inHand(page)).slice(0, cards.length)).toEqual(cards)
  })

  test('makes new concepts from a connection, with nothing to close, and keeps them', async ({ page }) => {
    await page.goto(TOPIC)
    const [a, b] = await inHand(page)
    const before = await page.locator('[data-craft-node]').count()
    await drop(page, a, b)

    await expect(strength(page, a, b)).toHaveText(/^\d+$/)
    await expect(page.getByTestId('craft-tally')).toContainText(/· 1 of \d+ key connections$/)
    // What the pair made lands on the board, in the exam's colour, drawn from
    // the line that made it — cause to effect.
    await expect.poll(() => page.locator('[data-craft-node]').count()).toBeGreaterThan(before)
    await expect(page.locator('[data-craft-node][data-new]').first()).toBeVisible()
    await expect(page.getByTestId('craft-made-link').first()).toBeAttached()
    // The map is the answer: no card, no popup.
    await expect(page.getByTestId('craft-connection')).toHaveCount(0)
    await expect(page.getByRole('complementary', { name: /^Concept:/ })).toHaveCount(0)

    const made = await page.locator('[data-craft-node]').count()
    await page.reload()
    await expect(page.getByTestId('craft-tally')).toContainText(/· 1 of \d+ key connections$/)
    await expect(page.locator('[data-craft-node]')).toHaveCount(made)
    await expect(strength(page, a, b)).toBeVisible()
  })

  test('connects any pair, says how they relate, and scores the stronger more', async ({ page }) => {
    // PCPA's *Dealing with Data* is loosely knit — nothing in it is built from
    // anything else, so all nine of its cards are dealt — and its hand holds
    // pairs the notes barely tie. Every one of them still connects.
    await page.goto('/craft/exam-pcpa-dealing-with-data')
    await expect(page).toHaveURL(/\/craft$/)
    const cards = await inHand(page)
    const tiles = page.getByTestId('craft-deck-tile')
    const score = page.getByTestId('craft-score')
    await expect(score).toHaveAttribute('data-score', '0')
    const points: number[] = []
    for (const [i, j] of [[0, cards.length - 1], [1, cards.length - 2]]) {
      await tiles.nth(i).click()
      await tiles.nth(j).click()
      await expect(strength(page, cards[i], cards[j])).toBeVisible()
      // What it scored and what the two are to each other, in one line.
      const notice = page.getByTestId('craft-notice')
      await expect(notice).toHaveText(/^\+\d+ · .+$/)
      const scored = Number((await notice.textContent())?.match(/^\+(\d+)/)?.[1])
      points.push(scored)
      // …and the points pop off the line that scored them.
      await expect(page.getByTestId('craft-score-pop')).toHaveText(`+${scored}`)
      await expect(page.getByTestId('craft-score-pop')).toHaveCount(1)
      await expect(notice).toHaveCount(0, { timeout: 5000 })
    }
    await expect(score).toHaveAttribute('data-score', String(points[0] + points[1]))
    // The score counts up to it.
    await expect(page.getByTestId('craft-score-value')).toHaveText(String(points[0] + points[1]))
    // The line carries its weight: a stronger connection is drawn thicker.
    const widths = await page.getByTestId('craft-line').evaluateAll(lines =>
      lines.map(l => ({ s: Number(l.getAttribute('data-strength')), w: Number(l.getAttribute('stroke-width')) })))
    const [weak, strong] = [...widths].sort((x, y) => x.s - y.s)
    if (strong.s > weak.s) expect(strong.w).toBeGreaterThan(weak.w)
  })

  test('plays for medals: 80% of the score in the first 20% of the pairs for gold', async ({ page }) => {
    // Nine cards, 36 pairs: gold is in the first 7 connections, silver 10, bronze 14.
    await page.goto('/craft/exam-pcpa-dealing-with-data')
    await inHand(page)
    const medals = page.getByTestId('craft-medals')
    await expect(medals).toContainText(/to go\s*in 7 for Gold/)
    await medals.click()
    const panel = page.getByTestId('craft-medals-panel')
    await expect(panel).toContainText('The 9 concepts here make 36 pairs')
    const tiers = panel.getByTestId('craft-medal-tier')
    await expect(tiers).toHaveCount(3)
    await expect(tiers.nth(0)).toContainText(/Gold80% in 20%.*in your first 7 connections/)
    await expect(tiers.nth(1)).toContainText('in your first 10 connections')
    await expect(tiers.nth(2)).toContainText('in your first 14 connections')
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)

    // A connection spends one of them.
    const tiles = page.getByTestId('craft-deck-tile')
    await tiles.nth(0).click()
    await tiles.nth(1).click()
    await expect(medals).toContainText(/in 6 for Gold/)
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

  test('opens a connection: its strength, what it made, and a quiz on its questions', async ({ page }) => {
    await page.goto(TOPIC)
    const [a, b] = await inHand(page)
    await drop(page, a, b)
    const made = await page.locator('[data-craft-node][data-new]').first().getAttribute('data-craft-node')
    // Off the cards, so nothing is lit and every strength shows.
    await page.mouse.move(5, 5)
    await strength(page, a, b).click()

    const card = page.getByTestId('craft-connection')
    await expect(card).toBeVisible()
    await expect(card.getByTestId('craft-connection-strength')).toHaveText(/^\d+$/)
    // What one is to the other, between their names.
    await expect(card.getByTestId('craft-connection-relation')).not.toBeEmpty()
    // What the connection made, with its page's words for why.
    await expect(card.getByTestId('craft-makes').first()).toContainText(`Makes${made}`)
    const practice = card.getByRole('button', { name: /^Practice \d+ questions?$/ })
    await expect(practice).toBeVisible()
    await practice.click()
    await expect(page).toHaveURL(/\/quiz\?selection=stored/)
  })
})
