import { describe, expect, it } from 'vitest'
import { buildConceptGraph, type GraphQuestion } from './conceptGraph'
import {
  RECIPES,
  abbreviationOf,
  beforeAside,
  buildRecipes,
  openingNames,
  pageOpening,
  recipesByPair,
  type Recipe,
} from './conceptRecipes'

// A small ratemaking topic, written the way the vault writes its pages: a bold
// definition, a formula box, the points under them.
const PAGES: Record<string, string> = {
  Frequency: '**Frequency** is the number of claims per unit of risk.\n\n- It moves with [[Severity]].',
  Severity: '**Severity** is the average size of a claim.\n\n- See [[Frequency]].',
  'Pure Premium': [
    '**Pure Premium** (PP) is the claim cost per unit of risk.',
    '',
    '> $$\\text{Pure Premium} = \\text{Frequency} \\times \\text{Severity}$$',
    '',
    '- It is used to compute the [[Loss Ratio]].',
  ].join('\n'),
  'Loss Ratio': '**Loss Ratio** is losses over premium: the [[Pure Premium]] divided by the [[Average Premium]].',
  // Names the loss ratio — which is built from it, so is never one of its causes.
  'Average Premium': '**Average Premium** (AP) is premium per unit of risk.\n\n- Set it beside the [[Loss Ratio]].',
  // A list names each of its concepts faintly.
  'Basic Ratios': '**Basic Ratios** are the standard ratios — [[Frequency]], [[Severity]], [[Pure Premium]], [[Loss Ratio]] and [[Average Premium]].',
  // Named together in one short point, under a definition that names neither.
  'Loss Trend': '**Loss Trend** is the change in claim cost over time.\n\n- It combines the [[Frequency]] trend and the [[Severity]] trend.',
  // Named in a long point only: no recipe.
  'Loss Data': '**Loss Data** is what a book records.\n\n- It holds [[Frequency]], [[Severity]], [[Pure Premium]] and [[Loss Ratio]] alike.',
  // A foundation — more of the topic's definitions build on it than on either
  // of the two it works with — that only a point under it ties to them.
  Ratemaking: '**Ratemaking** is setting insurance rates.\n\n- It works with the [[Pure Premium]] and the [[Loss Ratio]].',
  'Rate Change': '**Rate Change** is the result of [[Ratemaking]].',
  'Rate Filing': '**Rate Filing** is a step of [[Ratemaking]].',
  'Rate Review': '**Rate Review** checks [[Ratemaking]].',
  Credibility: '**Credibility** weighs data in [[Ratemaking]].',
  // Defined by abbreviations in its formula, its own on the left.
  'Expected Loss': '**Expected Loss** (EL) is the cost a book expects.\n\n> $$\\text{EL} = \\text{PP} \\times \\text{AP}$$',
}
const CONCEPTS = Object.keys(PAGES)
// Connections the pages alone don't make.
const QUESTIONS: GraphQuestion[] = [
  { id: 'q1', links: ['Concepts/Pure Premium', 'Concepts/Average Premium'] },
  { id: 'q2', links: ['Concepts/Pure Premium', 'Concepts/Loss Ratio'] },
]
const page = (name: string) => PAGES[name]
const GRAPH = buildConceptGraph({ concepts: CONCEPTS, page, questions: QUESTIONS, lines: [] })
const RECIPE_LIST = buildRecipes(GRAPH, page)
const MAKES = recipesByPair(RECIPE_LIST)

const recipesFor = (made: string) => RECIPE_LIST.filter(r => r.makes === made)
const pair = (r: Recipe) => `${r.a} + ${r.b}`

