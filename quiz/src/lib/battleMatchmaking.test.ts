import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ANY_EXAM } from './battleLobby'
import {
  GUEST_WAIT_MS,
  MatchmakingSession,
  OFFER_TIMEOUT_MS,
  PRESENCE_EXPIRY_MS,
  presenceOverBroadcast,
  type RawChannel,
} from './battleMatchmaking'
import { PROTOCOL_VERSION } from './battleRoom'
import type { ConnectionStatus } from './battleSession'

const EXAMS = ['Probability', 'Financial Mathematics', 'Exam MAS-I']

/**
 * An in-memory broadcast channel: every payload reaches every *other* member,
 * as a JSON round trip. `drop` loses messages; `deaf` members hear nothing.
 */
class Hub {
  members = new Set<{ deliver: (raw: unknown) => void; deaf: boolean }>()
  drop: (payload: unknown) => boolean = () => false

  channel(deaf = false): RawChannel & { goDeaf(): void } {
    const members = this.members
    let me: { deliver: (raw: unknown) => void; deaf: boolean } | null = null
    return {
      connect: ({ message, status }: { message: (raw: unknown) => void; status: (s: ConnectionStatus) => void }) => {
        me = { deliver: message, deaf }
        members.add(me)
        status('open')
      },
      send: (payload: unknown) => {
        if (this.drop(payload)) return
        const wire = JSON.stringify(payload)
        for (const other of members) if (other !== me && !other.deaf) other.deliver(JSON.parse(wire))
      },
      close: () => { if (me) members.delete(me) },
      goDeaf: () => { if (me) me.deaf = true },
    }
  }
}

/** A deterministic PRNG (mulberry32), one stream per player. */
function seeded(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

let seed = 1

function join(hub: Hub, id: string, exam: string = ANY_EXAM, deaf = false, ready = true) {
  const channel = hub.channel(deaf)
  const session = new MatchmakingSession({
    transport: presenceOverBroadcast(channel),
    exams: EXAMS,
    player: { id, name: id.toUpperCase() },
    exam,
    ready,
    random: seeded(seed++),
  })
  return Object.assign(session, { channel })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(1_000_000)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('the lobby', () => {
  it('shows an empty lobby as empty, and a newcomer as soon as they arrive', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada', 'Probability')
    vi.advanceTimersByTime(600)
    expect(ada.getSnapshot()).toMatchObject({ status: 'searching', others: [] })
    const bo = join(hub, 'bo', 'Exam MAS-I')
    vi.advanceTimersByTime(600)
    expect(ada.getSnapshot().others.map(e => [e.id, e.exam])).toEqual([['bo', 'Exam MAS-I']])
    expect(bo.getSnapshot().others.map(e => e.id)).toEqual(['ada'])
    // Different exams: they see each other, and wait.
    vi.advanceTimersByTime(5000)
    expect(ada.getSnapshot().status).toBe('searching')
    expect(bo.getSnapshot().status).toBe('searching')
  })

  it('counts the lobby for an observer, who is never in it', () => {
    const hub = new Hub()
    const watcher = new MatchmakingSession({ transport: presenceOverBroadcast(hub.channel()), exams: EXAMS })
    join(hub, 'ada', 'Probability')
    vi.advanceTimersByTime(600)
    expect(watcher.getSnapshot()).toMatchObject({ me: null, status: 'searching' })
    expect(watcher.getSnapshot().others.map(e => e.id)).toEqual(['ada'])
  })

  it('forgets a player who left, and one who went quiet', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada', 'Probability')
    const bo = join(hub, 'bo', 'Exam MAS-I')
    const cy = join(hub, 'cy', 'Financial Mathematics')
    vi.advanceTimersByTime(600)
    expect(ada.getSnapshot().others).toHaveLength(2)
    bo.leave()
    vi.advanceTimersByTime(100)
    expect(ada.getSnapshot().others.map(e => e.id)).toEqual(['cy'])
    cy.channel.goDeaf()
    hub.drop = payload => JSON.stringify(payload).includes('"cy"')
    vi.advanceTimersByTime(PRESENCE_EXPIRY_MS + 2000)
    expect(ada.getSnapshot().others).toEqual([])
  })

  it('keeps a player’s place in the queue when they change exam', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada', 'Probability')
    vi.advanceTimersByTime(1000)
    const since = ada.getSnapshot().me!.since
    ada.setExam('Exam MAS-I')
    expect(ada.getSnapshot().me).toMatchObject({ exam: 'Exam MAS-I', since })
    ada.setExam('Exam 9')
    expect(ada.getSnapshot().me!.exam).toBe('Exam MAS-I')
  })
})

