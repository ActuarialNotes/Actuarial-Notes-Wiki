import { describe, expect, it } from 'vitest'
import { buildConceptGraph } from './conceptGraph'
import {
  EMPTY_PROGRESS,
  MIN_TOPIC_CONCEPTS,
  bridgePlan,
  challengeOrder,
  combine,
  commonNeighbours,
  conceptConnections,
  craftTopics,
  dailyChallenge,
  foundConnections,
  isBridged,
  isPlaced,
  objectiveBlocks,
  objectiveTitle,
  pairKey,
  placedConcepts,
  topicTally,
  withConnection,
  withPlaced,
  type CraftProgress,
} from './conceptCraft'

// A chain A — B — C — D, a spur A — E, and F on its own: every page links
// the next, so each connection is one link (strength 40).
const PAGES: Record<string, string> = {
  A: 'A leads to [[B]] and to [[E]].',
  B: 'B leads to [[C]].',
  C: 'C leads to [[D]].',
  D: 'D is the end.',
  E: 'E hangs off the first.',
  F: 'F stands alone.',
}
const GRAPH = buildConceptGraph({
  concepts: ['A', 'B', 'C', 'D', 'E', 'F'],
  page: name => PAGES[name],
  questions: [],
  lines: [],
})

function found(...pairs: [string, string][]): CraftProgress {
  return pairs.reduce<CraftProgress>((p, [a, b]) => withConnection(p, { a, b }), EMPTY_PROGRESS)
}

describe('the graph the tests play on', () => {
  it('has the five connections the pages make', () => {
    expect(GRAPH.connections.map(c => c.key).sort()).toEqual(['a|b', 'a|e', 'b|c', 'c|d'])
  })
})

describe('combine', () => {
  it('finds a connection the vault makes, whichever way round', () => {
    const outcome = combine(GRAPH, EMPTY_PROGRESS, 'C', 'b')
    expect(outcome.kind).toBe('new')
    if (outcome.kind === 'new') expect(outcome.connection.key).toBe('b|c')
  })

  it('knows a connection found before', () => {
    expect(combine(GRAPH, found(['B', 'C']), 'B', 'C').kind).toBe('known')
  })

  it('finds nothing between unconnected concepts, or a concept and itself', () => {
    expect(combine(GRAPH, EMPTY_PROGRESS, 'A', 'D').kind).toBe('none')
    expect(combine(GRAPH, EMPTY_PROGRESS, 'A', 'a').kind).toBe('none')
    expect(combine(GRAPH, EMPTY_PROGRESS, 'A', 'Nowhere').kind).toBe('none')
  })
})

describe('progress', () => {
  it('puts concepts on the board once each, in the order placed', () => {
    const p = withPlaced(withPlaced(EMPTY_PROGRESS, 'C', 'A'), 'a', 'F')
    expect(p.placed).toEqual(['c', 'a', 'f'])
    expect(placedConcepts(GRAPH, p)).toEqual(['C', 'A', 'F'])
    expect(isPlaced(p, 'F')).toBe(true)
    expect(withPlaced(p, 'A')).toBe(p)
  })

  it('places both ends of a connection found, and records it once', () => {
    const p = found(['B', 'C'], ['C', 'B'])
    expect(p.found).toEqual(['b|c'])
    expect(p.placed).toEqual(['b', 'c'])
  })

  it('drops what the graph no longer has', () => {
    const stale: CraftProgress = { placed: ['a', 'gone'], found: ['a|b', 'a|gone'] }
    expect(placedConcepts(GRAPH, stale)).toEqual(['A'])
    expect(foundConnections(GRAPH, stale).map(c => c.key)).toEqual(['a|b'])
  })

  it('tallies the board and each concept on it', () => {
    const p = withPlaced(found(['A', 'B'], ['A', 'E']), 'F')
    expect(topicTally(GRAPH, p)).toEqual({ placed: 4, concepts: 6, found: 2, connections: 4, complete: false })
    expect(topicTally(GRAPH, found(['A', 'B'], ['A', 'E'], ['B', 'C'], ['C', 'D'])).complete).toBe(true)
    const a = conceptConnections(GRAPH, p, 'A')
    expect(a.total).toBe(2)
    expect(a.found.map(c => c.key)).toEqual(['a|b', 'a|e'])
    expect(conceptConnections(GRAPH, p, 'F')).toEqual({ found: [], total: 0 })
  })
})

