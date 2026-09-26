// How hard a quiz's draw leans — the difficulty slider in the quiz builder's
// settings menu.
//
// The slider is continuous but the bank isn't: a question is easy, medium or
// hard, full stop. So the slider doesn't filter, it *weights*. Its position is a
// target on a 0–1 line where easy sits at 0, medium at ½ and hard at 1, and each
// question is drawn with a weight that falls off with its distance from the
// target. At a stop the named level dominates the draw; between two stops the
// draw blends them; and because nothing is ever weighted to zero, a pool with too
// few questions at the target still fills the quiz from its neighbours rather
// than coming up short.

import type { Difficulty } from './parser'

/** Where the slider sits: 0 is Easy, ½ is Med, 1 is Hard. */
export type DifficultyTarget = number

export const DEFAULT_DIFFICULTY_TARGET: DifficultyTarget = 0.5

export const DIFFICULTY_STORAGE_KEY = 'actuarial_quiz_difficulty_v1'

/** Each level's place on the slider's line. */
const LEVEL_POSITION: Record<Difficulty, number> = { easy: 0, medium: 0.5, hard: 1 }

/**
 * How quickly a question's weight falls off with its distance from the target.
 * At 0.3, a question one stop away (distance ½) is drawn about 1/16 as often as
 * one at the target, and one two stops away effectively never while a closer
 * one remains.
 */
const SPREAD = 0.3

/** The three words the slider says — nothing finer, however far it is dragged. */
export type DifficultyLabel = 'Easy' | 'Med' | 'Hard'

export function clampDifficultyTarget(value: number): DifficultyTarget {
  if (!Number.isFinite(value)) return DEFAULT_DIFFICULTY_TARGET
  return Math.min(1, Math.max(0, value))
}

/** The label for a position: whichever stop it is nearest. */
export function difficultyLabel(target: DifficultyTarget): DifficultyLabel {
  const t = clampDifficultyTarget(target)
  if (t < 0.25) return 'Easy'
  if (t > 0.75) return 'Hard'
  return 'Med'
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

/** The slider position as it rides in a URL: a whole-number percentage. */
export function difficultyToParam(target: DifficultyTarget): string {
  return String(Math.round(clampDifficultyTarget(target) * 100))
}

/** A `level` URL param back to a target, or null for a missing/garbled one. */
export function difficultyFromParam(value: string | null | undefined): DifficultyTarget | null {
  if (value == null || value.trim() === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? clampDifficultyTarget(n / 100) : null
}

/** The stored position, or the default. Pure — `raw` is what localStorage held. */
export function difficultyFromStored(raw: string | null): DifficultyTarget {
  if (raw == null || raw.trim() === '') return DEFAULT_DIFFICULTY_TARGET
  const n = Number(raw)
  return Number.isFinite(n) ? clampDifficultyTarget(n) : DEFAULT_DIFFICULTY_TARGET
}

export function loadDifficultyTarget(): DifficultyTarget {
  try {
    return difficultyFromStored(localStorage.getItem(DIFFICULTY_STORAGE_KEY))
  } catch {
    return DEFAULT_DIFFICULTY_TARGET
  }
}

export function saveDifficultyTarget(target: DifficultyTarget): void {
  try {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, String(clampDifficultyTarget(target)))
  } catch {
    /* ignore quota/private-mode errors */
  }
}
