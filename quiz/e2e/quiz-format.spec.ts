import { test, expect } from '@playwright/test'

// The quiz builder's two choices, kept apart: *where* the questions come from
// (Today's Plan, By Topic, Past Papers) and *how* they are sat (Quiz or
// Practice Exam). And, in the quiz, a concept the question names opens in the
// concept popup — highlighted on the card, the way a study guide's link is.

test.describe('quiz format', () => {
  test('a past paper can be sat as a quiz or as a practice exam', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    const start = page.getByRole('button', { name: /^Start / })
    await page.getByRole('radio', { name: 'Past Papers' }).click()
    await page.getByRole('radio', { name: /Spring 2019/ }).click()

    // The source stays put while the format changes.
    await expect(start).toHaveText(/Start Quiz/)
    await page.getByRole('radio', { name: /Practice Exam/ }).click()
    await expect(start).toHaveText(/Start Practice Exam/)
    await expect(page.getByRole('radio', { name: /Spring 2019/ })).toHaveAttribute('aria-checked', 'true')

    await page.getByRole('radio', { name: /^Quiz/ }).click()
    await start.click()
    await expect(page).toHaveURL(/mode=quiz/)
    await expect(page).toHaveURL(/year=2019/)
  })

  test('a set of topics can be sat as a practice exam', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByRole('radio', { name: /Practice Exam/ }).click()
    await page.getByRole('button', { name: 'Start Practice Exam' }).click()
    await expect(page).toHaveURL(/mode=mock-exam/)
    await expect(page.getByRole('button', { name: /Quit exam/ })).toBeVisible()
  })
})

test.describe('concepts in a question', () => {
  test('a named concept opens in the popup and is highlighted on the card', async ({ page }) => {
    await page.goto('/quiz?ids=cas6c-2015s-q33&mode=quiz&reveal=during&links=1')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const mention = page.getByRole('button', { name: 'Read Materiality' }).first()
    await expect(startQuiz.or(mention).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()

    await mention.click()
    await expect(page.locator('.wiki-link--active')).toHaveCount(1)
    await expect(page.locator('[data-concept-mention].wiki-link--active')).toHaveCount(1)
  })

  test('no concept is linked when the reader turned it off', async ({ page }) => {
    await page.goto('/quiz?ids=cas6c-2015s-q33&mode=quiz&reveal=during&links=0')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const stem = page.getByText('Describe the concept of materiality.')
    await expect(startQuiz.or(stem).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await expect(stem).toBeVisible()
    await expect(page.locator('[data-concept-mention]')).toHaveCount(0)
  })
})
