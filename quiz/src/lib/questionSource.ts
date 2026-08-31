import { getSittingPdfLink, type ExamPdfLink } from '@/data/examPdfLinks'
import { EXAM_LABEL_TO_ID } from './examIds'
import { normalizeSession, sittingLabel } from './pastExams'
import { contentPathFromVerification } from './verification'
import type { Question } from './parser'

/**
 * Where a question came from — the provenance behind the quiz's **info**
 * button (`components/QuestionInfoButton.tsx`).
 *
 * Two things a candidate reasonably wants to know mid-quiz, and neither is on
 * screen anywhere: which paper this question was actually sat on, and which
 * file in the vault it is authored in (so a wrong answer can be reported, read
 * or corrected against the source).
 *
 * Honesty rules, the same ones `data/examPdfLinks.ts` keeps:
 *
 *  - A sitting is *read off the frontmatter*, never inferred. A question with
 *    no `year` says so rather than being attributed to a paper.
 *  - The published paper is only offered for a sitting the link table actually
 *    holds. An exam-level document (the SOA sample set) is deliberately **not**
 *    offered as a fallback: it would read as "this question came from here",
 *    which nothing in the file says.
 *  - A question re-tagged onto another exam's syllabus (`originally_exam`)
 *    keeps its own paper. It was sat on the *original* exam — see
 *    `isFromAnotherExamsPaper` in `parser.ts`.
 */

/**
 * The bank labels an exam by its subject line — `"Probability"`, not
 * `"Exam P"` — because that is what the syllabus page is called. A sentence
 * about a *paper* wants the exam's name, so this maps one to the other and
 * leaves anything unmapped (the CAS labels are already exam names) alone.
 */
const EXAM_DISPLAY_NAMES: Record<string, string> = {
  'P': 'Exam P',
  'FM': 'Exam FM',
  'MAS-I': 'Exam MAS-I',
  'MAS-II': 'Exam MAS-II',
  'CAS-5': 'Exam 5',
}

export function examDisplayName(examLabel: string): string {
  const trimmed = examLabel.trim()
  const id = EXAM_LABEL_TO_ID[trimmed]
  return (id && EXAM_DISPLAY_NAMES[id]) || trimmed
}

export interface QuestionSource {
  /** The exam whose paper this question was sat on, e.g. `"Exam 5"`. */
  exam: string
  /** `"Fall 2013"`, or null when the frontmatter names no sitting. */
  sitting: string | null
  /** The two together: `"Exam 5 · Fall 2013"`, or just the exam. */
  label: string
  /** One sentence saying where the question came from. */
  detail: string
  /**
   * The exam the question now counts towards, when its paper belonged to a
   * different one — null in the ordinary case where they are the same exam.
   */
  movedTo: string | null
  /** Repo-relative vault path, e.g. `questions/exam-5/cas5-2013f-001.md`. */
  path: string | null
  /** That path's last segment, e.g. `cas5-2013f-001.md`. */
  fileName: string | null
  /** The paper the examining body published for this sitting, when known. */
  document: ExamPdfLink | null
}

export function questionSource(question: Question): QuestionSource {
  // The paper's exam, which is `originally_exam` when the syllabus has since
  // moved the material: the sitting date belongs to that exam's paper.
  const paperExamLabel = question.originally_exam?.trim() || question.exam
  const exam = examDisplayName(paperExamLabel)
  const currentExam = examDisplayName(question.exam)
  const movedTo = currentExam === exam ? null : currentExam

  const sitting = question.year ? sittingLabel(question.year, question.session) : null
  const path = contentPathFromVerification(question.verification)

  let detail: string
  if (sitting) {
    detail = `Sat on the ${exam} paper in ${sitting}.`
    if (movedTo) detail += ` The material is now on the ${movedTo} syllabus.`
  } else {
    detail = `A practice question for ${exam} — its file names no past sitting.`
  }

  return {
    exam,
    sitting,
    label: sitting ? `${exam} · ${sitting}` : exam,
    detail,
    movedTo,
    path,
    fileName: path ? (path.split('/').pop() ?? null) : null,
    // Keyed on the bank's own label, which is what the table uses, and on the
    // paper's exam rather than the question's current one. The session goes
    // through `normalizeSession` first — the bank writes `Sp` as well as
    // `Spring`, and the table only holds the spelled-out form.
    document: question.year
      ? getSittingPdfLink(paperExamLabel, question.year, normalizeSession(question.session))
      : null,
  }
}
