// Cross-tab **shared-element transitions**.
//
// An exam is the same object seen three ways: a card on the Quiz tab, a card
// on the Study Guides tab, and a pill on the Dashboard. Switching tabs used to
// cut between them, so the eye had to find the exam again on the other side.
// With the View Transitions API the browser tweens the one object between its
// two positions while everything *else* on the page cross-fades — which is
// exactly the reading of the change: the exam stayed, the page around it
// changed.
//
// The browser does all the work. Every surface only has to agree on a *name*
// per exam, which is what `examTransitionName` hands out — the same name on
// two sides of a navigation is what makes them one thing rather than two.
//
// This module is pure: nothing here reaches for a global. The document and
// window it needs are arguments (defaulted for callers in the browser), so the
// decisions — is a click ours to take, where does a link point, may we animate
// — are testable, and the one component that listens for clicks
// (`components/ViewTransitions.tsx`) stays thin.

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

/**
 * The style object to spread onto the element that *is* the exam — the same
 * shape as `examAccentStyle`, and usually spread beside it.
 */
export function examTransitionStyle(examKey: string, examId?: string | null): CSSProperties | undefined {
  const name = examTransitionName(examKey, examId)
  if (!name) return undefined
  return { viewTransitionName: name }
}

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

interface TransitionEnv {
  doc?: Document | null
  win?: Window | null
}

/**
 * Run `update` inside a view transition where one is possible, and plainly
 * where it isn't. Never throws: a browser without the API, a reader who wants
 * no motion, and a transition the browser refuses are all the same outcome —
 * the update still happens, it just happens at once.
 */
export function startViewTransition(update: () => void, env: TransitionEnv = {}): void {
  const doc = env.doc === undefined ? globalThis.document ?? null : env.doc
  const win = env.win === undefined ? globalThis.window ?? null : env.win
  if (!viewTransitionsSupported(doc) || !motionAllowed(win)) {
    update()
    return
  }
  try {
    const transition = doc!.startViewTransition(update)
    // A transition the browser skips (another one started, the tab hid) still
    // applies the update; the rejection is not an error to report.
    transition.finished?.catch(() => { /* skipped */ })
  } catch {
    update()
  }
}

/** The bits of a click this module cares about — a DOM MouseEvent satisfies it. */
export interface ClickLike {
  button?: number
  metaKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  defaultPrevented?: boolean
}

/**
 * A plain left click is the only one we take over. A middle click, a
 * modifier-held click and an already-handled click all mean the reader asked
 * for something other than "move me to that page" — a new tab, a download, a
 * menu — and the browser's own handling of them must survive untouched.
 */
export function isPlainLeftClick(e: ClickLike): boolean {
  if (e.defaultPrevented) return false
  if (e.button != null && e.button !== 0) return false
  return !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
}

/**
 * Where a link points, as a router path, or null when it isn't ours to route:
 * another origin, another protocol (`mailto:`), or an unparseable href.
 */
export function linkTargetPath(href: string | null | undefined, origin: string): string | null {
  if (!href) return null
  let url: URL
  try {
    url = new URL(href, origin)
  } catch {
    return null
  }
  if (url.origin !== origin) return null
  return `${url.pathname}${url.search}${url.hash}`
}

/**
 * Is this navigation worth animating? Only a move to somewhere else is —
 * re-clicking the tab you are on should do nothing at all rather than flash
 * the page through a cross-fade of itself.
 */
export function shouldTransitionTo(from: string, to: string): boolean {
  return from !== to
}
