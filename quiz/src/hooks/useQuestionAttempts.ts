import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface QuestionAttemptSummary {
  question_id: string
  attempt_count: number
  correct_count: number
  /** Whether the latest attempt was right. */
  last_correct: boolean
}

export function useQuestionAttempts(): {
  byQuestionId: Map<string, QuestionAttemptSummary>
  loading: boolean
  /** Whether attempt history is knowable at all. Responses live server-side, so
   *  a signed-out visitor has no history — an empty map then means "unknown",
   *  not "nothing attempted". Question lists use this to decide whether the
   *  "Not attempted" chip is meaningful. */
  tracked: boolean
} {
  const { user } = useAuth()
  const [byQuestionId, setByQuestionId] = useState<Map<string, QuestionAttemptSummary>>(new Map())
  const [loading, setLoading] = useState(false)

  // `isStale` lets a caller drop a result that arrived after it stopped caring —
  // the user switched, or the component unmounted.
  const fetchAttempts = useCallback((userId: string, isStale: () => boolean = () => false) => {
    supabase
      .from('question_responses')
      .select('question_id, is_correct, answered_at')
      .eq('user_id', userId)
      .order('answered_at', { ascending: true })
      .then(({ data }: { data: { question_id: string; is_correct: boolean }[] | null }) => {
        if (!data || isStale()) return
        const map = new Map<string, QuestionAttemptSummary>()
        for (const row of data) {
          const existing = map.get(row.question_id)
          if (existing) {
            existing.attempt_count++
            if (row.is_correct) existing.correct_count++
            // Rows arrive oldest first, so the last one read is the latest.
            existing.last_correct = row.is_correct
          } else {
            map.set(row.question_id, {
              question_id: row.question_id,
              attempt_count: 1,
              correct_count: row.is_correct ? 1 : 0,
              last_correct: row.is_correct,
            })
          }
        }
        setByQuestionId(map)
      })
      .finally(() => { if (!isStale()) setLoading(false) })
  }, [])

  const userId = user?.id
  useEffect(() => {
    if (!userId) {
      setByQuestionId(new Map())
      return
    }
    let cancelled = false
    setLoading(true)
    fetchAttempts(userId, () => cancelled)
    return () => { cancelled = true }
  }, [userId, fetchAttempts])

  // Answers are written from the quiz and the fix-mistakes reviewer, both of
  // which signal `quiz-session-saved` once the responses have landed. Without
  // this the chip a learner is looking at keeps showing the tally from before
  // they answered, until a reload.
  useEffect(() => {
    if (!userId) return
    const refetch = () => fetchAttempts(userId)
    window.addEventListener('quiz-session-saved', refetch)
    return () => window.removeEventListener('quiz-session-saved', refetch)
  }, [userId, fetchAttempts])

  return { byQuestionId, loading, tracked: !!user }
}
