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
import { emptyDraft, type BattleDraft } from './battleDraft'

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
  const HAND_A = ['Bayes Theorem', 'Variance', 'Expected Value', 'Poisson Distribution']
  const HAND_B = ['Covariance', 'Moment Generating Function', 'Variance', 'Binomial Distribution']
  const drawing: BattleDraft = { ...emptyDraft(2, 31_000), counts: [4, 2], hands: [HAND_A, null], levels: [[1, 0, 3, 2], null] }
  const striking: BattleDraft = { ...drawing, phase: 'strike', counts: [4, 4], hands: [HAND_A, HAND_B], levels: [[1, 0, 3, 2], [0, 0, 1, 2]], strikes: ['Covariance', ''] }
  const dealing: BattleDraft = {
    ...striking,
    phase: 'deal',
    strikes: ['Covariance', 'Bayes Theorem'],
    rows: ['Variance', 'Expected Value', 'Poisson Distribution'],
    cols: ['Moment Generating Function', 'Variance', 'Binomial Distribution'],
    grid: [[40, 100, 12], [61, 70, 8], [10, 45, 76]],
    pairs: [
      { cards: ['Expected Value', 'Moment Generating Function'], strength: 61, shared: 4, cell: [1, 0] },
      { cards: ['Poisson Distribution', 'Binomial Distribution'], strength: 76, shared: 0, cell: [2, 2] },
      { cards: ['Variance', 'Variance'], strength: 100, shared: 30, cell: [0, 1] },
    ],
    rounds: [
      { pair: 0, paired: true, coin: null, basis: 'both', topic: 'Expected Value' },
      { pair: 1, paired: false, coin: 1, basis: 'one', topic: 'Binomial Distribution' },
      { pair: 2, paired: true, coin: null, basis: 'both', topic: 'Variance' },
    ],
  }

  it('round-trips the draw, the strikes and the deal through JSON', () => {
    for (const d of [drawing, striking, dealing]) expect(parseDraft(JSON.parse(JSON.stringify(d)))).toEqual(d)
  })

  it('takes a hidden hand as locked in, and nothing else short of four', () => {
    expect(parseDraft({ ...drawing, hands: [HAND_A, []], levels: [[1, 0, 3, 2], []] })).not.toBeNull()
    expect(parseDraft({ ...drawing, hands: [HAND_A.slice(0, 3), null] })).toBeNull()
    expect(parseDraft({ ...drawing, hands: [[...HAND_A, 'Mean'], null] })).toBeNull()
    expect(parseDraft({ ...drawing, levels: [[1, 0, 3], null] })).toBeNull()
    expect(parseDraft({ ...drawing, levels: [[1, 0, 3, 4], null] })).toBeNull()
  })

  it('holds the phases together: no strike while drawing, no deal before dealing, a full deal once dealing', () => {
    expect(parseDraft({ ...drawing, strikes: ['Covariance', null] })).toBeNull()
    expect(parseDraft({ ...striking, hands: [HAND_A, null] })).toBeNull()
    expect(parseDraft({ ...striking, pairs: dealing.pairs })).toBeNull()
    expect(parseDraft({ ...dealing, pairs: dealing.pairs.slice(0, 2) })).toBeNull()
    expect(parseDraft({ ...dealing, rounds: [] })).toBeNull()
    expect(parseDraft({ ...dealing, grid: [[1, 2, 3]] })).toBeNull()
    expect(parseDraft({ ...dealing, rounds: [{ ...dealing.rounds[0], pair: 5 }] })).toBeNull()
  })

  it('refuses the wrong shapes rather than throwing', () => {
    for (const bad of [
      null, 'x', {}, { ...drawing, phase: 'picking' }, { ...drawing, hands: [null] }, { ...drawing, game: -1 },
      { ...drawing, counts: [5, 0] }, { ...dealing, grid: [[101, 0, 0], [0, 0, 0], [0, 0, 0]] },
      { ...dealing, rounds: [{ ...dealing.rounds[0], basis: 'luck' }] }, { ...dealing, rounds: [{ ...dealing.rounds[0], coin: 2 }] },
    ]) {
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
    const draft: BattleDraft = { ...emptyDraft(1, 30_000), counts: [2, 4], hands: [null, []], levels: [null, []] }
    expect(parseMessage({ ...room, stage: 'drafting', battle: null, draft })).toMatchObject({ stage: 'drafting', draft })
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 3 } }))
      .toEqual({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 3 } })
    const hand = ['Bayes Theorem', 'Variance', 'Mean', 'Mode']
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 4, topics: hand, levels: [0, 1, 2, 3] } }))
      .toMatchObject({ action: { kind: 'hand', game: 1, count: 4, topics: hand, levels: [0, 1, 2, 3] } })
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'strike', game: 1, topic: 'Variance' } }))
      .toMatchObject({ action: { kind: 'strike', game: 1, topic: 'Variance' } })
  })

  it('drops anything it does not recognise', () => {
    expect(parseMessage({ ...base, t: 'shout' })).toBeNull()
    expect(parseMessage({ ...base, t: 'react', seat: 1, emoji: '<script>' })).toBeNull()
    expect(parseMessage({ ...base, t: 'react', seat: 2, emoji: '🔥' })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'win' } })).toBeNull()
    // The old topic pick, and a stage that went with it, are gone.
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'topics', game: 1, topics: ['a'] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 5 } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 4, topics: ['a', 'b', 'c', 'd', 'e'] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 4, topics: ['x'.repeat(500)] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 1, levels: [1] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'hand', game: 1, count: 2, topics: ['a', 'b'], levels: [1] } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'strike', game: 1, topic: 7 } })).toBeNull()
    expect(parseMessage({ ...base, t: 'act', action: { kind: 'strike', game: -1, topic: 'Variance' } })).toBeNull()
    expect(parseMessage({ ...base, t: 'room', to: 'c2', sentAt: 1, stage: 'picking', host: { name: 'A' }, guest: { name: 'B' }, config: sampleBattle().config, battle: null, draft: null, rematch: [false, false] })).toBeNull()
    expect(parseMessage({ ...base, t: 'room', to: 'c2', sentAt: 1, stage: 'drafting', host: { name: 'A' }, guest: { name: 'B' }, config: sampleBattle().config, battle: null, draft: { junk: true }, rematch: [false, false] })).toBeNull()
    expect(parseMessage({ t: 'ping', from: 'c1' })).toBeNull()
    expect(parseMessage({ ...base, t: 'room', to: 'c2', sentAt: 1, stage: 'playing', host: { name: 'A' }, guest: { name: 'B' }, config: sampleBattle().config, battle: { junk: true }, rematch: [false, false] })).toBeNull()
  })
})

