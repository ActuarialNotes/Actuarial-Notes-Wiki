// **Today's session**: the one card of work on Today, as data
// (docs/redesign-spec.md §4.2, §4.3).
//
// A session is sized by time. The reader picks 10, 25, 45 or 120 minutes; that
// many minutes at the exam's own pace is a number of questions, and the
// questions are shared between up to three steps in the order they are done:
//
//   Fix mistakes   questions missed and not yet answered right, oldest first
//   Learn          concepts still New
//   Review         concepts studied before
//
// A paid plan's Learn and Review come from today's study plan; a free reader's
// Learn is the next New concepts in syllabus order and Review the concepts
// closest to stepping down a level. What doesn't fit stays outstanding and is
// offered again tomorrow, or today by "Keep going".
//
// The session is **frozen for the day** once it is built (`StoredSession`):
// learning a concept makes it no longer New, and a list rebuilt from the
// record would then never finish. Everything shown is that frozen list read
// against what has happened since (`readSession`).
//
// Pure and tested (`todaySession.test.ts`). The hook that feeds it is
// `hooks/useTodaySession.ts`; the card is `components/today/SessionCard.tsx`.

import {
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
  type MasteryState,
} from './mastery'
import { secondsPerUnit, type ExamPace } from './quizTiming'

// ── Length ───────────────────────────────────────────────────────────────────

export const SESSION_LENGTHS = [10, 25, 45, 120] as const
export type SessionLength = (typeof SESSION_LENGTHS)[number]
export const DEFAULT_SESSION_LENGTH: SessionLength = 25
/** The length "Keep going" adds once today's session is finished. */
export const KEEP_GOING_LENGTH: SessionLength = 10

export function isSessionLength(value: unknown): value is SessionLength {
  return typeof value === 'number' && (SESSION_LENGTHS as readonly number[]).includes(value)
}

/**
 * The reader's session length: one setting for every exam (R9), with a choice
 * made for today alone standing over it until the day ends.
 */
export interface StoredLength {
  /** "Use this every day". */
  everyDay: SessionLength
  /** A length picked without "Use this every day": that day only. */
  today?: { day: string; minutes: SessionLength }
}

export function lengthFromStored(raw: unknown): StoredLength {
  const v = (raw && typeof raw === 'object' ? raw : {}) as Partial<StoredLength>
  const everyDay = isSessionLength(v.everyDay) ? v.everyDay : DEFAULT_SESSION_LENGTH
  const today = v.today && typeof v.today.day === 'string' && isSessionLength(v.today.minutes)
    ? { day: v.today.day, minutes: v.today.minutes }
    : undefined
  return today ? { everyDay, today } : { everyDay }
}

export function lengthFor(stored: StoredLength, day: string): SessionLength {
  return stored.today && stored.today.day === day ? stored.today.minutes : stored.everyDay
}

export function withLength(stored: StoredLength, minutes: SessionLength, day: string, everyDay: boolean): StoredLength {
  return everyDay ? { everyDay: minutes } : { everyDay: stored.everyDay, today: { day, minutes } }
}

// ── Budget ───────────────────────────────────────────────────────────────────

/**
 * Seconds a question is budgeted when the exam has no pace on file. A default,
 * not a transcribed figure: it sizes a session and is never shown as the
 * exam's pace. Five minutes is near the middle of the per-question paces in
 * `EXAM_PACE` (5:00 to 6:11, the DISCs' 1:20 aside).
 */
export const DEFAULT_SECONDS_PER_QUESTION = 300

/**
 * Seconds one question is budgeted at the exam's pace.
 *
 * - Paced by the question: the exam's own figure.
 * - Paced by the point: the exam's seconds per point times the points an
 *   average question of its bank carries (`averagePoints`), so a session of a
 *   written exam is still a whole number of questions.
 * - No pace on file: `DEFAULT_SECONDS_PER_QUESTION`.
 */
export function secondsPerQuestion(pace: ExamPace | null, averagePoints: number | null = null): number {
  if (!pace) return DEFAULT_SECONDS_PER_QUESTION
  if (pace.per === 'question') return secondsPerUnit(pace)
  const points = averagePoints && averagePoints > 0
    ? averagePoints
    : pace.questions ? pace.units / pace.questions : 1
  return secondsPerUnit(pace) * points
}

/** Questions `minutes` hold at that pace: the nearest whole number, never none. */
export function sessionBudget(minutes: number, secondsEach: number): number {
  if (!(secondsEach > 0)) return 1
  return Math.max(1, Math.round((minutes * 60) / secondsEach))
}

