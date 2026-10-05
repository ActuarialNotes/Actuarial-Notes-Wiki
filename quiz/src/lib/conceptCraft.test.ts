import { describe, expect, it } from 'vitest'
import { buildConceptGraph } from './conceptGraph'
import {
  EMPTY_PROGRESS,
  MAKING,
  MIN_TOPIC_CONCEPTS,
  boardState,
  combine,
  commonNeighbours,
  craftTopics,
  madeBy,
  objectiveBlocks,
  objectiveTitle,
  practiceQuestions,
  PRACTICE_FALLBACK,
  seedConcepts,
  topicTally,
  withConnection,
  type CraftProgress,
} from './conceptCraft'

// Six concepts whose pages link the ones after them, so every connection is
// one link (strength 40), and W, tied to P and Q only by one two-concept
// question each (strength 20 — connected, but too faintly to be made).
//
//   P — Q, R, S        Q — R, S, T        R — T, U        S — T        T — U
//
// Finding P–Q makes R and S (connected to both); Q–R then makes T, and R–T
// makes U — so P and Q are all a reader needs to make the rest.
const PAGES: Record<string, string> = {
  P: 'Leads to [[Q]], [[R]] and [[S]].',
  Q: 'Leads to [[R]], [[S]] and [[T]].',
  R: 'Leads to [[T]] and [[U]].',
  S: 'Leads to [[T]].',
  T: 'Leads to [[U]].',
  U: 'The end.',
  W: 'Faint.',
}
const GRAPH = buildConceptGraph({
  concepts: ['P', 'Q', 'R', 'S', 'T', 'U', 'W'],
  page: name => PAGES[name],
  questions: [
    { id: 'q1', links: ['Concepts/P', 'Concepts/W'] },
    { id: 'q2', links: ['Concepts/Q', 'Concepts/W'] },
  ],
  lines: [],
})
const SEEDS = seedConcepts(GRAPH)

function found(...pairs: [string, string][]): CraftProgress {
  return pairs.reduce<CraftProgress>((p, [a, b]) => withConnection(p, { a, b }), EMPTY_PROGRESS)
}

describe('the graph the tests play on', () => {
  it('has the connections the pages and questions make', () => {
    expect(GRAPH.connections.map(c => `${c.key} ${c.strength}`).sort()).toEqual([
      'p|q 40', 'p|r 40', 'p|s 40', 'p|w 20', 'q|r 40', 'q|s 40', 'q|t 40', 'q|w 20', 'r|t 40', 'r|u 40', 's|t 40', 't|u 40',
    ])
  })
})

describe('making concepts', () => {
  it('finds what lies between two concepts, most strongly tied first', () => {
    expect(commonNeighbours(GRAPH, 'P', 'Q')).toEqual([
      { concept: 'R', tie: 40 },
      { concept: 'S', tie: 40 },
      { concept: 'W', tie: 20 },
    ])
  })

  it('makes the concepts tied to both ends, strongly enough, and only from a connection', () => {
    expect(madeBy(GRAPH, 'P', 'Q')).toEqual(['R', 'S'])
    expect(madeBy(GRAPH, 'q', 'r')).toEqual(['P', 'T'])
    // P and T aren't connected, so they make nothing, whatever lies between them.
    expect(madeBy(GRAPH, 'P', 'T')).toEqual([])
  })

  it('makes at most three', () => {
    const hub = buildConceptGraph({
      concepts: ['A', 'B', 'C1', 'C2', 'C3', 'C4'],
      page: name => ({ A: '[[B]] [[C1]] [[C2]] [[C3]] [[C4]]', B: '[[C1]] [[C2]] [[C3]] [[C4]]' } as Record<string, string>)[name],
      questions: [],
      lines: [],
    })
    expect(commonNeighbours(hub, 'A', 'B')).toHaveLength(4)
    expect(madeBy(hub, 'A', 'B')).toHaveLength(MAKING.most)
  })
})

