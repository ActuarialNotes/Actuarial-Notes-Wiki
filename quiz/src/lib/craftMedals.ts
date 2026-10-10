/**
 * **Concept Craft's medals** (docs/concept-craft.md, "Medals") — the Pareto
 * rule as a win condition: most of a board's score is in a few of its
 * connections, and a medal is for finding those few first.
 *
 * A board of n concepts has n(n−1)/2 pairs, and every pair connects
 * (`connectionFor`), each worth its `connectionPoints`. **Gold** is 80% of the
 * score all those pairs hold, scored within the first 20% of them found;
 * **silver** 70% within 30%; **bronze** 60% within 40%. Ten concepts make 45
 * pairs, so gold is 80% of the board's score in its first 9 connections.
 *
 * Two things keep a medal honest:
 *
 * - **Capped at what can be done.** A board whose score is spread thin may hold
 *   no set of 20% of its pairs worth 80% of the whole — and every board starts
 *   from its seeds, so a pair can only be found once both its cards have been
 *   made. Each tier's target is the lesser of its share of the score and the
 *   most a play that respects the rules reaches in that many connections
 *   (`bestPlay`, a greedy over the board as it would grow). The play is a
 *   real one, so a capped target can always be met.
 * - **Counted on the least each pair scores.** The pairs the notes tie
 *   together are counted at their strength; every other pair at the least
 *   `connectionFor` can give it — its path through a concept tied to both —
 *   because reading each such pair's pages takes half a millisecond and a
 *   board has thousands. A pair can only read stronger when found, so the
 *   estimate never puts a medal out of reach.
 *
 * What counts is the order: a tier looks at the first `budget` connections
 * found, so once they are spent without reaching its target, that medal is
 * gone for this board — clear it, or add a pack, to play again. Nothing is
 * stored; the medal is re-read from the connections found, like the board.
 *
 * Nothing here touches the DOM, storage or the clock.
 */

import { FLOOR_STRENGTH, PATH_WEIGHT, connectionPoints, pairKey, type BoardState, type CraftGraph } from './conceptCraft'
import { otherEnd } from './conceptGraph'

export type MedalId = 'gold' | 'silver' | 'bronze'

export interface MedalRule {
  id: MedalId
  label: string
  /** The share of the board's score to reach… */
  score: number
  /** …within this share of its pairs. */
  connections: number
  /** The medal's colour — the league ladder's emblems (`LEAGUE_TIERS`). */
  color: string
}

/** Best first. */
export const MEDALS: readonly MedalRule[] = [
  { id: 'gold', label: 'Gold', score: 0.8, connections: 0.2, color: '#eab308' },
  { id: 'silver', label: 'Silver', score: 0.7, connections: 0.3, color: '#9ca3af' },
  { id: 'bronze', label: 'Bronze', score: 0.6, connections: 0.4, color: '#b08d57' },
]

export interface MedalTarget extends MedalRule {
  /** How many connections the medal may use. */
  budget: number
  /** The score to reach within them. */
  target: number
  /** The target is below the rule's share, because no play reaches that share in `budget`. */
  capped: boolean
}

/** A board's medals, worked out once per board: what each asks for. */
export interface MedalPlan {
  /** Concepts on the board, made or not. */
  concepts: number
  /** Every pair of them — every connection there is to find. */
  pairs: number
  /** The score every pair together holds. */
  total: number
  /** Best first; empty for a board with no pair to find. */
  tiers: MedalTarget[]
}

const norm = (name: string) => name.trim().toLowerCase()

/** The share of `n`, rounded down, at least 1 — 20% of 45 pairs is 9 (and float error is not a pair). */
function shareOf(n: number, share: number): number {
  return Math.max(1, Math.floor(n * share + 1e-9))
}

/**
 * The least each pair can score, for every pair worth more than 1: the
 * graph's own connections at their strength, any other pair at the strength
 * of its best path through a concept tied to both (`connectionFor`'s
 * `PATH_WEIGHT`). Pairs not listed score 1. Keyed by `pairKey`.
 */
