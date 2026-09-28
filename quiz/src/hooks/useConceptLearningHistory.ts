import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { slugForLink } from '@/lib/conceptMatch'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { sanitizeMasteryState } from '@/lib/mastery'
import type { MasteryState, ConceptMasteryRecord } from '@/lib/mastery'
import { conceptLevelHistory, levelAtTime } from '@/lib/learningHistory'
import type { LevelEvent, MasteryTrack } from '@/lib/learningHistory'

export type { LevelEvent } from '@/lib/learningHistory'

export interface AttemptDot {
  at: Date
  isCorrect: boolean
  levelAtTime: MasteryState
  /** The question this attempt answered — lets a dot filter the list below the graph. */
  questionId: string
}

export interface ConceptLearningHistory {
  levelEvents: LevelEvent[]
  attemptDots: AttemptDot[]
  /** Every question linked to this concept, so callers can resolve an attempt's question. */
  questions: Question[]
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

const EMPTY: ConceptLearningHistory = {
  levelEvents: [],
  attemptDots: [],
  questions: [],
  currentLevel: 'new',
  loading: false,
  error: null,
}

export function useConceptLearningHistory(conceptName: string): ConceptLearningHistory {
  const { user } = useAuth()
  const userId = user?.id
  const [result, setResult] = useState<ConceptLearningHistory>({ ...EMPTY, loading: true })
  const [version, setVersion] = useState(0)
  // Per-instance channel suffix. Two components can hold this hook for the same
  // concept at once (a modal and the progress panel inside it); a
  // shared topic makes the second subscribe fail with "cannot add
  // postgres_changes callbacks after subscribe()", and unmounting either one
  // tears down the other's subscription.
  const channelId = useRef(Math.random().toString(36).slice(2))

  // Re-fetch when concept mastery or question responses change so the modal
  // stays accurate after a quiz completes without requiring a close/reopen.
  useEffect(() => {
    if (!userId || !conceptName) return
    const channel = supabase
      .channel(`concept-learning-history:${userId}:${conceptName}:${channelId.current}`)
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
    // No concept means nothing to load — an always-mounted caller may hold this
    // hook with an empty name while it's closed, and querying for it costs a
    // question fetch plus two round-trips on every page load.
    if (!userId || !conceptName) {
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
          .select('exam_id, concept_slug, from_state, to_state, at')
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

      // Mastery is kept per (exam, slug) — one track per row. The same concept
      // on two exams is two ladders, and the graph draws the best of them
      // (conceptLevelHistory), never their events laid end to end.
      const tracks = new Map<string, MasteryTrack>()
      const trackFor = (examId: string, slug: string): MasteryTrack => {
        const key = `${examId}::${slug.toLowerCase()}`
        let track = tracks.get(key)
        if (!track) {
          track = { events: [], record: null, lastAttemptAt: null }
          tracks.set(key, track)
        }
        return track
      }

      for (const r of (levelResult.data ?? []) as Array<{ exam_id: string; concept_slug: string; from_state: string; to_state: string; at: string }>) {
        trackFor(r.exam_id, r.concept_slug).events.push({
          at: new Date(r.at),
          from: sanitizeMasteryState(r.from_state),
          to: sanitizeMasteryState(r.to_state),
        })
      }
      for (const r of (masteryResult.data ?? []) as ConceptMasteryRecord[]) {
        trackFor(r.exam_id, r.concept_slug).record = { ...r, state: sanitizeMasteryState(r.state) }
      }

      let responses: Array<{ question_id: string; is_correct: boolean; answered_at: string }> = []
      if (questionIds.length > 0) {
        const { data: responseData, error: responseError } = await supabase
          .from('question_responses')
          .select('question_id, is_correct, answered_at')
          .eq('user_id', userId)
          .in('question_id', questionIds)
          .order('answered_at', { ascending: true })

        if (cancelled) return
        if (responseError) throw new Error(responseError.message)
        responses = responseData ?? []
      }

      // Each answer fed the rows its question writes to — the same
      // (exam, slug) pairs quizStore derives — so each track knows when it was
      // last answered, which is where a run of failures drops it to Forgotten.
      const trackKeysByQuestion = new Map<string, string[]>()
      for (const q of matchingQuestions) {
        const examId = EXAM_LABEL_TO_ID[q.exam]
        if (!examId) continue
        const keys = q.wiki_link
          .filter(link => linkMatchesConcept(link, conceptName))
          .map(slugForLink)
          .filter((slug): slug is string => !!slug)
          .map(slug => `${examId}::${slug.toLowerCase()}`)
        trackKeysByQuestion.set(q.id, keys)
      }
      for (const r of responses) {
        const at = new Date(r.answered_at)
        for (const key of trackKeysByQuestion.get(r.question_id) ?? []) {
          const track = tracks.get(key)
          if (track && (!track.lastAttemptAt || at > track.lastAttemptAt)) track.lastAttemptAt = at
        }
      }

      const { levelEvents, currentLevel } = conceptLevelHistory([...tracks.values()], now)

      const attemptDots: AttemptDot[] = responses.map(r => {
        const at = new Date(r.answered_at)
        return {
          at,
          isCorrect: r.is_correct,
          levelAtTime: levelAtTime(at, levelEvents),
          questionId: r.question_id,
        }
      })

      if (!cancelled) {
        setResult({
          levelEvents,
          attemptDots,
          questions: matchingQuestions,
          currentLevel,
          loading: false,
          error: null,
        })
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
