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
    for (const area of ['Reserving', 'Ratemaking', 'Credibility', 'Financial mathematics']) {
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
  })

  test('sends age-to-age averages on to Development to Ultimate', async ({ page }) => {
    await page.goto('/tools/age-to-age-factors')
    await page.getByRole('button', { name: 'More' }).click()
    await page.getByRole('menuitem', { name: 'Send to Development to Ultimate' }).click()
    await expect(page).toHaveURL(/\/tools\/development-to-ultimate#input=/)
    // The averages arrive as the selected factors: 12–24 is 1,500 + 1,700 + 1,800 over 1,000 + 1,100 + 1,200.
    await expect(page.getByLabel('Factor to next, row 1')).toHaveValue(String((1500 + 1700 + 1800) / (1000 + 1100 + 1200)))
  })

  test('opens the run a link names', async ({ page }) => {
    const input = { payment: 250, n: 4, i: 0 }
    const fragment = Buffer.from(JSON.stringify(input)).toString('base64url')
    await page.goto(`/tools/annuity#input=${fragment}`)
    await expect(page.getByTestId('tool-tile').first()).toHaveText('1,000.00')
  })

  test('fits a scalar card on a phone without scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/tools/annuity')
    const box = await page.getByTestId('tool-card').boundingBox()
    expect(box).not.toBeNull()
    expect(box!.y + box!.height).toBeLessThanOrEqual(844)
  })
})
