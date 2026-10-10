import { describe, expect, it } from 'vitest'
import { buildConceptGraph, type GraphQuestion } from './conceptGraph'
import {
  EMPTY_PROGRESS,
  MIN_TOPIC_CONCEPTS,
  FLOOR_STRENGTH,
  boardState,
  combine,
  connectionFor,
  connectionPoints,
  craftGraph,
  craftScore,
  craftTopics,
  madeBy,
  mergeGraphs,
  objectiveBlocks,
  objectiveTitle,
  packSeeds,
  practiceQuestions,
  PRACTICE_FALLBACK,
  recipesOf,
  seedConcepts,
  topicTally,
  withConnection,
  type CraftProgress,
} from './conceptCraft'

/** A topic from its pages, with questions tagged with each pair in `pairs` to tie them. */
function topic(pages: Record<string, string>, pairs: [string, string][] = []) {
  const page = (name: string) => pages[name]
  const questions: GraphQuestion[] = pairs.map(([a, b], i) => ({ id: `q${i}`, links: [`Concepts/${a}`, `Concepts/${b}`] }))
  return craftGraph(buildConceptGraph({ concepts: Object.keys(pages), page, questions, lines: [] }), page)
}

// The elements, written the way the vault writes its pages: each made
// concept's definition names what it is built from, so the connection between
// those two makes it (lib/conceptRecipes.ts).
//
//   Fire + Water → Steam      Earth + Water → Mud      Air + Steam → Cloud
//
// The elements' own pages name nothing — they are what the topic is built
// from — so questions tie them together, each pair at strength 20. Lone is
// tied to nothing and made from nothing.
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

function found(...pairs: [string, string][]): CraftProgress {
  return pairs.reduce<CraftProgress>((p, [a, b]) => withConnection(p, { a, b }), EMPTY_PROGRESS)
}

describe('the graph the tests play on', () => {
  it('has the connections the pages and questions make', () => {
    expect(GRAPH.connections.map(c => `${c.key} ${c.strength}`).sort()).toEqual([
      'air|cloud 40', 'air|earth 20', 'air|fire 20', 'air|steam 20', 'cloud|steam 40', 'earth|mud 40',
      'earth|water 20', 'fire|steam 40', 'fire|water 20', 'mud|water 40', 'steam|water 40',
    ])
  })
})

describe('making concepts', () => {
  it('makes what is built from the pair, in either order and any case', () => {
    expect(madeBy(GRAPH, 'Fire', 'Water')).toEqual(['Steam'])
    expect(madeBy(GRAPH, 'water', 'FIRE')).toEqual(['Steam'])
    expect(madeBy(GRAPH, 'Steam', 'Air')).toEqual(['Cloud'])
  })

  it('makes nothing from a pair nothing is built from, or a pair not connected', () => {
    expect(madeBy(GRAPH, 'Fire', 'Air')).toEqual([])
    expect(madeBy(GRAPH, 'Fire', 'Earth')).toEqual([])
  })

  it('carries the page’s own words for why', () => {
    const [steam] = recipesOf(GRAPH, { a: 'Fire', b: 'Water' })
    expect(steam).toMatchObject({ a: 'Fire', b: 'Water', makes: 'Steam' })
    expect(steam.text).toBe('**Steam** is Water heated by Fire.')
    expect(recipesOf(GRAPH, { a: 'Fire', b: 'Air' })).toEqual([])
  })
})

describe('seedConcepts', () => {
  it('deals what nothing is made from, the pair that makes the best-explained concept first', () => {
    expect(SEEDS).toEqual(['Fire', 'Water', 'Earth', 'Air', 'Lone'])
  })

  it('deals one concept of a circle made only from each other', () => {
    const circle = topic({
      Water: '**Water** is wet.',
      Ice: '**Ice** is [[Snow]] pressed into [[Water]].',
      Snow: '**Snow** is [[Hail]] ground fine in [[Water]].',
      Hail: '**Hail** is [[Ice]] thrown down with [[Water]].',
    })
    // Ice, the circle's first in the syllabus: Ice and Water make Hail, Hail and Water make Snow.
    expect(seedConcepts(circle)).toEqual(['Water', 'Ice'])
  })

  it('deals every concept when nothing is made', () => {
    expect(seedConcepts(topic({ X: 'Nothing.', Y: 'Nothing.' }))).toEqual(['X', 'Y'])
    expect(seedConcepts(topic({}))).toEqual([])
  })
})

