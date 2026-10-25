import { describe, it, expect } from 'vitest'
import {
  conceptLabel,
  emptyFacets,
  examFilterLabel,
  facetOptions,
  hasFacetFilters,
  matchesFacets,
  splitSearchFilter,
  ticksFor,
  toggleFacet,
  toggleLevel,
  type FacetSelection,
} from './questionFilters'
import type { Question } from './parser'

function q(partial: Partial<Question>): Question {
  return {
    id: partial.id ?? `x-${Math.random().toString(36).slice(2)}`,
    exam: partial.exam ?? 'Exam 5',
    topic: partial.topic ?? 'Ratemaking',
    difficulty: partial.difficulty ?? 'medium',
    type: partial.type ?? 'multiple-choice',
    stem: partial.stem ?? 'Q',
    wiki_link: partial.wiki_link ?? [],
    year: partial.year,
    session: partial.session,
    originally_exam: partial.originally_exam,
  } as Question
}

function select(partial: Partial<Record<keyof FacetSelection, string[]>>): FacetSelection {
  const base = emptyFacets()
  return {
    difficulty: new Set(partial.difficulty ?? base.difficulty),
    type: new Set(partial.type ?? base.type),
    concept: new Set(partial.concept ?? base.concept),
    source: new Set(partial.source ?? base.source),
    exam: new Set(partial.exam ?? base.exam),
    sitting: new Set(partial.sitting ?? base.sitting),
  }
}

describe('conceptLabel', () => {
  it('reads a vault path and a slug path the same way', () => {
    expect(conceptLabel('Concepts/Geometric+Distribution.md')).toBe('Geometric Distribution')
    expect(conceptLabel('/probability/set-theory')).toBe('Set Theory')
  })

  it('capitalises words, not the letter after an accented one', () => {
    expect(conceptLabel('Concepts/Bühlmann-Straub+Credibility')).toBe('Bühlmann Straub Credibility')
    expect(conceptLabel("Concepts/Bayes'+Theorem")).toBe("Bayes' Theorem")
    expect(conceptLabel('Concepts/Probability+Density+Function+(PDF)')).toBe('Probability Density Function (PDF)')
  })
})

describe('examFilterLabel', () => {
  it('names the SOA exams by their key, not their subject', () => {
    expect(examFilterLabel('Probability')).toBe('Exam P')
    expect(examFilterLabel('Financial Mathematics')).toBe('Exam FM')
  })

  it('leaves a label that already names an exam alone', () => {
    expect(examFilterLabel('Exam MAS-I')).toBe('Exam MAS-I')
    expect(examFilterLabel('Exam 5')).toBe('Exam 5')
    expect(examFilterLabel('Something Else')).toBe('Something Else')
  })
})

describe('toggleFacet / hasFacetFilters', () => {
  it('flips one value without touching the other facets or the input', () => {
    const start = emptyFacets()
    const once = toggleFacet(start, 'exam', 'Exam 5')
    expect([...once.exam]).toEqual(['Exam 5'])
    expect(start.exam.size).toBe(0)
    expect(hasFacetFilters(start)).toBe(false)
    expect(hasFacetFilters(once)).toBe(true)
    expect(toggleFacet(once, 'exam', 'Exam 5').exam.size).toBe(0)
  })
})

describe('difficulty ticks', () => {
  const levels = ['easy', 'medium', 'hard']

  it('shows every level ticked while none is chosen, and that is no filter', () => {
    expect([...ticksFor(new Set(), levels)]).toEqual(levels)
    expect(hasFacetFilters(select({ difficulty: levels }))).toBe(false)
    expect(hasFacetFilters(select({ difficulty: ['easy'] }))).toBe(true)
  })

  it('unticking from the resting state keeps the other two', () => {
    expect([...toggleLevel(new Set(), 'easy', levels)].sort()).toEqual(['hard', 'medium'])
  })

  it('ticking the last level back stores none chosen again', () => {
    expect(toggleLevel(new Set(['medium', 'hard']), 'easy', levels).size).toBe(0)
  })

  it('never unticks the last level', () => {
    const only = new Set(['hard'])
    expect(toggleLevel(only, 'hard', levels)).toBe(only)
  })
})

