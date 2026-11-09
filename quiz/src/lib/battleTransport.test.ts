import { beforeEach, describe, expect, it, vi } from 'vitest'

// A Realtime client with the two habits that stranded a matched room
// (lib/battleTransport.ts): `channel(name)` hands back a channel of that name
// still being left, and subscribing to one that isn't closed does nothing.
const fake = vi.hoisted(() => {
  type Callback = (state: string) => void
  class FakeChannel {
    state: 'closed' | 'joined' | 'leaving' = 'closed'
    callbacks: Callback[] = []
    leave: (() => void) | null = null
    constructor(readonly name: string) {}
    on() { return this }
    subscribe(cb: Callback) {
      if (this.state !== 'closed') return this
      this.state = 'joined'
      this.callbacks.push(cb)
      queueMicrotask(() => cb('SUBSCRIBED'))
      return this
    }
    unsubscribe() {
      this.state = 'leaving'
      return new Promise<string>(resolve => {
        this.leave = () => {
          this.state = 'closed'
          client.channels = client.channels.filter(c => c !== this)
          for (const cb of this.callbacks) cb('CLOSED')
          resolve('ok')
        }
      })
    }
    teardown() {}
    send() { return Promise.resolve('ok') }
    track() { return Promise.resolve('ok') }
    untrack() { return Promise.resolve('ok') }
    presenceState() { return {} }
  }
  const client = {
    channels: [] as FakeChannel[],
    removeChannel: vi.fn(),
    channel(name: string) {
      const existing = client.channels.find(c => c.name === name)
      if (existing) return existing
      const made = new FakeChannel(name)
      client.channels.push(made)
      return made
    },
  }
  return { client }
})

vi.mock('./supabase', () => ({ supabase: fake.client }))

import { supabaseLobbyTransport, supabaseTransport } from './battleTransport'

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

function connect(transport: ReturnType<typeof supabaseTransport>) {
  const statuses: string[] = []
  transport.connect({ message: () => {}, status: s => statuses.push(s) })
  return statuses
}

describe('the Realtime transport', () => {
  beforeEach(() => {
    fake.client.channels = []
    fake.client.removeChannel.mockClear()
  })

  it('leaves a channel without disconnecting the socket', async () => {
    const room = supabaseTransport('ABCD')
    connect(room)
    await flush()
    room.close()
    const lobby = supabaseLobbyTransport('me')
    lobby.connect({ presence: () => {}, message: () => {}, status: () => {} })
    await flush()
    lobby.close()
    expect(fake.client.removeChannel).not.toHaveBeenCalled()
    for (const c of [...fake.client.channels]) c.leave?.()
    await flush()
  })

  it('opens a room whose name is still being left once the old channel has gone', async () => {
    const first = supabaseTransport('ABCD')
    connect(first)
    await flush()
    const old = fake.client.channels[0]
    first.close()

    const again = supabaseTransport('ABCD')
    const statuses = connect(again)
    await flush()
    // Still leaving: the new session waits rather than joining a dying channel.
    expect(statuses).toEqual(['connecting'])

    old.leave!()
    await flush()
    await flush()
    expect(statuses).toEqual(['connecting', 'open'])
    expect(fake.client.channels).toHaveLength(1)
    expect(fake.client.channels[0]).not.toBe(old)
  })

  it('hands the lobby over from its watcher to the player', async () => {
    const watcher = supabaseLobbyTransport('watch-1')
    watcher.connect({ presence: () => {}, message: () => {}, status: () => {} })
    await flush()
    const old = fake.client.channels[0]
    watcher.close()

    const statuses: string[] = []
    const player = supabaseLobbyTransport('me')
    player.connect({ presence: () => {}, message: () => {}, status: s => statuses.push(s) })
    old.leave!()
    await flush()
    await flush()
    expect(statuses).toEqual(['connecting', 'open'])
  })

  it('never opens a channel for a session closed while it waited', async () => {
    const first = supabaseTransport('WXYZ')
    connect(first)
    await flush()
    const old = fake.client.channels[0]
    first.close()

    const again = supabaseTransport('WXYZ')
    const statuses = connect(again)
    again.close()
    old.leave!()
    await flush()
    await flush()
    expect(statuses).toEqual(['connecting'])
    expect(fake.client.channels).toHaveLength(0)
  })
})
