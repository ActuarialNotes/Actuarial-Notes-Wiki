import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { addDays, todayISO } from '@/lib/studyPlan'
import type { GradeRecord } from '@/lib/writtenFeedback'
import { useAuth } from './useAuth'

/**
 * Days of grades read: two of Analytics' longest span, so a 90-day span has
 * the 90 days before it to compare with, and a day's margin for time zones.
 */
const FETCH_DAYS = 181
const PAGE = 1000
const MAX_PAGES = 5

async function fetchGrades(uid: string, exam: string): Promise<GradeRecord[]> {
  const since = `${addDays(todayISO(), -FETCH_DAYS)}T00:00:00Z`
  const rows: GradeRecord[] = []
  for (let page = 0; page < MAX_PAGES; page++) {
    const { data, error } = await supabase
      .from('written_part_grades')
      .select('question_id, part_label, grade, points, graded_at')
      .eq('user_id', uid)
      .eq('exam', exam)
      .gte('graded_at', since)
      .order('graded_at', { ascending: false })
      .range(page * PAGE, page * PAGE + PAGE - 1)
    if (error || !data) break
    rows.push(...(data as GradeRecord[]).map(r => ({ ...r, points: Number(r.points) || 0 })))
    if (data.length < PAGE) break
  }
  return rows
}

/**
 * One exam's written-part grades (`written_part_grades`) for Analytics'
 * Written answers section. Nothing is read while `examLabel` is null — the
 * caller passes null for a reader the section isn't for (it is Pro, and only
 * for the CAS's written papers). Null until the first read lands.
 */
export function useWrittenGrades(examLabel: string | null): GradeRecord[] | null {
  const { user } = useAuth()
  const userId = user?.id
  const [rows, setRows] = useState<GradeRecord[] | null>(null)

  const read = useCallback((uid: string, exam: string, isStale: () => boolean = () => false) => {
    fetchGrades(uid, exam)
      .then(data => { if (!isStale()) setRows(data) })
      .catch(() => { if (!isStale()) setRows([]) })
  }, [])

  useEffect(() => {
    if (!userId || !examLabel) { setRows(null); return }
    let cancelled = false
    read(userId, examLabel, () => cancelled)
    return () => { cancelled = true }
  }, [userId, examLabel, read])

  // A quiz finished on this device lands its grades before it says so.
  useEffect(() => {
    if (!userId || !examLabel) return
    const refetch = () => read(userId, examLabel)
    window.addEventListener('quiz-session-saved', refetch)
    return () => window.removeEventListener('quiz-session-saved', refetch)
  }, [userId, examLabel, read])

  return rows
}
