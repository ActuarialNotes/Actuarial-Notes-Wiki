import { useMemo } from 'react'
import { useAllQuestions } from '@/hooks/useAllQuestions'

interface UseSubtopicsResult {
  byTopic: Record<string, string[]>
  loading: boolean
  error: string | null
}

export function useSubtopics(): UseSubtopicsResult {
  const { questions, loading, error } = useAllQuestions()

  const byTopic = useMemo(() => {
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
    return result
  }, [questions])

  return { byTopic, loading, error }
}
