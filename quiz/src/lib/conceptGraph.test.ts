import { describe, expect, it } from 'vitest'
import {
  MIN_STRENGTH,
  buildConceptGraph,
  connectionStrength,
  flattenLine,
  linkTargetName,
  nameForms,
  otherEnd,
  pageMentions,
  pairKey,
  sentenceAround,
  strengthTier,
  type StrengthEvidence,
} from './conceptGraph'

const none = { links: 0, texts: 0, share: 0 }
const evidence = (over: Partial<StrengthEvidence>): StrengthEvidence => ({
  ab: none,
  ba: none,
  questionWeight: 0,
  lineSize: 0,
  ...over,
})

describe('pairKey and linkTargetName', () => {
  it('make one key of a pair, whichever way round and whatever the case', () => {
    expect(pairKey('Severity', 'frequency')).toBe(pairKey('Frequency', 'Severity'))
    expect(pairKey('A', 'B')).toBe('a|b')
  })

  it('read a link target as the page name it points at', () => {
    expect(linkTargetName('Concepts/Bornhuetter-Ferguson Method.md')).toBe('Bornhuetter-Ferguson Method')
    expect(linkTargetName('Credibility#Bühlmann')).toBe('Credibility')
    expect(linkTargetName('  Loss Ratio ')).toBe('Loss Ratio')
  })
})

describe('flattenLine', () => {
  it('reads links as their text and notes where each landed', () => {
    const flat = flattenLine('Uses [[Loss Ratio|loss ratios]] and [[Concepts/Pure Premium]].')
    expect(flat.text).toBe('Uses loss ratios and Pure Premium.')
    expect(flat.links).toEqual([
      { at: 5, target: 'Loss Ratio' },
      { at: 21, target: 'Concepts/Pure Premium' },
    ])
  })

  it('drops image embeds and keeps math, but marks links and math as not plain text', () => {
    const flat = flattenLine('See ![[Media/x.svg|340]] where $E[X]$ is [[Mean]] here')
    expect(flat.text).toBe('See  where $E[X]$ is Mean here')
    const at = (s: string) => flat.text.indexOf(s)
    expect(flat.open[at('where')]).toBe(true)
    expect(flat.open[at('E[X]')]).toBe(false)
    expect(flat.open[at('Mean')]).toBe(false)
    expect(flat.open[at('here')]).toBe(true)
  })

  it('leaves an escaped dollar as text rather than opening math', () => {
    const flat = flattenLine('Costs \\$400 per exposure')
    expect(flat.text).toBe('Costs \\$400 per exposure')
    expect(flat.open.every(Boolean)).toBe(true)
  })
})

describe('sentenceAround', () => {
  const line = 'Frequency counts claims. Severity, e.g. the average cost, sizes them. Pure premium is $F \\times S$. Done.'

  it('cuts out the sentence a position sits in', () => {
    expect(sentenceAround(line, line.indexOf('average'))).toBe('Severity, e.g. the average cost, sizes them.')
    expect(sentenceAround(line, 0)).toBe('Frequency counts claims.')
  })

  it('does not cut inside math or after an abbreviation', () => {
    expect(sentenceAround(line, line.indexOf('Pure'))).toBe('Pure premium is $F \\times S$.')
    expect(sentenceAround('Use 2.5 units. Then stop.', 1)).toBe('Use 2.5 units.')
  })
})

describe('nameForms', () => {
  it('reads a plural name in the singular too', () => {
    expect(nameForms('Bonds')).toEqual(['bonds', 'bond'])
    expect(nameForms('Annuities')).toEqual(['annuities', 'annuity'])
    expect(nameForms('Bornhuetter-Ferguson Method')).toEqual(['bornhuetter ferguson method'])
    expect(nameForms('Severity')).toEqual(['severities', 'severity'])
    expect(nameForms('Loss')).toEqual(['loss'])
  })
})

