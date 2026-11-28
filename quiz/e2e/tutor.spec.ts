import { test, expect, type Page } from './test'

/**
 * The Tutor (docs/tutor.md), from a signed-out browser.
 *
 * The Tutor is open to one approved account in Preview. The suite's build lets
 * a page that asks for it meet it as a guest (`VITE_TUTOR_PREVIEW=on` in
 * playwright.config.ts, plus the `actuarial_tutor_preview` key below), so the
 * walk is exercised without the account — and no other spec sees it. The
 * gate itself is pinned by `src/lib/tutor/access.test.ts`.
 */

async function askForTutor(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('actuarial_tutor_preview', 'on')
  })
}

test.describe('the Tutor', () => {
  test('is nowhere for a page that has not asked for it', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('button', { name: 'Tutor', exact: true })).toHaveCount(0)
  })

  test('says one thing about the page, and its one button opens one part', async ({ page }) => {
    await askForTutor(page)
    await page.clock.setFixedTime(new Date('2026-06-01T10:00:00'))
    await page.goto('/wiki/concept/Exposure+Base')

    const tutor = page.getByRole('button', { name: 'Tutor', exact: true })
    await expect(tutor).toBeVisible()
    await tutor.click()

    // One sentence about the concept on screen, and one button. The bank
    // loads in the background; the line about the papers appears with it.
    const bubble = page.getByRole('complementary', { name: 'Tutor' })
    await expect(bubble.getByText(/^Asked on \d+ of \d+ papers\.$/)).toBeVisible({ timeout: 30_000 })
    await expect(bubble.getByRole('button')).toHaveCount(1)
    await bubble.getByRole('button', { name: 'Check yourself' }).click()

    // The part: confidence before the reveal.
    const panel = page.getByRole('complementary', { name: 'Tutor' })
    const reveal = panel.getByRole('button', { name: /Reveal the answer|Check/ })
    await expect(reveal).toBeDisabled()
    await panel.getByRole('radio', { name: 'Unsure' }).click()
    await expect(reveal).toBeEnabled()
    await reveal.click()

    // Marked against the sample answer, then back to one line.
    const none = panel.getByRole('button', { name: /^None/ })
    if (await none.isVisible()) await none.click()
    await panel.getByRole('button', { name: 'Next' }).click()
    await expect(bubble.getByText(/^You missed this earlier today|^Next check/)).toBeVisible()

    // Tapping the character again folds it.
    await tutor.click()
    await expect(bubble).toHaveCount(0)
  })

  test('has nothing due for a new record on Today', async ({ page }) => {
    await askForTutor(page)
    await page.goto('/dashboard')
    await page.getByRole('button', { name: 'Tutor', exact: true }).click()
    const bubble = page.getByRole('complementary', { name: 'Tutor' })
    await expect(bubble.getByText('Nothing is due.')).toBeVisible({ timeout: 30_000 })
    await expect(bubble.getByRole('button')).toHaveCount(0)
  })

  test('says what it covers on another exam’s page', async ({ page }) => {
    await askForTutor(page)
    await page.goto('/wiki/exam/Exam+7+(CAS)')
    await page.getByRole('button', { name: 'Tutor', exact: true }).click()
    const bubble = page.getByRole('complementary', { name: 'Tutor' })
    await expect(bubble.getByText('The Tutor only covers Exam 5 for now.')).toBeVisible()
  })
})
