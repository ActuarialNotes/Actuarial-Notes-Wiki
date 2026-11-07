import { expect, test, type Page } from '@playwright/test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// The Dashboard's accuracy card (lib/accuracyTrend.ts) and the registration
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

/** The full Accuracy, leaks and pacing cards sit behind the summary's All analytics. */
async function openAllAnalytics(page: Page) {
  const analytics = page.getByRole('region', { name: 'Analytics' })
  await analytics.getByRole('button', { name: 'All analytics' }).click({ timeout: 20_000 })
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

test('the Dashboard shows accuracy over the span picked, against the span before', async ({ page }) => {
  await page.goto('/dashboard')
  await openAllAnalytics(page)
  const card = page.getByRole('region', { name: 'Accuracy' })
  await expect(card).toBeVisible({ timeout: 20_000 })
  // 30 days by default: every answer, and no 30 days before it on record.
  await expect(card).toContainText('10 of 20 right, last 30 days')
  await expect(card).not.toContainText('pts')
  await page.getByRole('region', { name: 'Analytics' }).getByRole('radio', { name: 'Last 7 days' }).click()
  await expect(card).toContainText('70%')
  await expect(card).toContainText('7 of 10 right, last 7 days')
  await expect(card).toContainText('40 pts on the 7 days before')
  await expect(card).toContainText(/Hard\s*80%\s*of 5/)
  // A week pools a 3-day line, not a 7-day one that would only repeat the headline.
  await expect(card).toContainText('3-day average')
  // The week's five questions were all answered earlier in the month: every answer is a retry.
  await expect(card).toContainText(/First try\s*—/)
  await expect(card).toContainText(/Retry\s*70%\s*of 10/)
  await card.screenshot({ path: 'test-results/accuracy-card-7d.png' })
  await page.getByRole('region', { name: 'Analytics' }).getByRole('radio', { name: 'Last 30 days' }).click()
  await card.screenshot({ path: 'test-results/accuracy-card-30d.png' })
  await page.emulateMedia({ colorScheme: 'dark' })
  await card.screenshot({ path: 'test-results/accuracy-card-30d-dark.png' })
})

test('the Accuracy card sits in the Analytics section', async ({ page }) => {
  await page.goto('/dashboard')
  await openAllAnalytics(page)
  const analytics = page.getByRole('region', { name: 'Analytics' })
  await expect(analytics).toBeVisible({ timeout: 20_000 })
  await expect(analytics.getByRole('region', { name: 'Accuracy' })).toBeVisible()
})

test('Analytics shows where marks are lost and the pace against the exam', async ({ page }) => {
  await page.goto('/dashboard')
  await openAllAnalytics(page)
  const analytics = page.getByRole('region', { name: 'Analytics' })
  await expect(analytics).toBeVisible({ timeout: 20_000 })
  const leaks = analytics.getByRole('region', { name: "Where you're losing marks" })
  await expect(leaks).toBeVisible()
  await expect(leaks).toContainText('of the exam')
  const pacing = analytics.getByRole('region', { name: 'Pacing' })
  // Every answer took 200 s; Exam FM allows 150 minutes over 30 questions, 5:00 each.
  await expect(pacing).toContainText('3:20')
  await expect(pacing).toContainText('the exam allows 5:00')
  await expect(pacing).toContainText('33% under the exam’s pace')
  await analytics.screenshot({ path: 'test-results/analytics-section.png' })
  await leaks.getByRole('link').first().click()
  await expect(page).toHaveURL(/\/quiz\?exam=Financial\+Mathematics&concepts=/)
})

test('one day of practice gets a number and a way back to its misses, not a chart', async ({ page }) => {
  const rows = answers('2026-10-31', 1, 2, HARD)
  await page.unroute(`${PLACEHOLDER}/rest/v1/question_responses*`)
  await serveAnswers(page, rows)
  await page.goto('/dashboard')
  await openAllAnalytics(page)
  const card = page.getByRole('region', { name: 'Accuracy' })
  await expect(card).toBeVisible({ timeout: 20_000 })
  await page.getByRole('region', { name: 'Analytics' }).getByRole('radio', { name: 'Last 7 days' }).click()
  await expect(card).toContainText('1 of 3 right, last 7 days')
  await expect(card).toContainText('Your trend starts once you')
  await expect(card).not.toContainText('day average')
  await expect(card.getByRole('button', { name: /October 31/ })).toHaveCount(0)
  await card.screenshot({ path: 'test-results/accuracy-card-one-day.png' })
  await card.getByRole('link', { name: /Try today's 2 misses again/ }).click()
  await expect(page).toHaveURL(/\/quiz\?ids=fm-004,fm-005$/)
})

test('the weakest topics each start a quiz on that topic', async ({ page }) => {
  await page.goto('/dashboard')
  await openAllAnalytics(page)
  const card = page.getByRole('region', { name: 'Accuracy' })
  await expect(card).toBeVisible({ timeout: 20_000 })
  await page.getByRole('region', { name: 'Analytics' }).getByRole('radio', { name: 'Last 30 days' }).click()
  const topics = card.getByRole('link')
  await expect(topics).toHaveCount(3)
  await expect(topics.first()).toContainText('Immunization')
  await expect(topics.first()).toContainText('1 of 4 right')
  await topics.first().click()
  await expect(page).toHaveURL(/\/quiz\?exam=Financial\+Mathematics&topics=Immunization&count=10/)
  // The quiz finds questions on the topic: its pre-quiz list or its first question.
  await expect(page.getByRole('button', { name: 'Start Quiz' }).or(page.getByRole('button', { name: 'Option A' })).first()).toBeVisible({ timeout: 20_000 })
})

test('a day on the chart opens the questions answered that day', async ({ page }) => {
  await page.goto('/dashboard')
  await openAllAnalytics(page)
  const card = page.getByRole('region', { name: 'Accuracy' })
  await expect(card).toBeVisible({ timeout: 20_000 })
  await page.getByRole('region', { name: 'Analytics' }).getByRole('radio', { name: 'Last 30 days' }).click()
  await card.getByRole('button', { name: /^October 30: 4 of 5 right/ }).click()
  const dialog = page.getByRole('dialog', { name: 'Questions answered on October 30' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('4 of 5 right (80%)')
  await dialog.getByRole('button', { name: 'Try these 3 again' }).click()
  await expect(page).toHaveURL(/\/quiz\?ids=fm-002,fm-004,fm-005$/)
})

test('the registration deadline shows four days out, and stays dismissed', async ({ page }) => {
  await page.goto('/dashboard')
  await openAllAnalytics(page)
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
  // The full cards wait behind All analytics.
  await expect(analytics.getByRole('region', { name: 'Accuracy' })).toHaveCount(0)
  await analytics.screenshot({ path: 'test-results/analytics-summary.png' })
})
