import { test, expect } from './test'
import { studying } from './fixtures/visitor'

// Loads the wiki from the build-time bundled markdown (virtual:wiki-content),
// no network required, then drills into an exam study-guide page.
test.describe('wiki', () => {
  test('Study Guides leads with the exam in focus and opens its page', async ({ page }) => {
    await studying(page)
    await page.goto('/wiki')

    await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()

    // The exam list is the switcher's now: one row for the exam in focus, the
    // way to the reader's others, then the credentials.
    const mine = page.getByTestId('study-guides-exam')
    await expect(mine.locator('a[href^="/wiki/exam/"]')).toHaveCount(1)
    await expect(page.getByTestId('credential-ASA')).toBeVisible()
    await mine.getByTestId('study-guides-your-exams').click()
    await expect(page.getByRole('dialog', { name: 'Your exams' }).getByRole('radio', { name: /^Exam P/ })).toBeChecked()
    await page.keyboard.press('Escape')

    await mine.locator('a[href^="/wiki/exam/"]').click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    // The exam page: its title, and its learning objectives as cards.
    await expect(page.getByTestId('exam-page').getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('[data-objective]').first()).toBeVisible()
  })

  test('with no exams, Study Guides offers Add an exam and keeps the credentials', async ({ page }) => {
    await page.goto('/wiki')
    await expect(page.getByTestId('study-guides-exam').locator('a[href^="/wiki/exam/"]')).toHaveCount(0)
    await expect(page.getByTestId('credential-FCAS')).toBeVisible()
    await page.getByTestId('study-guides-add-exam').click()
    await expect(page.getByTestId('add-exam').getByRole('heading', { name: 'Add an exam' })).toBeVisible()
    // An in-development exam opens its study guide; reading it needs no adding.
    await page.getByTestId('add-exam').getByRole('button', { name: /^In development/ }).click()
    await page.getByTestId('add-exam').getByRole('link', { name: /Exam PA/ }).click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await expect(page.getByTestId('exam-page')).toBeVisible()
  })

  // Leaving a page and coming back returns to where it was left — by Back, or
  // by the exam page's back arrow — while a new page opens at its top.
  // lib/routeScrollMemory.ts; the router records the place as the page is left.
  test('keeps Study Guides where it was left', async ({ page }) => {
    await studying(page)
    await page.setViewportSize({ width: 1280, height: 420 })
    await page.goto('/wiki')
    const scrollY = () => page.evaluate(() => Math.round(window.scrollY))

    const exam = page.locator('a[data-tour="exam-p"]')
    await expect(exam).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, 40))
    const listY = await scrollY()
    expect(listY).toBeGreaterThan(0)

    await exam.click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await expect.poll(scrollY).toBe(0)

    await page.goBack()
    await expect(page).toHaveURL(/\/wiki$/)
    await expect.poll(scrollY).toBe(listY)

    await exam.click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await page.getByRole('link', { name: 'Back to Study Guides' }).click()
    await expect(page).toHaveURL(/\/wiki$/)
    await expect.poll(scrollY).toBe(listY)
  })

  // Every way back leads to the page the reader came from, and names it; a
  // reader who came in from outside the app is led up to the page's parent
  // instead (lib/navTrail.ts, hooks/useBack.ts).
  test('leads back to the page the reader came from', async ({ page }) => {
    // Straight onto an exam page: nothing of the app's behind it, so up.
    await page.goto('/wiki/exam/Exam+P-1+(SOA)')
    await page.locator('a[title="Study Guides"]').click()
    await expect(page).toHaveURL(/\/wiki$/)
  })

  test('walks back the way the reader came, into the quiz builder as it was left', async ({ page }) => {
    // From the Quiz tab's builder, through Study Guides to the exam: the arrow
    // names Study Guides and returns there, and the browser's Back walks on
    // the same way, into the builder.
    await studying(page)
    await page.goto('/')
    await expect(page.getByTestId('practice-exam')).toHaveAccessibleName('Switch exam, Exam P-1')
    const learn = page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Learn' })
    // Learn opens on the exam in focus's study guide; from there it leads up to Study Guides.
    await learn.click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    // The page is laid down once its chunk has come, and Learn leads up only from there.
    await expect(page.getByRole('heading', { name: 'Exam P-1', level: 1 })).toBeVisible()
    await learn.click()
    await expect(page).toHaveURL(/\/wiki$/)
    await page.locator('a[data-tour="exam-p"]').click()
    const back = page.getByRole('link', { name: 'Back to Study Guides' })
    await back.click()
    await expect(page).toHaveURL(/\/wiki$/)
    await page.goBack()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await page.goBack()
    await expect(page).toHaveURL(url => url.pathname === '/')
    await expect(page.getByTestId('practice-exam')).toBeVisible()
    await expect(page.locator('[data-tour="start-quiz"]')).toBeVisible()
  })

  // Resources is a row of Study Guides: the shelf, filtered by exam, publisher
  // and year, with the choice kept in the URL. It is part of Learn.
  test('opens Resources from Study Guides and filters the shelf by exam', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/wiki')

    const learn = page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Learn' })
    await expect(learn).toHaveAttribute('aria-current', 'page')
    await page.getByTestId('study-guides-link-resources').click()

    await expect(page).toHaveURL(/\/wiki\/resources$/)
    await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible()
    await expect(learn).toHaveAttribute('aria-current', 'page')
    // A visitor with no exams sees every exam's readings.
    const cards = page.locator('main').getByRole('button').filter({ has: page.locator('p.font-semibold') })
    await expect.poll(() => cards.count()).toBeGreaterThan(10)
    await expect(page.getByRole('radiogroup', { name: 'Exams shown' })).toHaveCount(0)

    // An address that names an exam shows its readings, with All exams one tap away.
    await page.goto('/wiki/resources?exam=Exam+7')
    const shown = page.getByRole('radiogroup', { name: 'Exams shown' })
    await expect(shown.getByRole('radio', { name: 'Exam 7' })).toBeChecked()
    await expect.poll(() => cards.count()).toBeGreaterThan(0)
    for (const card of await cards.all()) await expect(card.getByText('Exam 7', { exact: true })).toBeVisible()
    const some = await cards.count()
    await shown.getByRole('radio', { name: 'All exams' }).click()
    await expect(page).toHaveURL(/\/wiki\/resources\?exam=all$/)
    await expect.poll(() => cards.count()).toBeGreaterThan(some)
  })

  test('Resources opens on the exam in focus', async ({ page }) => {
    await studying(page)
    await page.goto('/wiki/resources')
    const shown = page.getByRole('radiogroup', { name: 'Exams shown' })
    await expect(shown.getByRole('radio', { name: 'Exam P-1' })).toBeChecked()
    const cards = page.locator('main').getByRole('button').filter({ has: page.locator('p.font-semibold') })
    await expect.poll(() => cards.count()).toBeGreaterThan(0)
    for (const card of await cards.all()) await expect(card.getByText('Exam P-1', { exact: true })).toBeVisible()
    // Every exam, and back to this one.
    await shown.getByRole('radio', { name: 'All exams' }).click()
    await expect(page).toHaveURL(/exam=all/)
    await shown.getByRole('radio', { name: 'Exam P-1' }).click()
    await expect(page).toHaveURL(/\/wiki\/resources$/)
  })

  // An address naming an exam's regions together still shows them as one exam.
  test('shows the regions of Exam 6 an address names', async ({ page }) => {
    await page.goto('/wiki/resources?exam=Exam+6C&exam=Exam+6U')
    await expect(page.getByRole('radiogroup', { name: 'Exams shown' }).getByRole('radio', { name: 'Exam 6', exact: true })).toBeChecked()
  })
})

