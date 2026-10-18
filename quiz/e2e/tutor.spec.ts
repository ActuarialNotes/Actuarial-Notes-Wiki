import { test, expect, type Page } from '@playwright/test'

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
    await expect(page.getByRole('button', { name: /^Tutor/ })).toHaveCount(0)
  })

  test('walks a session: a new concept’s page first, then a part, marked against the examiners', async ({ page }) => {
    await askForTutor(page)
    // Months before the October 2026 window, so the walk is in *Learn* —
    // the phase that introduces new concepts — whatever day the suite runs.
    await page.clock.setFixedTime(new Date('2026-06-01T10:00:00'))
    await page.goto('/dashboard')

    const tutor = page.getByRole('button', { name: /^Tutor/ })
    await expect(tutor).toBeVisible()
    await tutor.click()

    const panel = page.getByRole('complementary', { name: 'Tutor' })
    await expect(panel).toBeVisible()
    await expect(panel.getByText('Exam 5 · Learn').first()).toBeVisible()

    // The bank loads in the background; the session button appears with it.
    const start = panel.getByRole('button', { name: /^Start a .* session$/ })
    await expect(start).toBeVisible({ timeout: 30_000 })
    await start.click()

    // A brand-new account meets the first concept as a page, not a question.
    await expect(panel.getByText('New concept')).toBeVisible()
    await panel.getByRole('button', { name: 'I know it — check me' }).click()

    // The part: confidence before the reveal.
    const reveal = panel.getByRole('button', { name: /Reveal the answer|Check/ })
    await expect(reveal).toBeDisabled()
    await panel.getByRole('radio', { name: 'Unsure' }).click()
    await expect(reveal).toBeEnabled()
    await reveal.click()

    // Marked against the sample answer; a miss shows where candidates lose points.
    const noCredit = panel.getByRole('button', { name: /No credit/ })
    if (await noCredit.isVisible()) {
      await noCredit.click()
    }
    await panel.getByRole('button', { name: 'Next' }).click()
    await expect(panel.getByText(/1 answered/)).toBeVisible()

    await panel.getByRole('button', { name: 'End session' }).first().click()
    await expect(panel.getByRole('radiogroup', { name: 'Tutor view' })).toBeVisible()
  })

  test('says what it covers on another exam’s page, and folds away', async ({ page }) => {
    await askForTutor(page)
    await page.goto('/wiki/exam/Exam+7+(CAS)')
    await page.getByRole('button', { name: /^Tutor/ }).click()
    const panel = page.getByRole('complementary', { name: 'Tutor' })
    await expect(panel.getByText('The Tutor covers Exam 5 for now', { exact: false })).toBeVisible()

    await panel.getByRole('radio', { name: 'Journey' }).click()
    // The Tutor is the reader's own Gem Shop character — the first free one
    // until they pick one.
    await expect(panel.getByText('Your Tutor: Fox')).toBeVisible()
    await panel.getByRole('button', { name: 'Tuck the Tutor away' }).click()
    await expect(page.getByRole('button', { name: 'Show the Tutor' })).toBeVisible()
  })
})
