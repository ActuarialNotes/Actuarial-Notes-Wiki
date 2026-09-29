// **Quiz Battle, online** — the two ends of a room, as objects the page
// subscribes to.
//
// `HostSession` owns the battle: it runs the reducer from lib/battle.ts on its
// own clock, applies what the joining player sends as that player's moves, and
// sends the room back — redacted, on every change and as a heartbeat. The
// `GuestSession` only asks: it sends its player's moves, and draws the last
// room it was sent, moved onto its own clock.
//
// Before each battle the room goes through a topic pick and a draw
// (lib/battleTopics.ts): the host opens the pick, holds both players to its
// clock, draws the questions from the two picks and shows the draw on both
// screens, and the battle starts when the draw is done.
//
// Neither touches React, a network API or a global clock directly: the
// transport and the clock are handed in, so both ends are tested talking to
// each other over an in-memory channel (battleSession.test.ts). The page wraps
// them in `useSyncExternalStore` (hooks/useBattleSession.ts).

import {
  battleReducer,
  cleanPlayerName,
  createBattle,
  currentRound,
  otherSeat,
  redactFor,
  roundMs,
  shiftClock,
  ONLINE_GRACE_MS,
  type BattleConfig,
  type BattleEvent,
  type BattlePlayer,
  type BattleQuestionKey,
  type BattleState,
  type Seat,
} from './battle'
import {
  PROTOCOL_VERSION,
  isReaction,
  parseMessage,
  type BattleMessage,
  type GuestAction,
  type Reaction,
  type RoomStage,
} from './battleRoom'
import {
  MAX_TOPICS,
  TOPIC_PICK_MS,
  cleanTopicPick,
  drawDurationMs,
  redactDraft,
  shiftDraftClock,
  type BattleDraft,
} from './battleTopics'

// ── The transport ───────────────────────────────────────────────────────────

export type ConnectionStatus = 'connecting' | 'open' | 'error' | 'closed'

/** A broadcast channel: everything sent reaches every *other* device listening. */
export interface BattleTransport {
  connect(handlers: { message: (raw: unknown) => void; status: (status: ConnectionStatus) => void }): void
  send(message: BattleMessage): void
  close(): void
}

// ── Timing ──────────────────────────────────────────────────────────────────

/** How often each end runs its clock — often enough that a round closes on time. */
export const TICK_MS = 200
/** How often the host re-sends the room, and each end says it's still there. */
export const HEARTBEAT_MS = 2000
/** Silence this long and the other device is taken to have dropped. */
export const PRESENCE_TIMEOUT_MS = 8000
/** How often a joining player asks to be let in until it hears back. */
export const JOIN_RETRY_MS = 1500
/** How long a joining player asks before deciding no one is hosting that code. */
export const JOIN_TIMEOUT_MS = 12_000
/** How long a reaction stays on screen. */
export const REACTION_MS = 2600

export interface Clock {
  now(): number
  setInterval(fn: () => void, ms: number): unknown
  clearInterval(handle: unknown): void
}

export const systemClock: Clock = {
  now: () => Date.now(),
  setInterval: (fn, ms) => globalThis.setInterval(fn, ms),
  clearInterval: handle => globalThis.clearInterval(handle as ReturnType<typeof setInterval>),
}

// ── What the page draws ─────────────────────────────────────────────────────

export type SessionStage = 'connecting' | 'waiting' | RoomStage | 'ended'

/** Something the page has to explain rather than draw. */
export type SessionProblem =
  /** Nobody answered the code. */
  | 'not-found'
  /** The room already has two players. */
  | 'full'
  /** The other device runs a different version of the app (or of the question bank). */
  | 'version'
  /** The host closed the room. */
  | 'host-left'
  /** The channel itself failed. */
  | 'connection'

export interface ShownReaction {
  id: string
  seat: Seat
  emoji: Reaction
  at: number
}

