import { describe, expect, it } from 'vitest'
import { RUBRIC, askedFor, checklistMessage, checklistSuggestion, partChecklist, reportRubric, sampleChecklist } from './essayChecklist'

const points = (sample: string) =>
  sampleChecklist(sample).blocks.filter(b => b.kind === 'point' && !b.also).map(b => b.markdown)
const texts = (sample: string) =>
  sampleChecklist(sample).blocks.filter(b => b.kind === 'text').map(b => b.markdown)
const part = (stem: string, explanation: string, examiner_report?: string) => ({ stem, answer: '', explanation, examiner_report })

describe('sampleChecklist', () => {
  it('makes each top-level bullet a point, without its marker, keeping its sub-bullets', () => {
    expect(points('- **Retention falls.** Policyholders shop.\n- **New business falls.**\n  - the close ratio drops')).toEqual([
      '**Retention falls.** Policyholders shop.',
      '**New business falls.**\n- the close ratio drops',
    ])
  })

  it('makes numbered items and paragraphs of prose points', () => {
    expect(points('1. Consult the claims department about it.\n2. Review the case reserves for adequacy.')).toEqual([
      'Consult the claims department about it.',
      'Review the case reserves for adequacy.',
    ])
    expect(points('**Premium-based.** A rate change distorts the ratio.\n\n**Exposure-based.** Economies of scale distort it.')).toHaveLength(2)
  })

  it('leaves headings, lead-ins, formulas and tables as text, and boxes the other accepted answers apart', () => {
    const sample = [
      '**Liability coverage**',
      '',
      'Two likely consequences:',
      '',
      '- Retention falls as insureds shop.',
      '- Market share shrinks over time.',
      '',
      '$$\\text{LR} = \\frac{L}{P}$$',
      '',
      '| a | b |',
      '|---|---|',
      '',
      'Other acceptable consequences include an improved loss ratio.',
    ].join('\n')
    expect(points(sample)).toEqual(['Retention falls as insureds shop.', 'Market share shrinks over time.'])
    const list = sampleChecklist(sample)
    expect(list.points).toBe(2)
    expect(list.blocks.at(-1)).toEqual({ kind: 'point', markdown: 'Other acceptable consequences include an improved loss ratio.', index: 2, also: true })
    expect(texts(sample).join('\n')).toContain('**Liability coverage**')
  })

  it('leaves a short label with no sentence in it as text', () => {
    expect(points('ii. Reported Claims\n\nThe ratio of paid to reported claims has increased.\n\nAccepted Answer 2 — Closed / Reported Claim Counts\n\nClosure has slowed down a lot.'))
      .toEqual(['The ratio of paid to reported claims has increased.', 'Closure has slowed down a lot.'])
  })

  it('numbers its points in order and keeps every word of the sample', () => {
    const sample = 'Intro sentence with words:\n\n- First point here.\n- Second point here.'
    const list = sampleChecklist(sample)
    expect(list.points).toBe(2)
    expect(list.blocks.flatMap(b => (b.kind === 'point' ? [b.index] : []))).toEqual([0, 1])
    const words = (s: string) => s.match(/[A-Za-z]+/g)!.join(' ')
    expect(words(list.blocks.map(b => b.markdown).join(' '))).toBe(words(sample))
  })

  it('makes no points of a calculation set out in steps', () => {
    const working = 'Current average premium = 1250 x 0.8 = 1,000 in total.\n\nProposed base rate = 1164.375 / 1.0108 = 1,152 overall.\n\nThis gives the new rate.'
    expect(sampleChecklist(working).points).toBe(0)
  })
})

