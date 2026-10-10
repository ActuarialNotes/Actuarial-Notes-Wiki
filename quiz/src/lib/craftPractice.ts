/**
 * **Concept Craft's practice score** (docs/concept-craft.md, "Score") — what a
 * connection's **Practice** quiz earned.
 *
 * A connection's card starts an ordinary quiz on the questions that test the
 * pair (`practiceQuestions`). The board can't see the quiz, so the card leaves a
 * note — which connection, which questions (`startCraftPractice`) — and the
 * quiz, when it completes, hands its right answers here
 * (`settleCraftPractice`, called from `completeQuiz`). A quiz that isn't that
 * practice (a different set of questions) settles nothing.
 *
 * Kept to the best run per connection: a connection practised again earns more
 * only by getting more right, so the score can't be farmed by repetition.
 *
 * Deliberately standalone — localStorage and nothing else — because the quiz
 * store is in the main bundle and must not pull the concept graph in with it.
 */

const PENDING_KEY = 'craft.practice.pending'
const SCORES_KEY = 'craft.practice.v1'

/** The best practice run on each connection: its `pairKey` → questions answered right. */
export type CraftPracticeScores = Record<string, number>

interface Pending {
  key: string
  ids: string[]
}

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as unknown) : null
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch { /* quota or private mode: the practice goes unscored */ }
}

/** Every field checked on the way in; anything else dropped. */
export function parsePracticeScores(raw: unknown): CraftPracticeScores {
  const out: CraftPracticeScores = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (key.includes('|') && typeof value === 'number' && Number.isFinite(value) && value > 0) out[key] = Math.floor(value)
  }
  return out
}

function parsePending(raw: unknown): Pending | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (typeof r.key !== 'string' || !r.key.includes('|') || !Array.isArray(r.ids)) return null
  const ids = r.ids.filter((x): x is string => typeof x === 'string')
  return ids.length ? { key: r.key, ids } : null
}

export function readPracticeScores(): CraftPracticeScores {
  return parsePracticeScores(readJson(SCORES_KEY))
}

/** A connection's practice is about to start on these questions. */
export function startCraftPractice(key: string, ids: readonly string[]) {
  writeJson(PENDING_KEY, { key, ids: [...ids] })
}

/**
 * The scores after a quiz on `served` got `correct` right: when the quiz is the
 * pending practice — the same questions — its connection keeps the better of
 * its old best and this run. Pure; `settleCraftPractice` is the stored side.
 */
export function practiceResult(
  pending: Pending | null,
  scores: CraftPracticeScores,
  served: readonly string[],
  correct: readonly string[],
): CraftPracticeScores | null {
  if (!pending) return null
  const asked = new Set(served)
  if (asked.size === 0 || ![...asked].every(id => pending.ids.includes(id))) return null
  const right = new Set(correct.filter(id => asked.has(id))).size
  if (right <= (scores[pending.key] ?? 0)) return scores
  return { ...scores, [pending.key]: right }
}

/** Called when any quiz completes: score it if it was a connection's practice. */
export function settleCraftPractice(served: readonly string[], correct: readonly string[]) {
  const pending = parsePending(readJson(PENDING_KEY))
  if (!pending) return
  try {
    localStorage.removeItem(PENDING_KEY)
  } catch { /* nothing to do */ }
  const next = practiceResult(pending, readPracticeScores(), served, correct)
  if (next) writeJson(SCORES_KEY, next)
}

/** Clearing the board clears what its practice earned. */
export function clearPracticeScores() {
  try {
    localStorage.removeItem(SCORES_KEY)
    localStorage.removeItem(PENDING_KEY)
  } catch { /* nothing to do */ }
}
