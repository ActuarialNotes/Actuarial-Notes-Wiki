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

  test('moves between Assumptions, Sources and Documents, and Back undoes a move', async ({ page }) => {
    await page.goto('/data-sources')
    const sections = page.getByTestId('data-sections')
    await expect(sections.getByRole('link')).toHaveText(['Assumptions', 'Sources', 'Documents'])
    await expect(page.getByTestId('assumption-set').first()).toBeVisible()

    await page.getByTestId('data-section-sources').click()
    await expect(page).toHaveURL(/\/data-sources\/sources$/)
    await page.goBack()
    await expect(page).toHaveURL(/\/data-sources$/)
    await page.getByTestId('data-section-sources').click()

    // A source opens in place on its documents, the ones that give data or figures first.
    const osfi = page.getByTestId('source-row').filter({ hasText: 'Office of the Superintendent' })
    await osfi.getByRole('button', { expanded: false }).click()
    await expect(osfi.getByTestId('source-documents')).toBeVisible()
    await expect(osfi.getByTestId('offer-data').first()).toBeVisible()
    await osfi.locator('a[href="/data-sources/osfi"]').click()
    await expect(page).toHaveURL(/\/data-sources\/osfi$/)
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText('Sources')
    await expect(page.getByText('Something went wrong')).toHaveCount(0)

    await page.goto('/data-sources/documents')
    // The Study Guides Resources page's filters, riding the URL the same way.
    await page.getByRole('button', { name: /^Publisher/ }).click()
    await page.locator('div.absolute.top-full button').first().click()
    await expect(page).toHaveURL(/\/data-sources\/documents\?.*publisher=/)
  })

  test('opens a published table from its document, under its publisher', async ({ page }) => {
    await page.goto('/data-sources/sources')
    const nchs = page.getByTestId('source-row').filter({ hasText: 'National Center for Health Statistics' })
    await nchs.getByRole('button', { expanded: false }).click()
    await nchs.getByTestId('offer-data').click()
    await expect(page).toHaveURL(/\/data-sources\/life-table#input=/)
    await expect(page.getByTestId('tool-card')).toBeVisible()
  })

  test('takes a document\'s Assumptions tag to its figures, and a figure to its sheet', async ({ page }) => {
    await page.goto('/data-sources/osfi')
    await page.getByTestId('offer-assumptions').first().click()
    await expect(page).toHaveURL(/\/data-sources\?set=/)
    await expect(page.getByTestId('assumption-set')).toHaveCount(1)
    await expect(page.getByTestId('assumption-set-chain')).toContainText('OSFI')
    await page.getByTestId('assumption-open').first().click()
    await expect(page.getByTestId('figure-chain')).toContainText('Office of the Superintendent')
    await page.keyboard.press('Escape')
    await page.getByTestId('assumption-set-filter').click()
    await expect(page.getByTestId('assumption-set').nth(1)).toBeVisible()
  })

  test('sends the old section addresses to the new ones', async ({ page }) => {
    await page.goto('/data-sources/assumptions?kind=trend')
    await expect(page).toHaveURL(/\/data-sources\?kind=trend$/)
    await page.goto('/data-sources/publishers')
    await expect(page).toHaveURL(/\/data-sources\/sources$/)
    await page.goto('/data-sources/tables')
    await expect(page).toHaveURL(/\/data-sources\/documents$/)
  })

  test('sends an old Cowork, Deliverables or Workflow Builder link to its new place', async ({ page }) => {
    await page.goto('/cowork')
    await expect(page).toHaveURL(/\/data-sources\/sources$/)
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
