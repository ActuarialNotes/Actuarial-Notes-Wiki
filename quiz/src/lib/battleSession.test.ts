import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { COUNTDOWN_MS, ONLINE_GRACE_MS, currentRound, type BattleConfig, type BattleQuestionKey } from './battle'
import { PROTOCOL_VERSION, type BattleMessage } from './battleRoom'
import {
  GuestSession,
  HEARTBEAT_MS,
  HostSession,
  JOIN_TIMEOUT_MS,
  PRESENCE_TIMEOUT_MS,
  displayPhase,
  tabClientId,
  type BattleTransport,
  type ConnectionStatus,
  type DraftSource,
} from './battleSession'
import { COIN_MS, DEAL_MS, STRIKE_MS, TOPIC_PICK_MS, type BattleDraft } from './battleDraft'

/**
 * An in-memory broadcast channel: every message reaches every *other*
 * transport on it after `latency` ms, as a JSON round trip — so nothing that
 * wouldn't survive the wire survives here.
 */
class Hub {
  private members = new Set<{ deliver: (raw: unknown) => void }>()
  latency = 0
  log: BattleMessage[] = []
  /** Drop every message for which this returns true. */
  drop: (m: BattleMessage) => boolean = () => false

  transport(): BattleTransport {
    const members = this.members
    const deliverAll = (payload: BattleMessage, from: { deliver: (raw: unknown) => void } | null) => {
      this.log.push(payload)
      if (this.drop(payload)) return
      const wire = JSON.stringify(payload)
      for (const other of members) {
        if (other === from) continue
        if (this.latency > 0) setTimeout(() => other.deliver(JSON.parse(wire)), this.latency)
        else other.deliver(JSON.parse(wire))
      }
    }
    let member: { deliver: (raw: unknown) => void } | null = null
    return {
      connect({ message, status }: { message: (raw: unknown) => void; status: (s: ConnectionStatus) => void }) {
        member = { deliver: message }
        members.add(member)
        status('open')
      },
      send(payload: BattleMessage) {
        deliverAll(payload, member)
      },
      close() {
        if (member) members.delete(member)
      },
    }
  }
}

const CONFIG: BattleConfig = { rules: 'simultaneous', exam: 'Probability', rounds: 3, roundSeconds: 60 }
const QUESTIONS: BattleQuestionKey[] = ['p-1', 'p-2', 'p-3'].map(id => ({ id, answer: 'B', options: ['A', 'B', 'C', 'D'] }))

function host(hub: Hub, clientId = 'host') {
  return new HostSession({ transport: hub.transport(), code: 'ABCD', host: { name: 'Ada' }, config: CONFIG, clientId })
}

