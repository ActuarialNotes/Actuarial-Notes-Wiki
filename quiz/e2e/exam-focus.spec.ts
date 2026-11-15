import { test, expect } from './test'

// One exam in focus (docs/design-review.md §6, Phase 2): picked once, and
// every tab opens on it.

test('a visitor is asked which exam, and the answer is where every tab opens', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Which exam are you studying?' })).toBeVisible()
  const switcher = page.getByTestId('exam-switcher')
  await expect(switcher).toHaveAccessibleName('Choose an exam')

  await page.getByRole('radio', { name: 'CAS' }).click()
  await page.getByRole('button', { name: /Exam 5/ }).first().click()
  await expect(page).toHaveURL(/\/\?topic=Exam(\+|%20)5$/)
  await expect(switcher).toHaveAccessibleName('Exam: Exam 5. Change exam')

  // Study Guides opens on the exam's guide, the Quiz tab on its builder.
  const nav = page.getByRole('navigation', { name: 'Main' })
  await nav.getByRole('link', { name: 'Study Guides' }).click()
  await expect(page).toHaveURL(/\/wiki\/exam\/Exam\+5\+\(CAS\)$/)
  await nav.getByRole('link', { name: 'Quiz' }).click()
  await expect(page).toHaveURL(/\/\?topic=Exam(\+|%20)5$/)

  // Resources and the Store open narrowed to it; All is one press away.
  await page.goto('/wiki/resources')
  await expect(page.getByRole('radio', { name: 'Exam 5' })).toBeChecked()
  await page.getByRole('radio', { name: 'All exams' }).click()
  await expect(page).toHaveURL(/exam=all/)
  await expect(page.getByRole('radio', { name: 'All exams' })).toBeChecked()
  await page.goto('/store')
  await expect(page.getByRole('radio', { name: 'Exam 5' })).toBeChecked()
})

test('the switcher changes the exam and moves the page to it', async ({ page }) => {
  await page.goto('/wiki/exam/Exam+5+(CAS)')
  const switcher = page.getByTestId('exam-switcher')
  await switcher.click()
  const menu = page.getByRole('menu', { name: 'Exam' })
  // Ready and beta exams only; the ladder's in-development exams are under All exams.
  await expect(menu.getByRole('menuitemradio', { name: /Exam 6U/ })).toHaveCount(0)
  await menu.getByRole('menuitemradio', { name: /Exam 7/ }).click()
  await expect(page).toHaveURL(/\/wiki\/exam\/Exam\+7\+\(CAS\)$/)
  await expect(switcher).toHaveAccessibleName('Exam: Exam 7. Change exam')

  // Kept across a reload.
  await page.reload()
  await expect(switcher).toHaveAccessibleName('Exam: Exam 7. Change exam')

  await switcher.click()
  await page.getByRole('menuitem', { name: 'All exams' }).click()
  await expect(page).toHaveURL(/\/wiki$/)
})

test('the exam list folds the exams in development', async ({ page }) => {
  await page.goto('/wiki')
  await page.getByRole('radio', { name: 'CAS' }).click()
  await expect(page.getByRole('link', { name: /Exam 5/ }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /Exam 6U/ })).toHaveCount(0)
  await page.getByTestId('in-development-ACAS').click()
  await expect(page.getByRole('link', { name: /Exam 6U/ })).toBeVisible()
})
