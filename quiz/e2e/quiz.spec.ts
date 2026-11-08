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
    await page.goto('/quiz?ids=cas5-2018f-q3,cas5-2018f-q4')

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
    // cas6c-2014s-q10: one written part, four sample answers ("Alternatively:").
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
    await expect(samples.getByRole('listitem', { name: /^Sample \d+ of \d+$/ })).toHaveCount(4)
    await expect(samples.getByRole('listitem', { name: 'Sample 2 of 4' })).toContainText('Foreign parent failure')
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

// The results screen scores the quiz by difficulty, and says so when every
// question was right and hard (lib/difficultyBreakdown.ts) — a reader with a
// perfect quiz shouldn't have to open each question to learn it wasn't a fluke.
test.describe('score by difficulty', () => {
  test('a perfect quiz of hard questions says they were hard', async ({ page }) => {
    await page.goto('/quiz?ids=p-027')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(startQuiz.or(optionA).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await optionA.click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: /Finish Quiz/i }).click()
    await expect(page).toHaveURL(/\/review/)
    await expect(page.getByText('It was rated Hard.')).toBeVisible()
  })
})

// A guest's first finished quiz asks them to save it (lib/guestSavePrompt.ts) —
// once: after "Not now" the next quiz goes straight to its results.
test.describe('guest save prompt', () => {
  async function finishOne(page: import('@playwright/test').Page) {
    await page.goto('/quiz?ids=p-004')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(startQuiz.or(optionA).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await optionA.click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: /Finish Quiz/i }).click()
    await expect(page).toHaveURL(/\/review/)
  }

  // The level-up ceremony, the streak flame and any quests play first; the
  // prompt waits for them, so step through each until it is the one open.
  async function pastCelebrations(page: import('@playwright/test').Page, prompt: import('@playwright/test').Locator) {
    const celebration = page.getByRole('dialog').getByRole('button', { name: /^(Continue|Keep it going|Later|Claim later)$/ }).first()
    await expect(async () => {
      if (await prompt.isVisible()) return
      if (await celebration.isVisible()) await celebration.click()
      await expect(prompt).toBeVisible({ timeout: 1000 })
    }).toPass({ timeout: 20000 })
  }

  test('asks after the first quiz, then never again', async ({ page }) => {
    await finishOne(page)
    const prompt = page.getByRole('dialog', { name: 'Save your progress' })
    await pastCelebrations(page, prompt)
    await expect(prompt.getByRole('button', { name: 'Create an account' })).toBeVisible()
    await prompt.getByRole('button', { name: 'Not now' }).click()
    await expect(prompt).toHaveCount(0)

    await finishOne(page)
    await expect(page.getByRole('heading', { name: 'Question Review' })).toBeVisible()
    await page.waitForTimeout(1500)
    await expect(prompt).toHaveCount(0)
  })

  test('Create an account opens the sign-up form', async ({ page }) => {
    await finishOne(page)
    const prompt = page.getByRole('dialog', { name: 'Save your progress' })
    await pastCelebrations(page, prompt)
    await prompt.getByRole('button', { name: 'Create an account' }).click()
    await expect(page).toHaveURL(/\/auth/)
    await expect(page.getByLabel('Confirm Password')).toBeVisible()
  })
})

// A calculation part's final figure is checked against the part's answer, and
// the grade it points to is suggested — outlined, never chosen (lib/numericCheck.ts,
// docs/answer-checking.md).
test.describe('suggested grade', () => {
  test('suggests full credit for the right figure, and leaves the grade to the reader', async ({ page }) => {
    // cas5-2018f-q5: one part, keyed "Approximately \$17,735 (thousands)" —
    // words the exact match can't read.
    await page.goto('/quiz?ids=cas5-2018f-q5')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const input = page.getByPlaceholder('Enter your answer…').first()
    await expect(startQuiz.or(input).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()

    await input.fill('17,736')
    await page.getByRole('button', { name: 'Confirm Answer' }).click()

    const suggestion = page.getByRole('note', { name: 'Suggested grade' })
    await expect(suggestion).toHaveCount(1)
    await expect(suggestion).toContainText('Suggested grade: Full credit')
    await expect(suggestion).toContainText('Your final figure, 17,736, matches the answer, 17,735.')
    // Suggested, not given.
    await expect(page.getByRole('button', { name: /Full credit \(suggested\)/ })).toHaveAttribute('aria-pressed', 'false')

    await page.getByRole('button', { name: /Full credit \(suggested\)/ }).click()
    await expect(page.getByRole('button', { name: /Full credit/ }).first()).toHaveAttribute('aria-pressed', 'true')
  })

  test('suggests it in the grading popup, from where the sample answer ends', async ({ page }) => {
    // cas5-2014f-q18 part a: an unkeyed Benktander calculation whose samples
    // both end at 8,764.44; part b is an essay, with nothing to suggest.
    await page.goto('/quiz?ids=cas5-2014f-q18')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const response = page.getByPlaceholder('Write your response here…').first()
    await expect(startQuiz.or(response).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()

    await response.fill('BF IBNR = 7,720\nBenktander IBNR = 8,761')
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: /Finish Quiz/ }).click()

    const dialog = page.getByRole('dialog')
    const note = dialog.getByRole('note', { name: 'Suggested grade' })
    await expect(note).toHaveCount(1)
    await expect(note).toContainText("Your final figure, 8,761, matches the sample answer's, 8,764.44.")
    await dialog.getByRole('button', { name: /Full credit \(suggested\)/ }).click()
    await expect(dialog.getByRole('button', { name: /Full credit/ }).first()).toHaveAttribute('aria-pressed', 'true')
  })
})

