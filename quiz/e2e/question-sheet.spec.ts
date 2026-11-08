import { test, expect, type Page } from '@playwright/test'

// Open in Spreadsheet (docs/question-spreadsheet.md): a CAS question opens a
// spreadsheet holding its own tables, docked beside it; a selected cell drops
// into the answer with Insert; the exam-day rules refuse or flag a function the
// Pearson VUE spreadsheet doesn't have; and the sheet pops out into a window.

async function openQuestion(page: Page, ids: string) {
  await page.goto(`/quiz?ids=${ids}`)
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const open = page.getByRole('button', { name: 'Open in spreadsheet' })
  await expect(startQuiz.or(open).first()).toBeVisible()
  if (await startQuiz.isVisible()) await startQuiz.click()
  await open.click()
  const grid = page.locator('.question-sheet-grid canvas').first()
  await expect(grid).toBeVisible()
  // The grid selects A1 when it is ready.
  await expect(page.getByRole('dialog', { name: 'Spreadsheet for this question' }).locator('footer')).toContainText('A1')
  return grid
}

/** Select a cell by walking from A1 with the arrow keys. */
async function goTo(page: Page, grid: ReturnType<Page['locator']>, right: number, down: number) {
  const box = (await grid.boundingBox())!
  await page.mouse.click(box.x + 30, box.y + 30)
  for (let i = 0; i < right; i++) await page.keyboard.press('ArrowRight')
  for (let i = 0; i < down; i++) await page.keyboard.press('ArrowDown')
}

test.describe('question spreadsheet', () => {
  test('lays out the question’s tables and inserts a cell into the answer', async ({ page }) => {
    const grid = await openQuestion(page, 'cas5-2013f-q21')
    const footer = page.getByRole('dialog', { name: 'Spreadsheet for this question' }).locator('footer')
    await expect(footer).toContainText('Cumulative Closed Claim Counts')

    // E3 is AY 2009's closed count at 48 months.
    await goTo(page, grid, 4, 2)
    await expect(footer).toContainText('E3 · 500')

    const answer = page.getByPlaceholder('Enter your answer…').first()
    await answer.fill('AY 2009 at 48 months: ')
    await page.getByRole('button', { name: /^Insert cell E3/ }).click()
    await expect(answer).toHaveValue('AY 2009 at 48 months: 500')
  })

  test('keeps the quiz’s keys out of the grid', async ({ page }) => {
    const grid = await openQuestion(page, 'cas5-2013f-q21')
    await goTo(page, grid, 6, 0)
    await page.keyboard.type('=SUM(B3:E3)', { delay: 30 })
    await page.keyboard.press('Enter')
    // Enter moved down a row; it didn't confirm the answer.
    await expect(page.getByRole('button', { name: 'Confirm Answer' })).toBeVisible()
    await page.keyboard.press('ArrowUp')
    await expect(page.getByRole('dialog', { name: 'Spreadsheet for this question' }).locator('footer')).toContainText('G1 · 1600')
  })

  test('refuses an off-list function under Enforce and flags it under Warn', async ({ page }) => {
    const grid = await openQuestion(page, 'cas5-2013f-q21')
    const sheet = page.getByRole('dialog', { name: 'Spreadsheet for this question' })

    await sheet.getByRole('button', { name: /Warn/ }).click()
    await sheet.getByRole('menuitemradio', { name: /Enforce/ }).click()
    await goTo(page, grid, 6, 0)
    await page.keyboard.type('=LET(x,2,x*3)', { delay: 30 })
    await page.keyboard.press('Enter')
    await expect(sheet.locator('footer')).toContainText('LET isn’t in the Pearson VUE spreadsheet')

    await sheet.getByRole('button', { name: /Enforce/ }).click()
    await sheet.getByRole('menuitemradio', { name: /Warn/ }).click()
    await goTo(page, grid, 6, 0)
    await page.keyboard.type('=FORECAST.LINEAR(5,B3:E3,B3:E3)', { delay: 30 })
    await page.keyboard.press('Enter')
    await expect(sheet.locator('footer')).toContainText('G1 uses FORECAST.LINEAR, which Pearson VUE doesn’t have', { timeout: 10_000 })
  })

  test('opens docked, pops out into a window and docks again', async ({ page }) => {
    await openQuestion(page, 'cas5-2013f-q21')
    const sheet = page.getByRole('dialog', { name: 'Spreadsheet for this question' })
    await expect(page.locator('html')).toHaveAttribute('data-question-sheet', 'docked')

    await sheet.getByRole('button', { name: 'Pop out' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-question-sheet', 'popped')
    await expect(sheet.getByRole('separator', { name: 'Resize the window' })).toBeVisible()

    await sheet.getByRole('button', { name: 'Dock beside the question' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-question-sheet', 'docked')
    await sheet.getByRole('button', { name: 'Close spreadsheet' }).click()
    await expect(sheet).toHaveCount(0)
  })

  test('offers no spreadsheet for an exam sat without one', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const flag = page.getByRole('button', { name: 'Flag question' })
    await expect(startQuiz.or(flag).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await expect(flag).toBeVisible()
    await expect(page.getByRole('button', { name: 'Open in spreadsheet' })).toHaveCount(0)
  })
})
