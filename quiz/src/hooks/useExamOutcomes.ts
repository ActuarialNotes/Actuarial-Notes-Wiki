// The storage behind "How did the exam go?" (`lib/examOutcome.ts`, roadmap L18).
//
// Answers live in `exam_outcomes`, the account's own rows only, so a question
// answered on one device isn't asked on another. Closing the card and "results
// aren't out yet" are this device's: localStorage, keyed by account.
//
// Signed-in only. The table is read only when there is something that could be
// asked, so a Dashboard with no sitting past its results date makes no request.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import {
  dueOutcomeAsks,
  isOutcome,
  outcomeKey,
  snoozeEnd,
  type ExamOutcome,
  type OutcomeAsk,
} from '@/lib/examOutcome'
import { todayISO } from '@/lib/studyPlan'

const LOCAL_KEY = 'actuarial_exam_outcome_asks'

interface LocalState {
  dismissed: string[]
  snoozedUntil: Record<string, string>
}

const EMPTY: LocalState = { dismissed: [], snoozedUntil: {} }

function readLocal(userId: string): LocalState {
  try {
    const raw = localStorage.getItem(`${LOCAL_KEY}:${userId}`)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (!parsed || typeof parsed !== 'object') return EMPTY
    const { dismissed, snoozedUntil } = parsed as Partial<LocalState>
    return {
      dismissed: Array.isArray(dismissed) ? dismissed.filter((k): k is string => typeof k === 'string') : [],
      snoozedUntil: snoozedUntil && typeof snoozedUntil === 'object'
        ? Object.fromEntries(Object.entries(snoozedUntil).filter(([, v]) => typeof v === 'string'))
        : {},
    }
  } catch {
    return EMPTY
  }
}

function writeLocal(userId: string, state: LocalState) {
  try {
    localStorage.setItem(`${LOCAL_KEY}:${userId}`, JSON.stringify({
      dismissed: state.dismissed.slice(-50),
      snoozedUntil: state.snoozedUntil,
    }))
  } catch { /* private window */ }
}

export interface UseExamOutcomesResult {
  /** The question to ask now, or null. */
  ask: OutcomeAsk | null
  /** Records the answer; resolves false if it couldn't be saved. */
  answer: (ask: OutcomeAsk, outcome: ExamOutcome) => Promise<boolean>
  /** Results aren't out yet: ask again in a fortnight. */
  snooze: (ask: OutcomeAsk) => void
  /** Closed: never asked about this sitting again on this device. */
  dismiss: (ask: OutcomeAsk) => void
}

export function useExamOutcomes(
  rows: readonly { exam_id: string; target_date: string | null }[],
): UseExamOutcomesResult {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const today = todayISO()
  const [local, setLocal] = useState<LocalState>(EMPTY)
  const [answered, setAnswered] = useState<Set<string> | null>(null)

  useEffect(() => {
    setLocal(userId ? readLocal(userId) : EMPTY)
    setAnswered(null)
  }, [userId])

  const localState = useMemo(() => ({
    dismissed: new Set(local.dismissed),
    snoozedUntil: local.snoozedUntil,
  }), [local])

  // What could be asked before the account's answers are known.
  const candidates = useMemo(
    () => (userId ? dueOutcomeAsks(rows, { answered: new Set(), ...localState }, today) : []),
    [userId, rows, localState, today],
  )
  const hasCandidates = candidates.length > 0

  useEffect(() => {
    if (!userId || !hasCandidates || answered) return
    let cancelled = false
    void (async () => {
      const { data, error } = await supabase
        .from('exam_outcomes')
        .select('exam_id, sitting_start')
        .eq('user_id', userId)
      if (cancelled) return
      if (error) {
        // Without the account's answers the card could re-ask an answered
        // question, so it stays hidden.
        console.warn('exam_outcomes read failed:', error.message)
        return
      }
      setAnswered(new Set(((data ?? []) as { exam_id: unknown; sitting_start: unknown }[]).map(r => outcomeKey(String(r.exam_id), String(r.sitting_start)))))
    })()
    return () => { cancelled = true }
  }, [userId, hasCandidates, answered])

  const ask = useMemo(() => {
    if (!answered) return null
    return candidates.find(a => !answered.has(outcomeKey(a.examId, a.sittingStart))) ?? null
  }, [answered, candidates])

  const updateLocal = useCallback((fn: (s: LocalState) => LocalState) => {
    if (!userId) return
    setLocal(prev => {
      const next = fn(prev)
      writeLocal(userId, next)
      return next
    })
  }, [userId])

  const answer = useCallback(async (a: OutcomeAsk, outcome: ExamOutcome) => {
    if (!userId || !isOutcome(outcome)) return false
    const { error } = await supabase.from('exam_outcomes').upsert({
      user_id: userId,
      exam_id: a.examId,
      sitting_start: a.sittingStart,
      outcome,
      answered_at: new Date().toISOString(),
    })
    if (error) {
      console.warn('exam_outcomes write failed:', error.message)
      return false
    }
    setAnswered(prev => new Set(prev ?? []).add(outcomeKey(a.examId, a.sittingStart)))
    return true
  }, [userId])

  const snooze = useCallback((a: OutcomeAsk) => {
    const key = outcomeKey(a.examId, a.sittingStart)
    updateLocal(s => ({ ...s, snoozedUntil: { ...s.snoozedUntil, [key]: snoozeEnd(today) } }))
  }, [updateLocal, today])

  const dismiss = useCallback((a: OutcomeAsk) => {
    const key = outcomeKey(a.examId, a.sittingStart)
    updateLocal(s => ({ ...s, dismissed: [...s.dismissed.filter(k => k !== key), key] }))
  }, [updateLocal])

  return { ask, answer, snooze, dismiss }
}
