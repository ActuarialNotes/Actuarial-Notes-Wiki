import { describe, expect, it } from 'vitest'
import { buildConceptGraph, type GraphQuestion } from './conceptGraph'
import {
  EMPTY_PROGRESS,
  boardState,
  connectionFor,
  connectionPoints,
  craftGraph,
  seedConcepts,
  withConnection,
  type CraftGraph,
  type CraftProgress,
} from './conceptCraft'
import { MEDALS, bestPlay, leastPoints, medalPlan, medalStanding, medalsWon } from './craftMedals'

function topic(pages: Record<string, string>, pairs: [string, string][] = []) {
  const page = (name: string) => pages[name]
  const questions: GraphQuestion[] = pairs.map(([a, b], i) => ({ id: `q${i}`, links: [`Concepts/${a}`, `Concepts/${b}`] }))
  return craftGraph(buildConceptGraph({ concepts: Object.keys(pages), page, questions, lines: [] }), page)
}

// conceptCraft.test.ts's elements: Fire + Water → Steam, Earth + Water → Mud,
// Air + Steam → Cloud; the elements tied by questions at 20 (4 points), each
// made concept to its ingredients at 40 (16 points), Lone tied to nothing.
const GRAPH = topic(
  {
    Fire: '**Fire** is hot.',
    Water: '**Water** is wet.',
    Earth: '**Earth** is solid.',
    Air: '**Air** is light.',
    Steam: '**Steam** is [[Water]] heated by [[Fire]].',
    Mud: '**Mud** is [[Earth]] soaked with [[Water]].',
    Cloud: '**Cloud** is [[Steam]] carried on the [[Air]].',
    Lone: '**Lone** stands apart.',
  },
  [['Fire', 'Water'], ['Water', 'Earth'], ['Earth', 'Air'], ['Fire', 'Air'], ['Steam', 'Air']],
)
const SEEDS = seedConcepts(GRAPH)
const PLAN = medalPlan(GRAPH, SEEDS)
const tier = (id: string) => PLAN.tiers.find(t => t.id === id)!

function found(...pairs: [string, string][]): CraftProgress {
  return pairs.reduce<CraftProgress>((p, [a, b]) => withConnection(p, { a, b }), EMPTY_PROGRESS)
}

/**
 * Play `picks` on the board for real — each pair found only with both its
 * cards in hand — and return the score after each; a pair scoring 1 counts 1.
 */
function replay(graph: CraftGraph, seeds: readonly string[], picks: readonly (string | null)[]): number[] {
  let progress = EMPTY_PROGRESS
  let score = 0
  return picks.map(key => {
    if (key) {
      const [a, b] = key.split('|')
      const inHand = new Set(boardState(graph, seeds, progress).held.map(n => n.toLowerCase()))
      expect(inHand.has(a) && inHand.has(b)).toBe(true)
      progress = withConnection(progress, { a, b })
      score += connectionPoints(connectionFor(graph, a, b)!.strength)
    } else score += 1
    return score
  })
}

describe('the medal plan', () => {
  it('counts every pair on the board, at the least each scores', () => {
    // 8 concepts, 28 pairs: the 11 the graph draws (5 × 4 + 6 × 16) and 17 more,
    // whose paths are too faint to score more than 1.
    expect(PLAN.concepts).toBe(8)
    expect(PLAN.pairs).toBe(28)
    expect(PLAN.total).toBe(5 * 4 + 6 * 16 + 17)
  })

  it('gives each medal its share of the pairs: 20%, 30%, 40%, rounded down', () => {
    expect(PLAN.tiers.map(t => [t.id, t.budget])).toEqual([['gold', 5], ['silver', 8], ['bronze', 11]])
  })

  it('works out the user’s example: ten concepts, 45 pairs, gold in 9', () => {
    const ten = topic(Object.fromEntries('ABCDEFGHIJ'.split('').map(c => [c, `**${c}**.`])))
    const plan = medalPlan(ten, seedConcepts(ten))
    expect(plan.pairs).toBe(45)
    expect(plan.tiers[0]).toMatchObject({ id: 'gold', budget: 9 })
    // Every pair scores 1, so 9 connections score 9 — not 80% of 45 — and gold is capped there.
    expect(plan.total).toBe(45)
    expect(plan.tiers[0]).toMatchObject({ target: 9, capped: true })
  })

  it('caps a target at what a play from the seeds can reach', () => {
    // Five connections from Fire, Water, Earth, Air and Lone: make Steam, find
    // both its strong pairs, make Mud or Cloud and one of its — 56, not 80% of 133.
    expect(tier('gold')).toMatchObject({ target: 56, capped: true })
    for (const t of PLAN.tiers) expect(t.target).toBeLessThanOrEqual(Math.ceil(PLAN.total * t.score))
  })

  it('is a target a real play reaches', () => {
    const points = leastPoints(GRAPH)
    for (const ahead of ['none', 'sum', 'rate'] as const) {
      const play = bestPlay(GRAPH, SEEDS, points, tier('bronze').budget, ahead)
      expect(replay(GRAPH, SEEDS, play.picks)).toEqual(play.scores)
    }
  })

  it('has no medals for a board with no pair', () => {
    const one = topic({ Alone: '**Alone**.' })
    expect(medalPlan(one, ['Alone']).tiers).toEqual([])
  })

  it('lists the medals best first', () => {
    expect(MEDALS.map(m => m.id)).toEqual(['gold', 'silver', 'bronze'])
  })
})

describe('where the board stands', () => {
  const BEST = found(['Fire', 'Water'], ['Fire', 'Steam'], ['Steam', 'Water'], ['Earth', 'Water'], ['Mud', 'Water'])

  it('wins gold for the best five connections first', () => {
    const standing = medalStanding(PLAN, boardState(GRAPH, SEEDS, BEST))
    expect(standing.medal).toMatchObject({ id: 'gold', used: 5, scored: 56 })
    // Nothing better to chase; silver and bronze, with more connections to come, still open.
    expect(standing.chasing).toBeNull()
    expect(standing.tiers.map(t => t.status)).toEqual(['won', 'open', 'open'])
  })

  it('counts only the first connections of each medal’s share', () => {
    // Five faint pairs first spend gold's five; the strong ones after count for silver.
    const slow = found(['Fire', 'Lone'], ['Water', 'Lone'], ['Earth', 'Lone'], ['Air', 'Lone'], ['Fire', 'Earth'])
    const state = boardState(GRAPH, SEEDS, slow)
    const standing = medalStanding(PLAN, state)
    expect(standing.tiers[0]).toMatchObject({ id: 'gold', status: 'lost', used: 5, scored: 5 })
    expect(standing.medal).toBeNull()
    expect(standing.chasing).toMatchObject({ id: 'silver', status: 'open', used: 5 })
  })

  it('chases the best medal still open, above the one won', () => {
    const start = medalStanding(PLAN, boardState(GRAPH, SEEDS, EMPTY_PROGRESS))
    expect(start.medal).toBeNull()
    expect(start.chasing?.id).toBe('gold')
    expect(start.tiers.every(t => t.status === 'open' && t.scored === 0)).toBe(true)
  })

  it('says which medals a find won', () => {
    const before = medalStanding(PLAN, boardState(GRAPH, SEEDS, { found: BEST.found.slice(0, 4) }))
    const after = medalStanding(PLAN, boardState(GRAPH, SEEDS, BEST))
    expect(medalsWon(before, after).map(m => m.id)).toEqual(['gold'])
    expect(medalsWon(after, after)).toEqual([])
  })
})
