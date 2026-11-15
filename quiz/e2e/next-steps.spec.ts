import { test, expect } from './test'
import { signIn, PLACEHOLDER, USER_ID } from './fixtures/signedIn'

// The next step at the end of a screen (docs/design-review.md §6, Phase 1):
// a concept page's foot bar, an objective's progress and practice, and the way
// from a tool back to its method.

test('a concept page ends in Practice and its tool', async ({ page }) => {
  await page.goto('/wiki/concept/Chain+Ladder+Method')
  const steps = page.getByTestId('concept-next-steps')
  await expect(steps.getByRole('button', { name: /Practice \d+ questions?/ })).toBeVisible()
  // Signed out there is no level to show.
  await expect(steps.getByRole('button', { name: /Learning Progress/ })).toHaveCount(0)

  await steps.getByRole('link', { name: 'Open in Chain Ladder' }).click()
  await expect(page).toHaveURL(/\/tools\/chain-ladder$/)

  // And back: the tool's labelled way to the page that teaches it, which
  // doesn't offer the tool the reader is already on.
  await page.getByTestId('tool-learn-method').click()
  const inPopup = page.getByTestId('concept-next-steps')
  await expect(inPopup.getByRole('button', { name: /Practice/ })).toBeVisible()
  await expect(inPopup.getByRole('link', { name: 'Open in Chain Ladder' })).toHaveCount(0)
})

test('Practice opens the concept’s questions', async ({ page }) => {
  await page.goto('/wiki/concept/Chain+Ladder+Method')
  await page.getByTestId('concept-next-steps').getByRole('button', { name: /Practice/ }).click()
  await expect(page.getByRole('dialog').getByText('Chain Ladder Method').first()).toBeVisible()
})

test('an open objective ends in a quiz on its concepts', async ({ page }) => {
  await page.goto('/wiki/exam/Exam+5+(CAS)')
  // Signed out, the rows carry no count.
  await expect(page.locator('[data-callout-toggle]').first()).toBeVisible()
  await expect(page.getByTestId('objective-progress')).toHaveCount(0)

  await page.locator('[data-callout-toggle]').first().click()
  await page.getByTestId('practice-objective').first().click()
  await expect(page).toHaveURL(/\/quiz\?exam=Exam\+5&mode=quiz.*concepts=.*count=10/)
})

test('an objective row counts the concepts the reader has learned', async ({ page }) => {
  await signIn(page, { examProgress: [{ exam_id: 'CAS-5', status: 'in_progress', target_date: null }] })
  const now = new Date().toISOString()
  const record = (concept_slug: string, state: string) => ({
    user_id: USER_ID, exam_id: 'CAS-5', concept_slug, state,
    last_attempted_at: now, last_correct_at: now, correct_count: 3, attempt_count: 3,
  })
  await page.route(`${PLACEHOLDER}/rest/v1/concept_mastery*`, route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([record('Exposure Base', 'level1'), record('Chain Ladder Method', 'level2'), record('IBNR', 'level3')]),
  }))
  await page.goto('/wiki/exam/Exam+5+(CAS)')
  const marks = page.getByTestId('objective-progress')
  await expect(marks).toHaveCount(2)
  await expect(marks.first()).toHaveAccessibleName(/^1 of \d+ concepts learned: 1 Level 1, \d+ New$/)
  await expect(marks.nth(1)).toHaveAccessibleName(/^2 of \d+ concepts learned: 1 Level 3, 1 Level 2, \d+ New$/)
})