export interface SessionSnapshot {
  role: 'host' | 'guest'
  code: string
  /** Which seat this device plays: the host is always 0. */
  me: Seat
  stage: SessionStage
  connection: ConnectionStatus
  players: [BattlePlayer | null, BattlePlayer | null]
  config: BattleConfig
  /** On this device's clock, with the other player's unrevealed answer hidden. */
  battle: BattleState | null
  /** Heard from the other device within `PRESENCE_TIMEOUT_MS`. */
  opponentPresent: boolean
  /** Who has asked for a rematch since the last battle ended. */
  rematch: [boolean, boolean]
  reactions: ShownReaction[]
  problem: SessionProblem | null
  /** Guest: an answer sent and not yet in a room the host sent back. */
  pendingAnswer: { round: number; choice: string } | null
  /**
   * The topic pick and the draw (lib/battleTopics.ts), on this device's clock,
   * the other player's picks hidden until the draw. Kept through the battle it
   * drew, for the topic each question came from.
   */
  draft: BattleDraft | null
  /** This player's topics while they are still choosing — not yet locked in. */
  topicChoice: string[]
}

/** A draft with `seat`'s pick in it. */
function withPick(draft: BattleDraft, seat: Seat, topics: string[]): BattleDraft {
  const picks: [string[] | null, string[] | null] = [...draft.picks]
  picks[seat] = topics
  return { ...draft, picks }
}

type Listener = () => void

let reactionCounter = 0

/** What both ends share: subscribers, the clock, the transport and reactions. */
abstract class Session {
  protected snapshot: SessionSnapshot
  private listeners = new Set<Listener>()
  private timers: unknown[] = []
  private lastReactionAt = -Infinity
  protected lastHeardAt: number
  protected closed = false

  constructor(
    protected readonly transport: BattleTransport,
    protected readonly clock: Clock,
    protected readonly clientId: string,
    initial: SessionSnapshot,
  ) {
    this.snapshot = initial
    this.lastHeardAt = clock.now()
  }

