import { expect, test } from './test'
import { signIn } from './fixtures/signedIn'
import { studying } from './fixtures/visitor'

// The exam switcher (docs/redesign-spec.md §6): one exam in focus, the sheet
// of the reader's exams, Add an exam, "When is your exam?" and Edit. A
// visitor's exams are the browser's; an account's are its own.

test.use({ viewport: { width: 390, height: 844 } })

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-23T10:00:00'))
})

test('a visitor\'s first screen is Add an exam, and adding one lands on Today', async ({ page }) => {
  await page.goto('/dashboard')
  const add = page.getByTestId('add-exam')
  await expect(add.getByRole('heading', { name: 'Add an exam' })).toBeVisible({ timeout: 30_000 })
  // SOA first: the ready and beta exams as rows, the rest folded.
  await expect(add.getByRole('button', { name: 'SOA' })).toHaveAttribute('aria-pressed', 'true')
  await expect(add.getByRole('button', { name: /^Exam FAM/ })).toBeVisible()
  await expect(add.getByRole('link', { name: /Exam PA/ })).toHaveCount(0)
  await add.getByRole('button', { name: /^In development/ }).click()
  await expect(add.getByRole('link', { name: /Exam PA/ })).toBeVisible()

  await add.getByRole('button', { name: /^Exam P\b/ }).click()
  const date = page.getByTestId('exam-date')
  await expect(date.getByRole('heading', { name: 'When is your exam?' })).toBeVisible()
  // The next three sittings from the published table, then the two that need none.
  await expect(date.getByRole('radio')).toHaveCount(5)
  await expect(date.getByRole('radio').first()).toBeChecked()
  await expect(date.getByRole('radio').first()).toContainText('Jan 14–25, 2027')
  await expect(date.getByRole('radio', { name: 'Another date' })).toBeVisible()
  await expect(date.getByRole('radio', { name: 'Not sure yet' })).toBeVisible()
  await date.getByRole('button', { name: 'Add Exam P' }).click()

  // Today, for the exam added, on its date.
  await expect(page.getByTestId('today-exam')).toHaveAccessibleName('Switch exam, Exam P', { timeout: 30_000 })
  await expect(page.getByText('52', { exact: true })).toBeVisible()
  await expect(page.getByTestId('today-start')).toBeVisible({ timeout: 30_000 })

  // The browser keeps it.
  await page.reload()
  await expect(page.getByTestId('today-exam')).toHaveAccessibleName('Switch exam, Exam P', { timeout: 30_000 })
})

test('an exam with no sitting on file offers only Another date and Not sure yet', async ({ page }) => {
  await page.goto('/dashboard')
  const add = page.getByTestId('add-exam')
  await add.getByRole('button', { name: 'CAS' }).click({ timeout: 30_000 })
  await add.getByRole('button', { name: /^DISC-DA/ }).click()
  const date = page.getByTestId('exam-date')
  await expect(date.getByRole('radio')).toHaveCount(2)
  await expect(date.getByRole('radio', { name: 'Not sure yet' })).toBeChecked()
  // Another date takes a day of the reader's own, and nothing in the past.
  await date.getByRole('radio', { name: 'Another date' }).click()
  await expect(date.getByRole('button', { name: 'Add DISC-DA' })).toBeDisabled()
  await date.getByLabel('Exam date').fill('2027-04-02')
  await date.getByRole('button', { name: 'Add DISC-DA' }).click()
  await expect(page.getByTestId('today-exam')).toHaveAccessibleName(/DISC-DA/, { timeout: 30_000 })
  await expect(page.getByText('Fri, Apr 2')).toBeVisible()
})

