import { expect, test, type Page } from './test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// Today's Analytics tile and screen (lib/todayAnalytics.ts) and the registration
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

test('the quiz builder carries the same deadline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?topic=Financial%20Mathematics')
  await expect(page.getByText('Registration for the December 3 Exam FM sitting closes in 4 days')).toBeVisible({ timeout: 20_000 })
})

test('the Analytics screen reads the span: accuracy, pace, marks lost, difficulty', async ({ page }) => {
  await page.goto('/dashboard/analytics')
  const days = page.getByRole('group', { name: 'Days' })
  await expect(days).toBeVisible({ timeout: 30_000 })
  await days.getByRole('button', { name: '7', exact: true }).click()
  await expect(days.getByRole('button', { name: '7', exact: true })).toHaveAttribute('aria-pressed', 'true')
  // 7 of 10 right in the past week.
  await expect(page.getByText('70%').first()).toBeVisible({ timeout: 30_000 })
  await expect(page.getByText('accuracy')).toBeVisible()
  // Every answer took 200 s; Exam FM allows 5:00 a question.
  await expect(page.getByText('3:20')).toBeVisible()
  await expect(page.getByText('Exam 5:00')).toBeVisible()
  await expect(page.getByText('Marks lost', { exact: true })).toBeVisible()
  await expect(page.getByText('By difficulty')).toBeVisible()
  await page.screenshot({ path: 'test-results/analytics-screen.png', fullPage: true })
  // Back goes to Today.
  await page.getByRole('button', { name: /Today/ }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
})

test('Today\'s Analytics tile carries the accuracy and opens the screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/dashboard')
  const tile = page.getByTestId('today-analytics')
  await expect(tile).toHaveAccessibleName(/Analytics: \d+% accuracy over 30 days/, { timeout: 30_000 })
  await tile.click()
  await expect(page).toHaveURL(/\/dashboard\/analytics$/)
})
