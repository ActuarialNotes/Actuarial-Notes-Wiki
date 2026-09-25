import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

// The reveal choice, end to end (see quiz/src/lib/revealMode.ts). The same
// question answered with reveal=during unfolds its verdict and explanation, and
// with reveal=end gives nothing away until /review — and the choice belongs to
// the reader, not the mode, so a practice exam reveals too when asked to.
async function answerFirstOption(page: Page) {
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const optionA = page.getByRole('button', { name: 'Option A' })
  // A signed-out session has every concept at New, so the pre-quiz concept
  // list comes first; wait for whichever the page settles on.
  await expect(startQuiz.or(optionA).first()).toBeVisible()
  if (await startQuiz.isVisible()) await startQuiz.click()
  await expect(optionA).toBeVisible()
  await optionA.click()
  await page.getByRole('button', { name: 'Confirm Answer' }).click()
}

// The verdict banner the explanation panel leads with — the thing reveal='end'
// must withhold.
const VERDICT = /Correct!|Incorrect/

test.describe('answer reveal', () => {
  test('reveal=during marks and explains the answer inline', async ({ page }) => {
    await page.goto('/quiz?ids=p-004&mode=quiz&reveal=during')
    await answerFirstOption(page)
    await expect(page.getByText(VERDICT).first()).toBeVisible()
  })

  test('reveal=end holds the answer back until the review screen', async ({ page }) => {
    await page.goto('/quiz?ids=p-004&mode=quiz&reveal=end')
    await answerFirstOption(page)
    // Locked in — the finish action is there — but nothing is given away.
    await expect(page.getByRole('button', { name: /Finish Quiz/i })).toBeVisible()
    await expect(page.getByText(VERDICT)).toHaveCount(0)
  })

  test('a practice exam reveals when the reader asks it to', async ({ page }) => {
    await page.goto('/quiz?ids=p-004&mode=mock-exam&reveal=during')
    await answerFirstOption(page)
    await expect(page.getByText(VERDICT).first()).toBeVisible()
  })

  test('the builder checkbox is remembered across visits', async ({ page }) => {
    const label = 'Show answers after each question'
    await page.goto('/?topic=Probability')
    const box = page.getByRole('checkbox', { name: label })
    // A quiz defaults to answering as you go.
    await expect(box).toBeVisible()
    await expect(box).toHaveAttribute('aria-checked', 'true')

    await box.click()
    await expect(box).toHaveAttribute('aria-checked', 'false')

    await page.goto('/?topic=Probability')
    await expect(page.getByRole('checkbox', { name: label }))
      .toHaveAttribute('aria-checked', 'false')
  })
})
