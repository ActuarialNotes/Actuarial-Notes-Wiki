import { test, expect } from '@playwright/test'

// The quiz setup screen (pages/Landing.tsx): a card for the reader's own quiz,
// whose pills open the setup sheet, and tiles for the whole papers — a
// practice exam drawn to the paper's shape, and the past papers. And, in the
// quiz, a concept the question names opens in the concept popup —
// highlighted on the card, the way a study guide's link is.

test.describe('quiz setup', () => {
  test("a pill opens the sheet, and the card's count follows it", async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByTestId('quiz-pill').first().click()
    const sheet = page.getByRole('dialog', { name: 'Your quiz' })
    await expect(sheet).toBeVisible()
    await sheet.getByRole('radio', { name: '5 questions' }).click()
    await expect(sheet.getByRole('button', { name: 'Start 5 questions' })).toBeVisible()

    await sheet.getByRole('button', { name: 'Close' }).click()
    await expect(sheet).toBeHidden()
    const card = page.getByRole('region', { name: 'Your quiz' })
    await expect(card).toContainText('5questions')
    await card.getByRole('button', { name: 'Start quiz' }).click()
    await expect(page).toHaveURL(/mode=quiz/)
    await expect(page).toHaveURL(/count=5/)
  })

  test('the count opens the sheet at How many, which takes any number', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByTestId('quiz-count').click()
    const sheet = page.getByRole('dialog', { name: 'Your quiz' })
    await expect(sheet).toBeVisible()
    const other = sheet.getByRole('textbox', { name: /Other number of questions/ })
    await expect(other).toBeInViewport()
    await other.fill('12')
    await expect(sheet.getByRole('button', { name: 'Start 12 questions' })).toBeVisible()
    await sheet.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByRole('region', { name: 'Your quiz' })).toContainText('12questions')
  })

  test('a past paper is sat whole, as a practice exam', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByRole('button', { name: /Past Papers/ }).click()
    const sheet = page.getByRole('dialog', { name: 'Past Papers' })
    await sheet.getByRole('radio', { name: /Spring 2019/ }).click()
    await sheet.getByRole('button', { name: 'Start Spring 2019' }).click()
    await expect(page).toHaveURL(/mode=mock-exam/)
    await expect(page).toHaveURL(/year=2019/)
  })

  test('a practice exam is drawn from the whole bank', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByRole('button', { name: /Practice exam/i }).click()
    await page.getByRole('dialog', { name: 'Practice Exam' })
      .getByRole('button', { name: 'Start Practice Exam' }).click()
    await expect(page).toHaveURL(/mode=mock-exam/)
    await expect(page.getByRole('button', { name: /Quit exam/ })).toBeVisible()
  })

  test("today's plan is shown locked to a reader without Pro", async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    const plan = page.getByTestId('todays-plan-tile')
    await expect(plan).toHaveAttribute('aria-disabled', 'true')
    await expect(plan).toContainText('Pro')
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
