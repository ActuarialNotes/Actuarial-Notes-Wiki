import { test, expect } from '@playwright/test'

// Math focus mode: tapping a rendered equation anywhere in the app magnifies it
// and lets the reader step through the equations around it. Driven by one
// delegated listener (src/components/MathFocus.tsx), so the wiki stands in for
// every surface that renders KaTeX.

// A concept page with several boxed formulas, bundled at build time.
const CONCEPT = '/wiki/concept/Lognormal+Distribution'

// The vault writes formulas as `> $$…$$`, which remark parses as inline math —
// so the equations to count are the KaTeX roots inside a formula box, plus any
// true display math. Equations folded into a collapsed callout aren't on
// screen, so they don't join the set either.
const EQUATIONS = '[data-math-block] .katex:visible, .katex-display:visible'

test.describe('math focus', () => {
  test('magnifies a tapped equation and steps through the page', async ({ page }) => {
    await page.goto(CONCEPT)

    const box = page.locator('[data-math-block]').first()
    await expect(box).toBeVisible()
    const total = await page.locator(EQUATIONS).count()
    expect(total).toBeGreaterThan(1)

    const equation = page.locator(EQUATIONS).first()
    const before = await equation.boundingBox()

    // Press near the top of the box: some boxes frame a chain of equations, and
    // the press should land on the one it sits beside — here, the first.
    const bounds = (await box.boundingBox())!
    await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + 14)

    const overlay = page.getByRole('dialog', { name: 'Equation focus' })
    await expect(overlay).toBeVisible()
    await expect(overlay.getByText(`1 / ${total}`)).toBeVisible()

    // Magnified: the copy in the overlay is drawn larger than the page's.
    const after = await overlay.locator('.katex').first().boundingBox()
    expect(after!.height).toBeGreaterThan(before!.height)

    await overlay.getByRole('button', { name: 'Next' }).click()
    await expect(overlay.getByText(`2 / ${total}`)).toBeVisible()

    await overlay.getByRole('button', { name: 'Previous' }).click()
    await expect(overlay.getByText(`1 / ${total}`)).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(overlay).toBeHidden()
  })

  test('leaves the rest of the page clicking normally', async ({ page }) => {
    await page.goto(CONCEPT)
    const overlay = page.getByRole('dialog', { name: 'Equation focus' })
    await expect(page.locator('[data-math-block]').first()).toBeVisible()

    // Prose is not a magnify target …
    await page.locator('h1').first().click()
    await expect(overlay).toBeHidden()

    // … nor is a symbol inside a sentence: grabbing those clicks would fight
    // text selection, and there is nothing to focus on.
    const inline = page.locator('p .katex').first()
    await expect(inline).toBeVisible()
    await inline.click({ force: true })
    await expect(overlay).toBeHidden()
  })
})
