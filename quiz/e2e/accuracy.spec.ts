import { expect, test, type Page } from './test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// The Dashboard's Analytics summary (lib/analyticsSummary.ts) and the registration
// deadline nudge (lib/registrationNudge.ts), for an FM candidate four days
// before the December 2026 sitting's registration closes.

const HARD = ['fm-002', 'fm-004', 'fm-005']
const EASY = ['fm-028', 'fm-055']

function answers(day: string, right: number, wrong: number, ids: string[]) {
  return Array.from({ length: right + wrong }, (_, i) => ({
    question_id: ids[i % ids.length],
    is_correct: i < right,
    answered_at: `${day}T15:00:00Z`,
    time_spent_seconds: 200,
  }))
}

/** Answers the window holds; the read of what came before it (`answered_at=lt.`) finds nothing. */
async function serveAnswers(page: Page, rows: ReturnType<typeof answers>) {
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route => {
    const before = route.request().url().includes('answered_at=lt.')
    const body = before ? [] : rows.map(r => ({ user_id: USER_ID, ...r }))
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
  })
}

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-31T10:00:00'))
  // Analytics is Pro (e2e/analytics-locked.spec.ts has the free account's view).
  await signIn(page, { pro: true, examProgress: [{ exam_id: 'FM', status: 'in_progress', target_date: '2026-12-03' }] })
  const rows = [
    ...answers('2026-10-21', 1, 4, EASY),
    ...answers('2026-10-23', 2, 3, HARD),
    ...answers('2026-10-28', 3, 2, EASY),
    ...answers('2026-10-30', 4, 1, HARD),
  ]
  await serveAnswers(page, rows)
})

test('the Marks at risk tile opens where the marks are lost, each row a quiz', async ({ page }) => {
  await page.goto('/dashboard')
  const analytics = page.getByRole('region', { name: 'Analytics' })
  await expect(analytics).toBeVisible({ timeout: 20_000 })
  await analytics.getByRole('button', { name: /Marks at risk/ }).click()
  const dialog = page.getByRole('dialog', { name: "Where you're losing marks" })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('of the exam')
  await dialog.screenshot({ path: 'test-results/analytics-leaks.png' })
  await dialog.getByRole('link').first().click()
  await expect(page).toHaveURL(/\/quiz\?exam=Financial\+Mathematics&concepts=/)
})

test('the registration deadline shows four days out, and stays dismissed', async ({ page }) => {
  await page.goto('/dashboard')
  const nudge = page.getByRole('status').filter({ hasText: 'Registration for the December 3 Exam FM sitting closes in 4 days' })
  await expect(nudge).toBeVisible({ timeout: 20_000 })
  await expect(nudge).toContainText('November 4, 10:00 AM U.S. Central')
  await nudge.getByRole('button', { name: 'Dismiss' }).click()
  await expect(nudge).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('region', { name: 'Analytics' })).toBeVisible({ timeout: 20_000 })
  await expect(page.getByText('Registration for the December 3 Exam FM sitting')).toHaveCount(0)
})

test('the quiz builder carries the same deadline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?topic=Financial%20Mathematics')
  await expect(page.getByText('Registration for the December 3 Exam FM sitting closes in 4 days')).toBeVisible({ timeout: 20_000 })
})

test('the summary leads Analytics: the span’s tiles, day by day', async ({ page }) => {
  await page.goto('/dashboard')
  const analytics = page.getByRole('region', { name: 'Analytics' })
  await expect(analytics).toBeVisible({ timeout: 20_000 })
  await analytics.getByRole('radio', { name: 'Last 7 days' }).click()
  await expect(analytics.getByRole('heading', { name: /Past week/ })).toBeVisible()
  await expect(analytics).toContainText(/Accuracy\s*70%\s*7 of 10 right/)
  // Every answer took 200 s; Exam FM allows 5:00 a question.
  await expect(analytics).toContainText(/Pace\s*3:20/)
  await expect(analytics.getByRole('img', { name: /October 30: 4 of 5 right/ })).toBeVisible()
  // The summary is the whole section: no full cards, no All analytics.
  await expect(analytics.getByRole('region', { name: 'Accuracy' })).toHaveCount(0)
  await expect(analytics.getByRole('button', { name: 'All analytics' })).toHaveCount(0)
  await analytics.screenshot({ path: 'test-results/analytics-summary.png' })
})
