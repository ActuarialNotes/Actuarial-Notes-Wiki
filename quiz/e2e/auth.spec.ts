import { test, expect } from './test'

// Auth is the entry to sync/persistence. We don't hit Supabase — just verify the
// signed-out sign-in form renders and can toggle to the sign-up mode.
test.describe('auth', () => {
  test('renders the sign-in form and toggles to sign-up', async ({ page }) => {
    await page.goto('/auth')

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()

    // Switching to account creation reveals the confirm-password field.
    await page.getByRole('button', { name: 'Create account' }).click()
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible()
    await expect(page.getByLabel('Confirm password')).toBeVisible()
  })
})