describe('abilities on the wire (docs/actuaria-online.md §7.2)', () => {
  function abilitiesBattle(): BattleState {
    const s = createBattle({
      config: { rules: 'simultaneous', exam: 'Probability', rounds: 3, roundSeconds: 60, abilities: true },
      players: [{ name: 'Ada' }, { name: 'Bo' }],
      questions: ['p-1', 'p-2', 'p-3'].map(id => ({ id, answer: 'B', options: ['A', 'B', 'C', 'D'] })),
      now: 1000,
      graceMs: 1500,
      loadouts: [['bayesian-update', 'reinsurance'], ['double-down']],
    })
    return [
      { type: 'tick' as const, now: 5000 },
      { type: 'power' as const, seat: 0 as const, ability: 'bayesian-update' as const, now: 5000, strike: 'C' },
      { type: 'power' as const, seat: 0 as const, ability: 'reinsurance' as const, now: 5001 },
      { type: 'power' as const, seat: 1 as const, ability: 'double-down' as const, now: 5002 },
    ].reduce(battleReducer, s)
  }

  it('is a new version of the protocol — an older bundle refuses the room', () => {
    // 2 was the topic pick, 3 abilities, 4 the pairs draft.
    expect(PROTOCOL_VERSION).toBe(4)
  })

  it('round-trips a battle with abilities through JSON', () => {
    const s = abilitiesBattle()
    const back = parseBattleState(JSON.parse(JSON.stringify(s)))
    expect(back).toEqual(s)
    expect(back!.spent).toEqual([['bayesian-update', 'reinsurance'], ['double-down']])
    expect(back!.reinsured).toEqual([true, false])
  })

  it('refuses a loadout over the cap, an unknown ability or one listed twice', () => {
    const over = JSON.parse(JSON.stringify(abilitiesBattle()))
    over.loadouts[0] = ['reinsurance', 'double-down', 'time-value', 'immunization']
    expect(parseBattleState(over)).toBeNull()
    const unknown = JSON.parse(JSON.stringify(abilitiesBattle()))
    unknown.rounds[0].powers[1] = ['poisson-burst']
    expect(parseBattleState(unknown)).toBeNull()
    const twice = JSON.parse(JSON.stringify(abilitiesBattle()))
    twice.spent[1] = ['double-down', 'double-down']
    expect(parseBattleState(twice)).toBeNull()
    const longStrike = JSON.parse(JSON.stringify(abilitiesBattle()))
    longStrike.rounds[0].struck[0] = 'x'.repeat(40)
    expect(parseBattleState(longStrike)).toBeNull()
  })

  it('parses the power move, and a join that declares a loadout', () => {
    const v = PROTOCOL_VERSION
    expect(parseMessage({ t: 'act', v, from: 'g', action: { kind: 'power', round: 1, ability: 'time-value' } }))
      .toEqual({ t: 'act', v, from: 'g', action: { kind: 'power', round: 1, ability: 'time-value' } })
    expect(parseMessage({ t: 'act', v, from: 'g', action: { kind: 'power', round: 1, ability: 'afterburner' } })).toBeNull()
    expect(parseMessage({ t: 'join', v, from: 'g', name: 'Bo', loadout: ['reinsurance', 'immunization'] }))
      .toMatchObject({ loadout: ['reinsurance', 'immunization'] })
    expect(parseMessage({ t: 'join', v, from: 'g', name: 'Bo', loadout: ['reinsurance', 'time-value', 'double-down', 'immunization'] })).toBeNull()
    expect(parseMessage({ t: 'join', v, from: 'g', name: 'Bo', loadout: 'reinsurance' })).toBeNull()
  })
})
