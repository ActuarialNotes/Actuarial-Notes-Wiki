import { useMemo } from 'react'
import { useAllQuestions } from '@/hooks/useAllQuestions'

interface UseConceptsResult {
  byExam: Record<string, string[]>
  loading: boolean
  error: string | null
}

// Returns all unique concept names (extracted from q.wiki_link) grouped by exam.
export function useConcepts(): UseConceptsResult {
  const { questions, loading, error } = useAllQuestions()

  const byExam = useMemo(() => {
    const grouped: Record<string, Set<string>> = {}
    for (const q of questions) {
      if (!q.exam) continue
      if (!grouped[q.exam]) grouped[q.exam] = new Set()
      for (const link of q.wiki_link) {
        const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
        const name = clean.split('/').filter(Boolean).pop() ?? ''
        if (name) grouped[q.exam].add(name)
      }
    }
    const result: Record<string, string[]> = {}
    for (const [exam, set] of Object.entries(grouped)) {
      result[exam] = [...set].sort((a, b) => a.localeCompare(b))
    }
    return result
  }, [questions])

  return { byExam, loading, error }
}
