import { describe, expect, it } from 'vitest'
import type { Question } from './parser'
import {
  ANSWER_WINDOW_MS,
  BASE_POINTS,
  DOUBLE_DOWN_CLAIM,
  SEATS,
  canUse,
  cleanLoadout,
  strikeable,
  timeValueBonus,
  type AbilityId,
  type Seat,
  COUNTDOWN_MS,
  FASTEST_BONUS,
  FINAL_ROUND_MULTIPLIER,
  ONLINE_GRACE_MS,
  SPEED_BONUS_MAX,
  STEAL_MIN_MS,
  STREAK_STEP,
  WRONG_BUZZ_PENALTY,
  battleExamCounts,
  battlePool,
  battleReducer,
  cleanPlayerName,
  createBattle,
  currentRound,
  formatBattleTime,
  isBattleQuestion,
  missedQuestionIds,
  momentum,
  msLeft,
  redactFor,
  roundSecondsFor,
  roundTaker,
  shiftClock,
  speedBonus,
  streakBonus,
  summarizeBattle,
  type BattleConfig,
  type BattleEvent,
  type BattleQuestionKey,
  type BattleState,
} from './battle'

const T0 = 1_000_000
const OPEN = T0 + COUNTDOWN_MS

function keys(n: number): BattleQuestionKey[] {
  return Array.from({ length: n }, (_, i) => ({ id: `q${i}`, answer: 'B', options: ['A', 'B', 'C', 'D'] }))
}

function battle(rules: BattleConfig['rules'], rounds = 5, extra: { graceMs?: number } = {}): BattleState {
  return createBattle({
    config: { rules, exam: 'Probability', rounds, roundSeconds: 60 },
    players: [{ name: 'Ada' }, { name: 'Bo' }],
    questions: keys(rounds),
    now: T0,
    ...extra,
  })
}

function run(state: BattleState, ...events: BattleEvent[]): BattleState {
  return events.reduce(battleReducer, state)
}

/** Open round `index`'s question, given the time its countdown started. */
function opensAt(state: BattleState): number {
  return currentRound(state).opensAt
}

describe('createBattle', () => {
  it('starts on a countdown to the first question', () => {
    const s = battle('buzzer')
    expect(s.rounds).toHaveLength(1)
    expect(currentRound(s).phase).toBe('countdown')
    expect(currentRound(s).opensAt).toBe(OPEN)
    expect(currentRound(s).deadline).toBe(OPEN + 60_000)
    expect(s.scores).toEqual([0, 0])
  })

  it('runs to the questions it was given when there are fewer than the rounds asked for', () => {
    const s = createBattle({
      config: { rules: 'buzzer', exam: 'P', rounds: 10, roundSeconds: 60 },
      players: [{ name: 'A' }, { name: 'B' }],
      questions: keys(4),
      now: T0,
    })
    expect(s.config.rounds).toBe(4)
  })

  it('refuses a battle with no questions', () => {
    expect(() => createBattle({
      config: { rules: 'buzzer', exam: 'P', rounds: 5, roundSeconds: 60 },
      players: [{ name: 'A' }, { name: 'B' }],
      questions: [],
      now: T0,
    })).toThrow()
  })
})

describe('the clock', () => {
  it('opens the question when the countdown is up, and not before', () => {
    const s = battle('buzzer')
    expect(currentRound(battleReducer(s, { type: 'tick', now: OPEN - 1 })).phase).toBe('countdown')
    expect(currentRound(battleReducer(s, { type: 'tick', now: OPEN })).phase).toBe('open')
  })

  it('returns the same state, by identity, when nothing is due', () => {
    const s = battle('buzzer')
    expect(battleReducer(s, { type: 'tick', now: T0 + 10 })).toBe(s)
  })

  it('passes several boundaries in one tick', () => {
    const s = battle('buzzer')
    const late = battleReducer(s, { type: 'tick', now: OPEN + 60_000 })
    expect(currentRound(late).phase).toBe('revealed')
    expect(currentRound(late).outcome).toBe('timeout')
  })

  it('reads the clock for each phase', () => {
    const s = battle('buzzer')
    expect(msLeft(currentRound(s), T0 + 1000)).toBe(2000)
    const open = battleReducer(s, { type: 'tick', now: OPEN })
    expect(msLeft(currentRound(open), OPEN + 15_000)).toBe(45_000)
  })
})

