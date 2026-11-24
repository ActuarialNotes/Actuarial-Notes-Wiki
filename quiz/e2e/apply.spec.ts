import { test, expect, type Page } from './test'
import { signIn } from './fixtures/signedIn'

/**
 * Apply's home (docs/redesign-spec.md §7c.1): Projects, Tools and Workflows as
 * three cards, in that order, each tapped into, each with one count and what
 * the reader last touched. It is the fourth of the places.
 */

const BRIEF = 'Collision Claim Severity'

async function startAttempt(page: Page) {
  await page.goto('/project')
  await page.getByRole('button', { name: 'New project' }).first().click()
  await page.getByRole('dialog', { name: 'New project' }).getByRole('button', { name: new RegExp(BRIEF) }).click()
  const sheet = page.getByRole('dialog', { name: BRIEF })
  await sheet.getByRole('radio', { name: /^Practice/ }).click()
  await sheet.getByRole('button', { name: 'Start project' }).click()
  await expect(page.getByTestId('attempt-overview')).toBeVisible()
}

test.describe('apply', () => {
  test('opens from the places on three cards, in order, each tapped into', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Apply' }).click()
    await expect(page).toHaveURL(/\/apply$/)
    await expect(page.getByRole('heading', { name: 'Apply', level: 1 })).toBeVisible()
    await expect(page.getByRole('main').getByRole('heading', { level: 2 })).toHaveText(['Projects', 'Tools', 'Workflows'])

    // With no exam in focus and nothing started: the briefs, every tool, and no count of workflows.
    await expect(page.getByTestId('apply-projects-count')).toHaveText('3 briefs')
    await expect(page.getByTestId('apply-tools-count')).toHaveText(/^\d+ tools$/)
    await expect(page.getByTestId('apply-workflows-count')).toHaveCount(0)
    await expect(page.getByTestId('apply-attempt')).toHaveCount(0)
    await expect(page.getByTestId('apply-recent-tool')).toHaveCount(0)

    await page.getByTestId('apply-tools-open').click()
    await expect(page).toHaveURL(/\/tools$/)
    await page.goBack()
    await page.getByTestId('apply-projects-open').click()
    await expect(page).toHaveURL(/\/project$/)
    await page.goBack()
    await page.getByTestId('apply-workflows-open').click()
    await expect(page).toHaveURL(/\/workflows$/)
    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('counts the tools of the exam in focus, and lists the tools used last with their level', async ({ page }) => {
    await signIn(page, { examProgress: [{ exam_id: 'FM', status: 'in_progress', target_date: '2026-12-03' }] })
    await page.goto('/tools/bond-price')
    await expect(page.getByTestId('tool-tile').first()).toHaveText('1,077.95')
    await page.goto('/apply')
    await expect(page.getByTestId('apply-tools-count')).toHaveText(/^\d+ for Exam FM$/)
    const recent = page.getByTestId('apply-recent-tool')
    await expect(recent).toHaveCount(1)
    await expect(recent).toContainText('Bond Price')
    await expect(recent.getByRole('img', { name: 'New' })).toBeVisible()
    await recent.click()
    await expect(page).toHaveURL(/\/tools\/bond-price$/)
  })

  test('shows the attempt in progress with its four steps, and opens its overview', async ({ page }) => {
    await signIn(page, { pro: true })
    await startAttempt(page)
    await page.goto('/apply')
    await expect(page.getByTestId('apply-projects-count')).toHaveText('1 in progress')
    const attempt = page.getByTestId('apply-attempt')
    await expect(attempt).toContainText(BRIEF)
    await expect(attempt.getByTestId('step-bar')).toHaveAttribute('aria-label', 'Step 1 of 4: Brief')
    await attempt.click()
    await expect(page.getByTestId('attempt-overview')).toBeVisible()
  })

  test('keeps a reader without Pro to the briefs', async ({ page }) => {
    await signIn(page)
    await page.goto('/apply')
    await expect(page.getByTestId('apply-projects-count')).toHaveText('3 briefs')
    await page.getByTestId('apply-projects-open').click()
    await expect(page.getByTestId('briefs-catalogue')).toBeVisible()
  })
})
