import { expect, test } from '@playwright/test'
import { PLACEHOLDER, signIn } from './fixtures/signedIn'

// Analytics is Pro. A free account sees the section locked, with a way to
// upgrade, and none of its answers are read for it.

test('a free account sees Analytics locked, and nothing is read for it', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-31T10:00:00'))
  await signIn(page, { examProgress: [{ exam_id: 'FM', status: 'in_progress', target_date: '2026-12-03' }] })
  let answersRead = 0
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route => {
    // Other surfaces read answers too (attempt chips); only the Analytics read
    // asks for the timing column.
    if (route.request().url().includes('time_spent_seconds')) answersRead++
    return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  })
  await page.goto('/dashboard')
  const analytics = page.getByRole('region', { name: /Analytics/ })
  await expect(analytics).toBeVisible({ timeout: 20_000 })
  await expect(analytics).toContainText('Track Accuracy and Pace')
  await expect(analytics.getByRole('region', { name: 'Accuracy' })).toHaveCount(0)
  await analytics.screenshot({ path: 'test-results/analytics-locked.png' })
  expect(answersRead).toBe(0)
  await analytics.getByRole('link', { name: 'Upgrade' }).click()
  await expect(page).toHaveURL(/\/upgrade/)
})
