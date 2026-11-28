import { test, expect, type Page } from './test'
import { signIn } from './fixtures/signedIn'

// The Practice Exam debrief (docs/practice-exam-debrief.md): at the end of a
// Practice Exam the results carry an estimated CAS grade and each section's
// points and time. It is Pro's; a reader without Pro gets one row to Upgrade.

// Two questions from the Fall 2018 MAS-I paper: the estimate is that sitting's.
const PAPER = '/quiz?ids=masi-2018f-q1,masi-2018f-q2&mode=mock-exam&reveal=end'

async function sitPaper(page: Page) {
  await page.goto(PAPER)
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const optionA = page.getByRole('button', { name: 'Option A' })
  await expect(startQuiz.or(optionA).first()).toBeVisible()
  if (await startQuiz.isVisible()) await startQuiz.click()
  for (let i = 0; i < 2; i++) {
    await expect(optionA).toBeVisible()
    await optionA.click()
    await page.getByRole('button', { name: 'Check' }).click()
    await page.getByRole('button', { name: /^(Next|Submit Exam|Finish)/ }).last().click()
  }
  await expect(page).toHaveURL(/\/review/)
}

test.describe('practice exam debrief', () => {
  test('a Pro reader sees the estimated grade against the sitting\'s pass mark', async ({ page }) => {
    await signIn(page, { pro: true })
    await sitPaper(page)
    const grade = page.getByTestId('debrief-grade')
    await expect(grade).toBeVisible()
    await expect(grade).toContainText('of the Fall 2018 pass mark')
    await expect(grade).toContainText('restated without it')
    await expect(page.getByTestId('debrief-grade-value')).toHaveText(/^([0-5]|Pass)$/)
    await expect(page.getByRole('heading', { name: 'By section' })).toBeVisible()
  })

  test('a reader without Pro gets a row to Upgrade', async ({ page }) => {
    await signIn(page, { pro: false })
    await sitPaper(page)
    const row = page.getByTestId('debrief-pro')
    await expect(row).toBeVisible()
    await expect(page.getByTestId('debrief-grade')).toHaveCount(0)
    // A first right answer collects its card, and the level-up ceremony may be
    // playing over the results; the row is pressed under it.
    await row.dispatchEvent('click')
    await expect(page).toHaveURL(/\/upgrade/)
  })
})
