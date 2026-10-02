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

  // Leaving a page and coming back returns to where it was left — by Back, or
  // by the exam page's "All exams" arrow — while a new page opens at its top.
  // lib/routeScrollMemory.ts; the router records the place as the page is left.
  test('keeps the Study Guides list where it was left', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 600 })
    await page.goto('/wiki')
    const scrollY = () => page.evaluate(() => Math.round(window.scrollY))

    const exam9 = page.locator('a[href^="/wiki/exam/"]').filter({ hasText: 'Exam 9' }).first()
    if (!(await exam9.isVisible())) await page.getByRole('radio', { name: 'CAS' }).click()
    await exam9.scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollBy(0, 40))
    const listY = await scrollY()
    expect(listY).toBeGreaterThan(0)

    await exam9.click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await expect.poll(scrollY).toBe(0)

    await page.goBack()
    await expect(page).toHaveURL(/\/wiki$/)
    await expect.poll(scrollY).toBe(listY)

    await exam9.click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await page.getByRole('link', { name: 'All exams' }).click()
    await expect(page).toHaveURL(/\/wiki$/)
    await expect.poll(scrollY).toBe(listY)
  })

  // Resources is the tab's second page: listed under Study Guides in the
  // sidebar while the tab is open, filtered by exam, publisher and year, with
  // the choice kept in the URL.
  test('opens Resources from the sidebar and filters the shelf by exam', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/wiki')

    const nav = page.getByRole('navigation', { name: 'Main' })
    await expect(nav.getByRole('link', { name: 'Exams' })).toHaveAttribute('aria-current', 'page')
    await nav.getByRole('link', { name: 'Resources' }).click()

    await expect(page).toHaveURL(/\/wiki\/resources$/)
    await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Resources' })).toHaveAttribute('aria-current', 'page')
    const cards = page.locator('main').getByRole('button').filter({ has: page.locator('p.font-semibold') })
    const all = await cards.count()
    expect(all).toBeGreaterThan(10)

    await page.getByRole('button', { name: /^Exam\b/ }).click()
    await page.getByRole('button', { name: /^Exam 7\b/ }).click()
    await expect(page).toHaveURL(/\/wiki\/resources\?exam=Exam\+7$/)
    await expect.poll(() => cards.count()).toBeLessThan(all)
    // Every card left on the shelf is an Exam 7 reading.
    for (const card of await cards.all()) await expect(card.getByText('Exam 7', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Clear' }).click()
    await expect(page).toHaveURL(/\/wiki\/resources$/)
    await expect.poll(() => cards.count()).toBe(all)
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
