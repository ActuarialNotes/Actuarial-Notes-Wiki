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

// The study guide's sticky header carries an info button beside the version
// menu: it opens the selected sitting's dates (registration, window, results)
// and the publisher's page they were taken from.
test.describe('exam sitting info', () => {
  test('opens from the study guide header and closes on Escape', async ({ page }) => {
    await page.goto('/wiki/exam/Exam+5+(CAS)')

    const info = page.getByRole('button', { name: /^About / })
    await expect(info).toBeVisible()
    await info.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toBeVisible()
    await expect(dialog.locator('a[href^="https://www.casact.org/"]').first()).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(info).toBeFocused()
  })
})
