// Corpus test: the exam label ↔ id map must cover the question bank.
//
// The mastery write path keys concept_mastery rows by EXAM_LABEL_TO_ID[q.exam]
// and skips the question outright when the label has no id. A bank label that
// is missing here therefore doesn't fail loudly — quizzes on that exam just
// never level a concept up (this is exactly what happened to Exam 5 and
// MAS-II), so the bank itself is the fixture.

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { EXAM_ID_TO_LABEL, EXAM_LABEL_TO_ID, RESETTABLE_EXAMS, questionExamLabel } from './examIds'
import { parseExamMetadata, wikiExamIdToProgressKey } from './wikiParser'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions')

/** Every distinct `exam:` value in questions/<exam-id>/*.md. */
function bankExamLabels(): string[] {
  const labels = new Set<string>()
  for (const dir of readdirSync(QUESTIONS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(path.join(QUESTIONS_DIR, dir.name))) {
      if (!file.endsWith('.md')) continue
      const body = readFileSync(path.join(QUESTIONS_DIR, dir.name, file), 'utf-8')
      const match = /^exam:\s*"?([^"\n]+?)"?\s*$/m.exec(body)
      if (match) labels.add(match[1])
    }
  }
  return [...labels].sort()
}

describe('EXAM_LABEL_TO_ID', () => {
  const labels = bankExamLabels()

  it('finds exam labels in the question bank', () => {
    expect(labels.length).toBeGreaterThan(0)
  })

  it.each(labels)('maps the bank label %s to an exam id', label => {
    expect(EXAM_LABEL_TO_ID[label]).toBeTruthy()
  })

  it('maps Exam 5 to the CAS-5 progress key', () => {
    // The exam_progress / concept_mastery key, not the wiki exam id ("5-1").
    expect(EXAM_LABEL_TO_ID['Exam 5']).toBe('CAS-5')
  })

  it('round-trips label → id → label', () => {
    for (const [label, id] of Object.entries(EXAM_LABEL_TO_ID)) {
      expect(EXAM_ID_TO_LABEL[id]).toBe(label)
    }
  })

  it('offers every mapped exam as a resettable scope', () => {
    expect(RESETTABLE_EXAMS.map(e => e.id).sort()).toEqual(
      Object.values(EXAM_LABEL_TO_ID).sort(),
    )
  })
})

// Corpus test: the syllabus → bank-label lookup must land on a label the
// question bank actually uses.
//
// `quiz_sessions.exam` and `Question.exam` store the bank's label; the surfaces
// that filter them (the Study Schedule day panel, the exam history, the fading-
// concept review, the today's-plan quiz badge) start from a wiki syllabus. The
// syllabus page's `examTopic` is only its subject line, so comparing against it
// matched nothing on the CAS exams — a day full of Exam 5 quizzes reported
// "No quizzes finished yet today". `questionExamLabel` is the one bridge.
describe('questionExamLabel', () => {
  const examPages = readdirSync(REPO_ROOT)
    .filter(f => /^Exam .+\.md$/.test(f))
    .map(f => ({ file: f, meta: parseExamMetadata(readFileSync(path.join(REPO_ROOT, f), 'utf-8')) }))
    .filter((e): e is { file: string; meta: NonNullable<ReturnType<typeof parseExamMetadata>> } => e.meta !== null)

  const bankLabels = new Set(bankExamLabels())

  it('finds the exam pages in the vault', () => {
    expect(examPages.length).toBeGreaterThan(0)
  })

  // Exams 6–9 have a syllabus page and no questions yet, so only the mapped ones
  // can be checked against the bank.
  const bankedPages = examPages.filter(e => EXAM_ID_TO_LABEL[wikiExamIdToProgressKey(e.meta.examId)])

  it.each(bankedPages.map(e => [e.file, e.meta] as const))(
    '%s resolves to a label the question bank uses',
    (_file, meta) => {
      expect(bankLabels.has(questionExamLabel(meta))).toBe(true)
    },
  )

  it('uses the bank label, not the syllabus subject line, for the CAS exams', () => {
    expect(questionExamLabel({ examId: '5', examTopic: 'Basic Techniques for Ratemaking and Estimating Claim Liabilities' }))
      .toBe('Exam 5')
    expect(questionExamLabel({ examId: 'MAS-I', examTopic: 'Modern Actuarial Statistics I' }))
      .toBe('Exam MAS-I')
  })

  it('keeps the SOA exams on their subject-line labels', () => {
    expect(questionExamLabel({ examId: 'P-1', examTopic: 'Probability' })).toBe('Probability')
    expect(questionExamLabel({ examId: 'FM-2', examTopic: 'Financial Mathematics' })).toBe('Financial Mathematics')
  })

  it('falls back to the syllabus topic for an exam with no question bank', () => {
    expect(questionExamLabel({ examId: '7', examTopic: 'Advanced Estimation of Claims Liabilities' }))
      .toBe('Advanced Estimation of Claims Liabilities')
  })
})