  protected begin(): void {
    this.transport.connect({
      message: raw => { if (!this.closed) this.receive(raw) },
      status: status => { if (!this.closed) this.onStatus(status) },
    })
    this.every(TICK_MS, () => this.tick())
    this.every(HEARTBEAT_MS, () => this.heartbeat())
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  getSnapshot = (): SessionSnapshot => this.snapshot

  protected set(patch: Partial<SessionSnapshot>): void {
    this.snapshot = { ...this.snapshot, ...patch }
    for (const listener of this.listeners) listener()
  }

  protected every(ms: number, fn: () => void): void {
    this.timers.push(this.clock.setInterval(() => { if (!this.closed) fn() }, ms))
  }

  protected send(message: BattleMessage): void {
    if (!this.closed) this.transport.send(message)
  }

  protected envelope() {
    return { v: PROTOCOL_VERSION, from: this.clientId }
  }

  /** Send an emoji to the other player, at most one every 600ms. */
  react(emoji: Reaction): void {
    const now = this.clock.now()
    if (now - this.lastReactionAt < 600) return
    this.lastReactionAt = now
    this.send({ t: 'react', ...this.envelope(), seat: this.snapshot.me, emoji })
    this.showReaction(this.snapshot.me, emoji)
  }

  protected showReaction(seat: Seat, emoji: Reaction): void {
    const now = this.clock.now()
    const reactions = [
      ...this.snapshot.reactions.filter(r => now - r.at < REACTION_MS),
      { id: `r${++reactionCounter}`, seat, emoji, at: now },
    ].slice(-8)
    this.set({ reactions })
  }

  /**
   * The channel's own state, shown as it is. A channel that drops mid-battle
   * reconnects by itself, so nothing here ends a session — a guest that never
   * gets through gives up on its own clock (`JOIN_TIMEOUT_MS`).
   */
  protected onStatus(status: ConnectionStatus): void {
    if (status !== this.snapshot.connection) this.set({ connection: status })
  }

  /** The other device, by the time since it was last heard. */
  protected checkPresence(): void {
    const present = this.clock.now() - this.lastHeardAt < PRESENCE_TIMEOUT_MS
    if (present !== this.snapshot.opponentPresent) this.set({ opponentPresent: present })
  }

  protected pruneReactions(): void {
    const now = this.clock.now()
    const reactions = this.snapshot.reactions.filter(r => now - r.at < REACTION_MS)
    if (reactions.length !== this.snapshot.reactions.length) this.set({ reactions })
  }

  /** Stop, and tell the other device. Idempotent. */
  leave(): void {
    if (this.closed) return
    this.send({ t: 'bye', ...this.envelope() })
    this.closed = true
    for (const handle of this.timers) this.clock.clearInterval(handle)
    this.timers = []
    this.transport.close()
    this.set({ stage: 'ended', connection: 'closed' })
  }

  protected abstract receive(raw: unknown): void
  protected abstract tick(): void
  protected abstract heartbeat(): void
}

// ── The host ────────────────────────────────────────────────────────────────

/**
 * What a room's battles are drawn from: the page's question bank, behind two
 * calls, so the session never holds a question's text.
 */
export interface TopicSource {
  /** The topics a battle on `exam` can be played on. */
  topics(exam: string): readonly string[]
  /** The battle's questions, drawn from both players' picks, each with the topic it was drawn for. */
  draw(config: BattleConfig, picks: [string[], string[]]): { key: BattleQuestionKey; topic: string | null }[]
}

export interface HostOptions {
  transport: BattleTransport
  code: string
  host: BattlePlayer
  config: BattleConfig
  clientId: string
  /** Where the topic pick's topics and the draw come from. Without it, `openTopics` does nothing. */
  topics?: TopicSource
  clock?: Clock
}

export class HostSession extends Session {
  private guestId: string | null = null
  /** The battle on the host's clock, unredacted — the one true copy. */
  private battle: BattleState | null = null
  private roomStage: RoomStage = 'lobby'
  private readonly topicSource: TopicSource | null
  /** The pick and the draw on the host's clock, unredacted. */
  private draft: BattleDraft | null = null
  /** The questions the draw came up with, answers and all — never sent until the battle is. */
  private drawnKeys: BattleQuestionKey[] = []
  /** Battles opened in this room, so a pick can say which one it is for. */
  private games = 0

  constructor(options: HostOptions) {
    super(options.transport, options.clock ?? systemClock, options.clientId, {
      role: 'host',
      code: options.code,
      me: 0,
      stage: 'waiting',
      connection: 'connecting',
      players: [options.host, null],
      config: options.config,
      battle: null,
      opponentPresent: false,
      rematch: [false, false],
      reactions: [],
      problem: null,
      pendingAnswer: null,
      draft: null,
      topicChoice: [],
    })
    this.topicSource = options.topics ?? null
    this.begin()
  }

  /** Change the settings while no battle is on (or being drawn). */
  setConfig(config: BattleConfig): void {
    if (this.roomStage !== 'lobby' && this.roomStage !== 'finished') return
    this.set({ config })
    this.broadcast()
  }

  /**
   * Open the topic pick — from the lobby, or as a rematch from the results.
   * Each player has `TOPIC_PICK_MS` to lock in up to three topics; then the
   * questions are drawn from both picks, the draw is shown, and the battle
   * starts. Needs a second player.
   */
  openTopics(): void {
    const [host, guest] = this.snapshot.players
    if (!host || !guest || !this.topicSource) return
    if (this.roomStage !== 'lobby' && this.roomStage !== 'finished') return
    this.games += 1
    this.battle = null
    this.drawnKeys = []
    this.draft = { game: this.games, phase: 'picking', deadline: this.clock.now() + TOPIC_PICK_MS, picks: [null, null], drawn: [] }
    this.roomStage = 'picking'
    this.publish({ rematch: [false, false], topicChoice: [] })
  }