// An essay part's sample answer is a checklist: the reader ticks the points
// their answer makes, and the ticks suggest the grade (lib/essayChecklist.ts).
test.describe('essay checklist', () => {
  test('suggests a grade from the points ticked, here and in the grading popup', async ({ page }) => {
    // cas5-2018f-q8 part a: "List two likely consequences", two bulleted
    // points and a paragraph of other accepted consequences.
    await page.goto('/quiz?ids=cas5-2018f-q8')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const response = page.getByPlaceholder('Write your response here…').first()
    await expect(startQuiz.or(response).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()

    await response.fill('Retention will drop as people shop around.')
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    const submitAnyway = page.getByRole('button', { name: 'Submit Anyway' })
    if (await submitAnyway.isVisible()) await submitAnyway.click()

    const sample = page.getByRole('region', { name: 'Sample answer' }).first()
    await expect(sample.getByText('Tick each point your answer makes.')).toBeVisible()
    // No ticks, no suggestion.
    await expect(page.getByRole('note', { name: 'Suggested grade' })).toHaveCount(0)

    await sample.getByRole('checkbox', { name: 'Point 1' }).click()
    await expect(sample.getByRole('checkbox', { name: 'Point 1' })).toHaveAttribute('aria-checked', 'true')
    const note = page.getByRole('note', { name: 'Suggested grade' })
    await expect(note).toContainText('Suggested grade: Partial')
    await expect(note).toContainText('You ticked 1 of the 2 points in the sample answer.')

    // One of the other accepted consequences stands in for the second point.
    await sample.getByRole('checkbox', { name: 'Other accepted answers' }).click()
    await expect(note).toContainText('Suggested grade: Full credit')

    await page.getByRole('button', { name: /Finish Quiz/ }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('note', { name: 'Suggested grade' })).toContainText('Full credit')
    await expect(dialog.getByRole('button', { name: /Full credit \(suggested\)/ })).toHaveAttribute('aria-pressed', 'false')
  })
})

// Where the examiner's report lists what full credit needed, that list is the
// checklist, not the sample answer (reportRubric in lib/essayChecklist.ts).
test.describe('examiner rubric', () => {
  test('puts the boxes on what candidates were expected to do', async ({ page }) => {
    // cas5-2018f-q1 part a: "Candidates were expected to:" and three things to do.
    await page.goto('/quiz?ids=cas5-2018f-q1')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const response = page.getByPlaceholder('Write your response here…').first()
    await expect(startQuiz.or(response).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()

    await response.fill('Proportional, practical, historical precedence. Keep boat-years.')
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    const submitAnyway = page.getByRole('button', { name: 'Submit Anyway' })
    if (await submitAnyway.isVisible()) await submitAnyway.click()

    const report = page.getByRole('region', { name: "Examiner's report" }).first()
    await expect(report.getByText('Tick each point your answer makes.')).toBeVisible()
    await expect(report.getByRole('checkbox')).toHaveCount(3)
    // The sample answer reads as written, with no boxes of its own.
    await expect(page.getByRole('region', { name: 'Sample answer' }).first().getByRole('checkbox')).toHaveCount(0)

    await report.getByRole('checkbox', { name: 'Point 1' }).click()
    await report.getByRole('checkbox', { name: 'Point 3' }).click()
    const note = page.getByRole('note', { name: 'Suggested grade' }).first()
    await expect(note).toContainText('Suggested grade: Partial')
    await expect(note).toContainText("You ticked 2 of the 3 points the examiner's report asks for.")
  })
})
