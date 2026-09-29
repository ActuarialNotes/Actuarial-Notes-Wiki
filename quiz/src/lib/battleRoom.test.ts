import { describe, expect, it } from 'vitest'
import { battleReducer, createBattle, type BattleState } from './battle'
import {
  PROTOCOL_VERSION,
  ROOM_CODE_ALPHABET,
  ROOM_CODE_LENGTH,
  generateRoomCode,
  isRoomCode,
  joinPath,
  normalizeRoomCode,
  parseBattleState,
  parseDraft,
  parseMessage,
  roomChannel,
} from './battleRoom'
import type { BattleDraft } from './battleTopics'

function sampleBattle(): BattleState {
  const s = createBattle({
    config: { rules: 'simultaneous', exam: 'Probability', rounds: 3, roundSeconds: 60 },
    players: [{ name: 'Ada' }, { name: 'Bo', avatarUrl: '{"type":"animal","value":"fox"}' }],
    questions: ['p-1', 'p-2', 'p-3'].map(id => ({ id, answer: 'B', options: ['A', 'B', 'C', 'D', 'E'] })),
    now: 1000,
    graceMs: 1500,
  })
  return [
    { type: 'tick' as const, now: 5000 },
    { type: 'answer' as const, seat: 0 as const, choice: 'B', now: 6000 },
    { type: 'answer' as const, seat: 1 as const, choice: 'A', now: 7000 },
  ].reduce(battleReducer, s)
}

describe('room codes', () => {
  it('draws codes from the unambiguous alphabet', () => {
    let i = 0
    const values = [0, 0.5, 0.99, 0.25]
    const code = generateRoomCode(() => values[i++ % values.length])
    expect(code).toHaveLength(ROOM_CODE_LENGTH)
    expect(isRoomCode(code)).toBe(true)
    for (const c of '01ILO') expect(ROOM_CODE_ALPHABET).not.toContain(c)
  })

  it('reads a typed code however it was typed', () => {
    expect(normalizeRoomCode(' ab-cd ')).toBe('ABCD')
    expect(isRoomCode('ABCD')).toBe(true)
    expect(isRoomCode('AB0D')).toBe(false)
    expect(isRoomCode('ABC')).toBe(false)
  })

  it('names the channel and the join link after the code', () => {
    expect(roomChannel('ABCD')).toBe('quiz-battle:ABCD')
    expect(joinPath('ABCD')).toBe('/battle?join=ABCD')
  })
})

describe('parseBattleState', () => {
  it('round-trips a battle through JSON', () => {
    const s = sampleBattle()
    expect(parseBattleState(JSON.parse(JSON.stringify(s)))).toEqual(s)
  })

  it('refuses a battle whose rounds disagree with its questions', () => {
    const s = JSON.parse(JSON.stringify(sampleBattle()))
    s.rounds[0].questionId = 'p-9'
    expect(parseBattleState(s)).toBeNull()
  })

  it('refuses the wrong shapes rather than throwing', () => {
    for (const bad of [null, 1, 'x', [], {}, { ...sampleBattle(), scores: [1] }, { ...sampleBattle(), finished: 'yes' }]) {
      expect(parseBattleState(bad)).toBeNull()
    }
  })

  it('caps what a message may carry', () => {
    const s = JSON.parse(JSON.stringify(sampleBattle()))
    s.players[0].name = 'x'.repeat(10_000)
    expect(parseBattleState(s)).toBeNull()
  })
})

describe('parseDraft', () => {
  const picking: BattleDraft = { game: 2, phase: 'picking', deadline: 31_000, picks: [['Bayes Theorem'], null], drawn: [] }
  const drawing: BattleDraft = {
    game: 2, phase: 'drawing', deadline: 40_000, picks: [['Bayes Theorem'], []],
    drawn: [{ id: 'p-1', topic: 'Bayes Theorem' }, { id: 'p-2', topic: null }],
  }

  it('round-trips a pick and a draw through JSON', () => {
    for (const d of [picking, drawing]) expect(parseDraft(JSON.parse(JSON.stringify(d)))).toEqual(d)
  })

  it('refuses a draw before the picks close, or a draw of nothing', () => {
    expect(parseDraft({ ...picking, drawn: drawing.drawn })).toBeNull()
    expect(parseDraft({ ...drawing, drawn: [] })).toBeNull()
  })

  it('refuses more than three topics, and the wrong shapes, rather than throwing', () => {
    expect(parseDraft({ ...picking, picks: [['a', 'b', 'c', 'd'], null] })).toBeNull()
    for (const bad of [null, 'x', {}, { ...picking, phase: 'voting' }, { ...picking, picks: [null] }, { ...picking, game: -1 }]) {
      expect(parseDraft(bad)).toBeNull()
    }
  })
})

describe('parseMessage', () => {
  const base = { v: PROTOCOL_VERSION, from: 'c1' }

  it('parses each kind of message', () => {
    expect(parseMessage({ ...base, t: 'join', name: 'Bo' })).toEqual({ ...base, t: 'join', name: 'Bo' })
    expect(parseMessage({ ...base, t: 'ping' })).toEqual({ ...base, t: 'ping' })
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'answer', round: 2, choice: 'C', elapsedMs: 1234 } }))
      .toMatchObject({ action: { kind: 'answer', round: 2, choice: 'C' } })
    expect(parseMessage({ ...base, t: 'react', seat: 1, emoji: '🔥' })).toMatchObject({ seat: 1, emoji: '🔥' })
    const room = {
      ...base, t: 'room', to: 'c2', sentAt: 5, stage: 'playing',
      host: { name: 'Ada' }, guest: { name: 'Bo' },
      config: sampleBattle().config, battle: sampleBattle(), rematch: [false, true],
    }
    expect(parseMessage(JSON.parse(JSON.stringify(room)))).toMatchObject({ t: 'room', stage: 'playing', rematch: [false, true], draft: null })
    const draft: BattleDraft = { game: 1, phase: 'picking', deadline: 30_000, picks: [null, []], drawn: [] }
    expect(parseMessage({ ...room, stage: 'picking', battle: null, draft })).toMatchObject({ stage: 'picking', draft })
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'topics', game: 1, topics: ['Bayes Theorem'] } }))
      .toMatchObject({ action: { kind: 'topics', game: 1, topics: ['Bayes Theorem'] } })
  })

  it('drops anything it does not recognise', () => {
    expect(parseMessage({ ...base, t: 'shout' })).toBeNull()
    expect(parseMessage({ ...base, t: 'react', seat: 1, emoji: '<script>' })).toBeNull()
    expect(parseMessage({ ...base, t: 'react', seat: 2, emoji: '🔥' })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'win' } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'topics', game: 1, topics: ['a', 'b', 'c', 'd'] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'topics', game: 1, topics: ['x'.repeat(500)] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'room', to: 'c2', sentAt: 1, stage: 'picking', host: { name: 'A' }, guest: { name: 'B' }, config: sampleBattle().config, battle: null, draft: { junk: true }, rematch: [false, false] })).toBeNull()
    expect(parseMessage({ t: 'ping', from: 'c1' })).toBeNull()
    expect(parseMessage({ ...base, t: 'room', to: 'c2', sentAt: 1, stage: 'playing', host: { name: 'A' }, guest: { name: 'B' }, config: sampleBattle().config, battle: { junk: true }, rematch: [false, false] })).toBeNull()
  })
})