describe('what connects two concepts', () => {
  it('finds the concepts connected to both', () => {
    expect(commonNeighbours(GRAPH, 'A', 'C').map(n => n.concept)).toEqual(['B'])
    expect(commonNeighbours(GRAPH, 'b', 'e').map(n => n.concept)).toEqual(['A'])
    expect(commonNeighbours(GRAPH, 'A', 'D')).toEqual([])
  })

  it('bridges two concepts only through connections found to both', () => {
    expect(isBridged(GRAPH, found(['A', 'B']), 'A', 'C')).toBe(false)
    expect(isBridged(GRAPH, found(['A', 'B'], ['B', 'C']), 'A', 'C')).toBe(true)
  })

  it('plans the connections still to find, by way of the bridge', () => {
    expect(bridgePlan(GRAPH, EMPTY_PROGRESS, 'A', 'C')).toEqual({
      concept: 'B',
      missing: [GRAPH.byKey.get('a|b'), GRAPH.byKey.get('b|c')],
    })
    expect(bridgePlan(GRAPH, found(['B', 'C']), 'A', 'C')?.missing.map(c => c.key)).toEqual(['a|b'])
    expect(bridgePlan(GRAPH, found(['A', 'B'], ['B', 'C']), 'A', 'C')?.missing).toEqual([])
  })

  it('has no plan where nothing lies between', () => {
    expect(bridgePlan(GRAPH, EMPTY_PROGRESS, 'A', 'F')).toBeNull()
  })
})

describe('the daily challenge', () => {
  const order = challengeOrder(GRAPH, 'topic', '2026-10-05')

  it('draws pairs with something between them, never neighbours or strangers', () => {
    const keys = order.map(p => pairKey(p.a, p.b)).sort()
    expect(keys).toEqual(['a|c', 'b|d', 'b|e'])
  })

  it('is the same all day and different another day', () => {
    expect(challengeOrder(GRAPH, 'topic', '2026-10-05')).toEqual(order)
    const days = ['2026-10-06', '2026-10-07', '2026-10-08'].map(d => challengeOrder(GRAPH, 'topic', d))
    expect(days.some(d => JSON.stringify(d) !== JSON.stringify(order))).toBe(true)
  })

  it('moves on once its pair is bridged, and only then', () => {
    const first = dailyChallenge(GRAPH, EMPTY_PROGRESS, order)!
    expect(first).toEqual(order[0])
    const plan = bridgePlan(GRAPH, EMPTY_PROGRESS, first.a, first.b)!
    // One connection of the way found: still the same challenge.
    const partway = withConnection(EMPTY_PROGRESS, plan.missing[0])
    expect(dailyChallenge(GRAPH, partway, order)).toEqual(first)
    // Both: the next one.
    const done = plan.missing.reduce(withConnection, EMPTY_PROGRESS)
    expect(isBridged(GRAPH, done, first.a, first.b)).toBe(true)
    expect(dailyChallenge(GRAPH, done, order)).not.toEqual(first)
  })

  it('skips ahead for another challenge, stopping at the last', () => {
    expect(dailyChallenge(GRAPH, EMPTY_PROGRESS, order, 1)).toEqual(order[1])
    expect(dailyChallenge(GRAPH, EMPTY_PROGRESS, order, 99)).toEqual(order[order.length - 1])
  })

  it('has nothing left once every pair is bridged', () => {
    const all = found(['A', 'B'], ['A', 'E'], ['B', 'C'], ['C', 'D'])
    expect(dailyChallenge(GRAPH, all, order)).toBeNull()
  })
})

