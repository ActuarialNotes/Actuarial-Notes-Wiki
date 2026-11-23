/**
 * **Try a similar one** (docs/redesign-spec.md §5.2): after a miss, another
 * question on the same concept, queued as the next question of the quiz.
 *
 * `pickSimilarQuestion` chooses it. A candidate is a question from the same
 * exam's bank that shares at least one concept with the missed one, and that a
 * quiz would be allowed to draw: not already in this quiz, not kept off the
 * syllabus, not withheld for an open critical finding.
 *
 * Among the candidates the best is, in this order:
 *   1. one sharing the missed question's first concept, the one the feedback
 *      leads with;
 *   2. the most concepts shared;
 *   3. one answered the same way (multiple choice after multiple choice);
 *   4. one the reader hasn't seen (`seenIds`);
 *   5. the closest difficulty;
 *   6. the fewest other concepts, so the retry is about the miss;
 *   7. the lowest id, so the same miss always offers the same question.
 *
 * **When no other question exists it returns null**, and the button isn't
 * drawn: a concept with one question has nothing to try again on.
 */

import type { Difficulty, Question } from './parser'
import { hasCriticalFinding } from './verification'

/** The concept a `wiki_link` entry names, case-blind (`Concepts/Bayes+Theorem` → `bayes theorem`). */
export function conceptKey(link: string): string {
  const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
  return clean.split('/').filter(Boolean).pop()?.trim().toLowerCase() ?? ''
}

const DIFFICULTY_RANK: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 }

export interface SimilarOptions {
  /** Ids already in the quiz: asked, on screen or still to come. */
  excludeIds?: Iterable<string>
  /** Ids the reader has answered before; an unseen question is preferred. */
  seenIds?: ReadonlySet<string>
  /** Serve questions with an open critical finding (the Settings switch a reviewer uses). */
  includeFlagged?: boolean
}

export function pickSimilarQuestion(
  missed: Question,
  pool: readonly Question[],
  { excludeIds = [], seenIds, includeFlagged = false }: SimilarOptions = {},
): Question | null {
  const concepts = [...new Set(missed.wiki_link.map(conceptKey).filter(Boolean))]
  if (concepts.length === 0) return null
  const first = concepts[0]
  const wanted = new Set(concepts)
  const excluded = new Set(excludeIds)
  excluded.add(missed.id)

  let best: { q: Question; rank: number[] } | null = null
  for (const q of pool) {
    if (q.exam !== missed.exam || excluded.has(q.id)) continue
    if (q.off_syllabus) continue
    if (!includeFlagged && hasCriticalFinding(q.verification)) continue
    const own = new Set(q.wiki_link.map(conceptKey).filter(Boolean))
    let shared = 0
    for (const c of own) if (wanted.has(c)) shared += 1
    if (shared === 0) continue
    // Lower is better at every place.
    const rank = [
      own.has(first) ? 0 : 1,
      -shared,
      q.type === missed.type ? 0 : 1,
      seenIds?.has(q.id) ? 1 : 0,
      Math.abs(DIFFICULTY_RANK[q.difficulty] - DIFFICULTY_RANK[missed.difficulty]),
      own.size - shared,
    ]
    if (!best || compare(rank, q.id, best.rank, best.q.id) < 0) best = { q, rank }
  }
  return best?.q ?? null
}

function compare(a: number[], aId: string, b: number[], bId: string): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i]
  }
  return aId < bId ? -1 : aId > bId ? 1 : 0
}
