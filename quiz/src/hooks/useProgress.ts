import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { QuizSession } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useProgress() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<QuizSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setSessions([])
      return
    }

    setLoading(true)
    setError(null)

    supabase
      .from('quiz_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(1000)
      .then(({ data, error: err }: { data: QuizSession[] | null; error: { message: string } | null }) => {
        if (err) {
          setError(err.message)
        } else {
          setSessions(data ?? [])
        }
      })
      .finally(() => setLoading(false))
  }, [user?.id])  // key on id — stable across token refreshes

  return { sessions, loading, error }
}
