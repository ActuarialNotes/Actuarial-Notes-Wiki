// **Paper on a desk** — how the app moves between its states.
//
// Every page is a sheet of paper, and the app is the desk they lie on. The
// tabs lie side by side in the order the sidebar lists them, so switching
// tabs slides the desk along (`next` / `prev`); following a link deeper into
// a tab lays a new sheet on top of the one you were reading (`push`); and
// coming back up swipes the top sheet away to uncover the one beneath it
// (`pop`). Inside a page, a run of sheets — a quiz's questions — is turned the
// same way: the answered question is swiped off the pile (`turn`) and Back
// slides it back on (`return`).
//
// The browser's View Transitions API does the drawing: it snapshots the page
// before and after an update and hands the two pictures to CSS, and
// `index.css` animates them according to `data-paper` on the root element.
// This module decides *which* move a change is (`paperMove`, pure, from two
// paths and how the history moved) and starts it (`startViewTransition`).
// `components/PaperRouter.tsx` is what calls it for every navigation, and
// `moveScreen` is what a page calls for a change of screen the address doesn't
// show — the Quiz tab's exam list giving way to one exam's builder.
//
// Everything on a page travels with its page. An exam's row on the Quiz tab
// and the same exam's row on Study Guides are on two different sheets, so a
// tab switch slides them apart with their sheets rather than lifting either
// one out: an object flying one way across two sheets moving the other reads
// as two motions fighting, not as one desk.
//
// This module is pure: nothing here reaches for a global it isn't handed. The
// document and window it needs are arguments (defaulted for callers in the
// browser), so every decision is testable.

import { flushSync } from 'react-dom'

// ── Moves ─────────────────────────────────────────────────────────────────

/**
 * How one sheet gives way to the next.
 *
 * - `next` / `prev` — a tab switch: the desk slides so the tab to the right
 *   (`next`) or left (`prev`) comes into view, both sheets moving together.
 * - `push` — deeper into the same tab: a new sheet is laid over the current
 *   one from the right, and the one underneath shades as it is covered.
 * - `pop` — back up: the top sheet is swiped off to the right, uncovering the
 *   one it was lying on.
 * - `turn` / `return` — within a page, a run of sheets (a quiz's questions):
 *   the top one is flicked off the pile, or slid back onto it.
 */
export type PaperMove = 'next' | 'prev' | 'push' | 'pop' | 'turn' | 'return'

/** Where a path lies on the desk: which tab, and how many sheets deep. */
export interface DeskPlace {
  /** Left-to-right position of the tab — the sidebar's order. */
  tab: number
  /** 0 for the tab's own page, one more per sheet laid on top of it. */
  depth: number
}

// The tabs, left to right, in the order the sidebar lists them — Dashboard,
// Study Guides, Flashcards, Quiz, Projects — then the pages the rest of the
// chrome opens. `depth` is how many sheets down the tab a page lies; `below` is
// the depth of a page *under* the prefix (`/wiki/exam/Exam P` under
// `/wiki/exam`), where that differs. The longest matching prefix wins, and a
// path none of them match is a tab of its own at the far end of the desk.
const DESK: { prefix: string; tab: number; depth: number; below?: number }[] = [
  { prefix: '/dashboard', tab: 0, depth: 0 },
  { prefix: '/wiki', tab: 1, depth: 0, below: 1 },
  { prefix: '/wiki/exam', tab: 1, depth: 1 },
  { prefix: '/wiki/concept', tab: 1, depth: 2 },
  // Resources is the Study Guides tab's second page, listed under it in the
  // sidebar beside the exams, so it lies beside them on the desk; a resource
  // page is a sheet over that shelf.
  { prefix: '/wiki/resources', tab: 1.2, depth: 0 },
  { prefix: '/wiki/resource', tab: 1.2, depth: 1 },
  { prefix: '/research', tab: 1.5, depth: 0, below: 1 },
  { prefix: '/flashcards', tab: 2, depth: 0 },
  { prefix: '/', tab: 3, depth: 0 },
  { prefix: '/quiz', tab: 3, depth: 1 },
  // Quiz Battle is opened from the Quiz tab's exam list, a sheet over it.
  { prefix: '/battle', tab: 3, depth: 1 },
  { prefix: '/review', tab: 3, depth: 2 },
  // The Projects tab; an attempt is a sheet laid over the list of briefs.
  { prefix: '/project', tab: 4, depth: 0, below: 1 },
  // The Store, listed after Projects; the gem shop is a sheet laid over it.
  { prefix: '/store', tab: 4.2, depth: 0, below: 1 },
  // Actuaria Online, under the sidebar's PLAY label after Projects. Its own
  // tabs, in the order its tab bar lists them (lib/actuaria/nav.ts), so an
  // in-world move slides the way the tabs read and never borrows the Quiz tab's
  // motion — `/actuaria/battle` is not `/battle`. The title screen lies where
  // the map does; a sector is a sheet over the map, the Simulation one over
  // Monte Carlo Station, a raid one over the Cohort.
  { prefix: '/actuaria', tab: 4.5, depth: 0, below: 1 },
  { prefix: '/actuaria/map', tab: 4.5, depth: 0 },
  { prefix: '/actuaria/sector', tab: 4.5, depth: 1 },
  { prefix: '/actuaria/battle', tab: 4.6, depth: 0 },
  { prefix: '/actuaria/simulation', tab: 4.6, depth: 1 },
  { prefix: '/actuaria/daily', tab: 4.7, depth: 0 },
  { prefix: '/actuaria/cohort', tab: 4.8, depth: 0 },
  { prefix: '/actuaria/raid', tab: 4.8, depth: 1 },
  { prefix: '/actuaria/hangar', tab: 4.9, depth: 0 },
  { prefix: '/search', tab: 5, depth: 0 },
  { prefix: '/upgrade', tab: 7, depth: 0 },
  { prefix: '/settings', tab: 8, depth: 0 },
  // Cowork's two places are two tabs of their own, and a source or a
  // deliverable opens as a sheet over its shelf.
  { prefix: '/cowork', tab: 9, depth: 0, below: 1 },
  { prefix: '/cowork/deliverables', tab: 10, depth: 0, below: 1 },
  { prefix: '/auth', tab: 11, depth: 0 },
]

