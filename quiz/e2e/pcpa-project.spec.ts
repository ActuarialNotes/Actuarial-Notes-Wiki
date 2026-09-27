import { test, expect, type Page } from '@playwright/test'

/**
 * The Projects tab and the PCPA project simulator (docs/pcpa-project.md),
 * signed out.
 *
 * R and Python are downloaded from their CDNs on first use, which a CI runner
 * can't be relied on to reach, so this covers everything up to the first run:
 * choosing a brief from the + and starting it, the materials, the data in the workspace,
 * and the word limit the report is held to.
 */

const BRIEF = 'Small Business Claim Frequency'

/** The + on the Projects tab, and the brief chosen from the sheet it opens. */
async function chooseBrief(page: Page) {
  await page.goto('/project')
  await page.getByRole('button', { name: 'New project' }).first().click()
  await page.getByRole('dialog', { name: 'New project' }).getByRole('button', { name: new RegExp(BRIEF) }).click()
  return page.getByRole('dialog', { name: BRIEF })
}

async function startBrief(page: Page, mode: 'Rehearsal' | 'Practice' = 'Rehearsal') {
  const sheet = await chooseBrief(page)
  await sheet.getByRole('radio', { name: new RegExp(`^${mode}`) }).click()
  await sheet.getByRole('button', { name: 'Start project' }).click()
  await expect(page).toHaveURL(/\/project\/pcpa\/p-/)
}

test.describe('pcpa project', () => {
  test('lists every brief behind the + on the Projects tab, and starts the one chosen', async ({ page }) => {
    await page.goto('/project')
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible()
    // Signed out, the page says where attempts are kept, and that it isn't for good.
    await expect(page.getByText('Saved in this browser only.')).toBeVisible()

    await page.getByRole('button', { name: 'New project' }).first().click()
    const picker = page.getByRole('dialog', { name: 'New project' })
    for (const title of [BRIEF, 'Collision Claim Severity', 'Homeowners Water Damage Loss Cost']) {
      await expect(picker.getByRole('button', { name: new RegExp(title) })).toBeVisible()
    }
    await page.keyboard.press('Escape')

    await startBrief(page)
    await expect(page.getByRole('heading', { name: BRIEF, level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Statement of the business problem/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Scope parameters/ })).toBeVisible()
    await expect(page.getByText(/Submissions close/)).toBeVisible()

    await page.goto('/project')
    await expect(page.getByRole('link', { name: new RegExp(BRIEF) })).toBeVisible()
  })

  test('folds every section of the brief, and opens one from the outline', async ({ page }) => {
    await startBrief(page)
    const scope = page.getByRole('button', { name: /^Scope parameters/ })
    await expect(scope).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('button', { name: /^Statement of the business problem/ })).toHaveAttribute('aria-expanded', 'false')

    const outline = page.getByRole('navigation', { name: 'Brief outline' })
    await outline.getByRole('button', { name: /^Scope/ }).click()
    await expect(scope).toHaveAttribute('aria-expanded', 'true')
    await expect(outline.getByRole('button', { name: /^Scope/ })).toHaveAttribute('aria-current', 'location')

    await scope.click()
    await expect(scope).toHaveAttribute('aria-expanded', 'false')
  })

  test('puts the data sets in the workspace, read-only, beside a starter script', async ({ page }) => {
    await startBrief(page)

    await page.getByRole('radio', { name: 'Workspace' }).click()
    const files = page.getByRole('navigation', { name: 'Project files' })
    await expect(files.getByText(/\.csv$/).first()).toBeVisible()
    await expect(files.getByText(/^analysis\.(R|py)$/)).toBeVisible()
    await expect(files.getByLabel('read-only').first()).toBeVisible()

    await files.getByText(/\.csv$/).first().click()
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('counts the report against the 1,250-word limit', async ({ page }) => {
    await startBrief(page)

    await page.getByRole('radio', { name: 'Report' }).click()
    await expect(page.getByText('0 / 1,250 words')).toBeVisible()
    await page.getByRole('textbox', { name: 'Technical report' }).click()
    await page.keyboard.insertText('The holdout Gini was 0.27 on a 70/30 split.')
    await expect(page.getByText('9 / 1,250 words')).toBeVisible()
  })

  test('runs practice with no deadline, checking the report as it is written', async ({ page }) => {
    await startBrief(page, 'Practice')
    await expect(page.getByText(/Practice, no deadline/)).toBeVisible()

    await page.getByRole('radio', { name: 'Report' }).click()
    const checks = page.getByRole('button', { name: /^Report checks:/ })
    const found = async () => Number(/(\d+) of/.exec((await checks.getAttribute('aria-label')) ?? '')?.[1])
    const before = await found()
    await page.getByRole('textbox', { name: 'Technical report' }).click()
    await page.keyboard.insertText('We validated on a 30% holdout.')
    await expect.poll(found).toBeGreaterThan(before)

    await checks.click()
    await expect(page.getByRole('dialog', { name: 'Report checks' })).toBeVisible()
  })

  test('offers the same data again on a second attempt at a brief', async ({ page }) => {
    await startBrief(page)
    const sheet = await chooseBrief(page)
    await expect(sheet.getByRole('radiogroup', { name: 'Data' })).toBeVisible()
  })

  test('is its own tab, and reachable from the PCPA study guide', async ({ page }) => {
    await page.goto('/wiki/exam/Exam+PCPA+(CAS)')
    await page.getByRole('link', { name: 'Project' }).first().click()
    await expect(page).toHaveURL(/\/project$/)
    await page.goto('/project/pcpa')
    await expect(page).toHaveURL(/\/project$/)
  })
})
