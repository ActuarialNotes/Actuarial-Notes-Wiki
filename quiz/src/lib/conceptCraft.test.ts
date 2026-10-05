import { describe, expect, it } from 'vitest'
import {
  CRAFT_RELATIONS,
  EMPTY_PROGRESS,
  NO_LINK,
  availableNodes,
  challengeOrder,
  combine,
  conceptSummary,
  craftPlan,
  dailyChallenge,
  findRecipe,
  moduleNodes,
  moduleProblems,
  moduleTally,
  nodeDepths,
  nextCraft,
  nodeConnections,
  pairKey,
  recipeId,
  relationQuestion,
  stepsToTarget,
  withRecipe,
  type CraftModule,
  type CraftProgress,
} from './conceptCraft'

// A small reserving book: three primitives, an ingredient that joins at a
// milestone, a result with two routes, and a chain three crafts deep.
const BOOK: CraftModule = {
  id: 'test-book',
  exam: 'CAS-5',
  examPage: 'Exam 5 (CAS)',
  objectives: ['B. Estimating Claim Liabilities (Reserving)'],
  title: 'Test',
  blurb: '',
  primitives: ['Paid', 'Case', 'CDF'],
  introduces: [{ after: 'Chain Ladder', nodes: ['ELR', 'Premium'] }],
  recipes: [
    { a: 'Paid', b: 'Case', relation: 'plus', result: 'Reported', why: 'Paid plus case.' },
    { a: 'Reported', b: 'CDF', relation: 'times', result: 'Chain Ladder', why: 'Reported times CDF.' },
    { a: 'Paid', b: 'CDF', relation: 'times', result: 'Chain Ladder', why: 'Paid times paid CDF.' },
    { a: 'ELR', b: 'Premium', relation: 'times', result: 'Expected', why: 'ELR times premium.' },
    { a: 'Chain Ladder', b: 'Expected', relation: 'weighted', result: 'BF', why: 'Weighted.' },
  ],
}

function found(...pairs: [string, string][]): CraftProgress {
  return pairs.reduce<CraftProgress>((p, [a, b]) => withRecipe(p, { a, b }), EMPTY_PROGRESS)
}

describe('pairs', () => {
  it('reads a pair the same in either order and either case', () => {
    expect(pairKey('Paid', 'Case')).toBe(pairKey('case', 'PAID'))
    expect(recipeId({ a: 'Reported', b: 'CDF' })).toBe(pairKey('CDF', 'Reported'))
  })

  it('finds a recipe from either ingredient', () => {
    expect(findRecipe(BOOK, 'Case', 'Paid')?.result).toBe('Reported')
    expect(findRecipe(BOOK, 'Case', 'CDF')).toBeNull()
  })
})

describe('availableNodes', () => {
  it('starts with the primitives', () => {
    expect(availableNodes(BOOK, EMPTY_PROGRESS)).toEqual(['Paid', 'Case', 'CDF'])
  })

  it('adds each result, and a milestone’s ingredients right after the node that earns them', () => {
    const progress = found(['Paid', 'CDF'])
    expect(availableNodes(BOOK, progress)).toEqual(['Paid', 'Case', 'CDF', 'Chain Ladder', 'ELR', 'Premium'])
  })

  it('ignores a stored recipe the book no longer has', () => {
    expect(availableNodes(BOOK, { recipes: ['gone|missing'] })).toEqual(['Paid', 'Case', 'CDF'])
  })
})

describe('combine', () => {
  it('says nothing combines with itself or with an unrelated concept', () => {
    expect(combine(BOOK, EMPTY_PROGRESS, 'Paid', 'Paid')).toEqual({ kind: 'none' })
    expect(combine(BOOK, EMPTY_PROGRESS, 'Case', 'CDF')).toEqual({ kind: 'none' })
  })

  it('reports a new link, a new node, and anything a milestone introduces', () => {
    const outcome = combine(BOOK, EMPTY_PROGRESS, 'CDF', 'Paid')
    expect(outcome.kind).toBe('new')
    if (outcome.kind !== 'new') return
    expect(outcome.recipe.result).toBe('Chain Ladder')
    expect(outcome.newNode).toBe(true)
    expect(outcome.introduces).toEqual(['ELR', 'Premium'])
  })

  it('reports a second route to a held concept as a new link but not a new node', () => {
    const progress = found(['Paid', 'CDF'], ['Paid', 'Case'])
    const outcome = combine(BOOK, progress, 'Reported', 'CDF')
    expect(outcome).toMatchObject({ kind: 'new', newNode: false, introduces: [] })
  })

  it('reports a pair already found as known', () => {
    const progress = found(['Paid', 'Case'])
    expect(combine(BOOK, progress, 'Case', 'Paid')).toMatchObject({ kind: 'known' })
  })
})