describe('askedFor', () => {
  it('reads the count the stem asks for', () => {
    expect(askedFor('List two likely consequences of the company implementing the indicated rate.')).toBe(2)
    expect(askedFor('Briefly describe the four criteria that must be met.')).toBe(4)
    expect(askedFor('Briefly describe a scenario in which premium is not fixed.')).toBe(1)
    expect(askedFor('Briefly describe one advantage and one disadvantage of using the technique.')).toBe(2)
    expect(askedFor('Assess if age is appropriate using two social criteria.')).toBe(2)
  })

  it('reads no count where there is none', () => {
    expect(askedFor('Evaluate the impact that the relativity changes may have.')).toBeNull()
    expect(askedFor('Assess the appropriateness of using a Berquist-Sherman adjustment.')).toBeNull()
    expect(askedFor('Describe two of the following.')).toBeNull()
  })
})

describe('partChecklist', () => {
  const bullets = '- Retention falls as insureds shop.\n- Market share shrinks over time.\n- Loss ratio improves with time.'

  it('cuts each sample answer into its own checklist', () => {
    const list = partChecklist(part('Discuss the consequences.', `${bullets}\n\nAlternatively:\n\n- Regulators object to the filing.\n- Profit per risk rises a lot.`))
    expect(list?.samples.map(s => s.points)).toEqual([3, 2])
    expect(list?.asked).toBeNull()
  })

  it('records a count the stem asks for only when a sample makes more points than that', () => {
    expect(partChecklist(part('List two likely consequences.', bullets))?.asked).toBe(2)
    expect(partChecklist(part('List three likely consequences.', bullets))?.asked).toBeNull()
  })

  it('has none for a calculation, a keyed part or a sample of one point', () => {
    expect(partChecklist(part('Calculate the indicated rate.', bullets))).toBeNull()
    expect(partChecklist({ stem: 'Discuss.', answer: '17', explanation: bullets })).toBeNull()
    expect(partChecklist(part('Define materiality.', 'An omission is material if it changes the user\'s decision.'))).toBeNull()
  })
})

describe('checklistSuggestion', () => {
  const list = partChecklist(part('Discuss the consequences.', '- Retention falls as insureds shop.\n- Market share shrinks over time.\n- Loss ratio improves with time.\n\nAlternatively:\n\n- Regulators object to the filing.\n- Profit per risk rises a lot.'))!

  it('suggests nothing until a box is ticked', () => {
    expect(checklistSuggestion(list, {})).toBeNull()
    expect(checklistSuggestion(list, { 0: [] })).toBeNull()
  })

  it('suggests full credit for every point, partial for some', () => {
    expect(checklistSuggestion(list, { 0: [0, 1, 2] })).toEqual({ suggestion: 'correct', sample: 0, ticked: 3, needed: 3 })
    expect(checklistSuggestion(list, { 0: [1] })).toMatchObject({ suggestion: 'partial', ticked: 1, needed: 3 })
  })

  it('reads the ticks against the sample the answer covers most of', () => {
    expect(checklistSuggestion(list, { 0: [0], 1: [0, 1] })).toMatchObject({ suggestion: 'correct', sample: 1 })
  })

  it('counts a tick on the other accepted answers in place of a point', () => {
    const also = partChecklist(part('List two likely consequences.', '- Retention falls as insureds shop.\n- Market share shrinks over time.\n\nOther acceptable consequences include an improved loss ratio.'))!
    expect(also.samples[0].points).toBe(2)
    expect(checklistSuggestion(also, { 0: [0, 2] })).toMatchObject({ suggestion: 'correct', ticked: 2, needed: 2 })
  })

  it('needs only as many points as the stem asks for', () => {
    const two = partChecklist(part('List two likely consequences.', '- Retention falls as insureds shop.\n- Market share shrinks over time.\n- Loss ratio improves with time.'))!
    expect(checklistSuggestion(two, { 0: [0, 2] })).toMatchObject({ suggestion: 'correct', ticked: 2, needed: 2 })
    expect(checklistSuggestion(two, { 0: [0, 1, 2] })).toMatchObject({ suggestion: 'correct', ticked: 2, needed: 2 })
  })
})

