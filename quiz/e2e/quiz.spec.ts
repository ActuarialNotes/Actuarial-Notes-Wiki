import { test, expect } from '@playwright/test'

// Runs the core learning flow end-to-end against a single bundled
// multiple-choice question (p-004), signed out: skip the collect gate, answer,
// confirm, finish, and land on the review/results screen. Mastery is written to
// localStorage (the offline fallback), so no Supabase backend is exercised.
test.describe('quiz', () => {
  test('answers a question and reaches the results screen', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')

    // A fresh signed-out session has no collected concepts, so the pre-quiz
    // collect gate appears first. Skip it straight into the questions. The page
    // holds a spinner until mastery loads, so wait for whichever it settles on
    // rather than probing the gate button before it can exist.
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    // The question card renders four options; p-004's answer is A.
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(startQuiz.or(optionA).first()).toBeVisible()
    if (await startQuiz.isVisible()) {
      await startQuiz.click()
    }

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

// Each question starts clean: a free-entry answer typed on one question, and the
// self-grade given to it, must not still be showing on the next one. Both used
// to leak — the pending answer was cleared a frame too late for the card to see,
// and the part cards were keyed by a label ("a") that repeats across questions.
test.describe('open-answer carryover', () => {
  test('clears the entry and the self-grade when moving to the next question', async ({ page }) => {
    // Two consecutive multi-part CAS questions, each with a free-entry part a.
    await page.goto('/quiz?ids=cas5-2018-q3,cas5-2018-q4')

    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const partAInput = page.getByPlaceholder('Enter your answer…').first()
    await expect(startQuiz.or(partAInput).first()).toBeVisible()
    if (await startQuiz.isVisible()) {
      await startQuiz.click()
    }

    await expect(partAInput).toBeVisible()
    await partAInput.fill('Test')

    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    // Only part a was filled, so the incomplete-parts guard asks first.
    await page.getByRole('button', { name: 'Submit Anyway' }).click()

    // "Test" is wrong, so the part offers self-grading — take full credit.
    const fullCredit = page.getByRole('button', { name: /Full credit/ }).first()
    await expect(fullCredit).toBeVisible()
    await fullCredit.click()
    await expect(fullCredit).toHaveAttribute('aria-pressed', 'true')

    await page.getByRole('button', { name: 'Next Question →' }).click()

    // Next question: empty box, and no grade carried over (the buttons only
    // appear once an answer is locked in, so none should be on screen at all).
    const nextPartAInput = page.getByPlaceholder('Enter your answer…').first()
    await expect(nextPartAInput).toBeVisible()
    await expect(nextPartAInput).toHaveValue('')
    await expect(page.getByRole('button', { name: /Full credit/ })).toHaveCount(0)
    await expect(page.getByText('How did you do on this part?')).toHaveCount(0)

    // …and once this question is answered, its part starts ungraded rather than
    // wearing the grade given to the previous question's part a.
    await nextPartAInput.fill('Wrong')
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: 'Submit Anyway' }).click()
    const nextFullCredit = page.getByRole('button', { name: /Full credit/ }).first()
    await expect(nextFullCredit).toBeVisible()
    await expect(nextFullCredit).toHaveAttribute('aria-pressed', 'false')
    await expect(page.getByText('✓ Correct')).toHaveCount(0)
  })
})