// ── The split ────────────────────────────────────────────────────────────────

export type SessionStepKind = 'fix' | 'learn' | 'review'
export const SESSION_STEP_ORDER: readonly SessionStepKind[] = ['fix', 'learn', 'review']

export type SessionCounts = Record<SessionStepKind, number>

/**
 * Shares a budget of `n` questions between the steps (confirmed 2026-11-23):
 *
 * 1. Fix gets a third of `n`, rounded.
 * 2. Learn gets a third of what is left, rounded.
 * 3. Review gets the rest.
 * 4. Every step with work waiting gets at least one question when `n` is at
 *    least the number of such steps (taken from the largest share).
 * 5. A share a step can't fill goes to Review, then Fix, then Learn.
 *
 * So no step takes the whole budget while another has work waiting, and the
 * budget is spent in full whenever there is that much work.
 */
export function splitSession(n: number, supply: SessionCounts): SessionCounts {
  const budget = Math.max(0, Math.floor(n))
  const want: SessionCounts = { fix: Math.round(budget / 3), learn: 0, review: 0 }
  const rest = budget - want.fix
  want.learn = Math.round(rest / 3)
  want.review = rest - want.learn

  const waiting = SESSION_STEP_ORDER.filter(k => supply[k] > 0)
  if (budget >= waiting.length) {
    for (const kind of waiting) {
      if (want[kind] > 0) continue
      const donor = (['review', 'fix', 'learn'] as const)
        .filter(k => want[k] > 1)
        .sort((a, b) => want[b] - want[a])[0]
      if (!donor) break
      want[donor] -= 1
      want[kind] = 1
    }
  }

  const take: SessionCounts = {
    fix: Math.min(want.fix, supply.fix),
    learn: Math.min(want.learn, supply.learn),
    review: Math.min(want.review, supply.review),
  }
  let left = budget - take.fix - take.learn - take.review
  for (const kind of ['review', 'fix', 'learn'] as const) {
    if (left <= 0) break
    const more = Math.min(left, supply[kind] - take[kind])
    take[kind] += more
    left -= more
  }
  return take
}

// ── What a free session draws from ───────────────────────────────────────────

export interface ConceptStanding {
  name: string
  /** The state today, decay applied. */
  state: MasteryState
  /** When it was last answered right, ISO; null if never. */
  lastCorrectAt: string | null
}

const DECAY_DAYS: Partial<Record<MasteryState, number>> = {
  level1: DECAY_DAYS_LEVEL1,
  level2: DECAY_DAYS_LEVEL2,
  level3: DECAY_DAYS_LEVEL3,
}

/**
 * A free reader's Review: the concepts closest to stepping down a level,
 * soonest first. A Forgotten concept has already stepped down and leads; one
 * answered right today is left out.
 */
export function reviewCandidates(concepts: readonly ConceptStanding[], now: Date, today: string, dayOf: (iso: string) => string): string[] {
  const ranked: { name: string; due: number }[] = []
  for (const c of concepts) {
    if (c.state === 'new') continue
    if (c.lastCorrectAt && dayOf(c.lastCorrectAt) === today) continue
    if (c.state === 'forgotten') {
      ranked.push({ name: c.name, due: -Infinity })
      continue
    }
    const window = DECAY_DAYS[c.state]
    if (!window || !c.lastCorrectAt) continue
    const age = (now.getTime() - new Date(c.lastCorrectAt).getTime()) / 86_400_000
    ranked.push({ name: c.name, due: window - age })
  }
  // Array.sort is stable: concepts equally due stay in syllabus order.
  return ranked.sort((a, b) => a.due - b.due).map(r => r.name)
}

/** A free reader's Learn: the concepts still New, in the order given (syllabus order). */
export function learnCandidates(concepts: readonly ConceptStanding[]): string[] {
  return concepts.filter(c => c.state === 'new').map(c => c.name)
}

// ── Building and freezing ────────────────────────────────────────────────────

export interface SessionSupply {
  /** Outstanding missed question ids, oldest first. */
  mistakes: readonly string[]
  /** Concepts to learn, in the order they are introduced. */
  learn: readonly string[]
  /** Concepts to review, most pressing first. */
  review: readonly string[]
}

/** One day's session for one exam, as kept in the browser. */
export interface StoredSession {
  day: string
  minutes: SessionLength
  /** Missed question ids to fix. */
  fix: string[]
  /** Outstanding misses when it was built: the "of 15" beside Fix. */
  fixOf: number
  learn: string[]
  review: string[]
}

function unique(names: readonly string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const name of names) {
    const key = name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(name)
  }
  return out
}