  /** This player's topics while they choose — on this screen only, until `lockTopics` (or the clock) sends them in. */
  chooseTopics(topics: readonly string[]): void {
    if (this.roomStage !== 'picking' || this.draft?.picks[0]) return
    this.set({ topicChoice: cleanTopicPick(topics, this.offeredTopics()) })
  }

  /** Lock this player's topics in. */
  lockTopics(): void {
    this.setPick(0, this.snapshot.topicChoice)
  }

  /**
   * Start a battle on these questions — at the end of a draw, or straight
   * from the lobby or the results. Needs a second player.
   */
  start(questions: BattleQuestionKey[]): void {
    const [host, guest] = this.snapshot.players
    if (!host || !guest || this.roomStage === 'playing' || this.roomStage === 'picking' || questions.length === 0) return
    this.battle = createBattle({
      config: { ...this.snapshot.config, rules: 'simultaneous' },
      players: [host, guest],
      questions,
      now: this.clock.now(),
      graceMs: ONLINE_GRACE_MS,
    })
    // A battle that wasn't drawn from a pick has no topics to tell.
    if (this.roomStage !== 'drawing') this.draft = null
    this.drawnKeys = []
    this.roomStage = 'playing'
    this.publish({ rematch: [false, false] })
  }

  /** Back to the lobby from the results, to change the settings. */
  toLobby(): void {
    if (this.roomStage !== 'finished') return
    this.battle = null
    this.draft = null
    this.roomStage = 'lobby'
    this.publish({ rematch: [false, false] })
  }

  private offeredTopics(): readonly string[] {
    return this.topicSource?.topics(this.snapshot.config.exam) ?? []
  }

  /** A player's pick is in; with both in, the draw. */
  private setPick(seat: Seat, topics: readonly unknown[]): void {
    const draft = this.draft
    if (this.roomStage !== 'picking' || !draft || draft.picks[seat]) return
    this.draft = withPick(draft, seat, cleanTopicPick(topics, this.offeredTopics()))
    if (this.draft.picks[0] && this.draft.picks[1]) this.closeTopics()
    else this.publish()
  }

  /** The picks are in, or out of time: draw the questions, and show the draw. */
  private closeTopics(): void {
    const draft = this.draft
    if (this.roomStage !== 'picking' || !draft || !this.topicSource) return
    const picks: [string[], string[]] = [draft.picks[0] ?? [], draft.picks[1] ?? []]
    const drawn = this.topicSource.draw({ ...this.snapshot.config, rules: 'simultaneous' }, picks)
    if (drawn.length === 0) {
      // Nothing to play on — the bank has no battle questions for this exam.
      this.draft = null
      this.roomStage = 'lobby'
      this.publish()
      return
    }
    this.drawnKeys = drawn.map(d => d.key)
    this.draft = {
      ...draft,
      phase: 'drawing',
      picks,
      deadline: this.clock.now() + drawDurationMs(drawn.length),
      drawn: drawn.map(d => ({ id: d.key.id, topic: d.topic })),
    }
    this.roomStage = 'drawing'
    this.publish()
  }

  private tickDraft(now: number): void {
    const draft = this.draft
    if (!draft) return
    if (this.roomStage === 'drawing') {
      if (now >= draft.deadline) this.start(this.drawnKeys)
      return
    }
    // Out of time: this player's choice goes in as it stands. The other
    // player's device does the same on its own clock, and its pick still has
    // the grace an answer gets to arrive.
    if (now >= draft.deadline && !draft.picks[0]) this.lockTopics()
    if (now >= draft.deadline + ONLINE_GRACE_MS) this.closeTopics()
  }

  answer(choice: string): void {
    this.apply({ type: 'answer', seat: 0, choice, now: this.clock.now() })
  }

  ready(): void {
    this.apply({ type: 'ready', seat: 0, now: this.clock.now() })
  }

