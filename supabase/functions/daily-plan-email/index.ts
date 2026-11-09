// daily-plan-email: sends each opted-in user a daily email listing what
// their study plan has scheduled for today.
//
// Invoked hourly by pg_cron (supabase/migrations/20260721_daily_plan_email.sql)
// with an x-cron-secret header. Each run picks the users whose local clock —
// per the timezone stored on their user_email_prefs row — currently reads
// their chosen send_hour_local, derives today's concepts from the cached study
// plan in exam_progress.study_plan_cache, and sends via Resend. last_sent_date
// (the user's local calendar date) makes retried or duplicate runs idempotent.
//
// Required secrets (supabase secrets set):
//   DAILY_PLAN_EMAIL_CRON_SECRET — must match the vault secret used by the cron job
//   RESEND_API_KEY               — Resend API key
//   DAILY_PLAN_EMAIL_FROM        — optional From header override
//
// The plan-derivation helpers below (deriveTodaysConcepts, describePacing,
// localDateHour) are mirrored verbatim from the tested source of truth in
// quiz/src/lib/dailyEmail.ts — this function cannot import from quiz/src.
// If you change them there, update them here (same contract as the league
// math mirrored into SQL — docs/leagues.md).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const APP_URL = 'https://quiz.actuarialnotes.com'
// Where the preference lives: the Dashboard's bell. `?reminders=1` opens it.
const PREFS_URL = `${APP_URL}/dashboard?reminders=1`
// The session link opens the Dashboard, where Today's session and its Start
// button are. It carries UTM parameters: GA4 credits the visit to this email,
// and the app reads `utm_source` on boot to fire `reminder_opened` (roadmap L1).
// The source must be a key of REMINDER_SOURCES in quiz/src/lib/learningSignals.ts
// — learningSignals.test.ts reads this file to hold the two together.
const UTM = 'utm_source=daily-plan-email&utm_medium=email&utm_campaign=study-plan'
// With no exam to quiz on (no bank behind it), the one button opens the
// Dashboard, where Start runs today's session.
const SESSION_URL = `${APP_URL}/dashboard?${UTM}`

// Each exam's Start button opens that exam's quiz on today's concepts
// (planQuizPath, mirrored below). utm_content tells it from the Listen button.
function quizUrl(examId: string, concepts: string[]): string | null {
  const path = planQuizPath(examId, concepts)
  return path ? `${APP_URL}${path}&${UTM}&utm_content=quiz` : null
}
const DEFAULT_FROM = 'Actuarial Notes <notifications@actuarialnotes.com>'

// An exam_progress key → the exam's name. Derived from the key rather than
// listed, so an exam added to the app never reaches the email as a bare key:
// `P` → "Exam P", `CAS-5` → "Exam 5", `CAS-DA` → "Exam DISC-DA". Only the keys
// that don't read that way are named here (keys: wikiExamIdToProgressKey in
// quiz/src/lib/wikiParser.ts).
const EXAM_LABEL_EXCEPTIONS: Record<string, string> = {
  'CAS-PCPA': 'PCPA',
  'CAS-DA': 'Exam DISC-DA',
  'CAS-RM': 'Exam DISC-RM',
  'CAS-IA': 'Exam DISC-IA',
  'CAS-APC': 'Course on Professionalism',
}

function examLabel(key: string): string {
  const named = EXAM_LABEL_EXCEPTIONS[key]
  if (named) return named
  return `Exam ${key.replace(/^(CAS|CIA|FSA)-/, '')}`
}

// ── Mirrored from quiz/src/lib/dailyEmail.ts (tested there) ──────────────────

interface EmailPlanSnapshot {
  generatedDate?: string
  todaysConcepts?: string[]
  assignments?: Array<{ conceptName?: string; scheduledDate?: string }>
  reviewConcepts?: string[]
  status?: string
  dayNumber?: number
  totalDays?: number
  daysRemaining?: number
  effectiveReadyDate?: string
  config?: { targetReadyDate?: string | null; planStartDate?: string | null } | null
}