describe('the board', () => {
  it('starts with the seeds', () => {
    const state = boardState(GRAPH, SEEDS, EMPTY_PROGRESS)
    expect(state.held).toEqual(['Fire', 'Water', 'Earth', 'Air', 'Lone'])
    expect(state.found).toEqual([])
    expect(state.fresh.size).toBe(0)
  })

  it('takes what each connection found made, and marks it new until it is used', () => {
    const one = boardState(GRAPH, SEEDS, found(['Fire', 'Water']))
    expect(one.held).toEqual(['Fire', 'Water', 'Earth', 'Air', 'Lone', 'Steam'])
    expect(one.madeFrom.get('steam')?.key).toBe('fire|water')
    expect([...one.fresh]).toEqual(['steam'])

    const two = boardState(GRAPH, SEEDS, found(['Fire', 'Water'], ['Steam', 'Air']))
    expect(two.held).toEqual(['Fire', 'Water', 'Earth', 'Air', 'Lone', 'Steam', 'Cloud'])
    // Steam has been played with; Cloud hasn't.
    expect([...two.fresh]).toEqual(['cloud'])
  })

  it('drops a connection whose ends were never in hand, or that the graph no longer has', () => {
    const stale: CraftProgress = { found: ['air|steam', 'fire|water', 'fire|gone', 'fire|water'] }
    const state = boardState(GRAPH, SEEDS, stale)
    expect(state.found.map(c => c.key)).toEqual(['fire|water'])
    expect(state.held).not.toContain('Cloud')
  })

  it('records each connection once', () => {
    expect(found(['Fire', 'Water'], ['Water', 'Fire']).found).toEqual(['fire|water'])
  })
})

describe('combine', () => {
  const start = boardState(GRAPH, SEEDS, EMPTY_PROGRESS)
  const one = boardState(GRAPH, SEEDS, found(['Fire', 'Water']))

  it('finds a connection and says what it makes that isn’t in hand', () => {
    expect(combine(GRAPH, start, 'Water', 'fire')).toMatchObject({ kind: 'new', made: ['Steam'] })
    expect(combine(GRAPH, one, 'Steam', 'Air')).toMatchObject({ kind: 'new', made: ['Cloud'] })
    // Connected, but nothing is built from the two: a line, and nothing more.
    expect(combine(GRAPH, one, 'Steam', 'Fire')).toMatchObject({ kind: 'new', made: [] })
  })

  it('knows a connection found before', () => {
    expect(combine(GRAPH, one, 'Fire', 'Water').kind).toBe('known')
  })

  it('connects any two concepts — an inferred connection, making nothing — but not a concept and itself', () => {
    const outcome = combine(GRAPH, one, 'Fire', 'Earth')
    expect(outcome).toMatchObject({ kind: 'new', made: [] })
    expect(outcome.kind === 'new' && outcome.connection.inferred).toBe(true)
    expect(combine(GRAPH, one, 'Fire', 'fire').kind).toBe('none')
    expect(combine(GRAPH, one, 'Fire', 'Nowhere').kind).toBe('none')
  })
})

describe('connectionFor', () => {
  it('is the graph’s own connection where it has one', () => {
    expect(connectionFor(GRAPH, 'water', 'Fire')).toBe(GRAPH.byKey.get('fire|water'))
  })

  it('reads any other pair through the concept tied most strongly to both', () => {
    // Fire — Water — Earth, both at 20: 0.5 × 20 × 20 / 100 = 2.
    const c = connectionFor(GRAPH, 'Fire', 'Earth')!
    expect(c).toMatchObject({ key: 'earth|fire', a: 'Earth', b: 'Fire', strength: 2, inferred: true })
    expect(['Water', 'Air']).toContain(c.via)
    expect(connectionFor(GRAPH, 'Earth', 'Fire')).toBe(c)
  })

  it('never reads a pair as nothing at all', () => {
    expect(connectionFor(GRAPH, 'Lone', 'Fire')?.strength).toBe(FLOOR_STRENGTH)
  })

  it('reads two concepts from different packs off their own pages', () => {
    const pages: Record<string, string> = {
      Rain: '**Rain** falls from a [[Cloud]].',
      Cloud: '**Cloud** is vapour.',
      Sun: '**Sun** shines.',
    }
    const page = (n: string) => pages[n]
    const left = craftGraph(buildConceptGraph({ concepts: ['Rain', 'Sun'], page, questions: [], lines: [] }), page)
    const right = craftGraph(buildConceptGraph({ concepts: ['Cloud', 'Sun'], page, questions: [], lines: [] }), page)
    const c = connectionFor(mergeGraphs([left, right]), 'Rain', 'Cloud')!
    expect(c.strength).toBe(40)
    expect(c.mentions[0]).toMatchObject({ from: 'Rain', linked: true })
  })

  it('keeps an inferred connection on the board', () => {
    const state = boardState(GRAPH, SEEDS, found(['Fire', 'Earth']))
    expect(state.found.map(c => c.key)).toEqual(['earth|fire'])
  })
})