  /** End the battle for a player who has dropped and isn't coming back. */
  endForAbsentGuest(): void {
    this.apply({ type: 'forfeit', seat: 1, now: this.clock.now() })
  }

  private apply(event: BattleEvent): void {
    if (!this.battle || this.roomStage !== 'playing') return
    const next = battleReducer(this.battle, event)
    if (next === this.battle) return
    this.battle = next
    if (next.finished) this.roomStage = 'finished'
    this.publish()
  }

  /** Redraw here and send the room there. */
  private publish(patch: Partial<SessionSnapshot> = {}): void {
    this.set({
      ...patch,
      stage: this.snapshot.players[1] ? this.roomStage : 'waiting',
      battle: this.battle ? redactFor(this.battle, 0) : null,
      draft: this.draft ? redactDraft(this.draft, 0) : null,
    })
    this.broadcast()
  }

  private broadcast(): void {
    const [host, guest] = this.snapshot.players
    if (!this.guestId || !host || !guest) return
    this.send({
      t: 'room',
      ...this.envelope(),
      to: this.guestId,
      sentAt: this.clock.now(),
      stage: this.roomStage,
      host,
      guest,
      config: this.snapshot.config,
      draft: this.draft ? redactDraft(this.draft, 1) : null,
      battle: this.battle ? redactFor(this.battle, 1) : null,
      rematch: this.snapshot.rematch,
    })
  }

  protected tick(): void {
    if (this.guestId) this.checkPresence()
    this.pruneReactions()
    const now = this.clock.now()
    if (this.roomStage === 'picking' || this.roomStage === 'drawing') this.tickDraft(now)
    else this.apply({ type: 'tick', now })
  }

  protected heartbeat(): void {
    this.broadcast()
  }

  protected receive(raw: unknown): void {
    const message = parseMessage(raw)
    if (!message || message.from === this.clientId) return
    if (message.v !== PROTOCOL_VERSION) return
    const fromGuest = message.from === this.guestId
    if (fromGuest) this.lastHeardAt = this.clock.now()

    switch (message.t) {
      case 'join': return this.onJoin(message.from, message.name, message.avatarUrl)
      case 'act': if (fromGuest) this.onAction(message.action); return
      case 'react': if (fromGuest && message.seat === 1) this.showReaction(1, message.emoji); return
      case 'bye': if (fromGuest) this.onGuestLeft(); return
      default: return
    }
  }

  private onJoin(from: string, name: string, avatarUrl: string | undefined): void {
    // The seat is taken by someone else who is still here: turn this one away.
    const seatTaken = this.guestId !== null && this.guestId !== from && this.snapshot.opponentPresent
    if (seatTaken) {
      this.send({ t: 'full', ...this.envelope(), to: from })
      return
    }
    // A new player, the same one again (a reload keeps its id), or someone
    // taking over the seat of a player who dropped.
    this.guestId = from
    this.lastHeardAt = this.clock.now()
    const guest: BattlePlayer = { name: cleanPlayerName(name, 'Player 2'), ...(avatarUrl ? { avatarUrl } : {}) }
    if (this.battle) this.battle = { ...this.battle, players: [this.battle.players[0], guest] }
    this.set({ players: [this.snapshot.players[0], guest], opponentPresent: true })
    this.publish()
  }

  private onAction(action: GuestAction): void {
    if (action.kind === 'rematch') {
      if (this.roomStage !== 'finished' || this.snapshot.rematch[1]) return
      this.publish({ rematch: [this.snapshot.rematch[0], true] })
      return
    }
    if (action.kind === 'topics') {
      // A pick for an earlier battle in the room is a resend that crossed the draw.
      if (this.draft?.game === action.game) this.setPick(1, action.topics)
      return
    }
    if (!this.battle) return
    // A move meant for a question that is no longer the one being played is
    // stale — a resend that crossed the reveal on the wire.
    if (action.round !== currentRound(this.battle).index) return
    const now = this.clock.now()
    if (action.kind === 'answer') {
      this.apply({ type: 'answer', seat: 1, choice: action.choice, now, elapsedMs: action.elapsedMs })
    } else {
      this.apply({ type: 'ready', seat: 1, now })
    }
  }

