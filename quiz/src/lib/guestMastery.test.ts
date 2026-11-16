import { describe, it, expect } from 'vitest'
import { GUEST_ID, foldGuestMastery, guestExamKey, relabelForAccount, type MasteryEvent } from './guestMastery'
import { emptyRecord } from './mastery'

const at = new Date('2026-11-15T12:00:00Z')
const right = (conceptSlug: string, examId = 'P'): MasteryEvent => ({ examId, conceptSlug, isCorrect: true, isHard: false })
const wrong = (conceptSlug: string, examId = 'P'): MasteryEvent => ({ examId, conceptSlug, isCorrect: false, isHard: false })

describe('foldGuestMastery', () => {
  it('starts a concept the visitor has never met and lifts it on a right answer', () => {
    const [record, ...rest] = foldGuestMastery([], [right('Bayes Theorem')], at)
    expect(rest).toEqual([])
    expect(record).toMatchObject({ user_id: GUEST_ID, exam_id: 'P', concept_slug: 'Bayes Theorem', state: 'level1', correct_count: 1 })
  })

  it('carries on from the record the browser already holds', () => {
    const first = foldGuestMastery([], [right('Bayes Theorem')], at)
    const [second] = foldGuestMastery(first, [right('Bayes Theorem')], at)
    expect(second!.correct_count).toBe(2)
  })

  it('folds a quiz\'s answers in order, one record per concept touched', () => {
    const out = foldGuestMastery([], [right('A'), wrong('B'), right('A')], at)
    expect(out.map(r => r.concept_slug).sort()).toEqual(['A', 'B'])
    expect(out.find(r => r.concept_slug === 'A')!.correct_count).toBe(2)
    expect(out.find(r => r.concept_slug === 'B')!.state).toBe('new')
  })

  it('keeps one concept apart on two exams, and returns only what was touched', () => {
    const prior = foldGuestMastery([], [right('Variance', 'P'), right('Annuity', 'FM')], at)
    const out = foldGuestMastery(prior, [right('Variance', 'MAS-I')], at)
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ exam_id: 'MAS-I', correct_count: 1 })
  })
})

describe('relabelForAccount', () => {
  it('hands the visitor\'s records to the account and leaves every other record out', () => {
    const guest = foldGuestMastery([], [right('A')], at)
    const other = { ...emptyRecord('someone-else', 'P', 'B'), state: 'level2' as const }
    const out = relabelForAccount([...guest, other], 'user-1')
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ user_id: 'user-1', concept_slug: 'A', state: 'level1' })
  })

  it('finds nothing to take a second time', () => {
    const taken = relabelForAccount(foldGuestMastery([], [right('A')], at), 'user-1')
    expect(relabelForAccount(taken, 'user-1')).toEqual([])
  })
})

describe('guestExamKey', () => {
  it('is the exam the visitor last answered a question on, and none before any answer', () => {
    expect(guestExamKey([])).toBeNull()
    const first = foldGuestMastery([], [right('Bayes Theorem', 'P')], new Date('2026-11-14T12:00:00Z'))
    const then = foldGuestMastery(first, [wrong('Loss Ratio', 'CAS-5')], new Date('2026-11-15T12:00:00Z'))
    expect(guestExamKey(first)).toBe('P')
    expect(guestExamKey([...first, ...then])).toBe('CAS-5')
  })

  it('reads only the visitor\'s own records', () => {
    const account = relabelForAccount(foldGuestMastery([], [right('Bayes Theorem', 'P')], at), 'user-1')
    expect(guestExamKey(account)).toBeNull()
  })
})
