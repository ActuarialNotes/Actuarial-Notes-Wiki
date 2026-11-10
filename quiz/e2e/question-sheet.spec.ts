import { test, expect, type Page } from './test'

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

test.describe('question spreadsheet on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

  /** A one-finger drag, as the browser's touch events. */
  async function swipe(page: Page, from: { x: number; y: number }, to: { x: number; y: number }) {
    const cdp = await page.context().newCDPSession(page)
    const steps = 12
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [from] })
    for (let i = 1; i <= steps; i++) {
      const x = from.x + ((to.x - from.x) * i) / steps
      const y = from.y + ((to.y - from.y) * i) / steps
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] })
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  }

  test('a drag scrolls the grid and leaves the question where it was', async ({ page }) => {
    const grid = await openQuestion(page, 'cas5-2013f-q21')
    const box = (await grid.boundingBox())!
    const pageScroll = await page.evaluate(() => window.scrollY)
    const scrollTop = () => page.locator('.question-sheet-grid .luckysheet-scrollbar-y').evaluate(el => el.scrollTop)
    const scrollLeft = () => page.locator('.question-sheet-grid .luckysheet-scrollbar-x').evaluate(el => el.scrollLeft)

    const mid = { x: box.x + box.width / 2, y: box.y + box.height / 2 }
    await swipe(page, { x: mid.x, y: mid.y + 80 }, { x: mid.x + 4, y: mid.y - 80 })
    await expect.poll(scrollTop).toBeGreaterThan(100)
    // A mostly vertical drag stays vertical.
    expect(await scrollLeft()).toBe(0)
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)

    await swipe(page, { x: mid.x + 100, y: mid.y }, { x: mid.x - 100, y: mid.y })
    await expect.poll(scrollLeft).toBeGreaterThan(100)
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)

    // A tap still selects the cell under it.
    const footer = page.getByRole('dialog', { name: 'Spreadsheet for this question' }).locator('footer')
    const before = await footer.textContent()
    await page.touchscreen.tap(mid.x, mid.y)
    await expect(footer).not.toHaveText(before ?? '')
  })

  test('the keypad enters numbers and formulas, and a second tap edits a cell', async ({ page }) => {
    const grid = await openQuestion(page, 'cas5-2013f-q21')
    const sheet = page.getByRole('dialog', { name: 'Spreadsheet for this question' })
    await sheet.getByRole('button', { name: 'Keypad' }).click()
    const keypad = sheet.getByRole('group', { name: 'Keypad' })
    await expect(keypad).toBeVisible()
    const entry = keypad.getByRole('textbox')
    // No zoom on focus: the field is past 16px.
    expect(parseFloat(await entry.evaluate(el => getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16)

    const key = (name: string) => keypad.getByRole('button', { name, exact: true })
    const press = async (...names: string[]) => { for (const n of names) await key(n).click() }
    const box = (await grid.boundingBox())!
    const p = { x: box.x + 130, y: box.y + 62 }

    await page.touchscreen.tap(p.x, p.y)
    const label = await entry.getAttribute('aria-label')
    const x = label!.replace('Contents of ', '')
    expect(x).toMatch(/^[A-Z]+\d+$/)

    // A number, entered with ↵, which moves down.
    await press('4', '2', 'Enter and move down')
    await expect(entry).not.toHaveAttribute('aria-label', label!)

    // A formula, its argument typed by tapping the cell above.
    await press('Equals')
    await page.touchscreen.tap(p.x, p.y)
    await expect(entry).toHaveValue(`=${x}`)
    // The cell it names is outlined on the grid in the reference's colour.
    const boxes = sheet.getByTestId('formula-ref-boxes').locator('div')
    await expect(boxes).toHaveCount(1)
    const outline = (await boxes.first().boundingBox())!
    expect(p.x).toBeGreaterThan(outline.x)
    expect(p.x).toBeLessThan(outline.x + outline.width)
    expect(p.y).toBeGreaterThan(outline.y)
    expect(p.y).toBeLessThan(outline.y + outline.height)
    await press('Plus', '1', 'Enter and move down')

    // Change the number: the formula follows it.
    await page.touchscreen.tap(p.x, p.y)
    await expect(entry).toHaveValue('42')
    await press('1', '0', 'Enter and move down')
    // The formula's cell shows its formula, not its value.
    await expect(entry).toHaveValue(`=${x}+1`)

    // Swiping along the function row scrolls it and types nothing (a tap
    // on a function would start a new formula here).
    const row = (await keypad.getByRole('button', { name: 'SUM', exact: true }).boundingBox())!
    await swipe(page, { x: row.x + 200, y: row.y + row.height / 2 }, { x: row.x + 20, y: row.y + row.height / 2 })
    await expect(entry).toHaveValue(`=${x}+1`)
    await keypad.getByRole('button', { name: 'Hide keypad' }).click()
    await expect(sheet.locator('footer')).toContainText('· 11')

    // Tap a cell, then tap it again: the keypad opens on what is in it. (The
    // grid has moved with the keypad gone; the cell is where it was in it.)
    const shifted = (await grid.boundingBox())!
    const q = { x: p.x, y: p.y + shifted.y - box.y }
    await page.touchscreen.tap(q.x, q.y)
    await expect(sheet.locator('footer')).toContainText(`${x} · 10`)
    await page.touchscreen.tap(q.x, q.y)
    await expect(keypad).toBeVisible()
    await expect(entry).toHaveValue('10')
  })
})
