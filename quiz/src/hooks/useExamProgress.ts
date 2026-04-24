import { useEffect, useState } from 'react'
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

/**
 * Returns a map of wiki exam IDs to their status for the current user.
 * e.g. { P: 'in_progress', FM: 'not_started' }
 * Returns an empty object for unauthenticated users.
 */
export function useExamProgress(): Record<string, string> {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Record<string, string>>({})
  const userId = user?.id

  useEffect(() => {
    if (!userId) {
      setProgress({})
      return
    }

    let cancelled = false
    supabase
      .from('exam_progress')
      .select('exam_id, status')
      .eq('user_id', userId)
      .then(({ data, error }: { data: { exam_id: string; status: string }[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          console.warn('useExamProgress: failed to load exam_progress:', error.message)
          return
        }
        const map: Record<string, string> = {}
        data?.forEach(row => { map[row.exam_id] = row.status })
        setProgress(map)
      })
    return () => { cancelled = true }
  }, [userId])

  return progress
}
