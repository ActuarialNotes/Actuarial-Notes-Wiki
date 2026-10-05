import { test, expect, type Page } from '@playwright/test'

// Concept Craft (docs/concept-craft.md): the way in from the Quiz tab, a
// craft in Explore mode, a pair that doesn't combine bouncing back, the
// Mastery prompt, and the inspector. Every flow is signed out, so the board
// lives in localStorage alone — which is also what it does for a reader.

const RESERVING = '/craft/exam-5-reserving-methods'

/** A card's box once it has stopped moving — a card thrown back is still travelling home. */
async function restingBox(page: Page, name: string) {
  const card = page.locator(`[data-craft-node="${name}"]`)
  let last = await card.boundingBox()
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(60)
    const next = await card.boundingBox()
    if (last && next && Math.abs(last.x - next.x) < 0.5 && Math.abs(last.y - next.y) < 0.5) return next
    last = next
  }
  return last
}

/** Drag one card on the board onto another, the way a hand does. */
async function drag(page: Page, from: string, to: string) {
  const a = await restingBox(page, from)
  const b = await restingBox(page, to)
  if (!a || !b) throw new Error(`${from} or ${to} is not on the board`)
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2)
  await page.mouse.down()
  for (let i = 1; i <= 10; i++) {
    await page.mouse.move(
      a.x + a.width / 2 + ((b.x + b.width / 2) - (a.x + a.width / 2)) * (i / 10),
      a.y + a.height / 2 + ((b.y + b.height / 2) - (a.y + a.height / 2)) * (i / 10),
    )
  }
  await page.mouse.up()
}

test.describe('concept craft', () => {
  test('opens from the Quiz tab onto the topic picker', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('concept-craft-entry').click()
    await expect(page).toHaveURL(/\/craft$/)
    await expect(page.getByTestId('craft-module').first()).toBeVisible()
    await page.getByText('Unpaid claim estimation').click()
    await expect(page).toHaveURL(new RegExp(`${RESERVING}$`))
    await expect(page.getByTestId('craft-tally')).toHaveText('4 of 18 concepts · 0 of 12 links')
  })

  test('crafts in Explore mode, bounces an unrelated pair, and keeps the board', async ({ page }) => {
    await page.goto(RESERVING)
    await expect(page.locator('[data-craft-node="Paid Losses"]')).toBeVisible()

    await drag(page, 'Paid Losses', 'Tail Factor')
    await expect(page.getByTestId('craft-notice')).toHaveText('No direct link between these concepts')
    await expect(page.getByTestId('craft-tally')).toContainText('0 of 12 links')

    await drag(page, 'Paid Losses', 'Case Reserves')
    await expect(page.locator('[data-craft-node="Incurred Losses"]')).toBeVisible()
    await expect(page.getByTestId('craft-reveal')).toContainText('Incurred Losses')
    await expect(page.getByTestId('craft-tag')).toHaveCount(1)
    // Incurred Losses introduces Accident Year to the deck.
    await expect(page.getByTestId('craft-tally')).toHaveText('6 of 18 concepts · 1 of 12 links')

    await page.reload()
    await expect(page.getByTestId('craft-tally')).toHaveText('6 of 18 concepts · 1 of 12 links')
    await expect(page.locator('[data-craft-node="Incurred Losses"]')).toBeVisible()
  })

  test('combines by tapping a deck card, then a card on the board', async ({ page }) => {
    await page.goto(RESERVING)
    await page.getByTestId('craft-deck-tile').filter({ hasText: /^Age to Age Factor$/ }).click()
    await page.locator('[data-craft-node="Tail Factor"]').click()
    await expect(page.locator('[data-craft-node="Cumulative Development Factor"]')).toBeVisible()
  })

  test('asks how a pair relates in Mastery mode, and crafts only on the right answer', async ({ page }) => {
    await page.goto(RESERVING)
    await page.getByRole('radio', { name: 'Mastery' }).click()

    // An unrelated pair is asked about too, and No direct link is right.
    await drag(page, 'Case Reserves', 'Tail Factor')
    await expect(page.getByTestId('craft-prompt')).toBeVisible()
    await page.getByRole('button', { name: 'No direct link' }).click()
    await expect(page.getByTestId('craft-prompt')).toContainText('don’t combine')
    await page.getByRole('button', { name: 'Back to the board' }).click()

    await drag(page, 'Paid Losses', 'Case Reserves')
    await expect(page.getByTestId('craft-prompt')).toBeVisible()
    await page.getByRole('button', { name: 'Added to' }).click()
    await page.getByRole('button', { name: 'See what it makes' }).click()
    await expect(page.locator('[data-craft-node="Incurred Losses"]')).toBeVisible()
    await expect(page.getByTestId('craft-tally')).toContainText('1 of 12 links')
  })

  test('inspects a concept: its definition, its links and its questions', async ({ page }) => {
    await page.goto(RESERVING)
    await drag(page, 'Paid Losses', 'Case Reserves')
    await page.locator('[data-craft-node="Incurred Losses"]').click()
    const inspector = page.getByTestId('craft-inspector')
    await expect(inspector).toBeVisible()
    await expect(inspector).toContainText('reported losses')
    await expect(inspector).toContainText('Paid Losses')
    await expect(inspector.getByRole('button', { name: /^Practice \d+ questions?$/ })).toBeVisible({ timeout: 15_000 })
  })
})
