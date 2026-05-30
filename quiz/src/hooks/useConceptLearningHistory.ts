import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { slugForLink } from '@/lib/conceptMatch'
import {
  sanitizeMasteryState,
  decayIfStale,
} from '@/lib/mastery'
import type { MasteryState, ConceptMasteryRecord } from '@/lib/mastery'
import { syntheticDecayEvents } from '@/lib/learningHistory'
import type { LevelEvent } from '@/lib/learningHistory'

export type { LevelEvent } from '@/lib/learningHistory'

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

// Numeric rank for picking the "best" state when multiple exam records exist.
const STATE_RANK: Record<MasteryState, number> = {
  level3: 4, level2: 3, level1: 2, new: 1, forgotten: 0,
}

function linkMatchesConcept(link: string, conceptName: string): boolean {
  const lower = conceptName.toLowerCase()
  const ref = hrefToEntryRef(link)
  if (ref?.name.toLowerCase() === lower) return true
  const lastSegment = link.split('/').filter(Boolean).pop()
  return !!lastSegment && lastSegment.replace(/-/g, ' ').toLowerCase() === lower
}

function levelAtTime(time: Date, levelEvents: LevelEvent[]): MasteryState {
  let state: MasteryState = levelEvents[0]?.from ?? 'new'
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
  const [version, setVersion] = useState(0)

  // Re-fetch when concept mastery or question responses change so the modal
  // stays accurate after a quiz completes without requiring a close/reopen.
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`concept-learning-history:${userId}:${conceptName}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'concept_mastery', filter: `user_id=eq.${userId}` },
        () => setVersion(v => v + 1),
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'question_responses', filter: `user_id=eq.${userId}` },
        () => setVersion(v => v + 1),
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, conceptName])

  useEffect(() => {
    if (!userId) {
      setResult(EMPTY)
      return
    }

    let cancelled = false
    setResult(prev => ({ ...prev, loading: true, error: null }))

    async function load() {
      const now = new Date()

      // Resolve the set of stored concept_slug values for this concept BEFORE
      // querying. Mastery rows are written under the slug that slugForLink()
      // produces from a question's wiki_link (the file/base name), which may
      // differ from the display name passed here (aliases). Deriving the slugs
      // from the linked questions keeps the read self-consistent with the write
      // path; querying by the display name alone misses aliased concepts and
      // returns a blank graph.
      const allQuestionsRaw = await fetchAllQuestions()
      if (cancelled) return
      const allQuestions = parseAllQuestions(allQuestionsRaw)

      const matchingQuestions = allQuestions.filter(q =>
        q.wiki_link.some(link => linkMatchesConcept(link, conceptName)),
      )
      const questionIds = matchingQuestions.map(q => q.id)

      const slugSet = new Set<string>([conceptName])
      for (const q of matchingQuestions) {
        for (const link of q.wiki_link) {
          if (!linkMatchesConcept(link, conceptName)) continue
          const slug = slugForLink(link)
          if (slug) slugSet.add(slug)
        }
      }
      const slugs = [...slugSet]

      // Fetch level events and current mastery records for those slugs in parallel.
      const [levelResult, masteryResult] = await Promise.all([
        supabase
          .from('daily_completions')
          .select('from_state, to_state, at')
          .eq('user_id', userId)
          .in('concept_slug', slugs)
          .order('at', { ascending: true }),
        supabase
          .from('concept_mastery')
          .select('state, last_correct_at, last_attempted_at, incorrect_streak, correct_count, hard_correct_count, user_id, exam_id, concept_slug')
          .eq('user_id', userId)
          .in('concept_slug', slugs),
      ])

      if (cancelled) return

      if (levelResult.error) throw new Error(levelResult.error.message)

      const levelEvents: LevelEvent[] = (levelResult.data ?? []).map((r: { from_state: string; to_state: string; at: string }) => ({
        at: new Date(r.at),
        from: sanitizeMasteryState(r.from_state),
        to: sanitizeMasteryState(r.to_state),
      }))

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

        attemptDots = (responseData ?? []).map((r: { question_id: string; is_correct: boolean; answered_at: string }) => {
          const at = new Date(r.answered_at)
          return {
            at,
            isCorrect: r.is_correct,
            levelAtTime: levelAtTime(at, levelEvents),
          }
        })
      }

      // Compute the true current level from concept_mastery with decay applied.
      // Falls back to the last daily_completions event if no mastery record exists.
      const rawMasteryRows: ConceptMasteryRecord[] = (masteryResult.data ?? []).map(
        (r: ConceptMasteryRecord) => ({ ...r, state: sanitizeMasteryState(r.state) }),
      )

      let currentLevel: MasteryState
      let finalLevelEvents = levelEvents

      if (rawMasteryRows.length === 0) {
        // No mastery record yet — fall back to last level event
        currentLevel = levelEvents.length > 0 ? levelEvents[levelEvents.length - 1].to : 'new'
      } else {
        // Apply decay to each row and pick the one with the highest resulting state.
        // (Mirrors the exam-agnostic approach used for daily_completions.)
        const decayedRows = rawMasteryRows.map(r => decayIfStale(r, now))
        const canonical = decayedRows.reduce((best, r) => {
          const rankB = STATE_RANK[best.state]
          const rankR = STATE_RANK[r.state]
          if (rankR > rankB) return r
          if (rankR === rankB) {
            // Prefer most recently attempted as tiebreaker
            const bTime = best.last_attempted_at ? new Date(best.last_attempted_at).getTime() : 0
            const rTime = r.last_attempted_at ? new Date(r.last_attempted_at).getTime() : 0
            return rTime > bTime ? r : best
          }
          return best
        })
        currentLevel = canonical.state

        // If the mastery record is 'new' but level events show the concept was
        // advanced, the mastery row may be stale (e.g. the upsert failed while
        // daily_completions succeeded). Derive the current level from the last
        // level event with decay applied so the pill matches the graph.
        if (currentLevel === 'new' && levelEvents.length > 0) {
          const lastEvent = levelEvents[levelEvents.length - 1]
          if (lastEvent.to !== 'new' && lastEvent.to !== 'forgotten') {
            const tempRecord: ConceptMasteryRecord = {
              user_id: '', exam_id: '', concept_slug: '',
              state: lastEvent.to,
              correct_count: 0, incorrect_streak: 0, hard_correct_count: 0,
              last_correct_at: lastEvent.at.toISOString(),
              last_attempted_at: lastEvent.at.toISOString(),
            }
            const decayedState = decayIfStale(tempRecord, now).state
            if (STATE_RANK[decayedState] > STATE_RANK.new) {
              currentLevel = decayedState
            }
          }
        }

        // Augment levelEvents with synthetic decay/forget events so the graph
        // line drops at the correct time rather than staying flat.
        const lastLevelEvent = levelEvents[levelEvents.length - 1]
        if (
          lastLevelEvent &&
          currentLevel !== lastLevelEvent.to &&
          lastLevelEvent.to !== 'new' &&
          lastLevelEvent.to !== 'forgotten'
        ) {
          // Find the raw (pre-decay) mastery record that best corresponds to the
          // last known upward level so we can anchor decay from last_correct_at.
          const anchorRaw = rawMasteryRows.reduce((best, r) => {
            return STATE_RANK[r.state] >= STATE_RANK[best.state] ? r : best
          })

          if (anchorRaw.last_correct_at) {
            const lastCorrectAt = new Date(anchorRaw.last_correct_at)
            const decayEvts = syntheticDecayEvents(lastLevelEvent.to, lastCorrectAt, now)
            if (decayEvts.length > 0) {
              finalLevelEvents = [...levelEvents, ...decayEvts]
            }
          } else if (anchorRaw.state === 'forgotten' && anchorRaw.last_attempted_at) {
            // Forgotten via fail-streak (no last_correct_at means new→forgotten path
            // which shouldn't happen, but guard anyway). Use last_attempted_at as
            // an approximation of when forgetting occurred.
            const at = new Date(anchorRaw.last_attempted_at)
            finalLevelEvents = [
              ...levelEvents,
              { at, from: lastLevelEvent.to, to: 'forgotten' as MasteryState },
            ]
          }
        }

        // Fail-streak forgetting: mastery record shows forgotten but time-based
        // decay from last_correct_at wouldn't have triggered yet. Add a synthetic
        // forget event at last_attempted_at (time of the 3rd consecutive failure).
        if (
          currentLevel === 'forgotten' &&
          lastLevelEvent &&
          lastLevelEvent.to !== 'forgotten' &&
          finalLevelEvents === levelEvents // no decay events were added above
        ) {
          const anchorRaw = rawMasteryRows.find(r => r.state === 'forgotten')
          if (anchorRaw?.last_attempted_at) {
            const at = new Date(anchorRaw.last_attempted_at)
            finalLevelEvents = [
              ...levelEvents,
              { at, from: lastLevelEvent.to, to: 'forgotten' as MasteryState },
            ]
          }
        }
      }

      // Recompute each dot's y-position using finalLevelEvents (which includes
      // synthetic decay/forget events). The dots were initially computed with the
      // raw daily_completions levelEvents, which don't include those synthetic
      // events — causing dots to float above the graph line when the concept had
      // decayed between the last level event and the attempt timestamp.
      const finalAttemptDots = attemptDots.map(dot => ({
        ...dot,
        levelAtTime: levelAtTime(dot.at, finalLevelEvents),
      }))

      if (!cancelled) {
        setResult({ levelEvents: finalLevelEvents, attemptDots: finalAttemptDots, currentLevel, loading: false, error: null })
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
  }, [userId, conceptName, version])

  return result
}
