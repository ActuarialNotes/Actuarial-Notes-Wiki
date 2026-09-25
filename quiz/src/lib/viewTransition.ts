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
// `components/PaperRouter.tsx` is what calls it for every navigation.
//
// One object is more than a sheet: an exam is the same thing seen three ways
// — a card on the Quiz tab, a card on Study Guides, a pill on the Dashboard —
// so on a tab switch it is lifted off one sheet and set down on the other
// while the sheets slide underneath. Every surface only has to agree on a
// *name* per exam, which is what `examTransitionName` hands out.
//
// This module is pure: nothing here reaches for a global it isn't handed. The
// document and window it needs are arguments (defaulted for callers in the
// browser), so every decision is testable.

import type { CSSProperties } from 'react'
import { LOCALIZED_EXAM_VARIANT_IDS } from '@/data/examSittings'

/**
 * A `view-transition-name` is a CSS custom-ident: it can't contain spaces or
 * punctuation, and it can't start with a digit. Exam keys are already close
 * (`P`, `FM`, `MAS-I`, `CAS-5`), but they are authored data, so anything that
 * isn't ident-safe is folded to a hyphen and the constant prefix keeps the
 * result from ever leading with a digit.
 */
const NAME_PREFIX = 'exam-card'

/**
 * The shared name for one exam. Every surface that draws that exam as a single
 * object — card or pill — puts this on its outermost element.
 *
 * Normally the exam's progress key is the whole identity: `P` is one exam and
 * one card per tab. A **localized** exam is the exception — `CAS-6` covers two
 * syllabus pages, Exam 6C and Exam 6U, and the Study Guides ladder lists both
 * while a candidate who has picked no variant yet gets a Dashboard pill for
 * each. Two live elements sharing a name aborts the *whole* transition, not
 * just theirs, so where the key is one of those the page's own exam id joins
 * the name. Only there: adding it everywhere would stop `P` on the Quiz tab
 * (progress key `P`) matching `P` on Study Guides (exam id `P-1`).
 *
 * Returns undefined for a key with nothing ident-safe in it, so a caller
 * spreads "no name" rather than a constant two exams would collide on.
 *
 * @param examKey  the exam's progress key — `P`, `FM`, `MAS-I`, `CAS-5`
 * @param examId   the wiki exam id of the page this element stands for, where
 *                 the surface knows it — `6C`, `6U`
 */
export function examTransitionName(examKey: string, examId?: string | null): string | undefined {
  const parts = [examKey]
  if (examId && LOCALIZED_EXAM_VARIANT_IDS[examKey]) parts.push(examId)
  const cleaned = parts
    .join('-')
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (!cleaned) return undefined
  return `${NAME_PREFIX}-${cleaned}`
}

/** The custom property an exam's name is carried in until a tab switch uses it. */
export const EXAM_NAME_PROPERTY = '--exam-card-name'

/**
 * The style object to spread onto the element that *is* the exam — the same
 * shape as `examAccentStyle`, and usually spread beside it.
 *
 * It carries the name in a custom property rather than as the element's
 * `view-transition-name`, and `index.css` promotes it only while a move
 * between two exam pages runs (`carriesExams`). Named all the time, an exam card with no partner on the
 * other side of a navigation — every card when you open an exam's page — is
 * lifted out of its sheet and floats above the one sliding in over it.
 */
