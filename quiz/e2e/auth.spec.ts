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

  // Settings used to carry a sign-in form of its own. Now You and Settings
  // both send a visitor here (docs/redesign-spec.md §7b).
  test('Sign in on You and on Settings leads to the sign-in form', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByLabel('Email')).toHaveCount(0)
    await page.getByTestId('settings').getByRole('link', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/auth$/)
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()

    await page.goto('/you')
    await page.getByTestId('you').getByRole('link', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/auth$/)
  })
})
