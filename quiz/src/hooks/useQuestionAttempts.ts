import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface QuestionAttemptSummary {
  question_id: string
  attempt_count: number
  correct_count: number
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
      .select('question_id, is_correct')
      .eq('user_id', userId)
      .then(({ data }: { data: { question_id: string; is_correct: boolean }[] | null }) => {
        if (!data || isStale()) return
        const map = new Map<string, QuestionAttemptSummary>()
        for (const row of data) {
          const existing = map.get(row.question_id)
          if (existing) {
            existing.attempt_count++
            if (row.is_correct) existing.correct_count++
          } else {
            map.set(row.question_id, {
              question_id: row.question_id,
              attempt_count: 1,
              correct_count: row.is_correct ? 1 : 0,
            })
          }
        }
        setByQuestionId(map)
      })
      .finally(() => { if (!isStale()) setLoading(false) })
  }, [])

  useEffect(() => {
    if (!user) {
      setByQuestionId(new Map())
      return
    }
    let cancelled = false
    setLoading(true)
    fetchAttempts(user.id, () => cancelled)
    return () => { cancelled = true }
  }, [user?.id, fetchAttempts])

  // Answers are written from the quiz and the fix-mistakes reviewer, both of
  // which signal `quiz-session-saved` once the responses have landed. Without
  // this the chip a learner is looking at keeps showing the tally from before
  // they answered, until a reload.
  useEffect(() => {
    if (!user?.id) return
    const uid = user.id
    const refetch = () => fetchAttempts(uid)
    window.addEventListener('quiz-session-saved', refetch)
    return () => window.removeEventListener('quiz-session-saved', refetch)
  }, [user?.id, fetchAttempts])

  return { byQuestionId, loading, tracked: !!user }
}
