// **What the Tutor knows about the screen** (docs/tutor.md §8). No page has to
// tell it anything: the route, the concept popup's open page, whether a quiz is
// running and whether the PDF reader is up are enough to say where the
// candidate is — and the bank is enough to say how often CAS has asked about
// the concept in front of them.

import { fromSlug, wikiRoute } from '../wikiRoutes'
import type { TutorItem } from './items'

export type TutorSurface =
  | 'concept'     // a concept's page, or the concept popup
  | 'exam'        // an exam's study guide
  | 'quiz'        // a quiz in progress — the Tutor is silent
  | 'battle'      // a Quiz Battle — silent
  | 'review'      // the review after a quiz
  | 'dashboard'
  | 'flashcards'
  | 'wiki'        // the rest of Study Guides
  | 'other'

export interface ScreenState {
  pathname: string
  /** The concept open in the popup, if a concept page is the one on screen there. */
  popupConcept: string | null
  quizInProgress: boolean
  pdfOpen: boolean
}

export interface TutorPlace {
  surface: TutorSurface
  /** The concept on screen, if any. */
  concept: string | null
  /** The exam page on screen, by file name, if any. */
  examPage: string | null
}

export function tutorPlace(screen: ScreenState): TutorPlace {
  const path = screen.pathname.length > 1 ? screen.pathname.replace(/\/+$/, '') : screen.pathname
  if (path === '/quiz' && screen.quizInProgress) return { surface: 'quiz', concept: null, examPage: null }
  if (path === '/battle') return { surface: 'battle', concept: null, examPage: null }
  if (screen.popupConcept) return { surface: 'concept', concept: screen.popupConcept, examPage: examPageOf(path) }
  const concept = path.match(/^\/wiki\/concept\/([^/]+)$/)
  if (concept) return { surface: 'concept', concept: fromSlug(concept[1]), examPage: null }
  const exam = examPageOf(path)
  if (exam) return { surface: 'exam', concept: null, examPage: exam }
  if (path === '/review') return { surface: 'review', concept: null, examPage: null }
  if (path === '/dashboard') return { surface: 'dashboard', concept: null, examPage: null }
  if (path === '/flashcards') return { surface: 'flashcards', concept: null, examPage: null }
  if (path === '/wiki' || path.startsWith('/wiki/')) return { surface: 'wiki', concept: null, examPage: null }
  return { surface: 'other', concept: null, examPage: null }
}

function examPageOf(path: string): string | null {
  const m = path.match(/^\/wiki\/exam\/([^/]+)$/)
  return m ? fromSlug(m[1]) : null
}

/**
 * Surfaces where the Tutor makes no offer at all: a quiz or a battle under way
 * (its own clock is running), or a document open in the reader.
 */
export function isQuietSurface(place: TutorPlace, screen: Pick<ScreenState, 'pdfOpen'>): boolean {
  return place.surface === 'quiz' || place.surface === 'battle' || screen.pdfOpen
}

export interface ExamHistory {
  /** Papers (sittings) with at least one part on the concept. */
  papers: number
  /** Papers in the bank. */
  totalPapers: number
  parts: number
  points: number
  /** The most recent sitting that asked about it. */
  latest: string | null
}

function sittingRank(sitting: string): number {
  const year = Number(sitting.match(/\d{4}/)?.[0] ?? 0)
  return year * 2 + (/fall/i.test(sitting) ? 1 : 0)
}

/**
 * How often the examiners have asked about a concept, counted from the papers
 * in the bank: the papers, the parts and the points. Questions the vault wrote
 * itself (no sitting) are not papers and don't count.
 */
export function examHistory(conceptItems: readonly TutorItem[], allItems: readonly TutorItem[]): ExamHistory {
  const papers = new Set<string>()
  let parts = 0
  let points = 0
  let latest: string | null = null
  for (const item of conceptItems) {
    if (!item.sitting) continue
    papers.add(item.sitting)
    parts++
    points += item.points
    if (!latest || sittingRank(item.sitting) > sittingRank(latest)) latest = item.sitting
  }
  const total = new Set(allItems.map(i => i.sitting).filter((s): s is string => !!s))
  return { papers: papers.size, totalPapers: total.size, parts, points: Math.round(points * 100) / 100, latest }
}

/**
 * Whether the page at `pathname` mounts the concept popup, so a page the Tutor
 * sends the candidate to read can open in place. Elsewhere it opens in the
 * exam's study guide, at that concept.
 */
export function hostsConceptPopup(pathname: string): boolean {
  return pathname === '/dashboard' || pathname === '/review' || pathname === '/flashcards'
    || pathname === '/wiki' || pathname.startsWith('/wiki/')
}

/** The exam's study guide, opened at a concept (`?concept=`). */
export function studyGuideHref(examPage: string, concept: string): string {
  return `${wikiRoute({ kind: 'exam', name: examPage })}?concept=${encodeURIComponent(concept)}`
}
