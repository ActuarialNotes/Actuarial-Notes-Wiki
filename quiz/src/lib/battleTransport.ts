// The channel an online battle's two devices talk over (see lib/battleSession.ts
// for what they say).
//
// In production it is a **Supabase Realtime broadcast channel** named after the
// room code: the client the app already has, no table, no migration, nothing
// stored — a broadcast is relayed to the channel's other subscribers and
// forgotten. A signed-out reader can play; the anon key is enough for a public
// broadcast channel.
//
// With `VITE_BATTLE_TRANSPORT=local` it is a **BroadcastChannel** instead:
// the browser's own tab-to-tab channel, which is how two tabs of a dev server
// with no Supabase project — and the e2e suite — play each other.

import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { roomChannel } from './battleRoom'
import type { BattleMessage } from './battleRoom'
import type { BattleTransport, ConnectionStatus } from './battleSession'
import { LOBBY_CHANNEL, type LobbyEntry, type LobbyMessage } from './battleLobby'
import { presenceOverBroadcast, type LobbyTransport, type RawChannel } from './battleMatchmaking'

const EVENT = 'battle'

export function supabaseTransport(code: string): BattleTransport {
  let channel: RealtimeChannel | null = null
  let open = false
  return {
    connect({ message, status }) {
      status('connecting')
      channel = supabase.channel(roomChannel(code), { config: { broadcast: { self: false, ack: false } } })
      channel
        .on('broadcast', { event: EVENT }, ({ payload }) => message(payload))
        .subscribe(state => {
          open = state === 'SUBSCRIBED'
          const mapped: ConnectionStatus =
            state === 'SUBSCRIBED' ? 'open' : state === 'CLOSED' ? 'closed' : 'error'
          status(mapped)
        })
    },
    send(payload: BattleMessage) {
      // Before the channel is joined a send would go by REST instead; the
      // sessions resend everything that matters, so drop it.
      if (!channel || !open) return
      void channel.send({ type: 'broadcast', event: EVENT, payload }).catch(() => { /* resent on the heartbeat */ })
    },
    close() {
      if (channel) void supabase.removeChannel(channel)
      channel = null
      open = false
    },
  }
}

export function localTransport(code: string): BattleTransport {
  return rawLocalChannel(roomChannel(code))
}

/** A BroadcastChannel by name, as a plain channel. */
function rawLocalChannel(name: string): RawChannel {
  let channel: BroadcastChannel | null = null
  return {
    connect({ message, status }) {
      if (typeof BroadcastChannel === 'undefined') {
        status('error')
        return
      }
      channel = new BroadcastChannel(name)
      channel.onmessage = event => message(event.data)
      // Nothing to join: it's open as soon as it exists. Said on the next turn
      // so the session has finished constructing when it hears it.
      queueMicrotask(() => status('open'))
    },
    send(payload: unknown) {
      channel?.postMessage(payload)
    },
    close() {
      channel?.close()
      channel = null
    },
  }
}

/** The transport this build plays over. */
export function battleTransport(code: string): BattleTransport {
  return localBuild() ? localTransport(code) : supabaseTransport(code)
}

function localBuild(): boolean {
  return import.meta.env.VITE_BATTLE_TRANSPORT === 'local'
}

// ── The matchmaking lobby ───────────────────────────────────────────────────

const LOBBY_EVENT = 'lobby'

/**
 * The lobby on Supabase Realtime: one channel, with **presence** — the server
 * keeps the list of who is tracked and sends each device the changes, so a
 * busy lobby costs a join and a leave per player rather than a heartbeat each
 * every second or two. The handshake rides the same channel as broadcasts.
 */
export function supabaseLobbyTransport(presenceKey: string): LobbyTransport {
  let channel: RealtimeChannel | null = null
  let open = false
  let wanted: LobbyEntry | null = null
  return {
    connect({ presence, message, status }) {
      status('connecting')
      const ch = supabase.channel(LOBBY_CHANNEL, {
        config: { broadcast: { self: false, ack: false }, presence: { key: presenceKey } },
      })
      channel = ch
      ch
        .on('presence', { event: 'sync' }, () => {
          presence(Object.values(ch.presenceState()).flat())
        })
        .on('broadcast', { event: LOBBY_EVENT }, ({ payload }) => message(payload))
        .subscribe(state => {
          open = state === 'SUBSCRIBED'
          status(state === 'SUBSCRIBED' ? 'open' : state === 'CLOSED' ? 'closed' : 'error')
          if (open && wanted) void ch.track(wanted).catch(() => { /* re-tracked on the next change */ })
        })
    },
    track(entry) {
      wanted = entry
      if (channel && open) void channel.track(entry).catch(() => {})
    },
    untrack() {
      wanted = null
      if (channel && open) void channel.untrack().catch(() => {})
    },
    send(payload: LobbyMessage) {
      if (!channel || !open) return
      void channel.send({ type: 'broadcast', event: LOBBY_EVENT, payload }).catch(() => {})
    },
    close() {
      if (channel) void supabase.removeChannel(channel)
      channel = null
      open = false
    },
  }
}

/** The lobby this build matches players in. `presenceKey` is this device's id there. */
export function lobbyTransport(presenceKey: string): LobbyTransport {
  return localBuild() ? presenceOverBroadcast(rawLocalChannel(LOBBY_CHANNEL)) : supabaseLobbyTransport(presenceKey)
}
