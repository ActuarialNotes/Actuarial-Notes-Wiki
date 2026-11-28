import { expect, test } from './test'
import { account } from './fixtures/account'

// You (docs/redesign-spec.md §7b): the profile, the league and Settings, for
// an account and for a visitor, and the two ways in: the profile button on a
// phone and the foot of the rail on a wide screen.

test.describe('You, on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('the profile shows who, how far, the streak, gems, and the day’s goal and quests', async ({ page }) => {
    await account(page)
    await page.goto('/you')
    const you = page.getByTestId('you')
    await expect(you.getByTestId('you-name')).toHaveText('Ada', { timeout: 30_000 })
    await expect(you.getByText('Pro', { exact: true })).toBeVisible()
    await expect(you.getByText(/^Level \d+$/)).toBeVisible()
    await expect(you.getByTestId('you-streak')).toContainText('12days')
    await expect(you.getByTestId('you-gems')).toContainText('86gems')
    await expect(you.getByRole('button', { name: 'Daily goal, 60 of 100 XP. Change' })).toBeVisible()

    // A finished quest shows Collect, the screen's one filled button; the others their count.
    const warmUp = you.locator('[data-quest="core-correct-3"]')
    await expect(warmUp.getByRole('button', { name: 'Collect' })).toBeVisible()
    await expect(you.locator('[data-quest="hard-2"]')).toContainText('1/2')
    await expect(you.locator('[data-quest="levelup-2"]')).toContainText('0/2')
    await expect(you.getByRole('button', { name: 'Collect' })).toHaveCount(1)

    // No app header above it: the cross is the way out.
    await expect(page.getByRole('link', { name: 'Close' })).toBeVisible()
    await expect(page.getByTestId('place-bar')).toHaveCount(0)

    // Collecting marks the quest collected.
    await warmUp.getByRole('button', { name: 'Collect' }).click()
    await expect(warmUp.getByRole('img', { name: 'Collected' })).toBeVisible()
    await expect(you.getByRole('button', { name: 'Collect' })).toHaveCount(0)
  })

  test('the goal, a quest and Help open as popups', async ({ page }) => {
    await account(page)
    await page.goto('/you')
    await page.getByRole('button', { name: /^Daily goal, 60 of 100 XP/ }).click({ timeout: 30_000 })
    const goal = page.getByRole('dialog', { name: 'Daily goal' })
    await expect(goal.getByRole('radio')).toHaveCount(4)
    await expect(goal.getByRole('radio', { name: /Regular/ })).toBeChecked()
    await goal.getByRole('button', { name: 'Done' }).click()
    await expect(goal).toHaveCount(0)

    await page.getByRole('button', { name: 'Second Wind: 1 of 2' }).click()
    const quest = page.getByRole('dialog', { name: 'Second Wind' })
    await expect(quest).toContainText('Answer 2 hard questions correctly')
    await expect(quest).toContainText('15 gems and 40 XP')
    await quest.getByRole('button', { name: 'Close' }).click()

    await page.getByTestId('you-help').click()
    const help = page.getByRole('dialog', { name: 'Help' })
    await expect(help.getByRole('button', { name: 'How Today works' })).toBeVisible()
    await expect(help.getByRole('button', { name: 'Contact us' })).toBeVisible()
    // Restore purchase is for an account without Pro.
    await expect(help.getByRole('button', { name: /Restore purchase/ })).toHaveCount(0)
  })

  test('the League row says the tier and rank, and opens the week’s table', async ({ page }) => {
    await account(page)
    await page.goto('/you')
    const row = page.getByTestId('you-league')
    await expect(row).toContainText('Silver · 3rd', { timeout: 30_000 })
    await row.click()
    // The league is the exam Today shows.
    await expect(page).toHaveURL(/\/you\/league\?exam=(P|FM)$/)
    const shown = new URL(page.url()).searchParams.get('exam')!
    const other = shown === 'P' ? 'FM' : 'P'
    await expect(page.getByRole('heading', { name: 'Silver league' })).toBeVisible()
    await expect(page.getByTestId('league')).toContainText('4 days left')

    // Ten rows, the reader's filled, and a labelled line each way.
    const table = page.getByTestId('league-table')
    await expect(table.locator('li:not([data-line])')).toHaveCount(10)
    await expect(table.locator('li[aria-current="true"]')).toContainText('Ada')
    const order = await table.locator('li').evaluateAll(els => els.map(e => e.getAttribute('data-line') ?? e.textContent?.match(/^\d+/)?.[0]))
    expect(order).toEqual(['1', '2', '3', '4', 'promoted', '5', '6', '7', '8', 'relegated', '9', '10'])
    await expect(table.locator('[data-line="promoted"]')).toHaveText('Promoted')
    await expect(table.locator('[data-line="relegated"]')).toHaveText('Relegated')

    // The exam is switched in place.
    await page.getByTestId('league-exam').click()
    await page.getByRole('dialog', { name: 'Your exams' }).getByRole('button', { name: new RegExp(`Exam ${other}\\b`) }).click()
    await expect(page).toHaveURL(new RegExp(`exam=${other}$`))

    // Leaving asks first.
    await page.getByRole('button', { name: 'Leave the league' }).click()
    const leave = page.getByRole('dialog', { name: 'Leave the league?' })
    await expect(leave.getByRole('button', { name: 'Leave the league' })).toBeVisible()
    await leave.getByRole('button', { name: 'Stay' }).click()
    await expect(leave).toHaveCount(0)

    // Back goes up to the profile.
    await page.getByRole('link', { name: 'Back to You' }).click()
    await expect(page).toHaveURL(/\/you$/)
  })

  test('a reader in no league is shown how they will appear, and Join', async ({ page }) => {
    await account(page, { joined: false })
    await page.goto('/you')
    await expect(page.getByTestId('you-league')).toContainText('Join', { timeout: 30_000 })
    await page.getByTestId('you-league').click()
    await expect(page.getByRole('heading', { name: 'League', exact: true })).toBeVisible()
    await expect(page.getByTestId('league-appear-as')).toHaveText('Ada')
    await expect(page.getByTestId('league-join')).toHaveText('Join the league')
    await expect(page.getByRole('button', { name: 'Leave the league' })).toHaveCount(0)
  })

  test('Settings is one grouped screen with every value on its row, and no quiz settings', async ({ page }) => {
    await account(page)
    await page.goto('/you')
    await page.getByTestId('you-settings').click({ timeout: 30_000 })
    await expect(page).toHaveURL(/\/settings$/)
    const settings = page.getByTestId('settings')
    await expect(settings.getByRole('heading', { name: 'Settings' })).toBeVisible()
    for (const group of ['Studying', 'App', 'Account', 'Your data']) {
      await expect(settings.getByRole('region', { name: group })).toBeVisible()
    }
    await expect(settings.getByRole('heading', { level: 2 })).toHaveCount(4)
    await expect(settings.getByText(/Timed|Show answers|Tap concepts/)).toHaveCount(0)

    await expect(settings.getByTestId('settings-exam-P')).toContainText('Jan 14, 2027')
    await expect(settings.getByTestId('settings-exam-FM')).toContainText('Apr 14, 2027')
    // A Pro account's session runs as long as today's plan until a length is picked.
    await expect(settings.getByTestId('settings-length')).toContainText("Today's plan")
    await expect(settings.getByTestId('settings-goal')).toContainText('100 XP')
    await expect(settings.getByTestId('settings-daily-email')).toContainText('Off')
    await expect(settings.getByTestId('settings-name')).toContainText('Ada')
    await expect(settings.getByTestId('settings-email')).toContainText('ada@example.com')
    await expect(settings.getByTestId('settings-pro')).toContainText('Manage')

    // Theme is flipped in place.
    const wasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    await settings.getByRole('button', { name: wasDark ? 'Light' : 'Dark', exact: true }).click()
    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(!wasDark)

    // Usage analytics is a switch, in place.
    const analytics = settings.getByRole('switch', { name: 'Usage analytics' })
    await expect(analytics).toBeChecked()
    await analytics.click()
    await expect(analytics).not.toBeChecked()

    // Sound opens a popup with the switch and the volume.
    await settings.getByTestId('settings-sound').click()
    const sound = page.getByRole('dialog', { name: 'Sound' })
    await expect(sound.getByRole('switch', { name: 'Sound effects' })).toBeVisible()
    await expect(sound.getByRole('slider', { name: 'Volume' })).toBeVisible()
    await sound.getByRole('button', { name: 'Done' }).click()

    // An exam's row opens its date and the two ways it leaves the list.
    await settings.getByTestId('settings-exam-P').click()
    const exam = page.getByRole('dialog', { name: /P/ })
    await expect(exam.getByLabel('Exam date')).toHaveValue('2027-01-14')
    await expect(exam.getByRole('button', { name: 'Mark as passed' })).toBeVisible()
    await expect(exam.getByRole('button', { name: 'Remove from my exams' })).toBeVisible()
    await page.keyboard.press('Escape')

    // Session length is the Today sheet, kept for every day.
    await settings.getByTestId('settings-length').click()
    const length = page.getByRole('dialog', { name: 'Session length' })
    await length.getByRole('radio', { name: '45 minutes' }).click()
    await length.getByRole('button', { name: 'Done' }).click()
    await expect(settings.getByTestId('settings-length')).toContainText('45 min')

    // Sign out is outlined; Delete account is plain red text that asks first.
    await expect(settings.getByRole('button', { name: 'Sign out' })).toBeVisible()
    await settings.getByRole('button', { name: 'Delete account' }).click()
    const del = page.getByRole('dialog', { name: 'Delete account' })
    const confirm = del.getByRole('button', { name: 'Delete account' })
    await expect(confirm).toBeDisabled()
    await del.getByLabel('Type DELETE to confirm').fill('DELETE')
    await expect(confirm).toBeEnabled()
    await del.getByRole('button', { name: 'Keep my account' }).click()
    await expect(del).toHaveCount(0)
  })

  test('a free account’s Pro row goes to Upgrade, and Help can check a purchase', async ({ page }) => {
    await account(page, { pro: false })
    await page.goto('/settings')
    await expect(page.getByTestId('settings-pro')).toContainText('Get Pro', { timeout: 30_000 })
    await expect(page.getByTestId('settings-daily-email')).toContainText('Pro')
    await page.getByTestId('settings-pro').click()
    await expect(page).toHaveURL(/\/upgrade$/)

    await page.goto('/you')
    await expect(page.getByTestId('you-name')).toBeVisible({ timeout: 30_000 })
    await expect(page.getByTestId('you').getByText('Pro', { exact: true })).toHaveCount(0)
    await page.getByTestId('you-help').click()
    await expect(page.getByRole('dialog', { name: 'Help' }).getByRole('button', { name: 'Restore purchase' })).toBeVisible()
  })

  test('a visitor’s You works from the browser, with Sign in for what an account holds', async ({ page }) => {
    await page.goto('/you')
    const you = page.getByTestId('you')
    await expect(you.getByRole('link', { name: 'Sign in' })).toBeVisible()
    await expect(you.getByText(/^Level 1$/)).toBeVisible()
    await expect(you.getByTestId('you-streak')).toContainText('0days')
    await expect(you.getByTestId('you-gems')).toHaveCount(0)
    await expect(you.getByTestId('you-league')).toHaveCount(0)
    await expect(you.getByRole('button', { name: /^Daily goal, 0 of 100 XP/ })).toBeVisible()
    await expect(you.getByTestId('you-store')).toBeVisible()

    // The league needs an account.
    await page.goto('/you/league')
    await expect(page.getByTestId('league').getByRole('link', { name: 'Sign in' })).toBeVisible()
    await expect(page.getByTestId('league-table')).toHaveCount(0)
  })

  test('a visitor’s Settings keeps what the browser keeps', async ({ page }) => {
    await page.goto('/settings')
    const settings = page.getByTestId('settings')
    await expect(settings.getByRole('link', { name: 'Sign in' })).toBeVisible()
    for (const group of ['Studying', 'App', 'Your data']) {
      await expect(settings.getByRole('region', { name: group })).toBeVisible()
    }
    await expect(settings.getByRole('region', { name: 'Account' })).toHaveCount(0)
    await expect(settings.getByTestId('settings-length')).toBeVisible()
    await expect(settings.getByTestId('settings-goal')).toBeVisible()
    await expect(settings.getByTestId('settings-sound')).toBeVisible()
    await expect(settings.getByTestId('settings-ai')).toBeVisible()
    await expect(settings.getByRole('switch', { name: 'Usage analytics' })).toBeVisible()
    for (const id of ['settings-daily-email', 'settings-track', 'settings-export', 'settings-reset', 'settings-add-exam']) {
      await expect(settings.getByTestId(id)).toHaveCount(0)
    }
    await expect(settings.getByRole('button', { name: 'Sign out' })).toHaveCount(0)
    await expect(settings.getByRole('button', { name: 'Delete account' })).toHaveCount(0)

    // The daily goal is kept without an account.
    await settings.getByTestId('settings-goal').click()
    await page.getByRole('dialog', { name: 'Daily goal' }).getByRole('radio', { name: /Serious/ }).click()
    await page.getByRole('dialog', { name: 'Daily goal' }).getByRole('button', { name: 'Done' }).click()
    await expect(settings.getByTestId('settings-goal')).toContainText('200 XP')

    // AI assistants: the connector's address.
    await settings.getByTestId('settings-ai').click()
    await expect(page.getByRole('dialog', { name: 'AI assistants' })).toContainText('/api/mcp')
  })
})

test.describe('the ways in to You', () => {
  test('the profile button on a phone opens the profile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await account(page)
    await page.goto('/dashboard')
    const badge = page.getByTestId('profile-button')
    await expect(badge).toBeVisible({ timeout: 30_000 })
    await expect(badge).toHaveAccessibleName('You. 1 quest to collect')
    await badge.click()
    await expect(page).toHaveURL(/\/you$/)
    await expect(page.getByTestId('you-name')).toHaveText('Ada')
    // The cross goes back where the reader came from.
    await page.getByRole('link', { name: 'Close' }).click()
    await expect(page).toHaveURL(/\/dashboard$/)
  })

  test('the foot of the rail opens the profile, and holds no theme or sound button', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await account(page)
    await page.goto('/dashboard')
    const row = page.getByTestId('rail-you')
    await expect(row).toBeVisible({ timeout: 30_000 })
    await expect(page.getByRole('button', { name: /Switch to (light|dark) mode/ })).toHaveCount(0)
    await row.click()
    await expect(page).toHaveURL(/\/you$/)
    await expect(page.getByTestId('you-name')).toHaveText('Ada')
  })
})
