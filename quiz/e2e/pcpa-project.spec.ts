import { test, expect, type Page } from './test'
import { signIn } from './fixtures/signedIn'

/**
 * The Projects tab and the PCPA project simulator (docs/pcpa-project.md).
 * Anyone can read a brief; working one is Pro's, so the attempts are tested
 * signed in on a Pro account. An attempt opens on its overview
 * (docs/redesign-spec.md §7c.4), which leads into its views.
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

/** Start a brief. It opens on the attempt's overview. */
async function startAttempt(page: Page, mode: 'Rehearsal' | 'Practice' = 'Rehearsal') {
  const sheet = await chooseBrief(page)
  await sheet.getByRole('radio', { name: new RegExp(`^${mode}`) }).click()
  await sheet.getByRole('button', { name: 'Start project' }).click()
  await expect(page).toHaveURL(/\/project\/pcpa\/p-/)
  await expect(page.getByTestId('attempt-overview')).toBeVisible()
}

/** Start a brief and go into it: a new attempt's filled button reads the brief. */
async function startBrief(page: Page, mode: 'Rehearsal' | 'Practice' = 'Rehearsal') {
  await startAttempt(page, mode)
  await page.getByTestId('overview-continue').click()
  await expect(page).toHaveURL(/view=brief/)
}

test.describe('pcpa project, without Pro', () => {
  test('lists the briefs, reads one in full, and leads to Upgrade to start it', async ({ page }) => {
    await page.goto('/project')
    await expect(page.getByRole('heading', { name: /^Projects/, level: 1 })).toBeVisible()
    await expect(page.getByRole('button', { name: 'New project' })).toHaveCount(0)
    const briefs = page.getByTestId('briefs-catalogue')
    for (const title of [BRIEF, 'Collision Claim Severity', 'Homeowners Water Damage Loss Cost']) {
      await expect(briefs.getByRole('link', { name: new RegExp(title) })).toBeVisible()
    }

    await briefs.getByRole('link', { name: new RegExp(BRIEF) }).click()
    await expect(page).toHaveURL(/\/project\/brief\/bop-frequency$/)
    await expect(page.getByRole('heading', { name: BRIEF, level: 1 })).toBeVisible()
    await page.getByRole('button', { name: /^Scope parameters/ }).click()
    await expect(page.getByText(/Validate the model on data it was not fitted to/)).toBeVisible()
    // Nothing of an attempt: no deadline, and no files to open.
    await expect(page.getByText(/Submissions close|no deadline/)).toHaveCount(0)
    await expect(page.getByTestId('brief-upgrade')).toHaveText('Upgrade to start')
    await expect(page.getByTestId('brief-upgrade')).toHaveAttribute('href', '/upgrade')
  })

  test('marks the row Pro in the sidebar, and sends an attempt link back to the briefs', async ({ page }) => {
    await page.goto('/project/pcpa/p-unknown')
    await expect(page).toHaveURL(/\/project$/)
    const sidebar = page.getByRole('navigation', { name: 'Main' })
    await expect(sidebar.getByRole('link', { name: /^Projects/ })).toContainText('Pro')
  })

  test('is the same for a signed-in reader without Pro', async ({ page }) => {
    await signIn(page)
    await page.goto('/project/brief/auto-severity')
    await expect(page.getByTestId('brief-upgrade')).toBeVisible()
    await expect(page.getByTestId('brief-start')).toHaveCount(0)
  })
})

