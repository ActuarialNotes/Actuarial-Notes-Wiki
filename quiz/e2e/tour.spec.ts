import { test, expect } from '@playwright/test'

// The onboarding tour is the first thing a new visitor meets, and it drives the
// app itself — it navigates routes, spotlights elements and waits for taps on
// them. That makes it uniquely fragile: renaming a `data-tour` hook or moving a
// control silently strands the tour on a step with nothing to point at.
//
// This spec walks the opening leg of the guided path (launcher → study guide →
// concept → flashcards) and the minimize/resume round-trip, so a broken
// anchor fails here rather than in front of a first-time user.

const tour = (page: import('@playwright/test').Page) =>
  page.getByRole('dialog', { name: 'Getting started tour' })

const spotlight = (page: import('@playwright/test').Page) => page.locator('.onboarding-spotlight')

test.describe('onboarding tour', () => {
  test('starts collapsed, then guides the visitor to their deck', async ({ page }) => {
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
    // Cards are collected by quizzing now, so the tour goes on to the deck.
    await expect(page).toHaveURL(/\/flashcards/)
    await expect(tour(page).getByText('Flip through your deck')).toBeVisible()
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
