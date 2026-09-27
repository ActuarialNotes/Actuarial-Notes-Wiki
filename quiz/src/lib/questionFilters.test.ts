import { describe, it, expect } from 'vitest'
import {
  conceptLabel,
  emptyFacets,
  examFilterLabel,
  facetOptions,
  hasFacetFilters,
  matchesFacets,
  splitSearchFilter,
  toggleFacet,
  type FacetSelection,
} from './questionFilters'
import type { Question } from './parser'

function q(partial: Partial<Question>): Question {
  return {
    id: partial.id ?? Math.random().toString(36).slice(2),
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
    concept: new Set(partial.concept ?? base.concept),
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

  it('offers sittings newest first, from the pool the other facets leave', () => {
    expect(facetOptions(pool, 'sitting', emptyFacets()).map(o => [o.value, o.count])).toEqual([
      ['Fall 2019', 1], ['Spring 2019', 1], ['Fall 2018', 1],
    ])
    expect(facetOptions(pool, 'sitting', select({ difficulty: ['hard'] })).map(o => o.value)).toEqual(['Fall 2018'])
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
    expect(scope).toEqual({ concepts: ['Trend'] })
    expect([...initial.exam]).toEqual(['Exam 5'])
    expect([...initial.sitting]).toEqual(['Spring 2019'])
    expect(initial.difficulty.size + initial.concept.size).toBe(0)
  })

  it('names a sitting with no session by its year, as the question does', () => {
    expect([...splitSearchFilter({ exam: 'Exam 7', year: 2015 }).initial.sitting]).toEqual(['2015'])
  })

  it('starts on nothing when the filter names neither', () => {
    const { scope, initial } = splitSearchFilter({ concept: 'Trend' })
    expect(scope).toEqual({ concept: 'Trend' })
    expect(hasFacetFilters(initial)).toBe(false)
  })
})