export function examTransitionStyle(examKey: string, examId?: string | null): CSSProperties | undefined {
  const name = examTransitionName(examKey, examId)
  if (!name) return undefined
  return { [EXAM_NAME_PROPERTY]: name } as CSSProperties
}

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
// Study Guides, Flashcards, Quiz — then the pages the rest of the chrome opens.
// `depth` is how many sheets down the tab a page lies; `below` is the depth of
// a page *under* the prefix (`/wiki/exam/Exam P` under `/wiki/exam`), where
// that differs. The longest matching prefix wins, and a path none of them
// match is a tab of its own at the far end of the desk.
const DESK: { prefix: string; tab: number; depth: number; below?: number }[] = [
  { prefix: '/dashboard', tab: 0, depth: 0 },
  { prefix: '/wiki', tab: 1, depth: 0, below: 1 },
  { prefix: '/wiki/exam', tab: 1, depth: 1 },
  { prefix: '/wiki/concept', tab: 1, depth: 2 },
  { prefix: '/wiki/resource', tab: 1, depth: 2 },
  { prefix: '/research', tab: 1.5, depth: 0, below: 1 },
  { prefix: '/flashcards', tab: 2, depth: 0 },
  { prefix: '/', tab: 3, depth: 0 },
  { prefix: '/quiz', tab: 3, depth: 1 },
  { prefix: '/review', tab: 3, depth: 2 },
  { prefix: '/search', tab: 4, depth: 0 },
  { prefix: '/store', tab: 5, depth: 0 },
  { prefix: '/upgrade', tab: 6, depth: 0 },
  { prefix: '/settings', tab: 7, depth: 0 },
  // Cowork's two places are two tabs of their own, and a source or a
  // deliverable opens as a sheet over its shelf.
  { prefix: '/cowork', tab: 8, depth: 0, below: 1 },
  { prefix: '/cowork/deliverables', tab: 9, depth: 0, below: 1 },
  { prefix: '/auth', tab: 10, depth: 0 },
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

// The pages that draw every exam as one object — a pill on the Dashboard, a
// card on the Study Guides and Quiz tabs.
const EXAM_SURFACES = new Set(['/dashboard', '/wiki', '/'])

/**
 * Is there an exam to carry across this move? Only between two pages that
 * both draw the exams: from Study Guides to Flashcards there is nothing on the
 * far side to set a card down on, and a card lifted anyway hangs over the
 * incoming sheet while it fades.
 */
export function carriesExams(from: string, to: string): boolean {
  return EXAM_SURFACES.has(normalizePath(from)) && EXAM_SURFACES.has(normalizePath(to))
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
  /** Carry the exams across — `data-paper-carry` on the root (see `carriesExams`). */
  carry?: boolean
  /**
   * What to do instead when no transition runs, where that differs from
   * `update` — an update that has to `flushSync` inside a transition must not
   * when it is called straight from a render or an effect.
   */
  fallback?: () => void
}

// The transition currently drawing, so the one that finishes last doesn't
// clear the move a newer one has just written.
let current: object | null = null

/**
 * Run `update` inside a view transition where one is possible, and plainly
 * where it isn't. Never throws: a browser without the API, a reader who wants
 * no motion, and a transition the browser refuses are all the same outcome —
 * the update still happens, it just happens at once.
 */
export function startViewTransition(update: () => void, options: StartOptions = {}): void {
  const doc = options.doc === undefined ? globalThis.document ?? null : options.doc
  const plain = options.fallback ?? update
  if (!canTransition({ doc, win: options.win })) {
    plain()
    return
  }
  const root = doc!.documentElement as HTMLElement | undefined
  try {
    if (root) {
      if (options.paper) root.dataset.paper = options.paper
      else delete root.dataset.paper
      if (options.carry) root.dataset.paperCarry = ''
      else delete root.dataset.paperCarry
      root.style?.setProperty('--paper-inset', `${Math.max(0, Math.round(options.inset ?? 0))}px`)
    }
    const transition = doc!.startViewTransition(update)
    current = transition
    const settle = () => {
      if (current !== transition) return
      current = null
      if (root) {
        delete root.dataset.paper
        delete root.dataset.paperCarry
      }
    }
    // A transition the browser skips (another one started, the tab hid) still
    // applies the update; the rejections that says so are not errors to report.
    transition.ready?.catch(() => { /* skipped */ })
    transition.finished?.then(settle, settle)
  } catch {
    if (root) {
      delete root.dataset.paper
      delete root.dataset.paperCarry
    }
    plain()
  }
}
