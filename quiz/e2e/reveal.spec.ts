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
    // The choice lives in the settings menu beside the deck card.
    const settings = page.getByRole('button', { name: 'Quiz settings' })
    await page.goto('/?topic=Probability')
    await settings.click()
    const box = page.getByRole('checkbox', { name: label })
    // A quiz defaults to answering as you go.
    await expect(box).toBeVisible()
    await expect(box).toHaveAttribute('aria-checked', 'true')

    await box.click()
    await expect(box).toHaveAttribute('aria-checked', 'false')

    await page.goto('/?topic=Probability')
    await settings.click()
    await expect(page.getByRole('checkbox', { name: label }))
      .toHaveAttribute('aria-checked', 'false')
  })
})

// A practice exam held back to the end grades its written parts on one screen
// before the results: one question at a time, with a bar of the questions
// saying which are graded and jumping to any of them.
test.describe('end-of-exam self-grading', () => {
  test('walks the written questions one at a time and shows what is graded', async ({ page }) => {
    await page.goto('/quiz?ids=cas6c-2014s-q10,cas6c-2014s-q12&mode=mock-exam&reveal=end')

    for (let i = 0; i < 2; i++) {
      const box = page.getByPlaceholder('Write your response here…').first()
      await expect(box).toBeVisible()
      for (const field of await page.getByPlaceholder('Write your response here…').all()) {
        await field.fill('An answer.')
      }
      await page.getByRole('button', { name: 'Confirm Answer' }).click()
      const next = page.getByRole('button', { name: /^(Next|Submit Exam|Finish)/ }).last()
      await next.click()
    }

    const bar = page.getByRole('tablist', { name: 'Questions to grade' })
    await expect(bar.getByRole('tab')).toHaveCount(2)
    const first = bar.getByRole('tab').first()
    await expect(first).toHaveAttribute('aria-selected', 'true')
    await expect(first).toHaveAccessibleName(/0 of \d+ parts graded/)

    // Grading every part of the open question marks its chip graded.
    for (const button of await page.getByRole('button', { name: /No credit/ }).all()) {
      await button.click()
    }
    await expect(first).toHaveAccessibleName(/graded$/)

    // A chip jumps straight to its question; the last one submits.
    await bar.getByRole('tab').last().click()
    await expect(bar.getByRole('tab').last()).toHaveAttribute('aria-selected', 'true')
    await page.getByRole('button', { name: 'Submit Exam' }).first().click()
    await expect(page).toHaveURL(/\/review/)
  })
})
