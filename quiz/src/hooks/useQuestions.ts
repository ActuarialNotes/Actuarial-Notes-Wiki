import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import { drawByDifficulty, shuffle } from '@/lib/quizDifficulty'
import { inPaperOrder } from '@/lib/pastExams'
import { drawPracticeExam, practiceExamBlueprint, syllabusForBank } from '@/lib/practiceExam'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { Question, QuestionFilter } from '@/lib/parser'
import { useShowFlaggedQuestions } from '@/hooks/useShowFlaggedQuestions'

export function useQuestions(filters: QuestionFilter) {
  // Questions carrying an unresolved critical finding are excluded from a
  // session by default (filterQuestions does it); the Settings toggle is how a
  // reviewer gets at them to fix them. See lib/verification.ts.
  const [showFlagged] = useShowFlaggedQuestions()
  // A practice exam is weighed by its exam's syllabus sections.
  const { syllabi } = useWikiSyllabus()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Flatten array filters to stable primitives for the dependency array.
  // Sort first so reordered-but-equivalent inputs don't refetch.
  const topicsKey = filters.topics ? [...filters.topics].sort().join(',') : ''
  const idsKey = filters.ids ? [...filters.ids].sort().join(',') : ''
  const conceptsKey = filters.concepts ? [...filters.concepts].sort().join(',') : ''
  const difficultiesKey = filters.difficulties ? [...filters.difficulties].sort().join(',') : ''

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
        // A past sitting is sat the way the paper set it, question 1 first —
        // and a quiz of a few of its questions is a random few, still in the
        // paper's order. Anything else is a draw: leaning toward a difficulty when the link
        // carries one (the old builder slider's `level`), a uniform shuffle when it doesn't. A pinned id list
        // is always shuffled — it is taken whole, and `filterQuestions` ignores
        // a sitting beside it, so neither the paper nor the lean has a say.
        // A practice exam of no one sitting is drawn to the paper's shape — its
        // formats, its sections at their weights, its length or point total
        // (lib/practiceExam.ts).
        const sitting = Boolean(filters.year || filters.session) && !filters.ids?.length
        const practiceExam = filters.mode === 'mock-exam' && !sitting && !filters.ids?.length && !!filters.exam
        const result = sitting
          ? inPaperOrder(limit < filtered.length ? shuffle(filtered).slice(0, limit) : filtered)
          : practiceExam
          ? drawPracticeExam(
              filtered,
              { ...practiceExamBlueprint(filters.exam!), ...(filters.count ? { questions: filters.count } : {}) },
              syllabusForBank(syllabi, filters.exam!),
            )
          : filters.difficultyTarget !== undefined && !filters.ids?.length
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
  }, [filters.exam, filters.topic, filters.difficulty, filters.mode, filters.count, filters.difficultyTarget, difficultiesKey, topicsKey, idsKey, filters.concept, conceptsKey, filters.year, filters.session, showFlagged, syllabi])

  return { questions, loading, error }
}
