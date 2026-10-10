import { test, expect } from '@playwright/test'

// Actuarial Tools (docs/actuarial-tools.md): calculators that each do one
// thing, one live card each. The smoke checks the tab is in the sidebar, the
// catalogue lists the tools, a card recomputes as an input changes (no Run
// button), a result can be sent on to the next tool, a run link opens the run
// it names, and a scalar card fits a phone without scrolling (R10).
test.describe('tools', () => {
  test('opens from the sidebar and lists the tools by area', async ({ page }) => {
    await page.goto('/store')
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Tools' }).click()
    await expect(page).toHaveURL(/\/tools$/)
    await expect(page.getByRole('heading', { name: 'Tools', exact: true })).toBeVisible()
    for (const area of ['Reserving', 'Ratemaking', 'Loss distributions', 'Credibility', 'Financial mathematics']) {
      await expect(page.getByRole('heading', { name: area, exact: true })).toBeVisible()
    }
    await expect(page.getByTestId('tool-row').first()).toBeVisible()
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('recomputes the card as a cell changes, and shows the working', async ({ page }) => {
    await page.goto('/tools/bornhuetter-ferguson')
    const card = page.getByTestId('tool-card')
    const ultimate = card.getByTestId('tool-tile').first()
    const before = await ultimate.textContent()

    await card.getByLabel('Expected, row 4').fill('2950')
    await expect(ultimate).not.toHaveText(before ?? '')

    // A cell that isn't a number is named, and the last result is kept.
    await card.getByLabel('Latest, row 1').fill('lots')
    await expect(card.getByRole('alert')).toContainText('"latest" must be a number')
    await card.getByLabel('Latest, row 1').fill('1700')
    await expect(card.getByRole('alert')).toHaveCount(0)

    await card.getByText('Show working').click()
    await expect(card.getByText('% unreported, 2023')).toBeVisible()

    // The menu says what the tool was tested against: Friedland's Chapter 9 exhibit.
    await page.getByRole('button', { name: 'More' }).click()
    await expect(page.getByText('Tested against')).toBeVisible()
    await expect(page.getByRole('link', { name: /Friedland \(2010\), Ch\. 9, Exhibit I, Sheet 1, p\. 162/ })).toBeVisible()
  })

  test('sends age-to-age averages on to Development to Ultimate', async ({ page }) => {
    await page.goto('/tools/age-to-age-factors')
    await page.getByRole('button', { name: 'More' }).click()
    await page.getByRole('menuitem', { name: 'Send to Development to Ultimate' }).click()
    await expect(page).toHaveURL(/\/tools\/development-to-ultimate#input=/)
    // The averages arrive as the selected factors: 12–24 is 1,500 + 1,700 + 1,800 over 1,000 + 1,100 + 1,200.
    // (A cell prints its number to ten decimals once it isn't being edited.)
    await expect(page.getByLabel('Factor to next, row 1')).toHaveValue(String(Math.round((1500 + 1700 + 1800) / (1000 + 1100 + 1200) * 1e10) / 1e10))
  })

  test('opens the run a link names', async ({ page }) => {
    const input = { payment: 250, n: 4, i: 0 }
    const fragment = Buffer.from(JSON.stringify(input)).toString('base64url')
    await page.goto(`/tools/annuity#input=${fragment}`)
    await expect(page.getByTestId('tool-tile').first()).toHaveText('1,000.00')
  })

  test('draws two triangles, named, and divides them', async ({ page }) => {
    await page.goto('/tools/ratio-triangle')
    const card = page.getByTestId('tool-card')
    await expect(card.getByRole('region', { name: 'Numerator' })).toBeVisible()
    await expect(card.getByRole('region', { name: 'Denominator' })).toBeVisible()
    const latest = card.getByTestId('tool-tile').first()
    await expect(latest).toHaveText('0.4167')
    await card.getByRole('region', { name: 'Numerator' }).getByLabel('Origin 2023, age 12').fill('600')
    await expect(latest).toHaveText('0.5000')
  })

  test('takes rate changes beside the factors they produce', async ({ page }) => {
    await page.goto('/tools/on-level-factors')
    const card = page.getByTestId('tool-card')
    const latest = card.getByTestId('tool-tile').first()
    const before = await latest.textContent()
    await card.getByLabel('Change, row 3').fill('0.10')
    await expect(latest).not.toHaveText(before ?? '')
    await expect(card.getByRole('columnheader', { name: 'OLF' })).toBeVisible()
  })

  test('draws only the parameters the chosen distribution takes', async ({ page }) => {
    await page.goto('/tools/distribution')
    const card = page.getByTestId('tool-card')
    await expect(card.getByLabel('Mean value')).toBeVisible()
    await card.getByRole('combobox').selectOption('poisson')
    await expect(card.getByLabel('Mean count value')).toBeVisible()
    await expect(card.getByLabel('Mean value')).toHaveCount(0)
  })

  test('reads an effective date from the date control', async ({ page }) => {
    await page.goto('/tools/trend-factor')
    const card = page.getByTestId('tool-card')
    await card.getByLabel(/Rates effective/).fill('2026-01-01')
    await expect(card.getByTestId('tool-tile').nth(1)).toHaveText('3.5')
  })

  test('fits a scalar card on a phone without scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/tools/annuity')
    const box = await page.getByTestId('tool-card').boundingBox()
    expect(box).not.toBeNull()
    expect(box!.y + box!.height).toBeLessThanOrEqual(844)
  })

  test('searches the catalogue by name, short name and question, keeping the query in the URL', async ({ page }) => {
    await page.goto('/tools')
    const search = page.getByRole('textbox', { name: 'Search tools' })
    await search.fill('BF')
    await expect(page).toHaveURL(/[?&]q=BF/)
    await expect(page.getByTestId('tool-row').first()).toContainText('Bornhuetter-Ferguson')
    await search.fill('what loss ratio do the rates allow')
    await expect(page.getByTestId('tool-row').first()).toContainText('Permissible Loss Ratio')
    await page.getByTestId('tool-row').first().click()
    await expect(page).toHaveURL(/\/tools\/permissible-loss-ratio/)
    await page.goBack()
    await expect(search).toHaveValue('what loss ratio do the rates allow')
    await search.fill('zzzz')
    await expect(page.getByTestId('tool-no-results')).toBeVisible()
  })

  test('finds the next tool from a tool\'s own page', async ({ page }) => {
    await page.goto('/tools/development-to-ultimate')
    await page.getByRole('textbox', { name: 'Search tools' }).fill('cape')
    await page.getByTestId('tool-search-results').getByRole('button', { name: /Cape Cod/ }).click()
    await expect(page).toHaveURL(/\/tools\/cape-cod$/)
  })

  test('fills a column from the tool that produces it, and keeps the answer column on screen', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/tools/bornhuetter-ferguson')
    const card = page.getByTestId('tool-card')
    // The ultimate column is pinned at the right edge, inside the card.
    const cardBox = (await card.boundingBox())!
    const ult = (await card.getByRole('columnheader', { name: 'Ultimate' }).boundingBox())!
    expect(ult.x + ult.width).toBeLessThanOrEqual(cardBox.x + cardBox.width)
    // A typed amount prints with its separators once the cell is left.
    await card.getByLabel('Latest, row 1').fill('1700*2')
    await card.getByLabel('Latest, row 2').focus()
    await expect(card.getByLabel('Latest, row 1')).toHaveValue('3,400')
    await card.getByRole('button', { name: 'CDF column' }).click()
    await page.getByRole('button', { name: 'From Development to Ultimate' }).click()
    const sheet = page.getByTestId('source-sheet')
    await expect(sheet).toBeVisible()
    await sheet.getByRole('button', { name: 'Use these' }).click()
    await expect(sheet).toHaveCount(0)
    // The latest origin takes the first age's CDF: 1.5 × 1.1 × 1.03.
    await expect(card.getByLabel('CDF, row 4')).toHaveValue('1.6995')
    await card.getByRole('button', { name: 'CDF column' }).click()
    await page.getByLabel('Every row').fill('1.1')
    await page.getByRole('button', { name: 'Set', exact: true }).click()
    await expect(card.getByLabel('CDF, row 1')).toHaveValue('1.1')
  })

  test('selects the factors from the averages and sends the selections on', async ({ page }) => {
    await page.goto('/tools/age-to-age-factors')
    await page.getByRole('button', { name: 'Select Simple all at every age' }).click()
    await expect(page.getByTestId('selected-factor').first()).toContainText('Simple all')
    await page.getByRole('button', { name: 'More' }).click()
    await page.getByRole('menuitem', { name: 'Send selections to Development to Ultimate' }).click()
    await expect(page).toHaveURL(/\/tools\/development-to-ultimate#input=/)
    // 12–24, the simple mean: (1.5 + 1700/1100 + 1.5) / 3.
    const simple = (1.5 + 1700 / 1100 + 1.5) / 3
    await expect(page.getByLabel('Factor to next, row 1')).toHaveValue(String(Math.round(simple * 1e10) / 1e10))
  })
})