/** The counts a budget of `n` questions takes from a supply. */
export function sessionCounts(n: number, supply: SessionSupply): SessionCounts {
  const learn = unique(supply.learn)
  const learnKeys = new Set(learn.map(c => c.toLowerCase()))
  const review = unique(supply.review).filter(c => !learnKeys.has(c.toLowerCase()))
  return splitSession(n, { fix: supply.mistakes.length, learn: learn.length, review: review.length })
}

export function buildSession(day: string, minutes: SessionLength, n: number, supply: SessionSupply): StoredSession {
  const learn = unique(supply.learn)
  const learnKeys = new Set(learn.map(c => c.toLowerCase()))
  const review = unique(supply.review).filter(c => !learnKeys.has(c.toLowerCase()))
  const counts = splitSession(n, { fix: supply.mistakes.length, learn: learn.length, review: review.length })
  return {
    day,
    minutes,
    fix: supply.mistakes.slice(0, counts.fix),
    fixOf: supply.mistakes.length,
    learn: learn.slice(0, counts.learn),
    review: review.slice(0, counts.review),
  }
}

export function sessionIsEmpty(session: StoredSession): boolean {
  return session.fix.length + session.learn.length + session.review.length === 0
}

export function sessionFromStored(raw: unknown): StoredSession | null {
  if (!raw || typeof raw !== 'object') return null
  const v = raw as Partial<StoredSession>
  const strings = (x: unknown): x is string[] => Array.isArray(x) && x.every(s => typeof s === 'string')
  if (typeof v.day !== 'string' || !isSessionLength(v.minutes)) return null
  if (!strings(v.fix) || !strings(v.learn) || !strings(v.review)) return null
  const fixOf = typeof v.fixOf === 'number' && v.fixOf >= v.fix.length ? v.fixOf : v.fix.length
  return { day: v.day, minutes: v.minutes, fix: v.fix, fixOf, learn: v.learn, review: v.review }
}

/** Whether a kept session is still the one to show: today's, at the chosen length. */
export function sessionIsCurrent(session: StoredSession | null, day: string, minutes: SessionLength): session is StoredSession {
  return !!session && session.day === day && session.minutes === minutes
}

// ── Reading a session against the day ────────────────────────────────────────

export interface SessionFacts {
  /** A missed question is still outstanding (not answered right since). */
  isOutstanding: (questionId: string) => boolean
  /** A question was answered today. */
  answeredToday: (questionId: string) => boolean
  /** A question on this concept was answered today. */
  conceptAttempted: (name: string) => boolean
  /** The concept was answered right today. */
  conceptAchieved: (name: string) => boolean
  /** The concept most likely behind a missed question, for its row; null if none. */
  conceptOfMistake: (questionId: string) => string | null
}

export interface SessionItem {
  /** A concept's name, or a missed question's id. */
  key: string
  /** The concept this row names and opens; null for a miss with no one concept behind it. */
  concept: string | null
  /** Tried today, right or wrong. */
  attempted: boolean
  /** Fixed, learned or reviewed. */
  achieved: boolean
}

export interface SessionStep {
  kind: SessionStepKind
  items: SessionItem[]
  /** How many are in the step. */
  count: number
  /** Fix only: every miss waiting when the session was built, when more than fit. */
  of: number | null
  attempted: number
  achieved: number
  /** Every item has been tried today. */
  finished: boolean
}

export interface SessionView {
  minutes: SessionLength
  /** Steps with something in them, in the order they are done. */
  steps: SessionStep[]
  questions: number
  /** Something has been tried. */
  started: boolean
  /** Everything has been tried: the card's Done state. */
  finished: boolean
}

export function readSession(session: StoredSession, facts: SessionFacts): SessionView {
  const steps: SessionStep[] = []

  const push = (kind: SessionStepKind, items: SessionItem[], of: number | null) => {
    if (items.length === 0) return
    const attempted = items.filter(i => i.attempted).length
    steps.push({
      kind,
      items,
      count: items.length,
      of,
      attempted,
      achieved: items.filter(i => i.achieved).length,
      finished: attempted === items.length,
    })
  }

  push('fix', session.fix.map(id => {
    const achieved = !facts.isOutstanding(id)
    return { key: id, concept: facts.conceptOfMistake(id), attempted: achieved || facts.answeredToday(id), achieved }
  }), session.fixOf > session.fix.length ? session.fixOf : null)

  const conceptItems = (names: string[]) => names.map(name => {
    const achieved = facts.conceptAchieved(name)
    return { key: name, concept: name, attempted: achieved || facts.conceptAttempted(name), achieved }
  })
  push('learn', conceptItems(session.learn), null)
  push('review', conceptItems(session.review), null)

  const questions = steps.reduce((n, s) => n + s.count, 0)
  return {
    minutes: session.minutes,
    steps,
    questions,
    started: steps.some(s => s.attempted > 0),
    finished: steps.length > 0 && steps.every(s => s.finished),
  }
}