const FAR_END = 100

function normalizePath(path: string): string {
  const bare = path.split(/[?#]/)[0] || '/'
  const trimmed = bare.length > 1 ? bare.replace(/\/+$/, '') : bare
  return trimmed || '/'
}

/** Where a path lies on the desk. */
export function deskPlace(path: string): DeskPlace {
  const p = normalizePath(path)
  let best: (typeof DESK)[number] | null = null
  let bestBelow = false
  for (const entry of DESK) {
    const exact = p === entry.prefix
    // `/` is only ever itself — every path would lie "under" it otherwise.
    const below = entry.prefix !== '/' && p.startsWith(`${entry.prefix}/`)
    if (!exact && !below) continue
    if (best && entry.prefix.length <= best.prefix.length) continue
    best = entry
    bestBelow = !exact
  }
  if (!best) return { tab: FAR_END, depth: 0 }
  return { tab: best.tab, depth: bestBelow ? best.below ?? best.depth : best.depth }
}

/** How the history moved — React Router's `Action`, as a string. */
export type HistoryAction = 'PUSH' | 'POP' | 'REPLACE'

/**
 * Which move takes the reader from `from` to `to`, or null when the change
 * isn't one to animate.
 *
 * - Only a change of *page* moves a sheet. A new query string or hash is the
 *   same sheet showing something else — the search page writes its query to
 *   the URL on every keystroke.
 * - A `REPLACE` is the app correcting where it is (a redirect, a sign-in
 *   bounce), not the reader going somewhere, so it lands at once.
 * - Between tabs the desk slides, whichever way the history moved: Back from
 *   the Quiz tab to the Dashboard slides the Dashboard in from the left, the
 *   same way clicking it would.
 * - Within a tab, Back (`delta < 0`) always swipes the top sheet away, and a
 *   link swipes it away too when it leads *up* the tab (the review screen's
 *   "back to the quiz builder"); any other link lays a sheet on top.
 */
export function paperMove(
  from: string,
  to: string,
  action: HistoryAction,
  delta?: number | null,
): PaperMove | null {
  if (action === 'REPLACE') return null
  if (normalizePath(from) === normalizePath(to)) return null
  const a = deskPlace(from)
  const b = deskPlace(to)
  if (a.tab !== b.tab) return b.tab > a.tab ? 'next' : 'prev'
  if (action === 'POP' && delta != null && delta !== 0) return delta < 0 ? 'pop' : 'push'
  return b.depth < a.depth ? 'pop' : 'push'
}

/** Does a move lay down, uncover or slide a whole page (as opposed to a sheet within one)? */
export function isPageMove(move: PaperMove): boolean {
  return move === 'next' || move === 'prev' || move === 'push' || move === 'pop'
}

// ── Running a transition ───────────────────────────────────────────────────

/** Does this browser have the View Transitions API? */
export function viewTransitionsSupported(doc: Document | null = globalThis.document ?? null): boolean {
  return typeof doc?.startViewTransition === 'function'
}

/** Has the reader asked for less motion? Then there is no transition to run. */
export function motionAllowed(win: Window | null = globalThis.window ?? null): boolean {
  if (typeof win?.matchMedia !== 'function') return true
  try {
    return !win.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return true
  }
}

/** Can a transition run here at all? */
export function canTransition(env: TransitionEnv = {}): boolean {
  const doc = env.doc === undefined ? globalThis.document ?? null : env.doc
  const win = env.win === undefined ? globalThis.window ?? null : env.win
  return viewTransitionsSupported(doc) && motionAllowed(win)
}

interface TransitionEnv {
  doc?: Document | null
  win?: Window | null
}

interface StartOptions extends TransitionEnv {
  /** The move to draw — written to `data-paper` on the root for `index.css`. */
  paper?: PaperMove
  /**
   * How far in from the left the page's sheet starts, in px — the width of
   * the sidebar beside it. The sheet is cut to it, so a sliding page never
   * drags a sidebar-shaped hole across the desk.
   */
  inset?: number
  /**
   * What to do instead when no transition runs, where that differs from
   * `update` — an update that has to `flushSync` inside a transition must not
   * when it is called straight from a render or an effect.
   */
  fallback?: () => void
}

/**
 * Where the page's sheet starts: the left edge of `<main>`, which is the
 * sidebar's width on a desktop and 0 on a phone, where the sidebar is a drawer.
 */
export function sheetInset(doc: Document | null = globalThis.document ?? null): number {
  const main = doc?.querySelector?.('main')
  return main ? main.getBoundingClientRect().left : 0
}

// The transition currently drawing, so the one that finishes last doesn't
// clear the move a newer one has just written.
let current: object | null = null

// Set while a transition's update runs. A move asked for in there — a page
// changing its screen as it mounts — is part of the page being laid down, not
// a move of its own: starting one would skip the move already drawing it.
let updating = false

/**
 * Run `update` inside a view transition where one is possible, and plainly
 * where it isn't. Never throws: a browser without the API, a reader who wants
 * no motion, and a transition the browser refuses are all the same outcome —
 * the update still happens, it just happens at once. So does one asked for
 * from inside another transition's update, which lands in that one's picture.
 */
export function startViewTransition(update: () => void, options: StartOptions = {}): void {
  const doc = options.doc === undefined ? globalThis.document ?? null : options.doc
  const plain = options.fallback ?? update
  if (updating || !canTransition({ doc, win: options.win })) {
    plain()
    return
  }
  const root = doc!.documentElement as HTMLElement | undefined
  try {
    if (root) {
      if (options.paper) root.dataset.paper = options.paper
      else delete root.dataset.paper
      root.style?.setProperty('--paper-inset', `${Math.max(0, Math.round(options.inset ?? 0))}px`)
    }
    const transition = doc!.startViewTransition(() => {
      updating = true
      try {
        update()
      } finally {
        updating = false
      }
    })
    current = transition
    const settle = () => {
      if (current !== transition) return
      current = null
      if (root) delete root.dataset.paper
    }
    // A transition the browser skips (another one started, the tab hid) still
    // applies the update; the rejections that says so are not errors to report.
    transition.ready?.catch(() => { /* skipped */ })
    transition.finished?.then(settle, settle)
  } catch {
    if (root) delete root.dataset.paper
    plain()
  }
}

/**
 * Draw a change of *screen* — one the address doesn't show — as the page move
 * it reads as. The Quiz tab's exam list and one exam's builder are both `/`,
 * and Quiz Battle's way in, its lobby and a battle are all `/battle`, so
 * `PaperRouter`, which watches addresses, never sees the reader go deeper.
 * The page does, and names the move: `push` into the deeper screen, `pop`
 * back out of it.
 *
 * `update` is a plain state update. It is flushed inside the transition, so
 * the "after" picture is the new screen, and runs as it is where no
 * transition can — which also makes this safe to call from an effect. Where
 * the arriving screen is scrolled to is the page's to set, in a layout effect,
 * so it holds with motion or without.
 */
export function moveScreen(move: PaperMove, update: () => void, env: TransitionEnv = {}): void {
  startViewTransition(() => flushSync(update), {
    ...env,
    paper: move,
    inset: isPageMove(move) ? sheetInset(env.doc) : 0,
    fallback: update,
  })
}
