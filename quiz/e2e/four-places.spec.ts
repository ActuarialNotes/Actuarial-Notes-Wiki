import { test, expect, devices } from './test'

// Four places (docs/design-review.md §6, Phase 3): Today, Learn, Practice and
// Apply in the sidebar and, on a phone, in a bar at the bottom of the screen;
// the Store and Community behind the avatar; Today open to a visitor.

test.describe('the sidebar', () => {
  test('lists the four places in the order of the path, each with its pages', async ({ page }) => {
    await page.goto('/wiki')
    const nav = page.getByRole('navigation', { name: 'Main' })
    const labels = await nav.getByRole('link').allInnerTexts()
    const names = labels.map(l => l.split('\n')[0]!.trim())
    expect(names.filter(n => ['Today', 'Learn', 'Practice', 'Apply'].includes(n))).toEqual(['Today', 'Learn', 'Practice', 'Apply'])
    // Flashcards is a page of Practice; the Store and Community are no longer rows.
    expect(names.indexOf('Flashcards')).toBeGreaterThan(names.indexOf('Practice'))
    expect(names.indexOf('Flashcards')).toBeLessThan(names.indexOf('Apply'))
    expect(names).not.toContain('Store')
    expect(names).not.toContain('Community')
    // On the exam list, Learn is named and its page is the one filled.
    await expect(nav.getByRole('link', { name: 'Exams', exact: true })).toHaveAttribute('aria-current', 'page')
  })

  test('keeps the Store and Community behind the avatar', async ({ page }) => {
    await page.goto('/wiki')
    await page.getByTestId('you-menu').click()
    const menu = page.getByRole('menu', { name: 'You' })
    await expect(menu.getByRole('menuitem', { name: 'Community' })).toBeVisible()
    await expect(menu.getByRole('menuitem', { name: 'Sign in' })).toBeVisible()
    await menu.getByRole('menuitem', { name: 'Store' }).click()
    await expect(page).toHaveURL(/\/store/)
    await expect(page.getByRole('heading', { name: 'Store', exact: true })).toBeVisible()
  })
})

test.describe('on a phone', () => {
  test.use({ viewport: devices['iPhone 13'].viewport, hasTouch: true })

  test('the four places are a bar at the bottom, and the place you are in lists its pages', async ({ page }) => {
    await page.goto('/wiki')
    const bar = page.getByTestId('bottom-bar')
    await expect(bar.getByRole('link')).toHaveText(['Today', 'Learn', 'Practice', 'Apply'])
    await expect(bar.getByRole('link', { name: 'Learn' })).toHaveAttribute('aria-current', 'page')

    await bar.getByRole('link', { name: 'Practice' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(bar.getByRole('link', { name: 'Practice' })).toHaveAttribute('aria-current', 'page')

    // Already in Practice: the press lists its pages.
    await bar.getByRole('link', { name: 'Practice' }).click()
    await page.getByRole('menu', { name: 'Practice' }).getByRole('menuitemradio', { name: 'Flashcards' }).click()
    await expect(page).toHaveURL(/\/flashcards$/)
    await expect(bar.getByRole('link', { name: 'Practice' })).toHaveAttribute('aria-current', 'page')

    await bar.getByRole('link', { name: 'Apply' }).click()
    await expect(page).toHaveURL(/\/tools$/)
  })

  test('the bar is put away in a quiz, and the avatar opens the rest', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')
    await expect(page.getByRole('button', { name: 'Start Quiz' }).or(page.getByRole('button', { name: 'Option A' })).first()).toBeVisible()
    await expect(page.getByTestId('bottom-bar')).toHaveCount(0)

    await page.goto('/wiki')
    await page.getByRole('button', { name: 'Open menu' }).first().click()
    await page.getByTestId('you-menu').click()
    await expect(page.getByRole('menu', { name: 'You' }).getByRole('menuitem', { name: 'Store' })).toBeVisible()
  })
})

test.describe('Today, signed out', () => {
  test('a visitor who has answered nothing is asked for an exam', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByText('Which exam are you studying?')).toBeVisible()
    await page.getByRole('main').getByRole('button', { name: 'Choose an exam' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('a quiz finished signed out moves the visitor\'s levels, and Today shows that exam', async ({ page }) => {
    // Picking an exam opens its builder; nothing is stored for the pick.
    await page.goto('/')
    await page.locator('button[data-tour="quiz-exam-p"]').click()
    await expect(page).toHaveURL(/\/\?topic=/)

    await page.goto('/quiz?ids=p-004')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(startQuiz.or(optionA).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await optionA.click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: /Finish Quiz/i }).click()
    await expect(page).toHaveURL(/\/review/)

    // The levels are kept in this browser, under the visitor.
    const kept = await page.evaluate(() => {
      const store = JSON.parse(localStorage.getItem('actuarial_local_mastery_v1') ?? '{}') as Record<string, { user_id: string; state: string }>
      return Object.values(store).filter(r => r.user_id === 'guest' && r.state === 'level1').length
    })
    expect(kept).toBeGreaterThan(0)

    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { name: "Today's session" })).toBeVisible()
    await expect(page.getByText('Your progress is kept in this browser.')).toBeVisible()
    await expect(page.getByTestId('today-first-step')).toHaveCount(0)
  })
})