describe('seedConcepts', () => {
  it('deals the fewest concepts that make all the rest, earliest in the syllabus', () => {
    // W can't be made — its ties are too faint — so it is dealt too.
    expect(SEEDS).toEqual(['P', 'Q', 'W'])
  })

  it('deals every concept when nothing connects', () => {
    const none = buildConceptGraph({ concepts: ['X', 'Y'], page: () => 'Nothing.', questions: [], lines: [] })
    expect(seedConcepts(none)).toEqual(['X', 'Y'])
    expect(seedConcepts(buildConceptGraph({ concepts: [], page: () => undefined, questions: [], lines: [] }))).toEqual([])
  })
})

describe('the board', () => {
  it('starts with the seeds', () => {
    const state = boardState(GRAPH, SEEDS, EMPTY_PROGRESS)
    expect(state.held).toEqual(['P', 'Q', 'W'])
    expect(state.found).toEqual([])
    expect(state.fresh.size).toBe(0)
  })

  it('takes what each connection found made, and marks it new until it is used', () => {
    const one = boardState(GRAPH, SEEDS, found(['P', 'Q']))
    expect(one.held).toEqual(['P', 'Q', 'W', 'R', 'S'])
    expect(one.madeFrom.get('r')?.key).toBe('p|q')
    expect([...one.fresh]).toEqual(['r', 's'])

    const two = boardState(GRAPH, SEEDS, found(['P', 'Q'], ['Q', 'R']))
    expect(two.held).toEqual(['P', 'Q', 'W', 'R', 'S', 'T'])
    // R has been played with; S and T haven't.
    expect([...two.fresh].sort()).toEqual(['s', 't'])
  })

  it('drops a connection whose ends were never in hand, or that the graph no longer has', () => {
    const stale: CraftProgress = { found: ['t|u', 'p|q', 'p|gone', 'p|q'] }
    const state = boardState(GRAPH, SEEDS, stale)
    expect(state.found.map(c => c.key)).toEqual(['p|q'])
    expect(state.held).not.toContain('U')
  })

  it('records each connection once', () => {
    expect(found(['P', 'Q'], ['Q', 'P']).found).toEqual(['p|q'])
  })
})

describe('combine', () => {
  const start = boardState(GRAPH, SEEDS, EMPTY_PROGRESS)
  const one = boardState(GRAPH, SEEDS, found(['P', 'Q']))

  it('finds a connection and says what it makes that isn’t in hand', () => {
    expect(combine(GRAPH, start, 'Q', 'p')).toMatchObject({ kind: 'new', made: ['R', 'S'] })
    // From Q and R: P is in hand already, so only T is new.
    expect(combine(GRAPH, one, 'Q', 'R')).toMatchObject({ kind: 'new', made: ['T'] })
  })

  it('knows a connection found before', () => {
    expect(combine(GRAPH, one, 'P', 'Q').kind).toBe('known')
  })

  it('finds nothing between unconnected concepts, or a concept and itself', () => {
    expect(combine(GRAPH, one, 'R', 'S').kind).toBe('none')
    expect(combine(GRAPH, one, 'P', 'p').kind).toBe('none')
  })
})

describe('topicTally', () => {
  it('counts what is in hand and what is found', () => {
    expect(topicTally(GRAPH, boardState(GRAPH, SEEDS, found(['P', 'Q'])))).toEqual({
      held: 5, concepts: 7, found: 1, connections: 12, complete: false,
    })
  })

  it('is complete once every connection is found', () => {
    // Played in an order that keeps every connection's ends in hand.
    const all = found(
      ['P', 'Q'], ['Q', 'R'], ['R', 'T'], ['P', 'R'], ['P', 'S'], ['Q', 'S'], ['Q', 'T'], ['R', 'U'], ['S', 'T'], ['T', 'U'], ['P', 'W'], ['Q', 'W'],
    )
    const state = boardState(GRAPH, SEEDS, all)
    expect(state.held).toHaveLength(7)
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
