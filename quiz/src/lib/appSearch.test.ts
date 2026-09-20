import { describe, it, expect } from 'vitest'
import { buildStudyIndex, inWikiScope, normalizeQuery, rankMatch, searchBy } from './appSearch'

describe('normalizeQuery', () => {
  it('folds case, curly apostrophes and runs of whitespace', () => {
    expect(normalizeQuery('  Bayes’   Theorem ')).toBe("bayes' theorem")
  })
})

describe('rankMatch', () => {
  it('ranks a prefix above a word start above a mid-word hit', () => {
    const prefix = rankMatch('Expected Value', 'exp')!
    const wordStart = rankMatch('Conditional Expectation', 'exp')!
    const inside = rankMatch('Unexpected Loss', 'exp')!
    expect(prefix).toBeLessThan(wordStart)
    expect(wordStart).toBeLessThan(inside)
  })

  it('matches every word of a multi-word query in any order, below a contiguous hit', () => {
    const contiguous = rankMatch('Expected Value', 'expected value')!
    const scattered = rankMatch('Expected Value', 'value expected')!
    expect(contiguous).toBeLessThan(scattered)
    expect(rankMatch('Loss Ratio Method', 'method loss')).not.toBeNull()
  })

  it('does not match a single word that is absent, or an empty side', () => {
    expect(rankMatch('Expected Value', 'poisson')).toBeNull()
    expect(rankMatch('Expected Value', '  ')).toBeNull()
    expect(rankMatch('', 'value')).toBeNull()
  })
})

describe('searchBy', () => {
  const items = [
    { name: 'Loss Ratio', author: 'Werner' },
    { name: 'Pure Premium', author: 'Werner' },
    { name: 'Werner & Modlin', author: 'CAS' },
  ]
  const fields = (i: (typeof items)[number]) => [i.name, i.author]

  it('puts a hit on the name above a hit on a later field', () => {
    expect(searchBy(items, 'werner', fields).map(i => i.name)).toEqual([
      'Werner & Modlin',
      'Loss Ratio',
      'Pure Premium',
    ])
  })

  it('breaks ties alphabetically and honours the limit', () => {
    expect(searchBy(items, 'werner', fields, 2).map(i => i.name)).toEqual([
      'Werner & Modlin',
      'Loss Ratio',
    ])
  })

  it('returns nothing for an empty query rather than everything', () => {
    expect(searchBy(items, '   ', fields)).toEqual([])
  })

  it('skips absent fields without counting them as a match', () => {
    const sparse = [{ name: 'Trend', author: undefined }]
    expect(searchBy(sparse, 'trend', i => [i.name, i.author])).toHaveLength(1)
    expect(searchBy(sparse, 'werner', i => [i.name, i.author])).toHaveLength(0)
  })
})

describe('inWikiScope', () => {
  it('keeps exam pages with the concepts and books with the resources', () => {
    expect(inWikiScope('concept', 'concepts')).toBe(true)
    expect(inWikiScope('exam', 'concepts')).toBe(true)
    expect(inWikiScope('document', 'concepts')).toBe(false)
    expect(inWikiScope('document', 'resources')).toBe(true)
    expect(inWikiScope('concept', 'resources')).toBe(false)
  })
})

describe('buildStudyIndex', () => {
  const syllabi = [
    {
      examLabel: 'Exam P-1',
      fileName: 'Exam P-1 (SOA)',
      topics: [{ concepts: [{ name: 'Expected Value', target: 'Concepts/Expected Value' }] }],
      resources: [{ name: 'Probability for Risk Management', target: 'Resources/Books/Probability for Risk Management' }],
    },
    {
      examLabel: 'Exam FM-2',
      fileName: 'Exam FM-2 (SOA)',
      topics: [{ concepts: [{ name: 'Expected Value', target: 'Concepts/Expected Value' }] }],
      resources: [],
    },
  ]

  it('lists each exam page, concept and resource once, alphabetically', () => {
    expect(buildStudyIndex(syllabi).map(e => `${e.kind}:${e.name}`)).toEqual([
      'exam:Exam FM-2 (SOA)',
      'exam:Exam P-1 (SOA)',
      'concept:Expected Value',
      'resource:Probability for Risk Management',
    ].sort((a, b) => a.split(':')[1].localeCompare(b.split(':')[1])))
  })

  it('collects every exam a shared concept is taught on', () => {
    const shared = buildStudyIndex(syllabi).find(e => e.name === 'Expected Value')!
    expect(shared.exams).toEqual(['Exam P-1', 'Exam FM-2'])
  })

  it('keeps the syllabus link target, so a resource page can be routed to', () => {
    const book = buildStudyIndex(syllabi).find(e => e.kind === 'resource')!
    expect(book.target).toBe('Resources/Books/Probability for Risk Management')
  })

  it('skips a blank name rather than indexing an empty row', () => {
    const empty = buildStudyIndex([
      { examLabel: 'Exam P-1', topics: [{ concepts: [{ name: '  ', target: '' }] }], resources: [] },
    ])
    expect(empty.filter(e => e.kind === 'concept')).toHaveLength(0)
  })
})
