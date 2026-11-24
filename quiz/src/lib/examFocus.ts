// The **exam in focus** (docs/redesign-spec.md §6): the one exam every place
// opens on, and the rules of the switcher that changes it. Pure; the stored
// half is `contexts/ExamProgressContext.tsx`, the hook `hooks/useExamInFocus.ts`
// and the screens `components/switcher/`.
//
// The rules, in one place:
//   - The exam in focus is always one of the reader's exams (an `in_progress`
//     row whose page the vault has). It is the one last used; with nothing
//     stored, or a stored exam the reader no longer has, it is the exam with
//     the nearest date, then the first on the list (R7).
//   - An address that names one of the reader's exams makes it the exam in
//     focus. An address that names any other exam is a visit: the page opens,
//     and the focus stays where it was.
//   - A signed-in account's choice is kept with the account and mirrored in
//     the browser; the account's value wins when the app loads.
//   - Sittings offered are rows of the published table, never made up.

import {
  EXAM_SITTINGS,
  LOCALIZED_EXAM_VARIANT_IDS,
  MAX_EXAM_WINDOW_DAYS,
  formatSittingDate,
  matchesSelectedVariant,
  type ExamSitting,
} from '../data/examSittings'
import type { ItemStatus, Track } from '../data/tracks'
import type { GuideBody } from './bodyFilter'
import { CAS_TRACK_KEYS, CIA_TRACK_KEYS, SOA_TRACK_KEYS } from './bodyFilter'
import { examStatus, type ExamStatus } from './examStatus'
import { wikiExamIdToProgressKey } from './wikiParser'

/** What the rules need of an exam page: `WikiExamSyllabus` has all of it. */
export interface ExamPage {
  /** The page's own id: `P-1`, `6C`, `MAS-I`. */
  examId: string
  examLabel: string
  examTopic: string
  fileName?: string
}

/** Where the choice is mirrored in the browser. The key Today has always used. */
export const EXAM_FOCUS_KEY = 'quiz.dashboard.activeExamId'
/** The key on the account's `user_metadata`. */
export const EXAM_FOCUS_METADATA = 'exam_in_focus'

const DAY_MS = 86_400_000