function guest(hub: Hub, clientId = 'guest', name = 'Bo') {
  return new GuestSession({ transport: hub.transport(), code: 'ABCD', me: { name }, clientId, knows: () => true })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(1_000_000)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('joining a room', () => {
  it('seats the second player and shows both ends the lobby', () => {
    const hub = new Hub()
    const h = host(hub)
    expect(h.getSnapshot().stage).toBe('waiting')
    const g = guest(hub)
    vi.advanceTimersByTime(250)
    expect(h.getSnapshot()).toMatchObject({ stage: 'lobby', opponentPresent: true })
    expect(h.getSnapshot().players[1]?.name).toBe('Bo')
    expect(g.getSnapshot()).toMatchObject({ stage: 'lobby', config: CONFIG })
    expect(g.getSnapshot().players[0]?.name).toBe('Ada')
  })

  it('turns a third player away while the second is still there', () => {
    const hub = new Hub()
    host(hub)
    guest(hub, 'g1')
    vi.advanceTimersByTime(250)
    const third = guest(hub, 'g2', 'Cy')
    vi.advanceTimersByTime(250)
    expect(third.getSnapshot()).toMatchObject({ stage: 'ended', problem: 'full' })
  })

  it('gives up on a code nobody is hosting', () => {
    const hub = new Hub()
    const g = guest(hub)
    vi.advanceTimersByTime(JOIN_TIMEOUT_MS + 250)
    expect(g.getSnapshot()).toMatchObject({ stage: 'ended', problem: 'not-found' })
  })

  it('calls a room with questions this device does not have a version mismatch', () => {
    const hub = new Hub()
    const h = host(hub)
    const g = new GuestSession({ transport: hub.transport(), code: 'ABCD', me: { name: 'Bo' }, clientId: 'guest', knows: id => id !== 'p-2' })
    vi.advanceTimersByTime(250)
    h.start(QUESTIONS)
    expect(g.getSnapshot()).toMatchObject({ stage: 'ended', problem: 'version' })
  })

  it('ignores a message from another version of the app', () => {
    const hub = new Hub()
    const h = host(hub)
    hub.transport().send({ t: 'join', v: PROTOCOL_VERSION + 1, from: 'x', name: 'Future' } as BattleMessage)
    expect(h.getSnapshot().stage).toBe('waiting')
  })
})

describe('playing a battle', () => {
  function started(latency = 0) {
    const hub = new Hub()
    hub.latency = latency
    const h = host(hub)
    const g = guest(hub)
    vi.advanceTimersByTime(250 + latency * 2)
    h.start(QUESTIONS)
    vi.advanceTimersByTime(latency)
    return { hub, h, g }
  }

  it('starts both ends on the same question', () => {
    const { h, g } = started()
    expect(h.getSnapshot().stage).toBe('playing')
    expect(g.getSnapshot().stage).toBe('playing')
    const hb = h.getSnapshot().battle!
    const gb = g.getSnapshot().battle!
    expect(currentRound(gb).questionId).toBe(currentRound(hb).questionId)
    expect(hb.config.rules).toBe('simultaneous')
  })

  it('hides each player’s locked answer from the other until the reveal', () => {
    const { h, g } = started()
    vi.advanceTimersByTime(COUNTDOWN_MS + 250)
    h.answer('B')
    expect(currentRound(g.getSnapshot().battle!).locks[0]).toEqual({ choice: null, elapsedMs: 0 })
    g.answer('A')
    expect(g.getSnapshot().pendingAnswer).toBeNull()
    const hostView = currentRound(h.getSnapshot().battle!)
    const guestView = currentRound(g.getSnapshot().battle!)
    expect(hostView.phase).toBe('revealed')
    expect(guestView.phase).toBe('revealed')
    expect(guestView.answers.map(a => [a.seat, a.choice, a.correct])).toEqual(
      expect.arrayContaining([[0, 'B', true], [1, 'A', false]]),
    )
    expect(g.getSnapshot().battle!.scores).toEqual(h.getSnapshot().battle!.scores)
  })

  it('times the joining player from when the question reached them', () => {
    const { h, g } = started(300)
    vi.advanceTimersByTime(COUNTDOWN_MS + 5000)
    g.answer('B')
    vi.advanceTimersByTime(300)
    h.answer('B')
    vi.advanceTimersByTime(300)
    const answers = currentRound(h.getSnapshot().battle!).answers
    const guestAnswer = answers.find(a => a.seat === 1)!
    // The question reached the guest 300ms after the host opened it, so their
    // 5.3s on the host's clock is 5.0s on their own.
    expect(guestAnswer.elapsedMs).toBeGreaterThanOrEqual(4900)
    expect(guestAnswer.elapsedMs).toBeLessThanOrEqual(5100)
  })

  it('resends an answer the channel lost', () => {
    const { hub, h, g } = started()
    vi.advanceTimersByTime(COUNTDOWN_MS + 250)
    let dropped = 0
    hub.drop = m => m.t === 'act' && dropped++ === 0
    g.answer('C')
    expect(currentRound(h.getSnapshot().battle!).locks[1]).toBeNull()
    expect(g.getSnapshot().pendingAnswer).toEqual({ round: 0, choice: 'C' })
    vi.advanceTimersByTime(HEARTBEAT_MS)
    // In — though the host's own screen may only know that, not what.
    expect(currentRound(h.getSnapshot().battle!).locks[1]).toEqual({ choice: null, elapsedMs: 0 })
    expect(g.getSnapshot().pendingAnswer).toBeNull()
    h.answer('B')
    expect(currentRound(h.getSnapshot().battle!).answers.find(a => a.seat === 1)?.choice).toBe('C')
  })

  it('moves on when both are ready, and ends after the last question', () => {
    const { h, g } = started()
    for (let i = 0; i < 3; i++) {
      vi.advanceTimersByTime(COUNTDOWN_MS + 250)
      h.answer('B')
      g.answer('B')
      h.ready()
      g.ready()
    }
    expect(h.getSnapshot().stage).toBe('finished')
    expect(g.getSnapshot().stage).toBe('finished')
    expect(g.getSnapshot().battle!.finished).toBe(true)
  })

  it('reveals on the host’s clock when an answer never comes', () => {
    const { h, g } = started()
    vi.advanceTimersByTime(COUNTDOWN_MS + 250)
    h.answer('B')
    vi.advanceTimersByTime(60_000 + 2000)
    expect(currentRound(h.getSnapshot().battle!).phase).toBe('revealed')
    expect(currentRound(g.getSnapshot().battle!).phase).toBe('revealed')
  })

  it('counts a player who leaves mid-battle as forfeiting', () => {
    const { h, g } = started()
    g.leave()
    expect(h.getSnapshot().stage).toBe('finished')
    expect(h.getSnapshot().battle!.forfeit).toBe(1)
  })

  it('tells the joining player when the host leaves', () => {
    const { h, g } = started()
    h.leave()
    expect(g.getSnapshot()).toMatchObject({ stage: 'ended', problem: 'host-left' })
  })

  it('notices a player who has gone quiet', () => {
    const { hub, h } = started()
    hub.drop = m => m.from === 'guest'
    vi.advanceTimersByTime(PRESENCE_TIMEOUT_MS + HEARTBEAT_MS)
    expect(h.getSnapshot().opponentPresent).toBe(false)
    h.endForAbsentGuest()
    expect(h.getSnapshot().battle!.forfeit).toBe(1)
  })

  it('lets a player who reloads take their seat back', () => {
    const { hub, h } = started()
    vi.advanceTimersByTime(COUNTDOWN_MS + 250)
    h.answer('B')
    const again = guest(hub, 'guest')
    vi.advanceTimersByTime(250)
    expect(again.getSnapshot().stage).toBe('playing')
    expect(currentRound(again.getSnapshot().battle!).locks[0]).toEqual({ choice: null, elapsedMs: 0 })
  })

  it('carries a rematch request, and starts one', () => {
    const { h, g } = started()
    h.endForAbsentGuest()
    g.requestRematch()
    expect(h.getSnapshot().rematch).toEqual([false, true])
    h.start(QUESTIONS)
    expect(g.getSnapshot()).toMatchObject({ stage: 'playing', rematch: [false, false] })
  })

  it('shows each other’s reactions', () => {
    const { h, g } = started()
    g.react('🔥')
    expect(h.getSnapshot().reactions.map(r => [r.seat, r.emoji])).toEqual([[1, '🔥']])
    expect(g.getSnapshot().reactions.map(r => [r.seat, r.emoji])).toEqual([[1, '🔥']])
    // One every 600ms at most.
    g.react('👏')
    expect(h.getSnapshot().reactions).toHaveLength(1)
    vi.advanceTimersByTime(3000)
    expect(h.getSnapshot().reactions).toHaveLength(0)
  })
})

describe('the draft', () => {
  // The host's hand is A–D, the guest's E–H. Struck: the host's D and the
  // guest's H. Of the pairs left, A–E and C–G share questions and B–F doesn't,
  // so the deal is C–G (70), then B–F on a coin (60), then the final A–E (80).
  const TOPICS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  const HOST_HAND = ['A', 'B', 'C', 'D']
  const GUEST_HAND = ['E', 'F', 'G', 'H']
  const PAIRS: Record<string, [number, number]> = { 'A|E': [80, 1], 'B|F': [60, 0], 'C|G': [70, 2] }
  const LEVELS: Record<string, number> = { A: 0, B: 3, C: 1, D: 2, E: 1, F: 0, G: 2, H: 3 }
  const BANK: BattleQuestionKey[] = Array.from({ length: 12 }, (_, i) => ({ id: `q-${i}`, answer: 'B', options: ['A', 'B', 'C', 'D'] }))

  /** The bank behind the draft: a pair table, and questions handed out in order, never one in `used`. */
  function source(): DraftSource & { draws: { cards: readonly string[]; on: string; used: string[] }[] } {
    const draws: { cards: readonly string[]; on: string; used: string[] }[] = []
    return {
      draws,
      topics: () => TOPICS,
      pair: () => (a, b) => {
        const hit = PAIRS[`${a}|${b}`] ?? PAIRS[`${b}|${a}`] ?? [10, 0]
        return { strength: hit[0], shared: Array.from({ length: hit[1] }, (_, i) => `${a}${b}${i}`) }
      },
      draw(_config, cards, on, used) {
        draws.push({ cards, on, used: [...used] })
        const key = BANK.find(k => !used.has(k.id))
        return key ? { key, basis: on === 'both' ? 'both' : 'one', topic: on === 'both' ? cards[0] : on } : null
      },
      level: t => LEVELS[t] ?? 0,
    }
  }

  function room(opts: { knows?: (id: string) => boolean; latency?: number; rounds?: number; coin?: number } = {}) {
    const hub = new Hub()
    hub.latency = opts.latency ?? 0
    const topics = source()
    const config = { ...CONFIG, rounds: opts.rounds ?? 3 }
    const h = new HostSession({
      transport: hub.transport(), code: 'ABCD', host: { name: 'Ada' }, config, clientId: 'host', topics,
      random: () => opts.coin ?? 0.1,
    })
    const g = new GuestSession({
      transport: hub.transport(), code: 'ABCD', me: { name: 'Bo' }, clientId: 'guest',
      knows: opts.knows ?? (() => true), level: t => LEVELS[t] ?? 0,
    })
    vi.advanceTimersByTime(250 + hub.latency * 2)
    return { hub, h, g, topics }
  }

  /** Both hands in. */
  function drawn(r: ReturnType<typeof room>) {
    r.h.openDraft()
    r.h.chooseHand(HOST_HAND)
    r.g.chooseHand(GUEST_HAND)
    r.h.lockHand()
    r.g.lockHand()
    vi.advanceTimersByTime(r.hub.latency * 2 + 50)
    return r
  }

  /** …and both strikes. */
  function dealt(r: ReturnType<typeof room>) {
    drawn(r)
    r.h.strike('H')
    r.g.strike('D')
    vi.advanceTimersByTime(r.hub.latency * 2 + 50)
    return r
  }

  const draftOf = (s: { getSnapshot(): { draft: BattleDraft | null } }) => s.getSnapshot().draft!

  it('opens the draw for both players with thirty seconds on the clock — once there are two of them', () => {
    const hub = new Hub()
    const alone = new HostSession({ transport: hub.transport(), code: 'ABCD', host: { name: 'Ada' }, config: CONFIG, clientId: 'host', topics: source() })
    alone.openDraft()
    expect(alone.getSnapshot().stage).toBe('waiting')

    const { h, g } = room()
    h.openDraft()
    const now = Date.now()
    for (const s of [h, g]) {
      expect(s.getSnapshot().stage).toBe('drafting')
      expect(draftOf(s)).toMatchObject({ phase: 'draw', deadline: now + TOPIC_PICK_MS, counts: [0, 0], hands: [null, null], strikes: [null, null], pairs: [] })
    }
  })

  it('shows how many cards the other player has drawn, never which, and hides a locked hand until both are in', () => {
    const { hub, h, g } = room()
    h.openDraft()
    g.chooseHand(['E', 'F'])
    expect(g.getSnapshot().topicChoice).toEqual(['E', 'F'])
    expect(draftOf(h).counts).toEqual([0, 2])
    h.chooseHand(['A'])
    expect(draftOf(g).counts).toEqual([1, 2])
    // Only the count crosses while choosing.
    const moves = hub.log.filter((m): m is Extract<BattleMessage, { t: 'act' }> => m.t === 'act')
    expect(moves.every(m => m.action.kind !== 'hand' || !m.action.topics)).toBe(true)

    g.chooseHand(GUEST_HAND)
    g.lockHand()
    expect(draftOf(h).hands).toEqual([null, []])
    expect(draftOf(g).hands).toEqual([null, GUEST_HAND])
    const rooms = hub.log.filter((m): m is Extract<BattleMessage, { t: 'room' }> => m.t === 'room')
    expect(rooms.at(-1)!.draft!.hands[0]).toBeNull()
  })

  it('lays both hands face up for the strikes, with each player’s level on their own cards', () => {
    const { h, g } = drawn(room())
    for (const s of [h, g]) {
      expect(draftOf(s)).toMatchObject({
        phase: 'strike',
        deadline: Date.now() - 50 + STRIKE_MS,
        hands: [HOST_HAND, GUEST_HAND],
        levels: [[0, 3, 1, 2], [1, 0, 2, 3]],
      })
    }
  })

  it('keeps each strike from the other player until both are in, then deals', () => {
    const { h, g, topics } = drawn(room())
    h.strike('H')
    expect(draftOf(g).strikes).toEqual(['', null])
    expect(draftOf(h).strikes).toEqual(['H', null])
    g.strike('D')
    for (const s of [h, g]) {
      const draft = draftOf(s)
      expect(draft.phase).toBe('deal')
      expect(draft.strikes).toEqual(['H', 'D'])
      expect(draft.rows).toEqual(['A', 'B', 'C'])
      expect(draft.cols).toEqual(['E', 'F', 'G'])
      expect(draft.grid).toEqual([[80, 10, 10], [10, 60, 10], [10, 10, 70]])
      expect(draft.pairs.map(p => p.cards)).toEqual([['C', 'G'], ['B', 'F'], ['A', 'E']])
      expect(draft.rounds.map(r => [r.pair, r.paired, r.coin])).toEqual([[0, true, null], [1, false, null], [2, true, null]])
    }
    // The paired rounds' questions are drawn now; the coin round's waits for its coin.
    expect(topics.draws.filter(d => d.on === 'both').map(d => d.cards)).toEqual([['C', 'G'], ['A', 'E']])
  })

  it('shows the deal, then starts the battle', () => {
    const { h, g } = dealt(room())
    vi.advanceTimersByTime(DEAL_MS - 400)
    expect(g.getSnapshot().stage).toBe('drafting')
    vi.advanceTimersByTime(600)
    for (const s of [h, g]) {
      expect(s.getSnapshot().stage).toBe('playing')
      expect(currentRound(s.getSnapshot().battle!).phase).toBe('countdown')
      expect(draftOf(s).phase).toBe('deal')
    }
  })

  it('tosses a coin round’s coin when it comes up, and both screens see the same toss', () => {
    const { h, g, topics } = dealt(room())
    vi.advanceTimersByTime(DEAL_MS + 250 + COUNTDOWN_MS)
    const before = h.getSnapshot().battle!.questions.map(q => q.id)
    h.answer('B')
    g.answer('A')
    vi.advanceTimersByTime(ONLINE_GRACE_MS + 250)
    expect(draftOf(g).rounds[1].coin).toBeNull()
    h.ready()
    g.ready()
    vi.advanceTimersByTime(50)
    const coinAt = Date.now() - 50
    for (const s of [h, g]) {
      const round = draftOf(s).rounds[1]
      // The host's coin (0.1) lands on seat 0's card, B.
      expect(round).toMatchObject({ coin: 0, basis: 'one', topic: 'B' })
      const live = currentRound(s.getSnapshot().battle!)
      expect(live.index).toBe(1)
      expect(live.opensAt).toBe(coinAt + COUNTDOWN_MS + COIN_MS)
      expect(s.getSnapshot().battle!.questions[1].id).toBe(live.questionId)
    }
    // Drawn on B, and never a question already played or held by a paired round.
    const coinDraw = topics.draws.at(-1)!
    expect(coinDraw).toMatchObject({ cards: ['B', 'F'], on: 'B' })
    expect(coinDraw.used).toEqual(expect.arrayContaining([before[0], before[2]]))
    const ids = h.getSnapshot().battle!.questions.map(q => q.id)
    expect(new Set(ids).size).toBe(3)
  })

  it('tops up a short hand at random when the draw runs out', () => {
    const { h, g } = room()
    h.openDraft()
    h.chooseHand(['A'])
    g.chooseHand(['E', 'F'])
    vi.advanceTimersByTime(TOPIC_PICK_MS + 250)
    for (const s of [h, g]) {
      const draft = draftOf(s)
      expect(draft.phase).toBe('strike')
      expect(draft.hands[0]).toHaveLength(4)
      expect(draft.hands[0]![0]).toBe('A')
      expect(draft.hands[1]!.slice(0, 2)).toEqual(['E', 'F'])
      expect(draft.hands[1]).toHaveLength(4)
    }
  })

  it('gives a hand locked in at the last moment the grace an answer gets to arrive', () => {
    const { h, g } = room({ latency: 400 })
    h.openDraft()
    h.chooseHand(HOST_HAND)
    h.lockHand()
    vi.advanceTimersByTime(400)
    g.chooseHand(GUEST_HAND)
    vi.advanceTimersByTime(TOPIC_PICK_MS - 400)
    expect(draftOf(h).hands[1]).toBeNull()
    vi.advanceTimersByTime(ONLINE_GRACE_MS + 400)
    expect(draftOf(h).hands[1]).toEqual(GUEST_HAND)
  })

  it('deals a hand to a player who never sent one, and strikes for one who never struck', () => {
    const { hub, h } = room()
    h.openDraft()
    hub.drop = m => m.from === 'guest'
    h.chooseHand(HOST_HAND)
    h.lockHand()
    vi.advanceTimersByTime(TOPIC_PICK_MS + ONLINE_GRACE_MS + 250)
    expect(draftOf(h).phase).toBe('strike')
    expect(draftOf(h).hands[1]).toHaveLength(4)
    h.strike(draftOf(h).hands[1]![0])
    vi.advanceTimersByTime(STRIKE_MS + ONLINE_GRACE_MS + 250)
    // O3: the guest's missed strike takes the host's highest-levelled card, B (L3).
    expect(draftOf(h)).toMatchObject({ phase: 'deal', rows: ['A', 'C', 'D'] })
    expect(draftOf(h).strikes[1]).toBe('B')
  })

  it('holds the joining player’s hand to the exam’s topics, and a strike to the other’s hand', () => {
    const { h, g } = room()
    h.openDraft()
    g.chooseHand(['Nope', 'e', 'F', 'G', 'H'])
    g.lockHand()
    h.chooseHand(HOST_HAND)
    h.lockHand()
    // Cleaned to E, F, G, then topped up to four.
    expect(draftOf(h).hands[1]!.slice(0, 3)).toEqual(['E', 'F', 'G'])
    expect(draftOf(h).hands[1]).toHaveLength(4)
    g.strike('Z')
    h.strike('Nope')
    expect(draftOf(h).strikes).toEqual([null, null])
  })

  it('resends a hand and a strike the channel lost', () => {
    const { hub, h, g } = room()
    h.openDraft()
    h.chooseHand(HOST_HAND)
    h.lockHand()
    let dropped = 0
    hub.drop = m => m.t === 'act' && dropped++ === 0
    g.chooseHand(GUEST_HAND)
    hub.drop = m => m.t === 'act' && (m.action.kind === 'hand' && !!m.action.topics) && dropped++ < 2
    g.lockHand()
    expect(draftOf(h).phase).toBe('draw')
    // Shown locked in here all the same, and not given up on.
    expect(draftOf(g).hands[1]).toEqual(GUEST_HAND)
    vi.advanceTimersByTime(HEARTBEAT_MS)
    expect(draftOf(h).phase).toBe('strike')

    let strikes = 0
    hub.drop = m => m.t === 'act' && m.action.kind === 'strike' && strikes++ === 0
    g.strike('A')
    expect(draftOf(h).strikes[1]).toBeNull()
    expect(draftOf(g).strikes[1]).toBe('A')
    vi.advanceTimersByTime(HEARTBEAT_MS)
    // In now — the host's screen knows that much, and no more.
    expect(draftOf(h).strikes[1]).toBe('')
  })

  it('ignores a hand or a strike meant for an earlier battle in the room', () => {
    const { hub, h } = room()
    h.openDraft()
    hub.transport().send({ t: 'act', v: PROTOCOL_VERSION, from: 'guest', action: { kind: 'hand', game: 99, count: 4, topics: GUEST_HAND } })
    hub.transport().send({ t: 'act', v: PROTOCOL_VERSION, from: 'guest', action: { kind: 'strike', game: 99, topic: 'A' } })
    expect(draftOf(h).hands[1]).toBeNull()
    expect(draftOf(h).counts[1]).toBe(0)
  })

  it('goes round the pairs again in a longer room, each time with a new question, ending on the final', () => {
    const { h, topics } = dealt(room({ rounds: 5 }))
    expect(draftOf(h).rounds.map(r => r.pair)).toEqual([1, 2, 0, 1, 2])
    const paired = topics.draws.filter(d => d.on === 'both')
    expect(paired).toHaveLength(3)
    expect(new Set(paired.map((_, i) => BANK[i].id)).size).toBe(3)
  })

  it('opens a fresh draw for a rematch, the last hand cleared', () => {
    const { h, g } = dealt(room())
    vi.advanceTimersByTime(DEAL_MS + 250)
    h.endForAbsentGuest()
    expect(g.getSnapshot().stage).toBe('finished')
    g.requestRematch()
    h.openDraft()
    for (const s of [h, g]) {
      expect(s.getSnapshot()).toMatchObject({ stage: 'drafting', rematch: [false, false], topicChoice: [], battle: null })
      expect(draftOf(s)).toMatchObject({ game: 2, phase: 'draw', hands: [null, null] })
    }
  })

  it('calls a battle on questions this device doesn’t have a version mismatch', () => {
    const r = room({ knows: id => id !== 'q-0' })
    dealt(r)
    vi.advanceTimersByTime(DEAL_MS + 250)
    expect(r.g.getSnapshot()).toMatchObject({ stage: 'ended', problem: 'version' })
  })

  it('goes back to waiting when the joining player leaves before the battle', () => {
    const { h, g } = room()
    h.openDraft()
    g.leave()
    expect(h.getSnapshot()).toMatchObject({ stage: 'waiting', draft: null, players: [{ name: 'Ada' }, null] })
  })
})

describe('displayPhase', () => {
  it('opens a question when its countdown is up here, and holds one whose time is up for the reveal', () => {
    const hub = new Hub()
    const h = host(hub)
    guest(hub)
    vi.advanceTimersByTime(250)
    h.start(QUESTIONS)
    const battle = h.getSnapshot().battle!
    const round = currentRound(battle)
    expect(displayPhase(battle, round.opensAt - 1)).toBe('countdown')
    expect(displayPhase(battle, round.opensAt)).toBe('open')
  })
})

describe('tabClientId', () => {
  it('keeps one id per tab', () => {
    const store = new Map<string, string>()
    const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v) } }
    const id = tabClientId(storage)
    expect(tabClientId(storage)).toBe(id)
    expect(tabClientId(null)).not.toBe(id)
  })
})
