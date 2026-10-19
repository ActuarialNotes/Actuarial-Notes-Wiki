// The Community tab's **topic hues** (docs/community.md). Every topic wears a
// colour of its own, so a tag, a chip and a topic's page say at a glance what
// they are about — and the exams under Exams wear *their* exam's accent
// (`lib/examColors.ts`), so Exam FM is the same blue here as on the Quiz tab.
//
// Like `examAccentStyle`, nothing here paints: `topicAccentStyle` hands back
// custom properties — `--topic-accent`, `--topic-muted`, `--topic-soft`,
// `--topic-vivid`, and `--topic-light` for small text on a dark surface (the
// `.topic-ink` class in index.css picks between the last two by theme) — at the same lightness and saturation as the exam accents,
// so the two palettes sit together. Pure and tested.

import type { CSSProperties } from 'react'
import { examHue } from '../examColors'
import { topicById, type TopicId } from './topics'

/** The exam_progress key each exam topic borrows its hue from. */
export const TOPIC_EXAM_KEY: Partial<Record<TopicId, string>> = {
  'exam-p': 'P',
  'exam-fm': 'FM',
  'exam-fam': 'FAM',
  'exam-srm': 'SRM',
  'exam-pa': 'PA',
  'exam-altam': 'ALTAM',
  'exam-astam': 'ASTAM',
  'exam-mas-i': 'MAS-I',
  'exam-mas-ii': 'MAS-II',
  'exam-5': 'CAS-5',
  'exam-6': 'CAS-6',
  'exam-7': 'CAS-7',
  'exam-8': 'CAS-8',
  'exam-9': 'CAS-9',
}

/** The top-level topics' hues, spread round the wheel so no two neighbours in the pill row clash. */
const ROOT_HUES: Partial<Record<TopicId, number>> = {
  exams: 228,
  careers: 168,
  reforms: 32,
  'ai-tech': 274,
  pc: 8,
  'life-health': 336,
  climate: 196,
  credentials: 48,
  events: 132,
}

/** A topic's hue in degrees: an exam's own, else its own, else its parent's. */
export function topicHue(id: TopicId): number {
  const exam = TOPIC_EXAM_KEY[id]
  const fromExam = exam ? examHue(exam) : undefined
  if (fromExam !== undefined) return fromExam
  const own = ROOT_HUES[id]
  if (own !== undefined) return own
  const parent = topicById(id)?.parent
  return parent ? topicHue(parent) : 220
}

const hsl = (hue: number, s: number, l: number, alpha = 1) =>
  alpha >= 1 ? `hsl(${Math.round(hue)} ${s}% ${l}%)` : `hsl(${Math.round(hue)} ${s}% ${l}% / ${alpha})`

/** A hue as the four custom properties, at the exam accents' saturation and lightness. */
export function hueStyle(hue: number): CSSProperties {
  return {
    '--topic-accent': hsl(hue, 75, 55),
    '--topic-muted': hsl(hue, 75, 55, 0.45),
    '--topic-soft': hsl(hue, 75, 55, 0.14),
    '--topic-vivid': hsl(hue, 88, 46),
    '--topic-light': hsl(hue, 90, 74),
  } as CSSProperties
}

export function topicAccentStyle(id: TopicId): CSSProperties {
  return hueStyle(topicHue(id))
}

/**
 * A steady hue for a name — a post's author — so the same person wears the
 * same colour wherever they appear. Identity, never a verdict (style guide
 * §2.3's rule for player colours).
 */
export function nameHue(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return h % 360
}

/** The most specific topic among tags to colour a thing by: an exam over Exams, anything over Meetings & Events. */
export function leadTopic(tags: readonly TopicId[]): TopicId | null {
  const ranked = [...tags].sort((a, b) => rank(a) - rank(b))
  return ranked[0] ?? null
}

/**
 * What colours a thing first: an exam, then the practice areas (so a CAS
 * meeting is Property & Casualty's and an SOA one Life & Health's), then the
 * themes, and the broad buckets last.
 */
const LEAD_ORDER: readonly TopicId[] = ['pc', 'life-health', 'reforms', 'climate', 'ai-tech', 'credentials', 'careers', 'exams', 'events']

function rank(id: TopicId): number {
  if (topicById(id)?.parent) return -1
  const at = LEAD_ORDER.indexOf(id)
  return at === -1 ? LEAD_ORDER.length : at
}
