import { test, expect } from '@playwright/test'

// A flashcard is collected the first time its concept reaches Level 1 — there
// is no comprehension check to pass (docs/flashcard-collection.md). This walks
// that path signed out: the pre-quiz list names the quiz's New concepts and
// opens one in the concept popup, a right answer levels it up, and the results
// screen's ceremony plays the collect animation for it.
//
// p-004 links Combinatorics and Conditional Probability; its answer is A.
test.describe('flashcard collection', () => {
  test('collects a concept by answering its question right', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')

    // Every concept is New on a fresh session, so the list comes first.
    await expect(page.getByRole('heading', { name: 'New concepts in this quiz' })).toBeVisible()

    // A row opens the concept in the popup, to read before the questions start.
    await page.getByRole('button', { name: 'Combinatorics' }).click()
    await expect(page.getByRole('complementary', { name: 'Concept: Combinatorics' })).toBeVisible()

    await page.getByRole('button', { name: 'Start Quiz' }).click()
    // Starting the quiz leaves the popup behind with the list.
    await expect(page.getByRole('complementary', { name: /^Concept: / })).toHaveCount(0)

    await page.getByRole('button', { name: 'Option A' }).click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: /Finish Quiz/i }).click()

    await expect(page).toHaveURL(/\/review/)
    // The ceremony plays the collect animation, then recaps the collection.
    const ceremony = page.getByRole('dialog', { name: 'Concepts leveled up' })
    await expect(ceremony.getByText('Collected!')).toBeVisible()
    await expect(ceremony.getByTitle('Flashcard collected').first()).toBeVisible({ timeout: 15_000 })
  })
})
