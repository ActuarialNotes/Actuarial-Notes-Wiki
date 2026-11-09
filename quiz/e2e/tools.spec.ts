import { test, expect } from './test'

// Actuarial Tools (docs/actuarial-tools.md): calculators that each do one
// thing, one live card each. The smoke checks the tab is in the sidebar, the
// catalogue lists the tools, a card recomputes as an input changes (no Run
// button), a result can be sent on to the next tool, a run link opens the run
// it names, and a scalar card fits a phone without scrolling (R10).
/** A factor as a grid cell prints it once it isn't being edited: 1.000, 1.5152 (every digit is kept). */
const factor = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 4, useGrouping: false })

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
    await expect(card.getByRole('alert')).toContainText('Latest must be a number')
    await card.getByLabel('Latest, row 1').fill('1700')
    await expect(card.getByRole('alert')).toHaveCount(0)

    await card.getByText('Show working').click()
    await expect(card.getByText('% unreported, 2023')).toBeVisible()

    // The menu says what the tool was tested against: Friedland's Chapter 9 exhibit.
    await page.getByRole('button', { name: 'More' }).click()
    await expect(page.getByText('Tested against', { exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /Friedland \(2010\), Ch\. 9, Exhibit I, Sheet 1, p\. 162/ })).toBeVisible()
  })

  test('sends age-to-age averages on to Development to Ultimate', async ({ page }) => {
    await page.goto('/tools/age-to-age-factors')
    await page.getByRole('button', { name: 'More' }).click()
    await page.getByRole('menuitem', { name: 'Send to Development to Ultimate' }).click()
    await expect(page).toHaveURL(/\/tools\/development-to-ultimate\?from=age-to-age-factors#input=/)
    // The averages arrive as the selected factors: 12–24 is 1,500 + 1,700 + 1,800 over 1,000 + 1,100 + 1,200.
    await expect(page.getByLabel('Factor to next, row 1')).toHaveValue(factor((1500 + 1700 + 1800) / (1000 + 1100 + 1200)))
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

  // The tool template (§19) trades this for an answer that rides in the title
  // strip once its card scrolls away — its own test is below.
  test('fits every scalar card, figure and all, on a phone without scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    for (const slug of [
      'annuity', 'bond-yield', 'buhlmann-credibility', 'partial-credibility',
      'full-credibility-standard', 'expected-payment',
      'loss-ratio-method', 'pure-premium-method', 'interest-converter',
    ]) {
      await page.goto(`/tools/${slug}`)
      await expect(page.getByTestId('tool-figure')).toBeVisible()
      const box = await page.getByTestId('tool-card').boundingBox()
      expect(box, slug).not.toBeNull()
      expect(box!.y + box!.height, slug).toBeLessThanOrEqual(844)
    }
  })

  test('draws a figure that follows the inputs, and sets an input when its point is dragged', async ({ page }) => {
    await page.goto('/tools/partial-credibility')
    const card = page.getByTestId('tool-card')
    const z = card.getByTestId('tool-tile').first()
    const before = await z.textContent()
    const svg = card.getByTestId('tool-figure').locator('svg')
    const box = (await svg.boundingBox())!
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2)
    await page.mouse.down()
    await page.mouse.up()
    await expect(z).not.toHaveText(before ?? '')
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
    const ult = (await card.getByRole('columnheader', { name: /Ultimate/ }).boundingBox())!
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
    await expect(card.getByLabel('CDF, row 1')).toHaveValue('1.100')
  })

  test('selects the factors from the averages and sends the selections on', async ({ page }) => {
    await page.goto('/tools/age-to-age-factors')
    await page.getByRole('button', { name: 'Select Simple all at every age' }).click()
    await expect(page.getByTestId('selected-factor').first()).toContainText('Simple all')
    await page.getByRole('button', { name: 'More' }).click()
    await page.getByRole('menuitem', { name: 'Send selections to Development to Ultimate' }).click()
    await expect(page).toHaveURL(/\/tools\/development-to-ultimate\?from=age-to-age-factors#input=/)
    // 12–24, the simple mean: (1.5 + 1700/1100 + 1.5) / 3.
    const simple = (1.5 + 1700 / 1100 + 1.5) / 3
    await expect(page.getByLabel('Factor to next, row 1')).toHaveValue(factor(simple))
  })

  test('keeps the reader\'s inputs between visits, and a reset can be undone', async ({ page }) => {
    await page.goto('/tools/ratio-triangle')
    const card = page.getByTestId('tool-card')
    const latest = card.getByTestId('tool-tile').first()
    await card.getByRole('region', { name: 'Numerator' }).getByLabel('Origin 2023, age 12').fill('600')
    await expect(latest).toHaveText('0.5000')
    await page.reload()
    await expect(latest).toHaveText('0.5000')
    await card.getByRole('button', { name: 'Reset to the example' }).click()
    await expect(latest).toHaveText('0.4167')
    await card.getByTestId('tool-undo-reset').click()
    await expect(latest).toHaveText('0.5000')
  })

  test('says what is wrong with an input under that input', async ({ page }) => {
    await page.goto('/tools/ratio-triangle')
    const card = page.getByTestId('tool-card')
    const denominator = card.getByRole('region', { name: 'Denominator' })
    await denominator.getByLabel('Origin 2023, age 12').fill('')
    await expect(denominator.getByRole('alert')).toContainText('row 3')
    await denominator.getByRole('button', { name: 'Clear every cell' }).click()
    await expect(denominator.getByLabel('Origin 2021, age 12')).toHaveValue('')
  })
  // The Assumptions Bank (docs/assumptions-bank.md): a published figure taken
  // into a tool, from the shelf or from the field's own From… menu, and the
  // run saying where it came from.
  test('takes a published figure from the Assumptions Bank into a tool, with its source', async ({ page }) => {
    await page.goto('/tools')
    await page.getByTestId('assumptions-row').click()
    await expect(page).toHaveURL(/\/tools\/assumptions$/)
    await expect(page.getByTestId('assumption-set').first()).toBeVisible()
    await page.getByRole('button', { name: 'Profit provision', exact: true }).click()
    await expect(page.getByTestId('assumption-set')).toHaveCount(1)
    await page.getByRole('button', { name: /^Use Profit provision/ }).click()
    await page.getByRole('link', { name: /Use Profit provision .* as Profit & contingency in Permissible Loss Ratio/ }).click()
    await expect(page).toHaveURL(/\/tools\/permissible-loss-ratio#input=/)

    // The template (§19): the value pill, and a source tag naming the document.
    const card = page.getByTestId('tool-card')
    const pill = card.getByRole('button', { name: 'Profit & contingency value' })
    await expect(pill).toHaveText('6%')
    const row = card.locator('[data-field="profit"]')
    await expect(row.locator('[data-source="published"]')).toContainText('AIRB, Alberta')
    // The chip opens the figure's explanation in place, under the row (template v2, §3.5).
    await row.locator('[data-source="published"]').click()
    await expect(row.getByTestId('figure-details')).toContainText('maximum profit provision')
    await expect(row.getByTestId('figure-details')).toContainText('Private passenger vehicles')
    await expect(row.getByTestId('tool-unchecked')).toBeVisible()
    await expect(card.getByTestId('tool-tile').first()).toHaveText('69%')

    // A number of the reader's own, typed on the sheet's keypad, replaces the figure and its source.
    await pill.click()
    const sheet = page.getByTestId('value-sheet')
    await sheet.getByRole('button', { name: '4', exact: true }).click()
    await expect(sheet.getByTestId('keypad-entry')).toHaveText('4%')
    await sheet.getByRole('button', { name: 'Done' }).click()
    await expect(pill).toHaveText('4%')
    await expect(row.locator('[data-source="yours"]')).toBeVisible()
    await expect(row.locator('[data-source="published"]')).toHaveCount(0)
  })

  test('picks a published figure in a template tool\'s edit sheet, and goes back to the default', async ({ page }) => {
    await page.goto('/tools/permissible-loss-ratio')
    const card = page.getByTestId('tool-card')
    await card.getByRole('button', { name: 'Profit & contingency value' }).click()
    const sheet = page.getByTestId('value-sheet')
    const figures = sheet.getByTestId('tool-bank-figures')
    // Level 1, then level 2 in place: what it is, and Use.
    await figures.getByTestId('figure-line').filter({ hasText: '6.0%' }).click()
    await expect(figures.getByTestId('figure-details')).toContainText('Your 5% is below this cap.')
    await figures.getByRole('button', { name: 'Use 6.0%' }).click()
    await expect(sheet.getByTestId('value-sheet-value')).toHaveText('6%')
    await expect(figures.getByTestId('figure-in-use')).toBeVisible()
    await sheet.getByRole('radio', { name: /Back to the default/ }).click()
    await expect(sheet.getByTestId('value-sheet-value')).toHaveText('5%')
    await sheet.getByRole('button', { name: 'Done' }).click()
    await expect(card.locator('[data-field="profit"] [data-source="default"]')).toBeVisible()
  })

  // Template v2 (docs/tool-template-v2.md): navigation and connection.
  test('carries Expense Ratios into Permissible Loss Ratio, arriving linked, and unlinks', async ({ page }) => {
    await page.goto('/tools/expense-ratios')
    const card = page.getByTestId('tool-card')
    // Nothing feeds it; the answer leads with the total, the published total under the bar.
    await expect(card.getByTestId('tool-takes-from')).toHaveCount(0)
    await expect(card.getByTestId('tool-tile').first()).toHaveText('28.084%')
    await expect(card.getByTestId('tool-comparison')).toContainText('27.8%')
    const gives = card.getByTestId('tool-gives-to')
    await gives.getByRole('button', { name: /Gives to/ }).click()
    await expect(gives.getByTestId('carried-value').first()).toContainText('F 11.028%')
    await gives.getByRole('button', { name: 'Open Permissible Loss Ratio' }).click()
    await expect(page).toHaveURL(/\/tools\/permissible-loss-ratio\?from=expense-ratios#input=/)

    const plr = page.getByTestId('tool-card')
    await expect(page.getByTestId('tool-breadcrumb')).toContainText('Expense Ratios')
    await expect(plr.getByTestId('tool-takes-from')).toContainText('Expense Ratios')
    const fixed = plr.locator('[data-field="fixed"]')
    await expect(fixed.locator('[data-source="linked"]')).toContainText('Expense Ratios')
    await expect(fixed.locator('[data-linked]')).toBeVisible()
    await fixed.locator('[data-source="linked"]').click()
    await fixed.getByTestId('link-details').getByRole('button', { name: 'Unlink' }).click()
    await expect(fixed.locator('[data-source="yours"]')).toBeVisible()
    // Back through the breadcrumb returns to the tool that sent it.
    await page.getByTestId('tool-breadcrumb').getByRole('link', { name: 'Expense Ratios' }).click()
    await expect(page).toHaveURL(/\/tools\/expense-ratios/)
  })

  test('lists the tools in front of Trend Factor, and the trends the document holds but the bank hasn\'t entered', async ({ page }) => {
    await page.goto('/tools/trend-factor')
    const card = page.getByTestId('tool-card')
    await expect(card.getByTestId('tool-tile').first()).toHaveText('1.0767')
    const takes = card.getByTestId('tool-takes-from')
    await expect(takes).toContainText('+ 2 more')
    await expect(card.getByTestId('shared-default')).toBeVisible()
    await card.getByRole('button', { name: /^Annual trend/ }).click()
    const sheet = page.getByTestId('value-sheet')
    await expect(sheet.getByTestId('sheet-handoff')).toHaveCount(3)
    await expect(sheet.getByTestId('pending-figure')).toContainText('Loss cost trends, by coverage')
    await expect(sheet.getByTestId('pending-figure')).toContainText('haven’t been entered here yet')
  })

  test('opens a long tool\'s inputs in the sheet, and keeps its answer in the title strip once scrolled', async ({ page }) => {
    // A short phone: the rows still at their default share one chip line, so the page is short too.
    await page.setViewportSize({ width: 390, height: 600 })
    await page.goto('/tools/bond-price')
    const card = page.getByTestId('tool-card')
    // Six inputs: no slider on the rows; a row opens the sheet, which has one.
    await expect(card.getByRole('slider')).toHaveCount(0)
    await card.getByRole('button', { name: /^Yield, convertible m-thly/ }).click()
    const sheet = page.getByTestId('value-sheet')
    await expect(sheet.getByRole('slider')).toBeVisible()
    for (const k of ['6', 'Point', '5']) await sheet.getByRole('button', { name: k, exact: true }).click()
    await sheet.getByRole('button', { name: 'Done' }).click()
    await expect(card.getByTestId('tool-tile').first()).not.toHaveText('1,077.95')
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect(page.getByTestId('tool-pinned-answer')).toHaveCount(0)
    await page.mouse.wheel(0, 600)
    await expect(page.getByTestId('tool-pinned-answer')).toBeVisible()
  })

  test('offers the bank\'s figures in a field\'s From… menu', async ({ page }) => {
    await page.goto('/tools/loss-ratio-method')
    const card = page.getByTestId('tool-card')
    await card.getByRole('button', { name: 'Variable expense ratio from a tool or a published figure' }).click()
    const figures = card.getByTestId('tool-bank-figures')
    await expect(figures).toBeVisible()
    await figures.getByRole('button', { name: /Total expenses, 27\.8%/ }).click()
    await expect(card.getByLabel('Variable expense ratio value')).toHaveValue('27.8')
    await expect(card.getByTestId('tool-figure-source')).toContainText('Operating Expenses & ULAE')
  })

  test('shows a document\'s figures on its resource page', async ({ page }) => {
    await page.goto('/tools/assumptions')
    const set = page.getByTestId('assumption-set').filter({ hasText: 'ULAE factors' })
    await set.getByRole('button', { name: 'Read the source' }).click()
    const assumptions = page.getByTestId('resource-assumptions')
    await expect(assumptions).toBeVisible()
    await expect(assumptions).toContainText('1.1189')
  })
  test('reads an insurer\'s OSFI filing and recomputes its MCT ratio from the filed lines', async ({ page }) => {
    await page.goto('/tools/insurer-return')
    const card = page.getByTestId('tool-card')
    // The insurer is picked from every filer, through the sheet's search.
    await card.locator('[data-field="insurer"]').click()
    await page.getByRole('searchbox').fill('intact insurance')
    await page.getByRole('radio', { name: 'Intact Insurance Company', exact: true }).click()
    await expect(card.getByTestId('tool-tile').first()).toHaveText('191.75%')

    // Its lines go on to MCT Ratio as filed values, and the filing's own ratio sits under the answer.
    await expect(card.getByTestId('tool-gives-to')).toContainText('MCT Ratio')
    await card.getByTestId('tool-gives-to').click()
    await expect(page).toHaveURL(/\/tools\/mct-ratio(\?[^#]*)?#input=/)
    const mct = page.getByTestId('tool-card')
    await expect(mct.getByTestId('tool-tile').first()).toHaveText('191.75%')
    await expect(mct.getByTestId('tool-filed-answer')).toContainText('Filed 191.75% · Intact Insurance Company, Q2 2026')
    await expect(mct.locator('[data-source="filed"]').first()).toContainText('OSFI · Intact Insurance Company, Q2 2026 · line')
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })
})
