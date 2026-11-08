import type { ExamSitting } from '../data/examSittings'

/**
 * **One sitting, as a timeline** — what the study guide's info button
 * (`components/wiki/ExamSittingInfoButton.tsx`) shows about the sitting the
 * page is being read for: when registration opens and closes, when the exam
 * (or PCPA's project) can be sat, and when results come out.
 *
 * The dates are the publisher's, transcribed into `data/examSittingDetails.ts`
 * with the page they came from; this module only orders them and says where
 * today falls among them. A sitting with no details on file still has the two
 * things its `data/examSittings.ts` row carries — the window and, where known,
 * the registration deadline — and nothing more. A date that isn't published is
 * absent, never estimated from last year's pattern.
 */

/**
 * What a date *is*. `window` and `registration-deadline` are one per sitting —
 * a transcribed one replaces the one the sittings row carries — and the rest
 * are whatever the publisher names (PCPA's exam deadline, a withdrawal
 * deadline), kept under the publisher's own label.
 */
export type SittingMilestoneKind =
  | 'registration-opens'
  | 'registration-deadline'
  | 'deadline'
  | 'window'
  | 'results'

export interface SittingMilestone {
  kind: SittingMilestoneKind
  /** The publisher's name for it — "Project Submission Deadline", not ours. */
  label: string
  /** ISO YYYY-MM-DD. */
  date: string
  /** Last day, for a span (the exam window). */
  endDate?: string
  /** A qualifier the publisher attaches — "Subject to change". */
  note?: string
}

/** Where today falls: past, happening, the next thing coming, or after that. */
export type SittingStepState = 'done' | 'now' | 'next' | 'later'

export interface SittingStep extends SittingMilestone {
  state: SittingStepState
}

/** What a sittings row's window is a window *for*. */
const WINDOW_LABEL: Record<ExamSitting['format'], string> = {
  CBT: 'Exam window',
  'P/P': 'Exam window',
  Project: 'Project window',
}

/** One-per-sitting kinds: a transcribed one supersedes the sittings row's. */
const SINGLE_KINDS: ReadonlySet<SittingMilestoneKind> = new Set(['window', 'registration-deadline'])

/**
 * The sitting's milestones in date order, each placed against `today`.
 *
 * At most one step is `next`: the first one still to come, and only when
 * nothing is happening today — while a window is open, *that* is the news, and
 * the results after it can wait their turn.
 */
export function sittingTimeline(
  sitting: ExamSitting,
  milestones: readonly SittingMilestone[],
  today: string,
): SittingStep[] {
  const fromRow: SittingMilestone[] = []
  if (sitting.registrationDeadline) {
    fromRow.push({ kind: 'registration-deadline', label: 'Registration deadline', date: sitting.registrationDeadline })
  }
  fromRow.push(sitting.endDate
    ? { kind: 'window', label: WINDOW_LABEL[sitting.format], date: sitting.startDate, endDate: sitting.endDate }
    : { kind: 'window', label: 'Exam day', date: sitting.startDate })

  const merged = [
    ...fromRow.filter(m => !(SINGLE_KINDS.has(m.kind) && milestones.some(t => t.kind === m.kind))),
    ...milestones,
  ].sort((a, b) => a.date.localeCompare(b.date) || spanDays(a) - spanDays(b))

  const steps: SittingStep[] = merged.map(m => {
    const end = m.endDate ?? m.date
    const state: SittingStepState = end < today ? 'done' : m.date <= today ? 'now' : 'later'
    return { ...m, state }
  })
  if (!steps.some(s => s.state === 'now')) {
    const upcoming = steps.find(s => s.state === 'later')
    if (upcoming) upcoming.state = 'next'
  }
  return steps
}

function spanDays(m: SittingMilestone): number {
  return m.endDate ? daysBetween(m.date, m.endDate) : 0
}

/** Whole days from `from` to `to` (ISO dates), negative when `to` is earlier. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / 86_400_000)
}

/**
 * The countdown a step carries: only the step that matters now does — the one
 * happening today, or the next one coming. Everything else reads as its date.
 */