// The study guide's sticky header carries an info button beside the version
// menu: it opens the selected sitting's dates (registration, window, results)
// and the publisher's page they were taken from.
test.describe('exam sitting info', () => {
  test('opens from the study guide header and closes on Escape', async ({ page }) => {
    await page.goto('/wiki/exam/Exam+5+(CAS)')

    const info = page.getByRole('button', { name: /^Dates and fees/ })
    await expect(info).toBeVisible()
    await info.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toBeVisible()
    await expect(dialog.locator('a[href^="https://www.casact.org/"]').first()).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(info).toBeFocused()
  })
})

// docs/resource-page-v2.md, phase 1: a resource page leads with what the
// document is, and a long table of contents folds into one row per chapter.
test.describe('resource page', () => {
  test('folds a textbook\'s contents into chapters that open one at a time', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/wiki/resource/' + encodeURIComponent('A First Course in Probability (Ross - 2019)'))

    await expect(page.getByRole('heading', { level: 2, name: 'A First Course in Probability' })).toBeVisible()
    await expect(page.getByText('10th, 2019')).toBeVisible()

    const contents = page.getByRole('region', { name: /Contents/ })
    await expect(contents.getByText('10 chapters')).toBeVisible()
    await expect(contents.getByText(/^Also included: Preface/)).toBeVisible()
    // Folded: the section rows are out of sight until their chapter is opened.
    const row = contents.getByText('5.6.5 The Pareto Distribution')
    await expect(row).toBeHidden()
    await contents.getByText('5 Continuous Random Variables').click()
    await expect(row).toBeVisible()
  })

  test('leaves a short outline open', async ({ page }) => {
    await page.goto('/wiki/resource/' + encodeURIComponent('ALM Strategies for General Insurers (SOA - 2025)'))
    const contents = page.getByRole('region', { name: /Contents/ })
    await expect(contents).toBeVisible()
    await expect(contents.locator('details')).toHaveCount(0)
  })
})

