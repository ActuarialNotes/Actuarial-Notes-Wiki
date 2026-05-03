import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { ConceptMasteryRecord } from '@/lib/mastery'
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
  const [records, setRecords] = useState<ConceptMasteryRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    if (!userId) {
      setRecords([])
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
          const dbRecords = data ?? []
          // Keep localStorage in sync with DB so the fallback stays fresh.
          if (dbRecords.length > 0) syncLocalMastery(dbRecords)
          setRecords(dbRecords)
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, version])

  const byConcept = new Map<string, ConceptMasteryRecord>()
  for (const r of records) {
    byConcept.set(`${r.exam_id}::${r.concept_slug.toLowerCase()}`, r)
  }

  return { records, byConcept, loading, refresh }
}
