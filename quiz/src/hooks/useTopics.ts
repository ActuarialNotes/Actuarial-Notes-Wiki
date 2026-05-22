import { useMemo } from 'react'
import { useAllQuestions } from '@/hooks/useAllQuestions'

interface UseTopicsResult {
  byExam: Record<string, string[]>
  loading: boolean
  error: string | null
}

export function useTopics(): UseTopicsResult {
  const { questions, loading, error } = useAllQuestions()

  const byExam = useMemo(() => {
    const grouped: Record<string, Set<string>> = {}
    for (const q of questions) {
      if (!q.exam || !q.topic) continue
      if (!grouped[q.exam]) grouped[q.exam] = new Set()
      grouped[q.exam].add(q.topic)
    }
    const result: Record<string, string[]> = {}
    for (const [exam, set] of Object.entries(grouped)) {
      result[exam] = [...set].sort((a, b) => a.localeCompare(b))
    }
    return result
  }, [questions])

  return { byExam, loading, error }
}