function isoDay(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Whole days from `today` to an ISO date; negative once it has passed. */
export function daysUntil(date: string, today: Date): number {
  return Math.round((Date.parse(`${date}T12:00:00`) - Date.parse(`${isoDay(today)}T12:00:00`)) / DAY_MS)
}

// ── The stored choice ────────────────────────────────────────────────────────

/** Narrow a stored value (localStorage, account metadata) to an exam id, or null. */
export function parseStoredFocus(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const id = value.trim()
  return id.length > 0 && id.length <= 40 && /^[A-Za-z0-9-]+$/.test(id) ? id : null
}

/** The choice a device opens on: the account's when it has one, else the browser's. */
export function focusOnLoad(account: unknown, browser: unknown): string | null {
  return parseStoredFocus(account) ?? parseStoredFocus(browser)
}

// ── The reader's exams ───────────────────────────────────────────────────────

/** The exams the reader is studying that the vault has a page for, in page order. */
export function readerExams<T extends ExamPage>(
  pages: readonly T[],
  progress: Record<string, string>,
  variants: Record<string, string | null>,
): T[] {
  return pages.filter(p => {
    const key = wikiExamIdToProgressKey(p.examId)
    return progress[key] === 'in_progress' && matchesSelectedVariant(key, p.examId, variants[key])
  })
}

/** The reader's exam with the nearest date still to come, or null when none has one. */
export function nearestSittingExam<T extends ExamPage>(
  exams: readonly T[],
  targetDates: Record<string, string | null>,
  today: Date,
): T | null {
  let best: T | null = null
  let bestDays = Infinity
  for (const exam of exams) {
    const date = targetDates[wikiExamIdToProgressKey(exam.examId)]
    if (!date) continue
    const days = daysUntil(date, today)
    if (days >= 0 && days < bestDays) {
      best = exam
      bestDays = days
    }
  }
  return best
}

/**
 * The exam in focus. `stored` is the last exam used, as a page id (`6C`) or,
 * from an older build, an exam_progress key (`CAS-6`).
 */
export function resolveFocus<T extends ExamPage>(
  stored: string | null,
  exams: readonly T[],
  targetDates: Record<string, string | null>,
  today: Date,
): T | null {
  if (exams.length === 0) return null
  if (stored) {
    const found = exams.find(e => e.examId === stored)
      ?? exams.find(e => wikiExamIdToProgressKey(e.examId) === stored)
    if (found) return found
  }
  return nearestSittingExam(exams, targetDates, today) ?? exams[0]
}

/**
 * What an address naming an exam page does to the focus: the page's id when
 * it is one of the reader's exams, null (a visit; the focus stays) otherwise.
 */
export function addressFocus(pageId: string, exams: readonly ExamPage[]): string | null {
  return exams.some(e => e.examId === pageId) ? pageId : null
}

/**
 * Where choosing an exam in the switcher takes a page whose address names an
 * exam, or null when the page follows the focus by itself.
 *
 * An address that names an exam wins over the focus, so on such a page the
 * choice has to move the address too, or the page would put its own exam
 * straight back in focus: an exam's study guide goes to the chosen exam's
 * guide (`examPath`), and Practice opened on `?topic=` drops the topic and
 * shows the exam in focus.
 */
export function switchDestination(
  location: { pathname: string; search: string },
  examPath: string | null,
): { to: string; replace: boolean } | null {
  const { pathname, search } = location
  if (pathname.startsWith('/wiki/exam/')) {
    if (!examPath || examPath === pathname) return null
    return { to: examPath, replace: false }
  }
  if (pathname === '/' || pathname === '/papers') {
    const params = new URLSearchParams(search)
    if (!params.has('topic')) return null
    params.delete('topic')
    const rest = params.toString()
    return { to: rest ? `${pathname}?${rest}` : pathname, replace: true }
  }
  return null
}

/** The regional variant a page stands for: `CAS-6`, `6C` → `CA`. Null for an exam with none. */
export function variantForPage(key: string, pageId: string): string | null {
  const map = LOCALIZED_EXAM_VARIANT_IDS[key]
  if (!map) return null
  return Object.keys(map).find(v => map[v] === pageId) ?? null
}

// ── The sheet ────────────────────────────────────────────────────────────────

export interface SwitcherRow {
  examId: string
  key: string
  label: string
  /** Days to the reader's date; null with no date, or once it has passed. */
  daysLeft: number | null
  /** Syllabus covered, 0 to 100. */
  pct: number
  current: boolean
}

/** The sheet's rows: the reader's exams, the soonest first, the one in focus checked. */
export function switcherRows(
  exams: readonly ExamPage[],
  focusId: string | null,
  targetDates: Record<string, string | null>,
  pctByKey: Record<string, number>,
  today: Date,
): SwitcherRow[] {
  const rows = exams.map(exam => {
    const key = wikiExamIdToProgressKey(exam.examId)
    const date = targetDates[key]
    const days = date ? daysUntil(date, today) : null
    return {
      examId: exam.examId,
      key,
      label: exam.examLabel,
      daysLeft: days !== null && days >= 0 ? days : null,
      pct: Math.max(0, Math.min(100, Math.round(pctByKey[key] ?? 0))),
      current: exam.examId === focusId,
    }
  })
  // Soonest first; an exam with no date to come keeps its place after them.
  const order = (row: SwitcherRow) => row.daysLeft ?? Infinity
  return rows
    .map((row, i) => ({ row, i }))
    .sort((a, b) => order(a.row) - order(b.row) || a.i - b.i)
    .map(({ row }) => row)
}

/** "52 days", "1 day", "Today". */
export function daysLeftLabel(days: number): string {
  if (days === 0) return 'Today'
  return `${days} ${days === 1 ? 'day' : 'days'}`
}

// ── When is your exam? ───────────────────────────────────────────────────────

export interface SittingOption {
  /** The row's identity: its start date. */
  id: string
  /** The row's dates as published: "Jan 14–25, 2027". */
  label: string
  /** The date recorded for the reader: the window's first day still to come. */
  date: string
  daysAway: number
}

function windowDays(s: ExamSitting): number {
  if (!s.endDate) return 1
  return Math.round((Date.parse(`${s.endDate}T00:00:00Z`) - Date.parse(`${s.startDate}T00:00:00Z`)) / DAY_MS) + 1
}

/**
 * The next sittings of an exam, from the published table: at most `limit`,
 * soonest first, one per start date (Exam P's paper day opens its CBT window;
 * the window is the row kept). A row longer than a sitting's window is a
 * registration span, not a sitting, and is left out. An exam with no row to
 * come gets an empty list, and the screen then offers only "Another date" and
 * "Not sure yet".
 */
export function offeredSittings(
  key: string,
  today: Date,
  sittings: readonly ExamSitting[] = EXAM_SITTINGS,
  limit = 3,
): SittingOption[] {
  const todayISO = isoDay(today)
  const byStart = new Map<string, ExamSitting>()
  for (const s of sittings) {
    if (s.examId !== key) continue
    if ((s.endDate ?? s.startDate) < todayISO) continue
    if (windowDays(s) > MAX_EXAM_WINDOW_DAYS) continue
    const kept = byStart.get(s.startDate)
    if (!kept || windowDays(s) > windowDays(kept)) byStart.set(s.startDate, s)
  }
  return [...byStart.values()]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit)
    .map(s => {
      const date = s.startDate >= todayISO ? s.startDate : todayISO
      return { id: s.startDate, label: formatSittingDate(s), date, daysAway: daysUntil(date, today) }
    })
}

