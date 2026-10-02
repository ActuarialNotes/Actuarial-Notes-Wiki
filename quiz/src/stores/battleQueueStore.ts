import { create } from 'zustand'
import type { MatchFound, MatchmakingSession } from '@/lib/battleMatchmaking'
import { reusesLobby } from '@/lib/battleQueue'
import { playSound } from '@/lib/soundEngine'

// The Quiz Battle queue, held above the page (lib/battleQueue.ts).
//
// The lobby screen (components/battle/Matchmaking.tsx) no longer owns its
// matchmaking session: it asks this store for one. When the screen goes away
// with the player *not* ready, the session goes with it, as it always did —
// they were only watching. When they are ready, it stays: their entry stays in
// the lobby, the pill (components/BattleQueueButton.tsx) follows them, and a
// match found while they are away is kept here for the battle page to pick up.
//
// The session's class is only ever *handed in* (`openLobby`'s `create`), never
// imported: this store is in the main bundle for the pill, and the lobby's
// machinery belongs to the battle page's lazy chunk.

interface BattleQueueState {
  /** The lobby session held — watched, or queued in. */
  session: MatchmakingSession | null
  /** Who it is for (`lobbyOwnerKey`). */
  ownerKey: string | null
  /** The battle page the queue was joined from — where a match takes the player. */
  path: string
  /** Lobby screens mounted. The pill stands down while one is up. */
  lobbies: number
  /** Battle pages mounted — each picks up a match the moment it is found. */
  pages: number
  /** A match found and not yet picked up by a battle page. */
  match: MatchFound | null
  /** Bumped by the pill's Return: a battle page already mounted shows its lobby. */
  summons: number

  /**
   * A lobby screen is up for `ownerKey`: take over the session held for them,
   * or start one with `create` (told whether the player was queued, so a new
   * name keeps the place it replaced). Pair with `releaseLobby`.
   */
  openLobby(ownerKey: string, path: string, create: (ready: boolean) => MatchmakingSession): MatchmakingSession
  /** That screen has gone. A player who wasn't queued leaves the lobby with it. */
  releaseLobby(session: MatchmakingSession): void
  /** Leave the queue — the pill's Leave, or a battle begun some other way. */
  leaveQueue(): void
  /** The match found, handed to the battle page that will play it. */
  takeMatch(): MatchFound | null
  /** A battle page mounted; returns its unmount. */
  mountPage(): () => void
  /** The pill's Return. */
  summon(): void
}

let unwatch: (() => void) | null = null

function drop(session: MatchmakingSession) {
  unwatch?.()
  unwatch = null
  session.leave()
}

export const useBattleQueueStore = create<BattleQueueState>()((set, get) => {
  /** Keep an eye on the session held: a match is kept, chimed, and the lobby left. */
  function watch(session: MatchmakingSession) {
    unwatch?.()
    const stop = session.subscribe(() => {
      const snapshot = session.getSnapshot()
      if (get().session !== session) return
      if (snapshot.match) {
        stop()
        unwatch = null
        set({ session: null, ownerKey: null, match: snapshot.match })
        playSound('matchFound')
        session.leave()
      } else if (snapshot.status === 'closed') {
        stop()
        unwatch = null
        set({ session: null, ownerKey: null })
      }
    })
    unwatch = stop
  }

  return {
    session: null,
    ownerKey: null,
    path: '/battle',
    lobbies: 0,
    pages: 0,
    match: null,
    summons: 0,

    openLobby(ownerKey, path, create) {
      const held = get().session
      const heldKey = get().ownerKey
      let session = held
      if (!held || !heldKey || !reusesLobby({ ownerKey: heldKey, snapshot: held.getSnapshot() }, ownerKey)) {
        const wasReady = !!held && held.getSnapshot().ready
        if (held) drop(held)
        session = create(wasReady)
        watch(session)
      }
      set(s => ({ session, ownerKey, path, lobbies: s.lobbies + 1 }))
      return session as MatchmakingSession
    },

    releaseLobby(session) {
      set(s => ({ lobbies: Math.max(0, s.lobbies - 1) }))
      if (get().session !== session) return
      if (session.getSnapshot().ready) return
      drop(session)
      set({ session: null, ownerKey: null })
    },

    leaveQueue() {
      const held = get().session
      if (!held) return
      drop(held)
      set({ session: null, ownerKey: null })
    },

    takeMatch() {
      const match = get().match
      if (match) set({ match: null })
      return match
    },

    mountPage() {
      set(s => ({ pages: s.pages + 1 }))
      return () => set(s => ({ pages: Math.max(0, s.pages - 1) }))
    },

    summon() {
      set(s => ({ summons: s.summons + 1 }))
    },
  }
})
