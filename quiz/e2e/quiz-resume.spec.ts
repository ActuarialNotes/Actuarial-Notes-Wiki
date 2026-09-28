import { test, expect, type Page } from '@playwright/test'

// A quiz outlives its page (lib/quizResume.ts): leaving /quiz mid-way keeps the
// session, a "Return to quiz" pill follows the reader around the app, and it
// offers two things — Return, to the question they left with their answers
// intact, or Leave, which discards the quiz.

const QUIZ = '/quiz?ids=p-004,p-005&timed=1'

/** Open a quiz and get past the pre-quiz concept list to the first question. */
async function openQuiz(page: Page, url = QUIZ) {
  await page.goto(url)
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const optionA = page.getByRole('button', { name: 'Option A' })
  await expect(startQuiz.or(optionA).first()).toBeVisible()
  if (await startQuiz.isVisible()) await startQuiz.click()
  await expect(optionA).toBeVisible()
}

const pill = (page: Page) => page.getByRole('button', { name: /Return to quiz/ })

test.describe('quiz in progress', () => {
  test('follows the reader around the app and returns them to where they were', async ({ page }) => {
    await openQuiz(page)
    await page.getByRole('button', { name: 'Option A' }).click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await expect(page.getByRole('button', { name: /Next Question/ })).toBeVisible()
    // Not on the quiz itself — the quiz page has its own header.
    await expect(pill(page)).toHaveCount(0)

    await page.getByRole('link', { name: 'Study Guides' }).first().click()
    await page.waitForURL('**/wiki')

    // Where they had got to, and — timed — the clock, still running.
    await expect(pill(page)).toBeVisible()
    await expect(pill(page)).toHaveAccessibleName(/question 1 of 2/)
    await expect(pill(page).getByRole('timer')).toBeVisible()

    // It stays with them from page to page.
    await page.getByRole('link', { name: 'Flashcards' }).first().click()
    await page.waitForURL('**/flashcards')
    await expect(pill(page)).toBeVisible()

    await pill(page).click()
    const choice = page.getByRole('dialog', { name: 'Quiz in progress' })
    await expect(choice).toBeVisible()
    await expect(choice).toContainText('Leaving discards 1 answer.')
    await choice.getByRole('button', { name: 'Return' }).click()

    // Back on the same question, still answered: the concept list isn't shown
    // again, the answer is still locked in, and the clock carried on.
    await expect(page).toHaveURL(/\/quiz\?ids=p-004,p-005&timed=1$/)
    await expect(page.getByRole('button', { name: 'Start Quiz' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: /Next Question/ })).toBeVisible()
    await expect(page.getByRole('timer')).toBeVisible()
    await expect(pill(page)).toHaveCount(0)
  })

  test('Leave discards the quiz', async ({ page }) => {
    await openQuiz(page)
    await page.getByRole('button', { name: 'Option A' }).click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()

    await page.getByRole('link', { name: 'Study Guides' }).first().click()
    await page.waitForURL('**/wiki')
    await pill(page).click()
    await page.getByRole('dialog', { name: 'Quiz in progress' }).getByRole('button', { name: 'Leave' }).click()
    await expect(pill(page)).toHaveCount(0)

    // Opening the same quiz again draws it afresh: nothing is answered.
    await openQuiz(page)
    await expect(page.getByRole('button', { name: /Next Question/ })).toHaveCount(0)
  })

  test.describe('with page moves animated', () => {
    // The route change after Quit is a view transition, which lands a frame or
    // two after the store resets; the quiz page must not start a new quiz in
    // that gap and leave a pill behind for it.
    test.use({ reducedMotion: 'no-preference' })

    test('quitting from the quiz leaves no pill behind', async ({ page }) => {
      await openQuiz(page)
      await page.getByRole('button', { name: /Quit quiz/ }).click()
      await page.getByRole('dialog').getByRole('button', { name: /Quit quiz/ }).click()
      await page.waitForURL(url => url.pathname === '/')
      await expect(page.locator('button[data-tour="quiz-exam-p"]')).toBeVisible()
      await expect(pill(page)).toHaveCount(0)
    })
  })
})