/** "52 days away", "Tomorrow", "Open now". */
export function daysAwayLabel(days: number): string {
  if (days <= 0) return 'Open now'
  if (days === 1) return 'Tomorrow'
  return `${days} days away`
}

/** Whether a date typed under "Another date" can be the reader's: a real day, today or later. */
export function isUsableExamDate(value: string, today: Date): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const t = Date.parse(`${value}T12:00:00`)
  if (Number.isNaN(t) || isoDay(new Date(t)) !== value) return false
  return daysUntil(value, today) >= 0
}

// ── Add an exam ──────────────────────────────────────────────────────────────

export interface AddExamRow {
  examId: string
  key: string
  /** "Exam P-1", "DISC-DA". */
  name: string
  topic: string
  fileName: string
  status: ExamStatus
  /** One of the reader's exams already. */
  added: boolean
  /** Marked as passed. */
  passed: boolean
}

export interface AddExamSection {
  /** The credential: "ASA", "ACAS". */
  track: string
  /** Ready and beta exams, in the order of the credential. */
  rows: AddExamRow[]
  /** In-development exams, folded under one row. */
  development: AddExamRow[]
}

const BODY_TRACKS: Record<GuideBody, ReadonlySet<string>> = {
  SOA: SOA_TRACK_KEYS,
  CAS: CAS_TRACK_KEYS,
  CIA: CIA_TRACK_KEYS,
}

const TRACK_ORDER = ['ASA', 'FSA', 'ACAS', 'FCAS', 'ACIA', 'FCIA']

/**
 * The Add an exam screen for one body: each credential's exams that can be
 * studied (ready and beta) as rows, and its in-development ones folded. An
 * exam is listed once per body, under the first credential that requires it;
 * a section a credential only repeats (the FCAS's ACAS requirements) is left
 * to the credential it belongs to.
 */
