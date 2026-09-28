// **Quiz Battle** — two players, the same questions, one scoreboard.
//
// This module is the whole game as data: the rules, the scoring, and a reducer
// that takes the state and one thing that happened (a buzz, an answer, the
// clock running out) and returns the next state. It never reads a clock or a
// random number it isn't handed, so every rule below is pinned by a test, and
// the same reducer runs a battle on one screen and — on the host's device — a
// battle between two (lib/battleRoom.ts carries it over the wire).
//
// There are two rule sets, one per way of playing:
//
// - **Buzzer** (`'buzzer'`, two players at one screen). Both read the question;
//   the first to buzz takes the floor and has a few seconds to answer. Right
//   ends the round. Wrong costs points and hands the other player the chance
//   to steal on the time that was left. A buzz is a claim — you can't see what
//   the other player picks, but you can see them take the floor.
// - **Simultaneous** (`'simultaneous'`, two devices). Each player locks in
//   their own answer, unseen by the other, and the round reveals once both are
//   in or the clock runs out. Buzzing over a network would hand the round to
//   whoever has the shorter ping; locking in doesn't care.
//
// Scoring is the same idea under both: a right answer is worth `BASE_POINTS`,
// more the faster it came, more again on a run of right answers, and the final
// round counts double so a battle is never over before its last question.
// Nothing here is saved: a battle is played, not studied, and a friend's
// answers on your device are not your mastery (docs/quiz-battle.md).

import { filterQuestions, type Question } from './parser'
import { drawByDifficulty, type DifficultyTarget } from './quizDifficulty'
import { paceForExam, secondsPerUnit } from './quizTiming'

// ── Players ─────────────────────────────────────────────────────────────────

/** Which side of the board: 0 is the first player (the host online), 1 the second. */
export type Seat = 0 | 1

export const SEATS: readonly Seat[] = [0, 1]

export function otherSeat(seat: Seat): Seat {
  return seat === 0 ? 1 : 0
}

export function isSeat(value: unknown): value is Seat {
  return value === 0 || value === 1
}

export interface BattlePlayer {
  name: string
  /** The account's avatar (`user_metadata.avatar_url`), when the player has one. */
  avatarUrl?: string
}

/** How long a name may be — long enough for a first name, short enough for a scoreboard. */
export const MAX_NAME_LENGTH = 20

/** A player name as the scoreboard prints it: trimmed, squeezed, cut, never blank. */
export function cleanPlayerName(raw: unknown, fallback: string): string {
  if (typeof raw !== 'string') return fallback
  const squeezed = raw.replace(/\s+/g, ' ').trim()
  return squeezed ? squeezed.slice(0, MAX_NAME_LENGTH) : fallback
}

// ── Configuration ───────────────────────────────────────────────────────────

export type BattleRules = 'buzzer' | 'simultaneous'

export interface BattleConfig {
  rules: BattleRules
  /** The exam the questions are drawn from — a question's `exam` field. */
  exam: string
  /** How many questions the battle runs to. */
  rounds: number
  /** How long a question stays open, in seconds. */
  roundSeconds: number
}

export const ROUND_COUNTS = [3, 5, 7, 10] as const
export const DEFAULT_ROUNDS = 5

export type RoundTimePreset = 'blitz' | 'standard' | 'exam'

/** `short` is what a phone-width control has room for. */
export const ROUND_TIME_PRESETS: readonly { id: RoundTimePreset; label: string; short: string }[] = [
  { id: 'blitz', label: 'Blitz', short: 'Blitz' },
  { id: 'standard', label: 'Standard', short: 'Standard' },
  { id: 'exam', label: 'Exam pace', short: 'Exam' },
]

const PRESET_SECONDS: Record<Exclude<RoundTimePreset, 'exam'>, number> = {
  blitz: 60,
  standard: 120,
}

/** Used for "Exam pace" on an exam with no pace in `lib/quizTiming.ts`. */
const FALLBACK_EXAM_PACE_SECONDS = 180

