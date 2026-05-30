import { useEffect, useState, useCallback, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { sanitizeMasteryState, decayIfStale } from '@/lib/mastery'
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

    const uid = userId
    async function fetchRecords() {
      const { data, error } = await supabase
        .from('concept_mastery')
        .select('*')
        .eq('user_id', uid)

      if (cancelled) return
      if (error) {
        console.error('useConceptMastery: DB fetch failed, falling back to localStorage:', error.message)
        setRecords(readLocalMastery(uid))
        setLoading(false)
        return
      }

      const dbRecords = (data ?? []).map((r: ConceptMasteryRecord) => ({ ...r, state: sanitizeMasteryState(r.state) }))
      // Keep localStorage in sync with DB so the fallback stays fresh.
      if (dbRecords.length > 0) syncLocalMastery(dbRecords)
      // Supplement DB records with any localStorage entries not yet in the
      // DB (handles the case where mergeLocalMastery ran but the upsert
      // subsequently failed, leaving valid state only in localStorage).
      const localRecords = readLocalMastery(uid)
      const dbKeys = new Set(dbRecords.map((r: ConceptMasteryRecord) => `${r.exam_id}::${r.concept_slug}`))
      const localOnly = localRecords.filter(r => !dbKeys.has(`${r.exam_id}::${r.concept_slug}`))
      let allRecords = [...dbRecords, ...localOnly]

      // For any record still showing 'new', check daily_completions to see if a
      // level-up was recorded there (can happen when the concept_mastery upsert
      // fails but the daily_completions write succeeds). Mirror the same fallback
      // logic used by useConceptLearningHistory so the concept list and the
      // Learning Progress modal stay in agreement.
      const newSlugs = allRecords
        .filter(r => r.state === 'new')
        .map(r => r.concept_slug)
      if (newSlugs.length > 0) {
        const { data: completions } = await supabase
          .from('daily_completions')
          .select('concept_slug, to_state, at')
          .eq('user_id', uid)
          .in('concept_slug', newSlugs)
          .order('at', { ascending: false })

        if (!cancelled && completions && completions.length > 0) {
          // Keep only the most-recent row per concept_slug.
          const latestBySlug = new Map<string, { to_state: string; at: string }>()
          for (const row of completions as Array<{ concept_slug: string; to_state: string; at: string }>) {
            if (!latestBySlug.has(row.concept_slug.toLowerCase())) {
              latestBySlug.set(row.concept_slug.toLowerCase(), { to_state: row.to_state, at: row.at })
            }
          }

          const now = new Date()
          allRecords = allRecords.map(r => {
            if (r.state !== 'new') return r
            const latest = latestBySlug.get(r.concept_slug.toLowerCase())
            if (!latest) return r
            const latestState = sanitizeMasteryState(latest.to_state)
            if (latestState === 'new' || latestState === 'forgotten') return r
            // Apply decay so a stale level-up doesn't hold the concept at level1
            // forever — e.g. if the last correct attempt was 14+ days ago it
            // should surface as Forgotten, not Level 1.
            const tempRecord: ConceptMasteryRecord = {
              ...r,
              state: latestState,
              last_correct_at: latest.at,
              last_attempted_at: latest.at,
            }
            const decayed = decayIfStale(tempRecord, now)
            return decayed.state !== 'new' ? decayed : r
          })
        }
      }

      if (!cancelled) {
        setRecords(allRecords)
        setLoading(false)
      }
    }

    fetchRecords().catch(err => {
      if (!cancelled) {
        console.error('useConceptMastery: unexpected error:', err)
        setRecords(readLocalMastery(uid))
        setLoading(false)
      }
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
