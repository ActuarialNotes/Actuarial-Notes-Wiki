import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import { useAllQuestions } from './useAllQuestions'
import { buildRecentMistakes, type MistakeResponseRow, type RecentMistake } from '@/lib/recentMistakes'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { Question } from '@/lib/parser'

interface UseRecentMistakesResult {
  mistakes: RecentMistake[]
  loading: boolean
}

/**
 * Recent-mistakes for the Dashboard card. Pulls the learner's question-response
 * history once, joins it against the question bank the app already loads, and
 * asks buildRecentMistakes to rank the likely-problematic concepts per miss.
 *
 * @param masteryRecords mastery rows already scoped to the active exam
 * @param examTopic      active exam label (q.exam) — filters to this exam's misses
 * @param limit          max mistakes to surface
 */
export function useRecentMistakes(
  masteryRecords: ConceptMasteryRecord[],
  examTopic: string | null,
  limit = 4,
): UseRecentMistakesResult {
  const { user } = useAuth()
  const { questions, loading: questionsLoading } = useAllQuestions()
  const [rows, setRows] = useState<MistakeResponseRow[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setRows([])
      return
    }
    let cancelled = false
    setLoading(true)
    supabase
      .from('question_responses')
      .select('question_id, is_correct, answered_at')
      .eq('user_id', user.id)
      .order('answered_at', { ascending: false })
      .limit(2000)
      .then(({ data }: { data: MistakeResponseRow[] | null }) => {
        if (!cancelled) setRows(data ?? [])
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [user?.id])

  // Refetch when a quiz is saved on this device so a just-missed question shows
  // up (and a just-corrected one drops off) without a page reload.
  useEffect(() => {
    if (!user?.id) return
    const uid = user.id
    const refetch = () => {
      supabase
        .from('question_responses')
        .select('question_id, is_correct, answered_at')
        .eq('user_id', uid)
        .order('answered_at', { ascending: false })
        .limit(2000)
        .then(({ data }: { data: MistakeResponseRow[] | null }) => { setRows(data ?? []) })
    }
    window.addEventListener('quiz-session-saved', refetch)
    return () => window.removeEventListener('quiz-session-saved', refetch)
  }, [user?.id])

  const examQuestions = useMemo<Question[]>(
    () => (examTopic ? questions.filter(q => q.exam === examTopic) : questions),
    [questions, examTopic],
  )

  const mistakes = useMemo(
    () => buildRecentMistakes(rows, examQuestions, masteryRecords, new Date(), limit),
    [rows, examQuestions, masteryRecords, limit],
  )

  return { mistakes, loading: loading || questionsLoading }
}
