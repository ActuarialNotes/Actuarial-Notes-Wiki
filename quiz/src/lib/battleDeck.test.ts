import { describe, expect, it } from 'vitest'
import { battleReducer, createBattle, currentRound, type BattleEvent, type BattleState, type Seat } from './battle'
import {
  DECK_MODES,
  deckRoundLabel,
  handLayout,
  levelTag,
  lostRounds,
  nextInCycle,
  practicePath,
  roundRows,
  weakestLostTopic,
} from './battleDeck'
import type { MasteryState } from './mastery'

const T0 = 1_000_000

function battle(): BattleState {
  return createBattle({
    config: { rules: 'buzzer', exam: 'Probability', rounds: 3, roundSeconds: 60 },
    players: [{ name: 'Ada' }, { name: 'Bo' }],
    questions: [0, 1, 2].map(i => ({ id: `q${i}`, answer: 'B', options: ['A', 'B', 'C', 'D'] })),
    now: T0,
  })
}

/** Buzz each seat in turn with its choice, then move on. */
function playRound(state: BattleState, moves: [Seat, string][]): BattleState {
  let s = state
  let t = currentRound(s).opensAt + 1000
  const step = (e: BattleEvent) => { s = battleReducer(s, e) }
  step({ type: 'tick', now: t })
  for (const [seat, choice] of moves) {
    t += 500
    step({ type: 'buzz', seat, now: t })
    t += 500
    step({ type: 'answer', seat, choice, now: t })
  }
  step({ type: 'next', now: t + 500 })
  return s
}

/** Ada takes round 1; Ada misses round 2 and Bo steals it; Bo takes the final. */
function played(): BattleState {
  let s = battle()
  s = playRound(s, [[0, 'B']])
  s = playRound(s, [[0, 'A'], [1, 'B']])
  s = playRound(s, [[1, 'B']])
  return s
}

const TOPICS = ['Bayes Theorem', 'Poisson Distribution', 'Variance']
const topicOf = (i: number) => (TOPICS[i] ? [TOPICS[i]] : [])

describe('the hand of modes', () => {
  it('rests with Random opponent raised in the middle', () => {
    expect(handLayout('lobby')).toEqual({ left: 'local', middle: 'lobby', right: 'friend' })
  })
  it('raises a side card into the middle, the other two keeping their order', () => {
    expect(handLayout('local')).toEqual({ left: 'lobby', middle: 'local', right: 'friend' })
    expect(handLayout('friend')).toEqual({ left: 'local', middle: 'friend', right: 'lobby' })
    for (const m of DECK_MODES) {
      const { left, middle, right } = handLayout(m)
      expect(new Set([left, middle, right]).size).toBe(3)
    }
  })
  it('steps a setting on, wrapping at the end', () => {
    expect(nextInCycle([3, 5, 7, 10], 5)).toBe(7)
    expect(nextInCycle([3, 5, 7, 10], 10)).toBe(3)
    expect(nextInCycle([3, 5, 7, 10], 4)).toBe(3)
  })
})

describe('the results', () => {
  it('tells each round with what it was worth to each player', () => {
    const rows = roundRows(played(), topicOf)
    expect(rows.map(r => r.topics)).toEqual(TOPICS.map(t => [t]))
    expect(rows.map(r => r.final)).toEqual([false, false, true])
    expect(rows[0].points[0]).toBeGreaterThan(0)
    expect(rows[0].points[1]).toBe(0)
    // Ada's wrong buzz costs her; Bo's steal pays him.
    expect(rows[1].points[0]).toBeLessThan(0)
    expect(rows[1].points[1]).toBeGreaterThan(0)
  })

  it('counts a round lost when the seat never got it right', () => {
    const s = played()
    expect(lostRounds(s, 0)).toEqual([1, 2])
    expect(lostRounds(s, 1)).toEqual([0])
  })

  it('offers the lost round on the topic held at the lowest level', () => {
    const s = played()
    const levels: Record<string, MasteryState> = { 'Poisson Distribution': 'level2', Variance: 'new' }
    expect(weakestLostTopic(s, 0, topicOf, t => levels[t] ?? 'new')).toBe('Variance')
    // A tie goes to the earlier round.
    expect(weakestLostTopic(s, 0, topicOf, () => 'level1')).toBe('Poisson Distribution')
    expect(weakestLostTopic(s, 0, () => [], () => 'new')).toBeNull()
    // A paired round offers whichever of its two cards is held lower.
    const paired = (i: number) => (i === 1 ? ['Poisson Distribution', 'Bayes Theorem'] : topicOf(i))
    expect(weakestLostTopic(s, 0, paired, t => (t === 'Bayes Theorem' ? 'new' : 'level2'))).toBe('Bayes Theorem')
  })

  it('opens Practice as the quiz builder’s concept launch', () => {
    expect(practicePath('Bayes Theorem')).toBe('/quiz?concept=Bayes+Theorem&mode=quiz&reveal=during&from=home&links=1')
  })

  it('names a round as its card prints it', () => {
    const s = battle()
    expect(deckRoundLabel(s, 0)).toBe('Round 1 of 3')
    expect(deckRoundLabel(s, 2)).toBe('Final ×2')
    expect(levelTag('level2')).toBe('L2')
    expect(levelTag('forgotten')).toBe('New')
  })
})
