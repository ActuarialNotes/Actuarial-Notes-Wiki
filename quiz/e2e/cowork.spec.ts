import { test, expect } from '@playwright/test'

/**
 * Cowork's shell, from a signed-out browser.
 *
 * The suite never touches Supabase (see `playwright.config.ts`), so what it can
 * assert about a Pro-only mode is the part that matters most anyway: the lock
 * holds. A mode whose pill says "Pro" but whose URL lets anyone in is the one
 * bug here that a reader would find by typing an address.
 */
test.describe('cowork mode', () => {
  test('sends a signed-out visitor to sign in rather than into the mode', async ({ page }) => {
    await page.goto('/cowork')
    await expect(page).toHaveURL(/\/auth/)
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('locks the deliverable routes too, not just the mode home', async ({ page }) => {
    await page.goto('/cowork/deliverables')
    await expect(page).toHaveURL(/\/auth/)
  })

  test('offers the mode from the pill beside the wordmark, marked Pro and Preview', async ({ page }) => {
    await page.goto('/dashboard')
    const pill = page.getByRole('button', { name: /Mode: Study/ }).first()
    await expect(pill).toBeVisible()

    await pill.click()
    await expect(page.getByRole('menu', { name: 'Switch mode' })).toBeVisible()

    const cowork = page.getByRole('menuitem', { name: /Cowork/ })
    await expect(cowork).toBeVisible()
    // Both facts the mode carries are on its row: it is in Preview, and it is
    // Pro. Signed out, the tagline is replaced by what it would take to open it.
    await expect(cowork).toContainText('Preview')
    await expect(cowork).toContainText('Pro')
    await expect(cowork).toContainText(/Sign in with Pro/i)
  })

  test('picking the locked mode sends a signed-out visitor to sign in', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByRole('button', { name: /Mode: Study/ }).first().click()
    await page.getByRole('menuitem', { name: /Cowork/ }).click()
    await expect(page).toHaveURL(/\/auth/)
  })
})
