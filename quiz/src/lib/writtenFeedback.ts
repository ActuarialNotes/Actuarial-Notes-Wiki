// **Written answers across attempts** (Analytics' Written answers section,
// docs/answer-checking.md "Feedback across attempts").
//
// The reader's own grades on written parts (`written_part_grades`, written by
// lib/writtenGrades.ts) read against the question bank: which kinds of part
// and which command words lose them points over a span of days, and, for one
// of those, the parts lost — each with every attempt at it and the examiners'
// sentences about where candidates lost credit on that part, word for word
// (`lossPassages`, the Tutor's reader of the report).
//
// Nothing about a part is stored with its grade: its kind, command word,
// prompt and report are read here off the bank as it is now. A row whose
// question or part has left the bank is dropped.

import type { Question, SelfGrade } from './parser'
import { commandWord, partKind, PART_KIND_LABEL, type PartKind } from './tutor/items'
import { lossPassages } from './tutor/examinerNotes'
import { dayDiff } from './accuracyTrend'
import { localDayKey } from './streak'
import { stemPreview } from './questionPreview'

export { WRITTEN_FEEDBACK_EXAMS, hasWrittenFeedback } from './writtenGrades'

/** A row as the section reads it. */
export interface GradeRecord {
  question_id: string
  part_label: string | null
  grade: SelfGrade
  points: number
  graded_at: string
}

/** Fewest attempts a command word needs for a row of its own; fewer go under Other. */
export const MIN_WORD_ATTEMPTS = 3
/** How many of a row's latest grades are drawn as dots. */
export const RECENT_DOTS = 5
/** The row for the command words with too few attempts, and parts that name none. */
export const OTHER_WORD = 'Other'

const KIND_ORDER: readonly PartKind[] = ['calculation', 'explanation', 'judgment']

export function creditOf(grade: SelfGrade): number {
  return grade === 'correct' ? 1 : grade === 'partial' ? 0.5 : 0
}

/** What a part is, read off the bank. */
export interface PartFacts {
  /** `<question id>#<part>`, or the question id. */
  key: string
  questionId: string
  partLabel: string | null
  kind: PartKind
  word: string | null
  /** The part's instruction, short and flat. */
  prompt: string
  sitting: string | null
  examinerReport: string
}

export function partKey(questionId: string, partLabel: string | null): string {
  return partLabel ? `${questionId}#${partLabel}` : questionId
}

function sittingOf(q: Question): string | null {
  if (!q.year) return null
  return q.session ? `${q.session} ${q.year}` : String(q.year)
}

/** A graded part's facts, or null when the bank no longer has it. */
export function partFacts(q: Question, partLabel: string | null): PartFacts | null {
  const base = { key: partKey(q.id, partLabel), questionId: q.id, partLabel, sitting: sittingOf(q) }
  if (q.type === 'multi-part') {
    const parts = q.parts ?? []
    const whole = parts.length === 1 && parts[0].stem === ''
    const part = partLabel === null ? (whole ? parts[0] : null) : parts.find(p => p.label === partLabel)
    if (!part) return null
    const own = whole || partLabel === null ? q.stem : part.stem
    const preamble = whole || partLabel === null ? '' : q.stem
    return {
      ...base,
      kind: partKind(own, preamble),
      word: commandWord(own, preamble),
      prompt: stemPreview(own || q.stem, 160),
      examinerReport: part.examiner_report ?? '',
    }
  }
  if (partLabel !== null) return null
  return {
    ...base,
    kind: partKind(q.stem),
    word: commandWord(q.stem),
    prompt: stemPreview(q.stem, 160),
    examinerReport: q.examiner_report ?? '',
  }
}

interface Resolved extends GradeRecord {
  facts: PartFacts
  /** Days before today, 0 for today. */
  ago: number
  weight: number
}

function resolve(
  rows: readonly GradeRecord[],
  questions: ReadonlyMap<string, Question>,
  today: string,
  dayOf: (iso: string) => string,
): Resolved[] {
  const cache = new Map<string, PartFacts | null>()
  const out: Resolved[] = []
  for (const r of rows) {
    const key = partKey(r.question_id, r.part_label)
    let facts = cache.get(key)
    if (facts === undefined) {
      const q = questions.get(r.question_id)
      facts = q ? partFacts(q, r.part_label) : null
      cache.set(key, facts)
    }
    if (!facts) continue
    const ago = dayDiff(dayOf(r.graded_at), today)
    if (ago < 0) continue
    out.push({ ...r, facts, ago, weight: r.points > 0 ? r.points : 1 })
  }
  // Oldest first, so "recent" and an attempt history read left to right.
  return out.sort((a, b) => a.graded_at.localeCompare(b.graded_at))
}

/** Points kept, 0–100, or null with nothing graded. */
function keptPercent(rows: readonly Resolved[]): number | null {
  let earned = 0
  let total = 0
  for (const r of rows) {
    total += r.weight
    earned += r.weight * creditOf(r.grade)
  }
  return total > 0 ? Math.round((earned / total) * 100) : null
}

function pointsLost(rows: readonly Resolved[]): number {
  return rows.reduce((n, r) => n + r.weight * (1 - creditOf(r.grade)), 0)
}