describe('ready', () => {
  it('keeps a player who isn’t ready out of the queue — unseen, and never matched', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada', 'Probability')
    const bo = join(hub, 'bo', 'Probability', false, false)
    const watcher = new MatchmakingSession({ transport: presenceOverBroadcast(hub.channel()), exams: EXAMS })
    vi.advanceTimersByTime(5000)
    expect(bo.getSnapshot()).toMatchObject({ status: 'searching', ready: false, match: null })
    expect(bo.getSnapshot().others.map(e => e.id)).toEqual(['ada'])
    expect(ada.getSnapshot()).toMatchObject({ status: 'searching', others: [] })
    expect(watcher.getSnapshot().others.map(e => e.id)).toEqual(['ada'])
  })

  it('matches a player once they are ready, at the back of the queue', () => {
    const hub = new Hub()
    const bo = join(hub, 'bo', 'Probability', false, false)
    vi.advanceTimersByTime(1000)
    const ada = join(hub, 'ada', 'Probability')
    vi.advanceTimersByTime(1000)
    bo.setReady(true)
    expect(bo.getSnapshot().me!.since).toBeGreaterThan(ada.getSnapshot().me!.since)
    vi.advanceTimersByTime(1000)
    expect(ada.getSnapshot().match).toMatchObject({ role: 'host', opponent: { name: 'BO' } })
    expect(bo.getSnapshot().match).toMatchObject({ role: 'guest', opponent: { name: 'ADA' } })
  })

  it('takes a player out of the queue when they stop being ready', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada', 'Probability')
    const bo = join(hub, 'bo', 'Exam MAS-I')
    vi.advanceTimersByTime(1000)
    expect(ada.getSnapshot().others.map(e => e.id)).toEqual(['bo'])
    bo.setReady(false)
    bo.setExam('Probability')
    vi.advanceTimersByTime(5000)
    expect(ada.getSnapshot()).toMatchObject({ status: 'searching', others: [] })
    expect(bo.getSnapshot()).toMatchObject({ status: 'searching', ready: false, match: null })
    expect(bo.getSnapshot().me!.exam).toBe('Probability')
  })

  it('declines an offer while not ready', () => {
    const hub = new Hub()
    const bo = join(hub, 'bo', 'Probability', false, false)
    const heard: unknown[] = []
    const ada = hub.channel()
    ada.connect({ message: raw => heard.push(raw), status: () => {} })
    vi.advanceTimersByTime(600)
    ada.send({ lobby: 'msg', message: { t: 'offer', v: PROTOCOL_VERSION, from: 'ada', to: 'bo', code: 'ABCD', exam: 'Probability', name: 'ADA' } })
    expect(heard).toContainEqual({ lobby: 'msg', message: expect.objectContaining({ t: 'decline', to: 'ada', code: 'ABCD' }) })
    expect(bo.getSnapshot().match).toBeNull()
  })
})