  private onGuestLeft(): void {
    if (this.roomStage === 'playing') {
      this.apply({ type: 'forfeit', seat: 1, now: this.clock.now() })
      this.set({ opponentPresent: false })
      return
    }
    this.guestId = null
    this.battle = null
    this.draft = null
    this.drawnKeys = []
    this.roomStage = 'lobby'
    this.set({ players: [this.snapshot.players[0], null], opponentPresent: false })
    this.publish({ rematch: [false, false] })
  }
}

// ── The joining player ──────────────────────────────────────────────────────

export interface GuestOptions {
  transport: BattleTransport
  code: string
  me: BattlePlayer
  clientId: string
  /** Every question id this device can show — a room naming one it can't is a version mismatch. */
  knows: (questionId: string) => boolean
  clock?: Clock
}

const PLACEHOLDER_CONFIG: BattleConfig = { rules: 'simultaneous', exam: '', rounds: 0, roundSeconds: 60 }

export class GuestSession extends Session {
  private hostId: string | null = null
  private joinStartedAt: number
  private lastJoinAt = -Infinity
  private readonly player: BattlePlayer
  private readonly knows: (questionId: string) => boolean
  /** A Ready not yet seen in a room the host sent back. */
  private pendingReady: number | null = null
  /** Topics locked in and not yet seen in a room the host sent back. */
  private pendingTopics: { game: number; topics: string[] } | null = null
  /** The battle in the room the last draft was for — a new one clears this player's choice. */
  private draftGame: number | null = null

  constructor(options: GuestOptions) {
    const clock = options.clock ?? systemClock
    super(options.transport, clock, options.clientId, {
      role: 'guest',
      code: options.code,
      me: 1,
      stage: 'connecting',
      connection: 'connecting',
      players: [null, options.me],
      config: PLACEHOLDER_CONFIG,
      battle: null,
      opponentPresent: false,
      rematch: [false, false],
      reactions: [],
      problem: null,
      pendingAnswer: null,
      draft: null,
      topicChoice: [],
    })
    this.player = options.me
    this.knows = options.knows
    this.joinStartedAt = clock.now()
    this.begin()
  }

  answer(choice: string): void {
    const battle = this.snapshot.battle
    if (!battle || this.snapshot.stage !== 'playing' || this.snapshot.pendingAnswer) return
    const round = currentRound(battle)
    const now = this.clock.now()
    if (round.locks[1] || round.phase === 'revealed' || now < round.opensAt || now >= round.deadline) return
    if (!battle.questions[round.index].options.includes(choice)) return
    this.set({ pendingAnswer: { round: round.index, choice } })
    this.sendAnswer()
  }

  ready(): void {
    const battle = this.snapshot.battle
    if (!battle) return
    const round = currentRound(battle)
    if (round.phase !== 'revealed' || round.ready.includes(1)) return
    this.pendingReady = round.index
    this.set({ battle: { ...battle, rounds: [...battle.rounds.slice(0, -1), { ...round, ready: [...round.ready, 1] }] } })
    this.send({ t: 'act', ...this.envelope(), action: { kind: 'ready', round: round.index } })
  }

  /** This player's topics while they choose — on this screen only, until `lockTopics` (or the clock) sends them in. */
  chooseTopics(topics: readonly string[]): void {
    if (!this.canPick()) return
    // The host holds a pick to the exam's topics; this only keeps it to size.
    this.set({ topicChoice: topics.slice(0, MAX_TOPICS) })
  }

