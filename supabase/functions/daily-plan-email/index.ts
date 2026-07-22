// daily-plan-email: sends each opted-in user a morning email listing what
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
const DEFAULT_FROM = 'Actuarial Notes <notifications@actuarialnotes.com>'

// Matches EXAM_ID_TO_LABEL in quiz/src/lib/examIds.ts (exam_progress keys).
const EXAM_LABELS: Record<string, string> = {
  'P': 'Exam P — Probability',
  'FM': 'Exam FM — Financial Mathematics',
  'MAS-I': 'Exam MAS-I',
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
    case 'on_track': return "You're on track"
    case 'ahead': return "You're ahead of schedule"
    case 'behind': return "You're behind pace — a session today helps you catch up"
    case 'review_mode': return 'Everything is mastered — keep it fresh with review'
    case 'target_passed': return 'Your target date has passed — pacing against your exam date'
    default: return ''
  }
}

const MAX_EMAIL_CONCEPTS = 12

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

// ── Email composition ─────────────────────────────────────────────────────────

interface ExamSection {
  label: string
  concepts: string[]
  reviewConcepts: string[]
  pacingLine: string
  catchUp: boolean
}

function daysBetweenISO(fromISO: string, toISO: string): number {
  const from = Date.parse(`${fromISO}T00:00:00Z`)
  const to = Date.parse(`${toISO}T00:00:00Z`)
  if (Number.isNaN(from) || Number.isNaN(to)) return 0
  return Math.round((to - from) / 86_400_000)
}

function buildSection(examId: string, plan: EmailPlanSnapshot, today: string): ExamSection | null {
  const concepts = deriveTodaysConcepts(plan, today)
  const reviewConcepts = (plan.reviewConcepts ?? []).filter(c => typeof c === 'string')
  if (concepts.length === 0 && reviewConcepts.length === 0) return null

  const pieces: string[] = []
  const planStart = plan.config?.planStartDate
  if (planStart && plan.totalDays && planStart <= today) {
    pieces.push(`Day ${daysBetweenISO(planStart, today) + 1} of ${plan.totalDays}`)
  }
  const pacing = describePacing(plan.status)
  if (pacing) pieces.push(pacing)
  const readyDate = plan.effectiveReadyDate
  if (readyDate && readyDate >= today && plan.status !== 'review_mode') {
    pieces.push(`${daysBetweenISO(today, readyDate)} days to your target`)
  }

  return {
    label: EXAM_LABELS[examId] ?? examId,
    concepts,
    reviewConcepts,
    pacingLine: pieces.join(' · '),
    catchUp: !!plan.generatedDate && plan.generatedDate < today,
  }
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
    </div>`).join('')

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px 16px;">
    <h1 style="font-size:20px;color:#111827;margin:0;">Your study plan for ${escapeHtml(friendlyDate)}</h1>
    ${body}
    <a href="${APP_URL}/quiz" style="display:inline-block;margin-top:4px;padding:10px 22px;background:#4f46e5;color:#ffffff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Start today's session</a>
    <p style="margin-top:28px;font-size:12px;color:#9ca3af;">
      You're receiving this because you turned on the daily study plan email.
      You can change the time or turn it off in
      <a href="${APP_URL}/settings" style="color:#6b7280;">Settings</a>.
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
    lines.push('')
  }
  lines.push(`Start today's session: ${APP_URL}/quiz`)
  lines.push(`Turn this email off in Settings: ${APP_URL}/settings`)
  return lines.join('\n')
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
  let force = false
  try {
    const body = await req.json()
    force = body?.force === true
  } catch { /* empty body from cron */ }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data: prefs, error: prefsErr } = await admin
    .from('user_email_prefs')
    .select('user_id, daily_plan_email, send_hour_local, timezone, last_sent_date')
    .eq('daily_plan_email', true)
  if (prefsErr) return Response.json({ error: prefsErr.message }, { status: 500 })

  const now = new Date()
  let sent = 0
  let skipped = 0
  const errors: string[] = []

  for (const row of (prefs ?? []) as PrefsRow[]) {
    try {
      const { date: localDate, hour: localHour } = localDateHour(row.timezone || 'UTC', now)
      if (!force && localHour !== row.send_hour_local) { skipped++; continue }
      if (!force && row.last_sent_date === localDate) { skipped++; continue }

      const { data: examRows, error: examErr } = await admin
        .from('exam_progress')
        .select('exam_id, study_plan_cache')
        .eq('user_id', row.user_id)
        .not('study_plan_cache', 'is', null)
      if (examErr) throw new Error(examErr.message)

      const sections = (examRows ?? [])
        .map(r => buildSection(r.exam_id as string, r.study_plan_cache as EmailPlanSnapshot, localDate))
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