describe('matchesFacets', () => {
  const pool = [
    q({ id: 'a', exam: 'Exam 5', difficulty: 'easy', year: 2019, session: 'Spring', wiki_link: ['Concepts/Loss+Ratio'] }),
    q({ id: 'b', exam: 'Exam 5', difficulty: 'hard', year: 2018, session: 'Fall', wiki_link: ['Concepts/Trend'] }),
    q({ id: 'c', exam: 'Probability', difficulty: 'easy', wiki_link: ['Concepts/Bayes+Theorem'] }),
  ]

  it('matches everything with nothing chosen', () => {
    expect(pool.filter(x => matchesFacets(x, emptyFacets())).map(x => x.id)).toEqual(['a', 'b', 'c'])
  })

  it('ORs within a facet and ANDs across facets', () => {
    const sel = select({ difficulty: ['easy', 'hard'], exam: ['Exam 5'] })
    expect(pool.filter(x => matchesFacets(x, sel)).map(x => x.id)).toEqual(['a', 'b'])
  })

  it('keeps an undated question out of any chosen sitting', () => {
    const sel = select({ sitting: ['Spring 2019'] })
    expect(pool.filter(x => matchesFacets(x, sel)).map(x => x.id)).toEqual(['a'])
  })

  it('matches a question to its publisher', () => {
    const sel = select({ source: ['SOA'] })
    expect(pool.filter(x => matchesFacets(x, sel)).map(x => x.id)).toEqual(['c'])
  })

  it('ignores the facet being counted', () => {
    const sel = select({ exam: ['Probability'], difficulty: ['easy'] })
    expect(pool.filter(x => matchesFacets(x, sel, 'exam')).map(x => x.id)).toEqual(['a', 'c'])
  })

  describe('a question carried over from another exam’s paper', () => {
    const carried = q({ id: 'moved', exam: 'Exam MAS-II', originally_exam: 'Exam MAS-I', year: 2019, session: 'Fall' })
    const own = q({ id: 'own', exam: 'Exam MAS-II', year: 2019, session: 'Fall' })
    const sat = q({ id: 'sat', exam: 'Exam MAS-I', year: 2019, session: 'Fall' })
    const bank = [carried, own, sat]

    it('is on the sitting it was sat on, across every exam', () => {
      const sel = select({ sitting: ['Fall 2019'] })
      expect(bank.filter(x => matchesFacets(x, sel)).map(x => x.id)).toEqual(['moved', 'own', 'sat'])
    })

    it('is not on the paper of the exam it moved to', () => {
      // The same answer filterQuestions gives the quiz builder's past-paper shelf.
      const sel = select({ exam: ['Exam MAS-II'], sitting: ['Fall 2019'] })
      expect(bank.filter(x => matchesFacets(x, sel)).map(x => x.id)).toEqual(['own'])
    })
  })
})

