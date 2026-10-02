// A place in the Quiz Battle queue outlives its page.
//
// The lobby's session (lib/battleMatchmaking.ts) is held by
// `stores/battleQueueStore.ts`, not by the lobby screen, so a player who has
// pressed Ready can go and read a study guide while they wait and keep their
// place: a "Return to lobby" pill follows them around the app with how long
// they have been waiting, and offers **Return** or **Leave** — the same choice
// the "Return to quiz" pill offers (lib/quizResume.ts). When the match comes,
// wherever they are, they are taken back to the battle page, which picks it up.
//
// These are the rules that make that true, kept pure so they can be tested
// without a store, a channel or a router:
//
//  - what counts as *queued* (ready, and not yet matched or gone);
//  - when a lobby screen can take over the session already held, and when it
//    needs a new one (a new name or avatar is a new entry in the lobby);
//  - where the pill is drawn, and when a match found elsewhere calls the player
//    back to the battle page.

import type { LobbySnapshot } from './battleMatchmaking'
import { formatClock } from './quizTiming'

/** In the queue: ready, and still looking. Not ready, the lobby is only being watched. */
export function isQueued(snapshot: Pick<LobbySnapshot, 'status' | 'ready' | 'me'> | null | undefined): boolean {
  if (!snapshot || !snapshot.me || !snapshot.ready) return false
  return snapshot.status === 'connecting' || snapshot.status === 'searching'
}

/** Who a lobby entry is for. A new name or avatar is a new entry, so a new session. */
export function lobbyOwnerKey(player: { name: string; avatarUrl?: string }): string {
  return `${player.name}\u0000${player.avatarUrl ?? ''}`
}

/**
 * Whether a lobby screen opened for `ownerKey` takes over the session already
 * held — the player coming back to the queue they left — rather than starting
 * a fresh one. A finished session (matched, closed) is never taken over.
 */
export function reusesLobby(
  held: { ownerKey: string; snapshot: Pick<LobbySnapshot, 'status'> } | null,
  ownerKey: string,
): boolean {
  if (!held || held.ownerKey !== ownerKey) return false
  return held.snapshot.status === 'connecting' || held.snapshot.status === 'searching'
}

/**
 * Whether the "Return to lobby" pill is drawn: while the player is queued and
 * no lobby screen is showing — anywhere else in the app, and on the battle
 * page's own other screens.
 */
export function showsBattleQueue(queued: boolean, lobbiesShown: number): boolean {
  return queued && lobbiesShown <= 0
}

/**
 * Whether a match found while the player was away has to fetch them: no
 * battle page is mounted to pick it up, so they are taken to the one the
 * queue was joined from.
 */
export function callsBackToBattle(matchPending: boolean, battlePagesMounted: number): boolean {
  return matchPending && battlePagesMounted <= 0
}

/** "0:42" — how long since `since`, on this device's clock. */
export function waitedClock(since: number, now: number): string {
  return formatClock(Math.max(0, Math.floor((now - since) / 1000)))
}