describe('checklistMessage', () => {
  const one = partChecklist(part('Discuss.', '- Retention falls as insureds shop.\n- Market share shrinks over time.\n- Loss ratio improves with time.'))!
  const two = partChecklist(part('List two consequences.', '- Retention falls as insureds shop.\n- Market share shrinks over time.\n- Loss ratio improves with time.\n\nAlternatively:\n\n- Regulators object to the filing.\n- Profit per risk rises a lot.\n- Expenses rise as volume falls.'))!

  it('says the grade and the count it came from', () => {
    expect(checklistMessage({ suggestion: 'partial', sample: 0, ticked: 1, needed: 3 }, one)).toEqual({
      title: 'Suggested grade: Partial',
      body: 'You ticked 1 of the 3 points in the sample answer.',
    })
  })

  it('names the sample when there are several, and the question when it asks for a count', () => {
    expect(checklistMessage({ suggestion: 'correct', sample: 1, ticked: 2, needed: 2 }, two).body)
      .toBe('You ticked 2 of the 2 points the question asks for, from sample 2.')
  })
})

describe('pools of responses', () => {
  const pooled = (sample: string) =>
    sampleChecklist(sample).blocks.flatMap(b => (b.kind === 'point' ? [b.pool ?? null] : []))

  it('makes the responses under a pool heading one pool, needing one of them', () => {
    const list = sampleChecklist('Sample responses:\n\n- Retention falls.\n- Market share shrinks.\n- Profit rises.')
    expect(list).toMatchObject({ boxes: 3, points: 1, pools: [{ need: 1, counted: false }] })
    expect(pooled('Sample responses:\n\n- Retention falls.\n- Market share shrinks.')).toEqual([0, 0])
  })

  it('takes a pool\'s count from its heading', () => {
    expect(sampleChecklist('Sample Answers (any two of which would earn full credit)\n\n- One answer.\n- Two answer.\n- Three answer.').pools)
      .toEqual([{ need: 2, counted: true }])
    expect(sampleChecklist('Sample Answers (needed three reasons for full credit)\n\n- Regulation.\n- Customers.\n- Competition.\n- Systems.').points).toBe(3)
  })

  it('keeps each heading\'s responses a pool of their own', () => {
    const text = 'Sample Responses for "Advantage"\n- Uses the relationship.\n- Can be judged.\nSample Responses for "Disadvantage"\n- Mix may change.\n- Ratio may shift.'
    expect(pooled(text)).toEqual([0, 0, 1, 1])
    expect(sampleChecklist(text).points).toBe(2)
  })

  it('counts a short bullet as a response, and ends a pool at the next text', () => {
    const text = 'Answers receiving full credit include:\n\n- Stable case reserve adequacy\n- Paid techniques\n\nThe report also notes a further point here.'
    expect(pooled(text)).toEqual([0, 0, null])
  })

  it('answers the stem\'s count from a single uncounted pool', () => {
    const list = partChecklist(part('List two likely consequences.', 'Sample responses:\n\n- Retention falls.\n- Share shrinks.\n- Profit rises.'))!
    expect(list.samples[0].points).toBe(2)
    expect(checklistSuggestion(list, { 0: [0] })).toMatchObject({ suggestion: 'partial', ticked: 1, needed: 2 })
    expect(checklistSuggestion(list, { 0: [0, 2] })).toMatchObject({ suggestion: 'correct', ticked: 2, needed: 2 })
  })

  it('credits a pool no more than it needs', () => {
    const list = partChecklist(part('Describe one advantage and one disadvantage.', 'Sample Responses for "Advantage"\n- Uses the relationship.\n- Can be judged.\nSample Responses for "Disadvantage"\n- Mix may change.\n- Ratio may shift.'))!
    expect(checklistSuggestion(list, { 0: [0, 1] })).toMatchObject({ suggestion: 'partial', ticked: 1, needed: 2 })
    expect(checklistSuggestion(list, { 0: [1, 3] })).toMatchObject({ suggestion: 'correct', ticked: 2, needed: 2 })
  })

  it('takes "this list is not exhaustive" for the other accepted answers', () => {
    const list = sampleChecklist('Sample responses:\n\n- Regulation limits it.\n- Customers leave.\n- Note that this list is not exhaustive, and other reasonable answers were accepted.')
    expect(list.blocks.at(-1)).toMatchObject({ kind: 'point', also: true })
  })

  it('leaves a numbered sample heading to splitSampleAnswers, never a pool', () => {
    expect(sampleChecklist('Sample answer #2\n\n- First point made here.\n- Second point made here.').pools).toEqual([])
  })
})

