// **Written-part grades, as rows** (`written_part_grades`, docs/answer-checking.md
// "Feedback across attempts").
//
// A quiz keeps the reader's self-grades in `manualGrades`, keyed
// `<question id>__<part label>` for a lettered part and by the question id for
// a free-entry question. `question_responses` keeps one `is_correct` a
// question, so a part's own grade went nowhere. This module turns a finished
// set of answers into one row per self-graded part, which is what Analytics'
// Written answers section reads back (lib/writtenFeedback.ts).
//
// Only what was marked is kept: a part graded on the click (multiple choice)
// or by a matched answer line, and a written part left ungraded, are not rows.
// The suggested grade is what the answer checks said when the reader marked
// it (`suggestedGrade`), recomputed here from the same inputs the grade
// buttons used — the answer, the part, the checklist's ticks.

import type { Part, Question, SelfGrade } from './parser'
import type { ChecklistTicks } from './essayChecklist'

/**
 * The exams Analytics' Written answers section is drawn for: the CAS's written
 * papers. Grades are kept for every exam; only these are shown.
 */
export const WRITTEN_FEEDBACK_EXAMS: readonly string[] = ['Exam 5', 'Exam 6C', 'Exam 7', 'Exam 8', 'Exam 9']

export function hasWrittenFeedback(examLabel: string | null | undefined): boolean {
  return !!examLabel && WRITTEN_FEEDBACK_EXAMS.includes(examLabel)
}

export type WrittenSource = 'quiz' | 'review' | 'page' | 'tutor'

/** A row before it is given its owner, session and time. */
export interface WrittenGradeDraft {
  question_id: string
  part_label: string | null
  exam: string
  grade: SelfGrade
  suggested: SelfGrade | null
  points: number
}

/** A row as the table holds it. */
export interface WrittenGradeRow extends WrittenGradeDraft {
  user_id: string
  session_id: string | null
  source: WrittenSource
  graded_at: string
}

/** The answer checks, as `lib/answerChecks.ts` exports them; passed in so the rows stay off its chunk. */
export interface GradeChecks {
  checkNumericAnswer: (response: string, part: Pick<Part, 'stem' | 'answer' | 'explanation'>) => { suggestion: SelfGrade | null } | null
  partChecklist: (part: Pick<Part, 'stem' | 'answer' | 'explanation' | 'examiner_report'>) => unknown
  checklistSuggestion: (list: never, ticks: ChecklistTicks) => { suggestion: SelfGrade } | null
}

/**
 * What the grade buttons suggested for a part: the final figure checked
 * against the answer line or the sample's last figure first, else the
 * checklist's ticks — the order `QuestionCard` and `GradePartsDialog` use.
 * A part asked by the preamble alone is checked with the preamble as its stem.
 */
export function suggestedGrade(
  checks: GradeChecks,
  part: Pick<Part, 'stem' | 'answer' | 'explanation' | 'examiner_report'>,
  questionStem: string,
  answer: string,
  ticks: ChecklistTicks = {},
): SelfGrade | null {
  const asked = part.stem ? part : { ...part, stem: questionStem }
  const figure = checks.checkNumericAnswer(answer, asked)
  if (figure) return figure.suggestion
  const list = checks.partChecklist(asked)
  if (!list) return null
  return checks.checklistSuggestion(list as never, ticks)?.suggestion ?? null
}

function chosenParts(chosen: string | undefined): Record<string, string> {
  if (!chosen) return {}
  try {
    const parsed = JSON.parse(chosen) as unknown
    return parsed && typeof parsed === 'object' ? parsed as Record<string, string> : {}
  } catch {
    return {}
  }
}

export interface DraftOptions {
  /** The answer checks, when loaded; without them no grade is suggested. */
  checks?: GradeChecks | null
  /** A part's checklist ticks, by `<question id>:<part label>` (`checklistKey`). */
  ticks?: Record<string, ChecklistTicks>
  /**
   * A free-entry question that stands for one part of a real question (the
   * Tutor banks a part that way): its part label, by question id.
   */
  partLabels?: Record<string, string | null>
}

/** One row per self-graded part of the answered questions, in the order served. */
export function writtenGradeDrafts(
  questions: readonly Question[],
  responses: Record<string, { chosen: string } | undefined>,
  manualGrades: Record<string, SelfGrade>,
  options: DraftOptions = {},
): WrittenGradeDraft[] {
  const { checks = null, ticks = {}, partLabels = {} } = options
  const out: WrittenGradeDraft[] = []
  for (const q of questions) {
    const chosen = responses[q.id]?.chosen
    if (chosen === undefined) continue
    if (q.type === 'multi-part') {
      const answers = chosenParts(chosen)
      for (const part of q.parts ?? []) {
        if (part.type === 'multiple-choice') continue
        const grade = manualGrades[`${q.id}__${part.label}`]
        if (!grade) continue
        // An unlettered question parses as one part 'a' with an empty stem.
        const whole = (q.parts?.length ?? 0) === 1 && part.stem === ''
        out.push({
          question_id: q.id,
          part_label: whole ? null : part.label,
          exam: q.exam,
          grade,
          suggested: checks ? suggestedGrade(checks, part, q.stem, answers[part.label] ?? '', ticks[`${q.id}:${part.label}`]) : null,
          points: part.points > 0 ? part.points : q.points,
        })
      }
      continue
    }
    if (q.type !== 'free-entry') continue
    const grade = manualGrades[q.id]
    if (!grade) continue
    out.push({
      question_id: q.id,
      part_label: q.id in partLabels ? partLabels[q.id] : null,
      exam: q.exam,
      grade,
      suggested: null,
      points: q.points,
    })
  }
  return out
}

/** The drafts as the table's rows. */
export function writtenGradeRows(
  drafts: readonly WrittenGradeDraft[],
  owner: { userId: string; sessionId: string | null; source: WrittenSource; at: string },
): WrittenGradeRow[] {
  return drafts.map(d => ({
    ...d,
    user_id: owner.userId,
    session_id: owner.sessionId,
    source: owner.source,
    graded_at: owner.at,
  }))
}