test.describe('pcpa project', () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page, { pro: true })
  })

  test('lists every brief behind the + on the Projects tab, and starts the one chosen', async ({ page }) => {
    await page.goto('/project')
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible()
    // Signed in, the page says the attempts are kept with the account.
    await expect(page.getByText(/Saved to your account/)).toBeVisible()

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
    await startAttempt(page, 'Practice')
    await expect(page.getByTestId('attempt-mode')).toHaveText('Practice')
    await page.getByTestId('overview-continue').click()
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

  test('lists the attempt\'s views under Projects in the sidebar, in step with the top bar', async ({ page }) => {
    await startBrief(page)
    const sidebar = page.getByRole('navigation', { name: 'Main' })
    for (const view of ['Brief', 'Workspace', 'Report', 'Submit']) {
      await expect(sidebar.getByRole('link', { name: view, exact: true })).toBeVisible()
    }
    await expect(sidebar.getByRole('link', { name: 'Brief', exact: true })).toHaveAttribute('aria-current', 'page')

    await sidebar.getByRole('link', { name: 'Workspace', exact: true }).click()
    await expect(page).toHaveURL(/view=workspace/)
    await expect(page.getByRole('radio', { name: 'Workspace' })).toBeChecked()
    await expect(sidebar.getByRole('link', { name: 'Workspace', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(sidebar.getByRole('link', { name: 'Brief', exact: true })).not.toHaveAttribute('aria-current', 'page')

    await page.getByRole('radio', { name: 'Report' }).click()
    await expect(sidebar.getByRole('link', { name: 'Report', exact: true })).toHaveAttribute('aria-current', 'page')

    // Off the attempt, the views go with it. The Projects row leads to Apply's home.
    await sidebar.getByRole('link', { name: /^Projects/ }).click()
    await expect(page).toHaveURL(/\/apply$/)
    await expect(sidebar.getByRole('link', { name: 'Workspace', exact: true })).toHaveCount(0)
  })

  test('opens an attempt on its overview: the steps, the checklist, and where to continue', async ({ page }) => {
    await startAttempt(page)
    const overview = page.getByTestId('attempt-overview')
    await expect(overview.getByRole('heading', { name: BRIEF, level: 1 })).toBeVisible()
    await expect(overview).toContainText('Lakeshore Mutual Insurance Company')
    await expect(overview.getByTestId('attempt-mode')).toHaveText('Rehearsal')
    await expect(overview.getByTestId('step-bar')).toHaveAttribute('aria-label', 'Step 1 of 4: Brief')
    await expect(overview.getByTestId('checklist-brief')).toContainText('Not yet')
    await expect(overview.getByTestId('checklist-code')).toContainText('Not yet')
    await expect(overview.getByTestId('checklist-report')).toContainText('0 / 1,250')
    await expect(overview.getByTestId('checklist-appendices')).toContainText('0 / 5')
    await expect(overview.getByTestId('checklist-questions')).toContainText('0 / 7')

    // A new attempt starts with the brief; reading it moves the attempt on.
    await expect(overview.getByTestId('overview-continue')).toHaveText('Read the brief')
    await overview.getByTestId('overview-continue').click()
    await expect(page.getByRole('heading', { name: /Statement of the business problem/ })).toBeVisible()
    await page.getByTestId('attempt-overview-link').click()
    await expect(overview.getByTestId('step-bar')).toHaveAttribute('aria-label', 'Step 2 of 4: Workspace')
    await expect(overview.getByTestId('checklist-brief')).toHaveAttribute('data-done', 'true')
    await expect(overview.getByTestId('overview-continue')).toHaveText('Continue in Workspace')
    await expect(overview.getByTestId('overview-brief')).toBeVisible()

    // The report's words are counted on the overview as they are written.
    await overview.getByTestId('checklist-report').click()
    await page.getByRole('textbox', { name: 'Technical report' }).click()
    await page.keyboard.insertText('The holdout Gini was 0.27 on a 70/30 split.')
    await expect(page.getByText('9 / 1,250 words')).toBeVisible()
    await page.getByTestId('attempt-overview-link').click()
    await expect(overview.getByTestId('checklist-report')).toContainText('9 / 1,250')

    await overview.getByTestId('overview-continue').click()
    await expect(page.getByRole('radio', { name: 'Workspace' })).toBeChecked()
    // The views are one history entry: Back leaves the attempt.
    await page.goBack()
    await expect(page).toHaveURL(/\/project$/)
  })

  test('reads a brief before starting it, and starts it from the brief', async ({ page }) => {
    const sheet = await chooseBrief(page)
    await sheet.getByTestId('read-brief').click()
    await expect(page).toHaveURL(/\/project\/brief\/bop-frequency$/)
    await page.getByTestId('brief-start').click()
    await page.getByRole('dialog', { name: BRIEF }).getByRole('button', { name: 'Start project' }).click()
    await expect(page.getByTestId('attempt-overview')).toBeVisible()
  })

  test('offers the same data again on a second attempt at a brief', async ({ page }) => {
    await startBrief(page)
    const sheet = await chooseBrief(page)
    await expect(sheet.getByRole('radiogroup', { name: 'Data' })).toBeVisible()
  })

  test('is its own tab, and reachable from the PCPA study guide', async ({ page }) => {
    await page.goto('/wiki/exam/Exam+PCPA+(CAS)')
    await page.getByRole('main').getByRole('link', { name: 'Project' }).first().click()
    await expect(page).toHaveURL(/\/project$/)
    await page.goto('/project/pcpa')
    await expect(page).toHaveURL(/\/project$/)
  })
})
