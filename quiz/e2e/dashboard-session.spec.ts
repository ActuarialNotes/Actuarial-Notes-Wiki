import { expect, test } from './test'
import { PLACEHOLDER, USER_ID, signIn } from './fixtures/signedIn'

// Today (docs/redesign-spec.md §4): the session sized by time, its steps, the
// one Start, the session length sheet, the week row's days, and the Syllabus
// overlay with its squares.

test.use({ viewport: { width: 390, height: 844 } })

const MISSED = ['p-008', 'p-012', 'p-020', 'p-031', 'p-044']

/** `length`: the session length the reader has kept; none opens on the default, today's plan. */
async function setUp(page: import('@playwright/test').Page, pro: boolean, length: number | null = 25) {
  await page.clock.setFixedTime(new Date('2026-11-07T10:00:00'))
  await signIn(page, { pro, examProgress: [{ exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' }] })
  await page.addInitScript(minutes => {
    if (minutes !== null && !localStorage.getItem('actuarial_session_length_v1')) {
      localStorage.setItem('actuarial_session_length_v1', JSON.stringify({ everyDay: minutes }))
    }
    localStorage.setItem('actuarial_study_plan_config_v1_P', JSON.stringify({
      targetReadyDate: '2026-12-15', targetStrengthLevel: 'strong_all', planStartDate: '2026-10-20',
    }))
  }, length)
  const rows = [
    { question_id: 'p-004', is_correct: true, answered_at: '2026-11-02T15:00:00Z', time_spent_seconds: 200 },
    ...MISSED.map((id, i) => ({ question_id: id, is_correct: false, answered_at: `2026-11-0${i + 1}T15:00:00Z`, time_spent_seconds: 400 })),
  ]
  await page.route(`${PLACEHOLDER}/rest/v1/question_responses*`, route => {
    const before = route.request().url().includes('answered_at=lt.')
    const body = before ? [] : rows.map(r => ({ user_id: USER_ID, ...r }))
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
  })
}

test('Today fits one phone screen down to Start, and Start runs the session as one quiz', async ({ page }) => {
  await setUp(page, true)
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: "Today's session" })
  const start = page.getByTestId('today-start')
  await expect(start).toBeVisible({ timeout: 30_000 })
  // The acceptance test for the layout: Start is on the first screen.
  await expect(start).toBeInViewport({ ratio: 1 })
  await expect(page.getByRole('group', { name: /^This week: \d+ days? studied, today not yet$/ })).toBeVisible()
  await expect(page.getByText('68', { exact: true })).toBeVisible()

  // 25 minutes of Exam P at 6:00 a question is four questions: the oldest
  // miss, then the plan's concepts. More misses wait than fit.
  await expect(card.getByRole('button', { name: 'Session length, 25 minutes. Change' })).toBeVisible()
  await expect(card.locator('[data-step="fix"]')).toContainText(/Fix mistakes\s*[1-3]\s*of 5/)
  const counts = await card.locator('[data-step]').evaluateAll(els => els.map(e => Number(e.querySelector('.font-bold')?.textContent)))
  expect(counts.reduce((a, b) => a + b, 0)).toBe(4)
  // One filled button on the screen, and no wheel.
  await expect(page.getByRole('button', { name: /Exam readiness/i })).toHaveCount(0)
  await page.screenshot({ path: 'test-results/today.png' })

  await start.click()
  await expect(page).toHaveURL(/\/quiz\?selection=stored/, { timeout: 30_000 })
  const ids = await page.evaluate(() => JSON.parse(sessionStorage.getItem('actuarial_selected_ids') ?? '[]') as string[])
  expect(ids[0]).toBe('p-008')
  expect(ids.length).toBeGreaterThan(1)
  expect(ids.length).toBeLessThanOrEqual(4)

  // The quiz asks the session step by step, and its bar is grouped by them:
  // the first miss to fix is the first question.
  const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
  const bar = page.getByRole('slider', { name: 'Question' })
  await expect(startQuiz.or(bar).first()).toBeVisible({ timeout: 30_000 })
  if (await startQuiz.isVisible()) await startQuiz.click()
  await expect(bar).toHaveAttribute('aria-valuetext', new RegExp(`^Question 1 of ${ids.length}\\. Fix mistakes: 1 of \\d$`))
})

test('the session length sheet resizes the session, for today or every day', async ({ page }) => {
  await setUp(page, true)
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: "Today's session" })
  await card.getByRole('button', { name: /Session length, 25 minutes/ }).click({ timeout: 30_000 })
  const sheet = page.getByRole('dialog', { name: 'How long today?' })
  // Today's plan first, then the four fixed lengths.
  await expect(sheet.getByRole('radio')).toHaveCount(5)
  await expect(sheet.getByRole('radio').first()).toHaveAccessibleName(/^Today's plan, \d+ minutes/)
  await expect(sheet.getByRole('radio', { name: /^25 minutes/ })).toBeChecked()
  await sheet.getByRole('radio', { name: /^45 minutes/ }).click()
  await sheet.getByRole('checkbox', { name: 'Use this every day' }).uncheck()
  await sheet.getByRole('button', { name: 'Done' }).click()
  await expect(sheet).toHaveCount(0)
  await expect(card.getByRole('button', { name: 'Session length, 45 minutes. Change' })).toBeVisible()
  // For today only: the every-day length is still 25.
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('actuarial_session_length_v1') ?? '{}'))
  expect(stored).toEqual({ everyDay: 25, today: { day: '2026-11-07', minutes: 45 } })
})

