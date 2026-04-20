import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import type { Question, QuestionFilter } from '@/lib/parser'

export function useQuestions(filters: QuestionFilter) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Flatten array filters to stable primitives for the dependency array
  const tagsKey = filters.tags?.join(',') ?? ''
  const subtopicsKey = filters.subtopics?.join(',') ?? ''
  const idsKey = filters.ids?.join(',') ?? ''

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const parsed = parseAllQuestions(rawFiles)
        const filtered = filterQuestions(parsed, filters)
        // Always shuffle questions
        filtered.sort(() => Math.random() - 0.5)
        // Limit to requested count if specified
        const result = filters.count ? filtered.slice(0, filters.count) : filtered
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
  }, [filters.topic, filters.subtopic, filters.difficulty, filters.mode, filters.count, tagsKey, subtopicsKey, idsKey])

  return { questions, loading, error }
}
