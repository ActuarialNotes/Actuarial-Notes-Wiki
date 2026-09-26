import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import { drawByDifficulty, shuffle } from '@/lib/quizDifficulty'
import type { Question, QuestionFilter } from '@/lib/parser'
import { useShowFlaggedQuestions } from '@/hooks/useShowFlaggedQuestions'

export function useQuestions(filters: QuestionFilter) {
  // Questions carrying an unresolved critical finding are excluded from a
  // session by default (filterQuestions does it); the Settings toggle is how a
  // reviewer gets at them to fix them. See lib/verification.ts.
  const [showFlagged] = useShowFlaggedQuestions()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Flatten array filters to stable primitives for the dependency array.
  // Sort first so reordered-but-equivalent inputs don't refetch.
  const topicsKey = filters.topics ? [...filters.topics].sort().join(',') : ''
  const idsKey = filters.ids ? [...filters.ids].sort().join(',') : ''
  const conceptsKey = filters.concepts ? [...filters.concepts].sort().join(',') : ''

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const parsed = parseAllQuestions(rawFiles)
        const filtered = filterQuestions(parsed, { ...filters, includeFlagged: showFlagged })
        const limit = filters.count || filtered.length
        // A difficulty lean weights the draw toward the slider's level; without
        // one it is a uniform shuffle. A pinned id list is taken whole either
        // way, so the lean has nothing to choose between there.
        const result = filters.difficultyTarget !== undefined && !filters.ids?.length
          ? drawByDifficulty(filtered, limit, filters.difficultyTarget)
          : shuffle(filtered).slice(0, limit)
        setQuestions(result)
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load questions')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.exam, filters.topic, filters.difficulty, filters.mode, filters.count, filters.difficultyTarget, topicsKey, idsKey, filters.concept, conceptsKey, filters.year, filters.session, showFlagged])

  return { questions, loading, error }
}
