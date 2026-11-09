// Daily study-plan email — pure core.
//
// A daily email that lists what the study plan has scheduled for today is
// sent server-side by the `daily-plan-email` Supabase edge function
// (supabase/functions/daily-plan-email/index.ts), driven by an hourly pg_cron
// job (supabase/migrations/20260721_daily_plan_email.sql). The edge function
// runs in Deno and cannot import from quiz/src, so the derivation logic lives
// here as the pure, *tested* source of truth and is mirrored verbatim in the
// edge function — the same duplication contract as the league math mirrored
// into SQL (docs/leagues.md). If you change anything here, update the mirror.
//
// The core problem: the plan is generated client-side and cached to
// exam_progress.study_plan_cache when the user opens the app — but the email
// goes out *before* they open the app, so the cache is usually from an earlier
// day. `deriveTodaysConcepts` reconstructs today's list from that stale cache
// using the plan's forward schedule (`assignments` carries every upcoming
// session with its scheduledDate — see docs/study-plan-generation.md).

/** Structural subset of the StudyPlan JSONB cached in exam_progress.
 * Fields are optional because the cache may predate newer plan versions. */
export interface EmailPlanSnapshot {
  generatedDate?: string
  todaysConcepts?: string[]
  assignments?: Array<{ conceptName?: string; scheduledDate?: string }>
  reviewConcepts?: string[]
  status?: string
  dayNumber?: number
  totalDays?: number
  daysRemaining?: number
  effectiveReadyDate?: string
  config?: { targetReadyDate?: string | null } | null
}

/**
 * What the plan says to study on `today` (YYYY-MM-DD, in the user's timezone).
 *
 * - Cache generated today (another device already rebuilt it): use its
 *   todaysConcepts verbatim.
 * - Cache from an earlier day: collect every assignment scheduled after the
 *   generation day up to and including today (catch-up for skipped days),
 *   deduped, in schedule order. Assignments *on* the generation day are
 *   excluded — they were that day's list, shown in the app that day.
 * - Cache from the future (clock skew) or missing fields: empty.
 */
export function deriveTodaysConcepts(plan: EmailPlanSnapshot, today: string): string[] {
  const generated = plan.generatedDate
  if (!generated) return []
  if (generated === today) return (plan.todaysConcepts ?? []).filter(c => typeof c === 'string')
  if (generated > today) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const a of plan.assignments ?? []) {
    const name = a?.conceptName
    const date = a?.scheduledDate
    if (!name || !date) continue
    if (date <= generated || date > today) continue
    const key = name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(name)
  }
  return out
}

/** Human phrasing for the plan's pacing status, used as the email's status line. */
export function describePacing(status: string | undefined): string {
  switch (status) {
    case 'on_track': return 'On track'
    case 'ahead': return 'Ahead of schedule'
    case 'behind': return 'Behind schedule'
    case 'review_mode': return 'Every concept is at Level 3'
    case 'target_passed': return 'Past your ready date, paced to your exam date'
    default: return ''
  }
}

/** Cap for concepts listed in full in the email body; the rest collapse to "+N more". */
export const MAX_EMAIL_CONCEPTS = 12

// ── The quiz link ─────────────────────────────────────────────────────────────

/**
 * The question bank's `exam:` label for each exam_progress key — the inverse of
 * EXAM_LABEL_TO_ID in lib/examIds.ts (duplicationContracts.test.ts holds the
 * two equal). An exam with no bank (PCPA) has no quiz to link to.
 */
export const EMAIL_BANK_LABELS: Record<string, string> = {
  'P': 'Probability',
  'FM': 'Financial Mathematics',
  'SRM': 'Exam SRM',
  'FAM': 'Exam FAM',
  'ASTAM': 'Exam ASTAM',
  'ALTAM': 'Exam ALTAM',
  'MAS-I': 'Exam MAS-I',
  'MAS-II': 'Exam MAS-II',
  'CAS-DA': 'Exam DISC-DA',
  'CAS-RM': 'Exam DISC-RM',
  'CAS-IA': 'Exam DISC-IA',
  'CAS-5': 'Exam 5',
  'CAS-6': 'Exam 6C',
  'CAS-7': 'Exam 7',
  'CAS-8': 'Exam 8',
  'CAS-9': 'Exam 9',
}

/** Most concepts a quiz link carries, so the address stays a sensible length. */
export const MAX_QUIZ_LINK_CONCEPTS = 40

/**
 * The `/quiz` path (with its query) of today's quiz for one exam: the bank,
 * the day's concepts and `plan=1`, which has the quiz page draw the fewest
 * questions that cover them (as the app's own Today's Plan quiz does) rather
 * than every question on them. The concepts ride the URL, so the link works
 * for a reader who isn't signed in; `from=email` is what has the quiz offer
 * them a sign-in first. Null when there is no bank or nothing to quiz.
 * A name with a comma can't ride the comma-separated list and is left out.
 */
export function planQuizPath(examId: string, concepts: string[]): string | null {
  const exam = EMAIL_BANK_LABELS[examId]
  if (!exam) return null
  const seen = new Set<string>()
  const names: string[] = []
  for (const c of concepts) {
    if (typeof c !== 'string' || !c.trim() || c.includes(',')) continue
    const key = c.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    names.push(c.trim())
    if (names.length >= MAX_QUIZ_LINK_CONCEPTS) break
  }
  if (names.length === 0) return null
  const params = new URLSearchParams({
    exam, concepts: names.join(','), plan: '1', mode: 'quiz', from: 'email',
  })
  return `/quiz?${params.toString()}`
}

// ── Send-time helpers ─────────────────────────────────────────────────────────

/** Default local hour (24h) at which the daily email is sent. */
export const DEFAULT_SEND_HOUR = 8

/** IANA timezone of this browser, for storing on the prefs row. */
export function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

/**
 * Calendar date (YYYY-MM-DD) and hour (0–23) of `now` in `timeZone`.
 * Invalid/unknown timezones fall back to UTC rather than throwing — the edge
 * function mirror uses this so one bad row can't break the whole send run.
 */
export function localDateHour(timeZone: string, now: Date = new Date()): { date: string; hour: number } {
  let fmt: Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23',
  }
  try {
    fmt = new Intl.DateTimeFormat('en-CA', { ...options, timeZone })
  } catch {
    fmt = new Intl.DateTimeFormat('en-CA', { ...options, timeZone: 'UTC' })
  }
  const parts = fmt.formatToParts(now)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value ?? ''
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hour: Number(get('hour')) % 24,
  }
}

/** "8:00 AM" -style label for the Settings hour picker. */
export function formatHourLabel(hour: number): string {
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}:00 ${hour < 12 ? 'AM' : 'PM'}`
}
