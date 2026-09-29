// **Quiz Battle, online** — the room a battle is played in, and what crosses
// the wire between the two devices.
//
// One device *hosts*: it picks the questions, runs the battle's reducer
// (lib/battle.ts) and is the only source of truth. The other *joins* with the
// room's code, sends what its player does (an answer, Ready), and draws
// whatever the host last told it. Nothing is stored anywhere — the two devices
// talk over a broadcast channel named after the code (lib/battleTransport.ts),
// and when both leave, the room is gone.
//
// Everything that arrives is untrusted: it was put on a public channel by
// whoever knows the code. So every message is parsed here, field by field, into
// a shape the app can't be crashed by, or dropped.

import {
  ABILITY_IDS,
  LOADOUT_MAX,
  MAX_NAME_LENGTH,
  isAbilityId,
  isSeat,
  type AbilityId,
  type BattleConfig,
  type BattlePlayer,
  type BattleQuestionKey,
  type BattleRules,
  type BattleState,
  type Lock,
  type PointsBreakdown,
  type RoundAnswer,
  type RoundOutcome,
  type RoundPhase,
  type RoundState,
  type Seat,
} from './battle'

/**
 * Bumped whenever a message changes shape. Two versions don't play each other.
 * 2: abilities (a room setting, the `power` move, each seat's loadout and what
 * it has spent, a round's armed abilities and struck options).
 */
export const PROTOCOL_VERSION = 2

// ── Room codes ──────────────────────────────────────────────────────────────

/**
 * Letters and digits a person can read off one screen and type into another:
 * no 0/O, no 1/I/L. 31 symbols, so four of them make ~920,000 rooms.
 */
export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
export const ROOM_CODE_LENGTH = 4

export function generateRoomCode(random: () => number = Math.random): string {
  let code = ''
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    code += ROOM_CODE_ALPHABET[Math.floor(random() * ROOM_CODE_ALPHABET.length)]
  }
  return code
}

/** What was typed, as a code: upper-cased, with spaces and dashes dropped. */
export function normalizeRoomCode(input: string): string {
  return input.toUpperCase().replace(/[\s-]/g, '')
}

export function isRoomCode(code: string): boolean {
  return code.length === ROOM_CODE_LENGTH && [...code].every(c => ROOM_CODE_ALPHABET.includes(c))
}

/** The broadcast channel a room's two devices meet on. */
export function roomChannel(code: string): string {
  return `quiz-battle:${code}`
}

/** The link that opens the Battle page straight onto joining a room. */
export function joinPath(code: string): string {
  return `/battle?join=${encodeURIComponent(code)}`
}

// ── Reactions ───────────────────────────────────────────────────────────────

/** The only things a player can send the other besides answers. */
export const REACTIONS = ['🔥', '👏', '😅', '🤯', '😤', '🎉'] as const
export type Reaction = (typeof REACTIONS)[number]

export function isReaction(value: unknown): value is Reaction {
  return typeof value === 'string' && (REACTIONS as readonly string[]).includes(value)
}

// ── Messages ────────────────────────────────────────────────────────────────

/** Where a room is between battles, and during one. */
export type RoomStage = 'lobby' | 'playing' | 'finished'

/** What the joining player may ask the host to do. */
export type GuestAction =
  | { kind: 'answer'; round: number; choice: string; elapsedMs: number }
  | { kind: 'ready'; round: number }
  | { kind: 'rematch' }
  /** Use an ability (a room with abilities on). */
  | { kind: 'power'; round: number; ability: AbilityId }

export type BattleMessage =
  /**
   * Joining player → host: let me in. `loadout` is the abilities this player
   * brings — declared, since their unlocks are read from their own mastery and
   * can't be checked from here; the host takes only the ids, the count and the
   * once-each rule on trust, as the rest of a friend's room is taken.
   */
  | { t: 'join'; v: number; from: string; name: string; avatarUrl?: string; loadout?: AbilityId[] }
  /**
   * Host → joining player: the whole room — who's in it, the settings, and the
   * battle as it stands on the host's clock at `sentAt`, already redacted for
   * the joining player. Sent on every change and every couple of seconds.
   */
  | {
      t: 'room'
      v: number
      from: string
      to: string
      sentAt: number
      stage: RoomStage
      host: BattlePlayer
      guest: BattlePlayer
      config: BattleConfig
      battle: BattleState | null
      rematch: [boolean, boolean]
    }
  /** Host → a player it can't seat: the room already has two. */
  | { t: 'full'; v: number; from: string; to: string }
  /** Joining player → host. */
  | { t: 'act'; v: number; from: string; action: GuestAction }
  /** Either way: an emoji, shown by the sender's name. */
  | { t: 'react'; v: number; from: string; seat: Seat; emoji: Reaction }
  /** Either way: still here. */
  | { t: 'ping'; v: number; from: string }
  /** Either way: gone. */
  | { t: 'bye'; v: number; from: string }

