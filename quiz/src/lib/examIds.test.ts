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
import { EXAM_ID_TO_LABEL, EXAM_LABEL_TO_ID, RESETTABLE_EXAMS } from './examIds'

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
