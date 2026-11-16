import { useEffect, useState } from 'react'
import type { ConceptQuestionCounts } from '@/lib/conceptQuestionCounts'

// Fetched once, by the first surface that asks (a small chunk of its own).
let countsPromise: Promise<ConceptQuestionCounts> | null = null
let loaded: ConceptQuestionCounts | null = null

/**
 * How many served questions each concept has (`lib/conceptQuestionCounts.ts`),
 * or null until the build's table has arrived. It never touches the question
 * bank itself.
 */
export function useConceptQuestionCounts(): ConceptQuestionCounts | null {
  const [counts, setCounts] = useState(loaded)
  useEffect(() => {
    if (counts) return
    let cancelled = false
    countsPromise ??= import('virtual:concept-question-counts').then(m => (loaded = m.default))
    countsPromise.then(c => { if (!cancelled) setCounts(c) }).catch(() => { countsPromise = null })
    return () => { cancelled = true }
  }, [counts])
  return counts
}
