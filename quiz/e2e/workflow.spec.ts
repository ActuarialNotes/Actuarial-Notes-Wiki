import { test, expect, type Locator, type Page } from '@playwright/test'

// The Workflow Builder (docs/workflow-builder.md): the way in from the Tools
// catalogue onto an empty board, steps added through the + menu's pages, a
// template laid out and run live along its links — the linked field and the
// figure it came from both on the primary colour, the link said in one line —
// connections drawn by dragging from a step's port (and refused when they
// would loop), a step moved anywhere and dropped on another landing beside
// it, a line opened by tapping it, and the workflow copied as a brief for
// Claude. Signed out throughout: workflows live in localStorage.

type Point = { x: number; y: number }

const centre = (box: { x: number; y: number; width: number; height: number }): Point => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 })

async function dragBetween(page: Page, from: Point, to: Point) {
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  for (let i = 1; i <= 10; i++) await page.mouse.move(from.x + (to.x - from.x) * (i / 10), from.y + (to.y - from.y) * (i / 10))
  await page.mouse.up()
}

const step = (page: Page, name: string) => page.locator('[data-workflow-step]').filter({ hasText: name })

/** A box once the board's camera has stopped moving — it frames what is open. */
async function restingBox(locator: Locator) {
  let last = await locator.boundingBox()
  for (let i = 0; i < 40; i++) {
    await locator.page().waitForTimeout(60)
    const next = await locator.boundingBox()
    if (last && next && Math.abs(last.x - next.x) < 0.5 && Math.abs(last.y - next.y) < 0.5) return next
    last = next
  }
  if (!last) throw new Error('not on the board')
  return last
}

async function openTemplate(page: Page, id: string) {
  await page.goto('/tools/workflow')
  await page.locator(`[data-testid="workflow-template"][data-template="${id}"]`).click()
}