describe('reading a page', () => {
  it('cuts a sentence at what the concept is for, set against, or an instance of', () => {
    expect(beforeAside('It is the ratio of losses to premium, used to compute the indication.')).toBe('It is the ratio of losses to premium, ')
    expect(beforeAside('A weighting of data rather than a model of it.')).toBe('A weighting of data ')
    expect(beforeAside('A ratio, such as the loss ratio.')).toBe('A ratio, ')
    expect(beforeAside('It is the basis for the pure premium method.')).toBe('It ')
    expect(beforeAside('See [[Frequency]].')).toBe('')
    expect(beforeAside('Frequency times severity.')).toBe('Frequency times severity.')
  })

  it('reads the opening up to the first callout, figure or heading after it, formulas apart', () => {
    const markdown = [
      '---',
      'verification: {}',
      '---',
      '## Pure Premium',
      '**Pure Premium** is the expected loss.',
      '',
      '> $$\\begin{aligned} \\text{Pure Premium} &= \\text{Frequency}',
      '> \\times \\text{Severity} \\end{aligned}$$',
      '',
      '- A point.',
      '',
      '![[Media/Figures/Pure_Premium.svg|340]]',
      '',
      'Past the figure.',
    ].join('\n')
    expect(pageOpening(markdown)).toEqual({
      prose: ['**Pure Premium** is the expected loss.', '- A point.'],
      formulas: ['$$\\begin{aligned} \\text{Pure Premium} &= \\text{Frequency} \\times \\text{Severity} \\end{aligned}$$'],
    })
    expect(pageOpening('Lead.\n\n> [!example]- An example\n> Inside.').prose).toEqual(['Lead.'])
  })

  it('takes the abbreviation a page gives its own name, and nothing else in brackets', () => {
    expect(abbreviationOf(PAGES['Pure Premium'])).toBe('PP')
    expect(abbreviationOf('The **present value** (PV) is the value today.')).toBe('PV')
    expect(abbreviationOf('**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is …')).toBe('CDF')
    expect(abbreviationOf('**Pure Premium** (also *loss cost*) is …')).toBeUndefined()
    expect(abbreviationOf('**Exponential** (Exp) is …')).toBeUndefined()
  })

  it('names what a definition, its formula and the points under it are made of — and where', () => {
    const names = openingNames('Pure Premium', PAGES['Pure Premium'], CONCEPTS)
    expect(names.map(n => [n.name, n.place, n.among])).toEqual([
      ['Frequency', 3, 2],
      ['Severity', 3, 2],
    ])
    // "used to compute the Loss Ratio" is what it is for, not what it is made of.
    expect(names.some(n => n.name === 'Loss Ratio')).toBe(false)
    expect(names[0].text).toBe('$$\\text{Pure Premium} = \\text{Frequency} \\times \\text{Severity}$$')
  })
})

describe('recipes', () => {
  it('makes a concept from what its definition is built from', () => {
    expect(recipesFor('Pure Premium').map(pair)).toEqual(['Frequency + Severity'])
    expect(recipesFor('Pure Premium')[0].text).toBe('$$\\text{Pure Premium} = \\text{Frequency} \\times \\text{Severity}$$')
    expect(recipesFor('Loss Ratio').map(pair)).toEqual(['Average Premium + Pure Premium'])
  })

  it('reads a formula written in abbreviations', () => {
    expect(recipesFor('Expected Loss').map(pair)).toEqual(['Average Premium + Pure Premium'])
    expect(recipesFor('Expected Loss')[0].text).toBe('$$\\text{EL} = \\text{PP} \\times \\text{AP}$$')
  })

  it('never makes a concept from its own effects', () => {
    // The average premium's page names the loss ratio, but the loss ratio is built from it.
    expect(openingNames('Average Premium', PAGES['Average Premium'], CONCEPTS).map(n => n.name)).toEqual(['Loss Ratio'])
    expect(recipesFor('Average Premium')).toEqual([])
  })

  it('does not make a foundation of the topic from narrower concepts', () => {
    expect(recipesFor('Ratemaking')).toEqual([])
  })

  it('takes two concepts named together in one short point, and not in a long one', () => {
    expect(recipesFor('Loss Trend').map(pair)).toEqual(['Frequency + Severity'])
    expect(recipesFor('Loss Data')).toEqual([])
  })

  it('ranks a list below a definition that names just the two', () => {
    // Every recipe a five-concept list gives scores below the two-concept formula's.
    const fromList = Math.max(...recipesFor('Basic Ratios').map(r => r.score))
    expect(fromList).toBeLessThan(recipesFor('Pure Premium')[0].score)
    expect(fromList).toBeLessThan(recipesFor('Pure Premium')[0].score * RECIPES.nearBest)
  })

  it('keeps each concept’s best recipes', () => {
    for (const made of CONCEPTS) expect(recipesFor(made).length).toBeLessThanOrEqual(RECIPES.perConcept)
    expect(recipesFor('Basic Ratios')).toHaveLength(RECIPES.perConcept)
  })
})

describe('recipesByPair', () => {
  it('makes what a connection explains best, and nothing it explains much worse', () => {
    // Frequency and severity are the pure premium's formula; the loss trend and
    // the basic ratios only mention them, so this connection makes the pure premium alone.
    expect(MAKES.get('frequency|severity')?.map(r => r.makes)).toEqual(['Pure Premium'])
    // Two definitions built from the same pair, both made.
    expect(MAKES.get('average premium|pure premium')?.map(r => r.makes)).toEqual(['Loss Ratio', 'Expected Loss'])
  })

  it('makes at most three', () => {
    const many: Recipe[] = ['W', 'X', 'Y', 'Z'].map(makes => ({ a: 'A', b: 'B', makes, score: 5, text: '' }))
    expect(recipesByPair(many).get('a|b')).toHaveLength(RECIPES.perPair)
  })
})
