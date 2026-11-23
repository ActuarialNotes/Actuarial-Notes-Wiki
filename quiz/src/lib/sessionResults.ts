/**
 * What the results screen says (docs/redesign-spec.md §5.3), as data: the
 * questions to fix, the concepts that levelled up, which of those earn the
 * full-screen ceremony, and the mastery records as they stood before the quiz
 * (for the syllabus bar's gain). Pure; `pages/Review.tsx` draws it.
 */

import type { AnswerState } from './answerState'
import type { ConceptMasteryRecord, MasteryState } from './mastery'
import { questionPreview } from './questionPreview'
import { conceptKey } from './similarQuestion'

const RANK: Record<MasteryState, number> = { new: 0, forgotten: 0, level1: 1, level2: 2, level3: 3 }

export interface LevelMove {
  conceptSlug: string
  examId?: string
  from: MasteryState
  to: MasteryState
  /** This move is what collected the concept's card. */
  collected?: boolean
}

/** A move up the ladder: to Level 1, 2 or 3 from somewhere lower. */
export function isLevelUp(move: Pick<LevelMove, 'from' | 'to'>): boolean {
  return RANK[move.to] > RANK[move.from]
}

/** The results' "Levelled up" rows: every move up, in the order the quiz produced them. */
export function levelledUp<T extends LevelMove>(transitions: readonly T[] | undefined): T[] {
  return (transitions ?? []).filter(isLevelUp)
}

/**
 * The moves the full-screen ceremony plays for: a card collected for the first
 * time, or a concept reaching Level 3. Every other move is a row on the
 * results and nothing more.
 */
export function ceremonyMoves<T extends LevelMove>(transitions: readonly T[] | undefined): T[] {
  return levelledUp(transitions).filter(t => t.collected === true || t.to === 'level3')
}

/** A concept's name as a page shows it, from a `wiki_link` entry or a slug. */
export function conceptName(link: string): string {
  const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
  return clean.split('/').filter(Boolean).pop()?.trim() ?? ''
}

// ── To fix ───────────────────────────────────────────────────────────────────

interface Askable {
  id: string
  stem: string
  wiki_link: readonly string[]
  topic?: string
  parts?: { label: string; stem: string }[]
}

export interface FixRow<Q> {
  question: Q
  /** Its place in the quiz, from 0. */
  index: number
  state: AnswerState
  /** The concept the row is named for: the question's first tag, else its topic. */
  concept: string
  /** One line of the question. */
  line: string
}

/**
 * What a question asks, in one line: its last sentence, where a stem puts the
 * instruction ("Calculate the probability…"), cut to fit a row.
 */
export function askLine(question: Pick<Askable, 'stem' | 'parts'>, maxChars = 110): string {
  const flat = questionPreview({ stem: question.stem, parts: question.parts }, '', 2000)
  const sentences = flat.split(/(?<=[.?!:])\s+(?=[A-Z(])/).map(s => s.trim()).filter(Boolean)
  // A closing fragment ("…") or a bare label isn't the ask; step back to a real sentence.
  let ask = flat
  for (let i = sentences.length - 1; i >= 0; i--) {
    if (sentences[i].replace(/[^A-Za-z]/g, '').length >= 12) { ask = sentences[i]; break }
  }
  if (ask.length <= maxChars) return ask
  const cut = ask.slice(0, maxChars)
  const space = cut.lastIndexOf(' ')
  return `${(space > maxChars * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.]+$/, '')}…`
}

/** The row's concept: the first tag, or the topic for a question with none. */
export function rowConcept(question: Pick<Askable, 'wiki_link' | 'topic'>): string {
  for (const link of question.wiki_link) {
    const name = conceptName(link)
    if (name) return name
  }
  return question.topic ?? ''
}

/** Rows for the questions with the given states, in the order asked. */
export function resultRows<Q extends Askable>(
  questions: readonly Q[],
  states: readonly AnswerState[],
  keep: (state: AnswerState) => boolean,
): FixRow<Q>[] {
  const rows: FixRow<Q>[] = []
  questions.forEach((question, index) => {
    const state = states[index]
    if (state === undefined || !keep(state)) return
    rows.push({ question, index, state, concept: rowConcept(question), line: askLine(question) })
  })
  return rows
}

/** Everything short of full credit: missed, partial or unanswered. */
export function toFix(state: AnswerState): boolean {
  return state !== 'correct'
}

// ── The syllabus gain ────────────────────────────────────────────────────────

/**
 * The mastery records as they stood before the quiz: each concept the quiz
 * moved put back where it started. A concept that started New has no record.
 * The restored records are stamped `nowIso` so reading them doesn't decay them
 * a second time (`from` is already the level as it read when the quiz began).
 */
export function recordsBefore(
  records: readonly ConceptMasteryRecord[],
  transitions: readonly LevelMove[] | undefined,
  nowIso: string,
): ConceptMasteryRecord[] {
  const moved = new Map<string, LevelMove>()
  for (const t of transitions ?? []) moved.set(conceptKey(t.conceptSlug), t)
  if (moved.size === 0) return [...records]
  const out: ConceptMasteryRecord[] = []
  for (const record of records) {
    const move = moved.get(conceptKey(record.concept_slug))
    if (!move || (move.examId && move.examId !== record.exam_id)) {
      out.push(record)
      continue
    }
    if (move.from === 'new') continue
    out.push({ ...record, state: move.from, last_correct_at: nowIso })
  }
  return out
}

/** The bar's figures: where the syllabus stands, and how far this quiz moved it up. */
export function syllabusGain(beforePct: number, afterPct: number): { pct: number; gain: number } {
  const pct = Math.round(afterPct)
  return { pct, gain: Math.max(0, pct - Math.round(beforePct)) }
}

/** "23 min", "45 sec", "1 hr 5 min": the time a quiz took. */
export function timeTaken(seconds: number | null | undefined): string | null {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return null
  if (seconds < 60) return `${Math.round(seconds)} sec`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`
}
