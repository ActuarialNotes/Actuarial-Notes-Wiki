import { test, expect } from '@playwright/test'

// A MAS-II question whose stem carries an R model summary in a fenced block.
// Its columns are wider than a phone, and an unstyled <pre> overflows `visible`:
// the output used to run out of the question card and off the side of the
// screen, unreachable. It must now scroll inside its own panel — the columns
// stay aligned (no wrapping), nothing escapes the card, and the block reads as
// a surface rather than as loose text. See components/CodeBlock.tsx.
test.describe('console output in a question stem', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('scrolls inside its own panel instead of overflowing the card', async ({ page }) => {
    await page.goto('/quiz?ids=masii-2019f-q14')

    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    if (await startQuiz.isVisible().catch(() => false)) {
      await startQuiz.click()
    }

    const block = page.locator('pre').first()
    await expect(block).toBeVisible()
    await expect(block).toContainText('(Intercept)')

    // Nothing spills past the viewport — neither the block nor the page.
    const box = (await block.boundingBox())!
    expect(box.x + box.width).toBeLessThanOrEqual(390)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)

    // The output is wider than the card, so the hidden columns have to be
    // reachable by scrolling rather than simply clipped.
    const metrics = await block.evaluate(el => ({
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth,
      overflowX: getComputedStyle(el).overflowX,
      whiteSpace: getComputedStyle(el).whiteSpace,
      panelBackground: getComputedStyle(el.parentElement!).backgroundColor,
    }))
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth)
    expect(metrics.overflowX).toBe('auto')
    expect(metrics.whiteSpace).toBe('pre')
    expect(metrics.panelBackground).not.toBe('rgba(0, 0, 0, 0)')
  })
})
