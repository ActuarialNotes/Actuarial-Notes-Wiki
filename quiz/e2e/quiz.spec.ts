import { test, expect } from '@playwright/test'

// Runs the core learning flow end-to-end against a single bundled
// multiple-choice question (p-004), signed out: skip the concept list, answer,
// confirm, finish, and land on the review/results screen. Mastery is written to
// localStorage (the offline fallback), so no Supabase backend is exercised.
test.describe('quiz', () => {
  test('answers a question and reaches the results screen', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')

    // A fresh signed-out session has every concept at New, so the pre-quiz
    // concept list appears first. Skip it straight into the questions. The page
    // holds a spinner until mastery loads, so wait for whichever it settles on
    // rather than probing the list's button before it can exist.
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
    // Both questions have written parts still ungraded, so moving on asks for
    // their grades first — skip them; this test is about what carries over.
    await page.getByRole('dialog').getByRole('button', { name: 'Skip grading' }).click()

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

// A written answer is graded by the reader against the sample answer. Moving on
// without grading asks for the grade in a popup, which takes it there and then.
test.describe('written-answer grading', () => {
  test('shows each sample as its own card and asks for the grade before moving on', async ({ page }) => {
    // cas6c-2014s-q10: one written part, two sample answers ("Alternatively:").
    await page.goto('/quiz?ids=cas6c-2014s-q10')

    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const response = page.getByPlaceholder('Write your response here…')
    await expect(startQuiz.or(response).first()).toBeVisible()
    if (await startQuiz.isVisible()) {
      await startQuiz.click()
    }

    await response.fill('More competition lowers rates.')
    await page.getByRole('button', { name: 'Confirm Answer' }).click()

    // The sample answer is one panel holding a card per sample; the
    // examiner's report is a card of its own.
    const samples = page.getByRole('region', { name: 'Sample answer' })
    await expect(samples.getByRole('listitem', { name: /^Sample \d+ of \d+$/ })).toHaveCount(2)
    await expect(samples.getByRole('listitem', { name: 'Sample 2 of 2' })).toContainText('Foreign parent failure')
    await expect(page.getByRole('region', { name: "Examiner's report" })).toContainText('open ended nature')

    // Finishing without a grade: the popup holds the move until one is given.
    const finish = page.getByRole('button', { name: 'Finish Quiz' })
    await finish.click()
    const dialog = page.getByRole('dialog', { name: 'Grade your answer' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Finish Quiz' })).toBeDisabled()
    await dialog.getByRole('button', { name: /Partial/ }).click()
    await expect(dialog.getByRole('button', { name: 'Finish Quiz' })).toBeEnabled()

    // Back to the answer: the grade given in the popup is the question's own…
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(page.getByRole('button', { name: /Partial/ })).toHaveAttribute('aria-pressed', 'true')

    // …so finishing now doesn't ask again.
    await finish.click()
    await expect(page).toHaveURL(/\/review/)
  })
})