// Learn (docs/redesign-spec.md §7): the exam page's objectives and pills, the
// concept page a pill opens, and the foot a concept ends in.
test.describe('learn', () => {
  const EXAM = '/wiki/exam/Exam+P-1+(SOA)'

  test('an objective unfolds the syllabus sentences with their concepts as pills', async ({ page }) => {
    await page.goto(EXAM)
    const exam = page.getByTestId('exam-page')
    // The title is text, not a menu.
    await expect(exam.getByRole('heading', { level: 1, name: 'Exam P-1' })).toBeVisible()
    await expect(exam.getByRole('heading', { level: 1 }).getByRole('button')).toHaveCount(0)
    await expect(exam).toContainText('Probability · 30 questions · 3 hours')
    // No record: nothing covered, and every square is New.
    await expect(page.getByTestId('exam-syllabus')).toHaveAccessibleName('0% of the syllabus covered')
    await expect(exam.getByRole('link', { name: /Official syllabus/ })).toBeVisible()

    const general = page.locator('[data-objective="General Probability"]')
    await expect(general).toContainText('23–30% of the exam')
    await expect(general.getByRole('img', { name: /^\d+ concepts: \d+ new$/ })).toBeVisible()
    await general.getByRole('button', { name: /General Probability/ }).click()

    // The sentence as the syllabus words it, its concepts under it.
    await expect(general).toContainText('Define set functions, Venn diagrams, sample space, and events.')
    await expect(general.getByRole('link', { name: 'Sample Space, New' })).toBeVisible()
    // A concept is one pill in its objective, however often it is named.
    await expect(general.locator('[data-pill="Probability"]')).toHaveCount(1)
    // The rest is behind "N more"; the objective ends in the page's one filled button.
    await general.getByRole('button', { name: /^\d+ more$/ }).click()
    await expect(general.getByRole('link', { name: 'Bayes Theorem, New' })).toBeVisible()
    await expect(general.getByRole('link', { name: 'Practice General Probability' }))
      .toHaveAttribute('href', /^\/quiz\?exam=Probability&.*concepts=.*&count=10$/, { timeout: 30_000 })
    await expect(page.getByTestId('practice-button')).toHaveCount(1)

    // One objective is open at a time.
    const uni = page.locator('[data-objective="Univariate Random Variables"]')
    await uni.getByRole('button', { name: /Univariate Random Variables/ }).click()
    await expect(uni.getByRole('button', { name: /Univariate Random Variables/ })).toHaveAttribute('aria-expanded', 'true')
    await expect(general.getByRole('button', { name: /General Probability/ })).toHaveAttribute('aria-expanded', 'false')
  })

  test('the foot rows hold the readings, the format, the prerequisites and the fact check', async ({ page }) => {
    await page.goto(EXAM)
    const exam = page.getByTestId('exam-page')
    await exam.getByRole('button', { name: /^Readings/ }).click()
    await expect(exam.locator('[data-foot-row="Readings"] a[href^="/wiki/"]').first()).toBeVisible()
    await exam.getByRole('button', { name: 'Exam format' }).click()
    await expect(exam).toContainText('Each question has five answer choices')
    await exam.getByRole('button', { name: 'What you should know first' }).click()
    await expect(exam.locator('[data-foot-row="What you should know first"]')).toContainText('Calculus')
    await exam.getByRole('button', { name: /^Fact Check/ }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('a pill opens the concept in the reader, over the exam page', async ({ page }) => {
    await page.goto(EXAM)
    const general = page.locator('[data-objective="General Probability"]')
    await general.getByRole('button', { name: /General Probability/ }).click()
    await general.getByRole('button', { name: /^\d+ more$/ }).click()
    const pill = general.getByRole('link', { name: 'Conditional Probability, New' })
    await pill.click()
    // The page stays; the reader opens on the concept and its pill is lit.
    await expect(page).toHaveURL(/\/wiki\/exam\//)
    await expect(page.getByRole('complementary', { name: 'Concept: Conditional Probability' })).toBeVisible()
    await expect(pill).toHaveAttribute('aria-current', 'true')
    // Next walks the syllabus, and the lit pill follows.
    await page.getByRole('complementary', { name: /^Concept:/ }).getByRole('button', { name: 'Next' }).click()
    await expect(pill).not.toHaveAttribute('aria-current', 'true')
    await expect(general.locator('[data-pill][aria-current="true"]')).toHaveCount(1)
  })

  test('the concept page ends in Practice and leads back to its exam', async ({ page }) => {
    await page.goto('/wiki/concept/Conditional+Probability?from=p-1')

    const concept = page.getByTestId('concept-page')
    // The title is text; the level is a button that opens Learning Progress.
    await expect(concept.getByRole('heading', { level: 1, name: 'Conditional Probability' })).toBeVisible()
    await expect(concept.getByRole('heading', { level: 1 }).getByRole('button')).toHaveCount(0)
    await concept.getByRole('button', { name: 'New. Open Learning Progress' }).click()
    const progress = page.getByRole('dialog')
    await expect(progress).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(progress).toBeHidden()

    // More: add to flashcards, listen, fact check.
    await concept.getByRole('button', { name: 'More for Conditional Probability' }).click()
    const menu = page.locator('[data-play-menu]')
    await expect(menu.getByRole('button', { name: /Add to Flashcards/ })).toBeVisible()
    await expect(menu.getByRole('menuitem', { name: 'Listen' })).toBeVisible()
    await expect(menu.getByRole('button', { name: /Fact Check/ })).toBeVisible()
    await expect(menu.getByText('Start Quiz')).toHaveCount(0)
    await page.keyboard.press('Escape')

    // The end of the page: the next concept of the objective, and the foot.
    await expect(page.getByTestId('concept-next')).toContainText(/Next in General Probability/)
    const practice = page.getByTestId('practice-button')
    await expect(practice).toContainText(/Practice\s*\d+ questions/, { timeout: 30_000 })
    await expect(practice).toHaveAttribute('href', '/search?tab=questions&concept=Conditional+Probability')
    await expect(practice).toBeInViewport()

    // Back, for a reader who landed here, is up to the exam.
    await concept.getByRole('link', { name: 'Exam P-1' }).first().click()
    await expect(page).toHaveURL(/\/wiki\/exam\//)
  })

  test('the reader ends a concept the same way: Previous, Practice, Next', async ({ page }) => {
    await page.goto(`${EXAM}?concept=Conditional+Probability`)
    const reader = page.getByRole('complementary', { name: 'Concept: Conditional Probability' })
    await expect(reader).toBeVisible()
    // Its objective is open on the page behind.
    await expect(page.locator('[data-objective="General Probability"]').getByRole('button', { name: /General Probability/ }))
      .toHaveAttribute('aria-expanded', 'true')
    await expect(reader.getByRole('heading', { level: 2, name: 'Conditional Probability' })).toBeVisible()
    // The level is the first row of More; focus mode sits beside the close button.
    await expect(reader.getByRole('button', { name: 'Focus mode' })).toBeVisible()
    await reader.getByRole('button', { name: 'More for Conditional Probability' }).click()
    await expect(page.locator('[data-play-menu]').getByRole('menuitem', { name: 'New. Open Learning Progress' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(reader.getByRole('button', { name: 'Previous' })).toBeVisible()
    await expect(reader.getByRole('link', { name: 'Practice', exact: true }))
      .toHaveAttribute('href', '/search?tab=questions&concept=Conditional+Probability', { timeout: 30_000 })

    // Practice opens the concept's questions over the page, three to start.
    const url = page.url()
    await reader.getByRole('link', { name: 'Practice', exact: true }).click()
    const overlay = page.getByRole('dialog', { name: 'Practice Conditional Probability' })
    await expect(overlay).toBeVisible()
    await expect(overlay.getByTestId('practice-search-start')).toContainText('Practice 3', { timeout: 30_000 })
    expect(page.url()).toBe(url)
    await overlay.getByRole('button', { name: 'Close' }).click()
    await expect(overlay).toBeHidden()
    await expect(reader).toBeVisible()

    await reader.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByRole('complementary', { name: /^Concept: (?!Conditional Probability)/ })).toBeVisible()
  })
})
