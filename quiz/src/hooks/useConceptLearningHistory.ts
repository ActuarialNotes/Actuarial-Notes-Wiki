import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { sanitizeMasteryState } from '@/lib/mastery'
import type { MasteryState } from '@/lib/mastery'

export interface LevelEvent {
  at: Date
  from: MasteryState
  to: MasteryState
}

export interface AttemptDot {
  at: Date
  isCorrect: boolean
  levelAtTime: MasteryState
}

export interface ConceptLearningHistory {
  levelEvents: LevelEvent[]
  attemptDots: AttemptDot[]
  currentLevel: MasteryState
  loading: boolean
  error: string | null
}

function linkMatchesConcept(link: string, conceptName: string): boolean {
  const lower = conceptName.toLowerCase()
  const ref = hrefToEntryRef(link)
  if (ref?.name.toLowerCase() === lower) return true
  const lastSegment = link.split('/').filter(Boolean).pop()
  return !!lastSegment && lastSegment.replace(/-/g, ' ').toLowerCase() === lower
}

function levelAtTime(time: Date, levelEvents: LevelEvent[]): MasteryState {
  let state: MasteryState = 'new'
  for (const ev of levelEvents) {
    if (ev.at <= time) state = ev.to
    else break
  }
  return state
}

const EMPTY: ConceptLearningHistory = {
  levelEvents: [],
  attemptDots: [],
  currentLevel: 'new',
  loading: false,
  error: null,
}

export function useConceptLearningHistory(conceptName: string): ConceptLearningHistory {
  const { user } = useAuth()
  const userId = user?.id
  const [result, setResult] = useState<ConceptLearningHistory>({ ...EMPTY, loading: true })

  useEffect(() => {
    if (!userId) {
      setResult(EMPTY)
      return
    }

    let cancelled = false
    setResult(prev => ({ ...prev, loading: true, error: null }))

    async function load() {
      // Fetch level events + question bank in parallel
      const [levelResult, allQuestionsRaw] = await Promise.all([
        supabase
          .from('daily_completions')
          .select('from_state, to_state, at')
          .eq('user_id', userId)
          .ilike('concept_slug', conceptName)
          .order('at', { ascending: true }),
        fetchAllQuestions(),
      ])

      if (cancelled) return

      if (levelResult.error) throw new Error(levelResult.error.message)

      const levelEvents: LevelEvent[] = (levelResult.data ?? []).map(r => ({
        at: new Date(r.at),
        from: sanitizeMasteryState(r.from_state),
        to: sanitizeMasteryState(r.to_state),
      }))

      // Resolve question IDs linked to this concept
      const allQuestions = parseAllQuestions(allQuestionsRaw)
      const questionIds = allQuestions
        .filter(q => q.wiki_link.some(link => linkMatchesConcept(link, conceptName)))
        .map(q => q.id)

      let attemptDots: AttemptDot[] = []

      if (questionIds.length > 0) {
        const { data: responseData, error: responseError } = await supabase
          .from('question_responses')
          .select('question_id, is_correct, answered_at')
          .eq('user_id', userId)
          .in('question_id', questionIds)
          .order('answered_at', { ascending: true })

        if (cancelled) return
        if (responseError) throw new Error(responseError.message)

        attemptDots = (responseData ?? []).map(r => {
          const at = new Date(r.answered_at)
          return {
            at,
            isCorrect: r.is_correct,
            levelAtTime: levelAtTime(at, levelEvents),
          }
        })
      }

      const currentLevel = levelEvents.length > 0 ? levelEvents[levelEvents.length - 1].to : 'new'

      if (!cancelled) {
        setResult({ levelEvents, attemptDots, currentLevel, loading: false, error: null })
      }
    }

    load().catch(err => {
      if (!cancelled) {
        setResult(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load history',
        }))
      }
    })

    return () => { cancelled = true }
  }, [userId, conceptName])

  return result
}
