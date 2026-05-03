import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

// Maps wiki exam IDs to quiz topic values
export const EXAM_ID_TO_TOPIC: Record<string, string> = {
  P: 'Probability',
  FM: 'Financial Mathematics',
}

// Maps quiz topic values back to wiki exam IDs
export const TOPIC_TO_EXAM_ID: Record<string, string> = Object.fromEntries(
  Object.entries(EXAM_ID_TO_TOPIC).map(([id, topic]) => [topic, id])
)

export interface ExamProgressResult {
  /** Status per exam progress key, e.g. { FM: 'in_progress', P: 'not_started' } */
  progress: Record<string, string>
  /** Target/exam date per progress key, e.g. { FM: '2026-05-05' } */
  targetDates: Record<string, string | null>
  /** Persist an updated exam date to Supabase for the given exam key */
  updateTargetDate: (examId: string, date: string | null) => Promise<boolean>
}

/**
 * Returns exam progress status, target dates, and a mutation to update the date.
 * e.g. { progress: { P: 'in_progress', FM: 'not_started' }, targetDates: { FM: '2026-05-05' } }
 */
export function useExamProgress(): ExamProgressResult {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Record<string, string>>({})
  const [targetDates, setTargetDates] = useState<Record<string, string | null>>({})
  const userId = user?.id

  useEffect(() => {
    if (!userId) {
      setProgress({})
      setTargetDates({})
      return
    }

    let cancelled = false
    supabase
      .from('exam_progress')
      .select('exam_id, status, target_date')
      .eq('user_id', userId)
      .then(({ data, error }: { data: { exam_id: string; status: string; target_date: string | null }[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          console.warn('useExamProgress: failed to load exam_progress:', error.message)
          return
        }
        const p: Record<string, string> = {}
        const d: Record<string, string | null> = {}
        data?.forEach(row => {
          p[row.exam_id] = row.status
          d[row.exam_id] = row.target_date ?? null
        })
        setProgress(p)
        setTargetDates(d)
      })
    return () => { cancelled = true }
  }, [userId])

  const updateTargetDate = useCallback(async (examId: string, date: string | null): Promise<boolean> => {
    if (!userId) return false
    const payload: Record<string, unknown> = {
      user_id: userId,
      exam_id: examId,
      updated_at: new Date().toISOString(),
    }
    if (date != null) payload.target_date = date || null
    const { error } = await supabase
      .from('exam_progress')
      .upsert(payload, { onConflict: 'user_id,exam_id' })
    if (error) {
      console.warn('updateTargetDate: failed:', error.message)
      return false
    }
    setTargetDates(prev => ({ ...prev, [examId]: date }))
    return true
  }, [userId])

  return { progress, targetDates, updateTargetDate }
}
