import { test, expect, type Page } from '@playwright/test'

// Paper on a desk (lib/viewTransition.ts, components/PaperRouter.tsx): every
// change of page is a view transition — the desk slides between tabs, a sheet
// is laid over going deeper and swiped off coming back — and everything on a
// page travels with its page.
//
// Two things here fail silently in the product, which is why they are asserted
// rather than left to the eye:
//
//  - Only the chrome may be lifted out of a page. Anything else carrying a
//    `view-transition-name` flies on a path of its own while its sheet slides
//    the other way — and two live elements sharing one abort the transition.
//  - The two shells have to agree to the pixel. They are the same page — a
//    ladder of exam cards under a body picker — so any drift between them
//    reads as the page twitching on every switch rather than as the tab
//    changing.

/** Every `view-transition-name` live on the page while the given move runs. */
function transitionNames(page: Page, move: string): Promise<string[]> {
  return page.evaluate(m => {
    const root = document.documentElement
    root.dataset.paper = m
    try {
      return Array.from(document.querySelectorAll<HTMLElement>('*'))
        .map(el => getComputedStyle(el).viewTransitionName)
        .filter(name => name && name !== 'none')
    } finally {
      delete root.dataset.paper
    }
  }, move)
}

/** The shell geometry the two tabs must share. */
function shell(page: Page) {
  return page.evaluate(() => {
    const round = (r: DOMRect) => ({ x: Math.round(r.x), y: Math.round(r.y), h: Math.round(r.height) })
    const bar = document.querySelector('[class*="sticky"][class*="top-0"][class*="z-50"]')
    const input = document.querySelector('input[type="text"]')
    const h1 = document.querySelector('h1')
    const picker = document.querySelector('[aria-label="Examining body"]')
    return {
      bar: bar ? round(bar.getBoundingClientRect()) : null,
      input: input ? round(input.getBoundingClientRect()) : null,
      title: h1 ? round(h1.getBoundingClientRect()) : null,
      picker: picker ? round(picker.getBoundingClientRect()) : null,
    }
  })
}

