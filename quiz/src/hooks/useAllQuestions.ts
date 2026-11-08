import { useEffect, useState } from 'react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'

interface UseAllQuestionsResult {
  questions: Question[]
  loading: boolean
  error: string | null
}

export function useAllQuestions(): UseAllQuestionsResult {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        setQuestions(parseAllQuestions(raw))
      })
      .catch(() => {
        if (!cancelled) setError("The questions didn't load. Check your connection and try again.")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return { questions, loading, error }
}
