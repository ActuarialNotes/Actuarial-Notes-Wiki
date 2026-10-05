import { useMemo } from 'react'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { latestMasteryStates, type MasteryState } from '@/lib/mastery'

export interface ConceptLevels {
  /** The reader's level on a concept — what its card's foil edge says. */
  levelOf: (name: string) => MasteryState
  /** Whether they have collected its card (a card only wears foil once collected). */
  isCollected: (name: string) => boolean
}

/**
 * What a concept's card looks like for this reader, wherever it is drawn: its
 * level (`latestMasteryStates`) and whether it is collected. Quiz Battle's
 * topic pick and Concept Craft's board both draw concepts as cards, and both
 * read them through this, so one concept wears the same edge on both.
 */
export function useConceptLevels(): ConceptLevels {
  const { records } = useConceptMastery()
  const cards = useCollectedCards(s => s.cards)
  return useMemo(() => {
    const states = latestMasteryStates(records, new Date())
    const collected = new Set(cards.map(c => c.name.toLowerCase()))
    return {
      levelOf: name => states.get(name.toLowerCase()) ?? 'new',
      isCollected: name => collected.has(name.toLowerCase()),
    }
  }, [records, cards])
}
