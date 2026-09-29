// **Quiz Battle matchmaking** — the lobby, as data.
//
// The lobby is one public channel (`LOBBY_CHANNEL`) where everyone looking for
// an opponent shows up, with the exam they want to play (or any). Nobody picks
// anybody: every device in the lobby works out the same pairing from the same
// list (`planMatches`) — oldest first, each with the next compatible player —
// and the older of each pair offers the younger a room. The offer, its
// acceptance and a final go (`LobbyMessage`) are what actually seal a match, so
// two devices that briefly see the lobby differently can't both end up in one
// player's room: a player takes one offer at a time, and the host only opens the
// room once its offer is accepted. lib/battleMatchmaking.ts runs that
// conversation; this module is the parts of it that are just rules.
//
// Like the rooms, everything here comes off a public channel, so every entry and
// every message is parsed and validated, or dropped.

import { MAX_NAME_LENGTH, cleanPlayerName, type BattlePlayer } from './battle'
import { PROTOCOL_VERSION, isRoomCode } from './battleRoom'

/** The channel everyone looking for an opponent listens on. */
export const LOBBY_CHANNEL = 'quiz-battle:lobby'

/** A lobby entry's exam when its player will play any of them. */
export const ANY_EXAM = 'any'

/**
 * A matched battle's settings. Two strangers can't negotiate a length and a
 * pace, so a matched battle is always the same short race: three questions,
 * the standard two minutes each, a mixed draw — from the topics the two pick.
 */
export const MATCH_ROUNDS = 3
export const MATCH_TIME = 'standard' as const
export const MATCH_DIFFICULTY = 'mixed' as const

export interface LobbyEntry {
  id: string
  name: string
  avatarUrl?: string
  /** A battle exam (a question's `exam` field), or `ANY_EXAM`. */
  exam: string
  /** When this player joined, on their own clock — only ever used to order the queue. */
  since: number
  v: number
}

const ID_MAX = 120
const AVATAR_MAX = 600

function isObject(x: unknown): x is Record<string, unknown> {
  return !!x && typeof x === 'object' && !Array.isArray(x)
}

function shortString(x: unknown, max: number): x is string {
  return typeof x === 'string' && x.length > 0 && x.length <= max
}

/**
 * A lobby entry off the channel, or null. An entry from another version of
 * the app is dropped here too: two versions can't play each other, so they
 * shouldn't be matched.
 */
export function parseLobbyEntry(x: unknown, exams: readonly string[]): LobbyEntry | null {
  if (!isObject(x)) return null
  if (x.v !== PROTOCOL_VERSION) return null
  if (!shortString(x.id, ID_MAX)) return null
  if (typeof x.name !== 'string' || x.name.length > MAX_NAME_LENGTH * 2) return null
  if (typeof x.exam !== 'string' || (x.exam !== ANY_EXAM && !exams.includes(x.exam))) return null
  if (typeof x.since !== 'number' || !Number.isFinite(x.since)) return null
  const avatarUrl = shortString(x.avatarUrl, AVATAR_MAX) ? x.avatarUrl : undefined
  return {
    id: x.id,
    name: cleanPlayerName(x.name, 'Player'),
    ...(avatarUrl ? { avatarUrl } : {}),
    exam: x.exam,
    since: x.since,
    v: PROTOCOL_VERSION,
  }
}

/** The entries of a lobby, validated, one per player, oldest first. */
export function lobbyEntries(raw: readonly unknown[], exams: readonly string[]): LobbyEntry[] {
  const byId = new Map<string, LobbyEntry>()
  for (const item of raw) {
    const entry = parseLobbyEntry(item, exams)
    if (!entry) continue
    // A player seen twice (two presences for one id) counts once, as their latest.
    const seen = byId.get(entry.id)
    if (!seen || entry.since >= seen.since) byId.set(entry.id, entry)
  }
  return [...byId.values()].sort(queueOrder)
}

/** The queue's order: who has waited longest, then a tiebreak every device agrees on. */
export function queueOrder(a: LobbyEntry, b: LobbyEntry): number {
  return a.since - b.since || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
}

/** Can these two play each other? The same exam, or either will play any. */
export function compatible(a: Pick<LobbyEntry, 'exam'>, b: Pick<LobbyEntry, 'exam'>): boolean {
  return a.exam === ANY_EXAM || b.exam === ANY_EXAM || a.exam === b.exam
}