/**
 * The seconds a round stays open under a preset. "Exam pace" is the real
 * sitting's time per question, from the same transcribed table the timed quiz
 * reads — Exam P's six minutes, MAS-I's five and a third.
 */
export function roundSecondsFor(preset: RoundTimePreset, exam: string): number {
  if (preset !== 'exam') return PRESET_SECONDS[preset]
  const pace = paceForExam(exam)
  return pace ? Math.round(secondsPerUnit(pace)) : FALLBACK_EXAM_PACE_SECONDS
}

// ── The rules, as numbers ───────────────────────────────────────────────────

/** The "3, 2, 1" before each question. */
export const COUNTDOWN_MS = 3000
/** Buzzer: how long the player holding the floor has to pick an answer. */
export const ANSWER_WINDOW_MS = 10_000
/** Buzzer: the least time a steal is given, however little was left on the clock. */
export const STEAL_MIN_MS = 15_000
/**
 * Simultaneous, online: how long past the round clock the host still takes an
 * answer. The other player's clock started when the question *reached* them,
 * so their last-second answer is still on its way when the host's runs out.
 */
export const ONLINE_GRACE_MS = 1500

export const BASE_POINTS = 100
/** The most a fast answer adds — all of it at the first instant, none at the buzzer. */
export const SPEED_BONUS_MAX = 50
/** Added per right answer in a row after the first… */
export const STREAK_STEP = 20
/** …up to this many steps. */
export const STREAK_STEPS_MAX = 3
/** Simultaneous: the first right answer of the round. */
export const FASTEST_BONUS = 25
/** Buzzer: what a wrong buzz — or a buzz with no answer — costs. */
export const WRONG_BUZZ_PENALTY = 50
/** The last question counts this many times over (in a battle of three or more). */
export const FINAL_ROUND_MULTIPLIER = 2
/** A run this long is "on fire" on the scoreboard. */
export const ON_FIRE_STREAK = 3

// ── State ───────────────────────────────────────────────────────────────────

/** What the engine needs to know about a question: which choices there are, and which is right. */
export interface BattleQuestionKey {
  id: string
  answer: string
  options: string[]
}

export interface PointsBreakdown {
  base: number
  speed: number
  streak: number
  fastest: number
  /** Negative, or 0. */
  penalty: number
  multiplier: number
  total: number
}

export interface RoundAnswer {
  seat: Seat
  /** The option picked, or null for a buzz whose window ran out. */
  choice: string | null
  /** Milliseconds of round clock used — to the buzz (buzzer) or to the answer (simultaneous). */
  elapsedMs: number
  correct: boolean
  /** Buzzer: answered after the other player had missed. */
  steal: boolean
  /** Simultaneous: the first right answer of the round. */
  fastest: boolean
  points: PointsBreakdown
}

/**
 * An answer locked in and not yet revealed (simultaneous). `choice` is null
 * when the lock is someone else's and the snapshot was redacted for the
 * viewer — they may know it's in, not what it is.
 */
export interface Lock {
  choice: string | null
  elapsedMs: number
}

export type RoundPhase = 'countdown' | 'open' | 'buzzed' | 'revealed'

/** How a round ended: someone got it, every attempt missed, or the clock ran out first. */
export type RoundOutcome = 'won' | 'missed' | 'timeout'

export interface RoundState {
  index: number
  questionId: string
  phase: RoundPhase
  /** When the countdown ends and the question shows. */
  opensAt: number
  /** When the current phase runs out: the round clock, or (buzzed) the answer window. */
  deadline: number
  /** Buzzer: round clock left when the floor was taken, handed back for the steal. */
  heldMs: number | null
  /** Buzzer: who holds the floor, and how much round clock had gone when they buzzed. */
  floor: { seat: Seat; elapsedMs: number } | null
  /** Buzzer: who has already missed this question. */
  lockedOut: Seat[]
  /** Simultaneous: answers in, not yet revealed. */
  locks: [Lock | null, Lock | null]
  /** Scored answers, in the order they were scored. */
  answers: RoundAnswer[]
  outcome: RoundOutcome | null
  /** Simultaneous, online: who has pressed Ready for the next question. */
  ready: Seat[]
}