describe('topics', () => {
  const page = (body: string) => body.split('\n').map(l => `> ${l}`).join('\n')
  const PAGES_ON_DISK = new Map(['Frequency', 'Severity', 'Pure Premium', 'Loss Ratio', 'Exposure Base', 'Credibility', 'Rate Change'].map(n => [n.toLowerCase(), n]))
  const pageName = (name: string) => PAGES_ON_DISK.get(name.toLowerCase())
  const exam5 = [
    '<div class="exam-nav" data-current="5|Basic Techniques"></div>',
    '> [!example]- A. Ratemaking {45–55%}',
    page([
      'Candidates should understand [[Ratemaking]].',
      '1. Define [[Exposure Base|exposure bases]]',
      '2. Calculate [[frequency]], [[Severity]] and [[Concepts/Pure Premium|pure premium]]',
      '3. Compare [[Loss Ratio]] with [[Pure Premium]]; apply [[Credibility]]',
      '4. Select a [[Rate Change]]',
      '**Readings:**',
    ].join('\n')),
    '',
    '> [!info]- Exam day',
    '> Remember [[Frequency]]',
    '> [!example]- B. Too small {5%}',
    '> 1. [[Frequency]] and [[Severity]]',
    '> [!answer]- Source Material',
    '> - [[Basic Ratemaking (Werner - 2016)]]',
  ].join('\n')
  const examP = [
    '> [!example]- General Probability {10%}',
    page(['[[Frequency]] [[Severity]] [[Pure Premium]] [[Loss Ratio]] [[Exposure Base]] [[Credibility]]'].join('\n')),
  ].join('\n')
  const disc = [
    '> [!example]- 1. Data {10%}',
    page(['[[Frequency]] [[Severity]] [[Pure Premium]] [[Loss Ratio]] [[Exposure Base]] [[Credibility]]'].join('\n')),
  ].join('\n')

  it('reads an exam page’s objectives line by line, as the syllabus parser does', () => {
    const blocks = objectiveBlocks(exam5)
    expect(blocks.map(b => [b.name, b.weight])).toEqual([['A. Ratemaking', '45–55%'], ['B. Too small', '5%']])
    expect(blocks[0].lines[2]).toEqual({
      text: '2. Calculate frequency, Severity and pure premium',
      concepts: ['frequency', 'Severity', 'Pure Premium'],
    })
  })

  it('makes a topic of each objective with enough concept pages, in ladder order', () => {
    const topics = craftTopics({ 'Exam 5 (CAS).md': exam5, 'Exam P-1 (SOA).md': examP, 'Exam DISC-DA (CAS).md': disc }, pageName)
    expect(topics.map(t => t.id)).toEqual(['exam-p-general-probability', 'exam-5-ratemaking'])
    const t = topics[1]
    expect(t).toMatchObject({ exam: 'CAS-5', examPage: 'Exam 5 (CAS)', objective: 'A. Ratemaking', title: 'Ratemaking', weight: '45–55%' })
    // Page names as the pages spell them; a link with no page (Ratemaking) is left out.
    expect(t.concepts).toEqual(['Exposure Base', 'Frequency', 'Severity', 'Pure Premium', 'Loss Ratio', 'Credibility', 'Rate Change'])
    expect(t.concepts.length).toBeGreaterThanOrEqual(MIN_TOPIC_CONCEPTS)
    expect(t.lines[1].concepts).toEqual(['Frequency', 'Severity', 'Pure Premium'])
  })

  it('names an objective without its letter', () => {
    expect(objectiveTitle('B. Estimating Claim Liabilities (Reserving)')).toBe('Estimating Claim Liabilities (Reserving)')
    expect(objectiveTitle('Time Value of Money')).toBe('Time Value of Money')
  })
})
