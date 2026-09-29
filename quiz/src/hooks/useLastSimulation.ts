import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export interface SimulationRun {
  correct: number
  total: number
  seconds: number | null
  completedAt: string
}

/**
 * The player's last Practice Exam on `exam` (a bank label), from
 * `quiz_sessions` — what Actuaria's Simulation shows after a run
 * (docs/actuaria-online.md §6.10). Null for a guest, whose runs are kept
 * nowhere, and for a player who hasn't sat one.
 */
export function useLastSimulation(exam: string | null): { run: SimulationRun | null; loading: boolean } {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [run, setRun] = useState<SimulationRun | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setRun(null)
    if (!userId || !exam) return
    setLoading(true)
    supabase
      .from('quiz_sessions')
      .select('correct_count, total_questions, time_taken_seconds, completed_at')
      .eq('user_id', userId)
      .eq('mode', 'mock-exam')
      .eq('exam', exam)
      .order('completed_at', { ascending: false })
      .limit(1)
      .then(({ data }: { data: { correct_count: number; total_questions: number; time_taken_seconds: number | null; completed_at: string }[] | null }) => {
        if (cancelled) return
        const row = data?.[0]
        setRun(row ? { correct: row.correct_count, total: row.total_questions, seconds: row.time_taken_seconds, completedAt: row.completed_at } : null)
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, exam])

  return { run, loading }
}
