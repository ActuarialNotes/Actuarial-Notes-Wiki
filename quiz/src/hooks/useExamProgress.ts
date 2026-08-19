import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { EXAM_ID_TO_LABEL, EXAM_LABEL_TO_ID } from '@/lib/examIds'

// Maps exam progress keys to the exam label stored in question.exam, and back.
// Both are re-exports of the canonical maps in lib/examIds.ts: this file used
// to carry its own copy, and the two drifted — the copy here listed Exam 5 and
// MAS-II while examIds.ts did not, so quizzes on those exams wrote no mastery
// at all. One table, two names.
export const EXAM_ID_TO_TOPIC: Record<string, string> = EXAM_ID_TO_LABEL

// Maps question.exam labels back to exam progress keys
export const TOPIC_TO_EXAM_ID: Record<string, string> = EXAM_LABEL_TO_ID

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
    payload.target_date = date
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
