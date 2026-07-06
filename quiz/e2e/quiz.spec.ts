import { test, expect } from '@playwright/test'

// Runs the core learning flow end-to-end against a single bundled
// multiple-choice question (p-004), signed out: skip the collect gate, answer,
// confirm, finish, and land on the review/results screen. Mastery is written to
// localStorage (the offline fallback), so no Supabase backend is exercised.
test.describe('quiz', () => {
  test('answers a question and reaches the results screen', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')

    // A fresh signed-out session has no collected concepts, so the pre-quiz
    // collect gate appears first. Skip it straight into the questions.
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    if (await startQuiz.isVisible().catch(() => false)) {
      await startQuiz.click()
    }

    // The question card renders four options; p-004's answer is A.
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(optionA).toBeVisible()
    await optionA.click()

    await page.getByRole('button', { name: 'Confirm Answer' }).click()

    // Answer is now locked and revealed — the explanation panel shows and the
    // finish action appears (single-question quiz).
    const finish = page.getByRole('button', { name: /Finish Quiz/i })
    await expect(finish).toBeVisible()
    await finish.click()

    // Completing the quiz navigates to the review/results screen.
    await expect(page).toHaveURL(/\/review/)
    await expect(page.getByRole('heading', { name: 'Question Review' })).toBeVisible()
  })
})
