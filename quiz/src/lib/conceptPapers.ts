// **A concept on the past papers** (roadmap L22, L23): how often it was tested,
// and what the examiners said candidates got wrong on it.
//
// Both are read off the question bank as it is. Nothing here is authored and
// no vault file is touched, so no page's fact check goes stale.
//
// L22, the count. A dated question is a question from a released paper, and
// the paper is the one it was sat on: `originally_exam` when the syllabus has
// since moved the material (Exam 7's ERM questions, now Exam 9's). The papers
// are counted per exam, as a **series**: every sitting of that exam the bank
// holds is a paper, and the concept is on a paper when a question from it is
// filed under the concept. Only the papers in the bank are counted, and the
// screen says how many those are. A question no current exam covers
// (`off_syllabus`) and one withheld by an open critical finding are left out
// of the concept's count, though their paper still counts as a paper.
//
// L23, the notes. The Tutor's reader (`lossPassages`) picks the lost-credit
// sentences out of an examiner's report, verbatim. A part's report is about
// this concept when the part is: `partConcepts`, the Tutor's own rule.

import type { Question } from './parser'
import { hasCriticalFinding } from './verification'
import { partConcepts, questionConcepts } from './tutor/items'
import { lossPassages } from './tutor/examinerNotes'

export interface PaperMark {
  /** "Fall 2019", or the year alone when the files name no session. */
  sitting: string
  year: number
  /** Ids of the concept's questions on this paper, in paper order; [] when it wasn't on it. */
  questionIds: string[]
}

export interface PaperSeries {
  /** The exam whose papers these are, as the bank labels it ("Exam 5"). */
  exam: string
  /** Every paper of the exam the bank holds, oldest first. */
  papers: PaperMark[]
  /** How many of them the concept is on. */
  on: number
  /** How many questions that is. */
  questions: number
  /** The latest paper it is on. */
  last: string
  /** The median points of those questions; null where every one is a single mark. */
  typicalPoints: number | null
}

export interface ConceptNote {
  questionId: string
  /** The part's letter, or null for a question with no lettered parts. */
  part: string | null
  /** The paper's exam, as the bank labels it. */
  exam: string
  /** "Fall 2019"; null for an undated question. */
  sitting: string | null
  year: number
  /** The report's own words, in report order. */
  passages: string[]
}

const SESSION_ORDER: Record<string, number> = { spring: 0, fall: 1 }

function sessionRank(session: string | undefined): number {
  return SESSION_ORDER[session?.trim().toLowerCase() ?? ''] ?? 0
}

function sittingLabel(q: Pick<Question, 'year' | 'session'>): string {
  const session = q.session?.trim()
  return session ? `${session} ${q.year}` : String(q.year)
}

/** The exam whose paper a question was sat on. */
export function paperExam(q: Pick<Question, 'exam' | 'originally_exam'>): string {
  return q.originally_exam?.trim() || q.exam
}

function isAbout(q: Pick<Question, 'wiki_link'>, concept: string): boolean {
  const needle = concept.toLowerCase()
  return questionConcepts(q).some(name => name.toLowerCase() === needle)
}

/** A question the concept's figures may rest on: served, and on a current syllabus. */
function counts(q: Question): boolean {
  return !q.off_syllabus && !hasCriticalFinding(q.verification)
}

function paperNumber(id: string): number {
  const m = id.match(/(\d+)(?!.*\d)/)
  return m ? Number(m[1]) : 0
}

/** The middle value, the lower of the two for an even count, so it is always a real question's points. */
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[(sorted.length - 1) >> 1]
}

/**
 * The past papers a concept was on, one series per exam whose papers tested
 * it, the series it is on most first. Empty when no dated question is filed
 * under the concept.
 */
export function conceptPaperSeries(questions: readonly Question[], concept: string): PaperSeries[] {
  const hits = questions.filter(q => q.year && counts(q) && isAbout(q, concept))
  if (hits.length === 0) return []
  const exams = new Set(hits.map(paperExam))

  const series: PaperSeries[] = []
  for (const exam of exams) {
    // Every paper of this exam the bank holds, whatever its questions are filed under today.
    const papers = new Map<string, PaperMark & { rank: number }>()
    for (const q of questions) {
      if (!q.year || paperExam(q) !== exam) continue
      const sitting = sittingLabel(q)
      if (!papers.has(sitting)) {
        papers.set(sitting, { sitting, year: q.year, questionIds: [], rank: q.year * 2 + sessionRank(q.session) })
      }
    }
    const mine = hits.filter(q => paperExam(q) === exam)
    for (const q of mine) papers.get(sittingLabel(q))!.questionIds.push(q.id)

    const ordered = [...papers.values()].sort((a, b) => a.rank - b.rank)
    for (const p of ordered) p.questionIds.sort((a, b) => paperNumber(a) - paperNumber(b))
    const on = ordered.filter(p => p.questionIds.length > 0)
    const points = mine.map(q => q.points).filter(p => p > 0)
    series.push({
      exam,
      papers: ordered.map(({ sitting, year, questionIds }) => ({ sitting, year, questionIds })),
      on: on.length,
      questions: mine.length,
      last: on[on.length - 1].sitting,
      typicalPoints: points.length > 0 && points.some(p => p !== 1) ? median(points) : null,
    })
  }
  return series.sort((a, b) => b.on - a.on || a.exam.localeCompare(b.exam))
}

/**
 * What the examiners' reports say candidates got wrong on a concept: one note
 * per part that is about it and whose report has such a sentence, the newest
 * paper first.
 */
export function conceptExaminerNotes(questions: readonly Question[], concept: string): ConceptNote[] {
  const needle = concept.toLowerCase()
  const notes: (ConceptNote & { rank: number })[] = []
  for (const q of questions) {
    if (!counts(q) || !isAbout(q, concept)) continue
    const base = {
      questionId: q.id,
      exam: paperExam(q),
      sitting: q.year ? sittingLabel(q) : null,
      year: q.year ?? 0,
      rank: (q.year ?? 0) * 2 + sessionRank(q.session),
    }
    const add = (part: string | null, report: string | undefined) => {
      const passages = report ? lossPassages(report) : []
      if (passages.length > 0) notes.push({ ...base, part, passages })
    }
    if (q.type !== 'multi-part') {
      add(null, q.examiner_report)
      continue
    }
    const parts = q.parts ?? []
    const whole = parts.length === 1 && parts[0].stem === ''
    const tagged = questionConcepts(q)
    for (const part of parts) {
      const about = whole
        ? tagged
        : partConcepts(tagged, part.stem, part.answer, part.explanation)
      if (!about.some(name => name.toLowerCase() === needle)) continue
      add(whole ? null : part.label, part.examiner_report)
    }
  }
  return notes
    .sort((a, b) => b.rank - a.rank || paperNumber(a.questionId) - paperNumber(b.questionId))
    .map(({ rank: _rank, ...note }) => note)
}

/** "9 of 13": how many of the series' papers the concept is on. */
export function seriesShare(series: PaperSeries): string {
  return `${series.on} of ${series.papers.length}`
}

/** "2013 to 2019", or the one year: the span of papers the bank holds of a series. */
export function seriesSpan(series: PaperSeries): string {
  const first = series.papers[0].year
  const last = series.papers[series.papers.length - 1].year
  return first === last ? String(first) : `${first} to ${last}`
}
