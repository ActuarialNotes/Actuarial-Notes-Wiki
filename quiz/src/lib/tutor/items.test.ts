import { describe, expect, it } from 'vitest'
import { parseQuestion } from '../parser'
import { DEFAULT_TUTOR_EXAM } from './exams'
import { buildItems, isServable, itemsByConcept, itemsForQuestion, partConcepts, partKind, MIN_ITEM_MINUTES } from './items'

const exam5 = DEFAULT_TUTOR_EXAM

function question(body: string, front: Record<string, string> = {}) {
  const fm = {
    id: '"cas5-2019f-q3"',
    exam: '"Exam 5"',
    topic: '"Large Losses"',
    difficulty: 'medium',
    type: 'multi-part',
    year: '2019',
    session: 'Fall',
    points: '2',
    ...front,
  }
  const lines = Object.entries(fm).map(([k, v]) => `${k}: ${v}`)
  const raw = `---\n${lines.join('\n')}\nwiki_link:\n  - Concepts/Large+Loss\n  - Concepts/Loss+Trend\n---\n\n${body}`
  const q = parseQuestion(raw)
  if (!q) throw new Error('fixture did not parse')
  return q
}

describe('what kind of part it is', () => {
  it('reads the command word of the instruction', () => {
    expect(partKind('Calculate the indicated rate change.')).toBe('calculation')
    expect(partKind('Estimate the IBNR using the chain ladder.')).toBe('calculation')
    expect(partKind('Briefly describe two reasons the trend may differ.')).toBe('explanation')
    expect(partKind('Discuss the appropriateness of a large loss adjustment.')).toBe('explanation')
    expect(partKind('Recommend an exposure base for this line.')).toBe('judgment')
    expect(partKind('Assess whether the method is appropriate.')).toBe('judgment')
  })

  it('lets a judgment word outrank a calculation word in the same sentence', () => {
    expect(partKind('Calculate the rate change and recommend whether to file it.')).toBe('judgment')
    expect(partKind('Calculate the ultimate losses and briefly explain the result.')).toBe('calculation')
  })

  it('reads the last instruction, not the given information', () => {
    expect(partKind('The actuary selected a trend. Explain why the selection may be biased.')).toBe('explanation')
    expect(partKind('| Year | Calculate |\n|---|---|\nDescribe the pattern.')).toBe('explanation')
  })

  it('takes the preamble’s instruction when the part has none', () => {
    expect(partKind('A very long-tailed line of business.', 'For each scenario below, recommend a reserving method.')).toBe('judgment')
    expect(partKind('A very long-tailed line of business.')).toBe('explanation')
  })
})

describe('the concepts a part is about', () => {
  it('are the tagged concepts its own words name', () => {
    expect(partConcepts(['Large Loss', 'Loss Trend'], 'Calculate the loss trend factor.')).toEqual(['Loss Trend'])
    expect(partConcepts(['Large Loss', 'Loss Trend'], 'Discuss the large losses.', 'A trend…')).toEqual(['Large Loss'])
  })

  it('fall back to every tagged concept when it names none', () => {
    expect(partConcepts(['Large Loss', 'Loss Trend'], 'Calculate the indication.')).toEqual(['Large Loss', 'Loss Trend'])
  })
})

describe('a question as items', () => {
  const q = question([
    'Given the following information:',
    '',
    '| Year | Losses |',
    '|---|---|',
    '| 2018 | 100 |',
    '',
    '## Part a (1.5 points)',
    '',
    'Calculate the loss trend factor.',
    '',
    '### Answer',
    '1.0612',
    '',
    '### Explanation',
    'Trend from the average accident date.',
    '',
    '### Examiner Report',
    'A common mistake was using the wrong trend period.',
    '',
    '## Part b (0.25 points)',
    '',
    'Briefly discuss whether to cap large losses.',
    '',
    '### Explanation',
    'Capping removes volatility.',
  ].join('\n'))

  const items = itemsForQuestion(q, exam5)

  it('gives one item per lettered part, sharing the preamble', () => {
    expect(items.map(i => i.id)).toEqual(['cas5-2019f-q3#a', 'cas5-2019f-q3#b'])
    expect(items[0].preamble).toContain('Given the following information')
    expect(items[0].prompt).toBe('Calculate the loss trend factor.')
    expect(items[1].partLabel).toBe('b')
  })

  it('carries the part’s kind, concepts, points and feedback', () => {
    expect(items[0].kind).toBe('calculation')
    expect(items[0].concepts).toEqual(['Loss Trend'])
    expect(items[1].kind).toBe('explanation')
    expect(items[1].concepts).toEqual(['Large Loss'])
    expect(items[0].points).toBe(1.5)
    expect(items[0].answerKey).toBe('1.0612')
    expect(items[0].examinerReport).toContain('common mistake')
    expect(items[1].answerKey).toBe('')
    expect(items[0].sitting).toBe('Fall 2019')
  })

  it('prices a part at the exam’s pace, never under a minute and a half', () => {
    expect(items[0].minutes).toBeCloseTo(1.5 * 240 / 55, 1)
    expect(items[1].minutes).toBe(MIN_ITEM_MINUTES)
  })

  it('serves an unlettered question whole, under its own id', () => {
    const whole = question('Explain why the chain ladder overstates a large loss.\n\n### Explanation\nIt scales the whole diagonal.')
    const [item] = itemsForQuestion(whole, exam5)
    expect(item.id).toBe('cas5-2019f-q3')
    expect(item.partLabel).toBeNull()
    expect(item.prompt).toContain('Explain why')
    expect(item.preamble).toBe('')
  })

  it('serves a multiple-choice question whole, with its options', () => {
    const mc = question('Which is a large loss?\n\n- A) One\n- B) Two\n\n## Explanation\nB.', { type: 'multiple-choice', answer: 'B' })
    const [item] = itemsForQuestion(mc, exam5)
    expect(item.options.map(o => o.key)).toEqual(['A', 'B'])
    expect(item.answerKey).toBe('B')
  })

  it('serves only the exam’s on-syllabus questions', () => {
    expect(isServable(q, exam5)).toBe(true)
    expect(isServable({ ...q, exam: 'Exam 6C' }, exam5)).toBe(false)
    expect(isServable({ ...q, off_syllabus: true }, exam5)).toBe(false)
  })

  it('indexes items by concept', () => {
    const map = itemsByConcept(buildItems([q], exam5))
    expect(map.get('loss trend')?.map(i => i.id)).toEqual(['cas5-2019f-q3#a'])
    expect(map.get('large loss')?.map(i => i.id)).toEqual(['cas5-2019f-q3#b'])
  })
})
