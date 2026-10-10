import { test, expect, type Page } from '@playwright/test'

// The Workflow Builder (docs/workflow-builder.md): the way in from the Tools
// catalogue onto an empty board, steps added through the + menu's pages, a
// template laid out on the grid and run live along its hand-offs, connections
// drawn by dragging from a step's port (and refused when they would loop), a
// step moved to another cell, and a deployment with the reader's own API key —
// against a stand-in for Anthropic's API, so no request leaves the browser.
// Signed out throughout: workflows live in localStorage.

type Point = { x: number; y: number }

const centre = (box: { x: number; y: number; width: number; height: number }): Point => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 })

async function dragBetween(page: Page, from: Point, to: Point) {
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  for (let i = 1; i <= 10; i++) await page.mouse.move(from.x + (to.x - from.x) * (i / 10), from.y + (to.y - from.y) * (i / 10))
  await page.mouse.up()
}

const step = (page: Page, name: string) => page.locator('[data-workflow-step]').filter({ hasText: name })

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

    // Calculation → an area → a tool: added after the step just added, and connected from it.
    await add.click()
    await page.getByTestId('workflow-add-calc').click()
    await page.getByTestId('workflow-add-area').filter({ hasText: 'Financial mathematics' }).click()
    await page.locator('[data-testid="workflow-add-tool"][data-ref="finance.interest_converter"]').click()
    await expect(page.locator('[data-workflow-step]')).toHaveCount(2)
    await expect(page.getByTestId('workflow-tally')).toHaveText('2 steps · 1 connection')
    // Yield Curve hands its rate to the Interest Converter: the line carries values.
    await expect(page.locator('[data-testid="workflow-edge"][data-kind="handoff"]')).toHaveCount(1)

    // Concept → search the notes.
    await add.click()
    await page.getByTestId('workflow-add-concepts').click()
    await page.getByTestId('workflow-add-search').fill('Duration')
    await page.locator('[data-testid="workflow-add-concept"][data-ref="Duration"]').click()
    await expect(step(page, 'Duration')).toBeVisible()
    await expect(page.getByTestId('workflow-tally')).toHaveText('3 steps · 2 connections')
    await expect(page.getByText('Something went wrong')).toHaveCount(0)

    // The back arrow walks the menu's pages back up.
    await add.click()
    await page.getByTestId('workflow-add-calc').click()
    await page.getByTestId('workflow-add-back').click()
    await expect(page.getByTestId('workflow-add-data')).toBeVisible()
  })

  test('lays out a template and runs it live along its hand-offs', async ({ page }) => {
    await openTemplate(page, 'reserve-review')
    await expect(page.locator('[data-workflow-step]')).toHaveCount(5)
    await expect(page.getByTestId('workflow-tally')).toHaveText('5 steps · 4 connections')
    await expect(step(page, 'Chain Ladder').getByTestId('workflow-step-value').first()).toBeVisible()

    // A step's panel carries its live card, and says what its connection fills.
    await step(page, 'Development to Ultimate').click()
    const panel = page.getByTestId('workflow-step-panel')
    await expect(panel.getByTestId('workflow-piped')).toContainText('factors from Age-to-Age Factors')
    await expect(panel.getByTestId('tool-card')).toBeVisible()

    // It survives a reload: the workflow lives in localStorage.
    await page.reload()
    await expect(page.locator('[data-workflow-step]')).toHaveCount(5)
  })

  test('connects steps by dragging from a port, refuses a loop, and moves a step on the grid', async ({ page }) => {
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

    // Drag a card one cell down: it snaps there and stays.
    const card = step(page, 'Yield Curve')
    const before = await card.boundingBox()
    if (!before) throw new Error('no card')
    const to = { x: centre(before).x, y: centre(before).y + before.height * 3.2 }
    await dragBetween(page, centre(before), to)
    const after = await card.boundingBox()
    expect(after!.y).toBeGreaterThan(before.y + before.height)
    expect(Math.abs(after!.x - before.x)).toBeLessThan(2)
  })

  test('deploys with the reader’s own key, answering the model’s tool calls in the browser', async ({ page }) => {
    let calls = 0
    const requests: unknown[] = []
    await page.route('https://api.anthropic.com/**', async route => {
      requests.push(route.request().postDataJSON())
      calls++
      const content = calls === 1
        ? [
            { type: 'text', text: 'Running the chain ladder.' },
            { type: 'tool_use', id: 'toolu_1', name: 'run_tool', input: { tool: 'reserving.chain_ladder', input: {} } },
          ]
        : [{ type: 'text', text: '## Report\n\nUltimate claims came from the chain ladder.' }]
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify({
          id: `msg_${calls}`,
          type: 'message',
          role: 'assistant',
          model: 'claude-opus-5-5',
          content,
          stop_reason: calls === 1 ? 'tool_use' : 'end_turn',
          stop_sequence: null,
          usage: { input_tokens: 10, output_tokens: 10 },
        }),
      })
    })

    await openTemplate(page, 'reserve-review')
    await page.getByTestId('workflow-open-deploy').click()
    const panel = page.getByTestId('workflow-deploy-panel')
    await expect(panel.getByTestId('workflow-deploy')).toBeDisabled()
    await panel.getByTestId('workflow-key-input').fill('sk-ant-test-0000')
    await panel.getByTestId('workflow-save-key').click()
    await expect(panel).toContainText('ends 0000')

    await panel.getByTestId('workflow-deploy').click()
    await expect(panel.getByTestId('workflow-deploy-tool')).toContainText('Chain Ladder: Ultimate')
    await expect(panel.getByRole('heading', { name: 'Report' })).toBeVisible()
    expect(calls).toBe(2)
    // The brief went first; the engine's answer went back as the tool's result.
    const first = requests[0] as { model: string; messages: { content: string }[]; tools: { name: string }[] }
    expect(first.model).toBe('claude-opus-5-5')
    expect(first.messages[0].content).toContain('# Workflow: Reserve review')
    expect(first.tools.map(t => t.name)).toEqual(['run_tool', 'describe_tool', 'read_concept'])
    const second = requests[1] as { messages: { role: string; content: { type: string; content: string }[] }[] }
    expect(second.messages[2].content[0].type).toBe('tool_result')
    expect(second.messages[2].content[0].content).toContain('reserving.chain_ladder')

    // Forget the key: it is gone from this browser.
    await panel.getByTestId('workflow-forget-key').click()
    await expect(panel.getByTestId('workflow-key-input')).toBeVisible()
  })
})
