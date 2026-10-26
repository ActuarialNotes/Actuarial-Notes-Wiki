import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  answerabilityEntry,
  answerabilityHistory,
  answerabilityRecordPath,
  checkSentence,
  parseAnswerabilityRecord,
  quoteText,
  requirementLabel,
  runDate,
  verdictLabel,
} from './answerability'

const RECORD = JSON.stringify({
  version: 1,
  exam: 'Exam P-1 (SOA)',
  bank: 'exam-p',
  questions: {
    'p-004': {
      path: 'questions/exam-p/p-004.md',
      run: 'answerability-20261025-p',
      input_hash: 'sha256:00',
      verdict: 'untagged',
      requirements: [
        { id: 'r1', kind: 'fact', statement: 'Mutually exclusive events add.', concept: 'Unions', status: 'linked',
          places: [{ page: 'Mutually Exclusive Events', quote: 'the [[Probability Addition Rule]] simplifies' }] },
        { id: 'r2', kind: 'fact', statement: 'Independent events multiply.', concept: 'Independent Events', status: 'elsewhere',
          places: [{ page: 'Probability Multiplication Rule', quote: '$P(A \\cap B) = P(A) P(B)$' }] },
        { id: 'r3', kind: 'formula', statement: 'Equally likely outcomes.', concept: 'Probability', status: 'missing', places: [],
          resolution: { kind: 'not-required', note: 'the question gives it', date: '2026-10-27' } },
      ],
    },
    'p-005': {
      path: 'questions/exam-p/p-005.md', run: 'answerability-20261025-p', verdict: 'answerable',
      requirements: [{ id: 'r1', kind: 'fact', statement: 'A thing.', concept: '', status: 'tagged', places: [] }],
    },
  },
})

describe('answerabilityRecordPath', () => {
  it('maps a question file to its bank’s record, and nothing else to one', () => {
    expect(answerabilityRecordPath('questions/exam-p/p-004.md')).toBe('simulations/answerability/exam-p.json')
    expect(answerabilityRecordPath('Concepts/Bayes Theorem.md')).toBeNull()
    expect(answerabilityRecordPath('questions/exam-p/probability/p-1.md')).toBeNull()
  })
})

describe('parseAnswerabilityRecord / answerabilityEntry', () => {
  const record = parseAnswerabilityRecord(RECORD)!

  it('reads a record, and refuses what isn’t one', () => {
    expect(record.bank).toBe('exam-p')
    expect(Object.keys(record.questions)).toEqual(['p-004', 'p-005'])
    expect(parseAnswerabilityRecord('not json')).toBeNull()
    expect(parseAnswerabilityRecord('{"exam":"x"}')).toBeNull()
  })

  it('finds a question by its path, else by its file name', () => {
    expect(answerabilityEntry(record, 'questions/exam-p/p-004.md')?.id).toBe('p-004')
    expect(answerabilityEntry({ ...record, questions: { 'p-005': { ...record.questions['p-005'], path: null } } },
      'questions/exam-p/p-005.md')?.id).toBe('p-005')
    expect(answerabilityEntry(record, 'questions/exam-p/p-999.md')).toBeNull()
  })
})

describe('the history', () => {
  const entry = parseAnswerabilityRecord(RECORD)!.questions['p-004']

  it('dates a run by its id', () => {
    expect(runDate('answerability-20261025-mas-ii')).toBe('2026-10-25')
    expect(runDate('3f2a')).toBeNull()
  })

  it('is the check and every resolution since, newest first', () => {
    const history = answerabilityHistory(entry)
    expect(history.map((e) => e.kind)).toEqual(['resolution', 'check'])
    expect(history.map((e) => e.date)).toEqual(['2026-10-27', '2026-10-25'])
  })

  it('says what the solution uses and where it is taught', () => {
    expect(checkSentence(entry)).toBe(
      'The official solution uses 3 things: 1 is taught within its reach, 1 elsewhere in the notes and 1 on no page.')
    const answerable = parseAnswerabilityRecord(RECORD)!.questions['p-005']
    expect(checkSentence(answerable)).toBe('The official solution uses 1 thing, and every one is taught within its reach.')
  })

  it('labels a verdict and a requirement, a resolution over the check', () => {
    expect(verdictLabel('gap')).toEqual({ label: 'Gap', tone: 'red' })
    expect(verdictLabel('untagged').label).toBe('Out of reach')
    expect(requirementLabel(entry.requirements[0]).label).toBe('One link away')
    expect(requirementLabel(entry.requirements[2]).label).toBe('Not required')
  })

  it('reads a quote’s wiki links as their text', () => {
    expect(quoteText('the [[Probability Addition Rule]] and [[Independent Events|independent]]'))
      .toBe('the Probability Addition Rule and independent')
  })
})

// Every committed record is one the panel can read, and every question in it
// is found from its own file.
describe('the committed records', () => {
  const dir = join(__dirname, '../../../simulations/answerability')
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    it(file, () => {
      const record = parseAnswerabilityRecord(readFileSync(join(dir, file), 'utf8'))
      expect(record).not.toBeNull()
      for (const entry of Object.values(record!.questions)) {
        expect(entry.path && answerabilityRecordPath(entry.path)).toBe(`simulations/answerability/${file}`)
        expect(answerabilityEntry(record!, entry.path!)).toBe(entry)
        expect(runDate(entry.run)).not.toBeNull()
        expect(VERDICTS).toContain(entry.verdict)
      }
    })
  }
})

const VERDICTS = ['answerable', 'untagged', 'gap', 'no requirements', 'error']
