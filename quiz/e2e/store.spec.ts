import { test, expect } from '@playwright/test'

// The store is the sink of the gem economy. A full purchase needs auth + a gem
// balance (Supabase), so this smoke verifies the catalog surface renders and is
// navigable — the shell every cosmetic purchase starts from.
test.describe('store', () => {
  test('renders the cosmetics catalog and switches tabs', async ({ page }) => {
    await page.goto('/store')

    await expect(page.getByRole('heading', { name: 'Store', exact: true })).toBeVisible()

    // Default tab shows the characters catalog.
    await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible()

    // Tabs are interactive: switch to Skins.
    await page.getByRole('button', { name: 'Skins', exact: true }).click()
    await expect(page.getByText(/skin/i).first()).toBeVisible()

    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })
})
