import { test, expect, type Page } from '@playwright/test'

// The two formats with a control of their own (lib/questionLayout.ts): a
// matching question is the option list once and a row of letters per item,
// and an ordering question is a list the reader rearranges.

async function open(page: Page, id: string) {
  await page.goto(`/quiz?ids=${id}&mode=quiz&reveal=during&links=0`)
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const confirm = page.getByRole('button', { name: 'Confirm Answer' })
  await expect(startQuiz.or(confirm).or(page.getByText('Keep this order')).first()).toBeVisible()
  if (await startQuiz.isVisible()) await startQuiz.click()
}

test.describe('question layouts', () => {
  test('a matching question takes a letter per item and grades each', async ({ page }) => {
    // masi-an-038: four items, keyed C, A, B, D.
    await open(page, 'masi-an-038')
    const rows = page.getByRole('radiogroup', { name: /Match for item/ })
    await expect(rows).toHaveCount(4)

    const keys = ['C', 'A', 'B', 'A'] // the last one wrong
    for (const [i, key] of keys.entries()) {
      await rows.nth(i).getByRole('radio', { name: `Option ${key}` }).click()
    }
    await expect(rows.nth(0).getByRole('radio', { name: 'Option C' })).toHaveAttribute('aria-checked', 'true')

    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await expect(page.getByText(/Correct match:/)).toHaveCount(1)
  })

  test('an ordering question is arranged rather than typed', async ({ page }) => {
    // masi-an-074: five items, keyed DBCEA.
    await open(page, 'masi-an-074')
    const list = page.getByRole('list', { name: 'Items to put in order' })
    await expect(list.getByRole('listitem')).toHaveCount(5)
    await expect(page.getByRole('textbox')).toHaveCount(0)

    // D to the top: D A B C E.
    for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Move D up' }).click()
    await expect(list.getByRole('listitem').first()).toContainText('Weibull')

    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await expect(page.getByText(/Correct order:/)).toContainText('D → B → C → E → A')
  })
})