/**
 * The exam two matched players battle on: the host's choice, else the guest's,
 * and if both said any, one of the exams at random.
 */
export function matchExam(
  host: Pick<LobbyEntry, 'exam'>,
  guest: Pick<LobbyEntry, 'exam'>,
  exams: readonly string[],
  random: () => number = Math.random,
): string {
  if (host.exam !== ANY_EXAM) return host.exam
  if (guest.exam !== ANY_EXAM) return guest.exam
  return exams[Math.floor(random() * exams.length)] ?? exams[0] ?? ''
}

/**
 * The pairs the lobby would make now: down the queue, each player not yet
 * paired with the next compatible player behind them — the older of the two
 * hosts. Every device computes this from the same list, so they agree on it
 * whenever they agree on the lobby.
 */
export function planMatches(entries: readonly LobbyEntry[]): Array<[host: LobbyEntry, guest: LobbyEntry]> {
  const queue = [...entries].sort(queueOrder)
  const taken = new Set<string>()
  const pairs: Array<[LobbyEntry, LobbyEntry]> = []
  for (let i = 0; i < queue.length; i++) {
    const host = queue[i]
    if (taken.has(host.id)) continue
    for (let j = i + 1; j < queue.length; j++) {
      const guest = queue[j]
      if (taken.has(guest.id) || !compatible(host, guest)) continue
      taken.add(host.id)
      taken.add(guest.id)
      pairs.push([host, guest])
      break
    }
  }
  return pairs
}

/** Where one player stands in a plan: their partner, and which of the two hosts. */
export function partnerOf(
  plan: ReadonlyArray<readonly [LobbyEntry, LobbyEntry]>,
  id: string,
): { partner: LobbyEntry; role: 'host' | 'guest' } | null {
  for (const [host, guest] of plan) {
    if (host.id === id) return { partner: guest, role: 'host' }
    if (guest.id === id) return { partner: host, role: 'guest' }
  }
  return null
}

// ── The handshake ───────────────────────────────────────────────────────────

export type LobbyMessage =
  /** Host → guest: a room, and the exam it will be played on. */
  | { t: 'offer'; v: number; from: string; to: string; code: string; exam: string; name: string; avatarUrl?: string }
  /** Guest → host: yes. */
  | { t: 'accept'; v: number; from: string; to: string; code: string }
  /** Host → guest: it's on — open the room. */
  | { t: 'go'; v: number; from: string; to: string; code: string }
  /** Guest → host: not now (already taken another offer). */
  | { t: 'decline'; v: number; from: string; to: string; code: string }
  /** Host → guest: the offer is off (the host was matched elsewhere first). */
  | { t: 'cancel'; v: number; from: string; to: string; code: string }

/** A handshake message off the channel, or null. */
export function parseLobbyMessage(x: unknown, exams: readonly string[]): LobbyMessage | null {
  if (!isObject(x) || x.v !== PROTOCOL_VERSION) return null
  if (!shortString(x.from, ID_MAX) || !shortString(x.to, ID_MAX)) return null
  if (typeof x.code !== 'string' || !isRoomCode(x.code)) return null
  const base = { v: PROTOCOL_VERSION, from: x.from, to: x.to, code: x.code }
  switch (x.t) {
    case 'offer': {
      if (typeof x.exam !== 'string' || !exams.includes(x.exam)) return null
      if (typeof x.name !== 'string' || x.name.length > MAX_NAME_LENGTH * 2) return null
      const avatarUrl = shortString(x.avatarUrl, AVATAR_MAX) ? x.avatarUrl : undefined
      return { t: 'offer', ...base, exam: x.exam, name: cleanPlayerName(x.name, 'Player'), ...(avatarUrl ? { avatarUrl } : {}) }
    }
    case 'accept':
    case 'go':
    case 'decline':
    case 'cancel':
      return { t: x.t, ...base }
    default:
      return null
  }
}

/** A lobby entry, as the player it will be in the battle. */
export function entryPlayer(entry: Pick<LobbyEntry, 'name' | 'avatarUrl'>): BattlePlayer {
  return { name: entry.name, ...(entry.avatarUrl ? { avatarUrl: entry.avatarUrl } : {}) }
}
