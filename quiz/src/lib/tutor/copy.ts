// The sentences the Tutor composes about a candidate's own record. Everything
// else it shows is the vault's words; these are the only ones it writes, so
// they live here and in says.ts, plain and short. No guilt, no exclamation marks, no
// praise it can't back with a number.

import type { Finding } from './diagnosis'
import type { StepReason } from './scheduler'
import { PART_KIND_LABEL } from './items'

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
  due: 'Due for a check. Recall is fading.',
  new: 'Your first check on this concept.',
  'sure-wrong': 'You were sure last time and lost points. Corrected confident errors stick best.',
  confused: 'You said this was confusing.',
  practice: 'Extra practice, ahead of its next check.',
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

function pct(x: number): string {
  return `${Math.round(x * 100)}%`
}

/** A finding as one line. */
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
      return `${f.concept} is defined in terms of ${f.foundations.join(' and ')}, which ${f.foundations.length === 1 ? 'isn’t' : 'aren’t'} at Level 2 yet.`
    case 'kind-gap':
      return `You score ${pct(f.strongRate)} on ${PART_KIND_LABEL[f.strong].toLowerCase()} parts and ${pct(f.weakRate)} on ${PART_KIND_LABEL[f.weak].toLowerCase()} parts.`
    case 'calibration':
      return f.guessRate != null
        ? `When you're sure, you're right ${pct(f.sureRate)} of the time; when guessing, ${pct(f.guessRate)}.`
        : `When you're sure, you're right ${pct(f.sureRate)} of the time.`
  }
}

export const CONFUSION_LABEL = {
  meaning: 'What it means',
  difference: 'How it differs from its neighbours',
  calculation: 'The calculation',
  when: 'When to use it, and why',
  foundation: 'Something it builds on',
} as const
