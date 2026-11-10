import { expect, test } from './test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// "How did the exam go?" (lib/examOutcome.ts, roadmap L18): an Exam 5
// candidate who sat the October 2026 window, once CAS's results should be out
// (8 weeks after the window closed on October 27: December 22).

const EXAM = [{ exam_id: 'CAS-5', status: 'in_progress', target_date: '2026-10-20' }]

test('asks once results are out, and saves the answer to the account', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2027-01-05T10:00:00'))
  await signIn(page, { examProgress: EXAM })
  const writes: unknown[] = []
  await page.route(`${PLACEHOLDER}/rest/v1/exam_outcomes*`, route => {
    if (route.request().method() === 'GET') {
      return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    }
    writes.push(route.request().postDataJSON())
    return route.fulfill({ status: 201, contentType: 'application/json', body: 'null' })
  })

  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: 'How did Exam 5 go?' })
  await expect(card).toBeVisible({ timeout: 20_000 })
  await expect(card).toContainText('Results for the Oct 2026 sitting should be out by now.')
  await card.screenshot({ path: 'test-results/exam-outcome.png' })
  await card.getByRole('button', { name: 'Passed' }).click()

  await expect(page.getByRole('status').filter({ hasText: 'Thanks.' })).toBeVisible()
  expect(writes).toHaveLength(1)
  expect(writes[0]).toMatchObject({ user_id: USER_ID, exam_id: 'CAS-5', sitting_start: '2026-10-19', outcome: 'passed' })
})

test('does not ask about a sitting already answered', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2027-01-05T10:00:00'))
  await signIn(page, { examProgress: EXAM })
  let read = false
  await page.route(`${PLACEHOLDER}/rest/v1/exam_outcomes*`, route => {
    read = true
    const body = [{ exam_id: 'CAS-5', sitting_start: '2026-10-19' }]
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
  })
  await page.goto('/dashboard')
  await expect.poll(() => read, { timeout: 20_000 }).toBe(true)
  await expect(page.getByRole('region', { name: 'How did Exam 5 go?' })).toHaveCount(0)
})

test('does not ask before results are out, or read the table', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-12-01T10:00:00'))
  await signIn(page, { examProgress: EXAM })
  let read = false
  await page.route(`${PLACEHOLDER}/rest/v1/exam_outcomes*`, route => {
    read = true
    return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  })
  await page.goto('/dashboard')
  await expect(page.getByRole('main')).toBeVisible({ timeout: 20_000 })
  await page.waitForTimeout(1500)
  await expect(page.getByRole('region', { name: 'How did Exam 5 go?' })).toHaveCount(0)
  expect(read).toBe(false)
})
