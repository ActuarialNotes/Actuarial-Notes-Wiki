import { expect, test } from './test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// Analytics' Written answers section (lib/writtenFeedback.ts) for an Exam 5
// candidate who has graded parts of the Fall 2019 paper's first question
// (cas5-2019f-q1: four "Calculate" parts) over the past fortnight.

const Q = 'cas5-2019f-q1'

const GRADES = [
  { question_id: Q, part_label: 'a', grade: 'incorrect', points: 0.5, graded_at: '2026-11-20T15:00:00Z' },
  { question_id: Q, part_label: 'a', grade: 'partial', points: 0.5, graded_at: '2026-11-27T15:00:00Z' },
  { question_id: Q, part_label: 'b', grade: 'correct', points: 0.25, graded_at: '2026-11-27T15:00:00Z' },
  { question_id: Q, part_label: 'c', grade: 'incorrect', points: 0.5, graded_at: '2026-11-26T15:00:00Z' },
]

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-28T10:00:00'))
  await signIn(page, { pro: true, examProgress: [{ exam_id: 'CAS-5', status: 'in_progress', target_date: '2027-05-01' }] })
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route => {
    const before = route.request().url().includes('answered_at=lt.')
    const body = before ? [] : [
      { user_id: USER_ID, question_id: Q, is_correct: false, answered_at: '2026-11-20T15:00:00Z', time_spent_seconds: 600 },
      { user_id: USER_ID, question_id: Q, is_correct: false, answered_at: '2026-11-27T15:00:00Z', time_spent_seconds: 500 },
    ]
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
  })
  await page.route(`${PLACEHOLDER}/rest/v1/written_part_grades*`, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(GRADES) }))
})

test('Written answers shows the points kept by kind and command word, and a word opens the parts it lost', async ({ page }) => {
  await page.goto('/dashboard/analytics')
  const overlay = page.getByRole('dialog', { name: 'Analytics' })
  const section = overlay.getByTestId('written-answers')
  await expect(section).toBeVisible({ timeout: 30_000 })
  await overlay.getByRole('group', { name: 'Days' }).getByRole('button', { name: '30', exact: true }).click()

  // Kept: 0.5×(0 + ½) + 0.25×1 + 0.5×0 = 0.5 of 1.75 points.
  await expect(section.getByText('29%').first()).toBeVisible()
  await expect(section.getByText('Points kept on 4 written parts.')).toBeVisible()
  await expect(section.getByRole('button', { name: /^Calculation: 29% of points kept over 4 parts/ })).toBeVisible()

  await section.scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'test-results/written-answers-section.png' })

  await section.getByRole('button', { name: /^Calculate: / }).click()
  const group = overlay.getByTestId('written-group')
  await expect(group.getByRole('heading', { name: 'Calculate' })).toBeVisible()
  await expect(group.getByText('2 parts lost credit in the past 30 days.')).toBeVisible()
  const parts = group.getByTestId('written-lost-part')
  await expect(parts).toHaveCount(2)
  // Attempted last first: part A (Nov 27), then part C.
  await expect(parts.first().getByText('Fall 2019 · Part A')).toBeVisible()
  await expect(parts.first().getByLabel('Your grades: None, then Partial')).toBeVisible()
  // The examiners' own words.
  await expect(parts.first().getByText('Many candidates incorrectly assumed an even earning pattern', { exact: false })).toBeVisible()
  await page.screenshot({ path: 'test-results/written-answers.png' })

  await group.getByRole('button', { name: 'Back to Analytics' }).click()
  await expect(section).toBeVisible()

  await section.getByRole('button', { name: /^Calculate: / }).click()
  await overlay.getByRole('button', { name: 'Practice this question' }).click()
  await expect(page).toHaveURL(/\/quiz\?selection=stored/)
})