/** What Start still has to launch: the misses not yet fixed and the concepts not yet achieved. */
export function sessionRemaining(view: SessionView): { fixIds: string[]; concepts: string[] } {
  const fixIds: string[] = []
  const concepts: string[] = []
  for (const step of view.steps) {
    for (const item of step.items) {
      if (item.achieved) continue
      if (step.kind === 'fix') fixIds.push(item.key)
      else concepts.push(item.key)
    }
  }
  return { fixIds, concepts }
}

/**
 * The concepts the session's rows name, in the order they are listed, each
 * once: the walk the concept reader's Previous / Next takes from a tapped row.
 */
export function sessionWalk(view: SessionView): string[] {
  const seen = new Set<string>()
  const walk: string[] = []
  for (const step of view.steps) {
    for (const item of step.items) {
      if (!item.concept) continue
      const key = item.concept.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      walk.push(item.concept)
    }
  }
  return walk
}

/** Lower-cased names of the concepts in today's session: the squares the syllabus outlines. */
export function sessionConceptKeys(view: SessionView | null): Set<string> {
  const keys = new Set<string>()
  if (!view) return keys
  for (const step of view.steps) {
    if (step.kind === 'fix') continue
    for (const item of step.items) keys.add(item.key.toLowerCase())
  }
  return keys
}

// ── Words ────────────────────────────────────────────────────────────────────

/** A step's name before it is done, and once the session is finished. */
export const SESSION_STEP_LABEL: Record<SessionStepKind, { todo: string; done: string }> = {
  fix: { todo: 'Fix mistakes', done: 'Fixed' },
  learn: { todo: 'Learn', done: 'Learned' },
  review: { todo: 'Review', done: 'Reviewed' },
}

/** "3 fix, 2 learn, 4 review": what a length holds, for a screen reader. */
export function countsSummary(counts: SessionCounts): string {
  const parts = SESSION_STEP_ORDER.filter(k => counts[k] > 0).map(k => `${counts[k]} ${k}`)
  return parts.length > 0 ? parts.join(', ') : 'nothing waiting'
}

// ── The week ─────────────────────────────────────────────────────────────────

export type WeekDayState = 'studied' | 'today' | 'open'

export interface WeekDay {
  /** YYYY-MM-DD, local. */
  day: string
  /** M T W T F S S. */
  letter: string
  state: WeekDayState
  isToday: boolean
}

const WEEK_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function noon(day: string): Date {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d, 12)
}

/** "Mon, Nov 23": a day as the card's title and the week row's labels name it. */
export function dayTitle(day: string): string {
  return noon(day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

/** The Monday of the week holding `day`. */
export function mondayOf(day: string): string {
  const date = noon(day)
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7))
  return dayKey(date)
}

function weekFrom(monday: string, today: string, studied: ReadonlySet<string>): WeekDay[] {
  const start = noon(monday)
  return WEEK_LETTERS.map((letter, i) => {
    const cell = new Date(start)
    cell.setDate(start.getDate() + i)
    const day = dayKey(cell)
    const isToday = day === today
    return {
      day,
      letter,
      isToday,
      state: studied.has(day) ? 'studied' : isToday ? 'today' : 'open',
    }
  })
}

/**
 * The week holding `today`, Monday to Sunday. A day studied is `studied`
 * (today included, once it is); today not yet studied is `today`; every other
 * day, behind or ahead, is `open`.
 */
export function weekOf(today: string, studied: ReadonlySet<string>): WeekDay[] {
  return weekFrom(mondayOf(today), today, studied)
}

/** How far the week row scrolls: half a year back, a year ahead. */
export const WEEKS_BACK_MAX = 26
export const WEEKS_AHEAD_MAX = 52

/**
 * Every week the row scrolls through, oldest first: from the week of the first
 * day studied to the week of the exam date, this week always among them. With
 * no day studied it starts at this week; with no exam date (or one that has
 * passed) it ends there.
 */
