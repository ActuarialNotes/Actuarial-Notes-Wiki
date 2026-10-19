import { useMemo } from 'react'
import type { Question, QuizMode } from '@/lib/parser'
import { builderPool, newQuestionCount, type QuizSitting, type QuizSource } from '@/lib/quizBuilder'
import { difficultyLevelCounts } from '@/lib/quizDifficulty'

/**
 * The questions the quiz builder's current configuration draws from
 * (`builderPool`, lib/quizBuilder.ts): before the difficulty choice, for the
 * menu's per-level counts, and after it — the deck card's number and what the
 * shuffle draws from.
 */
export function useBuilderPool({
  questions,
  topic,
  source,
  sitting,
  concept,
  concepts,
  todaysPlanPool,
  inLevels,
  attempted,
  mode,
}: {
  questions: Question[]
  topic: string
  source: QuizSource
  sitting: QuizSitting
  concept: string
  concepts: string[]
  /** Today's plan's pool at every level, when the plan is the source in use; else null. */
  todaysPlanPool: Question[] | null
  inLevels: (q: Question) => boolean
  /** The reader's attempt history, by question id. */
  attempted: { has(id: string): boolean }
  /** The format — a practice exam holds only the formats its paper sets. */
  mode: QuizMode
}) {
  // The questions the current configuration covers before the difficulty
  // choice — what the menu's per-level counts are read from.
  const unleveledPool = useMemo(
    () => builderPool({ questions, topic, source, sitting, concept, concepts, todaysPlanPool, mode }),
    [source, topic, questions, sitting, concept, todaysPlanPool, concepts, mode],
  )

  // How many questions each level holds there, said under each level's name.
  const difficultyCounts = useMemo(() => difficultyLevelCounts(unleveledPool), [unleveledPool])

  // The questions the current configuration can draw from. Backs the deck
  // card's availability number and gives the shuffle something to draw from.
  const pool = useMemo(() => unleveledPool.filter(inLevels), [unleveledPool, inLevels])

  // How much of the pool the learner has never seen. "349 questions" barely
  // moves as topics are picked; "229 new to you" is the number that decides
  // whether this draw is worth taking. Same attempt history the search rows and
  // question lists read (see QuestionAttemptBadge in CLAUDE.md) — server-side
  // only, so `tracked` is false for guests and the line is simply omitted.
  const newCount = useMemo(() => newQuestionCount(pool, attempted), [pool, attempted])

  return { pool, difficultyCounts, newCount }
}