describe('buzzer rules', () => {
  const open = () => battleReducer(battle('buzzer'), { type: 'tick', now: OPEN })

  it('gives the floor to the first buzz and ignores the second', () => {
    const s = run(open(), { type: 'buzz', seat: 1, now: OPEN + 5000 }, { type: 'buzz', seat: 0, now: OPEN + 5001 })
    const r = currentRound(s)
    expect(r.phase).toBe('buzzed')
    expect(r.floor).toEqual({ seat: 1, elapsedMs: 5000 })
    expect(r.deadline).toBe(OPEN + 5000 + ANSWER_WINDOW_MS)
    expect(r.heldMs).toBe(55_000)
  })

  it('does not take a buzz before the question is up', () => {
    const s = battle('buzzer')
    expect(battleReducer(s, { type: 'buzz', seat: 0, now: T0 + 100 })).toBe(s)
  })

  it('only takes an answer from whoever holds the floor', () => {
    const s = run(open(), { type: 'buzz', seat: 0, now: OPEN + 1000 })
    expect(battleReducer(s, { type: 'answer', seat: 1, choice: 'B', now: OPEN + 2000 })).toBe(s)
  })

  it('ignores a choice the question does not offer', () => {
    const s = run(open(), { type: 'buzz', seat: 0, now: OPEN + 1000 })
    expect(battleReducer(s, { type: 'answer', seat: 0, choice: 'Z', now: OPEN + 2000 })).toBe(s)
  })

  it('scores a right answer on base, speed to the buzz and the run, and ends the round', () => {
    const s = run(open(),
      { type: 'buzz', seat: 0, now: OPEN + 15_000 },
      { type: 'answer', seat: 0, choice: 'B', now: OPEN + 20_000 },
    )
    const r = currentRound(s)
    expect(r.phase).toBe('revealed')
    expect(r.outcome).toBe('won')
    // 15s of a 60s round gone at the buzz: three quarters of the speed bonus.
    const expected = BASE_POINTS + Math.round(SPEED_BONUS_MAX * 0.75)
    expect(r.answers[0].points.total).toBe(expected)
    expect(s.scores).toEqual([expected, 0])
    expect(s.streaks).toEqual([1, 0])
  })

  it('costs a wrong buzz and hands the other player the steal on the time left', () => {
    const s = run(open(),
      { type: 'buzz', seat: 0, now: OPEN + 10_000 },
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 12_000 },
    )
    const r = currentRound(s)
    expect(s.scores[0]).toBe(-WRONG_BUZZ_PENALTY)
    expect(r.phase).toBe('open')
    expect(r.lockedOut).toEqual([0])
    // 50s were left at the buzz; the answer window didn't come out of them.
    expect(r.deadline).toBe(OPEN + 12_000 + 50_000)
    // The player who missed can't buzz again.
    expect(battleReducer(s, { type: 'buzz', seat: 0, now: OPEN + 13_000 })).toBe(s)
  })

  it('gives a steal at least STEAL_MIN_MS, however late the miss', () => {
    const s = run(open(),
      { type: 'buzz', seat: 0, now: OPEN + 58_000 },
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 60_000 },
    )
    expect(currentRound(s).deadline).toBe(OPEN + 60_000 + STEAL_MIN_MS)
  })

  it('marks a right answer after the other player missed as a steal', () => {
    const s = run(open(),
      { type: 'buzz', seat: 0, now: OPEN + 10_000 },
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 12_000 },
      { type: 'buzz', seat: 1, now: OPEN + 14_000 },
      { type: 'answer', seat: 1, choice: 'B', now: OPEN + 15_000 },
    )
    const r = currentRound(s)
    expect(r.outcome).toBe('won')
    expect(r.answers.map(a => [a.seat, a.correct, a.steal])).toEqual([[0, false, false], [1, true, true]])
    expect(roundTaker(r)).toBe(1)
  })

  it('ends the round as missed when both players get it wrong', () => {
    const s = run(open(),
      { type: 'buzz', seat: 0, now: OPEN + 10_000 },
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 11_000 },
      { type: 'buzz', seat: 1, now: OPEN + 12_000 },
      { type: 'answer', seat: 1, choice: 'C', now: OPEN + 13_000 },
    )
    const r = currentRound(s)
    expect(r.phase).toBe('revealed')
    expect(r.outcome).toBe('missed')
    expect(s.scores).toEqual([-WRONG_BUZZ_PENALTY, -WRONG_BUZZ_PENALTY])
    expect(roundTaker(r)).toBeNull()
  })

  it('treats an answer window that runs out as a miss', () => {
    const s = run(open(),
      { type: 'buzz', seat: 1, now: OPEN + 1000 },
      { type: 'tick', now: OPEN + 1000 + ANSWER_WINDOW_MS },
    )
    const r = currentRound(s)
    expect(r.answers[0]).toMatchObject({ seat: 1, choice: null, correct: false })
    expect(s.scores[1]).toBe(-WRONG_BUZZ_PENALTY)
    expect(r.phase).toBe('open')
  })

  it('ends as missed when the steal is never taken', () => {
    const s = run(open(),
      { type: 'buzz', seat: 0, now: OPEN + 1000 },
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 2000 },
      { type: 'tick', now: OPEN + 2000 + 59_000 },
    )
    expect(currentRound(s).outcome).toBe('missed')
  })
})