// ── Parsing ─────────────────────────────────────────────────────────────────
//
// Small validators that return the value in the expected shape or throw; the
// entry point turns a throw into `null`. Every array has a length cap, every
// string a size cap, so a message can't balloon the page either.

class Invalid extends Error {}

function fail(): never {
  throw new Invalid()
}

type Obj = Record<string, unknown>

function obj(x: unknown): Obj {
  if (!x || typeof x !== 'object' || Array.isArray(x)) fail()
  return x as Obj
}

function str(x: unknown, max = 200): string {
  if (typeof x !== 'string' || x.length > max) fail()
  return x
}

function optStr(x: unknown, max = 200): string | undefined {
  return x === undefined || x === null ? undefined : str(x, max)
}

function num(x: unknown, min = -1e15, max = 1e15): number {
  if (typeof x !== 'number' || !Number.isFinite(x) || x < min || x > max) fail()
  return x
}

function int(x: unknown, min: number, max: number): number {
  const n = num(x, min, max)
  if (!Number.isInteger(n)) fail()
  return n
}

function bool(x: unknown): boolean {
  if (typeof x !== 'boolean') fail()
  return x
}

function seat(x: unknown): Seat {
  if (!isSeat(x)) fail()
  return x
}

function arr<T>(x: unknown, max: number, item: (v: unknown) => T): T[] {
  if (!Array.isArray(x) || x.length > max) fail()
  return x.map(item)
}

function pair<T>(x: unknown, item: (v: unknown) => T): [T, T] {
  if (!Array.isArray(x) || x.length !== 2) fail()
  return [item(x[0]), item(x[1])]
}

function oneOf<T extends string>(x: unknown, values: readonly T[]): T {
  if (typeof x !== 'string' || !(values as readonly string[]).includes(x)) fail()
  return x as T
}

function nullable<T>(x: unknown, item: (v: unknown) => T): T | null {
  return x === null || x === undefined ? null : item(x)
}

const MAX_ROUNDS = 20
const MAX_OPTIONS = 8
const ID_MAX = 120
const AVATAR_MAX = 600

function ability(x: unknown): AbilityId {
  if (!isAbilityId(x)) fail()
  return x
}

/** A list of abilities: known ids, each once, at most `max`. */
function abilities(x: unknown, max: number): AbilityId[] {
  const list = arr(x, max, ability)
  if (new Set(list).size !== list.length) fail()
  return list
}

function player(x: unknown): BattlePlayer {
  const o = obj(x)
  const avatarUrl = optStr(o.avatarUrl, AVATAR_MAX)
  return { name: str(o.name, MAX_NAME_LENGTH * 2), ...(avatarUrl ? { avatarUrl } : {}) }
}

function config(x: unknown): BattleConfig {
  const o = obj(x)
  return {
    rules: oneOf<BattleRules>(o.rules, ['buzzer', 'simultaneous']),
    exam: str(o.exam, 80),
    rounds: int(o.rounds, 1, MAX_ROUNDS),
    roundSeconds: num(o.roundSeconds, 5, 3600),
    abilities: o.abilities === undefined ? false : bool(o.abilities),
  }
}

function questionKey(x: unknown): BattleQuestionKey {
  const o = obj(x)
  return {
    id: str(o.id, ID_MAX),
    answer: str(o.answer, 8),
    options: arr(o.options, MAX_OPTIONS, v => str(v, 8)),
  }
}

function breakdown(x: unknown): PointsBreakdown {
  const o = obj(x)
  const n = (v: unknown) => num(v, -10_000, 10_000)
  return {
    base: n(o.base), speed: n(o.speed), streak: n(o.streak), fastest: n(o.fastest),
    penalty: n(o.penalty), ability: n(o.ability), multiplier: n(o.multiplier), total: n(o.total),
  }
}

function roundAnswer(x: unknown): RoundAnswer {
  const o = obj(x)
  return {
    seat: seat(o.seat),
    choice: nullable(o.choice, v => str(v, 8)),
    elapsedMs: num(o.elapsedMs, 0, 3_600_000),
    correct: bool(o.correct),
    steal: bool(o.steal),
    fastest: bool(o.fastest),
    points: breakdown(o.points),
  }
}

function lock(x: unknown): Lock {
  const o = obj(x)
  return { choice: nullable(o.choice, v => str(v, 8)), elapsedMs: num(o.elapsedMs, 0, 3_600_000) }
}

