import { test, expect } from '@playwright/test'

/**
 * The PCPA project simulator (docs/pcpa-project.md), signed out.
 *
 * R and Python are downloaded from their CDNs on first use, which a CI runner
 * can't be relied on to reach, so this covers everything up to the first run:
 * starting an attempt behind the candidate agreement, the materials, the data
 * in the workspace, and the word limit the report is held to.
 */
test.describe('pcpa project', () => {
  test('starts an attempt behind the candidate agreement and hands out the materials', async ({ page }) => {
    await page.goto('/project')
    await expect(page).toHaveURL(/\/project\/pcpa$/)
    await page.getByRole('button', { name: 'Start a project' }).click()

    const open = page.getByRole('button', { name: 'Open the window' })
    await expect(open).toBeDisabled()
    for (const box of await page.getByRole('dialog').getByRole('checkbox').all()) await box.check()
    await open.click()

    await expect(page).toHaveURL(/\/project\/pcpa\/p-/)
    await expect(page.getByRole('heading', { name: 'Statement of the business problem' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Scope parameters' })).toBeVisible()
    await expect(page.getByText(/Submissions close/)).toBeVisible()
  })

  test('puts the data sets in the workspace, read-only, beside a starter script', async ({ page }) => {
    await page.goto('/project/pcpa')
    await page.getByRole('button', { name: 'Start a project' }).click()
    for (const box of await page.getByRole('dialog').getByRole('checkbox').all()) await box.check()
    await page.getByRole('button', { name: 'Open the window' }).click()

    await page.getByRole('radio', { name: 'Workspace' }).click()
    const files = page.getByRole('navigation', { name: 'Project files' })
    await expect(files.getByText(/\.csv$/).first()).toBeVisible()
    await expect(files.getByText(/^analysis\.(R|py)$/)).toBeVisible()
    await expect(files.getByLabel('read-only').first()).toBeVisible()

    await files.getByText(/\.csv$/).first().click()
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('counts the report against the 1,250-word limit', async ({ page }) => {
    await page.goto('/project/pcpa')
    await page.getByRole('button', { name: 'Start a project' }).click()
    for (const box of await page.getByRole('dialog').getByRole('checkbox').all()) await box.check()
    await page.getByRole('button', { name: 'Open the window' }).click()

    await page.getByRole('radio', { name: 'Report' }).click()
    await expect(page.getByText('0 / 1,250 words')).toBeVisible()
    await page.getByRole('textbox', { name: 'Technical report' }).click()
    await page.keyboard.insertText('The holdout Gini was 0.27 on a 70/30 split.')
    await expect(page.getByText('9 / 1,250 words')).toBeVisible()
  })

  test('is reachable from the PCPA study guide', async ({ page }) => {
    await page.goto('/wiki/exam/Exam+PCPA+(CAS)')
    await page.getByRole('link', { name: 'Project' }).first().click()
    await expect(page).toHaveURL(/\/project\/pcpa$/)
  })
})
