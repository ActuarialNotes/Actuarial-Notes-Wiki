import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import { accuracyTrend, type AccuracyTrend, type AnswerRow } from '@/lib/accuracyTrend'
import { addDays, todayISO } from '@/lib/studyPlan'
import type { Difficulty, Question } from '@/lib/parser'

/** Days of answers the card reads: its 30-day chart, with a day's margin for time zones. */
const FETCH_DAYS = 31

/**
 * One exam's accuracy over the last month, from the answers kept in
 * `question_responses` (`lib/accuracyTrend.ts`). Signed-in only: a guest's
 * answers aren't kept, so there is nothing to draw and `trend` stays null.
 */
export function useAccuracyTrend(examLabel: string | null, questions: readonly Question[]): {
  trend: AccuracyTrend | null
  loading: boolean
} {
  const { user } = useAuth()
  const userId = user?.id
  const [rows, setRows] = useState<AnswerRow[] | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchRows = useCallback((uid: string, isStale: () => boolean = () => false) => {
    const since = `${addDays(todayISO(), -FETCH_DAYS)}T00:00:00Z`
    supabase
      .from('question_responses')
      .select('question_id, is_correct, answered_at')
      .eq('user_id', uid)
      .gte('answered_at', since)
      .limit(5000)
      .then(({ data }: { data: AnswerRow[] | null }) => {
        if (!isStale()) setRows(data ?? [])
      })
      .finally(() => { if (!isStale()) setLoading(false) })
  }, [])

  useEffect(() => {
    if (!userId) { setRows(null); return }
    let cancelled = false
    setLoading(true)
    fetchRows(userId, () => cancelled)
    return () => { cancelled = true }
  }, [userId, fetchRows])

  // A quiz finished on this device lands its answers, then says so.
  useEffect(() => {
    if (!userId) return
    const refetch = () => fetchRows(userId)
    window.addEventListener('quiz-session-saved', refetch)
    return () => window.removeEventListener('quiz-session-saved', refetch)
  }, [userId, fetchRows])

  const difficultyById = useMemo(() => {
    const map = new Map<string, Difficulty>()
    if (!examLabel) return map
    for (const q of questions) if (q.exam === examLabel) map.set(q.id, q.difficulty)
    return map
  }, [examLabel, questions])

  const trend = useMemo(
    () => (rows && examLabel ? accuracyTrend(rows, id => difficultyById.get(id), todayISO()) : null),
    [rows, examLabel, difficultyById],
  )
  return { trend, loading }
}