  /** Lock this player's topics in. Sent again with each heartbeat until the host's room shows them. */
  lockTopics(): void {
    const draft = this.snapshot.draft
    if (!draft || !this.canPick()) return
    const topics = this.snapshot.topicChoice
    this.pendingTopics = { game: draft.game, topics }
    this.set({ draft: withPick(draft, 1, topics) })
    this.sendTopics()
  }

  private canPick(): boolean {
    const draft = this.snapshot.draft
    return this.snapshot.stage === 'picking' && !!draft && draft.phase === 'picking' && !draft.picks[1] && !this.pendingTopics
  }

  private sendTopics(): void {
    if (this.pendingTopics) this.send({ t: 'act', ...this.envelope(), action: { kind: 'topics', ...this.pendingTopics } })
  }

  requestRematch(): void {
    if (this.snapshot.stage !== 'finished' || this.snapshot.rematch[1]) return
    this.set({ rematch: [this.snapshot.rematch[0], true] })
    this.send({ t: 'act', ...this.envelope(), action: { kind: 'rematch' } })
  }

  private sendAnswer(): void {
    const pending = this.snapshot.pendingAnswer
    const battle = this.snapshot.battle
    if (!pending || !battle) return
    const round = battle.rounds[pending.round]
    if (!round) return
    // Measured on this device, from the moment the question appeared here —
    // the time the room took to arrive isn't the player's.
    const elapsedMs = Math.min(roundMs(battle.config), Math.max(0, this.clock.now() - round.opensAt))
    this.send({ t: 'act', ...this.envelope(), action: { kind: 'answer', round: pending.round, choice: pending.choice, elapsedMs } })
  }

  protected tick(): void {
    if (this.snapshot.stage === 'connecting') {
      const now = this.clock.now()
      if (now - this.joinStartedAt >= JOIN_TIMEOUT_MS) {
        // Through to the channel and still no answer: nobody is hosting that
        // code. Never through at all: the channel is the problem.
        this.set({ stage: 'ended', problem: this.snapshot.connection === 'open' ? 'not-found' : 'connection' })
        return
      }
      if (this.snapshot.connection === 'open' && now - this.lastJoinAt >= JOIN_RETRY_MS) {
        this.lastJoinAt = now
        const { name, avatarUrl } = this.player
        this.send({ t: 'join', ...this.envelope(), name, ...(avatarUrl ? { avatarUrl } : {}) })
      }
      return
    }
    if (this.hostId) this.checkPresence()
    this.pruneReactions()
    // Out of time on this device's clock: the choice goes in as it stands.
    const draft = this.snapshot.draft
    if (draft && this.canPick() && this.clock.now() >= draft.deadline) this.lockTopics()
  }

  protected heartbeat(): void {
    if (!this.hostId || this.snapshot.stage === 'ended') return
    this.send({ t: 'ping', ...this.envelope() })
    // The answer, the topics and Ready go again until the host's room shows
    // them: a broadcast has no receipt, and the host ignores a repeat.
    this.sendAnswer()
    this.sendTopics()
    if (this.pendingReady !== null) {
      this.send({ t: 'act', ...this.envelope(), action: { kind: 'ready', round: this.pendingReady } })
    }
  }

  protected receive(raw: unknown): void {
    const message = parseMessage(raw)
    if (!message || message.from === this.clientId) return
    if (this.hostId && message.from !== this.hostId) return
    if ((message.t === 'room' || message.t === 'full') && message.to !== this.clientId) return

    if (message.v !== PROTOCOL_VERSION) {
      if (message.t === 'room' || message.t === 'full') this.set({ stage: 'ended', problem: 'version' })
      return
    }

    // Only the host this device joined may do anything but seat it.
    if (!this.hostId && message.t !== 'room' && message.t !== 'full') return

    switch (message.t) {
      case 'full':
        if (!this.hostId) this.set({ stage: 'ended', problem: 'full' })
        return
      case 'room': {
        if (this.snapshot.stage === 'ended') return
        const unknown = (message.battle && !message.battle.questions.every(q => this.knows(q.id)))
          || (message.draft && !message.draft.drawn.every(d => this.knows(d.id)))
        if (unknown) {
          this.set({ stage: 'ended', problem: 'version' })
          return
        }
        this.hostId = message.from
        this.lastHeardAt = this.clock.now()
        this.onRoom(message)
        return
      }
      case 'react':
        this.lastHeardAt = this.clock.now()
        if (message.seat === 0 && isReaction(message.emoji)) this.showReaction(0, message.emoji)
        return
      case 'ping':
        this.lastHeardAt = this.clock.now()
        return
      case 'bye':
        this.set({ stage: 'ended', problem: 'host-left', opponentPresent: false })
        return
      default:
        return
    }
  }

