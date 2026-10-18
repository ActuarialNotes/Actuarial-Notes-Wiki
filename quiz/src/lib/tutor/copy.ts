// The sentences the Tutor composes about a candidate's own record. Everything
// else it shows is the vault's words; these are the only ones it writes, so
// they live in one place, plain and short. No guilt, no exclamation marks, no
// praise it can't back with a number.

import type { Finding } from './diagnosis'
import type { DayPlan, StepReason } from './scheduler'
import type { ExamHistory } from './context'
import type { ExamDate, JourneyPhase } from './journey'
import type { Offer } from './moments'
import { PART_KIND_LABEL } from './items'
import { daysFromTo } from './memory'

export const REASON_LABEL: Record<StepReason, string> = {
  relearn: 'Relearn',
  due: 'Due',
  new: 'New',
  'sure-wrong': 'Sure and wrong',
  confused: 'You flagged this',
  practice: 'Practice',
}

/** Why this item, in a sentence — the card's subtitle. */
export const REASON_LINE: Record<StepReason, string> = {
  relearn: 'You missed this earlier. Getting it back is what makes it stick.',
  due: 'Due for a check — recall is fading.',
  new: 'Your first check, with the page fresh in mind.',
  'sure-wrong': 'You were sure last time and lost points. Corrected confident errors stick best.',
  confused: 'You said this was confusing.',
  practice: 'Extra practice, on what has faded most.',
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`
}

/** "12 min", "1 h 5 min". */
export function formatMinutes(minutes: number): string {
  if (minutes <= 0) return '0 min'
  const m = Math.max(1, Math.round(minutes))
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const rest = m % 60
  return rest ? `${h} h ${rest} min` : `${h} h`
}

/** What a bubble says. */
export function offerLine(offer: Offer, plan: DayPlan | null): string {
  switch (offer.kind) {
    case 'post-read':
      return `Check yourself on ${offer.concept}?`
    case 'reading-streak':
      return `That's a few pages read. Test yourself on ${offer.concept}?`
    case 'arrival': {
      if (!plan) return 'Ready when you are.'
      const parts: string[] = []
      if (plan.relearn) parts.push(`${plural(plan.relearn, 'miss', 'misses')} to relearn`)
      if (plan.due) parts.push(`${plan.due} due`)
      const next = plan.newConcepts[0]
      if (parts.length === 0) return next ? `Today starts with ${next}.` : 'Nothing due today.'
      return `Today: ${parts.join(' · ')}${next ? `, then ${next}` : ''}.`
    }
    case 'relearn':
      return 'Something you missed is ready to try again.'
    case 'debrief':
      return 'Want to look at what that quiz cost you?'
  }
}

/** The day's plan as one line. */
export function planLine(plan: DayPlan): string {
  const parts: string[] = []
  if (plan.relearn) parts.push(`${plan.relearn} to relearn`)
  if (plan.due) parts.push(`${plan.due} due`)
  if (plan.newConcepts.length) parts.push(`${plan.newConcepts.length} new`)
  if (parts.length === 0) return 'Nothing waiting. Extra practice is still spaced.'
  return `${parts.join(' · ')} — about ${formatMinutes(plan.minutes)}`
}

export function historyLine(h: ExamHistory): string | null {
  if (h.papers === 0) return null
  return `Asked on ${h.papers} of ${h.totalPapers} papers · ${plural(h.parts, 'part')} · ${h.points} points`
}

function formatDay(day: string): string {
  return new Date(`${day}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

/** The exam date, and where it came from. */
export function examDateLine(exam: ExamDate, today: string): string {
  if (!exam.day) return 'No sitting set. CAS hasn’t published the next window — set the date you’re aiming for.'
  const days = daysFromTo(today, exam.day)
  const when = days > 1 ? `in ${days} days` : days === 1 ? 'tomorrow' : days === 0 ? 'today' : `${-days} days ago`
  const source = exam.source === 'target' ? 'your exam date' : 'the next published window'
  return `${formatDay(exam.day)} — ${when} (${source})`
}

export function phaseLine(phase: JourneyPhase, daysLeft: number | null): string {
  if (phase === 'exam') return 'It’s exam time. Nothing more to do here — good luck.'
  if (phase === 'after') return 'That sitting has passed. Set your next one when you know it.'
  if (phase === 'setup') return 'Set your sitting, and the Tutor will pace the rest.'
  return daysLeft != null ? `${plural(daysLeft, 'day')} to go.` : ''
}

function pct(x: number): string {
  return `${Math.round(x * 100)}%`
}

/** A finding as the line the Confusing view leads with. */
export function findingLine(f: Finding): string {
  switch (f.type) {
    case 'sure-wrong':
      return `You were sure about ${f.concept} and lost points.`
    case 'confused':
      return `You flagged ${f.concept}: ${CONFUSION_LABEL[f.reason].toLowerCase()}.`
    case 'persistent':
      return `${f.concept} has cost you points on ${f.missDays} different days.`
    case 'siblings':
      return `${f.concepts[0]} and ${f.concepts[1]} sit on one syllabus line, and you've missed both. They're easy to mix up.`
    case 'foundation':
      return `${f.concept} is defined in terms of ${f.foundations.join(' and ')}, which you haven't got yet.`
    case 'kind-gap':
      return `You score ${pct(f.strongRate)} on ${PART_KIND_LABEL[f.strong].toLowerCase()} parts and ${pct(f.weakRate)} on ${PART_KIND_LABEL[f.weak].toLowerCase()} parts.`
    case 'calibration':
      return f.guessRate != null
        ? `When you're sure, you're right ${pct(f.sureRate)} of the time; when guessing, ${pct(f.guessRate)}.`
        : `When you're sure, you're right ${pct(f.sureRate)} of the time.`
  }
}

/** The second line: why it matters, or what to do. */
export function findingAdvice(f: Finding): string {
  switch (f.type) {
    case 'sure-wrong':
      return 'A confident error, once corrected, is corrected for good. Try it again.'
    case 'confused':
      return 'Two full-credit answers and the flag clears.'
    case 'persistent':
      return 'Read the page again — the worked example first — then try a different part.'
    case 'siblings':
      return 'Read them side by side, then answer one of each.'
    case 'foundation':
      return 'Start underneath: get the foundation first.'
    case 'kind-gap':
      return f.weak === 'calculation'
        ? 'Work the page’s worked examples, then the calculations.'
        : 'CAS gives these points for naming the reason. Practise saying why.'
    case 'calibration':
      return f.overconfident
        ? 'Sure should mean sure. When you’re not, say so — it decides what comes back first.'
        : 'Your confidence is a good guide. Keep rating it honestly.'
  }
}

export const CONFUSION_LABEL = {
  meaning: 'What it means',
  difference: 'How it differs from its neighbours',
  calculation: 'The calculation',
  when: 'When to use it, and why',
  foundation: 'Something it builds on',
} as const
