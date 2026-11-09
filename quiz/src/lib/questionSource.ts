import { getSittingPdfLink, type ExamPdfLink } from '@/data/examPdfLinks'
import { EXAM_LABEL_TO_ID } from './examIds'
import { normalizeSession, paperQuestionNumber, sittingLabel } from './pastExams'
import { isVaultQuestionId, questionPublisher } from './questionPublisher'
import { formatClock, paceForExam, secondsPerUnit } from './quizTiming'
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
  'FAM': 'Exam FAM',
  'SRM': 'Exam SRM',
  'ASTAM': 'Exam ASTAM',
  'ALTAM': 'Exam ALTAM',
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
    // No sitting: say who wrote it rather than attributing it to a paper.
    const publisher = questionPublisher(question)
    detail = publisher === 'Actuarial Notes'
      ? `Written for Actuarial Notes. It isn’t from a past ${exam} paper.`
      : publisher === 'SOA'
        ? `From the SOA’s sample questions for ${exam}. It isn’t from a past paper.`
        : `A practice question for ${exam}. It isn’t from a past paper.`
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

/**
 * The question's own name, the title of its Info popup: its number on the
 * paper it was sat on ("Question 3") — read off the id, where the converters
 * record the paper's order (`-q3`, or a sitting's trailing `-003`) — or the
 * number of a publisher's sample ("Sample question 12"). A question with no
 * number to read (the vault's own) is just "Practice question".
 */
export function questionTitle(question: Pick<Question, 'id' | 'year'>): string {
  if (isVaultQuestionId(question.id)) return 'Practice question'
  const n = paperQuestionNumber(question.id) ?? trailingNumber(question.id)
  if (n === null) return 'Practice question'
  return question.year ? `Question ${n}` : `Sample question ${n}`
}

function trailingNumber(id: string): number | null {
  const match = /-(\d+)$/.exec(id)
  return match ? Number(match[1]) : null
}

/** One figure of the Info popup's strip. */
export interface QuestionFigure {
  key: 'points' | 'paper' | 'time' | 'format'
  value: string
  label?: string
}

const FORMAT_FIGURE: Record<Question['type'], { value: string; label: string }> = {
  'multiple-choice': { value: 'Multiple', label: 'choice' },
  'free-entry': { value: 'Short', label: 'answer' },
  'multi-part': { value: 'Written', label: 'answer' },
}

/**
 * The figures the Info popup's banner carries, each only where it is known:
 * the question's points (none printed, none shown); the paper's points, for a
 * question sat on a paper paced by the point; the time the question gets at its
 * exam's pace (`quizTiming.ts` — nothing for an exam with no pace, or a
 * point-paced question with no points); and its format.
 */
export function questionFigures(
  question: Pick<Question, 'exam' | 'originally_exam' | 'year' | 'points' | 'type'>,
): QuestionFigure[] {
  const figures: QuestionFigure[] = []
  if (question.points > 0) {
    figures.push({ key: 'points', value: String(question.points), label: question.points === 1 ? 'point' : 'points' })
  }
  const paperPace = paceForExam(question.originally_exam?.trim() || question.exam)
  if (question.year && paperPace?.per === 'point') {
    figures.push({ key: 'paper', value: String(paperPace.units), label: 'points on the paper' })
  }
  const pace = paceForExam(question.exam)
  if (pace && (pace.per === 'question' || question.points > 0)) {
    const units = pace.per === 'point' ? question.points : 1
    figures.push({ key: 'time', value: formatAllowance(Math.round(units * secondsPerUnit(pace))) })
  }
  figures.push({ key: 'format', ...FORMAT_FIGURE[question.type] })
  return figures
}

/** "30 min" for whole minutes, else the clock ("4:22"). */
export function formatAllowance(seconds: number): string {
  return seconds >= 60 && seconds % 60 === 0 ? `${seconds / 60} min` : formatClock(seconds)
}
