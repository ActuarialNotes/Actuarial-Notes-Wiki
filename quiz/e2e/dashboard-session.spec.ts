import { expect, test } from './test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// Today's session (lib/todaySession.ts): the Dashboard's wheel, the day's size
// and its steps — the missed question first, then today's plan — with one Start
// in the card and its copy in the pinned exam row.

test.use({ viewport: { width: 390, height: 844 } })

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-07T10:00:00'))
  await signIn(page, { pro: true, examProgress: [{ exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' }] })
  await page.addInitScript(() => {
    localStorage.setItem('actuarial_study_plan_config_v1_P', JSON.stringify({
      targetReadyDate: '2026-12-15', targetStrengthLevel: 'strong_all', planStartDate: '2026-10-20',
    }))
  })
  const rows = [
    { question_id: 'p-004', is_correct: true, answered_at: '2026-11-02T15:00:00Z', time_spent_seconds: 200 },
    { question_id: 'p-008', is_correct: false, answered_at: '2026-11-03T15:00:00Z', time_spent_seconds: 400 },
  ]
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route => {
    const before = route.request().url().includes('answered_at=lt.')
    const body = before ? [] : rows.map(r => ({ user_id: USER_ID, ...r }))
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
  })
})

test('the session lists the day in steps, and Start does the first one', async ({ page }) => {
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: "Today's session" })
  await expect(card).toBeVisible({ timeout: 30_000 })
  await expect(card.getByRole('heading', { name: 'Fix 1 mistake' })).toBeVisible()
  await expect(card.getByRole('heading', { name: /^Learn \d+ new concepts?$/ })).toBeVisible()
  // Exam P is paced at 6:00 a question: the size is questions and minutes.
  await expect(card).toContainText(/\d+\s*questions?\s*\d+\s*min/)
  await expect(card.getByRole('button', { name: /Exam readiness \d+%.*open the study guide/i })).toBeVisible()
  await page.screenshot({ path: 'test-results/dashboard-session.png', fullPage: true })

  // The pinned row carries the same Start, sized.
  const pill = page.getByRole('button', { name: /^Start session — \d+ questions?, \d+ minutes$/ })
  await expect(pill).toBeVisible()
  await expect(pill).toContainText(/\d+ min/)

  // No time bar and no numbered pins on the wheel.
  await expect(card.getByRole('list', { name: 'Time by step' })).toHaveCount(0)

  // Start runs the whole session as one quiz, the missed question first.
  await card.getByRole('button', { name: 'Start session' }).click()
  await expect(page).toHaveURL(/\/quiz\?selection=stored/, { timeout: 30_000 })
  const ids = await page.evaluate(() => JSON.parse(sessionStorage.getItem('actuarial_selected_ids') ?? '[]') as string[])
  expect(ids[0]).toBe('p-008')
  expect(ids.length).toBeGreaterThan(1)
})

test('a tapped row walks the list on screen, the row it is on held highlighted', async ({ page }) => {
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: "Today's session" })
  await expect(card).toBeVisible({ timeout: 30_000 })
  const rows = card.locator('[data-study-concept]')
  const names = await rows.evaluateAll(els => [...new Set(els.map(e => e.getAttribute('data-study-concept')!))])
  expect(names.length).toBeGreaterThan(2)
  await rows.first().click()
  for (const name of names.slice(0, 3)) {
    await expect(card.locator(`[data-study-concept="${name}"][aria-current="true"]`).first()).toBeVisible()
    await page.keyboard.press('ArrowRight')
  }
})

test('the wheel opens Exam Readiness', async ({ page }) => {
  await page.goto('/dashboard')
  await page.getByRole('button', { name: /Exam readiness \d+%.*open the study guide/i }).click({ timeout: 30_000 })
  await expect(page.getByRole('dialog', { name: 'Exam Readiness' })).toBeVisible()
})
