import { useEffect, useState, useCallback, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { sanitizeMasteryState } from '@/lib/mastery'
import { readLocalMastery, syncLocalMastery } from '@/lib/localMasteryStore'

export interface UseConceptMasteryResult {
  records: ConceptMasteryRecord[]
  byConcept: Map<string, ConceptMasteryRecord>
  loading: boolean
  refresh: () => void
}

// Fetches every concept_mastery row for the current user. Records are returned
// raw — callers are expected to apply `decayIfStale` at display time so that
// stale Strong concepts surface as Forgotten without needing a server job.
export function useConceptMastery(): UseConceptMasteryResult {
  const { user } = useAuth()
  const userId = user?.id
  // Each hook instance gets its own channel name to avoid the Supabase error
  // "cannot add postgres_changes callbacks after subscribe()" when multiple
  // components hold concurrent subscriptions.
  const channelId = useRef(`concept-mastery-${Math.random().toString(36).slice(2)}`)
  const [records, setRecords] = useState<ConceptMasteryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    if (!userId) {
      setRecords([])
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    supabase
      .from('concept_mastery')
      .select('*')
      .eq('user_id', userId)
      .then(({ data, error }: { data: ConceptMasteryRecord[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          console.error('useConceptMastery: DB fetch failed, falling back to localStorage:', error.message)
          setRecords(readLocalMastery(userId))
        } else {
          const dbRecords = (data ?? []).map(r => ({ ...r, state: sanitizeMasteryState(r.state) }))
          // Keep localStorage in sync with DB so the fallback stays fresh.
          if (dbRecords.length > 0) syncLocalMastery(dbRecords)
          // Supplement DB records with any localStorage entries not yet in the
          // DB (handles the case where mergeLocalMastery ran but the upsert
          // subsequently failed, leaving valid state only in localStorage).
          const localRecords = readLocalMastery(userId)
          const dbKeys = new Set(dbRecords.map(r => `${r.exam_id}::${r.concept_slug}`))
          const localOnly = localRecords.filter(r => !dbKeys.has(`${r.exam_id}::${r.concept_slug}`))
          setRecords([...dbRecords, ...localOnly])
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, version])

  // Supabase realtime — reflects quiz completions from other devices instantly
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`concept_mastery:${userId}:${channelId.current}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'concept_mastery', filter: `user_id=eq.${userId}` },
        () => { refresh() },
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, refresh])

  // Refetch when tab regains focus (handles mobile ↔ desktop, cross-browser)
  useEffect(() => {
    if (!userId) return
    const handleVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', handleVisible)
    return () => document.removeEventListener('visibilitychange', handleVisible)
  }, [userId, refresh])

  const byConcept = new Map<string, ConceptMasteryRecord>()
  for (const r of records) {
    byConcept.set(`${r.exam_id}::${r.concept_slug.toLowerCase()}`, r)
  }

  return { records, byConcept, loading, refresh }
}
