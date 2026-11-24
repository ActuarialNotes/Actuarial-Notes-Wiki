import { test, expect } from './test'

/**
 * Workflows, Tools and Data Sources in the one sidebar, from a signed-out
 * browser. Workflows and the publishers are open only to approved accounts
 * while in Preview; the suite's build opens them to every viewer
 * (`VITE_COWORK_PREVIEW=on` in playwright.config.ts, `COWORK_OPEN_TO_ALL`).
 * The approval rule itself is pinned by `src/lib/workflowsAccess.test.ts`.
 */
test.describe('data sources', () => {
  test('has no mode switch, and lists Tools and Data Sources under Workflows', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('button', { name: /Mode:/ })).toHaveCount(0)
    const nav = page.getByRole('navigation', { name: 'Main' })
    await expect(nav.getByRole('link', { name: 'Workflows' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Tools' })).toBeVisible()
    await nav.getByRole('link', { name: 'Data Sources' }).click()
    await expect(page).toHaveURL(/\/data-sources$/)
    // The Study rows stay: the app is one place.
    await expect(nav.getByRole('link', { name: 'Quiz' })).toBeVisible()
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('is a row at the foot of the Tools screen', async ({ page }) => {
    await page.goto('/tools')
    await page.getByTestId('data-sources-row').click()
    await expect(page).toHaveURL(/\/data-sources$/)
    await expect(page.getByRole('heading', { name: 'Data Sources', exact: true })).toBeVisible()
  })

  test('is one catalogue: a need, a type or a filter changes the rows and nothing else', async ({ page }) => {
    await page.goto('/data-sources')
    await expect(page.getByRole('heading', { name: 'Data Sources', exact: true })).toBeVisible()
    const rows = page.getByTestId('catalogue-row')
    await expect(rows.first()).toBeVisible()
    // Every type is in the one list.
    for (const type of ['value', 'table', 'document']) await expect(page.locator(`[data-testid="catalogue-row"][data-type="${type}"]`).first()).toBeVisible()

    // A need narrows the list, on the same address.
    await page.getByTestId('catalogue-need-mortality').click()
    await expect(page).toHaveURL(/\/data-sources\?need=mortality$/)
    await expect(page.getByTestId('catalogue-group')).toHaveCount(1)
    await expect(rows).toHaveCount(2)
    await expect(page.getByTestId('catalogue-needs')).toBeVisible()
    await expect(page.getByTestId('catalogue-filters')).toBeVisible()

    // The type switch and Ready to use ride the address too.
    await page.getByTestId('catalogue-need-mortality').click()
    await page.getByTestId('catalogue-type-value').click()
    await expect(page).toHaveURL(/type=value/)
    await expect(page.locator('[data-testid="catalogue-row"][data-type="document"]')).toHaveCount(0)
    await expect(rows.filter({ hasText: 'Not entered' }).first()).toBeVisible()
    await page.getByTestId('catalogue-ready').click()
    await expect(rows.filter({ hasText: 'Not entered' })).toHaveCount(0)
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('opens a value beside the list, with where it comes from and the tools that take it', async ({ page }) => {
    await page.goto('/data-sources?need=expenses')
    await page.getByTestId('catalogue-row').filter({ hasText: 'Profit provision' }).click()
    await expect(page).toHaveURL(/item=/)
    const panel = page.getByTestId('catalogue-panel')
    await expect(panel.getByTestId('catalogue-value')).toHaveText('6.0%')
    await expect(panel.getByTestId('catalogue-provenance')).toContainText('Automobile Insurance Rate Board')
    await expect(panel.getByTestId('catalogue-provenance')).toContainText('Profit (p. 7)')
    await expect(panel.getByTestId('catalogue-use').first()).toContainText('Use in Permissible Loss Ratio')

    // A figure per accident year is one row, opened on every year.
    await page.getByTestId('catalogue-row').filter({ hasText: 'ULAE factor, accident years 2021–2025' }).click()
    await expect(panel.getByTestId('catalogue-series')).toContainText('1.1189')

    // Every value from its document, and back out again.
    await panel.getByTestId('catalogue-show-set').click()
    await expect(page).toHaveURL(/set=/)
    await page.getByTestId('catalogue-set-filter').click()
    await expect(page).not.toHaveURL(/set=/)
  })

  test('opens a published table in its tool', async ({ page }) => {
    await page.goto('/data-sources?type=table')
    await page.getByTestId('catalogue-row').filter({ hasText: 'United States Life Tables' }).click()
    await page.getByTestId('catalogue-open-table').click()
    await expect(page).toHaveURL(/\/data-sources\/life-table#input=/)
    await expect(page.getByTestId('tool-card')).toBeVisible()
  })

  test('narrows to a publisher on its own address, and takes a document to its values', async ({ page }) => {
    await page.goto('/data-sources')
    await page.getByRole('button', { name: /^Publisher/ }).click()
    await page.locator('div.absolute.top-full button').filter({ hasText: 'Office of the Superintendent' }).click()
    await expect(page).toHaveURL(/\/data-sources\/osfi$/)
    await expect(page.getByTestId('publisher-header')).toContainText('Office of the Superintendent of Financial Institutions')
    // The frame is the catalogue's: the needs and the filters are still here.
    await expect(page.getByTestId('catalogue-needs')).toBeVisible()
    await page.getByTestId('catalogue-type-document').click()
    await page.getByTestId('catalogue-row').filter({ hasText: 'MCT' }).first().click()
    await page.getByTestId('catalogue-show-set').first().click()
    await expect(page).toHaveURL(/set=/)
    await expect(page.locator('[data-testid="catalogue-row"][data-type="value"]').first()).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(/\/data-sources$/)
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('opens an item in a sheet on a narrow screen', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/data-sources?need=expenses')
    await expect(page.getByTestId('catalogue-panel')).toHaveCount(0)
    await page.getByTestId('catalogue-row').filter({ hasText: 'Profit provision' }).click()
    const sheet = page.getByTestId('value-sheet')
    await expect(sheet.getByTestId('value-sheet-value')).toHaveText('6.0%')
    await expect(sheet.getByTestId('catalogue-provenance')).toContainText('Profit (p. 7)')
    await sheet.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByTestId('value-sheet')).toHaveCount(0)
  })

  test('sends the old section addresses to the catalogue', async ({ page }) => {
    await page.goto('/data-sources/assumptions?set=x')
    await expect(page).toHaveURL(/\/data-sources\?set=x$/)
    await page.goto('/data-sources/sources')
    await expect(page).toHaveURL(/\/data-sources$/)
    await page.goto('/data-sources/publishers')
    await expect(page).toHaveURL(/\/data-sources$/)
    await page.goto('/data-sources/documents')
    await expect(page).toHaveURL(/\/data-sources\?type=document$/)
    await page.goto('/data-sources/tables')
    await expect(page).toHaveURL(/\/data-sources\?type=table$/)
  })

  test('sends an old Cowork, Deliverables or Workflow Builder link to its new place', async ({ page }) => {
    await page.goto('/cowork')
    await expect(page).toHaveURL(/\/data-sources$/)
    await page.goto('/cowork/resources')
    await expect(page).toHaveURL(/\/data-sources\?type=document$/)
    await page.goto('/cowork/sources/fsra')
    await expect(page).toHaveURL(/\/data-sources\/fsra$/)
    await page.goto('/cowork/deliverables')
    await expect(page).toHaveURL(/\/workflows$/)
    await page.goto('/cowork/workflows')
    await expect(page).toHaveURL(/\/workflows$/)
    await page.goto('/tools/workflow')
    await expect(page).toHaveURL(/\/workflows$/)
    await expect(page.getByTestId('workflow-new')).toBeVisible()
  })
})
