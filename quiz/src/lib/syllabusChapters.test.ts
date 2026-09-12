import { describe, it, expect } from 'vitest'
import {
  buildObjectiveIndex,
  isSyllabusConcept,
  objectiveFor,
  objectiveMarks,
  parseObjectiveSections,
} from './syllabusChapters'

// The shape every exam page has: a lead-in, the objective callouts, the shelf.
const examPage = `---
verification:
  status: unverified
---

# Exam P-1
The Probability exam. Prerequisite: [[Calculus]].

## Learning Objectives

> [!example]- General Probability {23-30%}
> Understand basic concepts of [[Probability]].
> 1. Define [[Sample Space]] and [[Event]].
> 2. Define and calculate [[Conditional Probability]].

> [!example]- Univariate Random Variables {44-50%}
> Understand [[Discrete Univariate Distributions]].
> 1. Calculate [[Conditional Probability|Conditional Probabilities]].
>
> ### Discrete Univariate Distributions
> - [[Binomial Distribution]]

## Source Material
> [!answer]- Source Material
>
> - [[A First Course in Probability (Ross - 2019)]]
`

describe('isSyllabusConcept', () => {
  it('keeps concepts and drops the reading list', () => {
    expect(isSyllabusConcept({ kind: 'concept', name: 'Sample Space' })).toBe(true)
    // A dated name is a source however it is linked.
    expect(isSyllabusConcept({ kind: 'concept', name: 'Probability (Leemis - 2018)' })).toBe(false)
    expect(isSyllabusConcept({ kind: 'resource', name: 'Risk and Insurance' })).toBe(false)
  })
})

describe('parseObjectiveSections', () => {
  it('reads the objectives and the concepts written inside each', () => {
    const sections = parseObjectiveSections(examPage)
    expect(sections.map(s => [s.title, s.weight])).toEqual([
      ['General Probability', '23-30%'],
      ['Univariate Random Variables', '44-50%'],
    ])
    expect(sections[0].concepts).toEqual(['Probability', 'Sample Space', 'Event', 'Conditional Probability'])
    // A concept under a sub-heading of the callout is still that objective's,
    // and a bare ">" line doesn't end the callout.
    expect(sections[1].concepts).toEqual([
      'Discrete Univariate Distributions',
      'Conditional Probability',
      'Binomial Distribution',
    ])
  })

  it('leaves everything outside the callouts out', () => {
    const concepts = parseObjectiveSections(examPage).flatMap(s => s.concepts)
    expect(concepts).not.toContain('Calculus')
    expect(concepts.some(c => c.startsWith('A First Course'))).toBe(false)
  })

  it('is empty for a page that has no objectives', () => {
    expect(parseObjectiveSections('# Expected Value\n\nProse with [[a link]].')).toEqual([])
    expect(parseObjectiveSections('')).toEqual([])
  })
})

describe('buildObjectiveIndex', () => {
  const index = buildObjectiveIndex(examPage)

  it('gives each mention the objective it is written inside', () => {
    // Conditional Probability is defined in the first objective and used in the
    // second; the second mention belongs to the second, or the bar's chapters
    // would break apart wherever a syllabus re-uses a concept.
    expect(index.byOccurrence['conditional probability#0']).toBe('General Probability')
    expect(index.byOccurrence['conditional probability#1']).toBe('Univariate Random Variables')
  })

  it('gives each concept the objective that introduces it', () => {
    expect(index.byConcept['conditional probability']).toBe('General Probability')
    expect(index.byConcept['binomial distribution']).toBe('Univariate Random Variables')
  })

  it('leaves what no callout contains out of both halves', () => {
    expect(index.byConcept['calculus']).toBeUndefined()
    expect(index.byOccurrence['calculus#0']).toBeUndefined()
  })

  it('counts mentions from the same place the occurrence list does', () => {
    // The frontmatter is stripped on both sides, so "#0" means the same mention.
    const withoutFrontmatter = buildObjectiveIndex(examPage.replace(/^---\n[\s\S]*?\n---\n/, ''))
    expect(withoutFrontmatter.byOccurrence).toEqual(index.byOccurrence)
  })

  it('is empty for a page with no syllabus', () => {
    expect(buildObjectiveIndex(null)).toEqual({ byOccurrence: {}, byConcept: {} })
    expect(buildObjectiveIndex('# A concept page')).toEqual({ byOccurrence: {}, byConcept: {} })
  })
})

describe('objectiveFor', () => {
  const index = buildObjectiveIndex(examPage)

  it('prefers the mention, and falls back to the concept', () => {
    expect(objectiveFor({ name: 'Conditional Probability', occurrence: 1 }, index))
      .toBe('Univariate Random Variables')
    expect(objectiveFor({ name: 'Conditional Probability' }, index)).toBe('General Probability')
    // A stop the page has no such mention for — reached by following a link.
    expect(objectiveFor({ name: 'Conditional Probability', occurrence: 9 }, index))
      .toBe('General Probability')
  })

  it('is empty for a concept no objective names', () => {
    expect(objectiveFor({ name: 'Calculus' }, index)).toBe('')
    expect(objectiveFor({ name: 'Sample Space' }, null)).toBe('')
  })
})

describe('objectiveMarks', () => {
  const index = buildObjectiveIndex(examPage)

  it('marks each place the objective changes', () => {
    const marks = objectiveMarks(
      [
        { name: 'Calculus' },
        { name: 'Probability', occurrence: 0 },
        { name: 'Sample Space', occurrence: 0 },
        { name: 'Discrete Univariate Distributions', occurrence: 0 },
      ],
      index,
    )
    expect(marks).toEqual([
      // The prerequisite line is part of no objective, not of the first one.
      { start: 1, label: undefined },
      { start: 2, label: 'General Probability' },
      { start: 4, label: 'Univariate Random Variables' },
    ])
  })

  it('keeps a chapter whole when a later objective re-uses a concept', () => {
    const marks = objectiveMarks(
      [
        { name: 'Discrete Univariate Distributions', occurrence: 0 },
        { name: 'Conditional Probability', occurrence: 1 },
        { name: 'Binomial Distribution', occurrence: 0 },
      ],
      index,
    )
    expect(marks).toEqual([])
  })

  it('is empty when there is nothing to cut', () => {
    // No syllabus behind the walk (the dashboard, a search result)…
    expect(objectiveMarks([{ name: 'Sample Space', occurrence: 0 }], null)).toEqual([])
    // …and a walk entirely inside one objective is a bar, not a chapter list.
    expect(objectiveMarks(
      [{ name: 'Sample Space', occurrence: 0 }, { name: 'Event', occurrence: 0 }],
      index,
    )).toEqual([])
    expect(objectiveMarks([], index)).toEqual([])
  })
})