function deriveTodaysConcepts(plan: EmailPlanSnapshot, today: string): string[] {
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

function describePacing(status: string | undefined): string {
  switch (status) {
    case 'on_track': return 'On track'
    case 'ahead': return 'Ahead of schedule'
    case 'behind': return 'Behind schedule'
    case 'review_mode': return 'Every concept is at Level 3'
    case 'target_passed': return 'Past your ready date, paced to your exam date'
    default: return ''
  }
}

const MAX_EMAIL_CONCEPTS = 12

// ── The quiz link ─────────────────────────────────────────────────────────────

/**
 * The question bank's `exam:` label for each exam_progress key — the inverse of
 * EXAM_LABEL_TO_ID in lib/examIds.ts (duplicationContracts.test.ts holds the
 * two equal). An exam with no bank (PCPA) has no quiz to link to.
 */
const EMAIL_BANK_LABELS: Record<string, string> = {
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
const MAX_QUIZ_LINK_CONCEPTS = 40

/**
 * The `/quiz` path (with its query) of today's quiz for one exam: the bank,
 * the day's concepts and `plan=1`, which has the quiz page draw the fewest
 * questions that cover them (as the app's own Today's Plan quiz does) rather
 * than every question on them. The concepts ride the URL, so the link works
 * for a reader who isn't signed in; `from=email` is what has the quiz offer
 * them a sign-in first. Null when there is no bank or nothing to quiz.
 * A name with a comma can't ride the comma-separated list and is left out.
 */
function planQuizPath(examId: string, concepts: string[]): string | null {
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

function localDateHour(timeZone: string, now: Date = new Date()): { date: string; hour: number } {
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

// ── The daily podcast's episode (mirrored from quiz/src/lib/podcast.ts) ─────
//
// podcastSlug, podcastClipKey, planEpisode and episodeMinutesLabel are copied
// verbatim from lib/podcast.ts, which can't be imported here;
// lib/duplicationContracts.test.ts runs this copy against the same vectors.
// The email puts the episode's length on its Listen button, from the index of
// recorded clips in the public `podcast` bucket (docs/daily-podcast.md). The
// index lists only clips current with the vault, so no script hash is checked
// here — the app checks it again before it plays.

function podcastSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}
function podcastClipKey(kind: string, name: string): string {
  return `${kind}/${podcastSlug(name)}`
}
interface EpisodeEntry {
  kind: 'brief' | 'refresher' | 'bridge'
  /** The concept's name, or the bridge's id. */
  name: string
  key: string
  seconds: number
}

export interface EpisodePlan {
  entries: EpisodeEntry[]
  seconds: number
  /** Concepts on the plan that the episode doesn't read: not recorded yet, or past the caps. */
  unread: string[]
  /** How many concepts the episode reads. */
  concepts: number
}
function planEpisode(
  todaysConcepts: string[],
  reviewConcepts: string[],
  status: string | undefined,
  clips: Record<string, { d: number; h: string }>,
  isCurrent?: (key: string, hash: string) => boolean,
): EpisodePlan {
  // At most 12 concepts from today's plan (the email lists 12), 5 refreshers,
  // and no more concepts once the episode runs 15 minutes.
  const maxBriefs = 12
  const maxRefreshers = 5
  const target = 15 * 60
  const ok = (key: string) => {
    const clip = clips[key]
    return !!clip && clip.d > 0 && (!isCurrent || isCurrent(key, clip.h))
  }
  const entries: EpisodeEntry[] = []
  const unread: string[] = []
  let seconds = 0
  let concepts = 0
  const seen = new Set<string>()
  const add = (kind: EpisodeEntry['kind'], name: string, key: string) => {
    entries.push({ kind, name, key, seconds: clips[key].d })
    seconds += clips[key].d
  }
  const briefs = status === 'review_mode' ? [] : todaysConcepts
  const briefPicks: string[] = []
  for (const name of briefs) {
    const slug = podcastSlug(name)
    if (seen.has(slug)) continue
    seen.add(slug)
    const key = podcastClipKey('brief', name)
    if (!ok(key) || briefPicks.length >= maxBriefs) { unread.push(name); continue }
    briefPicks.push(name)
  }
  const refresherPicks: string[] = []
  for (const name of reviewConcepts) {
    const slug = podcastSlug(name)
    if (seen.has(slug)) continue
    seen.add(slug)
    const key = podcastClipKey('refresher', name)
    if (!ok(key) || refresherPicks.length >= maxRefreshers) { unread.push(name); continue }
    refresherPicks.push(name)
  }
  if (briefPicks.length + refresherPicks.length === 0) return { entries: [], seconds: 0, unread, concepts: 0 }

  const intro = podcastClipKey('bridge', 'intro')
  const outro = podcastClipKey('bridge', 'outro')
  const bridge = podcastClipKey('bridge', 'refreshers')
  if (ok(intro)) add('bridge', 'intro', intro)
  const budget = target - (ok(outro) ? clips[outro].d : 0)
  for (const name of briefPicks) {
    const key = podcastClipKey('brief', name)
    // Always read at least one concept, however long.
    if (concepts > 0 && seconds + clips[key].d > budget) { unread.push(name); continue }
    add('brief', name, key)
    concepts++
  }
  const bridgeSeconds = concepts > 0 && ok(bridge) ? clips[bridge].d : 0
  const fit: string[] = []
  let running = seconds
  for (const name of refresherPicks) {
    const extra = clips[podcastClipKey('refresher', name)].d + (fit.length === 0 ? bridgeSeconds : 0)
    if (concepts + fit.length > 0 && running + extra > budget) { unread.push(name); continue }
    fit.push(name)
    running += extra
  }
  if (fit.length > 0 && bridgeSeconds > 0) add('bridge', 'refreshers', bridge)
  for (const name of fit) {
    add('refresher', name, podcastClipKey('refresher', name))
    concepts++
  }
  if (ok(outro)) add('bridge', 'outro', outro)
  return { entries, seconds, unread, concepts }
}
function episodeMinutesLabel(seconds: number): string {
  return `${Math.max(1, Math.ceil(seconds / 60))} min`
}

type PodcastClips = Record<string, { d: number; h: string }>

/** The recordings' index → its clips, or {} when there is none (no button then). */
async function loadPodcastClips(supabaseUrl: string): Promise<PodcastClips> {
  try {
    const res = await fetch(`${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/public/podcast/index.json`)
    if (!res.ok) return {}
    const raw = await res.json()
    const out: PodcastClips = {}
    for (const [key, v] of Object.entries((raw?.clips ?? {}) as Record<string, unknown>)) {
      if (!Array.isArray(v) || typeof v[0] !== 'string' || typeof v[1] !== 'number' || !(v[1] > 0)) continue
      out[key] = { h: v[0], d: v[1] }
    }
    return out
  } catch {
    return {}
  }
}

// ── Email composition ─────────────────────────────────────────────────────────

interface ExamSection {
  examId: string
  label: string
  concepts: string[]
  reviewConcepts: string[]
  pacingLine: string
  catchUp: boolean
  /** Today's episode, when any of today's concepts is recorded. */
  episode: { minutes: string; concepts: number } | null
  /** Today's quiz on this exam's concepts, when it has a question bank. */
  quizUrl: string | null
}

function daysBetweenISO(fromISO: string, toISO: string): number {
  const from = Date.parse(`${fromISO}T00:00:00Z`)
  const to = Date.parse(`${toISO}T00:00:00Z`)
  if (Number.isNaN(from) || Number.isNaN(to)) return 0
  return Math.round((to - from) / 86_400_000)
}

function buildSection(examId: string, plan: EmailPlanSnapshot, today: string, clips: PodcastClips): ExamSection | null {
  const concepts = deriveTodaysConcepts(plan, today)
  // In review mode today's concepts already include the refreshers; list
  // each concept once.
  const listed = new Set(concepts.map(c => c.toLowerCase()))
  const reviewConcepts = (plan.reviewConcepts ?? [])
    .filter(c => typeof c === 'string' && !listed.has(c.toLowerCase()))
  if (concepts.length === 0 && reviewConcepts.length === 0) return null

  const pieces: string[] = []
  // The plan's own day count, as the app shows it. Review mode has no
  // schedule (its totalDays is 1), so it has no day line.
  if (plan.status !== 'review_mode' && plan.dayNumber && plan.totalDays) {
    pieces.push(`Day ${plan.dayNumber} of ${plan.totalDays}`)
  }
  const pacing = describePacing(plan.status)
  if (pacing) pieces.push(pacing)
  const readyDate = plan.effectiveReadyDate
  if (readyDate && readyDate >= today && plan.status !== 'review_mode' && plan.status !== 'target_passed') {
    const days = daysBetweenISO(today, readyDate)
    pieces.push(days === 0 ? 'Ready date today' : days === 1 ? 'Ready date tomorrow' : `Ready date in ${days} days`)
  }

  const episode = planEpisode(concepts, reviewConcepts, plan.status, clips)

  return {
    examId,
    label: examLabel(examId),
    concepts,
    reviewConcepts,
    pacingLine: pieces.join(' · '),
    catchUp: !!plan.generatedDate && plan.generatedDate < today,
    episode: episode.concepts > 0 ? { minutes: episodeMinutesLabel(episode.seconds), concepts: episode.concepts } : null,
    // The app's own Today's Plan quiz: the review list in review mode, else the
    // day's concepts (planConceptsToday in quiz/src/lib/planCompletion.ts).
    quizUrl: quizUrl(examId, plan.status === 'review_mode' || concepts.length === 0 ? reviewConcepts : concepts),
  }
}

// The Listen button opens the Dashboard on this exam with its episode up
// (`?episode=`). Same utm_source as the session link, so reminder_opened counts
// it; utm_content tells the two buttons apart.
function episodeUrl(examId: string): string {
  return `${APP_URL}/dashboard?episode=${encodeURIComponent(examId)}&${UTM}&utm_content=podcast`
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderConceptList(concepts: string[]): string {
  const shown = concepts.slice(0, MAX_EMAIL_CONCEPTS)
  const extra = concepts.length - shown.length
  const items = shown
    .map(c => `<li style="margin:4px 0;color:#1f2937;">${escapeHtml(c)}</li>`)
    .join('')
  const more = extra > 0
    ? `<li style="margin:4px 0;color:#6b7280;list-style:none;">…and ${extra} more in the app</li>`
    : ''
  return `<ul style="margin:8px 0 0;padding-left:20px;">${items}${more}</ul>`
}

function renderHtml(sections: ExamSection[], friendlyDate: string): string {
  const body = sections.map(s => `
    <div style="margin:24px 0;padding:16px 20px;border:1px solid #e5e7eb;border-radius:12px;">
      <h2 style="margin:0;font-size:16px;color:#111827;">${escapeHtml(s.label)}</h2>
      ${s.pacingLine ? `<p style="margin:6px 0 0;font-size:13px;color:#6b7280;">${escapeHtml(s.pacingLine)}</p>` : ''}
      ${s.concepts.length > 0 ? `
        <p style="margin:14px 0 0;font-size:14px;font-weight:600;color:#111827;">Today's concepts</p>
        ${renderConceptList(s.concepts)}
        ${s.catchUp ? '<p style="margin:8px 0 0;font-size:12px;color:#6b7280;">Includes anything scheduled since your last visit.</p>' : ''}
      ` : ''}
      ${s.reviewConcepts.length > 0 ? `
        <p style="margin:14px 0 0;font-size:14px;font-weight:600;color:#111827;">Worth a refresher</p>
        ${renderConceptList(s.reviewConcepts)}
      ` : ''}
      ${s.quizUrl ? `
        <a href="${escapeHtml(s.quizUrl)}" style="display:inline-block;margin-top:16px;margin-right:8px;padding:8px 16px;background:#4f46e5;color:#ffffff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Start today's quiz</a>
      ` : ''}
      ${s.episode ? `
        <a href="${escapeHtml(episodeUrl(s.examId))}" style="display:inline-block;margin-top:16px;padding:8px 16px;border:1px solid #c7d2fe;background:#eef2ff;color:#3730a3;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">&#127911; Listen to today's plan &middot; ${escapeHtml(s.episode.minutes)}</a>
      ` : ''}
    </div>`).join('')

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px 16px;">
    <h1 style="font-size:20px;color:#111827;margin:0;">Your study plan for ${escapeHtml(friendlyDate)}</h1>
    ${body}
    ${sections.some(s => s.quizUrl) ? '' : `<a href="${escapeHtml(SESSION_URL)}" style="display:inline-block;margin-top:4px;padding:10px 22px;background:#4f46e5;color:#ffffff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Open today's session</a>`}
    <p style="margin-top:28px;font-size:12px;color:#9ca3af;">
      You're receiving this because you turned on the daily study plan email.
      You can change the time or turn it off from the bell on your
      <a href="${PREFS_URL}" style="color:#6b7280;">Dashboard</a>.
    </p>
  </div>`
}

function renderText(sections: ExamSection[], friendlyDate: string): string {
  const lines: string[] = [`Your study plan for ${friendlyDate}`, '']
  for (const s of sections) {
    lines.push(s.label)
    if (s.pacingLine) lines.push(s.pacingLine)
    if (s.concepts.length > 0) {
      lines.push("Today's concepts:")
      for (const c of s.concepts.slice(0, MAX_EMAIL_CONCEPTS)) lines.push(`  - ${c}`)
      const extra = s.concepts.length - MAX_EMAIL_CONCEPTS
      if (extra > 0) lines.push(`  ...and ${extra} more in the app`)
    }
    if (s.reviewConcepts.length > 0) {
      lines.push('Worth a refresher:')
      for (const c of s.reviewConcepts.slice(0, MAX_EMAIL_CONCEPTS)) lines.push(`  - ${c}`)
    }
    if (s.quizUrl) lines.push(`Start today's quiz: ${s.quizUrl}`)
    if (s.episode) lines.push(`Listen to today's plan (${s.episode.minutes}): ${episodeUrl(s.examId)}`)
    lines.push('')
  }
  if (!sections.some(s => s.quizUrl)) lines.push(`Open today's session: ${SESSION_URL}`)
  lines.push(`Change the time or turn this email off: ${PREFS_URL}`)
  return lines.join('\n')
}

// The email is today's study plan, and the study plan is a Pro feature, so the
// email is Pro too. Mirror of the client-side isActivePro check
// (useSubscription.ts); the stored tier value is still `premium` — see the note
// on SubscriptionTier there. An opt-in kept from a lapsed subscription stays in
// user_email_prefs and simply isn't sent until the account is Pro again.
function isActivePro(tier: string, status: string, periodEnd: string | null): boolean {
  if (tier !== 'premium') return false
  if (status !== 'active') return false
  if (!periodEnd) return true
  return new Date(periodEnd).getTime() > Date.now()
}

// ── Handler ───────────────────────────────────────────────────────────────────

interface PrefsRow {
  user_id: string
  daily_plan_email: boolean
  send_hour_local: number
  timezone: string
  last_sent_date: string | null
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const cronSecret = Deno.env.get('DAILY_PLAN_EMAIL_CRON_SECRET')
  if (!cronSecret || req.headers.get('x-cron-secret') !== cronSecret) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (!resendKey) return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  const from = Deno.env.get('DAILY_PLAN_EMAIL_FROM') ?? DEFAULT_FROM

  // Manual-test escape hatch (still behind the cron secret): { "force": true }
  // sends to matching users regardless of the current hour / last_sent_date.
  // Add "user_id" to limit the run to one account, so a smoke test doesn't
  // email every opted-in user.
  let force = false
  let onlyUserId: string | null = null
  try {
    const body = await req.json()
    force = body?.force === true
    if (typeof body?.user_id === 'string' && body.user_id) onlyUserId = body.user_id
  } catch { /* empty body from cron */ }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  let prefsQuery = admin
    .from('user_email_prefs')
    .select('user_id, daily_plan_email, send_hour_local, timezone, last_sent_date')
    .eq('daily_plan_email', true)
  if (onlyUserId) prefsQuery = prefsQuery.eq('user_id', onlyUserId)
  const { data: prefs, error: prefsErr } = await prefsQuery
  if (prefsErr) return Response.json({ error: prefsErr.message }, { status: 500 })

  // The podcast's recordings, read once per run (empty → no Listen buttons).
  const podcastClips = await loadPodcastClips(Deno.env.get('SUPABASE_URL')!)

  const now = new Date()
  let sent = 0
  let skipped = 0
  const errors: string[] = []

  for (const row of (prefs ?? []) as PrefsRow[]) {
    try {
      const { date: localDate, hour: localHour } = localDateHour(row.timezone || 'UTC', now)
      if (!force && localHour !== row.send_hour_local) { skipped++; continue }
      if (!force && row.last_sent_date === localDate) { skipped++; continue }

      const { data: sub, error: subErr } = await admin
        .from('user_subscriptions')
        .select('tier, status, current_period_end')
        .eq('user_id', row.user_id)
        .maybeSingle()
      if (subErr) throw new Error(subErr.message)
      if (!sub || !isActivePro(sub.tier, sub.status, sub.current_period_end)) { skipped++; continue }

      // Only the exams the reader is studying — the ones the Dashboard shows.
      // A plan stays cached on the row after an exam is removed or passed, so
      // a cached plan alone would mail every exam the account ever had.
      const { data: examRows, error: examErr } = await admin
        .from('exam_progress')
        .select('exam_id, study_plan_cache')
        .eq('user_id', row.user_id)
        .eq('status', 'in_progress')
        .not('study_plan_cache', 'is', null)
      if (examErr) throw new Error(examErr.message)

      const sections = (examRows ?? [])
        .map(r => buildSection(r.exam_id as string, r.study_plan_cache as EmailPlanSnapshot, localDate, podcastClips))
        .filter((s): s is ExamSection => s !== null)
      if (sections.length === 0) { skipped++; continue }

      const { data: userData, error: userErr } = await admin.auth.admin.getUserById(row.user_id)
      const email = userData?.user?.email
      if (userErr || !email) throw new Error(userErr?.message ?? 'no email on account')

      const friendlyDate = new Intl.DateTimeFormat('en-US', {
        timeZone: row.timezone || 'UTC', weekday: 'long', month: 'long', day: 'numeric',
      }).format(now)

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [email],
          subject: `Your study plan for ${friendlyDate}`,
          html: renderHtml(sections, friendlyDate),
          text: renderText(sections, friendlyDate),
        }),
      })
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)

      const { error: markErr } = await admin
        .from('user_email_prefs')
        .update({ last_sent_date: localDate, updated_at: new Date().toISOString() })
        .eq('user_id', row.user_id)
      if (markErr) throw new Error(markErr.message)

      sent++
    } catch (err) {
      errors.push(`${row.user_id}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return Response.json({ checked: prefs?.length ?? 0, sent, skipped, errors })
})
