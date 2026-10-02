// **Quiz Battle matchmaking** — one player's end of the lobby.
//
// A `MatchmakingSession` puts its player in the lobby (presence: who is here,
// and what they want to play), watches everyone else, and when the lobby's own
// pairing (`planMatches` in lib/battleLobby.ts) puts it with somebody, seals the
// match with a three-step handshake:
//
//   host ── offer (room code, exam) ──► guest
//   host ◄── accept ─────────────────── guest
//   host ── go ────────────────────────► guest     → both leave the lobby for the room
//
// Each step can fail — a player who closed the tab is still in the lobby for a
// few seconds, two devices can see the lobby differently for a moment — and each
// failure just puts the player back in the queue: an offer nobody answers is
// dropped and that player is passed over for a while, an accept that never gets
// its go lapses, and a player never holds more than one offer at a time.
//
// A player is in the queue only while **ready** — the lobby's Ready button.
// Not ready, they watch the lobby as an observer would (and can choose their
// exam), but nobody sees them and nobody is matched with them; getting ready
// takes a place at the back of the queue.
//
// Without a player it is an **observer**: it counts the lobby (the Battle page's
// "2 people waiting") and never joins it.
//
// Framework-free, with the transport and the clock handed in, like
// lib/battleSession.ts; tested over an in-memory channel.

import type { BattlePlayer } from './battle'
import {
  entryPlayer,
  lobbyEntries,
  matchExam,
  parseLobbyMessage,
  partnerOf,
  planMatches,
  queueOrder,
  type LobbyEntry,
  type LobbyMessage,
} from './battleLobby'
import { PROTOCOL_VERSION, generateRoomCode } from './battleRoom'
import { systemClock, type Clock, type ConnectionStatus } from './battleSession'

// ── The transport ───────────────────────────────────────────────────────────

/**
 * The lobby channel: a broadcast channel with presence — every device sees
 * the entries everyone else is tracking, and the messages they send.
 */
export interface LobbyTransport {
  connect(handlers: {
    /** Everyone currently tracked on the channel, this device included — raw, to be validated. */
    presence: (entries: unknown[]) => void
    message: (raw: unknown) => void
    status: (status: ConnectionStatus) => void
  }): void
  /** Show (or update) this device's entry. */
  track(entry: LobbyEntry): void
  /** Take it down. */
  untrack(): void
  send(message: LobbyMessage): void
  close(): void
}

/** A plain broadcast channel, which is all the local transport and the tests have. */
export interface RawChannel {
  connect(handlers: { message: (raw: unknown) => void; status: (status: ConnectionStatus) => void }): void
  send(payload: unknown): void
  close(): void
}

/** How often an emulated presence says it is still here. */
export const PRESENCE_BEAT_MS = 1500
/** Silence this long and an emulated presence is gone. */
export const PRESENCE_EXPIRY_MS = 5000

/**
 * Presence over a channel that has none: each device re-announces its entry
 * every `PRESENCE_BEAT_MS`, says goodbye when it leaves, and forgets anyone it
 * hasn't heard from in `PRESENCE_EXPIRY_MS`; a newcomer says hello and is
 * answered at once. Supabase Realtime has presence built in
 * (lib/battleTransport.ts); this is for BroadcastChannel and the tests.
 */
