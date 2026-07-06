import { test, expect } from '@playwright/test'

// Boot smoke: the signed-out app shell renders and the error boundary never
// fires. This is the cheapest guard that a bundle/routing regression didn't
// take the whole app down.
test.describe('app shell', () => {
  test('boots the signed-out landing page without crashing', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    await page.goto('/')

    await expect(page).toHaveTitle(/Actuarial Notes/)
    // Primary navigation is present (sidebar on desktop) for signed-out users.
    await expect(page.getByRole('link', { name: 'Study Guides' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Flashcards' }).first()).toBeVisible()
    // The landing rendered content, not the error boundary.
    await expect(page.getByText('Something went wrong')).toHaveCount(0)

    // No hard React render error surfaced to the console.
    expect(consoleErrors.join('\n')).not.toContain('The above error occurred')
  })
})