describe('simultaneous rules', () => {
  const open = (graceMs = 0) => battleReducer(battle('simultaneous', 5, { graceMs }), { type: 'tick', now: OPEN })

  it('takes one answer per player and reveals once both are in', () => {
    let s = run(open(), { type: 'answer', seat: 0, choice: 'B', now: OPEN + 6000 })
    expect(currentRound(s).phase).toBe('open')
    expect(battleReducer(s, { type: 'answer', seat: 0, choice: 'C', now: OPEN + 7000 })).toBe(s)
    s = battleReducer(s, { type: 'answer', seat: 1, choice: 'B', now: OPEN + 12_000 })
    expect(currentRound(s).phase).toBe('revealed')
  })

  it('pays the fastest right answer a bonus, and both right answers their speed', () => {
    const s = run(open(),
      { type: 'answer', seat: 1, choice: 'B', now: OPEN + 30_000 },
      { type: 'answer', seat: 0, choice: 'B', now: OPEN + 15_000, elapsedMs: 15_000 },
    )
    const [first, second] = currentRound(s).answers
    expect(first).toMatchObject({ seat: 0, fastest: true })
    expect(second).toMatchObject({ seat: 1, fastest: false })
    expect(first.points.total).toBe(BASE_POINTS + speedBonus(15_000, 60_000) + FASTEST_BONUS)
    expect(second.points.total).toBe(BASE_POINTS + speedBonus(30_000, 60_000))
  })

  it('never takes points for a wrong answer', () => {
    const s = run(open(),
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 1000 },
      { type: 'answer', seat: 1, choice: 'B', now: OPEN + 2000 },
    )
    expect(s.scores[0]).toBe(0)
    expect(currentRound(s).answers.find(a => a.seat === 1)?.fastest).toBe(true)
  })

  it('uses the answering device’s own elapsed time, clamped to the round', () => {
    const s = run(open(), { type: 'answer', seat: 1, choice: 'B', now: OPEN + 9000, elapsedMs: 99_999_999 })
    expect(currentRound(s).locks[1]?.elapsedMs).toBe(60_000)
  })

  it('waits out the grace period for an answer still in flight', () => {
    let s = open(ONLINE_GRACE_MS)
    s = run(s,
      { type: 'answer', seat: 0, choice: 'B', now: OPEN + 1000 },
      { type: 'tick', now: OPEN + 60_000 },
    )
    expect(currentRound(s).phase).toBe('open')
    s = battleReducer(s, { type: 'answer', seat: 1, choice: 'B', now: OPEN + 60_000 + 500, elapsedMs: 59_900 })
    expect(currentRound(s).phase).toBe('revealed')
    expect(currentRound(s).answers).toHaveLength(2)
  })

  it('reveals whatever is in when the clock runs out', () => {
    const s = run(open(),
      { type: 'answer', seat: 1, choice: 'B', now: OPEN + 1000 },
      { type: 'tick', now: OPEN + 60_000 },
    )
    const r = currentRound(s)
    expect(r.phase).toBe('revealed')
    expect(r.answers).toHaveLength(1)
    expect(s.streaks).toEqual([0, 1])
  })

  it('advances when both players are ready', () => {
    let s = run(open(),
      { type: 'answer', seat: 0, choice: 'B', now: OPEN + 1000 },
      { type: 'answer', seat: 1, choice: 'B', now: OPEN + 1000 },
      { type: 'ready', seat: 0, now: OPEN + 5000 },
    )
    expect(s.rounds).toHaveLength(1)
    expect(battleReducer(s, { type: 'ready', seat: 0, now: OPEN + 5001 })).toBe(s)
    s = battleReducer(s, { type: 'ready', seat: 1, now: OPEN + 6000 })
    expect(s.rounds).toHaveLength(2)
    expect(currentRound(s)).toMatchObject({ index: 1, phase: 'countdown', opensAt: OPEN + 6000 + COUNTDOWN_MS })
  })
})