export function presenceOverBroadcast(raw: RawChannel, clock: Clock = systemClock): LobbyTransport {
  const peers = new Map<string, { entry: unknown; seen: number }>()
  let mine: LobbyEntry | null = null
  let timer: unknown = null
  let handlers: Parameters<LobbyTransport['connect']>[0] | null = null
  let closed = false

  const publish = () => {
    if (!handlers) return
    handlers.presence([...peers.values()].map(p => p.entry).concat(mine ? [mine] : []))
  }
  const announce = () => { if (mine) raw.send({ lobby: 'here', entry: mine }) }

  return {
    connect(h) {
      handlers = h
      raw.connect({
        status: s => {
          h.status(s)
          if (s === 'open') raw.send({ lobby: 'hello' })
        },
        message: payload => {
          if (closed || !payload || typeof payload !== 'object') return
          const m = payload as { lobby?: unknown; entry?: unknown; id?: unknown; message?: unknown }
          if (m.lobby === 'here' && m.entry && typeof m.entry === 'object') {
            const id = (m.entry as { id?: unknown }).id
            if (typeof id !== 'string') return
            peers.set(id, { entry: m.entry, seen: clock.now() })
            publish()
          } else if (m.lobby === 'gone' && typeof m.id === 'string') {
            if (peers.delete(m.id)) publish()
          } else if (m.lobby === 'hello') {
            announce()
          } else if (m.lobby === 'msg') {
            h.message(m.message)
          }
        },
      })
      timer = clock.setInterval(() => {
        announce()
        const now = clock.now()
        let changed = false
        for (const [id, peer] of peers) {
          if (now - peer.seen > PRESENCE_EXPIRY_MS) {
            peers.delete(id)
            changed = true
          }
        }
        if (changed) publish()
      }, PRESENCE_BEAT_MS)
    },
    track(entry) {
      mine = entry
      announce()
      publish()
    },
    untrack() {
      if (mine) raw.send({ lobby: 'gone', id: mine.id })
      mine = null
      publish()
    },
    send(message) {
      raw.send({ lobby: 'msg', message })
    },
    close() {
      if (closed) return
      if (mine) raw.send({ lobby: 'gone', id: mine.id })
      closed = true
      mine = null
      if (timer !== null) clock.clearInterval(timer)
      raw.close()
    },
  }
}

// ── The session ─────────────────────────────────────────────────────────────

/** How long an offer waits for its accept. */
export const OFFER_TIMEOUT_MS = 3500
/** How long an accept waits for its go. */
export const GO_TIMEOUT_MS = 3500
/** How long a guest waits for the offer the plan says is coming, before giving up on that host. */
export const GUEST_WAIT_MS = 5000
/** How long a player who let an offer lapse is passed over. */
export const SNUB_MS = 15_000
/** How often the session looks at the lobby again. */
export const LOBBY_TICK_MS = 500

export interface LobbyPlayer {
  id: string
  name: string
  avatarUrl?: string
}

export interface MatchFound {
  role: 'host' | 'guest'
  /** The room both will meet in. */
  code: string
  exam: string
  opponent: BattlePlayer
}

export interface LobbySnapshot {
  status: 'connecting' | 'searching' | 'matched' | 'closed'
  connection: ConnectionStatus
  /** This player's entry — null for an observer. */
  me: LobbyEntry | null
  /** Whether that entry is in the queue: shown to the lobby, and matched. */
  ready: boolean
  /** Everyone else waiting, oldest first. */
  others: LobbyEntry[]
  match: MatchFound | null
}

export interface MatchmakingOptions {
  transport: LobbyTransport
  /** The battle exams there are — entries and offers naming anything else are dropped. */
  exams: readonly string[]
  /** Who is looking for a match; left out, the session only watches. */
  player?: LobbyPlayer
  /** The exam they want, or `ANY_EXAM`. */
  exam?: string
  /** Whether they start in the queue (the default) or wait to be `setReady`. */
  ready?: boolean
  clock?: Clock
  random?: () => number
}

export class MatchmakingSession {
  private snapshot: LobbySnapshot
  private listeners = new Set<() => void>()
  private readonly transport: LobbyTransport
  private readonly clock: Clock
  private readonly random: () => number
  private readonly exams: readonly string[]
  private timer: unknown = null
  private closed = false
  /** Every validated entry, this player's included. */
  private everyone: LobbyEntry[] = []
  private outgoing: { to: string; code: string; exam: string; at: number } | null = null
  private incoming: { from: string; code: string; exam: string; opponent: BattlePlayer; at: number } | null = null
  private waitingOn: { id: string; since: number } | null = null
  private snubbed = new Map<string, number>()