export function weeksAround(
  today: string,
  studied: ReadonlySet<string>,
  examDate: string | null,
): { weeks: WeekDay[][]; current: number } {
  const thisMonday = noon(mondayOf(today))
  const weeksBetween = (day: string) => Math.round((noon(mondayOf(day)).getTime() - thisMonday.getTime()) / (7 * 86_400_000))
  let back = 0
  for (const day of studied) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(day)) back = Math.max(back, -weeksBetween(day))
  }
  back = Math.min(back, WEEKS_BACK_MAX)
  const ahead = examDate && /^\d{4}-\d{2}-\d{2}$/.test(examDate)
    ? Math.min(Math.max(0, weeksBetween(examDate)), WEEKS_AHEAD_MAX)
    : 0
  const weeks: WeekDay[][] = []
  for (let w = -back; w <= ahead; w++) {
    const monday = new Date(thisMonday)
    monday.setDate(thisMonday.getDate() + w * 7)
    weeks.push(weekFrom(dayKey(monday), today, studied))
  }
  return { weeks, current: back }
}

// ── Another day in the Today card ────────────────────────────────────────────

/**
 * What a paced plan holds for one day, in the session card's shape: the
 * concepts it introduces that day under Learn, the ones it brings back under
 * Review. Null when the plan has nothing on that day. Nothing is tried yet, so
 * nothing reads as done.
 */
export function planDayView(
  plan: { assignments: readonly { conceptName: string; scheduledDate: string; initialState: string }[]; status: string } | null,
  day: string,
): SessionView | null {
  if (!plan) return null
  const learn: string[] = []
  const review: string[] = []
  const seen = new Set<string>()
  for (const a of plan.assignments) {
    if (a.scheduledDate !== day) continue
    const key = a.conceptName.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    if (a.initialState === 'new' && plan.status !== 'review_mode') learn.push(a.conceptName)
    else review.push(a.conceptName)
  }
  const step = (kind: SessionStepKind, names: string[]): SessionStep => ({
    kind,
    items: names.map(name => ({ key: name, concept: name, attempted: false, achieved: false })),
    count: names.length,
    of: null,
    attempted: 0,
    achieved: 0,
    finished: false,
  })
  const steps = [step('learn', learn), step('review', review)].filter(s => s.count > 0)
  if (steps.length === 0) return null
  return { minutes: DEFAULT_SESSION_LENGTH, steps, questions: learn.length + review.length, started: false, finished: false }
}

/** One exam's practice on one day: questions answered and how many were right. */
export function dayPractice(
  sessions: readonly { exam: string | null; total_questions: number; correct_count: number; completed_at: string }[],
  examLabel: string | null,
  day: string,
  dayOf: (iso: string) => string,
): { answered: number; correct: number } {
  let answered = 0
  let correct = 0
  for (const s of sessions) {
    if (s.exam !== examLabel || dayOf(s.completed_at) !== day) continue
    answered += s.total_questions
    correct += s.correct_count
  }
  return { answered, correct }
}

/**
 * The one sentence the card says about a day that has no list to show: a day
 * behind (what was practised), or a day ahead with nothing planned.
 */
export function dayNote(
  day: string,
  today: string,
  practice: { answered: number; correct: number },
  examName: string,
  paced: boolean,
): string {
  if (day < today) {
    if (practice.answered === 0) return `No practice on ${examName} this day.`
    const q = practice.answered === 1 ? '1 question' : `${practice.answered} questions`
    return `${q} answered, ${practice.correct} right.`
  }
  return paced ? 'Nothing is planned for this day.' : "This day's session is built when the day comes."
}

/** "This week: three days studied, today not yet". */
export function weekSummary(week: readonly WeekDay[]): string {
  const studied = week.filter(d => d.state === 'studied').length
  const today = week.find(d => d.isToday)
  const days = `${studied} ${studied === 1 ? 'day' : 'days'} studied`
  if (!today) return `This week: ${days}`
  return `This week: ${days}, today ${today.state === 'studied' ? 'done' : 'not yet'}`
}

// ── The plan's tick on the syllabus bar ──────────────────────────────────────

/**
 * Where a paced plan expects the syllabus percentage to be today: a straight
 * line from 0% on the plan's first day to 100% on its ready date (confirmed
 * 2026-11-23). The same expectation the plan's "ahead" status is measured
 * against. Null when there is no plan, the target date has passed, or the plan
 * is in review mode: then there is nothing to be paced against.
 */
export function planTickPct(
  plan: { dayNumber: number; totalDays: number; status: string } | null,
): number | null {
  if (!plan) return null
  if (plan.status === 'target_passed' || plan.status === 'review_mode') return null
  if (!(plan.totalDays > 0)) return null
  const pct = ((plan.dayNumber - 1) / plan.totalDays) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}