test('the sheet switches the exam in focus, and Edit changes, passes and removes', async ({ page }) => {
  await signIn(page, {
    examProgress: [
      { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' },
      { exam_id: 'FM', status: 'in_progress', target_date: '2027-04-14' },
    ],
  })
  await page.goto('/dashboard')
  const control = page.getByTestId('today-exam')
  // The first time, the nearest sitting.
  await expect(control).toHaveAccessibleName('Switch exam, Exam P', { timeout: 30_000 })

  await control.click()
  const sheet = page.getByRole('dialog', { name: 'Your exams' })
  await expect(sheet.getByRole('radio')).toHaveCount(2)
  await expect(sheet.getByRole('radio', { name: /^Exam P, 52 days left/ })).toBeChecked()
  await sheet.getByRole('radio', { name: /^Exam FM, 142 days left/ }).click()
  await expect(sheet).toHaveCount(0)
  await expect(control).toHaveAccessibleName('Switch exam, Exam FM')
  await expect(page.getByText('142', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('quiz.dashboard.activeExamId'))).toBe('FM-2')

  // Edit: a new date for Exam FM.
  await control.click()
  await sheet.getByRole('button', { name: 'Edit' }).click()
  await sheet.getByRole('group', { name: 'Exam FM' }).getByRole('button', { name: 'Change date' }).click()
  const date = page.getByTestId('exam-date')
  await date.getByRole('radio', { name: 'Not sure yet' }).click()
  await date.getByRole('button', { name: 'Save date' }).click()
  await expect(sheet.getByRole('group', { name: 'Exam FM' })).toBeVisible()
  await expect(sheet.getByText('No date')).toBeVisible()

  // A passed exam leaves the switcher, and the focus moves to what is left.
  await sheet.getByRole('group', { name: 'Exam FM' }).getByRole('button', { name: 'Mark as passed' }).click()
  await expect(sheet.getByRole('group', { name: 'Exam FM' })).toHaveCount(0)
  await sheet.getByRole('button', { name: 'Done' }).click()
  await expect(sheet.getByRole('radio')).toHaveCount(1)
  await page.keyboard.press('Escape')
  await expect(control).toHaveAccessibleName('Switch exam, Exam P')

  // Removing the last one brings back Add an exam.
  await control.click()
  await sheet.getByRole('button', { name: 'Edit' }).click()
  await sheet.getByRole('button', { name: 'Remove' }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByTestId('add-exam')).toBeVisible()
})

test('a second device opens on the exam the account last used', async ({ page }) => {
  await signIn(page, {
    metadata: { exam_in_focus: 'FM-2' },
    examProgress: [
      { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' },
      { exam_id: 'FM', status: 'in_progress', target_date: '2027-04-14' },
    ],
  })
  await page.addInitScript(() => localStorage.setItem('quiz.dashboard.activeExamId', 'P-1'))
  await page.goto('/dashboard')
  await expect(page.getByTestId('today-exam')).toHaveAccessibleName('Switch exam, Exam FM', { timeout: 30_000 })
})

test('an exam page\'s address puts the reader\'s exam in focus; any other exam is a visit', async ({ page }) => {
  await signIn(page, {
    examProgress: [
      { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' },
      { exam_id: 'FM', status: 'in_progress', target_date: '2027-04-14' },
    ],
  })
  // One of the reader's exams: its page makes it the exam in focus.
  await page.goto('/wiki/exam/Exam+FM-2+(SOA)')
  const control = page.getByTestId('exam-switcher')
  await expect(control).toHaveAccessibleName('Switch exam, Exam FM-2', { timeout: 30_000 })
  await expect.poll(() => page.evaluate(() => localStorage.getItem('quiz.dashboard.activeExamId'))).toBe('FM-2')
  await expect(page.getByRole('button', { name: 'Add exam' })).toHaveCount(0)

  // An exam the reader hasn't added: the page reads, the focus stays, and the sheet offers it.
  await page.goto('/wiki/exam/Exam+MAS-I+(CAS)')
  await expect(control).toHaveAccessibleName('Switch exam, Exam MAS-I', { timeout: 30_000 })
  await expect(page.getByTestId('exam-page')).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('quiz.dashboard.activeExamId'))).toBe('FM-2')
  await control.click()
  const sheet = page.getByRole('dialog', { name: 'Your exams' })
  await expect(sheet.getByRole('radio', { name: /^Exam FM/ })).toBeChecked()
  await sheet.getByRole('button', { name: 'Add Exam MAS-I' }).click()
  await expect(page.getByTestId('exam-date').getByRole('heading', { name: 'When is your exam?' })).toBeVisible()
  await page.getByTestId('exam-date').getByRole('button', { name: 'Add Exam MAS-I' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByTestId('today-exam')).toHaveAccessibleName('Switch exam, Exam MAS-I', { timeout: 30_000 })
})

test('the Quiz tab opens on the exam in focus, and the switcher changes it', async ({ page }) => {
  await studying(page, [{ exam_id: 'P', target_date: '2027-01-14' }, { exam_id: 'FM', target_date: '2027-04-14' }])
  await page.goto('/')
  const control = page.getByTestId('practice-exam')
  await expect(control).toHaveAccessibleName('Switch exam, Exam P-1', { timeout: 30_000 })
  await expect(page.locator('[data-tour="start-quiz"]')).toBeVisible()

  await control.click()
  await page.getByRole('dialog', { name: 'Your exams' }).getByRole('radio', { name: /^Exam FM/ }).click()
  await expect(control).toHaveAccessibleName('Switch exam, Exam FM-2')

  // An address that names an exam still opens it; one the reader hasn't added is a visit.
  await page.goto('/?topic=Exam%205')
  await expect(control).toHaveAccessibleName('Switch exam, Exam 5', { timeout: 30_000 })
  expect(await page.evaluate(() => localStorage.getItem('quiz.dashboard.activeExamId'))).toBe('FM-2')
  // One the reader has added comes into focus.
  await page.goto('/?topic=Probability')
  await expect(control).toHaveAccessibleName('Switch exam, Exam P-1', { timeout: 30_000 })
  await expect.poll(() => page.evaluate(() => localStorage.getItem('quiz.dashboard.activeExamId'))).toBe('P-1')
})

test('the Quiz tab with no exams is Add an exam, and an exam with no questions says so', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('add-exam').getByRole('heading', { name: 'Add an exam' })).toBeVisible({ timeout: 30_000 })

  await page.evaluate(() => localStorage.setItem('quiz.browserExams', JSON.stringify([
    { exam_id: 'CAS-PCPA', status: 'in_progress', target_date: null },
  ])))
  await page.reload()
  const none = page.getByTestId('quiz-no-bank')
  await expect(none).toContainText('has no practice questions yet.', { timeout: 30_000 })
  await none.getByRole('link', { name: 'Open its study guide' }).click()
  await expect(page).toHaveURL(/\/wiki\/exam\//)
})
