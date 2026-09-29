import { useEffect, useReducer, useState, useSyncExternalStore } from 'react'
import { battleReducer, type BattleEvent, type BattleState } from '@/lib/battle'
import type { GuestSession, HostSession, SessionSnapshot } from '@/lib/battleSession'

/**
 * The time, re-read every `intervalMs` while `active` — what a countdown
 * redraws from. Only the components that draw a clock should call it: a
 * question with KaTeX in it has no business re-rendering ten times a second.
 */
export function useNow(active: boolean, intervalMs = 100): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [active, intervalMs])
  return now
}

type LocalAction = { type: 'reset'; state: BattleState } | BattleEvent

function localReducer(state: BattleState | null, action: LocalAction): BattleState | null {
  if (action.type === 'reset') return action.state
  return state ? battleReducer(state, action) : state
}

/**
 * A battle on one screen: the reducer from lib/battle.ts, with a clock under
 * it that opens and closes questions on time. A tick that changes nothing
 * returns the same state, so it costs no render.
 */
export function useLocalBattle() {
  const [battle, dispatch] = useReducer(localReducer, null)
  const running = !!battle && !battle.finished
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => dispatch({ type: 'tick', now: Date.now() }), 100)
    return () => window.clearInterval(id)
  }, [running])
  return { battle, dispatch }
}

const noSubscribe = () => () => {}
const noSnapshot = () => null

/**
 * An online battle's session, alive while the component is mounted with a
 * `create` to call — and left (the other device told) when it unmounts or
 * `key` changes. A reload doesn't leave: the tab's player keeps their seat
 * (lib/battleSession.ts, `tabClientId`).
 */
export function useBattleSession<T extends HostSession | GuestSession>(
  create: (() => T) | null,
  key: string,
): { session: T | null; snapshot: SessionSnapshot | null } {
  const [session, setSession] = useState<T | null>(null)
  useEffect(() => {
    if (!create) return
    const s = create()
    setSession(s)
    return () => {
      s.leave()
      setSession(null)
    }
    // `create` is a fresh closure every render; `key` is what says it's a new session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  const snapshot = useSyncExternalStore(
    session ? session.subscribe : noSubscribe,
    session ? session.getSnapshot : noSnapshot,
  )
  return { session, snapshot }
}
