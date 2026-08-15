import { test, expect, type Page } from '@playwright/test'

// The supplemental-booklet flow: a question that can't be answered without its
// case study must offer the study from the question itself, and must stay
// answerable while the study is open — that's the whole point of the panel being
// non-modal rather than a dialog. Driven signed-out against masii-2019s-q1,
// which declares `case_study: masii-2019s-systolic`.

/**
 * Open a single-question quiz and clear the pre-quiz collect gate.
 *
 * The gate only appears for concepts that have a comprehension check authored,
 * so it is genuinely conditional — but it also renders a beat after navigation.
 * Waiting on "gate *or* first option" before deciding keeps this deterministic;
 * a bare `isVisible()` races the render and silently skips the click.
 */
async function openQuestion(page: Page, id: string) {
  await page.goto(`/quiz?ids=${id}`)
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const firstOption = page.getByRole('button', { name: 'Option A' })
  await expect(startQuiz.or(firstOption).first()).toBeVisible()
  if (await startQuiz.isVisible()) await startQuiz.click()
  await expect(firstOption).toBeVisible()
}

test.describe('case study', () => {
  test('opens the study from the question and keeps the question live', async ({ page }) => {
    await openQuestion(page, 'masii-2019s-q1')

    // The button rides on the question card, not the quiz chrome.
    const openStudy = page.getByRole('button', { name: 'Case Study' })
    await expect(openStudy).toBeVisible()
    await openStudy.click()

    const panel = page.getByRole('complementary', { name: /Case study: Systolic Blood Pressure/ })
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('heading', { name: 'Systolic Blood Pressure Case Study' })).toBeVisible()

    // Real content made it through the markdown pipeline — Model 1's AIC is the
    // number question 2 is decided on.
    await expect(panel.getByText('7327.429')).toBeVisible()

    // Non-modal: the answer options behind the panel are still clickable, so a
    // candidate can read a figure and answer without closing anything.
    await page.getByRole('button', { name: 'Option B' }).click()
    await expect(panel).toBeVisible()

    // Esc closes it.
    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(openStudy).toBeVisible()
  })

  test('shows no case-study button on a question without one', async ({ page }) => {
    await openQuestion(page, 'masii-2019s-q3')
    await expect(page.getByRole('button', { name: 'Case Study' })).toHaveCount(0)
  })
})
