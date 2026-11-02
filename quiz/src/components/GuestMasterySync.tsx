import { useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { mergeLocalMastery } from '@/lib/localMasteryStore'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { clearGuestMastery, mergeGuestIntoAccount, readGuestMastery } from '@/lib/guestMastery'

// Carries the mastery a reader earned signed out onto the account they sign up
// for or sign in to (lib/guestMastery.ts). Mounted once at the app root inside
// AuthProvider; renders nothing. The guest store is cleared only once the
// account holds it, so a failed write is retried on the next sign-in or load.
export default function GuestMasterySync(): null {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const running = useRef(false)

  useEffect(() => {
    if (!userId || running.current) return
    const guest = readGuestMastery()
    if (guest.length === 0) return
    running.current = true
    void (async () => {
      try {
        const { data, error } = await supabase
          .from('concept_mastery')
          .select('*')
          .eq('user_id', userId)
          .in('exam_id', [...new Set(guest.map(r => r.exam_id))])
        if (error) {
          console.error('GuestMasterySync: reading the account failed:', error.message)
          return
        }
        const now = new Date()
        const rows = mergeGuestIntoAccount(guest, (data ?? []) as ConceptMasteryRecord[], userId, now)
          .map(r => ({ ...r, updated_at: now.toISOString() }))
        if (rows.length > 0) {
          const { error: upsertError } = await supabase
            .from('concept_mastery')
            .upsert(rows, { onConflict: 'user_id,exam_id,concept_slug' })
          if (upsertError) {
            console.error('GuestMasterySync: writing the account failed:', upsertError.message)
            return
          }
          mergeLocalMastery(rows)
        }
        clearGuestMastery()
      } finally {
        running.current = false
      }
    })()
  }, [userId])

  return null
}