function round(x: unknown): RoundState {
  const o = obj(x)
  const floor = nullable(o.floor, v => {
    const f = obj(v)
    return { seat: seat(f.seat), elapsedMs: num(f.elapsedMs, 0, 3_600_000) }
  })
  return {
    index: int(o.index, 0, MAX_ROUNDS - 1),
    questionId: str(o.questionId, ID_MAX),
    phase: oneOf<RoundPhase>(o.phase, ['countdown', 'open', 'buzzed', 'revealed']),
    opensAt: num(o.opensAt),
    deadline: num(o.deadline),
    heldMs: nullable(o.heldMs, v => num(v, 0, 3_600_000)),
    floor,
    lockedOut: arr(o.lockedOut, 2, seat),
    locks: pair(o.locks, v => nullable(v, lock)),
    answers: arr(o.answers, 4, roundAnswer),
    outcome: nullable(o.outcome, v => oneOf<RoundOutcome>(v, ['won', 'missed', 'timeout'])),
    ready: arr(o.ready, 2, seat),
    powers: pair(o.powers, v => abilities(v, ABILITY_IDS.length)),
    struck: pair(o.struck, v => nullable(v, c => str(c, 8))),
  }
}

/**
 * A battle state from the wire, or null. Beyond the shapes, it holds the
 * pieces together — one round per question at most, each on the question its
 * index says — so the page can index into it without checking again.
 */
export function parseBattleState(x: unknown): BattleState | null {
  try {
    const o = obj(x)
    const questions = arr(o.questions, MAX_ROUNDS, questionKey)
    const rounds = arr(o.rounds, MAX_ROUNDS, round)
    const cfg = config(o.config)
    if (questions.length === 0 || rounds.length === 0 || rounds.length > questions.length) fail()
    if (cfg.rounds !== questions.length) fail()
    rounds.forEach((r, i) => {
      if (r.index !== i || r.questionId !== questions[i].id) fail()
    })
    const numPair = (v: unknown) => pair(v, n => num(n, -1_000_000, 1_000_000))
    return {
      config: cfg,
      players: pair(o.players, player),
      questions,
      rounds,
      scores: numPair(o.scores),
      streaks: numPair(o.streaks),
      bestStreaks: numPair(o.bestStreaks),
      finished: bool(o.finished),
      forfeit: nullable(o.forfeit, seat),
      graceMs: num(o.graceMs, 0, 60_000),
      loadouts: pair(o.loadouts, v => abilities(v, LOADOUT_MAX)),
      spent: pair(o.spent, v => abilities(v, LOADOUT_MAX)),
      reinsured: pair(o.reinsured, bool),
    }
  } catch (e) {
    if (e instanceof Invalid) return null
    throw e
  }
}

function action(x: unknown): GuestAction {
  const o = obj(x)
  switch (o.kind) {
    case 'answer':
      return {
        kind: 'answer',
        round: int(o.round, 0, MAX_ROUNDS - 1),
        choice: str(o.choice, 8),
        elapsedMs: num(o.elapsedMs, 0, 3_600_000),
      }
    case 'ready':
      return { kind: 'ready', round: int(o.round, 0, MAX_ROUNDS - 1) }
    case 'rematch':
      return { kind: 'rematch' }
    case 'power':
      return { kind: 'power', round: int(o.round, 0, MAX_ROUNDS - 1), ability: ability(o.ability) }
    default:
      return fail()
  }
}

/** A message off the channel in its expected shape, or null for anything else. */
export function parseMessage(x: unknown): BattleMessage | null {
  try {
    const o = obj(x)
    const v = int(o.v, 0, 1000)
    const from = str(o.from, ID_MAX)
    switch (o.t) {
      case 'join': {
        const avatarUrl = optStr(o.avatarUrl, AVATAR_MAX)
        const loadout = o.loadout === undefined || o.loadout === null ? undefined : abilities(o.loadout, LOADOUT_MAX)
        return {
          t: 'join',
          v,
          from,
          name: str(o.name, MAX_NAME_LENGTH * 2),
          ...(avatarUrl ? { avatarUrl } : {}),
          ...(loadout ? { loadout } : {}),
        }
      }
      case 'room': {
        const battle = o.battle === null ? null : parseBattleState(o.battle)
        if (o.battle !== null && !battle) fail()
        return {
          t: 'room',
          v,
          from,
          to: str(o.to, ID_MAX),
          sentAt: num(o.sentAt),
          stage: oneOf<RoomStage>(o.stage, ['lobby', 'playing', 'finished']),
          host: player(o.host),
          guest: player(o.guest),
          config: config(o.config),
          battle,
          rematch: pair(o.rematch, bool),
        }
      }
      case 'full':
        return { t: 'full', v, from, to: str(o.to, ID_MAX) }
      case 'act':
        return { t: 'act', v, from, action: action(o.action) }
      case 'react':
        if (!isReaction(o.emoji)) fail()
        return { t: 'react', v, from, seat: seat(o.seat), emoji: o.emoji }
      case 'ping':
        return { t: 'ping', v, from }
      case 'bye':
        return { t: 'bye', v, from }
      default:
        return null
    }
  } catch (e) {
    if (e instanceof Invalid) return null
    throw e
  }
}
