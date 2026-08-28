// Watches the collected-cards store for concepts a quiz answered correctly but
// that stayed **New** because they hadn't been collected yet, and banks the
// level-up the moment one of them is collected (see
// docs/flashcard-collection.md — collection gates New → Level 1).
//
// Mounted once per results screen rather than per surface: the post-quiz gate
// modal and the collect cards behind it both list the same concepts, and two
// copies of this effect would fire two promotions for one collection.

import { useEffect, useRef, useState } from 'react'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { promoteMissedLevelUp } from '@/stores/quizStore'
import type { MasteryTransition } from '@/stores/quizStore'

interface Options {
  /** Exam id (progress key) the concepts belong to; null disables the watch. */
  examId: string | null
  userId: string | null
  /** Concept slugs answered correctly this quiz but left New and uncollected. */
  concepts: string[]
  /**
   * Fired for each concept actually promoted, so the results screen can list
   * the level-up it just banked. Not called when the concept had already
   * advanced elsewhere (promoteMissedLevelUp returns null).
   */
  onPromoted?: (transition: MasteryTransition) => void
}

export interface MissedLevelUpPromotion {
  /** Lower-cased names whose promotion attempt has finished. */
  promoted: Set<string>
  /** Lower-cased names collected but whose promotion is still in flight. */
  pending: Set<string>
}

export function useMissedLevelUpPromotion({
  examId,
  userId,
  concepts,
  onPromoted,
}: Options): MissedLevelUpPromotion {
  const collectedCards = useCollectedCards(s => s.cards)
  const [promoted, setPromoted] = useState<Set<string>>(() => new Set())
  const [pending, setPending] = useState<Set<string>>(() => new Set())
  const inFlightRef = useRef<Set<string>>(new Set())

  // Kept in refs so the effect runs off the collected set only, without
  // re-running on every render of the surfaces that read this hook.
  const onPromotedRef = useRef(onPromoted)
  onPromotedRef.current = onPromoted
  const conceptsRef = useRef(concepts)
  conceptsRef.current = concepts

  // The instant a listed concept flips to collected, bank the level-up it
  // already earned this quiz — no need to wait for another correct answer.
  useEffect(() => {
    if (!examId) return
    const collected = new Set(collectedCards.map(c => c.name.toLowerCase()))
    for (const name of conceptsRef.current) {
      const key = name.toLowerCase()
      if (!collected.has(key) || promoted.has(key) || inFlightRef.current.has(key)) continue
      inFlightRef.current.add(key)
      setPending(prev => new Set(prev).add(key))
      promoteMissedLevelUp(userId, examId, name)
        .then(transition => {
          if (transition) onPromotedRef.current?.(transition)
        })
        .catch(err => console.error('promoteMissedLevelUp failed:', err))
        .finally(() => {
          inFlightRef.current.delete(key)
          setPending(prev => {
            if (!prev.has(key)) return prev
            const next = new Set(prev)
            next.delete(key)
            return next
          })
          setPromoted(prev => new Set(prev).add(key))
        })
    }
  }, [collectedCards, examId, userId, promoted])

  return { promoted, pending }
}