describe('facetOptions', () => {
  const pool = [
    q({ id: 'a', exam: 'Exam 5', difficulty: 'easy', year: 2019, session: 'Spring', wiki_link: ['Concepts/Trend', 'Concepts/Loss+Ratio'] }),
    q({ id: 'b', exam: 'Exam 5', difficulty: 'hard', year: 2018, session: 'Fall', wiki_link: ['Concepts/Trend'] }),
    q({ id: 'c', exam: 'Probability', difficulty: 'easy', wiki_link: ['Concepts/Bayes+Theorem'] }),
    q({ id: 'd', exam: 'Exam 5', difficulty: 'medium', year: 2019, session: 'Fall', wiki_link: ['Concepts/Trend'] }),
  ]

  it('always offers the three difficulties, easy to hard', () => {
    const opts = facetOptions(pool, 'difficulty', select({ exam: ['Probability'] }))
    expect(opts).toEqual([
      { value: 'easy', label: 'Easy', count: 1 },
      { value: 'medium', label: 'Medium', count: 0 },
      { value: 'hard', label: 'Hard', count: 0 },
    ])
  })

  it('offers exams up the ladder, named for the filter, whatever exam is chosen', () => {
    // The exam that is chosen does not shrink its own list — the Exam filter
    // stays a choice between exams rather than collapsing to the one picked.
    const opts = facetOptions(pool, 'exam', select({ exam: ['Exam 5'] }))
    expect(opts).toEqual([
      { value: 'Probability', label: 'Exam P', count: 1 },
      { value: 'Exam 5', label: 'Exam 5', count: 3 },
    ])
  })

  it('offers publishers up the ladder, the vault’s own last', () => {
    const bank = [...pool, q({ id: 'p-901', exam: 'Probability' })]
    expect(facetOptions(bank, 'source', emptyFacets())).toEqual([
      { value: 'SOA', label: 'SOA', count: 1 },
      { value: 'CAS', label: 'CAS', count: 3 },
      { value: 'Actuarial Notes', label: 'Actuarial Notes', count: 1 },
    ])
    expect(facetOptions(bank, 'source', select({ exam: ['Probability'] })).map(o => [o.value, o.count])).toEqual([
      ['SOA', 1], ['Actuarial Notes', 1],
    ])
  })

  it('offers sittings newest first, from the pool the other facets leave', () => {
    expect(facetOptions(pool, 'sitting', emptyFacets()).map(o => [o.value, o.count])).toEqual([
      ['Fall 2019', 1], ['Spring 2019', 1], ['Fall 2018', 1],
    ])
    expect(facetOptions(pool, 'sitting', select({ difficulty: ['hard'] })).map(o => o.value)).toEqual(['Fall 2018'])
  })

  it('offers the types the pool holds, multiple choice first, by the names a reader knows', () => {
    const bank = [
      ...pool,
      q({ id: 'w1', type: 'multi-part', difficulty: 'hard' }),
      q({ id: 'w2', type: 'multi-part' }),
    ]
    expect(facetOptions(bank, 'type', emptyFacets())).toEqual([
      { value: 'multiple-choice', label: 'Multiple choice', count: 4 },
      { value: 'multi-part', label: 'Written answer', count: 2 },
    ])
    expect(facetOptions(bank, 'type', select({ difficulty: ['hard'] })).map(o => [o.value, o.count])).toEqual([
      ['multiple-choice', 1], ['multi-part', 1],
    ])
    expect(bank.filter(x => matchesFacets(x, select({ type: ['multi-part'] }))).map(x => x.id)).toEqual(['w1', 'w2'])
  })

    it('offers no sitting for a pool of undated questions', () => {
    expect(facetOptions([pool[2]], 'sitting', emptyFacets())).toEqual([])
  })

  it('counts a question once per concept, and orders concepts A to Z', () => {
    expect(facetOptions(pool, 'concept', emptyFacets()).map(o => [o.value, o.count])).toEqual([
      ['Bayes Theorem', 1], ['Loss Ratio', 1], ['Trend', 3],
    ])
  })

  it('keeps a chosen value on offer when nothing is left under it', () => {
    const opts = facetOptions(pool, 'sitting', select({ sitting: ['Spring 2012'], exam: ['Probability'] }))
    expect(opts).toEqual([{ value: 'Spring 2012', label: 'Spring 2012', count: 0 }])
  })

  it('counts an exam as if it were chosen, so its paper excludes carried-over questions', () => {
    const bank = [
      q({ exam: 'Exam MAS-II', originally_exam: 'Exam MAS-I', year: 2019, session: 'Fall' }),
      q({ exam: 'Exam MAS-II', year: 2019, session: 'Fall' }),
      q({ exam: 'Exam MAS-I', year: 2019, session: 'Fall' }),
    ]
    const opts = facetOptions(bank, 'exam', select({ sitting: ['Fall 2019'] }))
    expect(opts.map(o => [o.value, o.count])).toEqual([['Exam MAS-I', 1], ['Exam MAS-II', 1]])
  })
})

describe('splitSearchFilter', () => {
  it('turns the exam and sitting into starting choices and keeps the rest as the scope', () => {
    const { scope, initial } = splitSearchFilter({
      exam: 'Exam 5', year: 2019, session: 'Spring', concepts: ['Trend'],
    })
    expect(scope).toEqual({})
    expect([...initial.exam]).toEqual(['Exam 5'])
    expect([...initial.sitting]).toEqual(['Spring 2019'])
    expect([...initial.concept]).toEqual(['Trend'])
    expect(initial.difficulty.size).toBe(0)
  })

  it('names a sitting with no session by its year, as the question does', () => {
    expect([...splitSearchFilter({ exam: 'Exam 7', year: 2015 }).initial.sitting]).toEqual(['2015'])
  })

  it('ticks the concepts in the Concepts filter, named as its options are', () => {
    const { scope, initial } = splitSearchFilter({ concept: 'Residual Sum of Squares', concepts: ['ANOVA'] })
    expect(scope).toEqual({})
    expect([...initial.concept]).toEqual(['Residual Sum Of Squares', 'ANOVA'])
    const opts = facetOptions([q({ wiki_link: ['Concepts/Residual+Sum+of+Squares'] })], 'concept', initial)
    expect(opts.map(o => [o.value, o.count])).toEqual([['Residual Sum Of Squares', 1], ['ANOVA', 0]])
  })

  it('starts on nothing when the filter names none of them', () => {
    const { scope, initial } = splitSearchFilter({ topic: 'Probability' })
    expect(scope).toEqual({ topic: 'Probability' })
    expect(hasFacetFilters(initial)).toBe(false)
  })
})