describe('withRecipe', () => {
  it('is idempotent', () => {
    const once = found(['Paid', 'Case'])
    expect(withRecipe(once, { a: 'Case', b: 'Paid' })).toBe(once)
  })
})

describe('moduleTally', () => {
  it('counts nodes and links, and is complete only when every recipe is found', () => {
    expect(moduleTally(BOOK, EMPTY_PROGRESS)).toEqual({ nodes: 3, totalNodes: 9, links: 0, totalLinks: 5, complete: false })
    const all = found(['Paid', 'Case'], ['Reported', 'CDF'], ['Paid', 'CDF'], ['ELR', 'Premium'], ['Chain Ladder', 'Expected'])
    expect(moduleTally(BOOK, all)).toMatchObject({ nodes: 9, links: 5, complete: true })
  })

  it('lists every node once, primitives first', () => {
    expect(moduleNodes(BOOK).slice(0, 5)).toEqual(['Paid', 'Case', 'CDF', 'ELR', 'Premium'])
    expect(new Set(moduleNodes(BOOK)).size).toBe(moduleNodes(BOOK).length)
  })
})

describe('relationQuestion', () => {
  // A fixed sequence, so the shuffles are reproducible.
  const rng = () => 0.42

  it('offers the right relation, two others and No direct link, last', () => {
    const q = relationQuestion(BOOK, 'Paid', 'Case', rng)
    expect(q.answer).toBe('plus')
    expect(q.choices).toHaveLength(4)
    expect(q.choices.filter(c => c.id === 'plus')).toHaveLength(1)
    expect(q.choices[3]).toEqual({ id: NO_LINK, label: 'No direct link' })
    expect(new Set(q.choices.map(c => c.id)).size).toBe(4)
  })

  it('asks of an unrelated pair too, with No direct link as the answer', () => {
    const q = relationQuestion(BOOK, 'Case', 'CDF', rng)
    expect(q.answer).toBe(NO_LINK)
    expect(q.choices).toHaveLength(4)
    expect(q.choices.slice(0, 3).every(c => c.id !== NO_LINK)).toBe(true)
  })

  it('draws its distractors from the module’s own relations first', () => {
    const q = relationQuestion(BOOK, 'Paid', 'Case', Math.random)
    const local = new Set(BOOK.recipes.map(r => r.relation))
    // The book uses three relations: the answer plus both distractors are all of them.
    expect(q.choices.slice(0, 3).every(c => local.has(c.id as never))).toBe(true)
  })

  it('labels every choice from the vocabulary', () => {
    const q = relationQuestion(BOOK, 'Chain Ladder', 'Expected', rng)
    for (const c of q.choices.slice(0, 3)) expect(c.label).toBe(CRAFT_RELATIONS[c.id as keyof typeof CRAFT_RELATIONS].label)
  })
})

describe('craftPlan and stepsToTarget', () => {
  it('is empty for a held concept and null for one the book never makes', () => {
    expect(craftPlan(BOOK, EMPTY_PROGRESS, 'Paid')).toEqual([])
    expect(craftPlan(BOOK, EMPTY_PROGRESS, 'Nowhere')).toBeNull()
  })

  it('takes the shorter route', () => {
    // Chain Ladder: one craft from Paid + CDF, two by way of Reported.
    expect(stepsToTarget(BOOK, EMPTY_PROGRESS, 'Chain Ladder')).toBe(1)
  })

  it('counts through a milestone: BF needs Chain Ladder, then Expected, then itself', () => {
    const plan = craftPlan(BOOK, EMPTY_PROGRESS, 'BF')
    expect(plan?.map(r => r.result)).toEqual(['Chain Ladder', 'Expected', 'BF'])
  })

  it('hints the first craft of the plan that can be made now', () => {
    expect(nextCraft(BOOK, EMPTY_PROGRESS, 'BF')?.result).toBe('Chain Ladder')
    expect(nextCraft(BOOK, found(['Paid', 'CDF']), 'BF')?.result).toBe('Expected')
  })
})

describe('dailyChallenge', () => {
  it('is the same all day and differs between days', () => {
    const a = challengeOrder(BOOK, '2026-10-05')
    expect(challengeOrder(BOOK, '2026-10-05')).toEqual(a)
    const days = ['2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09'].map(d => challengeOrder(BOOK, d).join())
    expect(days.some(d => d !== a.join())).toBe(true)
  })

  it('never moves when something other than the target is crafted', () => {
    const date = '2026-10-05'
    const target = dailyChallenge(BOOK, EMPTY_PROGRESS, date)!
    const other = BOOK.recipes.find(r => r.result !== target && ['Paid', 'Case', 'CDF'].includes(r.a) && ['Paid', 'Case', 'CDF'].includes(r.b))!
    expect(dailyChallenge(BOOK, withRecipe(EMPTY_PROGRESS, other), date)).toBe(other.result === target ? null : target)
  })

  it('passes over the ones skipped, and is null once everything is held', () => {
    const date = '2026-10-05'
    const first = dailyChallenge(BOOK, EMPTY_PROGRESS, date)
    expect(dailyChallenge(BOOK, EMPTY_PROGRESS, date, 1)).not.toBe(first)
    const all = found(['Paid', 'Case'], ['Paid', 'CDF'], ['ELR', 'Premium'], ['Chain Ladder', 'Expected'])
    expect(dailyChallenge(BOOK, all, date)).toBeNull()
  })
})

