import { test, expect, type Page } from '@playwright/test'

// The tab-switch view transition (lib/viewTransition.ts,
// components/ViewTransitions.tsx): an exam is one object seen three ways — a
// card on the Quiz tab, a card on Study Guides, a pill on the Dashboard — and
// switching tabs moves it rather than cutting.
//
// Two things here fail silently in the product, which is why they are asserted
// rather than left to the eye:
//
//  - Two live elements sharing a `view-transition-name` abort the *whole*
//    transition, so both tabs' ladders have to be checked for duplicates under
//    each examining body.
//  - The two shells have to agree to the pixel. They are the same page — a
//    ladder of exam cards under a body picker — so any drift between them
//    reads as the page twitching on every switch rather than as the tab
//    changing.

/** Every `view-transition-name` currently live on the page. */
function transitionNames(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>('*'))
      .map(el => getComputedStyle(el).viewTransitionName)
      .filter(name => name && name !== 'none'),
  )
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

  test('the exam card carries the same name on both tabs', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('button[data-tour="quiz-exam-p"]')).toBeVisible()
    await expect(page.locator('button[data-tour="quiz-exam-p"] > div')).toHaveCSS(
      'view-transition-name', 'exam-card-P',
    )

    await page.goto('/wiki')
    await expect(page.locator('a[data-tour="exam-p"]')).toBeVisible()
    await expect(page.locator('a[data-tour="exam-p"] > div')).toHaveCSS(
      'view-transition-name', 'exam-card-P',
    )
  })

  test('no two live elements share a name, on either tab or body', async ({ page }) => {
    for (const path of ['/', '/wiki']) {
      for (const body of ['SOA', 'CAS']) {
        await page.goto(path)
        await page.locator(`[data-segment="${body}"]`).click()
        await expect(page.locator('[style*="view-transition-name"]').first()).toBeVisible()
        const names = await transitionNames(page)
        expect(names.length, `${path} · ${body} names something`).toBeGreaterThan(0)
        expect(new Set(names).size, `${path} · ${body}: ${names.join(', ')}`).toBe(names.length)
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