export interface BattleState {
  config: BattleConfig
  players: [BattlePlayer, BattlePlayer]
  questions: BattleQuestionKey[]
  /** Every round so far; the last is the one being played. */
  rounds: RoundState[]
  scores: [number, number]
  streaks: [number, number]
  bestStreaks: [number, number]
  finished: boolean
  /** The player who left, when the battle ended that way. */
  forfeit: Seat | null
  /** See `ONLINE_GRACE_MS` — 0 on one screen, where nothing is in flight. */
  graceMs: number
}

export type BattleEvent =
  /** The clock moved: opens a question whose countdown is up, closes one whose time is. */
  | { type: 'tick'; now: number }
  /** Buzzer: a player claims the floor. */
  | { type: 'buzz'; seat: Seat; now: number }
  /**
   * A player answers. `elapsedMs` is the answering device's own measure of the
   * round clock (online); left out, it is read off `now`.
   */
  | { type: 'answer'; seat: Seat; choice: string; now: number; elapsedMs?: number }
  /** Simultaneous, online: a player is ready for the next question; both → it starts. */
  | { type: 'ready'; seat: Seat; now: number }
  /** One screen: on to the next question (or the end). */
  | { type: 'next'; now: number }
  /** A player leaves; the other wins. */
  | { type: 'forfeit'; seat: Seat; now: number }

// ── Starting a battle ───────────────────────────────────────────────────────

export function roundMs(config: BattleConfig): number {
  return Math.max(1, config.roundSeconds) * 1000
}

function newRound(state: Pick<BattleState, 'config' | 'questions'>, index: number, now: number): RoundState {
  const opensAt = now + COUNTDOWN_MS
  return {
    index,
    questionId: state.questions[index].id,
    phase: 'countdown',
    opensAt,
    deadline: opensAt + roundMs(state.config),
    heldMs: null,
    floor: null,
    lockedOut: [],
    locks: [null, null],
    answers: [],
    outcome: null,
    ready: [],
  }
}

export function createBattle(options: {
  config: BattleConfig
  players: [BattlePlayer, BattlePlayer]
  questions: BattleQuestionKey[]
  now: number
  graceMs?: number
}): BattleState {
  const { config, players, now } = options
  const questions = options.questions.slice(0, config.rounds)
  if (questions.length === 0) throw new Error('A battle needs at least one question')
  const base = { config: { ...config, rounds: questions.length }, questions }
  return {
    ...base,
    players,
    rounds: [newRound(base, 0, now)],
    scores: [0, 0],
    streaks: [0, 0],
    bestStreaks: [0, 0],
    finished: false,
    forfeit: null,
    graceMs: options.graceMs ?? 0,
  }
}

// ── Reading a battle ────────────────────────────────────────────────────────

export function currentRound(state: BattleState): RoundState {
  return state.rounds[state.rounds.length - 1]
}

export function isFinalRound(state: Pick<BattleState, 'config'>, index: number): boolean {
  return state.config.rounds >= 3 && index === state.config.rounds - 1
}

export function roundMultiplier(state: Pick<BattleState, 'config'>, index: number): number {
  return isFinalRound(state, index) ? FINAL_ROUND_MULTIPLIER : 1
}

/** What the round clock shows: time left in the countdown, the question, or the answer window. */
export function msLeft(round: RoundState, now: number): number {
  if (round.phase === 'countdown') return Math.max(0, round.opensAt - now)
  if (round.phase === 'revealed') return 0
  return Math.max(0, round.deadline - now)
}

/** Round clock used at `now` — what the speed bonus is measured on. */
export function elapsedAt(round: RoundState, config: BattleConfig, now: number): number {
  const total = roundMs(config)
  return clamp(total - (round.deadline - now), 0, total)
}

