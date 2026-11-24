import { test, expect } from './test'

// Practice's home (pages/Landing.tsx, docs/redesign-spec.md §7a): the quiz
// card, whose pills open the setup popup, and rows for a Practice Exam, the
// past papers and the flashcards. And, in the quiz, a concept the question
// names opens in the concept popup, highlighted on the card, the way a study
// guide's link is.

test.describe('practice home', () => {
  test('a pill opens the setup popup, with topics, difficulty and the switches', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    const card = page.getByRole('region', { name: 'Your quiz' })
    await expect(card.getByRole('group', { name: 'Settings' }).getByRole('button')).toHaveCount(4)
    await expect(card).toContainText('All topics')
    await expect(card).toContainText('All levels')

    await page.getByTestId('quiz-pill').click()
    const sheet = page.getByRole('dialog', { name: 'Your quiz' })
    await expect(sheet).toBeVisible()
    await expect(sheet.getByRole('heading', { name: 'Topics' })).toBeVisible()
    await expect(sheet.getByRole('switch')).toHaveCount(3)

    // Unticking one topic leaves the others, and the card says how many.
    const topics = sheet.locator('[data-sheet-section="topics"]').getByRole('checkbox')
    await expect(topics.first()).toHaveAttribute('aria-checked', 'true')
    await topics.first().click()
    await expect(topics.first()).toHaveAttribute('aria-checked', 'false')

    // Difficulty is a filter: Hard out changes the pill.
    const hard = sheet.getByRole('group', { name: 'Difficulty' }).getByRole('checkbox', { name: /Hard/ })
    await hard.click()
    await expect(hard).toHaveAttribute('aria-checked', 'false')

    const timed = sheet.getByRole('switch', { name: 'Timed' })
    await timed.click()
    await expect(timed).toHaveAttribute('aria-checked', 'true')

    await sheet.getByRole('button', { name: 'Close' }).click()
    await expect(sheet).toBeHidden()
    await expect(card).toContainText('Easy + Medium')
    await expect(card).toContainText('Timed')
    await expect(card).not.toContainText('All topics')
  })

  test('the minus and plus step the count, and the count takes any number', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    const card = page.getByRole('region', { name: 'Your quiz' })
    await card.getByRole('button', { name: 'One question more' }).click()
    await expect(card).toContainText('4questions')
    await card.getByRole('button', { name: 'One question fewer' }).click()
    await card.getByRole('button', { name: 'One question fewer' }).click()
    await expect(card).toContainText('2questions')

    await page.getByTestId('quiz-count').click()
    await card.getByRole('textbox', { name: /Number of questions/ }).fill('12')
    await page.keyboard.press('Enter')
    await expect(card).toContainText('12questions')
  })

  test('Start launches the quiz the card describes', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByRole('region', { name: 'Your quiz' }).getByRole('button', { name: 'Start' }).click()
    await expect(page).toHaveURL(/\/quiz\?exam=Exam\+5&mode=quiz/)
    await expect(page).toHaveURL(/count=3/)
  })

  test('a past paper opens its popup and is sat whole, as a Practice Exam', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByRole('link', { name: /Past papers/ }).click()
    await expect(page).toHaveURL(/\/papers\?topic=Exam/)
    await expect(page.getByRole('heading', { name: 'Past papers' })).toBeVisible()

    // The older sittings are folded under one row.
    const older = page.getByRole('button', { name: /\d{4} to \d{4}/ })
    await expect(older).toHaveAttribute('aria-expanded', 'false')

    await page.getByRole('button', { name: /Spring 2019/ }).click()
    const paper = page.getByRole('dialog', { name: 'Spring 2019' })
    await expect(paper).toContainText('questions')
    await expect(paper.getByRole('link', { name: /Examiner/ })).toBeVisible()
    await paper.getByRole('button', { name: 'Start Practice Exam' }).click()
    await expect(page).toHaveURL(/mode=mock-exam/)
    await expect(page).toHaveURL(/year=2019/)
  })

  test('a paper already sat shows its last result as a bar', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('actuarial_paper_results_v1', JSON.stringify({
        'Exam 5|2019|Spring': { correct: 14, incorrect: 7, partial: 0, unanswered: 3, at: '2026-11-20T00:00:00Z' },
      }))
    })
    await page.goto('/papers?topic=Exam%205')
    await expect(page.getByRole('img', { name: 'Last sat: 14 correct, 7 incorrect, 3 unanswered' })).toBeVisible()
  })

  test('an exam with no released sittings offers its sample questions', async ({ page }) => {
    await page.goto('/?topic=Probability')
    await expect(page.getByRole('link', { name: /Past papers/ })).toHaveCount(0)
    await page.getByRole('button', { name: /Sample questions/ }).click()
    const popup = page.getByRole('dialog', { name: 'Sample questions' })
    await expect(popup.getByRole('button', { name: 'Start Practice Exam' })).toBeVisible()
  })

  test('a Practice Exam is drawn from the whole bank', async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await page.getByRole('button', { name: /Practice Exam/ }).click()
    await page.getByRole('dialog', { name: 'Practice Exam' })
      .getByRole('button', { name: 'Start Practice Exam' }).click()
    await expect(page).toHaveURL(/mode=mock-exam/)
    await expect(page.getByRole('button', { name: 'Leave the exam' })).toBeVisible()
  })

  test("today's plan is not on the page, a row leads to Flashcards, and the search finds questions over the page", async ({ page }) => {
    await page.goto('/?topic=Exam%205')
    await expect(page.getByTestId('practice')).toBeVisible()
    await expect(page.getByTestId('todays-plan-tile')).toHaveCount(0)
    await expect(page.getByText("Today's Study Plan")).toHaveCount(0)
    await expect(page.getByTestId('practice').getByRole('link', { name: /Flashcards/ })).toHaveAttribute('href', '/flashcards')
    // The search stays on Practice: its results are laid over the page,
    // questions only, the Exam filter on the exam showing.
    await page.getByRole('searchbox', { name: 'Search questions' }).fill('loss')
    const results = page.getByTestId('practice-search-results')
    await expect(results.getByTestId('search-question').first()).toBeVisible({ timeout: 30_000 })
    await expect(page).not.toHaveURL(/\/search/)
    await expect(results.getByRole('button', { name: /Exam 5/ })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(results).toHaveCount(0)
  })

  test('the page opens on the exam in focus, and an address that names another exam is a visit', async ({ page }) => {
    // A first visit has no exams: Add an exam.
    await page.goto('/')
    await expect(page.getByTestId('add-exam').getByRole('heading', { name: 'Add an exam' })).toBeVisible()
    // An address that names an exam opens it without adding it.
    await page.goto('/?topic=Exam%205')
    await expect(page.getByTestId('practice-exam')).toContainText('Exam 5')
    // The exam at the top is the switcher, which offers to add the exam being visited.
    await page.getByTestId('practice-exam').click()
    await expect(page.getByTestId('add-exam').or(page.getByRole('dialog', { name: 'Your exams' })).first()).toBeVisible()
    await page.keyboard.press('Escape')
    // The visit left nothing in focus.
    await page.goto('/')
    await expect(page.getByTestId('add-exam')).toBeVisible()
  })
})

test.describe('concepts in a question', () => {
  test('a named concept opens in the popup and is highlighted on the card', async ({ page }) => {
    await page.goto('/quiz?ids=cas6c-2015s-q33&mode=quiz&reveal=during&links=1')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const mention = page.getByRole('button', { name: 'Read Materiality' }).first()
    await expect(startQuiz.or(mention).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()

    await mention.click()
    await expect(page.locator('.wiki-link--active')).toHaveCount(1)
    await expect(page.locator('[data-concept-mention].wiki-link--active')).toHaveCount(1)
  })

  test('no concept is linked when the reader turned it off', async ({ page }) => {
    await page.goto('/quiz?ids=cas6c-2015s-q33&mode=quiz&reveal=during&links=0')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const stem = page.getByText('Describe the concept of materiality.')
    await expect(startQuiz.or(stem).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await expect(stem).toBeVisible()
    await expect(page.locator('[data-concept-mention]')).toHaveCount(0)
  })
})
