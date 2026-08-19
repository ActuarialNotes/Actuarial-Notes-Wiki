import { useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useFlashcards } from '@/hooks/useFlashcards'
import {
  fetchRemoteFlashcards,
  flushFlashcardWrites,
  hasPendingWrites,
  hydrateMode,
  mergeCollected,
  mergeDeck,
  queueSnapshotSync,
  setSyncUser,
  snapshotsEqual,
  writeGeneration,
  writeSyncedUser,
  type FlashcardSnapshot,
} from '@/lib/flashcardSync'

// Keeps the two flashcard stores (collected cards + the deck) in step with
// the server for signed-in users. Mounted once at the app root; renders nothing.
//
// The stores stay synchronous and localStorage-backed — this hook only tells the
// sync layer who the user is, pulls the server state in on sign-in, and pushes
// the merged result back. Guests are untouched: setSyncUser(null) makes every
// queued write a no-op, so nothing changes for signed-out use.

/** Read the current client state out of both stores as one snapshot. */
function localSnapshot(): FlashcardSnapshot {
  const { cards, customOrder } = useFlashcards.getState()
  return {
    collected: useCollectedCards.getState().cards,
    cards,
    order: customOrder,
  }
}

/** Write a snapshot into both stores (and through to localStorage). */
function applySnapshot(snapshot: FlashcardSnapshot): void {
  useCollectedCards.getState().hydrate(snapshot.collected)
  useFlashcards.getState().hydrate({
    cards: snapshot.cards,
    customOrder: snapshot.order,
  })
}

export function useFlashcardSync(): void {
  const { user } = useAuth()
  const userId = user?.id ?? null
  // Per-mount channel suffix so a second mount can't collide on the channel name.
  const channelId = useRef(`flashcards-${Math.random().toString(36).slice(2)}`)

  const pull = useCallback(async (id: string) => {
    const mode = hydrateMode()
    const before = writeGeneration()
    const remote = await fetchRemoteFlashcards(id)
    // Read failed (offline, or the migration isn't applied): keep local as-is.
    if (!remote) return

    if (mode === 'replace') {
      // The server is the source of truth for this device — but not over a
      // change the learner made while this request was in flight, or one still
      // queued. Skip; the next refresh picks the server state up. (The union
      // path below needs no such guard: it re-reads local state after the fetch
      // and merges it, so a concurrent change can't be lost.)
      if (hasPendingWrites() || writeGeneration() !== before) return
      applySnapshot(remote)
      writeSyncedUser(id)
      return
    }

    // First sync on this device: fold in whatever was collected as a guest.
    const local = localSnapshot()
    const deck = mergeDeck(
      { cards: local.cards, order: local.order },
      { cards: remote.cards, order: remote.order },
    )
    const merged: FlashcardSnapshot = {
      collected: mergeCollected(local.collected, remote.collected),
      cards: deck.cards,
      order: deck.order,
    }
    applySnapshot(merged)
    if (!snapshotsEqual(merged, remote)) queueSnapshotSync(merged)
    writeSyncedUser(id)
  }, [])

  // Identify the user to the sync layer and pull their state in.
  useEffect(() => {
    setSyncUser(userId)
    if (!userId) return
    void pull(userId)
    return () => {
      // Signing out (or switching users) — get anything queued to the server
      // before the sync user changes. Queued writes captured their own user id,
      // so this always lands on the right account.
      void flushFlashcardWrites()
    }
  }, [userId, pull])

  // Cross-device updates: a card collected on the phone shows up here.
  useEffect(() => {
    if (!userId) return
    const refresh = () => { void pull(userId) }
    const channel = supabase
      .channel(`user_flashcards:${userId}:${channelId.current}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'user_collected_cards', filter: `user_id=eq.${userId}` },
        refresh)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'user_flashcards', filter: `user_id=eq.${userId}` },
        refresh)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, pull])

  // Refetch when the tab regains focus (realtime may have been asleep), and
  // flush pending writes when it goes away so a debounced change isn't lost if
  // the tab is closed within the debounce window.
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (userId) void pull(userId)
      } else {
        void flushFlashcardWrites()
      }
    }
    const onPageHide = () => { void flushFlashcardWrites() }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [userId, pull])
}