export function leastPoints(graph: CraftGraph): Map<string, number> {
  const out = new Map<string, number>()
  for (const c of graph.connections) out.set(c.key, connectionPoints(c.strength))
  const path = new Map<string, number>()
  for (const [mid, list] of graph.neighbours) {
    for (let i = 0; i < list.length; i++) {
      const x = norm(otherEnd(list[i], mid))
      for (let j = i + 1; j < list.length; j++) {
        const y = norm(otherEnd(list[j], mid))
        if (x === y) continue
        const key = pairKey(x, y)
        if (graph.byKey.has(key)) continue
        const through = (list[i].strength * list[j].strength) / 100
        if (through > (path.get(key) ?? 0)) path.set(key, through)
      }
    }
  }
  for (const [key, through] of path) {
    const points = connectionPoints(Math.max(FLOOR_STRENGTH, Math.round(PATH_WEIGHT * through)))
    if (points > 1) out.set(key, points)
  }
  return out
}

/**
 * The score after each connection of one play of the board, from its seeds,
 * that keeps to the rules — a pair is found only once both its cards are in
 * hand, and finding it makes what it makes — taking at each step the pair
 * worth most. A pair that makes something can be weighed by what it and the
 * best pair each card it makes could then join score — all together
 * (`ahead: 'sum'`, which makes eagerly) or per connection spent (`'rate'`,
 * which takes what is on the table first) — or by its own points (`'none'`). `steps` connections at most;
 * shorter when every reachable pair is found first. `scores[i]` is the score
 * after i + 1 connections, `picks[i]` the pair found (null for one of the pairs
 * scoring 1, which are all alike).
 */
export function bestPlay(
  graph: CraftGraph,
  seeds: readonly string[],
  points: ReadonlyMap<string, number>,
  steps: number,
  ahead: 'none' | 'sum' | 'rate',
): { scores: number[]; picks: (string | null)[] } {
  const concepts = new Set(graph.concepts.map(norm))
  // The pairs worth more than 1, by card.
  const adjacent = new Map<string, { other: string; key: string; points: number }[]>()
  for (const [key, p] of points) {
    const bar = key.indexOf('|')
    const x = key.slice(0, bar)
    const y = key.slice(bar + 1)
    if (!concepts.has(x) || !concepts.has(y)) continue
    for (const [from, to] of [[x, y], [y, x]]) {
      const list = adjacent.get(from)
      if (list) list.push({ other: to, key, points: p })
      else adjacent.set(from, [{ other: to, key, points: p }])
    }
  }
  const makes = new Map<string, string[]>()
  for (const [key, recipes] of graph.makes) {
    const made = recipes.map(r => norm(r.makes)).filter(m => concepts.has(m))
    if (made.length) makes.set(key, made)
  }

  const held = new Set<string>()
  const taken = new Set<string>()
  // Points are whole numbers to 100: one bucket of pair keys per value, highest scanned first.
  const buckets: string[][] = Array.from({ length: 101 }, () => [])
  let top = 0
  let valuedInHand = 0
  let fillerTaken = 0
  // Of each card not in hand, the most it could score against one in hand.
  const bestTo = new Map<string, number>()
  // The pairs in hand that make something, not yet found.
  const makers = new Set<string>()

  const hold = (name: string) => {
    if (held.has(name) || !concepts.has(name)) return
    held.add(name)
    bestTo.delete(name)
    for (const { other, key, points: p } of adjacent.get(name) ?? []) {
      if (held.has(other)) {
        valuedInHand++
        buckets[Math.min(100, p)].push(key)
        if (p > top) top = Math.min(100, p)
        if (makes.has(key) && !taken.has(key)) makers.add(key)
      } else if (p > (bestTo.get(other) ?? 1)) bestTo.set(other, p)
    }
  }
  seeds.forEach(s => hold(norm(s)))

  const take = (key: string) => {
    taken.add(key)
    makers.delete(key)
    for (const m of makes.get(key) ?? []) hold(m)
  }

  const scores: number[] = []
  const picks: (string | null)[] = []
  let score = 0
  while (scores.length < steps) {
    // The best pair in hand…
    while (top > 0) {
      const bucket = buckets[top]
      while (bucket.length && taken.has(bucket[bucket.length - 1])) bucket.pop()
      if (bucket.length) break
      top--
    }
    const best = top > 0 ? buckets[top][buckets[top].length - 1] : null
    let pick = best
    let gain = best ? top : 0
    // …or, looking ahead, a pair that makes something: worth its points and
    // the best pair each card it makes could then join, spread over the
    // connections that takes — and only while there are that many left.
    if (ahead !== 'none') {
      const left = steps - scores.length
      let worth = gain
      for (const key of makers) {
        const made = (makes.get(key) ?? []).filter(m => !held.has(m))
        const reached = made.slice(0, left - 1)
        if (reached.length === 0) continue
        const value = reached.reduce((sum, m) => sum + (bestTo.get(m) ?? 1), points.get(key) ?? 1)
        const weighed = ahead === 'rate' ? value / (1 + reached.length) : value
        if (weighed > worth) {
          worth = weighed
          pick = key
          gain = points.get(key) ?? 1
        }
      }
    }
    if (pick) {
      take(pick)
    } else {
      // Nothing listed left in hand: a pair that scores 1, if one is left.
      const inHand = (held.size * (held.size - 1)) / 2
      if (inHand - valuedInHand - fillerTaken <= 0) break
      fillerTaken++
      gain = 1
    }
    score += gain
    scores.push(score)
    picks.push(pick)
  }
  return { scores, picks }
}

