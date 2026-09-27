import { useEffect } from 'react'
import { create } from 'zustand'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { deleteAttemptFiles, listFiles } from '@/lib/project/fileStore'
import {
  fetchRemoteAttempts,
  flushProjectSync,
  isSyncedPath,
  planAttemptSync,
  queueAttemptPush,
  queueFilePush,
  READ_ONLY_MARKER,
} from '@/lib/project/projectSync'

/**
 * Keeps the Projects tab's attempts in step with the signed-in account
 * (`docs/pcpa-project.md`, "Where an attempt is kept"). Mounted by the tab
 * itself (`pages/Project/index.tsx`) rather than at the app root: nothing
 * outside the tab reads an attempt, and the tab is its own lazy chunk.
 *
 * On arrival and whenever the tab comes back into view it folds the account's
 * attempts into this browser's (`planAttemptSync`) — taking in the ones made or
 * changed on another device, dropping the ones deleted there, and taking any
 * started here signed out into the account, files and all. Queued writes are
 * sent when the tab is hidden or closed, and on sign-out.
 *
 * Returns whether this browser has heard from the account yet — so a link
 * straight to an attempt made on another device waits for it rather than
 * turning the reader away.
 */

const useSyncStatus = create<{ settledFor: string | null }>(() => ({ settledFor: null }))

let inFlight: { userId: string; promise: Promise<void> } | null = null

/** Put an attempt's files — made signed out, just taken into the account — in the queue. */
async function queueLocalFiles(attemptId: string) {
  const stored = await listFiles(attemptId)
  const marker = stored.find(f => f.path === READ_ONLY_MARKER)
  const readOnly = new Set((marker?.text ?? '').split('\n').filter(Boolean))
  for (const f of stored) {
    if (!isSyncedPath(f.path)) continue
    queueFilePush(attemptId, { path: f.path, text: f.text, bytes: f.bytes, size: f.size, updatedAt: f.updatedAt, readOnly: readOnly.has(f.path) })
  }
}

async function pullAttempts(userId: string): Promise<void> {
  try {
    const remote = await fetchRemoteAttempts(userId)
    // Read failed: this browser's attempts stand as they are.
    if (!remote) return
    // Planned against the store as it is now, after the fetch, so a change
    // made while the request was out is merged rather than overwritten.
    const store = usePcpaAttempts.getState()
    const plan = planAttemptSync(store.attempts, remote, userId)
    if (plan.changed) store.hydrate(plan.attempts)
    for (const a of plan.push) queueAttemptPush(a)
    for (const id of plan.removed) void deleteAttemptFiles(id)
    for (const id of plan.adopted) void queueLocalFiles(id)
  } finally {
    useSyncStatus.setState({ settledFor: userId })
  }
}

function pull(userId: string): Promise<void> {
  if (inFlight?.userId === userId) return inFlight.promise
  const promise = pullAttempts(userId).finally(() => { if (inFlight?.promise === promise) inFlight = null })
  inFlight = { userId, promise }
  return promise
}

export function useProjectSync(userId: string | null): boolean {
  const settledFor = useSyncStatus(s => s.settledFor)

  useEffect(() => {
    if (!userId) return
    void pull(userId)
    // Signing out, or leaving the tab: send what's queued while the session
    // that queued it is still the one signed in.
    return () => { void flushProjectSync() }
  }, [userId])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (userId) void pull(userId)
      } else {
        void flushProjectSync()
      }
    }
    const onPageHide = () => { void flushProjectSync() }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [userId])

  return userId === null || settledFor === userId
}