describe('runs and the final round', () => {
  /** Seat 0 answers every question right, 1s in, and moves on. */
  function sweep(rounds: number): BattleState {
    let s = battle('buzzer', rounds)
    for (let i = 0; i < rounds; i++) {
      const at = opensAt(s)
      s = run(s,
        { type: 'buzz', seat: 0, now: at },
        { type: 'answer', seat: 0, choice: 'B', now: at + 500 },
        { type: 'next', now: at + 1000 },
      )
    }
    return s
  }

  it('adds a step per right answer in a row, up to the cap', () => {
    expect([1, 2, 3, 4, 5, 9].map(streakBonus)).toEqual([0, STREAK_STEP, 2 * STREAK_STEP, 3 * STREAK_STEP, 3 * STREAK_STEP, 3 * STREAK_STEP])
  })

  it('doubles every point of the last question', () => {
    const s = sweep(3)
    const last = s.rounds[2].answers[0].points
    expect(last.multiplier).toBe(FINAL_ROUND_MULTIPLIER)
    expect(last.total).toBe((BASE_POINTS + SPEED_BONUS_MAX + streakBonus(3)) * FINAL_ROUND_MULTIPLIER)
    expect(s.finished).toBe(true)
    expect(s.bestStreaks).toEqual([3, 0])
  })

  it('does not double the last question of a two-question battle', () => {
    const s = sweep(2)
    expect(s.rounds[1].answers[0].points.multiplier).toBe(1)
  })

  it('breaks a run on a round the player did not win', () => {
    let s = battle('buzzer', 5)
    let at = opensAt(s)
    s = run(s, { type: 'buzz', seat: 0, now: at }, { type: 'answer', seat: 0, choice: 'B', now: at + 1 }, { type: 'next', now: at + 2 })
    at = opensAt(s)
    s = run(s, { type: 'buzz', seat: 1, now: at }, { type: 'answer', seat: 1, choice: 'B', now: at + 1 })
    expect(s.streaks).toEqual([0, 1])
  })
})

describe('summarizeBattle', () => {
  it('names the higher score the winner, and the gap', () => {
    let s = battle('simultaneous', 3)
    for (let i = 0; i < 3; i++) {
      const at = opensAt(s)
      s = run(s,
        { type: 'answer', seat: 0, choice: 'B', now: at + 2000 },
        { type: 'answer', seat: 1, choice: i === 0 ? 'B' : 'A', now: at + 1000 },
        { type: 'ready', seat: 0, now: at + 3000 },
        { type: 'ready', seat: 1, now: at + 3000 },
      )
    }
    const summary = summarizeBattle(s)
    expect(summary.winner).toBe(0)
    expect(summary.played).toBe(3)
    expect(summary.margin).toBe(s.scores[0] - s.scores[1])
    expect(summary.players[0]).toMatchObject({ correct: 3, answered: 3, bestStreak: 3, fastestMs: 2000 })
    expect(summary.players[1]).toMatchObject({ correct: 1, answered: 3, bestStreak: 1, fastestMs: 1000 })
  })

  it('calls a level score a draw', () => {
    const s = battleReducer(battle('buzzer', 3), { type: 'tick', now: OPEN + 60_000 })
    expect(summarizeBattle(s).winner).toBeNull()
  })

  it('hands a forfeit to the player who stayed', () => {
    const s = battleReducer(battle('buzzer'), { type: 'forfeit', seat: 0, now: T0 })
    expect(s.finished).toBe(true)
    expect(summarizeBattle(s)).toMatchObject({ winner: 1, forfeit: 0 })
    // Nothing more happens to a finished battle.
    expect(battleReducer(s, { type: 'tick', now: OPEN })).toBe(s)
  })

  it('counts a steal', () => {
    const s = run(battleReducer(battle('buzzer'), { type: 'tick', now: OPEN }),
      { type: 'buzz', seat: 0, now: OPEN + 1000 },
      { type: 'answer', seat: 0, choice: 'A', now: OPEN + 2000 },
      { type: 'buzz', seat: 1, now: OPEN + 3000 },
      { type: 'answer', seat: 1, choice: 'B', now: OPEN + 4000 },
    )
    expect(summarizeBattle(s).players[1].steals).toBe(1)
  })
})

describe('seen from one side', () => {
  it('hides the other player’s locked answer until the reveal', () => {
    const s = run(battleReducer(battle('simultaneous'), { type: 'tick', now: OPEN }),
      { type: 'answer', seat: 0, choice: 'B', now: OPEN + 1000 },
    )
    expect(currentRound(redactFor(s, 1)).locks[0]).toEqual({ choice: null, elapsedMs: 0 })
    expect(currentRound(redactFor(s, 0)).locks[0]?.choice).toBe('B')
    // The original is untouched.
    expect(currentRound(s).locks[0]?.choice).toBe('B')
  })

  it('moves every moment onto another clock', () => {
    const s = battle('buzzer')
    const moved = shiftClock(s, -250)
    expect(currentRound(moved).opensAt).toBe(OPEN - 250)
    expect(currentRound(moved).deadline).toBe(OPEN + 60_000 - 250)
    expect(shiftClock(s, 0)).toBe(s)
  })
})

describe('momentum', () => {
  it('is even at the start and when nobody is above zero', () => {
    expect(momentum([0, 0])).toBe(0.5)
    expect(momentum([-50, -100])).toBe(0.5)
  })
  it('is the first player’s share of the points', () => {
    expect(momentum([300, 100])).toBe(0.75)
    expect(momentum([-50, 200])).toBe(0)
  })
})

