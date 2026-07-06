import { test, expect } from '@playwright/test'

// Loads the wiki from the build-time bundled markdown (virtual:wiki-content),
// no network required, then drills into an exam study-guide page.
test.describe('wiki', () => {
  test('renders the Study Guides index and opens an exam page', async ({ page }) => {
    await page.goto('/wiki')

    await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()

    // Exam study guides are links into /wiki/exam/*. Open the first one.
    const examLink = page.locator('a[href^="/wiki/exam/"]').first()
    await expect(examLink).toBeVisible()
    await examLink.click()

    await expect(page).toHaveURL(/\/wiki\/exam\//)
    // The exam page renders wiki article content (a heading of some kind).
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })
})