/** The points a seat took in a round (negative for a wrong buzz). */
export function roundPoints(round: RoundState, seat: Seat): number {
  return round.answers.filter(a => a.seat === seat).reduce((n, a) => n + a.points.total, 0)
}

/** Who took the round — more points than the other, and more than none. Null for a wash. */
export function roundTaker(round: RoundState): Seat | null {
  const a = roundPoints(round, 0)
  const b = roundPoints(round, 1)
  if (a > b && a > 0) return 0
  if (b > a && b > 0) return 1
  return null
}

/**
 * The share of the scoreboard seat 0 holds, 0–1 — the tug-of-war bar. Even at
 * the start and whenever neither player is ahead of zero; a negative score
 * counts as none.
 */
export function momentum(scores: readonly [number, number]): number {
  const a = Math.max(0, scores[0])
  const b = Math.max(0, scores[1])
  if (a + b === 0) return 0.5
  return a / (a + b)
}

// ── Scoring ─────────────────────────────────────────────────────────────────

export function speedBonus(elapsedMs: number, totalMs: number): number {
  if (totalMs <= 0) return 0
  return Math.round(SPEED_BONUS_MAX * clamp(1 - elapsedMs / totalMs, 0, 1))
}

/** The bonus for a right answer that makes a run of `streak` (1 for a first). */
export function streakBonus(streak: number): number {
  return STREAK_STEP * clamp(streak - 1, 0, STREAK_STEPS_MAX)
}

function points(parts: Partial<Omit<PointsBreakdown, 'total' | 'multiplier'>>, multiplier: number): PointsBreakdown {
  const base = parts.base ?? 0
  const speed = parts.speed ?? 0
  const streak = parts.streak ?? 0
  const fastest = parts.fastest ?? 0
  const penalty = parts.penalty ?? 0
  return {
    base: base * multiplier,
    speed: speed * multiplier,
    streak: streak * multiplier,
    fastest: fastest * multiplier,
    penalty: penalty * multiplier,
    multiplier,
    total: (base + speed + streak + fastest + penalty) * multiplier,
  }
}

// ── The reducer ─────────────────────────────────────────────────────────────

/**
 * The state after `event`. An event the rules don't allow — a buzz out of
 * turn, a second answer, a choice the question doesn't offer — returns the
 * state it was given, unchanged and by identity, so a caller can tell that
 * nothing happened (and has nothing to send).
 */
export function battleReducer(state: BattleState, event: BattleEvent): BattleState {
  if (state.finished) return state
  switch (event.type) {
    case 'tick': return tick(state, event.now)
    case 'buzz': return buzz(tick(state, event.now), event.seat, event.now)
    case 'answer': return answer(tick(state, event.now), event)
    case 'ready': return ready(state, event.seat, event.now)
    case 'next': return advance(state, event.now)
    case 'forfeit': return { ...state, finished: true, forfeit: event.seat }
  }
}

function withRound(state: BattleState, round: RoundState, extra: Partial<BattleState> = {}): BattleState {
  return { ...state, ...extra, rounds: [...state.rounds.slice(0, -1), round] }
}

function tick(state: BattleState, now: number): BattleState {
  let next = state
  // A round can pass through more than one boundary between two ticks — a
  // countdown and a whole (very short) round, say — so keep going until none
  // is due.
  for (let guard = 0; guard < 4; guard++) {
    const round = currentRound(next)
    if (round.phase === 'countdown' && now >= round.opensAt) {
      next = withRound(next, { ...round, phase: 'open' })
    } else if (round.phase === 'open' && now >= round.deadline + closeGrace(next)) {
      next = reveal(next)
    } else if (round.phase === 'buzzed' && now >= round.deadline && round.floor) {
      // The floor holder said nothing in time: a miss, like a wrong answer.
      next = scoreBuzzAnswer(next, round.floor.seat, null, now)
    } else {
      break
    }
  }
  return next
}

function closeGrace(state: BattleState): number {
  return state.config.rules === 'simultaneous' ? state.graceMs : 0
}