describe('questions', () => {
  function q(partial: Partial<Question>): Question {
    return {
      id: 'x', exam: 'Probability', topic: '', learning_objective: '', difficulty: 'medium',
      type: 'multiple-choice', wiki_link: [], answer: 'A', explanation: '', points: 1, stem: '',
      options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
      ...partial,
    }
  }

  it('races only multiple choice whose answer is among the options', () => {
    expect(isBattleQuestion(q({}))).toBe(true)
    expect(isBattleQuestion(q({ type: 'multi-part', options: [] }))).toBe(false)
    expect(isBattleQuestion(q({ answer: 'E' }))).toBe(false)
    expect(isBattleQuestion(q({ options: [{ key: 'A', text: '1' }] }))).toBe(false)
  })

  it('draws from the exam, and counts only exams with enough for a battle', () => {
    const bank = [
      q({ id: 'p1' }), q({ id: 'p2' }), q({ id: 'p3' }),
      q({ id: 'f1', exam: 'Financial Mathematics' }),
      q({ id: 'w1', exam: 'Exam 5', type: 'multi-part', options: [] }),
    ]
    expect(battlePool(bank, 'Probability').map(x => x.id)).toEqual(['p1', 'p2', 'p3'])
    expect([...battleExamCounts(bank)]).toEqual([['Probability', 3]])
  })

  it('times "Exam pace" off the sitting', () => {
    expect(roundSecondsFor('blitz', 'Probability')).toBe(60)
    expect(roundSecondsFor('exam', 'Probability')).toBe(360)
    expect(roundSecondsFor('exam', 'Exam MAS-I')).toBe(320)
  })
})

describe('formatting', () => {
  it('cleans a name, and falls back when there is none', () => {
    expect(cleanPlayerName('  Ada   Lovelace ', 'P1')).toBe('Ada Lovelace')
    expect(cleanPlayerName('   ', 'P1')).toBe('P1')
    expect(cleanPlayerName(42, 'P1')).toBe('P1')
    expect(cleanPlayerName('x'.repeat(50), 'P1')).toHaveLength(20)
  })

  it('prints a time', () => {
    expect(formatBattleTime(3420)).toBe('3.4s')
    expect(formatBattleTime(65_000)).toBe('1:05')
  })
})

describe('the claims review — each player’s misses (docs/actuaria-online.md §6.9)', () => {
  it('lists the rounds a seat got wrong or left unanswered, in the order played', () => {
    let s = battle('simultaneous', 3)
    // Round 1: Ada right, Bo wrong.
    s = run(s, { type: 'tick', now: OPEN }, { type: 'answer', seat: 0, choice: 'B', now: OPEN + 1000 }, { type: 'answer', seat: 1, choice: 'A', now: OPEN + 2000 })
    s = run(s, { type: 'ready', seat: 0, now: OPEN + 3000 }, { type: 'ready', seat: 1, now: OPEN + 3000 })
    // Round 2: Ada says nothing, Bo right; the clock runs out.
    const o2 = opensAt(s)
    s = run(s, { type: 'tick', now: o2 }, { type: 'answer', seat: 1, choice: 'B', now: o2 + 500 }, { type: 'tick', now: o2 + 60_000 })
    expect(missedQuestionIds(s, 0)).toEqual(['q1'])
    expect(missedQuestionIds(s, 1)).toEqual(['q0'])
  })

  it('counts only rounds played to a reveal', () => {
    const s = run(battle('buzzer', 3), { type: 'tick', now: OPEN })
    expect(missedQuestionIds(s, 0)).toEqual([])
    const forfeited = battleReducer(s, { type: 'forfeit', seat: 1, now: OPEN + 1 })
    expect(missedQuestionIds(forfeited, 0)).toEqual([])
  })
})

// ── Abilities (docs/actuaria-online.md §7.2) ────────────────────────────────

