import { describe, expect, it } from 'vitest'
import { buildConceptGraph, type GraphQuestion } from './conceptGraph'
import { connectionFor, craftGraph } from './conceptCraft'
import { nameRelation, phraseBetween, relationOf, relationSentence, writtenRelation } from './conceptRelations'

/** A topic from its pages, with questions tagged with each pair in `pairs` to tie them. */
function topic(pages: Record<string, string>, pairs: [string, string][] = []) {
  const page = (name: string) => pages[name]
  const questions: GraphQuestion[] = pairs.map(([a, b], i) => ({ id: `q${i}`, links: [`Concepts/${a}`, `Concepts/${b}`] }))
  return craftGraph(buildConceptGraph({ concepts: Object.keys(pages), page, questions, lines: [] }), page, questions)
}

describe('writtenRelation', () => {
  const written = { 'frequency|severity': '>multiplies with', 'credibility|homogeneity': '<trades off against', 'a|b': '=mirror' }

  it('reads the direction the label was written in', () => {
    expect(writtenRelation(written, 'Severity', 'Frequency')).toEqual({
      from: 'Frequency', to: 'Severity', label: 'multiplies with', symmetric: false, source: 'written',
    })
    expect(writtenRelation(written, 'Credibility', 'Homogeneity')).toMatchObject({ from: 'Homogeneity', to: 'Credibility' })
    expect(writtenRelation(written, 'A', 'B')).toMatchObject({ symmetric: true, label: 'mirror' })
  })

  it('has nothing for a pair not written', () => {
    expect(writtenRelation(written, 'Frequency', 'Exposure')).toBeNull()
    expect(writtenRelation(undefined, 'Frequency', 'Severity')).toBeNull()
  })
})

describe('phraseBetween', () => {
  it('reads the verb phrase a sentence puts between two names', () => {
    expect(phraseBetween('The **Gamma Distribution** is a generalization of the Exponential Distribution.', 'Exponential Distribution', 'Gamma Distribution'))
      .toEqual({ from: 'Gamma Distribution', to: 'Exponential Distribution', label: 'is a generalization of' })
    expect(phraseBetween('Severity is multiplied by frequency to give the pure premium.', 'Frequency', 'Severity'))
      .toEqual({ from: 'Severity', to: 'Frequency', label: 'is multiplied by' })
    expect(phraseBetween('[[Credibility|credibility]] offsets homogeneity.', 'Homogeneity', 'Credibility'))
      .toMatchObject({ label: 'offsets' })
  })

  it('reads plurals and hyphens as the name', () => {
    expect(phraseBetween('Severities are trended separately from frequencies.', 'Frequency', 'Severity'))
      .toMatchObject({ from: 'Severity', label: 'are trended separately from' })
  })

  it('reads nothing from a list, a clause, a long stretch or a bare copula', () => {
    expect(phraseBetween('Frequency and severity are both trended.', 'Frequency', 'Severity')).toBeNull()
    expect(phraseBetween('Frequency, unlike severity, is a count.', 'Frequency', 'Severity')).toBeNull()
    expect(phraseBetween('Frequency is, in most lines of business studied here, severity.', 'Frequency', 'Severity')).toBeNull()
    expect(phraseBetween('Frequency is severity.', 'Frequency', 'Severity')).toBeNull()
    expect(phraseBetween('Frequency of severity.', 'Frequency', 'Severity')).toBeNull()
    expect(phraseBetween('Frequency is shown.', 'Frequency', 'Severity')).toBeNull()
    // A phrase has to lead into the other name.
    expect(phraseBetween('Stationarity is the assumption ARIMA models need.', 'Stationarity', 'ARIMA')).toBeNull()
    expect(phraseBetween('Ratios are the standard ratios — frequency first.', 'Ratios', 'Frequency')).toBeNull()
  })
})

