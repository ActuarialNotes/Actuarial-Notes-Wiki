import { test, expect } from '@playwright/test'

// The quiz builder's question search: every row carries the quiz's Info
// button, whose dialog opens over the search panel without closing it or
// toggling the row's selection, and closes on its own Escape.
test.describe('question search', () => {
  test('opens a question\'s Info from its row and returns to the panel', async ({ page }) => {
    await page.goto('/?topic=Probability')

    await page.getByRole('textbox', { name: 'Search questions' }).click()
    await page.getByRole('textbox', { name: 'Search questions' }).fill('p-004')

    const info = page.getByRole('button', { name: 'Question info' }).first()
    await expect(info).toBeVisible()
    await info.click()

    const dialog = page.getByRole('dialog', { name: 'Question info' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('p-004', { exact: true })).toBeVisible()

    // A press inside the dialog is the dialog's: the panel stays open and the
    // row is not selected by it.
    await dialog.getByRole('heading', { name: 'Question info' }).click()
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(info).toBeVisible()
    await expect(page.getByText(/\d+ selected/)).toHaveCount(0)
  })
})
