// How hard a quiz's draw is. Two tools live here: the quiz builder's difficulty
// multi-select (at the bottom — a plain filter on the bank's three levels), and
// the weighted lean that Quiz Battle, Actuaria and links made under the old
// builder slider still draw with.
//
// The lean is continuous but the bank isn't: a question is easy, medium or
// hard, full stop. So the slider doesn't filter, it *weights*. Its position is a
// target on a 0–1 line where easy sits at 0, medium at ½ and hard at 1, and each
// question is drawn with a weight that falls off with its distance from the
// target. At a stop the named level dominates the draw; between two stops the
// draw blends them; and because nothing is ever weighted to zero, a pool with too
// few questions at the target still fills the quiz from its neighbours rather
// than coming up short.

import type { Difficulty } from './parser'

/** Where the lean points: 0 is Easy, ½ is Med, 1 is Hard. */
export type DifficultyTarget = number

export const DEFAULT_DIFFICULTY_TARGET: DifficultyTarget = 0.5

/** Each level's place on the slider's line. */
const LEVEL_POSITION: Record<Difficulty, number> = { easy: 0, medium: 0.5, hard: 1 }

/**
 * How quickly a question's weight falls off with its distance from the target.
 * At 0.3, a question one stop away (distance ½) is drawn about 1/16 as often as
 * one at the target, and one two stops away effectively never while a closer
 * one remains.
 */
const SPREAD = 0.3

export function clampDifficultyTarget(value: number): DifficultyTarget {
  if (!Number.isFinite(value)) return DEFAULT_DIFFICULTY_TARGET
  return Math.min(1, Math.max(0, value))
}

/** A question's relative draw weight at `target`. Always > 0. */
export function difficultyWeight(difficulty: Difficulty, target: DifficultyTarget): number {
  const position = LEVEL_POSITION[difficulty] ?? LEVEL_POSITION.medium
  const d = (position - clampDifficultyTarget(target)) / SPREAD
  // Floored so a far level still orders *after* the near ones rather than
  // underflowing to 0, which would tie it with everything else far away.
  return Math.max(Math.exp(-d * d), 1e-9)
}

/**
 * The whole pool in weighted-random order: questions near the target tend to
 * come first, everything is still in there. (Efraimidis–Spirakis: each item
 * draws u^(1/w) and the list is sorted by that key, which is a weighted sample
 * without replacement at every prefix.) Taking the first n is the draw; handing
 * the whole order to a greedy picker makes it prefer the target among ties.
 */
export function orderByDifficulty<T extends { difficulty: Difficulty }>(
  pool: readonly T[],
  target: DifficultyTarget,
  random: () => number = Math.random,
): T[] {
  return pool
    .map(item => {
      // 1 - random() is in (0, 1], so the log is finite.
      const u = 1 - random()
      return { item, key: Math.log(u) / difficultyWeight(item.difficulty, target) }
    })
    .sort((a, b) => b.key - a.key)
    .map(entry => entry.item)
}

/**
 * `count` questions drawn toward `target`, in a shuffled order — the weighted
 * order puts the easiest-to-hit level first, and a quiz shouldn't run from its
 * easy questions to its hard ones.
 */
export function drawByDifficulty<T extends { difficulty: Difficulty }>(
  pool: readonly T[],
  count: number,
  target: DifficultyTarget,
  random: () => number = Math.random,
): T[] {
  return shuffle(orderByDifficulty(pool, target, random).slice(0, Math.max(0, count)), random)
}

/** Fisher–Yates, in place on a copy. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * A `level` URL param back to a target, or null for a missing/garbled one. The
 * quiz builder no longer writes one (it chooses levels — see below), but a
 * link made under the slider still leans its draw the way it used to.
 */
export function difficultyFromParam(value: string | null | undefined): DifficultyTarget | null {
  if (value == null || value.trim() === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? clampDifficultyTarget(n / 100) : null
}

// ── The quiz builder's difficulty choice ─────────────────────────────────────
// A multi-select over the bank's three levels. Unlike the weighted lean above,
// this *is* a filter: a level left unticked is out of the pool, so the deck
// card's question count says exactly what the choice leaves to draw from.

/** The levels, in the order the menu lists them. */
export const DIFFICULTY_LEVELS: readonly Difficulty[] = ['easy', 'medium', 'hard']

/** What each level is called on screen. */
export const DIFFICULTY_LEVEL_LABEL: Record<Difficulty, string> = { easy: 'Easy', medium: 'Med', hard: 'Hard' }

export const DIFFICULTY_LEVELS_STORAGE_KEY = 'actuarial_quiz_difficulty_levels_v1'

/**
 * A level set cleaned up: known levels only, no repeats, in menu order. An
 * empty set means nothing to draw from, which is never a useful choice, so it
 * reads as every level.
 */
export function normalizeDifficultyLevels(levels: readonly string[]): Difficulty[] {
  const picked = DIFFICULTY_LEVELS.filter(level => levels.includes(level))
  return picked.length > 0 ? picked : [...DIFFICULTY_LEVELS]
}

/** Whether a set leaves every level in — i.e. filters nothing. */
export function isAllDifficultyLevels(levels: readonly Difficulty[]): boolean {
  return DIFFICULTY_LEVELS.every(level => levels.includes(level))
}

/**
 * Tick or untick one level. The last ticked level can't be unticked — a quiz
 * drawn from no level has no questions.
 */
export function toggleDifficultyLevel(levels: readonly Difficulty[], level: Difficulty): Difficulty[] {
  if (levels.includes(level)) {
    return levels.length > 1 ? DIFFICULTY_LEVELS.filter(l => l !== level && levels.includes(l)) : [...levels]
  }
  return DIFFICULTY_LEVELS.filter(l => l === level || levels.includes(l))
}

/** The set as a `levels` URL param, or null when it filters nothing. */
export function difficultyLevelsToParam(levels: readonly Difficulty[]): string | null {
  const clean = normalizeDifficultyLevels(levels)
  return isAllDifficultyLevels(clean) ? null : clean.join(',')
}

/** A `levels` URL param back to a set, or null for a missing one (no filter). */
export function difficultyLevelsFromParam(value: string | null | undefined): Difficulty[] | null {
  if (value == null || value.trim() === '') return null
  const clean = normalizeDifficultyLevels(value.split(',').map(v => v.trim().toLowerCase()))
  return isAllDifficultyLevels(clean) ? null : clean
}

/** The stored set, or every level. Pure — `raw` is what localStorage held. */
export function difficultyLevelsFromStored(raw: string | null): Difficulty[] {
  if (raw == null || raw.trim() === '') return [...DIFFICULTY_LEVELS]
  return normalizeDifficultyLevels(raw.split(','))
}

export function loadDifficultyLevels(): Difficulty[] {
  try {
    return difficultyLevelsFromStored(localStorage.getItem(DIFFICULTY_LEVELS_STORAGE_KEY))
  } catch {
    return [...DIFFICULTY_LEVELS]
  }
}

export function saveDifficultyLevels(levels: readonly Difficulty[]): void {
  try {
    localStorage.setItem(DIFFICULTY_LEVELS_STORAGE_KEY, normalizeDifficultyLevels(levels).join(','))
  } catch {
    /* ignore quota/private-mode errors */
  }
}
