import { test, expect } from '@playwright/test'

// The onboarding tour is the first thing a new visitor meets, and it drives the
// app itself — it navigates routes, spotlights elements and waits for taps on
// them. That makes it uniquely fragile: renaming a `data-tour` hook or moving a
// control silently strands the tour on a step with nothing to point at.
//
// This spec walks the opening leg of the guided path (launcher → study guide →
// concept → collect gate) and the minimize/resume round-trip, so a broken
// anchor fails here rather than in front of a first-time user.

const tour = (page: import('@playwright/test').Page) =>
  page.getByRole('dialog', { name: 'Getting started tour' })

const spotlight = (page: import('@playwright/test').Page) => page.locator('.onboarding-spotlight')

test.describe('onboarding tour', () => {
  test('starts collapsed, then guides the visitor to their first card', async ({ page }) => {
    await page.goto('/')

    // A first-time visitor gets a small corner button, not a popup over the page.
    const launcher = page.getByRole('button', { name: /Take the getting started tour/ })
    await expect(launcher).toBeVisible()
    await expect(tour(page)).toHaveCount(0)

    await launcher.click()
    await expect(tour(page).getByText('Welcome to Actuarial Notes')).toBeVisible()

    // Step 2 navigates to the wiki and rings the Exam P card.
    await tour(page).getByRole('button', { name: 'Next' }).click()
    await expect(page).toHaveURL(/\/wiki$/)
    await expect(tour(page).getByText('Open a study guide')).toBeVisible()
    await expect(spotlight(page)).toBeVisible()

    // Tapping the spotlighted element is what advances a guided step.
    await page.locator('[data-tour="exam-p"]').first().click()
    await expect(tour(page).getByText('Meet a concept')).toBeVisible()

    await page.locator('[data-wikiref="concept:calculus"]').first().click()
    await expect(tour(page).getByText('Collect the card')).toBeVisible()
    await expect(spotlight(page)).toBeVisible()

    await page.locator('[data-tour="collect-card"]').first().click()
    await expect(tour(page).getByText('Pass the quick check')).toBeVisible()

    // The collect modal is a full-screen overlay: the tour has to layer above
    // it, or the instructions and the ring vanish behind the dimmer.
    const modal = page.getByRole('dialog', { name: /^Collect / })
    await expect(modal).toBeVisible()
    const tourZ = await tour(page).evaluate(el => {
      // The positioned ancestor carries the z-index, not the dialog itself.
      let n: HTMLElement | null = el as HTMLElement
      while (n) {
        const z = getComputedStyle(n).zIndex
        if (z !== 'auto') return Number(z)
        n = n.parentElement
      }
      return 0
    })
    const ringZ = await spotlight(page).evaluate(el => Number(getComputedStyle(el).zIndex))
    expect(tourZ).toBeGreaterThan(130)
    expect(ringZ).toBeGreaterThan(130)
  })

  test('minimizes back to the corner button and resumes on the same step', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Take the getting started tour/ }).click()
    await tour(page).getByRole('button', { name: 'Next' }).click()
    await expect(tour(page).getByText('Open a study guide')).toBeVisible()

    await tour(page).getByRole('button', { name: 'Minimize tour' }).click()
    await expect(tour(page)).toHaveCount(0)
    // A minimized tour is inert — no ring left behind on the page.
    await expect(spotlight(page)).toHaveCount(0)

    const resume = page.getByRole('button', { name: /Resume the getting started tour/ })
    await expect(resume).toBeVisible()
    await resume.click()
    await expect(tour(page).getByText('Open a study guide')).toBeVisible()
  })

  test('dismissing the corner button keeps the tour away on the next visit', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Dismiss tour' }).click()
    await expect(page.getByRole('button', { name: /getting started tour/ })).toHaveCount(0)

    await page.reload()
    await expect(page.getByRole('button', { name: /getting started tour/ })).toHaveCount(0)
  })
})
