import { expect, test } from './test'
import { PLACEHOLDER, signIn } from './fixtures/signedIn'

// Analytics is Pro. A free account sees its tile locked, with a way to
// upgrade, and none of its answers are read for it. The daily session itself
// is free; the one other mention of Pro on Today is the pacing row.

test.use({ viewport: { width: 390, height: 844 } })

test('a free account sees Analytics locked, and nothing is read for it', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-31T10:00:00'))
  await signIn(page, { examProgress: [{ exam_id: 'FM', status: 'in_progress', target_date: '2026-12-03' }] })
  let answersRead = 0
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route => {
    // Other surfaces read answers too (attempt chips, the session's missed
    // questions); only the Analytics read asks for the timing column.
    if (route.request().url().includes('time_spent_seconds')) answersRead++
    return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  })
  await page.goto('/dashboard')
  await expect(page.getByTestId('today-start')).toBeVisible({ timeout: 30_000 })
  const tile = page.getByRole('link', { name: 'Analytics, a Pro feature' })
  await expect(tile).toBeVisible()
  await expect(page.getByRole('link', { name: /Pace my plan to Dec 3/ })).toBeVisible()
  await page.screenshot({ path: 'test-results/analytics-locked.png' })
  expect(answersRead).toBe(0)
  await tile.click()
  await expect(page).toHaveURL(/\/upgrade/)
})

test('the Analytics screen sends a free account to Upgrade', async ({ page }) => {
  await signIn(page, { examProgress: [{ exam_id: 'FM', status: 'in_progress', target_date: '2026-12-03' }] })
  await page.goto('/dashboard/analytics')
  await expect(page).toHaveURL(/\/upgrade/, { timeout: 30_000 })
})
