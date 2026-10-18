// The Tutor's unit of practice — an **item** (docs/tutor.md §5).
//
// Exam 5 is a written paper: a question is a table of given information and a
// few lettered parts worth a quarter of a point to two points each. Served
// whole it is a ten-minute commitment, the wrong size for "check yourself now",
// so an item is **one part**: the question's shared preamble, then that part's
// own prompt. An unlettered question is one item, and a multiple-choice
// question is one item graded on the click.
//
// Everything an item carries is read off the bank — nothing is authored here:
// which of the question's concepts the part is about (the ones its own words
// name), what kind of part it is (the command word of its instruction), what
// it is worth in minutes at the exam's pace, and the examiners' own feedback.

import type { AnswerOption, Difficulty, Question } from '../parser'
import { hasCriticalFinding } from '../verification'
import { slugForLink } from '../conceptMatch'
import { findConceptMentions } from '../conceptMentions'
import { minutesPerUnit, type TutorExam } from './exams'

/**
 * What a part asks a candidate to do. CAS gives points separately for working
 * a number, for saying what something is or why, and for choosing and
 * defending a course of action — and candidates lose them unevenly.
 */
export type PartKind = 'calculation' | 'explanation' | 'judgment'

export const PART_KIND_LABEL: Record<PartKind, string> = {
  calculation: 'Calculation',
  explanation: 'Explanation',
  judgment: 'Judgment',
}

export interface TutorItem {
  /** `<question id>#<part>` for a lettered part; the question id otherwise. */
  id: string
  questionId: string
  /** The part's letter, or null for a question served whole. */
  partLabel: string | null
  /** The bank's exam label. */
  exam: string
  /** The question's topic — its one human-readable name. */
  topic: string
  /** The question's shared preamble — the given information. */
  preamble: string
  /** The part's own prompt ('' for an unlettered question, whose prompt is the preamble). */
  prompt: string
  kind: PartKind
  /** Canonical concept names the part is about. */
  concepts: string[]
  /** Every concept the question is tagged with. */
  questionConcepts: string[]
  points: number
  /** Points at the exam's pace, never under a minute and a half. */
  minutes: number
  difficulty: Difficulty
  /** "Fall 2013", or null for an undated question. */
  sitting: string | null
  /** The answer line ('' when the examiners print none). */
  answerKey: string
  /** The sample answer(s) and working. */
  sampleAnswer: string
  /** The examiners' report on the part ('' when there is none). */
  examinerReport: string
  /** Choices, for a part graded on the click; [] for a written one. */
  options: AnswerOption[]
}

/** A written part has no options: the candidate marks it against the sample. */
export function isWritten(item: TutorItem): boolean {
  return item.options.length === 0
}

/** The fewest minutes an item is said to take — reading the preamble alone takes that. */
export const MIN_ITEM_MINUTES = 1.5

// The command words, by what they ask for. Read from the instruction sentence;
// a judgment word outranks a calculation word outranks an explanation word, so
// "Calculate … and recommend …" is a judgment and "Calculate … and briefly
// explain …" a calculation.
const JUDGMENT = /\b(recommend|justify|evaluate|assess|critique|argue|propose|select|choose|decide|support|which)\b/
const CALCULATION = /\b(calculate|determine|estimate|compute|construct|develop|derive|quantify|project|create|build|complete|prepare|produce|demonstrate|show)\b/
const EXPLANATION = /\b(explain|discuss|describe|identify|define|state|list|give|provide|name|outline|summarize|summarise|contrast|compare|differentiate|distinguish|interpret|comment|why)\b/

function sentences(text: string): string[] {
  return text
    // A table row is data, not an instruction.
    .split('\n')
    .filter(line => !/^\s*\|/.test(line))
    .join('\n')
    .split(/(?<=[.?!:])\s+|\n+/)
    .map(s => s.trim())
    .filter(Boolean)
}

function kindOf(text: string): PartKind | null {
  for (const sentence of sentences(text).reverse()) {
    const lower = sentence.toLowerCase()
    if (JUDGMENT.test(lower)) return 'judgment'
    if (CALCULATION.test(lower)) return 'calculation'
    if (EXPLANATION.test(lower)) return 'explanation'
  }
  return null
}

/**
 * What a part asks for, from the command word of its instruction — the last
 * sentence that has one. A part with none ("A very long-tailed line of
 * business.") is answering the preamble's instruction, so it takes the
 * preamble's kind; with none there either, it is written prose: an explanation.
 */