describe('abilities', () => {
  type Loadouts = [AbilityId[], AbilityId[]]

  function withAbilities(rules: BattleConfig['rules'], loadouts: Loadouts, opts: { rounds?: number; roundSeconds?: number; on?: boolean } = {}): BattleState {
    return createBattle({
      config: { rules, exam: 'Probability', rounds: opts.rounds ?? 5, roundSeconds: opts.roundSeconds ?? 120, abilities: opts.on ?? true },
      players: [{ name: 'Ada' }, { name: 'Bo' }],
      questions: keys(opts.rounds ?? 5),
      now: T0,
      graceMs: rules === 'simultaneous' ? ONLINE_GRACE_MS : 0,
      loadouts,
    })
  }

  /** Play the current simultaneous round: each seat's choice (or none) at its time, then both Ready. */
  function playRound(s: BattleState, picks: [{ choice: string; ms: number } | null, { choice: string; ms: number } | null], powers: { seat: Seat; ability: AbilityId; strike?: string }[] = []): BattleState {
    const at = opensAt(s)
    s = run(s, { type: 'tick', now: at })
    for (const p of powers) s = run(s, { type: 'power', seat: p.seat, ability: p.ability, now: at, strike: p.strike })
    SEATS.forEach(seat => {
      const pick = picks[seat]
      if (pick) s = run(s, { type: 'answer', seat, choice: pick.choice, now: at + pick.ms, elapsedMs: pick.ms })
    })
    return run(s, { type: 'tick', now: at + 120_000 + ONLINE_GRACE_MS })
  }

  function next(s: BattleState): BattleState {
    const now = currentRound(s).deadline + ONLINE_GRACE_MS + 1
    return run(s, { type: 'ready', seat: 0, now }, { type: 'ready', seat: 1, now })
  }

  const mine = (s: BattleState, seat: Seat = 0) => currentRound(s).answers.find(a => a.seat === seat)!

  describe('the worked example — private channel, simultaneous, Standard, round 2 of 5', () => {
    // Your second right answer in a row, locked in at 30 s, the first right
    // answer of the round (§7.2's table, as a fixture).
    function roundTwo(powers: AbilityId[]): BattleState {
      let s = withAbilities('simultaneous', [['time-value', 'double-down', 'reinsurance'], []])
      s = playRound(s, [{ choice: 'B', ms: 10_000 }, { choice: 'A', ms: 5_000 }])
      s = next(s)
      return playRound(s, [{ choice: 'B', ms: 30_000 }, { choice: 'A', ms: 40_000 }], powers.map(ability => ({ seat: 0 as Seat, ability })))
    }

    it('scores 183 with no ability: 100 + 38 speed + 20 streak + 25 fastest', () => {
      const p = mine(roundTwo([])).points
      expect([p.base, p.speed, p.streak, p.fastest, p.ability, p.total]).toEqual([100, 38, 20, 25, 0, 183])
    })

    it('scores 195 with Time Value: speed as if at 0 s, a line of +12', () => {
      const p = mine(roundTwo(['time-value'])).points
      expect([p.speed, p.ability, p.multiplier, p.total]).toEqual([38, 12, 1, 195])
    })

    it('scores 390 with Time Value and Double Down: +12, then ×2 on the whole round', () => {
      const p = mine(roundTwo(['time-value', 'double-down'])).points
      expect([p.multiplier, p.ability, p.total]).toEqual([2, 24, 390])
    })
  })

  it('turns a Double Down miss into a claim of −50, even online — −25 with Reinsurance', () => {
    let s = withAbilities('simultaneous', [['double-down', 'reinsurance'], []])
    s = playRound(s, [{ choice: 'A', ms: 5_000 }, null], [{ seat: 0, ability: 'double-down' }])
    expect(mine(s).points.total).toBe(-DOUBLE_DOWN_CLAIM)
    expect(s.scores[0]).toBe(-50)

    let r = withAbilities('simultaneous', [['double-down', 'reinsurance'], []])
    r = playRound(r, [{ choice: 'A', ms: 5_000 }, null], [{ seat: 0, ability: 'reinsurance' }, { seat: 0, ability: 'double-down' }])
    expect(mine(r).points).toMatchObject({ penalty: -50, ability: 25, total: -25 })
  })

  it('counts an unanswered question as a Double Down miss — the bet was made', () => {
    let s = withAbilities('simultaneous', [['double-down'], []])
    s = playRound(s, [null, { choice: 'B', ms: 5_000 }], [{ seat: 0, ability: 'double-down' }])
    expect(mine(s)).toMatchObject({ choice: null, correct: false })
    expect(s.scores[0]).toBe(-50)
  })

  it('never lets Double Down stack on the final question, which is already doubled', () => {
    let s = withAbilities('simultaneous', [['double-down'], []], { rounds: 3 })
    s = next(playRound(s, [null, null]))
    s = next(playRound(s, [null, null]))
    const at = opensAt(s)
    s = run(s, { type: 'tick', now: at })
    expect(canUse(s, 0, 'double-down')).toBe(false)
    expect(battleReducer(s, { type: 'power', seat: 0, ability: 'double-down', now: at })).toBe(s)
  })

  it('keeps Time Value’s speed at or under the most a fast answer earns', () => {
    let s = withAbilities('simultaneous', [['time-value'], []])
    s = playRound(s, [{ choice: 'B', ms: 10_000 }, null], [{ seat: 0, ability: 'time-value' }])
    const p = mine(s).points
    expect(p.speed + p.ability).toBe(SPEED_BONUS_MAX)
    expect(timeValueBonus(10_000, 120_000)).toBe(4)
    expect(timeValueBonus(0, 120_000)).toBe(0)
  })

  it('keeps a run alive through a miss with Immunization', () => {
    let s = withAbilities('simultaneous', [['immunization'], []])
    s = next(playRound(s, [{ choice: 'B', ms: 1_000 }, null]))
    s = next(playRound(s, [{ choice: 'B', ms: 1_000 }, null]))
    expect(s.streaks[0]).toBe(2)
    s = playRound(s, [{ choice: 'A', ms: 1_000 }, null], [{ seat: 0, ability: 'immunization' }])
    expect(s.streaks[0]).toBe(2)
    // Without it, the next miss breaks the run.
    s = next(s)
    s = playRound(s, [{ choice: 'A', ms: 1_000 }, null])
    expect(s.streaks[0]).toBe(0)
  })

  it('keeps a run through a wrong buzz with Immunization, on one screen', () => {
    let s = withAbilities('buzzer', [['immunization'], []], { roundSeconds: 60 })
    s = run(s, { type: 'tick', now: OPEN }, { type: 'buzz', seat: 0, now: OPEN + 1000 }, { type: 'answer', seat: 0, choice: 'B', now: OPEN + 2000 })
    s = run(s, { type: 'next', now: OPEN + 3000 })
    const at = opensAt(s)
    s = run(s, { type: 'tick', now: at }, { type: 'power', seat: 0, ability: 'immunization', now: at })
    s = run(s, { type: 'buzz', seat: 0, now: at + 1000 }, { type: 'answer', seat: 0, choice: 'A', now: at + 2000 })
    expect(s.streaks[0]).toBe(1)
  })

  it('halves the next claim once with Reinsurance — the final question’s −100 becomes −50', () => {
    let s = withAbilities('buzzer', [['reinsurance'], []], { rounds: 3, roundSeconds: 60 })
    s = run(s, { type: 'tick', now: OPEN }, { type: 'power', seat: 0, ability: 'reinsurance', now: OPEN })
    expect(s.reinsured[0]).toBe(true)
    s = run(s, { type: 'buzz', seat: 0, now: OPEN + 1000 }, { type: 'answer', seat: 0, choice: 'A', now: OPEN + 2000 })
    expect(currentRound(s).answers[0].points).toMatchObject({ penalty: -WRONG_BUZZ_PENALTY, ability: 25, total: -25 })
    expect(s.reinsured[0]).toBe(false)
    // Spent: the next claim is whole. (The steal window runs to the time Ada left.)
    s = run(s, { type: 'tick', now: OPEN + 62_000 }, { type: 'next', now: OPEN + 62_001 })
    expect(currentRound(s).index).toBe(1)
    let at = opensAt(s)
    s = run(s, { type: 'tick', now: at }, { type: 'buzz', seat: 0, now: at + 500 }, { type: 'answer', seat: 0, choice: 'A', now: at + 600 })
    expect(currentRound(s).answers[0].points.total).toBe(-WRONG_BUZZ_PENALTY)

    let f = withAbilities('buzzer', [['reinsurance'], []], { rounds: 3, roundSeconds: 60 })
    f = run(f, { type: 'tick', now: OPEN }, { type: 'power', seat: 0, ability: 'reinsurance', now: OPEN })
    for (let i = 0; i < 2; i++) {
      at = opensAt(f)
      f = run(f, { type: 'tick', now: at }, { type: 'buzz', seat: 1, now: at + 100 }, { type: 'answer', seat: 1, choice: 'B', now: at + 200 }, { type: 'next', now: at + 300 })
    }
    at = opensAt(f)
    f = run(f, { type: 'tick', now: at }, { type: 'buzz', seat: 0, now: at + 100 }, { type: 'answer', seat: 0, choice: 'A', now: at + 200 })
    expect(currentRound(f).answers[0].points).toMatchObject({ multiplier: 2, total: -50 })
  })

  describe('Bayesian Update', () => {
    it('strikes one wrong option, from its player’s screen only', () => {
      let s = withAbilities('simultaneous', [['bayesian-update'], []])
      s = run(s, { type: 'tick', now: OPEN }, { type: 'power', seat: 0, ability: 'bayesian-update', now: OPEN, strike: 'C' })
      expect(currentRound(s).struck).toEqual(['C', null])
      expect(currentRound(redactFor(s, 0)).struck).toEqual(['C', null])
      expect(currentRound(redactFor(s, 1)).struck).toEqual([null, null])
      // Still hidden from the other seat once the round is over.
      s = run(s, { type: 'answer', seat: 0, choice: 'B', now: OPEN + 1000, elapsedMs: 1000 }, { type: 'answer', seat: 1, choice: 'B', now: OPEN + 1000, elapsedMs: 1000 })
      expect(currentRound(s).phase).toBe('revealed')
      expect(currentRound(redactFor(s, 1)).struck).toEqual([null, null])
    })

    it('will only strike a wrong option still in play', () => {
      const s = run(withAbilities('simultaneous', [['bayesian-update'], []]), { type: 'tick', now: OPEN })
      expect(strikeable(s, 0)).toEqual(['A', 'C', 'D'])
      for (const strike of [undefined, 'B', 'Z']) {
        expect(battleReducer(s, { type: 'power', seat: 0, ability: 'bayesian-update', now: OPEN, strike })).toBe(s)
      }
    })

    it('won’t strike a buzzer miss already struck through for everyone', () => {
      let s = withAbilities('buzzer', [[], ['bayesian-update']], { roundSeconds: 60 })
      s = run(s, { type: 'tick', now: OPEN }, { type: 'buzz', seat: 0, now: OPEN + 100 }, { type: 'answer', seat: 0, choice: 'A', now: OPEN + 200 })
      expect(strikeable(s, 1)).toEqual(['C', 'D'])
    })
  })

  describe('what the rules turn away — by identity', () => {
    const open = (loadouts: Loadouts, on = true) => run(withAbilities('simultaneous', loadouts, { on }), { type: 'tick', now: OPEN })
    const use = (s: BattleState, seat: Seat, ability: AbilityId) => battleReducer(s, { type: 'power', seat, ability, now: OPEN + 1 })

    it('an ability in a room with abilities off', () => {
      const s = open([['reinsurance'], []], false)
      expect(s.loadouts).toEqual([[], []])
      expect(use(s, 0, 'reinsurance')).toBe(s)
    })

    it('an ability not in the seat’s loadout', () => {
      const s = open([['reinsurance'], []])
      expect(use(s, 1, 'reinsurance')).toBe(s)
      expect(use(s, 0, 'time-value')).toBe(s)
    })

    it('an ability already spent — each is good once per battle', () => {
      let s = open([['time-value'], []])
      s = use(s, 0, 'time-value')
      expect(s.spent[0]).toEqual(['time-value'])
      expect(use(s, 0, 'time-value')).toBe(s)
      // …and still spent a question later.
      s = next(run(s, { type: 'tick', now: OPEN + 200_000 }))
      s = run(s, { type: 'tick', now: opensAt(s) })
      expect(canUse(s, 0, 'time-value')).toBe(false)
    })

    it('an ability out of phase: after locking in, at the reveal, once the battle is over', () => {
      let s = open([['time-value', 'immunization'], []])
      s = run(s, { type: 'answer', seat: 0, choice: 'B', now: OPEN + 1000, elapsedMs: 1000 })
      expect(use(s, 0, 'time-value')).toBe(s)
      s = run(s, { type: 'tick', now: OPEN + 200_000 })
      expect(currentRound(s).phase).toBe('revealed')
      expect(use(s, 0, 'immunization')).toBe(s)
      const over = battleReducer(s, { type: 'forfeit', seat: 1, now: OPEN + 200_001 })
      expect(use(over, 0, 'immunization')).toBe(over)
    })

    it('on one screen: after a miss, or while the other player holds the floor', () => {
      let s = withAbilities('buzzer', [['immunization'], ['time-value']], { roundSeconds: 60 })
      s = run(s, { type: 'tick', now: OPEN }, { type: 'buzz', seat: 1, now: OPEN + 100 })
      expect(battleReducer(s, { type: 'power', seat: 0, ability: 'immunization', now: OPEN + 200 })).toBe(s)
      // The floor holder may still arm before answering.
      expect(canUse(s, 1, 'time-value')).toBe(true)
      s = run(s, { type: 'answer', seat: 1, choice: 'A', now: OPEN + 300 })
      expect(canUse(s, 1, 'time-value')).toBe(false)
      expect(canUse(s, 0, 'immunization')).toBe(true)
    })
  })

  it('takes a loadout as known abilities, each once, at most three', () => {
    expect(cleanLoadout(['double-down', 'double-down', 'nope', 'time-value', 'reinsurance', 'immunization'])).toEqual(['double-down', 'time-value', 'reinsurance'])
    const s = withAbilities('simultaneous', [['reinsurance', 'reinsurance', 'immunization', 'time-value', 'double-down'] as AbilityId[], []])
    expect(s.loadouts[0]).toEqual(['reinsurance', 'immunization', 'time-value'])
  })

  it('leaves a battle without abilities scoring exactly as before', () => {
    const plain = battle('simultaneous', 3)
    expect(plain.config.abilities).toBe(false)
    const s = run(plain, { type: 'tick', now: OPEN }, { type: 'answer', seat: 0, choice: 'B', now: OPEN + 6000, elapsedMs: 6000 }, { type: 'answer', seat: 1, choice: 'A', now: OPEN + 6000, elapsedMs: 6000 })
    const p = currentRound(s).answers.find(a => a.seat === 0)!.points
    expect(p.ability).toBe(0)
    expect(p.total).toBe(BASE_POINTS + speedBonus(6000, 60_000) + FASTEST_BONUS)
  })
})
