import { describe, expect, it } from 'vitest'
import type { Difficulty } from './parser'
import {
  DIFFICULTY_LEVELS,
  difficultyFromParam,
  difficultyLevelsFromParam,
  difficultyLevelsFromStored,
  difficultyLevelsToParam,
  difficultyWeight,
  drawByDifficulty,
  normalizeDifficultyLevels,
  orderByDifficulty,
  toggleDifficultyLevel,
} from './quizDifficulty'

/** A deterministic PRNG (mulberry32) so the draws are reproducible. */
function seeded(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pool(easy: number, medium: number, hard: number) {
  const out: { id: string; difficulty: Difficulty }[] = []
  for (let i = 0; i < easy; i++) out.push({ id: `e${i}`, difficulty: 'easy' })
  for (let i = 0; i < medium; i++) out.push({ id: `m${i}`, difficulty: 'medium' })
  for (let i = 0; i < hard; i++) out.push({ id: `h${i}`, difficulty: 'hard' })
  return out
}

function tally(items: { difficulty: Difficulty }[]) {
  const t = { easy: 0, medium: 0, hard: 0 }
  for (const q of items) t[q.difficulty]++
  return t
}

describe('difficultyWeight', () => {
  it('peaks at the target level and never reaches zero', () => {
    expect(difficultyWeight('easy', 0)).toBe(1)
    expect(difficultyWeight('medium', 0)).toBeLessThan(0.1)
    expect(difficultyWeight('hard', 0)).toBeGreaterThan(0)
    expect(difficultyWeight('hard', 0)).toBeLessThan(difficultyWeight('medium', 0))
  })

  it('blends the two neighbours halfway between stops', () => {
    expect(difficultyWeight('easy', 0.25)).toBeCloseTo(difficultyWeight('medium', 0.25))
  })
})

describe('drawByDifficulty', () => {
  it('leans hard at the Hard stop', () => {
    const draw = drawByDifficulty(pool(100, 100, 100), 30, 1, seeded(1))
    expect(draw).toHaveLength(30)
    expect(tally(draw).hard).toBeGreaterThanOrEqual(25)
    expect(tally(draw).easy).toBe(0)
  })

  it('leans easy at the Easy stop', () => {
    const t = tally(drawByDifficulty(pool(100, 100, 100), 30, 0, seeded(2)))
    expect(t.easy).toBeGreaterThanOrEqual(25)
    expect(t.hard).toBe(0)
  })

  it('fills from the neighbours when the target level runs short', () => {
    const draw = drawByDifficulty(pool(2, 50, 50), 10, 0, seeded(3))
    expect(draw).toHaveLength(10)
    const t = tally(draw)
    expect(t.easy).toBe(2)
    // The next-nearest level fills the rest before the far one does.
    expect(t.medium).toBeGreaterThan(t.hard)
  })

  it('never draws a question twice or more than the pool holds', () => {
    const p = pool(3, 3, 3)
    const draw = drawByDifficulty(p, 50, 0.5, seeded(4))
    expect(draw).toHaveLength(9)
    expect(new Set(draw.map(q => q.id)).size).toBe(9)
  })

  it('does not run the quiz from easy to hard', () => {
    // Over many seeds, an Easy-to-Hard sorted draw would always open on the
    // nearest level; the shuffle means the mid-slider draw opens on anything.
    const openers = new Set<Difficulty>()
    for (let s = 0; s < 40; s++) openers.add(drawByDifficulty(pool(10, 10, 10), 30, 0.25, seeded(s))[0].difficulty)
    expect(openers.size).toBeGreaterThan(1)
  })
})

describe('orderByDifficulty', () => {
  it('keeps every item', () => {
    const p = pool(4, 5, 6)
    expect(orderByDifficulty(p, 0.9, seeded(9))).toHaveLength(15)
  })
})

describe('legacy level param', () => {
  it('reads a whole percentage back to a lean', () => {
    expect(difficultyFromParam('33')).toBeCloseTo(0.33)
    expect(difficultyFromParam('250')).toBe(1)
  })

  it('reads a missing or garbled param as none', () => {
    expect(difficultyFromParam(null)).toBeNull()
    expect(difficultyFromParam('')).toBeNull()
    expect(difficultyFromParam('hard')).toBeNull()
  })
})

describe('difficulty levels', () => {
  it('normalizes to known levels in menu order, empty meaning all', () => {
    expect(normalizeDifficultyLevels(['hard', 'easy', 'hard', 'nope'])).toEqual(['easy', 'hard'])
    expect(normalizeDifficultyLevels([])).toEqual(['easy', 'medium', 'hard'])
  })

  it('toggles a level but never unticks the last one', () => {
    expect(toggleDifficultyLevel(['easy', 'medium', 'hard'], 'medium')).toEqual(['easy', 'hard'])
    expect(toggleDifficultyLevel(['hard'], 'easy')).toEqual(['easy', 'hard'])
    expect(toggleDifficultyLevel(['hard'], 'hard')).toEqual(['hard'])
  })

  it('rides the URL only when it filters something', () => {
    expect(difficultyLevelsToParam(['easy', 'medium', 'hard'])).toBeNull()
    expect(difficultyLevelsToParam(['hard', 'easy'])).toBe('easy,hard')
    expect(difficultyLevelsFromParam('easy,hard')).toEqual(['easy', 'hard'])
    expect(difficultyLevelsFromParam('Hard')).toEqual(['hard'])
    expect(difficultyLevelsFromParam('easy,medium,hard')).toBeNull()
    expect(difficultyLevelsFromParam(null)).toBeNull()
    expect(difficultyLevelsFromParam('')).toBeNull()
  })

  it('defaults a missing or garbled stored value to every level', () => {
    expect(difficultyLevelsFromStored(null)).toEqual(DIFFICULTY_LEVELS)
    expect(difficultyLevelsFromStored('nope')).toEqual(DIFFICULTY_LEVELS)
    expect(difficultyLevelsFromStored('medium,hard')).toEqual(['medium', 'hard'])
  })
})
