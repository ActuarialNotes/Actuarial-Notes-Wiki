import { test, expect, type Page } from '@playwright/test'

// Actuaria Online (docs/actuaria-online.md). The e2e build turns its flag on
// (VITE_ACTUARIA_PREVIEW=on in playwright.config.ts); a signed-out browser
// plays it off the bundled content and localStorage, like every flow here.

const THEME_KEY = 'actuarial-notes-theme'

async function lightTheme(page: Page) {
  await page.addInitScript(key => {
    localStorage.setItem(key, 'light')
    localStorage.setItem('actuarial-notes-sounds', 'false')
  }, THEME_KEY)
}

test.describe('actuaria', () => {
  test.beforeEach(async ({ page }) => { await lightTheme(page) })

  test('is always dark inside its scope, whatever the app theme (§4.1)', async ({ page }) => {
    await page.goto('/actuaria/map')
    const scope = page.getByTestId('actuaria-scope')
    await expect(scope).toBeVisible()
    await expect(scope).toHaveClass(/\bactuaria\b/)
    await expect(scope).toHaveClass(/\bdark\b/)
    // The document keeps the reader's theme — the scope is the route's, not the page's.
    expect(await page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(false)
    // The scope reads the dark tokens: a black canvas and white text…
    const colours = await scope.evaluate(el => {
      const cs = getComputedStyle(el)
      return { bg: cs.backgroundColor, fg: cs.color, signal: cs.getPropertyValue('--actuaria-signal').trim() }
    })
    expect(colours.bg).toBe('rgb(0, 0, 0)')
    expect(colours.fg).toBe('rgb(255, 255, 255)')
    // …and defines the signal, which nothing outside it does.
    expect(colours.signal).toBe('173 80% 40%')
    const outside = await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('--actuaria-signal').trim())
    expect(outside).toBe('')
    // The sidebar stays in the light theme.
    const sidebarBg = await page.locator('aside').first().evaluate(el => getComputedStyle(el).backgroundColor)
    expect(sidebarBg).not.toBe('rgb(0, 0, 0)')
  })

  test('shows the title screen on the first visit only (§6.1)', async ({ page }) => {
    await page.goto('/actuaria')
    await expect(page.getByTestId('actuaria-title')).toBeVisible()
    // The one number on it is the lobby's own — here, nobody.
    await expect(page.getByTestId('actuaria-title-lobby')).toContainText('Monte Carlo Station')
    await page.getByTestId('actuaria-enter').click()
    await expect(page).toHaveURL(/\/actuaria\/map$/)
    await page.goto('/actuaria')
    await expect(page).toHaveURL(/\/actuaria\/map$/)
    await expect(page.getByTestId('actuaria-title')).toHaveCount(0)
  })

  test('the star map is operable from the keyboard (§6.3)', async ({ page }) => {
    await page.goto('/actuaria/map')
    const fm = page.getByTestId('actuaria-sector-FM')
    await expect(fm).toBeVisible()
    await expect(fm).toHaveAttribute('aria-label', /Sector FM, Financial Mathematics/)
    await fm.focus()
    await page.keyboard.press('Enter')
    await expect(fm).toHaveAttribute('aria-pressed', 'true')
    const panel = page.getByTestId('actuaria-sector-panel')
    await expect(panel).toContainText('Sector FM')
    // FM is raceable, so its panel offers a battle; the study guide is always there (G9).
    await expect(panel.getByTestId('actuaria-battle-sector')).toBeVisible()
    await expect(panel.getByRole('link', { name: 'Open study guide' })).toHaveAttribute('href', /\/wiki\/exam\//)
    // An exam whose bank is written, not multiple choice, trains in a quiz instead.
    await page.getByTestId('actuaria-sector-CAS-5').click()
    await expect(panel.getByTestId('actuaria-train-sector')).toBeVisible()
  })

  test('opens a sector’s regions and a landmark in the concept popup (§6.4)', async ({ page }) => {
    await page.goto('/actuaria/sector/P')
    await expect(page.getByRole('heading', { name: /sector p/i, level: 1 })).toBeVisible()
    // A keystone with a landmark name carries the concept's name beneath it.
    const bayes = page.getByRole('button', { name: /Bayes Outpost/ }).first()
    await expect(bayes).toContainText('Bayes Theorem')
    await bayes.click()
    await expect(page.getByLabel('Concept: Bayes Theorem')).toBeVisible()
  })

  test('the Daily Transmission shows coverage and says when there is no decay (§6.6)', async ({ page }) => {
    await page.goto('/actuaria/daily')
    await expect(page.getByTestId('actuaria-coverage')).toContainText('Grace days')
    await expect(page.getByTestId('actuaria-coverage-calendar')).toBeVisible()
    await expect(page.getByTestId('actuaria-transmission')).toContainText('No decay today')
  })

  test('is entered from a Study Guides card that can be dismissed for good (§6.2)', async ({ page }) => {
    await page.goto('/wiki')
    const card = page.getByTestId('actuaria-hub-card')
    await expect(card).toBeVisible()
    await expect(card.getByRole('link')).toHaveAttribute('href', '/actuaria')
    await page.getByTestId('actuaria-hub-dismiss').click()
    await expect(card).toHaveCount(0)
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()
    await expect(page.getByTestId('actuaria-hub-card')).toHaveCount(0)
  })

  test('has its own row in the sidebar, under Play', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/wiki')
    const row = page.getByRole('link', { name: 'Actuaria Live' })
    await expect(row).toBeVisible()
    await row.click()
    await expect(page).toHaveURL(/\/actuaria/)
  })
})
