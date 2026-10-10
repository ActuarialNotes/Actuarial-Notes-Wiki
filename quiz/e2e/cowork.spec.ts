import { test, expect } from '@playwright/test'

/**
 * Cowork's shell, from a signed-out browser.
 *
 * Cowork is open only to approved accounts while it is in Preview; the suite's
 * build opens it to every viewer (`VITE_COWORK_PREVIEW=on` in
 * playwright.config.ts, `COWORK_OPEN_TO_ALL`), the way Actuaria's is, so its
 * two places can be exercised without one. The lock itself is pinned by
 * `src/lib/appMode.test.ts`.
 */
test.describe('cowork mode', () => {
  test('offers the mode from the pill beside the wordmark, marked Preview', async ({ page }) => {
    await page.goto('/dashboard')
    const pill = page.getByRole('button', { name: /Mode: Study/ }).first()
    await expect(pill).toBeVisible()

    await pill.click()
    await expect(page.getByRole('menu', { name: 'Switch mode' })).toBeVisible()
    const cowork = page.getByRole('menuitem', { name: /Cowork/ })
    await expect(cowork).toContainText('Preview')
    await cowork.click()
    await expect(page).toHaveURL(/\/cowork$/)
  })

  test('lists Sources and Workflows in the sidebar, and no Deliverables', async ({ page }) => {
    await page.goto('/cowork')
    await expect(page.getByRole('link', { name: 'Sources' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Workflows' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Deliverables' })).toHaveCount(0)
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('sends an old Deliverables or Workflow Builder link to Workflows', async ({ page }) => {
    await page.goto('/cowork/deliverables')
    await expect(page).toHaveURL(/\/cowork\/workflows$/)
    await page.goto('/tools/workflow')
    await expect(page).toHaveURL(/\/cowork\/workflows$/)
    await expect(page.getByTestId('workflow-add')).toBeVisible()
  })
})