describe('reportRubric', () => {
  const report = [
    'Candidates were expected to:',
    '',
    '- List and define the 3 criteria of a good exposure base',
    '- Justify how insured value meets each criterion',
    '- Recommend and justify an exposure base',
    '',
    'Common mistakes include:',
    '',
    '- Not listing the criteria',
  ].join('\n')

  it('makes what candidates were expected to do the points, and the rest of the report text', () => {
    const rubric = reportRubric(report)!
    expect(rubric.points).toBe(3)
    expect(rubric.blocks.filter(b => b.kind === 'point').map(b => b.markdown)).toEqual([
      'List and define the 3 criteria of a good exposure base',
      'Justify how insured value meets each criterion',
      'Recommend and justify an exposure base',
    ])
    expect(rubric.blocks.at(-1)).toEqual({ kind: 'text', markdown: 'Common mistakes include:\n\n- Not listing the criteria' })
  })

  it('reads other lead-ins to what full credit needed', () => {
    for (const lead of ['To earn full credit candidates needed to clearly state three key pieces of information:', 'To receive full credit, the candidate should have:', 'Few did well. In order to receive full credit a candidate needed to:']) {
      expect(reportRubric(`${lead}\n\n1. There are only certain risks that qualify\n2. These risks have better experience`)?.points, lead).toBe(2)
    }
  })

  it('makes a list that any so many of received full credit a pool', () => {
    const rubric = reportRubric('Any two of the following received full credit:\n\n- Flood maps\n- Infrastructure\n- Awareness')!
    expect(rubric).toMatchObject({ boxes: 3, points: 2, pools: [{ need: 2, counted: true }] })
  })

  it('leaves guidance on the list as text', () => {
    const rubric = reportRubric('Candidates were expected to:\n\n- Provide two factors to consider.\n- Describe the effect on the pattern.\n- Responses could include concerns about the data.')!
    expect(rubric.points).toBe(2)
  })

  it('has none for a report of errors, of commentary, or of one item', () => {
    expect(reportRubric('Those who didn\'t get full credit typically made one of the following common errors:\n\n- One error\n- Another error')).toBeNull()
    expect(reportRubric('Candidates were expected to know the three criteria.\n\n- Most did well\n- Some did not')).toBeNull()
    expect(reportRubric('Candidates were expected to:\n\n- Recommend a base')).toBeNull()
    expect(reportRubric(undefined)).toBeNull()
  })

  it('becomes the checklist, read under RUBRIC, with its own words', () => {
    const list = partChecklist(part('Evaluate the change.', '- One point made here.\n- Two point made here.', report))!
    expect(list.rubric?.points).toBe(3)
    expect(checklistSuggestion(list, { 0: [0, 1] })).toBeNull()
    const s = checklistSuggestion(list, { [RUBRIC]: [0, 2] })!
    expect(s).toEqual({ suggestion: 'partial', sample: RUBRIC, ticked: 2, needed: 3 })
    expect(checklistMessage(s, list).body).toBe("You ticked 2 of the 3 points the examiner's report asks for.")
  })

  it('gives a part whose sample makes one point a checklist from its rubric', () => {
    expect(partChecklist(part('Evaluate the change.', 'A single paragraph of answer.', report))?.rubric?.points).toBe(3)
  })
})
