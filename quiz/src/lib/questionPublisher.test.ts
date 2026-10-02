import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion, type Question } from './parser'
import { VAULT_QUESTION_IDS, questionPublisher } from './questionPublisher'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions')

describe('questionPublisher', () => {
  const q = (partial: Partial<Question>) => ({ id: 'x-1', exam: 'Exam 5', ...partial })

  it('names the SOA for its sample sets and the CAS for its papers', () => {
    expect(questionPublisher(q({ id: 'p-004', exam: 'Probability' }))).toBe('SOA')
    expect(questionPublisher(q({ id: 'fm-341', exam: 'Financial Mathematics' }))).toBe('SOA')
    expect(questionPublisher(q({ exam: 'Exam MAS-I' }))).toBe('CAS')
    expect(questionPublisher(q({ exam: 'Exam 6C' }))).toBe('CAS')
  })

  it('names the body of the paper a moved question was sat on', () => {
    expect(questionPublisher(q({ exam: 'Exam 9', originally_exam: 'Exam 7' }))).toBe('CAS')
  })

  it('names the vault for its own questions', () => {
    expect(questionPublisher(q({ id: 'p-901', exam: 'Probability' }))).toBe('Actuarial Notes')
    expect(questionPublisher(q({ id: 'p-964', exam: 'Probability' }))).toBe('Actuarial Notes')
  })

  it('names no one for an exam it does not know', () => {
    expect(questionPublisher(q({ exam: 'Something Else' }))).toBeNull()
  })
})

// Corpus test: the bank is the fixture. Only the files the build bundles —
// questions/<bank>/*.md, not the folders below them — reach the app.
describe('the question bank, by publisher', () => {
  const questions: Question[] = []
  for (const dir of readdirSync(QUESTIONS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(path.join(QUESTIONS_DIR, dir.name))) {
      if (!file.endsWith('.md')) continue
      const parsed = parseQuestion(readFileSync(path.join(QUESTIONS_DIR, dir.name, file), 'utf-8'))
      if (parsed) questions.push(parsed)
    }
  }
  const byId = new Map(questions.map(x => [x.id, x]))

  // The SOA sample question a fact check cites the question against, by number:
  // "SOA Exam P Sample Questions (Aug 2026 rev.), Q 4, questions PDF p.3, …".
  const citedSampleNumbers = (x: Question) => (x.verification?.sources ?? []).flatMap(source => {
    const match = /^SOA Exam (?:P|FM) Sample (?:Questions|Solutions)\b[^,]*, Q ?(\d+)\b/.exec(source)
    return match ? [Number(match[1])] : []
  })
  const idNumber = (x: Question) => Number(/(\d+)$/.exec(x.id)?.[1])

  it('names a publisher for every question', () => {
    expect(questions.length).toBeGreaterThan(0)
    expect(questions.filter(x => questionPublisher(x) === null).map(x => x.id)).toEqual([])
  })

  it('lists only questions the bank holds, none of them from a sitting or the SOA’s sample set', () => {
    for (const id of VAULT_QUESTION_IDS) {
      const question = byId.get(id)
      expect(question, `${id} is not in the bank`).toBeDefined()
      expect(question!.year, `${id} names a sitting`).toBeUndefined()
      expect(citedSampleNumbers(question!), `${id} is checked as the SOA's own question`).not.toContain(idNumber(question!))
    }
  })

  it('leaves no question of the vault’s own filed as the SOA’s', () => {
    // An undated question not listed above is read as the SOA sample question
    // its id numbers. Once fact checked, its record says whether it is.
    const misfiled = questions.filter(x =>
      !x.year
      && !VAULT_QUESTION_IDS.has(x.id)
      && (x.verification?.sources.length ?? 0) > 0
      && !citedSampleNumbers(x).includes(idNumber(x)),
    )
    expect(misfiled.map(x => x.id)).toEqual([])
  })
})
