import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { COUNTDOWN_MS, currentRound, type BattleConfig, type BattleQuestionKey } from './battle'
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
} from './battleSession'

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
