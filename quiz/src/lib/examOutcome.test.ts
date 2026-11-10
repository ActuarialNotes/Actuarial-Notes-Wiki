import { describe, expect, it } from 'vitest'
import type { ExamSitting } from '@/data/examSittings'
import {
  ASK_WINDOW_DAYS,
  CAS_RESULTS_WEEKS,
  EXAM_OUTCOMES,
  OUTCOME_LABELS,
  dueOutcomeAsks,
  isOutcome,
  outcomeKey,
  resultsDate,
  sittingForDate,
  snoozeEnd,
  type OutcomeAskState,
} from './examOutcome'

const NONE: OutcomeAskState = { answered: new Set(), dismissed: new Set(), snoozedUntil: {} }

const sit = (examId: string, startDate: string, endDate: string | null, format: ExamSitting['format'] = 'CBT'): ExamSitting =>
  ({ examId, format, startDate, endDate, registrationDeadline: null })

describe('sittingForDate', () => {
  const rows = [sit('P', '2026-11-04', '2026-11-18'), sit('P', '2026-11-10', null, 'P/P'), sit('FM', '2026-11-04', '2026-11-18')]

  it('finds the sitting a date falls in, the narrower of two', () => {
    expect(sittingForDate('P', '2026-11-05', rows)?.endDate).toBe('2026-11-18')
    expect(sittingForDate('P', '2026-11-10', rows)?.format).toBe('P/P')
  })

  it('is null for no date, a date in no window, or another exam', () => {
    expect(sittingForDate('P', null, rows)).toBeNull()
    expect(sittingForDate('P', '2026-12-01', rows)).toBeNull()
    expect(sittingForDate('MAS-I', '2026-11-05', rows)).toBeNull()
  })
})

describe('resultsDate', () => {
  it("reads a sitting's own published results date, the earliest", () => {
    // SOA, Exam P November 2026: candidate numbers Jan 15, transcripts Jan 18.
    expect(resultsDate('P', sit('P', '2026-11-04', '2026-11-18'))).toEqual({ date: '2027-01-15', basis: 'published' })
    // PCPA's September project: results release Nov 30.
    expect(resultsDate('CAS-PCPA', sit('CAS-PCPA', '2026-09-15', '2026-09-30', 'Project')))
      .toEqual({ date: '2026-11-30', basis: 'published' })
  })

  it("uses CAS's candidate-guide rule, at its far end, where CAS publishes no date", () => {
    const r = resultsDate('CAS-5', sit('CAS-5', '2026-10-19', '2026-10-27'))
    expect(r?.basis).toBe('cas-rule')
    expect(CAS_RESULTS_WEEKS).toBe(8)
    expect(r?.date).toBe('2026-12-22')
  })

  it('says nothing for an SOA sitting with no published results date', () => {
    expect(resultsDate('P', sit('P', '2027-01-14', '2027-01-28'))).toBeNull()
  })
})

describe('dueOutcomeAsks', () => {
  const rows = [{ exam_id: 'CAS-5', target_date: '2026-10-20' }]
  const key = outcomeKey('CAS-5', '2026-10-19')

  it('asks from the results date for the window after it', () => {
    expect(dueOutcomeAsks(rows, NONE, '2026-12-21')).toEqual([])
    const [ask] = dueOutcomeAsks(rows, NONE, '2026-12-22')
    expect(ask).toMatchObject({ examId: 'CAS-5', sittingStart: '2026-10-19', resultsFrom: '2026-12-22', basis: 'cas-rule' })
    expect(dueOutcomeAsks(rows, NONE, '2027-03-22')).toHaveLength(1)
    expect(ASK_WINDOW_DAYS).toBe(90)
    expect(dueOutcomeAsks(rows, NONE, '2027-03-23')).toEqual([])
  })

  it('asks once: never again once answered or closed', () => {
    expect(dueOutcomeAsks(rows, { ...NONE, answered: new Set([key]) }, '2027-01-05')).toEqual([])
    expect(dueOutcomeAsks(rows, { ...NONE, dismissed: new Set([key]) }, '2027-01-05')).toEqual([])
  })

  it('a snooze holds the question until its end', () => {
    const until = snoozeEnd('2027-01-01')
    expect(until).toBe('2027-01-15')
    const state = { ...NONE, snoozedUntil: { [key]: until } }
    expect(dueOutcomeAsks(rows, state, '2027-01-14')).toEqual([])
    expect(dueOutcomeAsks(rows, state, '2027-01-15')).toHaveLength(1)
  })

  it('skips an exam with no date, or a date in no known sitting', () => {
    expect(dueOutcomeAsks([{ exam_id: 'CAS-5', target_date: null }], NONE, '2027-01-05')).toEqual([])
    expect(dueOutcomeAsks([{ exam_id: 'CAS-5', target_date: '2026-11-15' }], NONE, '2027-01-05')).toEqual([])
  })

  it('puts the most recent results first', () => {
    const both = [
      { exam_id: 'CAS-PCPA', target_date: '2026-09-20' },  // results Nov 30
      { exam_id: 'MAS-I', target_date: '2026-11-01' },     // window ends Nov 5: Dec 31
    ]
    expect(dueOutcomeAsks(both, NONE, '2027-01-02').map(a => a.examId)).toEqual(['MAS-I', 'CAS-PCPA'])
  })
})

describe('outcomes', () => {
  it("are D34's four answers, each labelled, matching the table's check", () => {
    expect(EXAM_OUTCOMES).toEqual(['passed', 'not_passed', 'did_not_sit', 'rather_not_say'])
    for (const o of EXAM_OUTCOMES) expect(OUTCOME_LABELS[o]).toBeTruthy()
    expect(isOutcome('passed')).toBe(true)
    expect(isOutcome('score')).toBe(false)
  })

  it('match the CHECK constraint in the migration', async () => {
    const { readFileSync } = await import('node:fs')
    const { resolve } = await import('node:path')
    const sql = readFileSync(resolve(__dirname, '../../../supabase/migrations/20261110_exam_outcomes.sql'), 'utf8')
    const check = sql.match(/outcome IN \(([^)]*)\)/)?.[1] ?? ''
    expect(check.split(',').map(s => s.trim().replace(/'/g, ''))).toEqual([...EXAM_OUTCOMES])
  })
})