describe('nodeConnections', () => {
  it('splits the found links by direction and counts the rest without naming them', () => {
    const progress = found(['Paid', 'CDF'])
    expect(nodeConnections(BOOK, progress, 'Chain Ladder')).toMatchObject({
      madeFrom: [expect.objectContaining({ a: 'Paid', b: 'CDF' })],
      usedIn: [],
      undiscovered: 2,
    })
    expect(nodeConnections(BOOK, progress, 'Paid').undiscovered).toBe(1)
  })
})

describe('moduleProblems', () => {
  it('passes a sound book', () => {
    expect(moduleProblems(BOOK)).toEqual([])
  })

  it('catches a pair listed twice, an unreachable recipe and a bad primitive count', () => {
    const broken: CraftModule = {
      ...BOOK,
      primitives: ['Paid', 'Case'],
      recipes: [
        ...BOOK.recipes,
        { a: 'Case', b: 'Paid', relation: 'minus', result: 'Other', why: 'x' },
        { a: 'Ghost', b: 'Case', relation: 'plus', result: 'Spirit', why: 'x' },
      ],
    }
    const problems = moduleProblems(broken).join('\n')
    expect(problems).toMatch(/three to five primitives/)
    expect(problems).toMatch(/listed twice/)
    expect(problems).toMatch(/Ghost can never be reached/)
    expect(problems).toMatch(/Ghost \+ Case can never be made/)
  })
})

describe('conceptSummary', () => {
  const page = [
    '---',
    'verification:',
    '  status: unverified',
    '---',
    '',
    '**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has been reported an estimate of what has *not*, using the [[Development Triangle|development pattern]].',
    '',
    '> $$U_{\\text{BF}} = C + (1 - 1/\\text{CDF}) U_0$$',
    '',
    '> $$\\text{IBNR} = (1 - 1/\\text{CDF}) \\times \\text{ELR} \\times \\text{EP}$$',
    '',
    '- A bullet.',
    '',
    '> [!example]- Worked {Example}',
    '> > $$x = 1$$',
  ].join('\n')

  it('reads the opening definition with its links flattened', () => {
    const { lead } = conceptSummary(page)
    expect(lead).toMatch(/^\*\*Bornhuetter-Ferguson Method\*\*/)
    expect(lead).toContain('development pattern')
    expect(lead).not.toContain('[[')
  })

  it('takes the opening formula box and nothing from the examples', () => {
    const { formulas } = conceptSummary(page)
    expect(formulas).toHaveLength(2)
    expect(formulas[0]).toMatch(/^U_\{\\text\{BF\}\}/)
    expect(conceptSummary(page, 1).formulas).toHaveLength(1)
  })

  it('finds a box a bullet leads into, but never one inside a heading’s section or a callout', () => {
    expect(conceptSummary('A **thing** is a thing.\n\n- calculated as:\n> $$P = 1$$').formulas).toEqual(['P = 1'])
    expect(conceptSummary('A **thing** is a thing.\n\n## Later\n\n> $$late$$').formulas).toEqual([])
    expect(conceptSummary('A **thing** is a thing.\n\n> [!example]- E\n> > $$x$$').formulas).toEqual([])
  })
})

describe('nodeDepths', () => {
  it('puts primitives on row 0 and each result a row under its deeper ingredient', () => {
    const progress = found(['Paid', 'Case'], ['Reported', 'CDF'], ['ELR', 'Premium'], ['Chain Ladder', 'Expected'])
    const d = nodeDepths(BOOK, progress)
    expect(d.get('paid')).toBe(0)
    expect(d.get('reported')).toBe(1)
    expect(d.get('chain ladder')).toBe(2)
    // Introduced at Chain Ladder: on its row.
    expect(d.get('elr')).toBe(2)
    expect(d.get('expected')).toBe(3)
    expect(d.get('bf')).toBe(4)
  })

  it('takes the shallowest route found', () => {
    const d = nodeDepths(BOOK, found(['Paid', 'Case'], ['Reported', 'CDF'], ['Paid', 'CDF']))
    expect(d.get('chain ladder')).toBe(1)
  })
})