describe('pageMentions', () => {
  const page = [
    '---',
    'verification:',
    '  status: unverified',
    '---',
    '**Pure Premium** is [[Frequency]] times [[Severity|severity]]. It ignores the loss ratio.',
    '',
    '## Formula',
    '> $$PP = F \\times S$$',
    '> [!example]- Worked {Example}',
    '> A loss ratio of 60% and a Loss Ratio Method review. See ![[Media/Pure_Premium.svg|340]]',
    '- The pure premium method rests on it.',
    '%% [[Hidden]] %%',
    '<!-- [[Commented]] -->',
    '| [[Exposure Base]] | divides losses |',
  ].join('\n')
  const names = ['Pure Premium', 'Loss Ratio', 'Loss Ratio Method', 'Frequency', 'Severity', 'Exposure Base']
  const mentions = pageMentions('Pure Premium', page, names)

  it('finds every link, with its sentence, skipping headings, formula boxes, comments and embeds', () => {
    const linked = mentions.filter(m => m.linked)
    expect(linked.map(m => m.to)).toEqual(['Frequency', 'Severity', 'Exposure Base'])
    expect(linked[0].text).toBe('**Pure Premium** is Frequency times severity.')
    expect(linked[0].prose).toBe(true)
  })

  it('reads a table row whole and not as prose', () => {
    const row = mentions.find(m => m.to === 'Exposure Base')!
    expect(row.text).toBe('Exposure Base divides losses')
    expect(row.prose).toBe(false)
  })

  it('finds names written out without a link, longest first, never the page’s own', () => {
    const named = mentions.filter(m => !m.linked)
    expect(named.map(m => [m.to, m.prose])).toEqual([
      ['Loss Ratio', true],
      ['Loss Ratio', false],
      ['Loss Ratio Method', false],
    ])
    expect(named[0].text).toBe('It ignores the loss ratio.')
    // "The pure premium method" is the page's own name, not "Pure Premium" another page names.
    expect(mentions.some(m => m.to === 'Pure Premium')).toBe(false)
  })

  it('does not read a name inside a longer word', () => {
    const found = pageMentions('X', 'Severityless claims and severities both.', ['Severity'])
    expect(found.map(m => m.text)).toEqual(['Severityless claims and severities both.'])
  })

  it('looks for no names when none are given', () => {
    expect(pageMentions('A', 'A page about B and [[C]].').map(m => m.to)).toEqual(['C'])
  })
})

describe('connectionStrength', () => {
  it('is nothing without evidence and climbs toward 100 as evidence piles up', () => {
    expect(connectionStrength(evidence({}))).toBe(0)
    const one = connectionStrength(evidence({ ab: { links: 1, texts: 0, share: 0 } }))
    const both = connectionStrength(evidence({ ab: { links: 1, texts: 0, share: 0 }, ba: { links: 1, texts: 0, share: 0 } }))
    const all = connectionStrength(evidence({
      ab: { links: 2, texts: 0, share: 0 },
      ba: { links: 2, texts: 0, share: 0 },
      questionWeight: 6,
      lineSize: 2,
    }))
    expect(one).toBe(40)
    expect(both).toBe(64)
    expect(all).toBeGreaterThan(90)
    expect(all).toBeLessThan(100)
  })

  it('counts a link for more than a name in passing, and a common name for less', () => {
    const link = connectionStrength(evidence({ ab: { links: 1, texts: 0, share: 0 } }))
    const rare = connectionStrength(evidence({ ab: { links: 0, texts: 3, share: 0 } }))
    const common = connectionStrength(evidence({ ab: { links: 0, texts: 3, share: 0.8 } }))
    expect(rare).toBe(25)
    expect(link).toBeGreaterThan(rare)
    expect(common).toBeLessThan(MIN_STRENGTH)
  })

  it('gives a short syllabus line more weight than a long one', () => {
    const short = connectionStrength(evidence({ lineSize: 3 }))
    const long = connectionStrength(evidence({ lineSize: 20 }))
    expect(short).toBe(35)
    expect(long).toBeLessThan(short)
  })

  it('lets questions add up, but never alone to certainty', () => {
    const few = connectionStrength(evidence({ questionWeight: 1 }))
    const many = connectionStrength(evidence({ questionWeight: 30 }))
    expect(few).toBe(20)
    expect(many).toBeLessThanOrEqual(70)
    expect(many).toBeGreaterThan(few)
  })
})