describe('the score', () => {
  it('rewards a strong connection far more than a faint one', () => {
    expect(connectionPoints(90)).toBe(81)
    expect(connectionPoints(50)).toBe(25)
    expect(connectionPoints(20)).toBe(4)
    expect(connectionPoints(2)).toBe(1)
  })

  it('adds up every connection found', () => {
    const state = boardState(GRAPH, SEEDS, found(['Fire', 'Water'], ['Fire', 'Earth']))
    expect(craftScore(state)).toBe(5)
  })
})

describe('starter packs', () => {
  // A second pack sharing Water with the first, and the pair Fire–Water read
  // stronger; Ice is made from Water and Cold.
  const COLD = topic(
    {
      Water: '**Water** is wet.',
      Cold: '**Cold** is the absence of heat.',
      Fire: '**Fire** is hot.',
      Ice: '**Ice** is [[Water]] gone [[Cold]].',
    },
    [['Water', 'Cold'], ['Fire', 'Water'], ['Fire', 'Water'], ['Fire', 'Water']],
  )
  const BOTH = mergeGraphs([GRAPH, COLD])

  it('is one graph of every pack’s concepts, each concept once', () => {
    expect(BOTH.concepts).toEqual(['Fire', 'Water', 'Earth', 'Air', 'Steam', 'Mud', 'Cloud', 'Lone', 'Cold', 'Ice'])
    expect(mergeGraphs([GRAPH])).toBe(GRAPH)
  })

  it('keeps one connection per pair, the stronger reading, and every pack’s recipes', () => {
    const fireWater = BOTH.connections.filter(c => c.key === 'fire|water')
    expect(fireWater).toHaveLength(1)
    expect(fireWater[0].strength).toBeGreaterThan(GRAPH.byKey.get('fire|water')!.strength)
    expect(madeBy(BOTH, 'Fire', 'Water')).toEqual(['Steam'])
    expect(madeBy(BOTH, 'Water', 'Cold')).toEqual(['Ice'])
    expect(BOTH.neighbours.get('water')?.map(c => c.key)).toContain('cold|water')
  })

  it('deals each pack’s seeds in the order added, none twice, and every pack can still be made in full', () => {
    const seeds = packSeeds([SEEDS, seedConcepts(COLD)])
    expect(seeds.slice(0, SEEDS.length)).toEqual(SEEDS)
    expect(new Set(seeds.map(s => s.toLowerCase())).size).toBe(seeds.length)
    expect(seeds).toContain('Cold')
    const all = boardState(BOTH, seeds, found(['Fire', 'Water'], ['Water', 'Earth'], ['Steam', 'Air'], ['Water', 'Cold']))
    expect(all.held).toHaveLength(BOTH.concepts.length)
  })
})

describe('topicTally', () => {
  it('counts what is in hand and what is found', () => {
    expect(topicTally(GRAPH, boardState(GRAPH, SEEDS, found(['Fire', 'Water'])))).toEqual({
      held: 6, concepts: 8, found: 1, connections: 11, links: 1, complete: false,
    })
  })

  it('counts an inferred connection among the links, not among the graph’s own', () => {
    const tally = topicTally(GRAPH, boardState(GRAPH, SEEDS, found(['Fire', 'Water'], ['Fire', 'Earth'])))
    expect(tally).toMatchObject({ found: 1, links: 2 })
  })

  it('is complete once every connection is found', () => {
    // Played in an order that keeps every connection's ends in hand.
    const all = found(
      ['Fire', 'Water'], ['Earth', 'Water'], ['Steam', 'Air'], ['Steam', 'Fire'], ['Steam', 'Water'], ['Mud', 'Earth'],
      ['Mud', 'Water'], ['Cloud', 'Steam'], ['Cloud', 'Air'], ['Earth', 'Air'], ['Fire', 'Air'],
    )
    const state = boardState(GRAPH, SEEDS, all)
    expect(state.held).toHaveLength(8)
    expect(topicTally(GRAPH, state).complete).toBe(true)
  })
})

describe('practiceQuestions', () => {
  const pool = [
    { id: 'wide', links: ['Concepts/P', 'Concepts/X', 'Concepts/Y'] },
    { id: 'narrow', links: ['Concepts/Q'] },
    { id: 'other', links: ['Concepts/Z'] },
  ]

  it('practises the questions that test the two together', () => {
    expect(practiceQuestions({ a: 'P', b: 'Q', questions: ['q1', 'q2'] }, pool)).toEqual(['q1', 'q2'])
  })

  it('falls back on either concept’s questions, the most focused first', () => {
    expect(practiceQuestions({ a: 'P', b: 'Q', questions: [] }, pool)).toEqual(['narrow', 'wide'])
    const many = Array.from({ length: 30 }, (_, i) => ({ id: `m${i}`, links: ['Concepts/P'] }))
    expect(practiceQuestions({ a: 'P', b: 'Q', questions: [] }, many)).toHaveLength(PRACTICE_FALLBACK)
    expect(practiceQuestions({ a: 'R', b: 'S', questions: [] }, pool)).toEqual([])
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
