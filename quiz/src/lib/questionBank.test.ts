// Corpus test: every file in the question bank parses.
//
// `parseQuestion` returns null for a file it can't read, and the bundle simply
// leaves that question out — nothing warns. A CAS question with no lettered
// parts was written with `## Explanation` under `type: multi-part`, a shape the
// multi-part branch finds no section in, so forty Exam 5 questions were in the
// vault and absent from the app. The bank itself is the fixture.

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { filterQuestions, parseQuestion } from './parser'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions')

function bankFiles(): string[] {
  const files: string[] = []
  for (const dir of readdirSync(QUESTIONS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(path.join(QUESTIONS_DIR, dir.name))) {
      if (file.endsWith('.md')) files.push(`${dir.name}/${file}`)
    }
  }
  return files.sort()
}

describe('the question bank', () => {
  const files = bankFiles()

  it('has files to check', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it('parses every file', () => {
    const dropped = files.filter(f => parseQuestion(readFileSync(path.join(QUESTIONS_DIR, f), 'utf-8')) === null)
    expect(dropped).toEqual([])
  })

  it('gives a single-part CAS question its explanation', () => {
    const raw = [
      '---', 'id: "x"', 'exam: "Exam 7"', 'topic: "T"', 'difficulty: easy',
      'type: multi-part', 'points: 1', '---', '', 'Describe two reasons.', '',
      '### Explanation', 'Reason one.', '', '### Examiner Report', 'Well answered.', '',
    ].join('\n')
    const q = parseQuestion(raw)
    expect(q?.parts?.[0]?.explanation).toBe('Reason one.')
    expect(q?.parts?.[0]?.examiner_report).toBe('Well answered.')
  })
})

describe('off_syllabus', () => {
  const raw = [
    '---', 'id: "v"', 'exam: "Exam 7"', 'topic: "T"', 'learning_objective: "Insurance Company Valuation"',
    'off_syllabus: true', 'difficulty: easy', 'type: multi-part', 'year: 2014', 'session: Spring',
    'points: 1', '---', '', 'Value the firm.', '', '### Explanation', 'By DDM.', '',
  ].join('\n')
  const q = parseQuestion(raw)!

  it('is read off the frontmatter', () => {
    expect(q.off_syllabus).toBe(true)
  })

  it('keeps the question out of a quiz drawn from its exam', () => {
    expect(filterQuestions([q], { exam: 'Exam 7' })).toEqual([])
  })

  it('still finds it by sitting, id or search', () => {
    expect(filterQuestions([q], { exam: 'Exam 7', year: 2014, session: 'Spring' })).toHaveLength(1)
    expect(filterQuestions([q], { ids: ['v'] })).toHaveLength(1)
    expect(filterQuestions([q], { search: 'value the firm' })).toHaveLength(1)
    expect(filterQuestions([q], { exam: 'Exam 7', includeOffSyllabus: true })).toHaveLength(1)
  })
})
