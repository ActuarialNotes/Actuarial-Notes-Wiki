import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { sanitizeMasteryState } from '@/lib/mastery'
import type { DailyLevelUp } from '@/lib/dailyProgressStore'

interface DailyCompletionRow {
  exam_id: string
  concept_slug: string
  day: string
  from_state: string
  to_state: string
  at: string
}

// Reads today's concept level-ups for the current user from Supabase so the
// study-plan checkmark stays consistent across devices. Mirrors the realtime +
// visibility-refresh pattern used by useConceptMastery. Returns DailyLevelUp[]
// (the same shape as the device-local dailyProgressStore) so callers can merge
// the two sources.
export function useDailyCompletions(examId: string | null): DailyLevelUp[] {
  const { user } = useAuth()
  const userId = user?.id
  const [rows, setRows] = useState<DailyLevelUp[]>([])
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    if (!userId) { setRows([]); return }
    let cancelled = false
    const today = new Date().toISOString().slice(0, 10)
    let query = supabase
      .from('daily_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('day', today)
    if (examId) query = query.eq('exam_id', examId)
    query.then(({ data, error }: { data: DailyCompletionRow[] | null; error: { message: string } | null }) => {
      if (cancelled) return
      if (error) {
        // Table may not be migrated yet — fall back to the local-only signal.
        return
      }
      setRows((data ?? []).map(r => ({
        conceptSlug: r.concept_slug,
        from: sanitizeMasteryState(r.from_state),
        to: sanitizeMasteryState(r.to_state),
        at: r.at,
      })))
    })
    return () => { cancelled = true }
  }, [userId, examId, version])

  // Realtime — reflects quiz completions from other devices instantly.
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`daily_completions:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'daily_completions', filter: `user_id=eq.${userId}` },
        () => { refresh() },
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, refresh])

  // Refetch when the tab regains focus (mobile ↔ desktop, cross-browser).
  useEffect(() => {
    if (!userId) return
    const handleVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', handleVisible)
    return () => document.removeEventListener('visibilitychange', handleVisible)
  }, [userId, refresh])

  return rows
}