function buzz(state: BattleState, seat: Seat, now: number): BattleState {
  const round = currentRound(state)
  if (state.config.rules !== 'buzzer' || round.phase !== 'open') return state
  if (round.lockedOut.includes(seat)) return state
  return withRound(state, {
    ...round,
    phase: 'buzzed',
    floor: { seat, elapsedMs: elapsedAt(round, state.config, now) },
    heldMs: Math.max(0, round.deadline - now),
    deadline: now + ANSWER_WINDOW_MS,
  })
}

function answer(state: BattleState, event: Extract<BattleEvent, { type: 'answer' }>): BattleState {
  const round = currentRound(state)
  const question = state.questions[round.index]
  if (!question.options.includes(event.choice)) return state

  if (state.config.rules === 'buzzer') {
    if (round.phase !== 'buzzed' || round.floor?.seat !== event.seat) return state
    return scoreBuzzAnswer(state, event.seat, event.choice, event.now)
  }

  if (round.phase !== 'open' || round.locks[event.seat]) return state
  const elapsedMs = clamp(
    event.elapsedMs ?? event.now - round.opensAt,
    0,
    roundMs(state.config),
  )
  const locks: [Lock | null, Lock | null] = [...round.locks]
  locks[event.seat] = { choice: event.choice, elapsedMs }
  const next = withRound(state, { ...round, locks })
  return locks[0] && locks[1] ? reveal(next) : next
}

/** Buzzer: the floor holder has answered (or, `choice` null, run out of time). */
function scoreBuzzAnswer(state: BattleState, seat: Seat, choice: string | null, now: number): BattleState {
  const round = currentRound(state)
  if (!round.floor) return state
  const question = state.questions[round.index]
  const multiplier = roundMultiplier(state, round.index)
  const correct = choice !== null && choice === question.answer
  const steal = round.lockedOut.includes(otherSeat(seat))
  const elapsedMs = round.floor.elapsedMs
  const streaks: [number, number] = [...state.streaks]
  const scores: [number, number] = [...state.scores]
  const bestStreaks: [number, number] = [...state.bestStreaks]

  if (correct) {
    streaks[seat] += 1
    bestStreaks[seat] = Math.max(bestStreaks[seat], streaks[seat])
  } else {
    streaks[seat] = 0
  }
  const pts = correct
    ? points({ base: BASE_POINTS, speed: speedBonus(elapsedMs, roundMs(state.config)), streak: streakBonus(streaks[seat]) }, multiplier)
    : points({ penalty: -WRONG_BUZZ_PENALTY }, multiplier)
  scores[seat] += pts.total

  const scored: RoundAnswer = { seat, choice, elapsedMs, correct, steal, fastest: false, points: pts }
  const lockedOut = correct ? round.lockedOut : [...round.lockedOut, seat]
  const other = otherSeat(seat)
  const base: RoundState = { ...round, answers: [...round.answers, scored], lockedOut, floor: null }
  const extra = { scores, streaks, bestStreaks }

  if (correct) return finishRound(withRound(state, base, extra))
  if (!lockedOut.includes(other)) {
    // Over to the other player, on the time that was left — or enough to read
    // the options again, if the miss came at the death.
    return withRound(state, {
      ...base,
      phase: 'open',
      deadline: now + Math.max(round.heldMs ?? 0, STEAL_MIN_MS),
      heldMs: null,
    }, extra)
  }
  return finishRound(withRound(state, base, extra))
}

/**
 * The round is over. Buzzer rounds are scored as they go, so all that's left
 * is to break the runs of anyone who didn't score; simultaneous rounds are
 * scored here, both answers at once.
 */