export interface GroupRow {
  /** A `PartKind`, or a command word. */
  key: string
  label: string
  attempts: number
  /** Points kept, 0–100; null with no attempts. */
  kept: number | null
  /** Points lost over the span, weighted as the paper weights its parts. */
  lost: number
  /** The latest grades, oldest first, at most `RECENT_DOTS`. */
  recent: SelfGrade[]
}

function group(key: string, label: string, rows: readonly Resolved[]): GroupRow {
  return {
    key,
    label,
    attempts: rows.length,
    kept: keptPercent(rows),
    lost: pointsLost(rows),
    recent: rows.slice(-RECENT_DOTS).map(r => r.grade),
  }
}

export interface WrittenSummary {
  span: number
  attempts: number
  /** Points kept over the span, 0–100. */
  kept: number | null
  /** Points kept over the span before it, when there were attempts then. */
  keptBefore: number | null
  byKind: GroupRow[]
  /** Command words by points lost, most first; `OTHER_WORD` last. */
  byWord: GroupRow[]
}

export interface SpanOptions {
  span: number
  /** The local day an ISO timestamp falls on; the browser's by default. */
  dayOf?: (iso: string) => string
}

const defaultDay = (iso: string) => localDayKey(new Date(iso))

/** The section's figures for one span. */
export function writtenSummary(
  rows: readonly GradeRecord[],
  questions: ReadonlyMap<string, Question>,
  today: string,
  { span, dayOf = defaultDay }: SpanOptions,
): WrittenSummary {
  const all = resolve(rows, questions, today, dayOf)
  const inSpan = all.filter(r => r.ago < span)
  const before = all.filter(r => r.ago >= span && r.ago < span * 2)

  const byKind = KIND_ORDER.map(kind => group(kind, PART_KIND_LABEL[kind], inSpan.filter(r => r.facts.kind === kind)))

  const words = new Map<string, Resolved[]>()
  for (const r of inSpan) {
    const w = r.facts.word ?? OTHER_WORD
    const list = words.get(w)
    if (list) list.push(r)
    else words.set(w, [r])
  }
  const named: GroupRow[] = []
  const other: Resolved[] = []
  for (const [word, list] of words) {
    if (word !== OTHER_WORD && list.length >= MIN_WORD_ATTEMPTS) named.push(group(word, word, list))
    else other.push(...list)
  }
  named.sort((a, b) => b.lost - a.lost || b.attempts - a.attempts || a.label.localeCompare(b.label))
  if (other.length > 0) {
    other.sort((a, b) => a.graded_at.localeCompare(b.graded_at))
    named.push(group(OTHER_WORD, OTHER_WORD, other))
  }

  return {
    span,
    attempts: inSpan.length,
    kept: keptPercent(inSpan),
    keptBefore: keptPercent(before),
    byKind,
    byWord: named,
  }
}

export interface Attempt {
  grade: SelfGrade
  at: string
}

export interface LostPart {
  facts: PartFacts
  /** Every attempt the rows hold, oldest first — before the span too. */
  attempts: Attempt[]
  /** The examiners' sentences on where candidates lost credit on this part. */
  notes: string[]
}

/** Which rows a group stands for. */
export type GroupFilter = { kind: PartKind } | { word: string; named: readonly string[] }

function inGroup(facts: PartFacts, filter: GroupFilter): boolean {
  if ('kind' in filter) return facts.kind === filter.kind
  if (filter.word === OTHER_WORD) return facts.word === null || !filter.named.includes(facts.word)
  return facts.word === filter.word
}

/**
 * The parts a group lost credit on over the span: any part graded below Full
 * there, with its whole history and the report's lost-credit sentences, the
 * part attempted last first.
 */
export function lostParts(
  rows: readonly GradeRecord[],
  questions: ReadonlyMap<string, Question>,
  today: string,
  filter: GroupFilter,
  { span, dayOf = defaultDay }: SpanOptions,
): LostPart[] {
  const all = resolve(rows, questions, today, dayOf).filter(r => inGroup(r.facts, filter))
  const byPart = new Map<string, Resolved[]>()
  for (const r of all) {
    const list = byPart.get(r.facts.key)
    if (list) list.push(r)
    else byPart.set(r.facts.key, [r])
  }
  const out: { part: LostPart; last: string }[] = []
  for (const list of byPart.values()) {
    if (!list.some(r => r.ago < span && r.grade !== 'correct')) continue
    const facts = list[0].facts
    out.push({
      part: {
        facts,
        attempts: list.map(r => ({ grade: r.grade, at: r.graded_at })),
        notes: facts.examinerReport ? lossPassages(facts.examinerReport) : [],
      },
      last: list[list.length - 1].graded_at,
    })
  }
  return out.sort((a, b) => b.last.localeCompare(a.last)).map(o => o.part)
}

/** The named command words of a summary, for an Other row's filter. */
export function namedWords(summary: WrittenSummary): string[] {
  return summary.byWord.filter(r => r.key !== OTHER_WORD).map(r => r.key)
}

/**
 * The headline's comparison with the span before: "up from 41%", "down from
 * 60%", "the same as the 30 days before"; null with nothing graded then.
 */
export function keptChange(summary: Pick<WrittenSummary, 'kept' | 'keptBefore' | 'span'>): string | null {
  const { kept, keptBefore, span } = summary
  if (kept === null || keptBefore === null) return null
  if (kept === keptBefore) return `the same as the ${span} days before`
  return `${kept > keptBefore ? 'up' : 'down'} from ${keptBefore}%`
}
