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
  type TopicSource,
} from './battleSession'
import { TOPIC_PICK_MS, drawDurationMs } from './battleTopics'

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

describe('the topic pick and the draw', () => {
  const TOPICS = ['Alpha', 'Beta', 'Gamma', 'Delta']

  /** A bank with the three questions, each drawn "for" the first topic either player picked. */
  function source(): TopicSource & { calls: [string[], string[]][] } {
    const calls: [string[], string[]][] = []
    return {
      calls,
      topics: () => TOPICS,
      draw(config, picks) {
        calls.push(picks)
        const topic = picks[0][0] ?? picks[1][0] ?? null
        return QUESTIONS.slice(0, config.rounds).map(key => ({ key, topic }))
      },
    }
  }

  function room(opts: { knows?: (id: string) => boolean; latency?: number } = {}) {
    const hub = new Hub()
    hub.latency = opts.latency ?? 0
    const topics = source()
    const h = new HostSession({ transport: hub.transport(), code: 'ABCD', host: { name: 'Ada' }, config: CONFIG, clientId: 'host', topics })
    const g = new GuestSession({ transport: hub.transport(), code: 'ABCD', me: { name: 'Bo' }, clientId: 'guest', knows: opts.knows ?? (() => true) })
    vi.advanceTimersByTime(250 + hub.latency * 2)
    return { hub, h, g, topics }
  }

  it('opens for both players with thirty seconds on the clock — once there are two of them', () => {
    const hub = new Hub()
    const alone = new HostSession({ transport: hub.transport(), code: 'ABCD', host: { name: 'Ada' }, config: CONFIG, clientId: 'host', topics: source() })
    alone.openTopics()
    expect(alone.getSnapshot().stage).toBe('waiting')

    const { h, g } = room()
    h.openTopics()
    const now = Date.now()
    for (const s of [h, g]) {
      expect(s.getSnapshot().stage).toBe('picking')
      expect(s.getSnapshot().draft).toMatchObject({ phase: 'picking', deadline: now + TOPIC_PICK_MS, picks: [null, null], drawn: [] })
    }
  })

  it('keeps each pick from the other player until both are in, then draws from both', () => {
    const { hub, h, g, topics } = room()
    h.openTopics()
    g.chooseTopics(['Beta'])
    expect(g.getSnapshot().topicChoice).toEqual(['Beta'])
    g.lockTopics()
    // In — and the host's screen knows that much, and no more.
    expect(h.getSnapshot().draft!.picks).toEqual([null, []])
    expect(g.getSnapshot().draft!.picks).toEqual([null, ['Beta']])

    h.chooseTopics(['Alpha', 'Gamma'])
    expect(h.getSnapshot().topicChoice).toEqual(['Alpha', 'Gamma'])
    // A choice is only this screen's until it is locked in: nothing on the wire says it.
    const rooms = hub.log.filter((m): m is Extract<BattleMessage, { t: 'room' }> => m.t === 'room')
    expect(rooms.at(-1)!.draft!.picks).toEqual([null, ['Beta']])

    h.lockTopics()
    expect(topics.calls).toEqual([[['Alpha', 'Gamma'], ['Beta']]])
    for (const s of [h, g]) {
      expect(s.getSnapshot().stage).toBe('drawing')
      expect(s.getSnapshot().draft).toMatchObject({
        phase: 'drawing',
        picks: [['Alpha', 'Gamma'], ['Beta']],
        drawn: QUESTIONS.map(q => ({ id: q.id, topic: 'Alpha' })),
      })
    }
  })

  it('shows the draw, then starts the battle on the questions drawn, their topics kept', () => {
    const { h, g } = room()
    h.openTopics()
    h.lockTopics()
    g.lockTopics()
    expect(h.getSnapshot().stage).toBe('drawing')
    vi.advanceTimersByTime(drawDurationMs(QUESTIONS.length) - 300)
    expect(g.getSnapshot().stage).toBe('drawing')
    vi.advanceTimersByTime(600)
    for (const s of [h, g]) {
      expect(s.getSnapshot().stage).toBe('playing')
      expect(s.getSnapshot().battle!.questions.map(q => q.id)).toEqual(QUESTIONS.map(q => q.id))
      expect(currentRound(s.getSnapshot().battle!).phase).toBe('countdown')
      expect(s.getSnapshot().draft?.drawn).toHaveLength(QUESTIONS.length)
    }
  })

  it('locks in what each player had chosen when the time runs out', () => {
    const { h, g, topics } = room()
    h.openTopics()
    h.chooseTopics(['Delta'])
    g.chooseTopics(['Beta', 'Gamma'])
    vi.advanceTimersByTime(TOPIC_PICK_MS + 250)
    expect(topics.calls).toEqual([[['Delta'], ['Beta', 'Gamma']]])
    expect(g.getSnapshot().stage).toBe('drawing')
  })

  it('gives a pick locked in at the last moment the grace an answer gets to arrive', () => {
    // The pick opened 400ms later on the joining player's screen, and their
    // pick takes 400ms to come back.
    const { h, g, topics } = room({ latency: 400 })
    h.openTopics()
    vi.advanceTimersByTime(400)
    g.chooseTopics(['Beta'])
    vi.advanceTimersByTime(TOPIC_PICK_MS - 400)
    expect(h.getSnapshot().draft!.picks[1]).toBeNull()
    expect(h.getSnapshot().stage).toBe('picking')
    vi.advanceTimersByTime(ONLINE_GRACE_MS + 400)
    expect(topics.calls).toEqual([[[], ['Beta']]])
  })

  it('draws on a player who never picked as having picked nothing', () => {
    const { hub, h, topics } = room()
    h.openTopics()
    hub.drop = m => m.from === 'guest'
    h.chooseTopics(['Alpha'])
    h.lockTopics()
    vi.advanceTimersByTime(TOPIC_PICK_MS + ONLINE_GRACE_MS + 250)
    expect(topics.calls).toEqual([[['Alpha'], []]])
    expect(h.getSnapshot().stage).toBe('drawing')
  })

  it('holds the joining player’s pick to the exam’s topics, three at most', () => {
    const { h, g, topics } = room()
    h.openTopics()
    g.chooseTopics(['Nope', 'beta', 'Gamma', 'Alpha', 'Delta'])
    g.lockTopics()
    h.lockTopics()
    expect(topics.calls[0][1]).toEqual(['Beta', 'Gamma'])
    expect(g.getSnapshot().draft!.picks[1]).toEqual(['Beta', 'Gamma'])
  })

  it('resends a pick the channel lost', () => {
    const { hub, h, g } = room()
    h.openTopics()
    let dropped = 0
    hub.drop = m => m.t === 'act' && dropped++ === 0
    g.chooseTopics(['Beta'])
    g.lockTopics()
    expect(h.getSnapshot().draft!.picks[1]).toBeNull()
    // Shown locked in here all the same, and not given up on.
    expect(g.getSnapshot().draft!.picks[1]).toEqual(['Beta'])
    vi.advanceTimersByTime(HEARTBEAT_MS)
    expect(h.getSnapshot().draft!.picks[1]).toEqual([])
    expect(g.getSnapshot().draft!.picks[1]).toEqual(['Beta'])
  })

  it('ignores a pick meant for an earlier battle in the room', () => {
    const { hub, h } = room()
    h.openTopics()
    hub.transport().send({ t: 'act', v: PROTOCOL_VERSION, from: 'guest', action: { kind: 'topics', game: 99, topics: ['Beta'] } })
    expect(h.getSnapshot().draft!.picks[1]).toBeNull()
  })

  it('opens a fresh pick for a rematch, the last choice cleared', () => {
    const { h, g } = room()
    h.openTopics()
    g.chooseTopics(['Beta'])
    g.lockTopics()
    h.lockTopics()
    vi.advanceTimersByTime(drawDurationMs(QUESTIONS.length) + 250)
    h.endForAbsentGuest()
    expect(g.getSnapshot().stage).toBe('finished')
    g.requestRematch()
    h.openTopics()
    for (const s of [h, g]) {
      expect(s.getSnapshot()).toMatchObject({ stage: 'picking', rematch: [false, false], topicChoice: [], battle: null })
      expect(s.getSnapshot().draft).toMatchObject({ game: 2, picks: [null, null] })
    }
  })

  it('calls a draw of questions this device doesn’t have a version mismatch', () => {
    const { h, g } = room({ knows: id => id !== 'p-2' })
    h.openTopics()
    h.lockTopics()
    g.lockTopics()
    expect(g.getSnapshot()).toMatchObject({ stage: 'ended', problem: 'version' })
  })

  it('goes back to waiting when the joining player leaves before the battle', () => {
    const { h, g } = room()
    h.openTopics()
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
