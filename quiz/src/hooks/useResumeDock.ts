import { useEffect, useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/stores/quizStore'
import { useBattleQueueStore } from '@/stores/battleQueueStore'
import { isQuizInProgress, showsQuizResume } from '@/lib/quizResume'
import { callsBackToBattle, isQueued, showsBattleQueue } from '@/lib/battleQueue'
import type { LobbySnapshot } from '@/lib/battleMatchmaking'

// What the resume dock (components/ResumeDock.tsx) asks before drawing its
// pills, and the one thing it does while none is showing.

/** Whether the "Return to quiz" pill is drawn on `pathname`. */
export function useQuizResumeVisible(pathname: string): boolean {
  return showsQuizResume(pathname, useQuizStore(isQuizInProgress))
}

const noSubscribe = () => () => {}
const noSnapshot = () => null

/** The held lobby session's snapshot, or null (stores/battleQueueStore.ts). */
export function useBattleQueueSnapshot(): LobbySnapshot | null {
  const session = useBattleQueueStore(s => s.session)
  return useSyncExternalStore(session ? session.subscribe : noSubscribe, session ? session.getSnapshot : noSnapshot)
}

/** Whether the "Return to lobby" pill is drawn: queued, and no lobby screen up. */
export function useBattleQueueVisible(): boolean {
  const queued = isQueued(useBattleQueueSnapshot())
  const lobbies = useBattleQueueStore(s => s.lobbies)
  return showsBattleQueue(queued, lobbies)
}

/**
 * A match found while the player was somewhere else in the app takes them to
 * the battle page they queued from, which picks it up (lib/battleQueue.ts).
 * Mounted once, by the dock, whether or not a pill is showing.
 */
export function useFollowBattleMatch(): void {
  const navigate = useNavigate()
  const pending = useBattleQueueStore(s => !!s.match)
  const pages = useBattleQueueStore(s => s.pages)
  const path = useBattleQueueStore(s => s.path)
  useEffect(() => {
    if (callsBackToBattle(pending, pages)) navigate(path)
  }, [pending, pages, path, navigate])
}