export function addExamSections(
  body: GuideBody,
  tracks: readonly Track[],
  pages: readonly ExamPage[],
  progress: Record<string, string>,
  variants: Record<string, string | null>,
  displayName: (page: ExamPage) => string,
): AddExamSection[] {
  const pagesByKey = new Map<string, ExamPage[]>()
  for (const page of pages) {
    const key = wikiExamIdToProgressKey(page.examId)
    pagesByKey.set(key, [...(pagesByKey.get(key) ?? []), page])
  }
  const seen = new Set<string>()
  const sections: AddExamSection[] = []
  for (const trackKey of TRACK_ORDER) {
    if (!BODY_TRACKS[body].has(trackKey)) continue
    const track = tracks.find(t => t.key === trackKey)
    if (!track) continue
    const section: AddExamSection = { track: track.key, rows: [], development: [] }
    for (const part of track.sections) {
      if (part.collapsed) continue
      for (const item of part.items) {
        if (seen.has(item.id)) continue
        seen.add(item.id)
        for (const page of pagesByKey.get(item.id) ?? []) {
          const status = examStatus(item.id, page.examId)
          const mine = matchesSelectedVariant(item.id, page.examId, variants[item.id])
            && (LOCALIZED_EXAM_VARIANT_IDS[item.id] ? variants[item.id] != null : true)
          const state = progress[item.id] as ItemStatus | undefined
          const row: AddExamRow = {
            examId: page.examId,
            key: item.id,
            name: displayName(page),
            topic: page.examTopic,
            fileName: page.fileName ?? '',
            status,
            added: mine && state === 'in_progress',
            passed: mine && state === 'completed',
          }
          if (status === 'development') section.development.push(row)
          else section.rows.push(row)
        }
      }
    }
    if (section.rows.length > 0 || section.development.length > 0) sections.push(section)
  }
  return sections
}

/** The body the Add an exam screen opens on: the stored choice, else the reader's track's. */
export function addExamBody(stored: GuideBody | null, selectedTrack: string): GuideBody {
  if (stored) return stored
  if (CIA_TRACK_KEYS.has(selectedTrack)) return 'CIA'
  return CAS_TRACK_KEYS.has(selectedTrack) ? 'CAS' : 'SOA'
}

// ── A visitor's exams ────────────────────────────────────────────────────────

/** A visitor's exam, as the browser keeps it: the columns of an `exam_progress` row it needs. */
export interface BrowserExamRow {
  exam_id: string
  status: ItemStatus
  target_date: string | null
  /** The regional variant, for an exam sat under a syllabus per region. */
  variant?: string | null
}

export const BROWSER_EXAMS_KEY = 'quiz.browserExams'

const STATUSES: ReadonlySet<string> = new Set(['not_started', 'in_progress', 'completed'])

/** Read the browser's exam list out of whatever was stored; anything malformed is dropped. */
export function parseBrowserExams(raw: string | null | undefined): BrowserExamRow[] {
  if (!raw) return []
  let data: unknown
  try { data = JSON.parse(raw) } catch { return [] }
  if (!Array.isArray(data)) return []
  const out: BrowserExamRow[] = []
  const seen = new Set<string>()
  for (const item of data) {
    if (!item || typeof item !== 'object') continue
    const r = item as Record<string, unknown>
    const id = parseStoredFocus(r.exam_id)
    if (!id || seen.has(id) || typeof r.status !== 'string' || !STATUSES.has(r.status)) continue
    seen.add(id)
    const date = typeof r.target_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.target_date) ? r.target_date : null
    const variant = typeof r.variant === 'string' && /^[A-Z]{1,4}$/.test(r.variant) ? r.variant : null
    out.push({ exam_id: id, status: r.status as ItemStatus, target_date: date, variant })
  }
  return out
}

/**
 * What signing in adds to the account from the browser: the exams the visitor
 * added that the account has no row for. The account's own rows win.
 */
export function browserExamsToMerge(
  browser: readonly BrowserExamRow[],
  accountExamIds: ReadonlySet<string>,
): BrowserExamRow[] {
  return browser.filter(r => r.status !== 'not_started' && !accountExamIds.has(r.exam_id))
}
