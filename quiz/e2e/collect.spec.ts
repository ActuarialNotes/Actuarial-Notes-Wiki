import { test, expect } from '@playwright/test'

// A flashcard is collected the first time its concept reaches Level 1 — there
// is no comprehension check to pass (docs/flashcard-collection.md). This walks
// that path signed out: the pre-quiz list names the quiz's New concepts and
// opens one in the concept popup, a right answer levels them up, and the
// results screen's ceremony plays the collect animation for them — two
// concepts, so both cards pop into one grid — then recaps the collection.
//
// p-004 links Independent Events and Probability Addition Rule; its answer is A.
test.describe('flashcard collection', () => {
  // The suite resolves animations instantly; this one is about the animation.
  test.use({ reducedMotion: 'no-preference' })

  test('collects a concept by answering its question right', async ({ page }) => {
    await page.goto('/quiz?ids=p-004')

    // Every concept is New on a fresh session, so the list comes first.
    await expect(page.getByRole('heading', { name: 'New concepts in this quiz' })).toBeVisible()

    // A row opens the concept in the popup, to read before the questions start.
    await page.getByRole('button', { name: 'Independent Events' }).click()
    await expect(page.getByRole('complementary', { name: 'Concept: Independent Events' })).toBeVisible()

    await page.getByRole('button', { name: 'Start Quiz' }).click()
    // Starting the quiz leaves the popup behind with the list.
    await expect(page.getByRole('complementary', { name: /^Concept: / })).toHaveCount(0)

    await page.getByRole('button', { name: 'Option A' }).click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()
    await page.getByRole('button', { name: /Finish Quiz/i }).click()

    await expect(page).toHaveURL(/\/review/)
    // Both cards land in the grid collected, then the summary recaps them.
    const ceremony = page.getByRole('dialog', { name: 'Concepts leveled up' })
    await expect(ceremony.getByText('Collected!')).toHaveCount(2)
    await expect(ceremony.getByText('2 Concepts Leveled Up!')).toBeVisible()
    await expect(ceremony.getByTitle('Flashcard collected')).toHaveCount(2)
  })
})
