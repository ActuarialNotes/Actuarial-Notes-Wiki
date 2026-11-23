import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, type Question } from '@/lib/parser'
import { pickSimilarQuestion } from '@/lib/similarQuestion'
import { useShowFlaggedQuestions } from '@/hooks/useShowFlaggedQuestions'

// The bank, parsed once per copy of it: a quiz has already loaded it, so this
// is the same array the quiz drew from.
const parsed = new WeakMap<string[], Question[]>()

/**
 * The question **Try a similar one** would queue after a miss on `missed`
 * (lib/similarQuestion.ts), or null: nothing to offer, or still looking.
 * `inQuiz` are the ids already in the quiz, which are never offered again.
 */
export function useSimilarQuestion(missed: Question | null, inQuiz: readonly string[]): Question | null {
  const [showFlagged] = useShowFlaggedQuestions()
  const [similar, setSimilar] = useState<Question | null>(null)
  const inQuizKey = inQuiz.join(',')

  useEffect(() => {
    setSimilar(null)
    if (!missed) return
    let cancelled = false
    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        let pool = parsed.get(raw)
        if (!pool) {
          pool = parseAllQuestions(raw)
          parsed.set(raw, pool)
        }
        setSimilar(pickSimilarQuestion(missed, pool, { excludeIds: inQuizKey.split(','), includeFlagged: showFlagged }))
      })
      .catch(() => { /* no bank, nothing to offer */ })
    return () => { cancelled = true }
  }, [missed, inQuizKey, showFlagged])

  return similar
}
