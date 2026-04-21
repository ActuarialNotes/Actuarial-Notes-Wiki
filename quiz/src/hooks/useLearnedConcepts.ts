import { useCallback, useEffect, useState } from 'react'

// Keeps the quiz app's "mark concept as learned" state in the same
// localStorage key the wiki's publish.js uses, so the two apps share state
// seamlessly during the transition.
const STORAGE_KEY = 'actuarial-notes-learned'

type LearnedMap = Record<string, string[]>

function readStorage(): LearnedMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as LearnedMap) : {}
  } catch {
    return {}
  }
}

function writeStorage(map: LearnedMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    /* quota — ignore */
  }
}

export function useLearnedConcepts(examId: string | null) {
  const [map, setMap] = useState<LearnedMap>(readStorage)

  // Cross-tab sync — the wiki site writes the same key.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setMap(readStorage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const isLearned = useCallback(
    (conceptName: string) => {
      if (!examId) return false
      return (map[examId] ?? []).includes(conceptName)
    },
    [examId, map],
  )

  const toggle = useCallback(
    (conceptName: string) => {
      if (!examId) return
      setMap(prev => {
        const current = prev[examId] ?? []
        const idx = current.indexOf(conceptName)
        const nextList = idx === -1 ? [...current, conceptName] : current.filter((_, i) => i !== idx)
        const next = { ...prev, [examId]: nextList }
        writeStorage(next)
        return next
      })
    },
    [examId],
  )

  return { isLearned, toggle }
}
