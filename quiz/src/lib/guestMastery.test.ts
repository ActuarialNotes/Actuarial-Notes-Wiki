import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { emptyRecord, type ConceptMasteryRecord } from '@/lib/mastery'
import {
  clearGuestMastery,
  foldMasteryEvents,
  GUEST_USER_ID,
  mergeGuestIntoAccount,
  readGuestMastery,
  writeGuestMastery,
  type MasteryEvent,
} from '@/lib/guestMastery'

const DAY = 24 * 60 * 60 * 1000
const right = (conceptSlug: string, examId = 'FM'): MasteryEvent => ({ examId, conceptSlug, isCorrect: true, isHard: false })

function rec(over: Partial<ConceptMasteryRecord>): ConceptMasteryRecord {
  return { ...emptyRecord(GUEST_USER_ID, 'FM', 'present value'), ...over }
}

beforeEach(() => {
  const data = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => { data.set(k, v) },
    removeItem: (k: string) => { data.delete(k) },
  })
  vi.stubGlobal('window', { dispatchEvent: vi.fn() })
  vi.stubGlobal('Event', class { constructor(public type: string) {} })
})

afterEach(() => vi.unstubAllGlobals())

describe('foldMasteryEvents', () => {
  it('starts an unseen concept from New', () => {
    const { rows, transitions } = foldMasteryEvents(GUEST_USER_ID, [right('present value')], new Map(), new Date())
    expect(rows).toHaveLength(1)
    expect(rows[0].state).toBe('level1')
    expect(transitions).toEqual([expect.objectContaining({ conceptSlug: 'present value', from: 'new', to: 'level1' })])
  })

  it('climbs past Level 1 across days when the earlier quiz is the prior', () => {
    const day1 = new Date('2026-10-01T15:00:00Z')
    const first = foldMasteryEvents(GUEST_USER_ID, [right('present value')], new Map(), day1)
    const prior = new Map(first.rows.map(r => [`${r.exam_id}::${r.concept_slug}`, r]))
    const second = foldMasteryEvents(GUEST_USER_ID, [right('present value')], prior, new Date(day1.getTime() + DAY))
    expect(second.rows[0].state).toBe('level2')
    expect(second.transitions[0]).toMatchObject({ from: 'level1', to: 'level2' })
  })

  it('reports no transition for a concept that stays put', () => {
    const wrong: MasteryEvent = { examId: 'FM', conceptSlug: 'present value', isCorrect: false, isHard: false }
    const { transitions } = foldMasteryEvents(GUEST_USER_ID, [wrong], new Map(), new Date())
    expect(transitions).toEqual([])
  })
})

describe('mergeGuestIntoAccount', () => {
  const now = new Date('2026-11-02T12:00:00Z')
  const recent = new Date(now.getTime() - DAY).toISOString()
  const older = new Date(now.getTime() - 2 * DAY).toISOString()

  it('carries every guest record onto an empty account, re-owned', () => {
    const guest = [rec({ state: 'level2', correct_count: 2, last_correct_at: recent, last_attempted_at: recent })]
    const out = mergeGuestIntoAccount(guest, [], 'user-1', now)
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ user_id: 'user-1', state: 'level2', correct_count: 2 })
  })

  it('never lowers an account concept that stands higher', () => {
    const guest = [rec({ state: 'level1', last_correct_at: recent, last_attempted_at: recent })]
    const account = [rec({ user_id: 'user-1', state: 'level2', last_correct_at: older, last_attempted_at: older })]
    expect(mergeGuestIntoAccount(guest, account, 'user-1', now)).toEqual([])
  })

  it('raises an account concept the guest got further with', () => {
    const guest = [rec({ state: 'level3', last_correct_at: older, last_attempted_at: older })]
    const account = [rec({ user_id: 'user-1', state: 'level1', last_correct_at: recent, last_attempted_at: recent })]
    expect(mergeGuestIntoAccount(guest, account, 'user-1', now)[0]).toMatchObject({ state: 'level3', user_id: 'user-1' })
  })

  it('breaks a tie on the more recent answer', () => {
    const guest = [rec({ state: 'level1', last_correct_at: recent, last_attempted_at: recent })]
    const account = [rec({ user_id: 'user-1', state: 'level1', last_correct_at: older, last_attempted_at: older })]
    expect(mergeGuestIntoAccount(guest, account, 'user-1', now)).toHaveLength(1)
    expect(mergeGuestIntoAccount(account, guest, 'user-1', now)).toHaveLength(0)
  })
})

describe('guest store', () => {
  it('writes, reads back as guest, and clears by exam', () => {
    writeGuestMastery([
      rec({ user_id: 'anyone', state: 'level1' }),
      rec({ exam_id: 'P', concept_slug: 'bayes theorem', state: 'level2' }),
    ])
    expect(readGuestMastery().map(r => r.user_id)).toEqual([GUEST_USER_ID, GUEST_USER_ID])
    clearGuestMastery('FM')
    expect(readGuestMastery().map(r => r.exam_id)).toEqual(['P'])
    clearGuestMastery()
    expect(readGuestMastery()).toEqual([])
  })
})