describe('strengthTier', () => {
  it('names the band a strength falls in', () => {
    expect(strengthTier(15)).toBe('weak')
    expect(strengthTier(40)).toBe('moderate')
    expect(strengthTier(69)).toBe('moderate')
    expect(strengthTier(70)).toBe('strong')
  })
})

describe('buildConceptGraph', () => {
  const pages: Record<string, string> = {
    Frequency: 'Frequency is claims per exposure. With [[Severity]] it makes the [[Pure Premium]].',
    Severity: '[[Severity]] is the cost per claim, as distinct from [[Frequency]].',
    'Pure Premium': 'The pure premium is frequency times severity.',
    Credibility: 'Unrelated to the rest.',
  }
  const graph = buildConceptGraph({
    concepts: ['Frequency', 'Severity', 'Pure Premium', 'Credibility', 'No Page'],
    page: name => pages[name],
    questions: [
      { id: 'q1', links: ['Concepts/Frequency', 'Concepts/Severity'] },
      { id: 'q2', links: ['Concepts/Frequency', 'Concepts/Severity', 'Concepts/Pure+Premium', 'Concepts/Other', 'Concepts/More'] },
      { id: 'q3', links: ['Concepts/Credibility'] },
    ],
    lines: [{ text: 'Calculate Frequency, Severity and Pure Premium', concepts: ['Frequency', 'Severity', 'Pure Premium'] }],
  })

  it('connects the pairs the evidence ties together, strongest first', () => {
    expect(graph.connections.map(c => c.key)).toEqual([
      'frequency|severity',
      'frequency|pure premium',
      'pure premium|severity',
    ])
    const fs = graph.byKey.get(pairKey('Severity', 'Frequency'))!
    expect(fs.a).toBe('Frequency')
    expect(fs.b).toBe('Severity')
    expect(fs.questions).toEqual(['q1', 'q2'])
    expect(fs.lines).toEqual(['Calculate Frequency, Severity and Pure Premium'])
    expect(fs.evidence.ab.links).toBe(1)
    expect(fs.evidence.ba.links).toBe(1)
    expect(fs.evidence.questionWeight).toBeCloseTo(1.25)
  })

  it('keeps each page’s own sentence, the best of each first', () => {
    const fs = graph.byKey.get('frequency|severity')!
    expect(fs.mentions.map(m => m.from)).toEqual(['Frequency', 'Severity'])
    expect(fs.mentions[1].text).toBe('Severity is the cost per claim, as distinct from Frequency.')
  })

  it('counts a name written out on a page as weaker evidence than a link', () => {
    const pp = graph.byKey.get('pure premium|severity')!
    expect(pp.evidence.ab.texts).toBe(1)
    expect(pp.mentions.some(m => !m.linked && m.from === 'Pure Premium')).toBe(true)
  })

  it('leaves a concept with no evidence unconnected, and lists each concept’s neighbours', () => {
    expect(graph.neighbours.get('credibility')).toBeUndefined()
    expect(graph.neighbours.get('frequency')?.map(c => otherEnd(c, 'Frequency'))).toEqual(['Severity', 'Pure Premium'])
    expect(graph.concepts).toContain('No Page')
  })

  it('drops pairs below the threshold', () => {
    for (const c of graph.connections) expect(c.strength).toBeGreaterThanOrEqual(MIN_STRENGTH)
  })
})
