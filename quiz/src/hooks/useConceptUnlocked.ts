import { useMemo } from 'react'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { decayIfStale } from '@/lib/mastery'

// A concept is unlocked once its flashcard has been collected (comprehension
// check passed) — or, for users who leveled it up before the collect feature
// existed, once its mastery has already moved past New. Mirrors the
// grandfather clause in ConceptPopup's lock/status indicator.
export function useIsConceptUnlocked(name: string): boolean {
  const collected = useCollectedCards(s => s.isCollected(name))
  const { records } = useConceptMastery()
  return useMemo(() => {
    if (collected) return true
    const lower = name.toLowerCase()
    const record = records.find(r => r.concept_slug.toLowerCase() === lower)
    if (!record) return false
    return decayIfStale(record, new Date()).state !== 'new'
  }, [collected, records, name])
}