  private onRoom(message: Extract<BattleMessage, { t: 'room' }>): void {
    const delta = this.clock.now() - message.sentAt
    const battle = message.battle ? shiftClock(message.battle, delta) : null
    let draft = message.draft ? shiftDraftClock(message.draft, delta) : null
    // A new battle in the room starts this player's choice afresh.
    const newGame = !!draft && draft.game !== this.draftGame
    if (draft) this.draftGame = draft.game
    if (this.pendingTopics) {
      const acknowledged = !draft || draft.game !== this.pendingTopics.game || draft.phase !== 'picking' || !!draft.picks[1]
      if (acknowledged) this.pendingTopics = null
      // Still on its way: shown locked in here, as it was when it was sent.
      else if (draft) draft = withPick(draft, 1, this.pendingTopics.topics)
    }
    let pendingAnswer = this.snapshot.pendingAnswer
    if (pendingAnswer && battle) {
      const round = battle.rounds[pendingAnswer.round]
      // In the host's copy now (or too late to be): stop sending it.
      if (!round || round.locks[1] || round.phase === 'revealed') pendingAnswer = null
    }
    if (!battle) pendingAnswer = null
    if (this.pendingReady !== null && battle) {
      const round = battle.rounds[this.pendingReady]
      if (!round || round.ready.includes(1) || battle.rounds.length > this.pendingReady + 1) this.pendingReady = null
    }
    this.set({
      stage: message.stage,
      players: [message.host, message.guest],
      config: message.config,
      battle,
      draft,
      rematch: message.rematch,
      opponentPresent: true,
      pendingAnswer,
      ...(newGame ? { topicChoice: [] } : {}),
    })
  }
}

// ── Seen from the page ──────────────────────────────────────────────────────

/**
 * The phase a round should be *drawn* in at `now`. The host's copy only moves
 * on the host's tick and reaches the other device a moment later, so the page
 * opens a question as soon as its countdown is up here rather than waiting to
 * be told, and holds a question whose time is up until the host reveals it.
 */
export function displayPhase(battle: BattleState, now: number): 'countdown' | 'open' | 'buzzed' | 'closing' | 'revealed' {
  const round = currentRound(battle)
  if (round.phase === 'countdown') return now >= round.opensAt ? 'open' : 'countdown'
  if (round.phase === 'open' && battle.config.rules === 'simultaneous' && now >= round.deadline) return 'closing'
  return round.phase
}

/** The other seat, from this device's. */
export function opponentOf(snapshot: Pick<SessionSnapshot, 'me'>): Seat {
  return otherSeat(snapshot.me)
}

/** A stable id for this tab — kept across a reload, so a player who refreshes gets their seat back. */
export function tabClientId(storage: Pick<Storage, 'getItem' | 'setItem'> | null, random: () => number = Math.random): string {
  const key = 'actuarial_battle_client_v1'
  try {
    const existing = storage?.getItem(key)
    if (existing) return existing
  } catch { /* private mode */ }
  const id = `c${Math.floor(random() * 36 ** 8).toString(36)}${Math.floor(random() * 36 ** 8).toString(36)}`
  try { storage?.setItem(key, id) } catch { /* private mode */ }
  return id
}
