import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'

interface UseSubtopicsResult {
  byTopic: Record<string, string[]>
  loading: boolean
  error: string | null
}

export function useSubtopics(): UseSubtopicsResult {
  const [byTopic, setByTopic] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        const questions = parseAllQuestions(raw)
        const grouped: Record<string, Set<string>> = {}
        for (const q of questions) {
          if (!q.topic || !q.subtopic) continue
          if (!grouped[q.topic]) grouped[q.topic] = new Set()
          grouped[q.topic].add(q.subtopic)
        }
        const result: Record<string, string[]> = {}
        for (const [topic, set] of Object.entries(grouped)) {
          result[topic] = [...set].sort((a, b) => a.localeCompare(b))
        }
        setByTopic(result)
      })
      .catch(err => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load subtopics')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return { byTopic, loading, error }
}