export function stepCountdown(step: SittingStep, today: string): string | null {
  if (step.state === 'now') {
    if (!step.endDate) return 'Today'
    const left = daysBetween(today, step.endDate)
    if (left === 0) return 'Last day'
    return `Open · ${left} ${left === 1 ? 'day' : 'days'} left`
  }
  if (step.state !== 'next') return null
  const days = daysBetween(today, step.date)
  return days === 1 ? 'Tomorrow' : `In ${days} days`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * A step's date as a reader wants it: "Oct 19–27, 2026", "Nov 30, 2026",
 * "Dec 16, 2026 – Jan 4, 2027". Parsed by hand rather than through `Date`, so
 * no time zone can move a published day by one.
 */
export function formatStepDate(step: Pick<SittingMilestone, 'date' | 'endDate'>): string {
  const [y1, m1, d1] = step.date.split('-').map(Number)
  if (!step.endDate || step.endDate === step.date) return `${MONTHS[m1 - 1]} ${d1}, ${y1}`
  const [y2, m2, d2] = step.endDate.split('-').map(Number)
  if (y1 === y2 && m1 === m2) return `${MONTHS[m1 - 1]} ${d1}–${d2}, ${y1}`
  if (y1 === y2) return `${MONTHS[m1 - 1]} ${d1} – ${MONTHS[m2 - 1]} ${d2}, ${y1}`
  return `${MONTHS[m1 - 1]} ${d1}, ${y1} – ${MONTHS[m2 - 1]} ${d2}, ${y2}`
}

/**
 * Whether a step's date (or span) needs its year printed: only when it isn't
 * the year it is being read in. "Jan 15, 2027" in November 2026; "Nov 4–15".
 */
export function formatStepDateShort(step: Pick<SittingMilestone, 'date' | 'endDate'>, today: string): string {
  const year = today.slice(0, 4)
  const full = formatStepDate(step)
  const end = step.endDate ?? step.date
  if (step.date.slice(0, 4) !== year || end.slice(0, 4) !== year) return full
  return full.replace(`, ${year}`, '')
}

/**
 * **The headline** — what the status banner says above the ruler: the step
 * happening now or coming next, told as a title, a line under it and a count.
 * "Exam window open · Closes Nov 15 · 7 days"; "Exam window opens in · Dec 3
 * · 25 days". Null once every date has passed: there is nothing to count to.
 */
export interface SittingHeadline {
  title: string
  detail: string
  count: string
  state: 'now' | 'next'
}

export function sittingHeadline(steps: readonly SittingStep[], today: string): SittingHeadline | null {
  const step = steps.find(s => s.state === 'now') ?? steps.find(s => s.state === 'next')
  if (!step) return null
  const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`
  if (step.state === 'now') {
    if (!step.endDate) return { title: step.label, detail: formatStepDateShort(step, today), count: 'Today', state: 'now' }
    const left = daysBetween(today, step.endDate)
    const close = formatStepDateShort({ date: step.endDate }, today)
    return left === 0
      ? { title: `${step.label} open`, detail: 'Closes today', count: 'Last day', state: 'now' }
      : { title: `${step.label} open`, detail: `Closes ${close}`, count: days(left), state: 'now' }
  }
  const ahead = daysBetween(today, step.date)
  return {
    title: step.endDate ? `${step.label} opens in` : `${step.label} in`,
    detail: formatStepDateShort({ date: step.date }, today),
    count: ahead === 1 ? 'Tomorrow' : days(ahead),
    state: 'next',
  }
}

/**
 * **The ruler** — the sitting drawn to scale, left to right: each step at its
 * date (a span as a bar), today as a tick, the months as ticks below, so the
 * six weeks between registration and the window *look* like six weeks. Every
 * position is a percentage of the run from the first date (or today, if
 * earlier) to the last. Null for a sitting with one date: there is no run to
 * draw.
 */
export interface SittingRuler {
  marks: { key: string; kind: SittingMilestoneKind; state: SittingStepState; at: number; to?: number }[]
  /** Where today falls, or null once the whole run is behind it. */
  today: number | null
  months: { label: string; at: number }[]
}

export function sittingRuler(steps: readonly SittingStep[], today: string): SittingRuler | null {
  if (steps.length === 0) return null
  const last = steps.reduce((max, s) => ((s.endDate ?? s.date) > max ? (s.endDate ?? s.date) : max), steps[0].date)
  const first = today < steps[0].date ? today : steps[0].date
  const span = daysBetween(first, last)
  if (span <= 0) return null
  const pct = (iso: string) => Math.round((daysBetween(first, iso) / span) * 1000) / 10

  const marks = steps.map(s => ({
    key: `${s.kind}|${s.date}|${s.label}`,
    kind: s.kind,
    state: s.state,
    at: pct(s.date),
    ...(s.endDate && s.endDate !== s.date ? { to: pct(s.endDate) } : {}),
  }))

  let months: SittingRuler['months'] = []
  let [y, m] = first.split('-').map(Number)
  for (;;) {
    m += 1
    if (m > 12) { m = 1; y += 1 }
    const iso = `${y}-${String(m).padStart(2, '0')}-01`
    if (iso > last) break
    const at = pct(iso)
    // A label centred on a tick at the very edge would hang off the ruler.
    if (at >= 4 && at <= 96) months.push({ label: MONTHS[m - 1], at })
  }
  if (months.length > 8) months = months.filter((_, i) => i % 2 === 0)

  return { marks, today: today > last ? null : pct(today), months }
}
