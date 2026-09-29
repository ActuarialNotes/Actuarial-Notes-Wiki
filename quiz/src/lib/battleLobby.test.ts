import { describe, expect, it } from 'vitest'
import {
  ANY_EXAM,
  compatible,
  lobbyEntries,
  matchExam,
  parseLobbyEntry,
  parseLobbyMessage,
  partnerOf,
  planMatches,
  type LobbyEntry,
} from './battleLobby'
import { PROTOCOL_VERSION } from './battleRoom'

const EXAMS = ['Probability', 'Financial Mathematics', 'Exam MAS-I']

function entry(id: string, exam: string, since: number): LobbyEntry {
  return { id, name: id.toUpperCase(), exam, since, v: PROTOCOL_VERSION }
}

describe('lobby entries', () => {
  it('parses a good entry and drops everything else', () => {
    expect(parseLobbyEntry(entry('a', 'Probability', 1), EXAMS)).toEqual(entry('a', 'Probability', 1))
    expect(parseLobbyEntry({ ...entry('a', 'Exam 9', 1) }, EXAMS)).toBeNull()
    expect(parseLobbyEntry({ ...entry('a', 'Probability', 1), v: PROTOCOL_VERSION + 1 }, EXAMS)).toBeNull()
    expect(parseLobbyEntry({ ...entry('a', 'Probability', 1), name: 'x'.repeat(500) }, EXAMS)).toBeNull()
    expect(parseLobbyEntry({ ...entry('a', 'Probability', 1), since: 'soon' }, EXAMS)).toBeNull()
    expect(parseLobbyEntry(null, EXAMS)).toBeNull()
    expect(parseLobbyEntry({ ...entry('a', ANY_EXAM, 1), name: '  Ada   L ' }, EXAMS)?.name).toBe('Ada L')
  })

  it('lists one entry per player, oldest first', () => {
    const list = lobbyEntries([entry('b', 'Probability', 5), entry('a', 'Probability', 5), entry('c', 'any', 1), entry('b', 'Probability', 9), 'junk'], EXAMS)
    expect(list.map(e => [e.id, e.since])).toEqual([['c', 1], ['a', 5], ['b', 9]])
  })
})

describe('pairing', () => {
  it('pairs the same exam, or anyone with any', () => {
    expect(compatible({ exam: 'Probability' }, { exam: 'Probability' })).toBe(true)
    expect(compatible({ exam: 'Probability' }, { exam: ANY_EXAM })).toBe(true)
    expect(compatible({ exam: 'Probability' }, { exam: 'Exam MAS-I' })).toBe(false)
  })

  it('pairs down the queue, the older player hosting', () => {
    const plan = planMatches([
      entry('d', 'Exam MAS-I', 4),
      entry('a', 'Probability', 1),
      entry('b', 'Exam MAS-I', 2),
      entry('c', 'Probability', 3),
    ])
    expect(plan.map(([h, g]) => [h.id, g.id])).toEqual([['a', 'c'], ['b', 'd']])
  })

  it('leaves the odd one out, and nobody with no match', () => {
    expect(planMatches([entry('a', 'Probability', 1)])).toEqual([])
    const plan = planMatches([entry('a', 'Probability', 1), entry('b', 'Exam MAS-I', 2), entry('c', ANY_EXAM, 3)])
    expect(plan.map(([h, g]) => [h.id, g.id])).toEqual([['a', 'c']])
    expect(partnerOf(plan, 'b')).toBeNull()
    expect(partnerOf(plan, 'c')).toMatchObject({ role: 'guest', partner: { id: 'a' } })
    expect(partnerOf(plan, 'a')).toMatchObject({ role: 'host', partner: { id: 'c' } })
  })

  it('agrees on the plan however the lobby is listed', () => {
    const lobby = [entry('a', ANY_EXAM, 3), entry('b', 'Probability', 3), entry('c', 'Probability', 1), entry('d', ANY_EXAM, 2)]
    const ids = (list: LobbyEntry[]) => planMatches(list).map(([h, g]) => `${h.id}-${g.id}`)
    expect(ids([...lobby].reverse())).toEqual(ids(lobby))
  })

  it('plays the host’s exam, else the guest’s, else one at random', () => {
    expect(matchExam({ exam: 'Probability' }, { exam: ANY_EXAM }, EXAMS)).toBe('Probability')
    expect(matchExam({ exam: ANY_EXAM }, { exam: 'Exam MAS-I' }, EXAMS)).toBe('Exam MAS-I')
    expect(matchExam({ exam: ANY_EXAM }, { exam: ANY_EXAM }, EXAMS, () => 0.99)).toBe('Exam MAS-I')
  })
})

describe('parseLobbyMessage', () => {
  const base = { v: PROTOCOL_VERSION, from: 'a', to: 'b', code: 'ABCD' }

  it('parses the handshake', () => {
    expect(parseLobbyMessage({ ...base, t: 'offer', exam: 'Probability', name: 'Ada' }, EXAMS))
      .toEqual({ ...base, t: 'offer', exam: 'Probability', name: 'Ada' })
    for (const t of ['accept', 'go', 'decline', 'cancel']) {
      expect(parseLobbyMessage({ ...base, t }, EXAMS)).toEqual({ ...base, t })
    }
  })

  it('drops bad codes, unknown exams and strangers’ versions', () => {
    expect(parseLobbyMessage({ ...base, t: 'accept', code: 'AB0D' }, EXAMS)).toBeNull()
    expect(parseLobbyMessage({ ...base, t: 'offer', exam: 'Exam 9', name: 'Ada' }, EXAMS)).toBeNull()
    expect(parseLobbyMessage({ ...base, t: 'offer', exam: ANY_EXAM, name: 'Ada' }, EXAMS)).toBeNull()
    expect(parseLobbyMessage({ ...base, v: 99, t: 'go' }, EXAMS)).toBeNull()
    expect(parseLobbyMessage({ ...base, t: 'hug' }, EXAMS)).toBeNull()
  })
})
