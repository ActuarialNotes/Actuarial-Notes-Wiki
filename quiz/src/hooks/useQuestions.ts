import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import type { Question, QuestionFilter } from '@/lib/parser'

export function useQuestions(filters: QuestionFilter) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Flatten array filters to stable primitives for the dependency array.
  // Sort first so reordered-but-equivalent inputs don't refetch.
  const tagsKey = filters.tags ? [...filters.tags].sort().join(',') : ''
  const subtopicsKey = filters.subtopics ? [...filters.subtopics].sort().join(',') : ''
  const idsKey = filters.ids ? [...filters.ids].sort().join(',') : ''

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const parsed = parseAllQuestions(rawFiles)
        const filtered = filterQuestions(parsed, filters)
        // Fisher-Yates shuffle (uniform; sort+random is biased)
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[filtered[i], filtered[j]] = [filtered[j], filtered[i]]
        }
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
