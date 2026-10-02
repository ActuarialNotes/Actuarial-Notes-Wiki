import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { guestRunDays, shiftMonth, studiedDays } from '@/lib/actuaria/coverage'
import { localDayKey } from '@/lib/streak'
import { readLocalStreak, resolveTimeZone, STREAK_EVENT } from '@/lib/streakStore'

/**
 * The days of `month` ('YYYY-MM') the player studied, for the coverage
 * calendar (lib/actuaria/coverage.ts): from `quiz_sessions` when signed in — a
 * day with a completed quiz and a right answer in it — and, for a guest, the
 * current streak's run, which is all a guest's browser remembers.
 */
export function useCoverageDays(month: string): { days: Set<string>; loading: boolean } {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const tz = useMemo(() => resolveTimeZone(), [])
  const [days, setDays] = useState<Set<string>>(() => new Set())
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const bump = () => setVersion(v => v + 1)
    window.addEventListener(STREAK_EVENT, bump)
    return () => window.removeEventListener(STREAK_EVENT, bump)
  }, [])

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setDays(guestRunDays(readLocalStreak(), localDayKey(new Date(), tz)))
      setLoading(false)
      return
    }
    setLoading(true)
    // A day's slack either side: a session near midnight UTC can belong to the
    // month on the player's own clock.
    const from = `${shiftMonth(month, 0)}-01`
    const to = `${shiftMonth(month, 1)}-01`
    const start = new Date(new Date(`${from}T00:00:00Z`).getTime() - 86_400_000).toISOString()
    const end = new Date(new Date(`${to}T00:00:00Z`).getTime() + 86_400_000).toISOString()
    supabase
      .from('quiz_sessions')
      .select('completed_at, correct_count')
      .eq('user_id', userId)
      .gte('completed_at', start)
      .lt('completed_at', end)
      .then(({ data, error }: { data: { completed_at: string; correct_count: number }[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        setDays(error ? new Set() : studiedDays(data ?? [], tz))
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, month, tz, version])

  return { days, loading }
}
