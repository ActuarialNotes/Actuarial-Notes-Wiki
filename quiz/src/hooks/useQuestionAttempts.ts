import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface QuestionAttemptSummary {
  question_id: string
  attempt_count: number
  correct_count: number
}

export function useQuestionAttempts(): { byQuestionId: Map<string, QuestionAttemptSummary>; loading: boolean } {
  const { user } = useAuth()
  const [byQuestionId, setByQuestionId] = useState<Map<string, QuestionAttemptSummary>>(new Map())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setByQuestionId(new Map())
      return
    }
    let cancelled = false
    setLoading(true)
    supabase
      .from('question_responses')
      .select('question_id, is_correct')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (cancelled || !data) return
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
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [user?.id])

  return { byQuestionId, loading }
}
