import { test, expect } from './test'

// The one search (`/search`, pages/Search.tsx): a field over concepts,
// resources and questions, four tabs with counts, and under Questions a row
// per question with the quiz's Info button and one filled button that starts a
// quiz on the results.
test.describe('search', () => {
  test('opens a question\'s Info from its row and returns to the results', async ({ page }) => {
    await page.goto('/search')

    await page.getByRole('searchbox', { name: 'Search' }).fill('p-004')
    await page.getByRole('tab', { name: /^Questions/ }).click()
    await expect(page).toHaveURL(/q=p-004/)
    await expect(page).toHaveURL(/tab=questions/)

    const info = page.getByRole('button', { name: 'Question info' }).first()
    await expect(info).toBeVisible()
    await info.click()

    const dialog = page.getByRole('dialog', { name: 'Question info' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('p-004', { exact: true })).toBeVisible()

    // A press inside the dialog is the dialog's: the results stay where they are.
    await dialog.getByRole('heading', { level: 2 }).click()
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(info).toBeVisible()
    await expect(page).toHaveURL(/\/search\?/)
  })

  test('the tabs count what the query found, and All shows each kind', async ({ page }) => {
    await page.goto('/search?q=poisson')

    await expect(page.getByRole('tab', { name: /^All \d+$/ })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('tab', { name: /^Concepts [1-9]\d*$/ })).toBeVisible()
    await expect(page.getByRole('tab', { name: /^Questions [1-9]\d*$/ })).toBeVisible()

    await expect(page.getByRole('region', { name: 'Concepts' })).toBeVisible()
    const questions = page.getByRole('region', { name: 'Questions' })
    await expect(questions.getByTestId('search-question')).toHaveCount(2)
    // The matched word is marked in a row.
    await expect(page.locator('mark').first()).toHaveText(/poisson/i)

    // The row for the rest opens that kind's tab.
    await questions.getByRole('button', { name: /^\d+ more$/ }).click()
    await expect(page.getByRole('tab', { name: /^Questions/ })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('button', { name: /^Practice (these|the first) \d+$/ })).toBeVisible()
  })

  test('"Practice these N" starts a quiz on the results', async ({ page }) => {
    await page.goto('/search?q=p-004&tab=questions')

    await expect(page.getByTestId('search-question')).toHaveCount(1)
    await page.getByRole('button', { name: 'Practice this question' }).click()

    await expect(page).toHaveURL(/\/quiz\?/)
    await expect(page).toHaveURL(/selection=stored/)
    await expect(page).toHaveURL(/from=search/)
  })

  test('an old link to the question search still lands', async ({ page }) => {
    await page.goto('/search?type=questions&q=poisson')
    await expect(page.getByRole('tab', { name: /^Questions/ })).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('button', { name: /^Practice (these|the first) \d+$/ })).toBeVisible()
  })
})