test.describe('workflow builder', () => {
  test('opens from the Tools catalogue and adds a step of each kind through the + menu', async ({ page }) => {
    await page.goto('/tools')
    await page.getByTestId('workflow-builder-entry').click()
    await expect(page).toHaveURL(/\/tools\/workflow$/)
    await expect(page.getByTestId('workflow-empty')).toBeVisible()

    const add = page.getByTestId('workflow-add')
    // Data → a published table.
    await add.click()
    await page.getByTestId('workflow-add-data').click()
    await page.locator('[data-testid="workflow-add-tool"][data-ref="data.yield_curve"]').click()
    await expect(page.locator('[data-workflow-step]')).toHaveCount(1)

    // Calculation → an area → a tool: added after the step just added, and linked from it.
    await add.click()
    await page.getByTestId('workflow-add-calc').click()
    await page.getByTestId('workflow-add-area').filter({ hasText: 'Financial mathematics' }).click()
    await page.locator('[data-testid="workflow-add-tool"][data-ref="finance.interest_converter"]').click()
    await expect(page.locator('[data-workflow-step]')).toHaveCount(2)
    await expect(page.getByTestId('workflow-tally')).toHaveText('2 steps · 1 connection')
    await expect(page.locator('[data-testid="workflow-edge"][data-kind="handoff"]')).toHaveCount(1)
    // Values moving between two steps are the line itself: no word on it.
    await expect(page.getByTestId('workflow-edge-label')).toHaveCount(0)

    // Concept → search the notes. Its connection is the one that carries a word.
    await add.click()
    await page.getByTestId('workflow-add-concepts').click()
    await page.getByTestId('workflow-add-search').fill('Duration')
    await page.locator('[data-testid="workflow-add-concept"][data-ref="Duration"]').click()
    await expect(step(page, 'Duration')).toBeVisible()
    await expect(page.getByTestId('workflow-tally')).toHaveText('3 steps · 2 connections')
    await expect(page.getByTestId('workflow-edge-label')).toHaveText(['applies'])
    await expect(page.getByText('Something went wrong')).toHaveCount(0)

    // The back arrow walks the menu's pages back up.
    await add.click()
    await page.getByTestId('workflow-add-calc').click()
    await page.getByTestId('workflow-add-back').click()
    await expect(page.getByTestId('workflow-add-data')).toBeVisible()
  })

  test('marks a link on both cards and says it in one line', async ({ page }) => {
    await openTemplate(page, 'rate-indication')
    await expect(page.locator('[data-workflow-step]')).toHaveCount(6)

    await step(page, 'Trend Factor').click()
    const panel = page.getByTestId('workflow-step-panel')
    const note = panel.getByTestId('workflow-link-note')
    await expect(note).toHaveText('Annual trend linked to Trend Fit')
    // The linked field wears the primary colour on the card…
    const value = panel.getByTestId('tool-linked-value')
    await expect(value).toBeVisible()
    // …and so does the figure it came from, on the step it came from.
    const source = step(page, 'Trend Fit').getByTestId('workflow-step-linked')
    await expect(source).toBeVisible()
    const shown = (await source.textContent())!.replace('%', '')
    expect(Number(await value.inputValue())).toBeCloseTo(Number(shown), 2)

    // The step's name opens its own panel.
    await note.getByTestId('workflow-link-step').click()
    await expect(panel.getByRole('heading', { name: 'Trend Fit' })).toBeVisible()
    await expect(page.getByTestId('workflow-step-linked')).toHaveCount(0)

    // It survives a reload: the workflow lives in localStorage.
    await page.reload()
    await expect(page.locator('[data-workflow-step]')).toHaveCount(6)
  })

  test('connects steps by dragging from a port, refuses a loop, and moves a step anywhere', async ({ page }) => {
    await openTemplate(page, 'bond-risk')
    await expect(page.locator('[data-workflow-step]')).toHaveCount(5)
    const edges = page.getByTestId('workflow-edge')
    await expect(edges).toHaveCount(4)

    // Duration & Convexity back to Bond Yield would close a loop.
    const port = page.locator('[data-workflow-step]').filter({ hasText: 'Duration & Convexity' }).locator('..').getByTestId('workflow-port')
    const portBox = await port.boundingBox()
    const target = await step(page, 'Bond Yield').boundingBox()
    if (!portBox || !target) throw new Error('board not laid out')
    await dragBetween(page, centre(portBox), centre(target))
    await expect(page.getByTestId('workflow-notice')).toHaveText(/loop back/)
    await expect(edges).toHaveCount(4)

    // Yield Curve on to Bond Price is new: drawn.
    const yieldPort = page.locator('[data-workflow-step]').filter({ hasText: 'Yield Curve' }).locator('..').getByTestId('workflow-port')
    const yp = await yieldPort.boundingBox()
    const price = await step(page, 'Bond Price').boundingBox()
    if (!yp || !price) throw new Error('board not laid out')
    await dragBetween(page, centre(yp), centre(price))
    await expect(edges).toHaveCount(5)

    // A card goes anywhere: half a card up and to the left, off the old grid.
    const card = step(page, 'Yield Curve')
    const before = await card.boundingBox()
    if (!before) throw new Error('no card')
    await dragBetween(page, centre(before), { x: centre(before).x - before.width * 0.6, y: centre(before).y - before.height * 0.5 })
    const after = await card.boundingBox()
    expect(after!.x).toBeLessThan(before.x - before.width * 0.4)
    expect(after!.y).toBeLessThan(before.y - before.height * 0.3)

    // Dropped on another card, it lands beside it rather than on top.
    const other = await step(page, 'Bond Price').boundingBox()
    await dragBetween(page, centre(after!), centre(other!))
    const landed = await card.boundingBox()
    const apart = landed!.x + landed!.width <= other!.x + 1 || other!.x + other!.width <= landed!.x + 1
      || landed!.y + landed!.height <= other!.y + 1 || other!.y + other!.height <= landed!.y + 1
    expect(apart).toBe(true)
  })

  test('opens a link by tapping its line', async ({ page }) => {
    await openTemplate(page, 'rate-indication')
    // Trend Fit → Trend Factor sit level, so their line runs straight across
    // the gutter between them: tap the middle of it.
    const port = await page.locator('[data-workflow-step]').filter({ hasText: 'Trend Fit' }).locator('..').getByTestId('workflow-port').boundingBox()
    const next = await step(page, 'Trend Factor').boundingBox()
    if (!port || !next) throw new Error('board not laid out')
    await page.mouse.click((port.x + port.width + next.x) / 2, port.y + port.height / 2)
    await expect(page.getByTestId('workflow-edge-panel')).toBeVisible()
    await expect(page.getByTestId('workflow-edge-says')).toContainText('linked to')
  })

  test('copies the workflow as a brief for Claude, with no key asked for', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await openTemplate(page, 'reserve-review')
    await page.getByTestId('workflow-open-claude').click()
    const panel = page.getByTestId('workflow-claude-panel')
    await expect(panel.locator('input[type="password"]')).toHaveCount(0)
    await expect(panel).toContainText('/api/mcp')

    await panel.getByTestId('workflow-goal').fill('Compare the two reserve estimates.')
    await panel.getByTestId('workflow-copy-brief').click()
    await expect(panel.getByTestId('workflow-copy-brief')).toHaveText('Copied')
    const copied = await page.evaluate(() => navigator.clipboard.readText())
    expect(copied).toContain('# Workflow: Reserve review')
    expect(copied).toContain('Goal: Compare the two reserve estimates.')
    expect(copied).toContain('`run_tool`')
    expect(copied).toContain('`get_concept`')
  })

  test('saves a workflow to the library, and lists it on the starting screen', async ({ page }) => {
    await openTemplate(page, 'reserve-review')
    await page.getByTestId('workflow-save').click()
    await expect(page.getByTestId('workflow-save')).toHaveAttribute('aria-pressed', 'true')

    // A new, empty workflow opens on the starting screen: the library, then the templates.
    await page.getByTestId('workflow-title').click()
    await page.getByTestId('workflow-new').click()
    await expect(page.getByTestId('workflow-empty')).toBeVisible()
    const item = page.getByTestId('workflow-library-item')
    await expect(item).toHaveCount(1)
    await expect(item).toContainText('Reserve review')
    await item.click()
    await expect(page.getByTestId('workflow-tally')).toHaveText('5 steps · 4 connections')
  })

  test('adds a template as one step, opens it to edit, and comes back up', async ({ page }) => {
    await page.goto('/tools/workflow')
    await page.getByTestId('workflow-add').click()
    await page.getByTestId('workflow-add-workflows').click()
    await page.locator('[data-testid="workflow-add-template"][data-ref="rate-indication"]').click()
    const sub = page.locator('[data-workflow-step][data-kind="workflow"]')
    await expect(sub).toHaveCount(1)
    await expect(sub).toContainText('Rate indication')
    // At one remove: the sub-workflow's figure is its last calculation's.
    await expect(sub.getByTestId('workflow-step-value')).toContainText('ΔR')

    await sub.click()
    const panel = page.getByTestId('workflow-step-panel')
    await expect(panel.getByTestId('workflow-inner-steps').locator('li')).toHaveCount(6)
    await panel.getByTestId('workflow-open-sub').click()
    // Inside it, at full detail — a copy of the reader's own, saved to the library.
    await expect(page.getByTestId('workflow-tally')).toHaveText('6 steps · 5 connections')
    await expect(page.getByTestId('workflow-save')).toHaveAttribute('aria-pressed', 'true')

    await page.getByTestId('workflow-parent').click()
    await expect(page.getByTestId('workflow-tally')).toHaveText('1 step · 0 connections')
    await expect(page.locator('[data-workflow-step][data-kind="workflow"]')).toContainText('Rate indication')
    // The workflow can't go inside itself: the copy is offered, the host isn't.
    await page.getByTestId('workflow-add').click()
    await page.getByTestId('workflow-add-workflows').click()
    await expect(page.getByTestId('workflow-add-library')).toHaveCount(1)
  })

  test('uploads a CSV and links its columns into a calculation', async ({ page }) => {
    await page.goto('/tools/workflow')
    await page.getByTestId('workflow-add').click()
    await page.getByTestId('workflow-add-data').click()
    await page.getByTestId('workflow-csv-input').setInputFiles({
      name: 'cpi.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from('Quarter,Index\n2022Q1,100\n2022Q2,101.5\n2022Q3,103\n2022Q4,104.2\n'),
    })
    const csv = page.locator('[data-workflow-step]').filter({ hasText: 'cpi.csv' })
    await expect(csv).toContainText('4 rows · 2 columns')

    // A Trend Fit added after it is linked, its points filled from the file.
    await page.getByTestId('workflow-add').click()
    await page.getByTestId('workflow-add-calc').click()
    await page.getByTestId('workflow-add-area').filter({ hasText: 'Ratemaking' }).click()
    await page.locator('[data-testid="workflow-add-tool"][data-ref="ratemaking.trend_fit"]').click()
    await expect(page.locator('[data-testid="workflow-edge"][data-kind="handoff"]')).toHaveCount(1)
    await step(page, 'Trend Fit').click()
    const panel = page.getByTestId('workflow-step-panel')
    await expect(panel.getByTestId('workflow-link-note')).toHaveText('Points linked to cpi.csv')
    await expect(panel.getByLabel('Value, row 4')).toHaveValue(/104\.2/)

    // The connection says which column fills what; unmapping the values unlinks it.
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)
    const port = await restingBox(csv.locator('..').getByTestId('workflow-port'))
    const fit = await restingBox(step(page, 'Trend Fit'))
    await page.mouse.click((port.x + port.width + fit.x) / 2, port.y + port.height / 2)
    const edge = page.getByTestId('workflow-edge-panel')
    await expect(edge.getByTestId('workflow-csv-map')).toBeVisible()
    await expect(edge.getByTestId('workflow-map-points-value')).toHaveValue('1')
    await edge.getByTestId('workflow-map-points-value').selectOption('-1')
    await edge.getByTestId('workflow-map-points-period').selectOption('-1')
    await expect(page.locator('[data-testid="workflow-edge"][data-kind="handoff"]')).toHaveCount(0)
  })
})

