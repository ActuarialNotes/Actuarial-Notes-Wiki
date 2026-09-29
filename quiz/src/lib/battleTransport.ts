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
  let channel: BroadcastChannel | null = null
  return {
    connect({ message, status }) {
      if (typeof BroadcastChannel === 'undefined') {
        status('error')
        return
      }
      channel = new BroadcastChannel(roomChannel(code))
      channel.onmessage = event => message(event.data)
      // Nothing to join: it's open as soon as it exists. Said on the next turn
      // so the session has finished constructing when it hears it.
      queueMicrotask(() => status('open'))
    },
    send(payload: BattleMessage) {
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
  return import.meta.env.VITE_BATTLE_TRANSPORT === 'local' ? localTransport(code) : supabaseTransport(code)
}