function reveal(state: BattleState): BattleState {
  if (state.config.rules === 'buzzer') return finishRound(state)

  const round = currentRound(state)
  const question = state.questions[round.index]
  const multiplier = roundMultiplier(state, round.index)
  const total = roundMs(state.config)
  const scores: [number, number] = [...state.scores]
  const streaks: [number, number] = [...state.streaks]
  const bestStreaks: [number, number] = [...state.bestStreaks]

  const rightTimes = SEATS
    .map(seat => round.locks[seat])
    .filter((lock): lock is Lock => !!lock && lock.choice === question.answer)
    .map(lock => lock.elapsedMs)
  const fastestTime = rightTimes.length > 0 ? Math.min(...rightTimes) : null

  const answers: RoundAnswer[] = []
  for (const seat of SEATS) {
    const lock = round.locks[seat]
    if (!lock) continue
    const correct = lock.choice === question.answer
    const fastest = correct && lock.elapsedMs === fastestTime
    if (correct) {
      streaks[seat] += 1
      bestStreaks[seat] = Math.max(bestStreaks[seat], streaks[seat])
    }
    const pts = correct
      ? points({
          base: BASE_POINTS,
          speed: speedBonus(lock.elapsedMs, total),
          streak: streakBonus(streaks[seat]),
          fastest: fastest ? FASTEST_BONUS : 0,
        }, multiplier)
      : points({}, multiplier)
    scores[seat] += pts.total
    answers.push({ seat, choice: lock.choice, elapsedMs: lock.elapsedMs, correct, steal: false, fastest, points: pts })
  }
  // Answers are listed fastest first, the order they're told in.
  answers.sort((a, b) => a.elapsedMs - b.elapsedMs)
  return finishRound(withRound(state, { ...round, answers }, { scores, streaks, bestStreaks }))
}

/**
 * Close the round: a run survives only for a player who got this one right,
 * and the outcome is read off the answers — someone right, everyone who tried
 * wrong, or nobody in before the clock.
 */
function finishRound(state: BattleState): BattleState {
  const round = currentRound(state)
  const scoredRight = new Set(round.answers.filter(a => a.correct).map(a => a.seat))
  const streaks: [number, number] = [
    scoredRight.has(0) ? state.streaks[0] : 0,
    scoredRight.has(1) ? state.streaks[1] : 0,
  ]
  const outcome: RoundOutcome = scoredRight.size > 0 ? 'won' : round.answers.length > 0 ? 'missed' : 'timeout'
  return withRound(state, { ...round, phase: 'revealed', outcome, floor: null }, { streaks })
}

function ready(state: BattleState, seat: Seat, now: number): BattleState {
  const round = currentRound(state)
  if (round.phase !== 'revealed' || round.ready.includes(seat)) return state
  const readySeats = [...round.ready, seat]
  const next = withRound(state, { ...round, ready: readySeats })
  return readySeats.length === 2 ? advance(next, now) : next
}

function advance(state: BattleState, now: number): BattleState {
  const round = currentRound(state)
  if (round.phase !== 'revealed') return state
  const index = round.index + 1
  if (index >= state.config.rounds) return { ...state, finished: true }
  return { ...state, rounds: [...state.rounds, newRound(state, index, now)] }
}

// ── The result ──────────────────────────────────────────────────────────────

export interface PlayerSummary {
  score: number
  correct: number
  /** Questions this player put an answer in on. */
  answered: number
  /** The quickest right answer, in ms — null with none. */
  fastestMs: number | null
  /** Mean time to a right answer, in ms — null with none. */
  averageMs: number | null
  bestStreak: number
  steals: number
  /** Rounds this player took (see `roundTaker`). */
  roundsTaken: number
}

export interface BattleSummary {
  players: [PlayerSummary, PlayerSummary]
  /** Questions played to a reveal — fewer than the battle's length after a forfeit. */
  played: number
  /** Null for a draw. */
  winner: Seat | null
  /** The winner's lead in points (0 for a draw or a forfeit). */
  margin: number
  forfeit: Seat | null
}

