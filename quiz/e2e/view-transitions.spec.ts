import { test, expect, type Page } from './test'
import { studying } from './fixtures/visitor'

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
          // `root` is the page's own sheet (the html element); the rail, the
          // phone header and the "Return to quiz" pill are the chrome held
          // still over it, with the phone's top row (the profile button and the
          // exam at its left), which stand in the same place on every page.
          const allowed = new Set(['root', 'paper-rail', 'paper-bar', 'paper-resume', 'paper-tutor', 'paper-profile', 'paper-lead'])
          expect(names.every(n => allowed.has(n)), `${path} · ${body} · ${move}: ${names.join(', ')}`).toBe(true)
          expect(new Set(names).size, `${path} · ${body} · ${move}: ${names.join(', ')}`).toBe(names.length)
        }
      }
    }
  })

  test('switching tabs runs a transition, and lands', async ({ page }) => {
    await studying(page)
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

    // Learn opens on the study guide of the exam in focus.
    await page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Learn' }).click()
    await page.waitForURL('**/wiki/exam/**')
    // The wiki route is lazy: the transition must have waited for its chunk,
    // so the exam's page is on screen rather than a Suspense spinner.
    await expect(page.getByRole('heading', { name: 'Exam P-1', level: 1 })).toBeVisible()
    expect(await page.evaluate(() => (window as unknown as { __vtCalls: number }).__vtCalls)).toBeGreaterThan(0)

    await page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Practice' }).click()
    await page.waitForURL(url => url.pathname === '/')
    await expect(page.getByTestId('practice-exam')).toBeVisible()
  })

  test('a move onto a page that redraws its top row runs to its end', async ({ page }) => {
    // On a phone the exam at the left and the profile button are held still
    // through a move. An exam's study guide learns what stands at the left a
    // frame after it mounts; a named element replaced mid-move ends the move
    // on the spot, which on screen is a jump.
    await page.setViewportSize({ width: 390, height: 844 })
    await page.addInitScript(() => {
      const w = window as unknown as { __runs: number[] }
      w.__runs = []
      const original = document.startViewTransition?.bind(document)
      if (!original) return
      document.startViewTransition = ((cb: () => void) => {
        const transition = original(cb)
        let ready = 0
        transition.ready.then(() => { ready = performance.now() }, () => {})
        transition.finished.then(() => { w.__runs.push(ready ? performance.now() - ready : 0) })
        return transition
      }) as typeof document.startViewTransition
    })
    await studying(page)
    await page.goto('/')
    await expect(page.getByTestId('practice-exam')).toBeVisible()
    await page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Learn' }).click()
    await expect(page.getByRole('heading', { name: 'Exam P-1', level: 1 })).toBeVisible()
    const runs = () => page.evaluate(() => (window as unknown as { __runs: number[] }).__runs)
    await expect.poll(async () => (await runs()).length).toBe(1)
    // `--paper-duration` is 400ms; a move cut short ends within a frame or two.
    expect((await runs())[0]).toBeGreaterThan(300)
  })

  test('a popup is drawn leaving, and is gone', async ({ page }) => {
    await studying(page)
    await page.goto('/dashboard')
    await page.getByRole('button', { name: /Switch exam/ }).first().click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    // Closed at once for the reader: what is left for the exit is a picture.
    await expect(dialog).toHaveCount(0)
    await expect(page.locator('[data-paper-leaving]')).toHaveCount(0)
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

    await studying(page)
    await page.goto('/')
    const places = page.getByRole('navigation', { name: 'Places' })
    await expect(page.getByTestId('practice-exam')).toBeVisible()

    // Practice → Learn: the place to the left, open on the exam in focus's study guide.
    await places.getByRole('link', { name: 'Learn' }).click()
    await page.waitForURL('**/wiki/exam/**')
    await expect(page.getByRole('heading', { name: 'Exam P-1', level: 1 })).toBeVisible()
    // Learn again, from its home: up to Study Guides, that sheet swiped off.
    await places.getByRole('link', { name: 'Learn' }).click()
    await page.waitForURL('**/wiki')
    await expect(page.locator('a[data-tour="exam-p"]')).toBeVisible()
    // Study Guides → the exam's page: a sheet laid on top. The address changes
    // at the click, but the sheet is laid down only once the page has come
    // (components/PaperRouter.tsx), so the test waits for it too.
    await page.locator('a[data-tour="exam-p"]').click()
    await page.waitForURL('**/wiki/exam/**')
    await expect(page.getByRole('link', { name: 'Back to Study Guides' })).toBeVisible()
    // Learn → Apply: a place to the right.
    await places.getByRole('link', { name: 'Apply' }).click()
    await page.waitForURL('**/apply')

    await expect.poll(moves).toEqual(['prev', 'pop', 'push', 'next'])
    // Every move has landed, and taken its marks off the root with it.
    await expect.poll(() => page.evaluate(() => ({ ...document.documentElement.dataset }))).toEqual({})
  })

  test('a change of screen the address does not show is still a page move', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __moves: string[] }
      w.__moves = []
      const original = document.startViewTransition?.bind(document)
      if (!original) return
      document.startViewTransition = ((cb: () => void) => {
        w.__moves.push(document.documentElement.dataset.paper ?? '-')
        return original(cb)
      }) as typeof document.startViewTransition
    })
    const moves = () => page.evaluate(() => (window as unknown as { __moves: string[] }).__moves)
    await page.goto('/')

    // Games is a page of its own; Quiz Battle's way in and its setups are all `/battle`.
    await page.getByTestId('quiz-games-entry').click()
    await page.waitForURL('**/games')
    await page.getByTestId('quiz-battle-entry').click()
    await page.waitForURL('**/battle')
    // The Deck's intro plays first; a tap skips it.
    await expect(page.getByTestId('battle-home')).toBeVisible()
    const intro = page.getByTestId('battle-intro')
    if (await intro.count()) await intro.click({ timeout: 2000 }).catch(() => {})
    await expect(intro).toHaveCount(0)
    await page.getByTestId('battle-card-local').click()
    await page.getByTestId('battle-mode-local').click()
    await expect(page.getByTestId('battle-begin')).toBeVisible()
    await page.getByRole('button', { name: 'Back', exact: true }).click()
    await expect(page.getByTestId('battle-home')).toBeVisible()

    await expect.poll(moves).toEqual(['push', 'push', 'push', 'pop'])
    await expect.poll(() => page.evaluate(() => ({ ...document.documentElement.dataset }))).toEqual({})
  })

  test('a quiz turns its question like a sheet on a pile', async ({ page }) => {
    await page.goto('/quiz?ids=p-004,p-005')
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' })
    const optionA = page.getByRole('button', { name: 'Option A' })
    await expect(startQuiz.or(optionA).first()).toBeVisible()
    if (await startQuiz.isVisible()) await startQuiz.click()
    await optionA.click()
    await page.getByRole('button', { name: 'Check' }).click()

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

    await page.getByRole('button', { name: 'Next', exact: true }).click()
    const bar = page.getByRole('slider', { name: 'Question' })
    await expect(bar).toHaveAttribute('aria-valuetext', 'Question 2 of 2')
    // Back a question: the row in More (the ← key does the same).
    await page.getByRole('button', { name: 'More', exact: true }).click()
    await page.getByRole('dialog').getByRole('button', { name: 'Previous question' }).click()
    await expect(bar).toHaveAttribute('aria-valuetext', 'Question 1 of 2')

    await expect.poll(turns).toEqual([{ move: 'turn', named: true }, { move: 'return', named: true }])
    await expect(page.locator('.paper-sheet')).toHaveCSS('view-transition-name', 'none')
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

  await page.getByRole('navigation', { name: 'Places' }).getByRole('link', { name: 'Learn' }).click()
  await page.waitForURL('**/wiki')
  await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()
  expect(await page.evaluate(() => (window as unknown as { __vtCalls: number }).__vtCalls)).toBe(0)
  })
})