/** What each medal asks of this board — its connections and the score to reach in them. */
export function medalPlan(graph: CraftGraph, seeds: readonly string[]): MedalPlan {
  const n = graph.concepts.length
  const pairs = (n * (n - 1)) / 2
  if (pairs === 0) return { concepts: n, pairs, total: 0, tiers: [] }
  const points = leastPoints(graph)
  let valued = 0
  let total = 0
  for (const p of points.values()) {
    valued++
    total += p
  }
  total += pairs - valued
  const longest = Math.max(...MEDALS.map(m => shareOf(pairs, m.connections)))
  // Three plays, each a real one: the best of them after each connection is a
  // score that can be reached in that many.
  const plays = (['none', 'sum', 'rate'] as const).map(ahead => bestPlay(graph, seeds, points, longest, ahead).scores)
  const reach = (budget: number) =>
    Math.max(0, ...plays.map(play => (play.length ? play[Math.min(budget, play.length) - 1] : 0)))
  const tiers = MEDALS.map(rule => {
    const budget = shareOf(pairs, rule.connections)
    const share = Math.ceil(total * rule.score)
    const possible = reach(budget)
    return { ...rule, budget, target: Math.max(1, Math.min(share, possible)), capped: possible < share }
  })
  return { concepts: n, pairs, total, tiers }
}

export type MedalStatus = 'won' | 'open' | 'lost'

export interface MedalProgress extends MedalTarget {
  /** Connections counted so far — at most the budget. */
  used: number
  /** What they scored. */
  scored: number
  status: MedalStatus
}

export interface MedalStanding {
  /** The best medal won, if any. */
  medal: MedalProgress | null
  /** The best medal still to play for, better than the one won. */
  chasing: MedalProgress | null
  /** Best first. */
  tiers: MedalProgress[]
}

/** Where the board stands against each medal: the first `budget` connections found, and what they scored. */
export function medalStanding(plan: MedalPlan, state: BoardState): MedalStanding {
  const running: number[] = []
  let sum = 0
  for (const c of state.found) running.push((sum += connectionPoints(c.strength)))
  const tiers = plan.tiers.map((tier): MedalProgress => {
    const used = Math.min(tier.budget, running.length)
    const scored = used > 0 ? running[used - 1] : 0
    const status: MedalStatus = scored >= tier.target ? 'won' : used >= tier.budget ? 'lost' : 'open'
    return { ...tier, used, scored, status }
  })
  const medal = tiers.find(t => t.status === 'won') ?? null
  const better = medal ? tiers.slice(0, tiers.indexOf(medal)) : tiers
  return { medal, chasing: better.find(t => t.status === 'open') ?? null, tiers }
}

/**
 * The medals a find won: those won now that weren't before — best first. What
 * the page celebrates.
 */
export function medalsWon(before: MedalStanding, after: MedalStanding): MedalProgress[] {
  const had = new Set(before.tiers.filter(t => t.status === 'won').map(t => t.id))
  return after.tiers.filter(t => t.status === 'won' && !had.has(t.id))
}