describe('nameRelation', () => {
  it('reads one name inside another', () => {
    expect(nameRelation('Loss Ratio', 'Expected Loss Ratio')).toEqual({ from: 'Expected Loss Ratio', to: 'Loss Ratio', label: 'is a kind of', symmetric: false })
    expect(nameRelation('Loss Ratio Method', 'Loss Ratio')).toMatchObject({ from: 'Loss Ratio Method', label: 'is built around' })
  })

  it('reads a head word in common', () => {
    expect(nameRelation('Spot Rate', 'Forward Rates')).toEqual({ from: 'Spot Rate', to: 'Forward Rates', label: 'both are rates', symmetric: true })
    expect(nameRelation('Tail Factor', 'Age-to-Age Factor')).toMatchObject({ label: 'both are factors' })
    expect(nameRelation('Frequency', 'Severity')).toBeNull()
    expect(nameRelation('Complement of Credibility', 'Empirical Bayes Credibility')).toBeNull()
    expect(nameRelation('Discriminant Analysis', 'Exploratory Data Analysis')).toBeNull()
    expect(nameRelation('Chain Ladder Method', 'Frequency-Severity Method')).toMatchObject({ label: 'both are methods' })
  })
})

describe('relationOf', () => {
  // Steam is made from Fire and Water; Cloud from Steam and Air.
  const GRAPH = topic(
    {
      Fire: '**Fire** is hot.',
      Water: '**Water** is wet. Water is boiled by fire.',
      Earth: '**Earth** is solid.',
      Air: '**Air** is light.',
      Steam: '**Steam** is [[Water]] heated by [[Fire]].',
      Cloud: '**Cloud** is [[Steam]] carried on the [[Air]].',
      'Dry Earth': '**Dry Earth** is cracked.',
      Lone: '**Lone** stands apart.',
    },
    [['Fire', 'Water'], ['Water', 'Earth'], ['Earth', 'Air'], ['Fire', 'Air'], ['Steam', 'Air']],
  )
  const rel = (a: string, b: string, written = {}) => relationOf(GRAPH, connectionFor(GRAPH, a, b)!, { written })

  it('takes a written label first', () => {
    expect(rel('Fire', 'Water', { 'fire|water': '<puts out' })).toMatchObject({ from: 'Water', to: 'Fire', label: 'puts out', source: 'written' })
  })

  it('says what the pair makes, or which is an ingredient of the other', () => {
    expect(rel('Fire', 'Water')).toMatchObject({ label: 'together make Steam', source: 'recipe', symmetric: true })
    expect(rel('Steam', 'Water')).toMatchObject({ from: 'Water', to: 'Steam', label: 'is a building block of', source: 'ingredient' })
  })

  it('reads the names', () => {
    expect(rel('Earth', 'Dry Earth')).toMatchObject({ from: 'Dry Earth', to: 'Earth', label: 'is a kind of', source: 'name' })
  })

  it('reads what the pair shares, or what ties it to a third', () => {
    // Fire and Steam: both go into the recipes — Steam's own — so Fire is an ingredient of Steam.
    expect(rel('Fire', 'Steam').source).toBe('ingredient')
    // Fire and Air both feed something only through Steam → Cloud; the questions tie them.
    expect(rel('Fire', 'Air')).toMatchObject({ source: 'evidence', label: 'are tested together' })
    // Fire and Earth: nothing direct; through Water or Air.
    expect(rel('Fire', 'Earth')).toMatchObject({ source: 'path' })
    expect(rel('Fire', 'Earth').label).toMatch(/^linked through (Water|Air)$/)
  })

  it('always says something', () => {
    const r = relationOf(GRAPH, connectionFor(GRAPH, 'Lone', 'Fire')!, {
      placement: n => ({ topics: n === 'Lone' ? ['t1'] : ['t2'], exams: ['Exam P'] }),
    })
    expect(r).toMatchObject({ label: 'both on Exam P', source: 'place' })
    expect(relationOf(GRAPH, connectionFor(GRAPH, 'Lone', 'Fire')!).label).toBe('share the actuarial syllabus')
  })

  it('reads as a sentence, one said of both naming both first', () => {
    expect(relationSentence(rel('Steam', 'Water'))).toBe('Water is a building block of Steam')
    expect(relationSentence(rel('Fire', 'Water'))).toBe('Fire and Water together make Steam')
  })
})
