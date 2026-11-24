import { test, expect } from './test'

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
    // The four places are present (the rail on desktop) for signed-out users.
    const places = page.getByRole('navigation', { name: 'Places' })
    await expect(places.getByRole('link')).toHaveText(['Today', 'Learn', 'Practice', 'Apply', 'You', 'Sign in'])
    await expect(places.getByRole('link', { name: 'Practice' })).toHaveAttribute('aria-current', 'page')
    // Flashcards is a row of Practice.
    await expect(page.getByRole('link', { name: 'Flashcards' }).first()).toBeVisible()
    // The landing rendered content, not the error boundary.
    await expect(page.getByText('Something went wrong')).toHaveCount(0)

    // No hard React render error surfaced to the console.
    expect(consoleErrors.join('\n')).not.toContain('The above error occurred')
  })
})
