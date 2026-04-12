import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import type { Question, QuestionFilter } from '@/lib/parser'

export function useQuestions(filters: QuestionFilter) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Flatten tags to a stable primitive for the dependency array
  const tagsKey = filters.tags?.join(',') ?? ''

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const parsed = parseAllQuestions(rawFiles)
        const filtered = filterQuestions(parsed, filters)
        // Shuffle unless topic mode (topic mode preserves ordered sets)
        if (filters.mode !== 'topic') {
          filtered.sort(() => Math.random() - 0.5)
        }
        setQuestions(filtered)
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
  }, [filters.topic, filters.subtopic, filters.difficulty, filters.mode, tagsKey])

  return { questions, loading, error }
}