  constructor(options: MatchmakingOptions) {
    this.transport = options.transport
    this.clock = options.clock ?? systemClock
    this.random = options.random ?? Math.random
    this.exams = options.exams
    const me: LobbyEntry | null = options.player
      ? {
          id: options.player.id,
          name: options.player.name,
          ...(options.player.avatarUrl ? { avatarUrl: options.player.avatarUrl } : {}),
          exam: options.exam ?? 'any',
          since: this.clock.now(),
          v: PROTOCOL_VERSION,
        }
      : null
    const ready = !!me && (options.ready ?? true)
    this.snapshot = { status: 'connecting', connection: 'connecting', me, ready, others: [], match: null }
    this.transport.connect({
      presence: entries => { if (!this.closed) this.onPresence(entries) },
      message: raw => { if (!this.closed) this.onMessage(raw) },
      status: status => { if (!this.closed) this.onStatus(status) },
    })
    this.timer = this.clock.setInterval(() => { if (!this.closed) this.consider() }, LOBBY_TICK_MS)
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  getSnapshot = (): LobbySnapshot => this.snapshot

  private set(patch: Partial<LobbySnapshot>) {
    this.snapshot = { ...this.snapshot, ...patch }
    for (const listener of this.listeners) listener()
  }

  /** Change the exam this player wants, keeping their place in the queue. */
  setExam(exam: string): void {
    const me = this.snapshot.me
    if (!me || this.snapshot.status !== 'searching' || me.exam === exam) return
    if (exam !== 'any' && !this.exams.includes(exam)) return
    const next = { ...me, exam }
    this.set({ me: next })
    // An offer made on the old exam no longer stands.
    this.outgoing = null
    if (this.snapshot.ready) this.transport.track(next)
  }

  /**
   * Join the queue, or step out of it. Joining takes a place at the back —
   * `since` is now; stepping out withdraws any offer in flight and hides the
   * entry from the lobby.
   */
  setReady(ready: boolean): void {
    const me = this.snapshot.me
    if (!me || this.snapshot.ready === ready) return
    if (this.snapshot.status === 'matched' || this.snapshot.status === 'closed') return
    if (ready) {
      const next = { ...me, since: this.clock.now() }
      this.set({ me: next, ready: true })
      if (this.snapshot.status === 'searching') {
        this.transport.track(next)
        this.consider()
      }
      return
    }
    if (this.outgoing) this.reply('cancel', this.outgoing.to, this.outgoing.code)
    if (this.incoming) this.reply('decline', this.incoming.from, this.incoming.code)
    this.outgoing = null
    this.incoming = null
    this.waitingOn = null
    this.set({ ready: false })
    try { this.transport.untrack() } catch { /* ignore */ }
  }

  /** Leave the lobby. Idempotent. */
  leave(): void {
    if (this.closed) return
    this.closed = true
    if (this.timer !== null) this.clock.clearInterval(this.timer)
    try { this.transport.untrack() } catch { /* ignore */ }
    this.transport.close()
    this.set({ status: this.snapshot.status === 'matched' ? 'matched' : 'closed', connection: 'closed' })
  }

  private onStatus(status: ConnectionStatus) {
    const joining = status === 'open' && this.snapshot.status === 'connecting'
    this.set(joining ? { connection: status, status: 'searching' } : { connection: status })
    // Searching before being seen: an offer can arrive the instant the entry
    // is out, and a player still connecting would turn it down.
    if (joining && this.snapshot.me && this.snapshot.ready) this.transport.track(this.snapshot.me)
  }

  private onPresence(raw: unknown[]) {
    this.everyone = lobbyEntries(raw, this.exams)
    const myId = this.snapshot.me?.id
    this.set({ others: this.everyone.filter(e => e.id !== myId) })
    this.consider()
  }

  /** Look at the lobby, and make an offer if the plan says it's this player's to make. */
  private consider() {
    const me = this.snapshot.me
    if (!me || !this.snapshot.ready || this.snapshot.status !== 'searching') return
    const now = this.clock.now()
    for (const [id, until] of this.snubbed) if (until <= now) this.snubbed.delete(id)

    if (this.outgoing && now - this.outgoing.at > OFFER_TIMEOUT_MS) {
      this.snubbed.set(this.outgoing.to, now + SNUB_MS)
      this.outgoing = null
    }
    if (this.incoming && now - this.incoming.at > GO_TIMEOUT_MS) this.incoming = null
    if (this.outgoing || this.incoming) return

    const lobby = this.everyone.filter(e => e.id === me.id || !this.snubbed.has(e.id))
    if (!lobby.some(e => e.id === me.id)) lobby.push(me)
    const mine = partnerOf(planMatches(lobby), me.id)
    if (!mine) {
      this.waitingOn = null
      return
    }
    if (mine.role === 'guest') {
      // The plan says an offer is coming. If it doesn't, that host sees the
      // lobby differently (or has gone): pass them over and plan again.
      if (this.waitingOn?.id !== mine.partner.id) this.waitingOn = { id: mine.partner.id, since: now }
      else if (now - this.waitingOn.since > GUEST_WAIT_MS) {
        this.snubbed.set(mine.partner.id, now + SNUB_MS)
        this.waitingOn = null
      }
      return
    }
    this.waitingOn = null
    const code = generateRoomCode(this.random)
    const exam = matchExam(me, mine.partner, this.exams, this.random)
    this.outgoing = { to: mine.partner.id, code, exam, at: now }
    this.transport.send({
      t: 'offer', v: PROTOCOL_VERSION, from: me.id, to: mine.partner.id, code, exam,
      name: me.name, ...(me.avatarUrl ? { avatarUrl: me.avatarUrl } : {}),
    })
  }

  private reply(t: 'accept' | 'go' | 'decline' | 'cancel', to: string, code: string) {
    const me = this.snapshot.me
    if (!me) return
    this.transport.send({ t, v: PROTOCOL_VERSION, from: me.id, to, code })
  }

  private onMessage(raw: unknown) {
    const me = this.snapshot.me
    if (!me) return
    const message = parseLobbyMessage(raw, this.exams)
    if (!message || message.to !== me.id || message.from === me.id) return
    const now = this.clock.now()

    switch (message.t) {
      case 'offer': {
        if (this.snapshot.status !== 'searching' || !this.snapshot.ready || this.incoming) {
          this.reply('decline', message.from, message.code)
          return
        }
        if (this.outgoing) {
          // Both of us offered. The one further up the queue hosts; the other
          // takes their offer and withdraws its own.
          const them = this.everyone.find(e => e.id === message.from)
          const theyHost = them ? queueOrder(them, me) < 0 : false
          if (!theyHost) {
            this.reply('decline', message.from, message.code)
            return
          }
          this.reply('cancel', this.outgoing.to, this.outgoing.code)
          this.outgoing = null
        }
        this.incoming = {
          from: message.from,
          code: message.code,
          exam: message.exam,
          opponent: entryPlayer(message),
          at: now,
        }
        this.reply('accept', message.from, message.code)
        return
      }
      case 'accept': {
        if (!this.outgoing || this.outgoing.to !== message.from || this.outgoing.code !== message.code
          || this.snapshot.status !== 'searching' || !this.snapshot.ready) {
          this.reply('cancel', message.from, message.code)
          return
        }
        const partner = this.everyone.find(e => e.id === message.from)
        const match: MatchFound = {
          role: 'host',
          code: this.outgoing.code,
          exam: this.outgoing.exam,
          opponent: partner ? entryPlayer(partner) : { name: 'Opponent' },
        }
        this.outgoing = null
        this.reply('go', message.from, message.code)
        this.matched(match)
        return
      }
      case 'go': {
        if (!this.incoming || this.incoming.from !== message.from || this.incoming.code !== message.code) return
        const { code, exam, opponent } = this.incoming
        this.incoming = null
        this.matched({ role: 'guest', code, exam, opponent })
        return
      }
      case 'decline': {
        if (this.outgoing && this.outgoing.to === message.from && this.outgoing.code === message.code) {
          this.snubbed.set(message.from, now + SNUB_MS / 3)
          this.outgoing = null
          this.consider()
        }
        return
      }
      case 'cancel': {
        if (this.incoming && this.incoming.from === message.from && this.incoming.code === message.code) {
          this.incoming = null
          this.consider()
        }
        return
      }
    }
  }

  private matched(match: MatchFound) {
    try { this.transport.untrack() } catch { /* ignore */ }
    this.set({ status: 'matched', match })
  }
}
