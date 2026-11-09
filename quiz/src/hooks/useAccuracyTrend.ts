import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import {
  ACCURACY_SPANS,
  accuracyTrend,
  type AccuracySpan,
  type AccuracyTrend,
  type AnswerRow,
  type QuestionFacts,
} from '@/lib/accuracyTrend'
import { addDays, todayISO } from '@/lib/studyPlan'
import type { Question } from '@/lib/parser'

/**
 * Days of answers the card reads: its longest span, 90 days, with a day's
 * margin for time zones. That also covers the 30 days before a 30-day span,
 * so its change can be shown; a 90-day span has none.
 */
const FETCH_DAYS = 91
/** PostgREST hands back at most this many rows a request, so the fetch pages. */
const PAGE = 1000
const MAX_PAGES = 10

export type AccuracyTrends = Record<AccuracySpan, AccuracyTrend>

interface Fetched {
  rows: AnswerRow[]
  /** Questions answered before the fetch begins — null when that read failed or ran past its pages. */
  priorIds: Set<string> | null
}

async function fetchAnswers(uid: string): Promise<Fetched> {
  const since = `${addDays(todayISO(), -FETCH_DAYS)}T00:00:00Z`
  const rows: AnswerRow[] = []
  for (let page = 0; page < MAX_PAGES; page++) {
    const { data, error } = await supabase
      .from('question_responses')
      .select('question_id, is_correct, answered_at, time_spent_seconds')
      .eq('user_id', uid)
      .gte('answered_at', since)
      .order('answered_at', { ascending: false })
      .range(page * PAGE, page * PAGE + PAGE - 1)
    if (error || !data) break
    rows.push(...(data as AnswerRow[]))
    if (data.length < PAGE) break
  }
  return { rows, priorIds: await fetchPriorIds(uid, since) }
}

/**
 * Which questions were answered before `since` — only their ids, so a first
 * try in the window can be told from a retry. Null rather than a partial set:
 * a set cut short would call retries first tries.
 */
async function fetchPriorIds(uid: string, since: string): Promise<Set<string> | null> {
  const ids = new Set<string>()
  for (let page = 0; page < MAX_PAGES; page++) {
    const { data, error } = await supabase
      .from('question_responses')
      .select('question_id')
      .eq('user_id', uid)
      .lt('answered_at', since)
      .order('answered_at', { ascending: false })
      .range(page * PAGE, page * PAGE + PAGE - 1)
    if (error || !data) return null
    for (const r of data as { question_id: string }[]) ids.add(r.question_id)
    if (data.length < PAGE) return ids
  }
  return null
}

/**
 * One exam's accuracy over the last 7, 30 and 90 days, from the answers kept
 * in `question_responses` (`lib/accuracyTrend.ts`). Signed-in only: a guest's
 * answers aren't kept, so there is nothing to draw and `trends` stays null —
 * as it does, with nothing fetched, while `examLabel` is null.
 */
export function useAccuracyTrend(examLabel: string | null, questions: readonly Question[]): {
  trends: AccuracyTrends | null
  /** The answers the trends were read from, for the rest of the Analytics section. */
  rows: AnswerRow[] | null
  loading: boolean
} {
  const { user } = useAuth()
  const userId = user?.id
  const [fetched, setFetched] = useState<Fetched | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchRows = useCallback((uid: string, isStale: () => boolean = () => false) => {
    fetchAnswers(uid)
      .then(data => { if (!isStale()) setFetched(data) })
      .catch(() => { if (!isStale()) setFetched({ rows: [], priorIds: null }) })
      .finally(() => { if (!isStale()) setLoading(false) })
  }, [])

  // No exam, no read: the caller passes null for a reader the card isn't for
  // (Analytics is Pro), and nothing of theirs is fetched.
  const active = examLabel !== null

  useEffect(() => {
    if (!userId || !active) { setFetched(null); return }
    let cancelled = false
    setLoading(true)
    fetchRows(userId, () => cancelled)
    return () => { cancelled = true }
  }, [userId, active, fetchRows])

  // A quiz finished on this device lands its answers, then says so.
  useEffect(() => {
    if (!userId || !active) return
    const refetch = () => fetchRows(userId)
    window.addEventListener('quiz-session-saved', refetch)
    return () => window.removeEventListener('quiz-session-saved', refetch)
  }, [userId, active, fetchRows])

  const factsById = useMemo(() => {
    const map = new Map<string, QuestionFacts>()
    if (!examLabel) return map
    for (const q of questions) if (q.exam === examLabel) map.set(q.id, { difficulty: q.difficulty, topic: q.topic })
    return map
  }, [examLabel, questions])

  const trends = useMemo(() => {
    if (!fetched || !examLabel) return null
    const today = todayISO()
    const lookup = (id: string) => factsById.get(id)
    const priorIds = fetched.priorIds ?? undefined
    const out = {} as AccuracyTrends
    for (const span of ACCURACY_SPANS) out[span] = accuracyTrend(fetched.rows, lookup, today, { span, history: FETCH_DAYS, priorIds })
    return out
  }, [fetched, examLabel, factsById])
  return { trends, rows: fetched?.rows ?? null, loading }
}