export function summarizeBattle(state: BattleState): BattleSummary {
  const played = state.rounds.filter(r => r.phase === 'revealed')
  const players = SEATS.map((seat): PlayerSummary => {
    const mine = played.flatMap(r => r.answers.filter(a => a.seat === seat))
    const right = mine.filter(a => a.correct)
    const times = right.map(a => a.elapsedMs)
    return {
      score: state.scores[seat],
      correct: right.length,
      answered: played.filter(r => r.answers.some(a => a.seat === seat)).length,
      fastestMs: times.length > 0 ? Math.min(...times) : null,
      averageMs: times.length > 0 ? Math.round(times.reduce((n, t) => n + t, 0) / times.length) : null,
      bestStreak: state.bestStreaks[seat],
      steals: right.filter(a => a.steal).length,
      roundsTaken: played.filter(r => roundTaker(r) === seat).length,
    }
  }) as [PlayerSummary, PlayerSummary]

  if (state.forfeit !== null) {
    return { players, played: played.length, winner: otherSeat(state.forfeit), margin: 0, forfeit: state.forfeit }
  }
  const [a, b] = state.scores
  const winner: Seat | null = a > b ? 0 : b > a ? 1 : null
  return { players, played: played.length, winner, margin: Math.abs(a - b), forfeit: null }
}

// ── Seen from one side ──────────────────────────────────────────────────────

/**
 * The state as `viewer` may see it: an answer the other player has locked in
 * but that hasn't been revealed shows as *in*, with no choice. The host
 * applies this before a snapshot leaves the device.
 */
export function redactFor(state: BattleState, viewer: Seat): BattleState {
  const round = currentRound(state)
  if (round.phase === 'revealed') return state
  const hidden = otherSeat(viewer)
  const lock = round.locks[hidden]
  if (!lock || lock.choice === null) return state
  const locks: [Lock | null, Lock | null] = [...round.locks]
  locks[hidden] = { choice: null, elapsedMs: 0 }
  return withRound(state, { ...round, locks })
}

/**
 * The same state on another clock: every moment in it moved by `deltaMs`. A
 * snapshot is taken on the host's clock; the guest moves it onto its own by
 * the gap between the two at the moment it arrived.
 */
export function shiftClock(state: BattleState, deltaMs: number): BattleState {
  if (deltaMs === 0) return state
  return {
    ...state,
    rounds: state.rounds.map(r => ({ ...r, opensAt: r.opensAt + deltaMs, deadline: r.deadline + deltaMs })),
  }
}

// ── The questions ───────────────────────────────────────────────────────────

/**
 * Can a question be raced? It has to be marked by a click: multiple choice,
 * with at least two options, one of which is the answer. Written and
 * multi-part questions are self-graded, and a self-graded race isn't one.
 */
export function isBattleQuestion(q: Question): boolean {
  return (
    q.type === 'multiple-choice' &&
    q.options.length >= 2 &&
    q.options.some(o => o.key === q.answer)
  )
}

/**
 * The questions a battle on `exam` can draw — the quiz's own pool (so nothing
 * with an open critical fact-check finding, nothing off the syllabus) cut to
 * the ones a click can mark.
 */
export function battlePool(all: readonly Question[], exam: string): Question[] {
  return filterQuestions([...all], { exam }).filter(isBattleQuestion)
}

/** How many battle questions each exam has, for every exam with enough for the shortest battle. */
export function battleExamCounts(all: readonly Question[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const q of filterQuestions([...all], {})) {
    if (!isBattleQuestion(q)) continue
    counts.set(q.exam, (counts.get(q.exam) ?? 0) + 1)
  }
  for (const [exam, n] of counts) if (n < ROUND_COUNTS[0]) counts.delete(exam)
  return counts
}

export function drawBattleQuestions(
  pool: readonly Question[],
  rounds: number,
  difficulty: DifficultyTarget,
  random: () => number = Math.random,
): Question[] {
  return drawByDifficulty(pool, rounds, difficulty, random)
}

export function questionKey(q: Question): BattleQuestionKey {
  return { id: q.id, answer: q.answer, options: q.options.map(o => o.key) }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n))
}

/** "3.4s", "1:05" — a time on the scoreboard. */
export function formatBattleTime(ms: number): string {
  const seconds = Math.max(0, ms) / 1000
  if (seconds < 60) return `${seconds.toFixed(1)}s`
  const whole = Math.round(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}