export function partKind(prompt: string, preamble = ''): PartKind {
  return kindOf(prompt) ?? kindOf(preamble) ?? 'explanation'
}

/** A question's concepts, as the mastery rows key them (`quizStore`'s rule). */
export function questionConcepts(question: Pick<Question, 'wiki_link'>): string[] {
  const names = new Set<string>()
  for (const link of question.wiki_link) {
    const slug = slugForLink(link)
    if (slug) names.add(slug)
  }
  return [...names]
}

/**
 * The concepts a part is about: those of the question's that its own words —
 * prompt, answer and sample answer — name. A part that names none of them is
 * about all of them, which is what the question's tags say.
 */
export function partConcepts(names: readonly string[], ...texts: string[]): string[] {
  const found = new Set(findConceptMentions(texts.join('\n\n'), names).map(m => m.name))
  const named = names.filter(n => found.has(n))
  return named.length > 0 ? named : [...names]
}

function sittingOf(question: Question): string | null {
  if (!question.year) return null
  return question.session ? `${question.session} ${question.year}` : String(question.year)
}

/** Whether the Tutor may serve this question at all. */
export function isServable(question: Question, exam: TutorExam): boolean {
  if (question.exam !== exam.label) return false
  if (question.off_syllabus) return false
  // An open critical finding keeps a question out of every quiz; it stays out
  // of the Tutor too (lib/verification.ts).
  if (hasCriticalFinding(question.verification)) return false
  return true
}

function itemMinutes(points: number, exam: TutorExam): number {
  const units = exam.pace.per === 'point' ? (points > 0 ? points : 1) : 1
  return Math.max(MIN_ITEM_MINUTES, Math.round(units * minutesPerUnit(exam) * 10) / 10)
}

/** One question's items. */
export function itemsForQuestion(question: Question, exam: TutorExam): TutorItem[] {
  const tagged = questionConcepts(question)
  if (tagged.length === 0) return []
  const base = {
    questionId: question.id,
    exam: question.exam,
    topic: question.topic,
    questionConcepts: tagged,
    difficulty: question.difficulty,
    sitting: sittingOf(question),
  }

  if (question.type !== 'multi-part') {
    return [{
      ...base,
      id: question.id,
      partLabel: null,
      preamble: '',
      prompt: question.stem,
      kind: question.type === 'multiple-choice' ? kindOf(question.stem) ?? 'explanation' : partKind(question.stem),
      concepts: tagged,
      points: question.points,
      minutes: itemMinutes(question.points, exam),
      answerKey: question.answer,
      sampleAnswer: question.explanation,
      examinerReport: question.examiner_report ?? '',
      options: question.options,
    }]
  }

  const parts = question.parts ?? []
  // An unlettered question parses as one implicit part with an empty stem:
  // its prompt is the preamble, and it is served whole under the question's id.
  const whole = parts.length === 1 && parts[0].stem === ''
  return parts.map(part => {
    const prompt = whole ? question.stem : part.stem
    return {
      ...base,
      id: whole ? question.id : `${question.id}#${part.label}`,
      partLabel: whole ? null : part.label,
      preamble: whole ? '' : question.stem,
      prompt,
      kind: whole ? partKind(prompt) : partKind(prompt, question.stem),
      concepts: partConcepts(tagged, prompt, part.answer, part.explanation),
      points: part.points > 0 ? part.points : question.points,
      minutes: itemMinutes(part.points > 0 ? part.points : question.points, exam),
      answerKey: part.answer,
      sampleAnswer: part.explanation,
      examinerReport: part.examiner_report ?? '',
      options: part.options,
    }
  })
}

/** Every item the Tutor can serve for an exam, in bank order. */
export function buildItems(questions: readonly Question[], exam: TutorExam): TutorItem[] {
  const out: TutorItem[] = []
  for (const q of questions) {
    if (isServable(q, exam)) out.push(...itemsForQuestion(q, exam))
  }
  return out
}

/** Items by concept (lowercased), each concept's in bank order. */
export function itemsByConcept(items: readonly TutorItem[]): Map<string, TutorItem[]> {
  const map = new Map<string, TutorItem[]>()
  for (const item of items) {
    for (const c of item.concepts) {
      const key = c.toLowerCase()
      const list = map.get(key)
      if (list) list.push(item)
      else map.set(key, [item])
    }
  }
  return map
}

/** Whether a self-grade is right for the auto-graded choice, for a part with options. */
export function choiceIsCorrect(item: TutorItem, choice: string): boolean {
  return item.options.length > 0 && choice === item.answerKey
}