test('a plan opens at the length today\'s plan takes, and a longer length goes past it', async ({ page }) => {
  await setUp(page, true, null)
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: "Today's session" })
  const lengthButton = card.getByRole('button', { name: /^Session length, \d+ minutes\. Change$/ })
  await expect(lengthButton).toBeVisible({ timeout: 30_000 })
  const total = async () => (await card.locator('[data-step]').evaluateAll(els => els.map(e => Number(e.querySelector('.font-bold')?.textContent))))
    .reduce((a, b) => a + b, 0)
  await expect(card.locator('[data-step]').first()).toBeVisible()
  const planned = await total()

  await lengthButton.click()
  const sheet = page.getByRole('dialog', { name: 'How long today?' })
  const planRow = sheet.getByRole('radio').first()
  await expect(planRow).toHaveAccessibleName(/^Today's plan, \d+ minutes/)
  await expect(planRow).toBeChecked()
  // Each row says how many questions it holds and what they are.
  await expect(planRow).toContainText(/\d+ questions?/)
  await expect(sheet.getByRole('radio', { name: /^120 minutes/ })).toContainText(/concepts/)
  await sheet.getByRole('radio', { name: /^120 minutes/ }).click()
  await sheet.getByRole('button', { name: 'Done' }).click()
  await expect(card.getByRole('button', { name: 'Session length, 120 minutes. Change' })).toBeVisible()
  await expect.poll(total).toBeGreaterThan(planned)

  // The quiz is as long as the session says: one question for each miss and
  // each concept, not the fewest that happen to cover the concepts.
  const questions = await total()
  await page.getByTestId('today-start').click()
  await expect(page).toHaveURL(/\/quiz\?selection=stored/, { timeout: 30_000 })
  const ids = await page.evaluate(() => JSON.parse(sessionStorage.getItem('actuarial_selected_ids') ?? '[]') as string[])
  expect(ids.length).toBe(questions)
})

test('a step unfolds its concepts, and a tapped one opens in the reader with its row lit', async ({ page }) => {
  await setUp(page, true)
  await page.goto('/dashboard')
  const card = page.getByRole('region', { name: "Today's session" })
  await expect(page.getByTestId('today-start')).toBeVisible({ timeout: 30_000 })
  const step = card.locator('[data-step]').last()
  await step.getByRole('button').first().click()
  const row = step.locator('[data-study-concept]').first()
  const name = await row.getAttribute('data-study-concept')
  await row.click()
  await expect(card.locator(`[data-study-concept="${name}"][aria-current="true"]`)).toBeVisible()
  await expect(page.getByRole('button', { name: "Today's session" })).toBeVisible()
})

test('a free account gets the same session, with one row to Upgrade', async ({ page }) => {
  await setUp(page, false)
  await page.goto('/dashboard')
  const start = page.getByTestId('today-start')
  await expect(start).toBeVisible({ timeout: 30_000 })
  await expect(start).toBeInViewport({ ratio: 1 })
  const card = page.getByRole('region', { name: "Today's session" })
  await expect(card.locator('[data-step="fix"]')).toBeVisible()
  await expect(card.locator('[data-step="learn"]')).toBeVisible()
  await expect(page.getByRole('link', { name: /Pace my plan to Jan 14/ })).toHaveAttribute('href', '/upgrade')
  // No plan behind it: the syllabus bar has no tick.
  await expect(page.getByTestId('today-syllabus')).toHaveAccessibleName(/^Syllabus: [^,]+$/)
  await start.click()
  await expect(page).toHaveURL(/\/quiz\?selection=stored/, { timeout: 30_000 })
})