test.describe('tab-switch view transitions', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('nothing but the chrome is lifted out of a page, on any move', async ({ page }) => {
    for (const path of ['/', '/wiki', '/dashboard']) {
      for (const body of ['SOA', 'CAS']) {
        await page.goto(path)
        const segment = page.locator(`[data-segment="${body}"]`)
        if (await segment.count()) await segment.click()
        for (const move of ['next', 'prev', 'push', 'pop']) {
          const names = await transitionNames(page, move)
          // `root` is the page's own sheet (the html element); the rail and the
          // phone header are the chrome held still over it.
          const allowed = new Set(['root', 'paper-rail', 'paper-header'])
          expect(names.every(n => allowed.has(n)), `${path} · ${body} · ${move}: ${names.join(', ')}`).toBe(true)
          expect(new Set(names).size, `${path} · ${body} · ${move}: ${names.join(', ')}`).toBe(names.length)
        }
      }
    }
  })

  test('switching tabs runs a transition, and lands', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      const w = window as unknown as { __vtCalls: number }
      w.__vtCalls = 0
      const original = document.startViewTransition?.bind(document)
      if (!original) return
      document.startViewTransition = ((cb: () => void) => {
        w.__vtCalls++
        return original(cb)
      }) as typeof document.startViewTransition
    })

    await page.getByRole('link', { name: 'Study Guides' }).first().click()
    await page.waitForURL('**/wiki')
    await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()
    // The wiki route is lazy: the transition must have waited for its chunk,
    // so the exam card is on screen rather than a Suspense spinner.
    await expect(page.locator('a[data-tour="exam-p"]')).toBeVisible()
    expect(await page.evaluate(() => (window as unknown as { __vtCalls: number }).__vtCalls)).toBeGreaterThan(0)

    await page.getByRole('link', { name: 'Quiz' }).first().click()
    await page.waitForURL(url => url.pathname === '/')
    await expect(page.locator('button[data-tour="quiz-exam-p"]')).toBeVisible()
  })

  test('each kind of move is drawn as its own paper move', async ({ page }) => {
    // Record the move written to the root as each transition starts.
    await page.addInitScript(() => {
      const w = window as unknown as { __moves: string[] }
      w.__moves = []
      const original = document.startViewTransition?.bind(document)
      if (!original) return
      document.startViewTransition = ((cb: () => void) => {
        const root = document.documentElement
        w.__moves.push(root.dataset.paper ?? '-')
        return original(cb)
      }) as typeof document.startViewTransition
    })
    const moves = () => page.evaluate(() => (window as unknown as { __moves: string[] }).__moves)

    await page.goto('/')
    await expect(page.locator('button[data-tour="quiz-exam-p"]')).toBeVisible()

    // Quiz → Study Guides: the tab to the left.
    await page.getByRole('link', { name: 'Study Guides' }).first().click()
    await expect(page.locator('a[data-tour="exam-p"]')).toBeVisible()
    // Study Guides → an exam's page: a sheet laid on top.
    await page.locator('a[data-tour="exam-p"]').click()
    await page.waitForURL('**/wiki/exam/**')
    // Back: that sheet swiped off again.
    await page.goBack()
    await expect(page.locator('a[data-tour="exam-p"]')).toBeVisible()
    // Study Guides → Flashcards: the tab to the right.
    await page.getByRole('link', { name: 'Flashcards' }).first().click()
    await page.waitForURL('**/flashcards')

    await expect.poll(moves).toEqual(['prev', 'push', 'pop', 'next'])
    // Every move has landed, and taken its marks off the root with it.
    await expect.poll(() => page.evaluate(() => ({ ...document.documentElement.dataset }))).toEqual({})
  })

  test('a quiz turns its question like a sheet on a pile', async ({ page }) => {
    await page.goto('/quiz?ids=p-004,p-005')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(startQuiz.or(optionA).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await optionA.click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()

    await page.evaluate(() => {
      const w = window as unknown as { __turns: { move?: string; named: boolean }[] }
      w.__turns = []
      const original = document.startViewTransition.bind(document)
      document.startViewTransition = ((cb: () => void) => {
        const sheet = document.querySelector('.paper-sheet')
        w.__turns.push({
          move: document.documentElement.dataset.paper,
          // The sheet is only named while a turn runs.
          named: !!sheet && getComputedStyle(sheet).viewTransitionName === 'paper-sheet',
        })
        return original(cb)
      }) as typeof document.startViewTransition
    })
    const turns = () => page.evaluate(() => (window as unknown as { __turns: unknown[] }).__turns)

    await page.getByRole('button', { name: /Next Question/ }).click()
    await expect(page.getByText('Question 2 of 2')).toBeVisible()
    await page.getByRole('button', { name: 'Back', exact: true }).click()
    await expect(page.getByText('Question 1 of 2')).toBeVisible()

    await expect.poll(turns).toEqual([{ move: 'turn', named: true }, { move: 'return', named: true }])
    await expect(page.locator('.paper-sheet')).toHaveCSS('view-transition-name', 'none')
  })

  test('the two tabs open on the same shell, and the same examining body', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Quiz' })).toBeVisible()
    const quiz = await shell(page)
    const quizBody = await page.locator('[data-segment][aria-checked="true"]').getAttribute('data-segment')

    await page.goto('/wiki')
    await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()
    const study = await shell(page)
    const studyBody = await page.locator('[data-segment][aria-checked="true"]').getAttribute('data-segment')

    // A fresh reader is on the DEFAULT track, which is neither body's. The two
    // tabs used to fall back in opposite directions from there.
    expect(quizBody).toBe(studyBody)

    expect(quiz.bar).not.toBeNull()
    expect(quiz.bar).toEqual(study.bar)
    expect(quiz.input).toEqual(study.input)
    expect(quiz.title?.y).toBe(study.title?.y)
    expect(quiz.title?.x).toBe(study.title?.x)
    expect(quiz.picker).toEqual(study.picker)
  })
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('a reader who asked for less motion gets no transition', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
  await page.evaluate(() => {
    const w = window as unknown as { __vtCalls: number }
    w.__vtCalls = 0
    const original = document.startViewTransition?.bind(document)
    if (!original) return
    document.startViewTransition = ((cb: () => void) => {
      w.__vtCalls++
      return original(cb)
    }) as typeof document.startViewTransition
  })

  await page.getByRole('link', { name: 'Study Guides' }).first().click()
  await page.waitForURL('**/wiki')
  await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()
  expect(await page.evaluate(() => (window as unknown as { __vtCalls: number }).__vtCalls)).toBe(0)
  })
})
