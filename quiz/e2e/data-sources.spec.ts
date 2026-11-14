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

  test('moves between Tables, the Assumptions Bank, Publishers and Documents', async ({ page }) => {
    await page.goto('/data-sources')
    const sections = page.getByTestId('data-sections')
    await expect(sections.getByRole('link')).toHaveText(['Tables', 'Assumptions Bank', 'Publishers', 'Documents'])
    await expect(page.getByTestId('data-table-row')).toHaveCount(4)

    await page.getByTestId('data-section-publishers').click()
    await expect(page).toHaveURL(/\/data-sources\/publishers$/)
    await page.locator('a[href="/data-sources/osfi"]').first().click()
    await expect(page).toHaveURL(/\/data-sources\/osfi$/)
    await expect(page.getByText('Something went wrong')).toHaveCount(0)

    await page.goto('/data-sources/documents')
    // The Study Guides Resources page's filters, riding the URL the same way.
    await page.getByRole('button', { name: /^Publisher/ }).click()
    await page.locator('div.absolute.top-full button').first().click()
    await expect(page).toHaveURL(/\/data-sources\/documents\?.*publisher=/)
  })

  test('sends an old Cowork, Deliverables or Workflow Builder link to its new place', async ({ page }) => {
    await page.goto('/cowork')
    await expect(page).toHaveURL(/\/data-sources\/publishers$/)
    await page.goto('/cowork/resources')
    await expect(page).toHaveURL(/\/data-sources\/documents$/)
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