test('the Syllabus tile opens the squares by learning objective, and a square opens its concept', async ({ page }) => {
  await setUp(page, true)
  await page.goto('/dashboard')
  await page.getByTestId('today-syllabus').click({ timeout: 30_000 })
  const overlay = page.getByRole('dialog', { name: 'Syllabus' })
  await expect(overlay).toBeVisible()
  await expect(page).toHaveURL(/\/dashboard$/)
  // One section per learning objective, its concepts as squares.
  const objective = overlay.getByRole('region').first()
  await expect(objective.locator('[data-concept-square]').first()).toBeVisible()
  await expect(overlay.getByRole('link', { name: /study guide/ })).toHaveAttribute('href', /\/wiki\/exam\//)
  await page.screenshot({ path: 'test-results/today-syllabus-overlay.png' })

  const square = objective.locator('[data-concept-square]').first()
  const name = await square.getAttribute('data-concept-square')
  await square.click()
  // The overlay stays up, in the room above the reader, on the square being read.
  const reader = page.locator('.concept-popup-aside')
  await expect(reader).toContainText(name!, { timeout: 30_000 })
  await expect(overlay).toBeVisible()
  await expect(square).toHaveAttribute('aria-current', 'true')
  await expect(square).toBeInViewport()
  const overlayBox = (await overlay.boundingBox())!
  const readerBox = (await reader.boundingBox())!
  expect(overlayBox.y + overlayBox.height).toBeLessThanOrEqual(readerBox.y + 1)
  await page.screenshot({ path: 'test-results/today-syllabus-overlay-reading.png' })
  // Esc closes the reader first, then the overlay.
  await page.keyboard.press('Escape')
  await expect(reader).toBeHidden()
  await expect(overlay).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(overlay).toBeHidden()
})

test('on desktop a square names its concept when pointed at, and opens it', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await setUp(page, true)
  await page.goto('/dashboard')
  await expect(page.getByTestId('today-start')).toBeVisible({ timeout: 30_000 })
  const square = page.getByRole('region', { name: 'Syllabus' }).locator('[data-concept-square]').nth(3)
  const name = await square.getAttribute('data-concept-square')
  await square.hover()
  await expect(page.getByRole('tooltip')).toHaveText(name!)
  await page.screenshot({ path: 'test-results/today-desktop.png' })
  await square.click()
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await expect(page.locator('.concept-popup-aside')).toContainText(name!, { timeout: 30_000 })
  await expect(square).toHaveAttribute('aria-current', 'true')
})

test('a day in the week row takes the card, under its date, and Back to today returns', async ({ page }) => {
  await setUp(page, true)
  await page.goto('/dashboard')
  await expect(page.getByTestId('today-start')).toBeVisible({ timeout: 30_000 })
  const card = page.getByTestId('today-session')
  // 2026-11-07 is a Saturday: tomorrow is in the week showing.
  await page.locator('[data-day="2026-11-08"]').click()
  await expect(card.getByRole('heading', { level: 1 })).toHaveText('Sun, Nov 8')
  await expect(page.getByTestId('today-start')).toHaveCount(0)
  // The plan's concepts for that day, each opening in the reader.
  await expect(card.locator('[data-step]').first()).toBeVisible()
  await page.screenshot({ path: 'test-results/today-other-day.png' })

  // A day behind says what was practised.
  await page.locator('[data-day="2026-11-03"]').click()
  await expect(card.getByRole('heading', { level: 1 })).toHaveText('Tue, Nov 3')
  await expect(card).toContainText('No practice on Exam P this day.')

  await card.getByRole('button', { name: 'Back to today' }).click()
  await expect(card.getByRole('heading', { level: 1 })).toHaveText('Today')
  await expect(page.getByTestId('today-start')).toBeVisible()

  // The row scrolls a week at a time; the weeks ahead run to the exam.
  await page.locator('[data-day="2026-11-11"]').click()
  await expect(card.getByRole('heading', { level: 1 })).toHaveText('Wed, Nov 11')
  await page.screenshot({ path: 'test-results/today-next-week.png' })
})