describe('matching', () => {
  it('matches two compatible players into one room, the earlier one hosting', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada', 'Probability')
    vi.advanceTimersByTime(1000)
    const bo = join(hub, 'bo', ANY_EXAM)
    vi.advanceTimersByTime(1000)
    const a = ada.getSnapshot().match
    const b = bo.getSnapshot().match
    expect(a).toMatchObject({ role: 'host', exam: 'Probability', opponent: { name: 'BO' } })
    expect(b).toMatchObject({ role: 'guest', exam: 'Probability', opponent: { name: 'ADA' } })
    expect(a!.code).toBe(b!.code)
    expect(a!.code).toMatch(/^[A-Z2-9]{4}$/)
  })

  it('takes matched players out of the lobby', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada')
    vi.advanceTimersByTime(1000)
    join(hub, 'bo')
    vi.advanceTimersByTime(1000)
    const cy = join(hub, 'cy', 'Exam MAS-I')
    vi.advanceTimersByTime(1000)
    expect(ada.getSnapshot().status).toBe('matched')
    expect(cy.getSnapshot().others).toEqual([])
    expect(cy.getSnapshot().status).toBe('searching')
  })

  it('pairs a crowd off without anyone in two rooms', () => {
    const hub = new Hub()
    const players = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((id, i) => {
      vi.advanceTimersByTime(i === 0 ? 0 : 7)
      return join(hub, id)
    })
    vi.advanceTimersByTime(8000)
    const matched = players.filter(p => p.getSnapshot().status === 'matched')
    expect(matched).toHaveLength(6)
    const rooms = new Map<string, string[]>()
    for (const p of matched) {
      const { code, role } = p.getSnapshot().match!
      rooms.set(code, [...(rooms.get(code) ?? []), role])
    }
    expect(rooms.size).toBe(3)
    for (const roles of rooms.values()) expect(roles.sort()).toEqual(['guest', 'host'])
  })

  it('passes over a player who never answers, and matches the next', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada')
    vi.advanceTimersByTime(1000)
    // A frozen tab: its entry is in the lobby, but it hears nothing.
    join(hub, 'ghost', ANY_EXAM, true)
    vi.advanceTimersByTime(200)
    const cy = join(hub, 'cy')
    vi.advanceTimersByTime(OFFER_TIMEOUT_MS + GUEST_WAIT_MS + 2000)
    expect(ada.getSnapshot().match).toMatchObject({ role: 'host', opponent: { name: 'CY' } })
    expect(cy.getSnapshot().match).toMatchObject({ role: 'guest', opponent: { name: 'ADA' } })
  })

  it('stays searching when an offer is lost, then matches once it gets through', () => {
    const hub = new Hub()
    let lost = 0
    hub.drop = payload => JSON.stringify(payload).includes('"offer"') && lost++ < 1
    const ada = join(hub, 'ada')
    vi.advanceTimersByTime(1000)
    const bo = join(hub, 'bo')
    vi.advanceTimersByTime(400)
    expect(ada.getSnapshot().status).toBe('searching')
    vi.advanceTimersByTime(OFFER_TIMEOUT_MS + GUEST_WAIT_MS + 20_000)
    expect(ada.getSnapshot().status).toBe('matched')
    expect(bo.getSnapshot().status).toBe('matched')
    expect(ada.getSnapshot().match!.code).toBe(bo.getSnapshot().match!.code)
  })

  it('never matches an observer', () => {
    const hub = new Hub()
    const watcher = new MatchmakingSession({ transport: presenceOverBroadcast(hub.channel()), exams: EXAMS })
    const ada = join(hub, 'ada')
    vi.advanceTimersByTime(5000)
    expect(ada.getSnapshot().status).toBe('searching')
    expect(watcher.getSnapshot().match).toBeNull()
  })

  it('stops for good when the player leaves', () => {
    const hub = new Hub()
    const ada = join(hub, 'ada')
    ada.leave()
    join(hub, 'bo')
    vi.advanceTimersByTime(5000)
    expect(ada.getSnapshot()).toMatchObject({ status: 'closed', match: null })
  })
})
