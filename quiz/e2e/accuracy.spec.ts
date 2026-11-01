import { expect, test } from '@playwright/test'
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
  }))
}

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-31T10:00:00'))
  await signIn(page, { examProgress: [{ exam_id: 'FM', status: 'in_progress', target_date: '2026-12-03' }] })
  const rows = [
    ...answers('2026-10-21', 1, 4, EASY),
    ...answers('2026-10-23', 2, 3, HARD),
    ...answers('2026-10-28', 3, 2, EASY),
    ...answers('2026-10-30', 4, 1, HARD),
  ]
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(rows.map(r => ({ user_id: USER_ID, ...r }))) }))
})

test('the Dashboard shows this week’s accuracy against last week’s', async ({ page }) => {
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: 'Accuracy' })
  await expect(card).toBeVisible({ timeout: 20_000 })
  await expect(card).toContainText('70%')
  await expect(card).toContainText('7 of 10 right, last 7 days')
  await expect(card).toContainText('40 pts on the week before')
  await expect(card).toContainText('Hard')
})

test('the registration deadline shows four days out, and stays dismissed', async ({ page }) => {
  await page.goto('/dashboard')
  const nudge = page.getByRole('status').filter({ hasText: 'Registration for the December 3 Exam FM sitting closes in 4 days' })
  await expect(nudge).toBeVisible({ timeout: 20_000 })
  await expect(nudge).toContainText('November 4, 10:00 AM U.S. Central')
  await nudge.getByRole('button', { name: 'Dismiss' }).click()
  await expect(nudge).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('region', { name: 'Accuracy' })).toBeVisible({ timeout: 20_000 })
  await expect(page.getByText('Registration for the December 3 Exam FM sitting')).toHaveCount(0)
})

test('the quiz builder carries the same deadline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?topic=Financial%20Mathematics')
  await expect(page.getByText('Registration for the December 3 Exam FM sitting closes in 4 days')).toBeVisible({ timeout: 20_000 })
})
