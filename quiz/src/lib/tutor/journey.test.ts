import { describe, expect, it } from 'vitest'
import { daysToExam, journeyPhase, phaseStartDays, resolveExamDate, syllabusCoverage } from './journey'
import { foldLog } from './log'
import type { MemoryState } from './memory'

const sittings = [
  { startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: '2026-03-25' },
  { startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: '2026-09-29' },
]

describe('the exam date', () => {
  it('is the candidate’s own when they have set one', () => {
    const exam = resolveExamDate('2026-10-22', sittings, '2026-09-01')
    expect(exam).toEqual({ day: '2026-10-22', source: 'target', window: sittings[1] })
  })

  it('is otherwise the next published window, an open one included', () => {
    expect(resolveExamDate(null, sittings, '2026-06-01')).toMatchObject({ day: '2026-10-19', source: 'sitting' })
    expect(resolveExamDate(null, sittings, '2026-10-22')).toMatchObject({ day: '2026-10-19', source: 'sitting' })
  })

  it('is nothing at all once the published windows have passed — never a guess', () => {
    expect(resolveExamDate(null, sittings, '2026-11-01')).toEqual({ day: null, source: 'none', window: null })
  })
})

describe('the phase', () => {
  const at = (day: string) => resolveExamDate(day, [], '2026-01-01')

  it('is Set up with no date', () => {
    expect(journeyPhase({ day: null, source: 'none', window: null }, 0, '2026-01-01')).toBe('setup')
  })

  it('is Learn, then Consolidate once most of the syllabus is met, with weeks to go', () => {
    expect(journeyPhase(at('2026-03-01'), 0.3, '2026-01-01')).toBe('learn')
    expect(journeyPhase(at('2026-03-01'), 0.85, '2026-01-01')).toBe('consolidate')
  })

  it('is Rehearse inside three weeks and Taper inside five days', () => {
    expect(journeyPhase(at('2026-01-22'), 0.3, '2026-01-01')).toBe('rehearse')
    expect(journeyPhase(at('2026-01-07'), 0.3, '2026-01-01')).toBe('rehearse')
    expect(journeyPhase(at('2026-01-06'), 0.3, '2026-01-01')).toBe('taper')
    expect(journeyPhase(at('2026-01-02'), 0.9, '2026-01-01')).toBe('taper')
  })

  it('is Exam on the day, or anywhere in a published window with no day named', () => {
    expect(journeyPhase(at('2026-01-01'), 1, '2026-01-01')).toBe('exam')
    expect(journeyPhase(resolveExamDate(null, sittings, '2026-10-22'), 1, '2026-10-22')).toBe('exam')
  })

  it('is After once the day has passed', () => {
    expect(journeyPhase(at('2026-01-01'), 1, '2026-01-03')).toBe('after')
  })

  it('counts the days left', () => {
    expect(daysToExam(at('2026-01-31'), '2026-01-01')).toBe(30)
    expect(daysToExam({ day: null, source: 'none', window: null }, '2026-01-01')).toBeNull()
  })

  it('dates each later phase from the exam day', () => {
    expect(phaseStartDays('2026-10-19')).toEqual({ rehearse: '2026-09-28', taper: '2026-10-14', exam: '2026-10-19' })
  })
})

describe('coverage', () => {
  it('counts the concepts met, by any spelling', () => {
    const memory: MemoryState = { stability: 3, difficulty: 5, lastReview: '2026-01-01T00:00:00Z', reps: 1, lapses: 0 }
    const model = foldLog([], new Map([['cape cod method', memory]]))
    expect(syllabusCoverage(['Cape Cod Method', 'Chain Ladder Method'], model)).toEqual({ met: 1, total: 2, share: 0.5 })
  })
})
