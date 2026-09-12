import { describe, it, expect } from 'vitest'
import {
  conceptNameFromPath,
  examsForSources,
  factCheckSourcesForConcept,
  resourcePagePath,
} from './factCheckSources'
import type { WikiExamSyllabus } from './wikiParser'

function syllabus(
  fileName: string,
  examId: string,
  concepts: Array<{ name: string; target?: string }>,
  resources: Array<{ name: string; target?: string }>,
): WikiExamSyllabus {
  return {
    examId,
    examLabel: `Exam ${examId.replace(/-\d+$/, '')}`,
    examTopic: 'Topic',
    fileName,
    topics: [
      {
        name: 'Objective 1',
        concepts: concepts.map(c => ({ name: c.name, target: c.target ?? c.name })),
      },
    ] as WikiExamSyllabus['topics'],
    resources: resources.map(r => ({ name: r.name, target: r.target ?? r.name })),
  }
}

const EXAM_P = syllabus(
  'Exam P-1 (SOA)',
  'P-1',
  [{ name: 'Expected Value' }, { name: 'Price', target: 'Bond Price' }],
  [{ name: 'A First Course in Probability (Ross - 2019)' }, { name: 'Probability (Leemis - 2018)' }],
)

const EXAM_MAS_I = syllabus(
  'Exam MAS-I (CAS)',
  'MAS-I',
  [{ name: 'Expected Value' }, { name: 'Poisson Process' }],
  [
    { name: 'Probability (Leemis - 2018)' },
    { name: 'An Introduction to Statistical Learning (James et al. - 2021)' },
  ],
)

const SYLLABI = [EXAM_P, EXAM_MAS_I]

describe('conceptNameFromPath', () => {
  it('reads the concept out of a Concepts/ path', () => {
    expect(conceptNameFromPath('Concepts/Expected Value.md')).toBe('Expected Value')
  })

  it('returns null for the pages that have no syllabus sources of their own', () => {
    expect(conceptNameFromPath('Resources/Books/Basic Ratemaking (Werner - 2016).md')).toBeNull()
    expect(conceptNameFromPath('questions/exam-5/cas5-2019f-010.md')).toBeNull()
    expect(conceptNameFromPath('Exam P-1 (SOA).md')).toBeNull()
    expect(conceptNameFromPath(null)).toBeNull()
  })
})

describe('resourcePagePath', () => {
  it('resolves a bare source-material link to its Resources/Books page', () => {
    expect(resourcePagePath('Probability (Leemis - 2018)', 'Probability (Leemis - 2018)'))
      .toBe('Resources/Books/Probability (Leemis - 2018).md')
  })

  it('keeps a link that names its own path', () => {
    expect(resourcePagePath('Resources/Regulation/CIA Bias', 'CIA Bias'))
      .toBe('Resources/Regulation/CIA Bias.md')
  })
})

describe('factCheckSourcesForConcept', () => {
  it('returns the syllabus readings of the exam that teaches the concept', () => {
    const sources = factCheckSourcesForConcept(SYLLABI, 'Poisson Process')
    expect(sources.map(s => s.name)).toEqual([
      'Probability (Leemis - 2018)',
      'An Introduction to Statistical Learning (James et al. - 2021)',
    ])
    expect(sources[0].path).toBe('Resources/Books/Probability (Leemis - 2018).md')
    expect(sources[0].exams).toEqual(['Exam MAS-I'])
  })

  it('unions the readings of every exam that teaches it, one card per source', () => {
    const sources = factCheckSourcesForConcept(SYLLABI, 'Expected Value')
    expect(sources.map(s => s.name)).toEqual([
      'A First Course in Probability (Ross - 2019)',
      'Probability (Leemis - 2018)',
      'An Introduction to Statistical Learning (James et al. - 2021)',
    ])
    // Listed by both exams, so it carries both labels — in ladder order.
    expect(sources[1].exams).toEqual(['Exam P-1', 'Exam MAS-I'])
  })

  it('matches an aliased syllabus link by its target', () => {
    expect(factCheckSourcesForConcept(SYLLABI, 'Bond Price').map(s => s.exams)).toEqual([
      ['Exam P-1'],
      ['Exam P-1'],
    ])
  })

  it('returns nothing for a concept no exam page teaches', () => {
    expect(factCheckSourcesForConcept(SYLLABI, 'Solvency II')).toEqual([])
  })
})

describe('examsForSources', () => {
  it('lists each exam once, in ladder order', () => {
    expect(examsForSources(factCheckSourcesForConcept(SYLLABI, 'Expected Value')))
      .toEqual(['Exam P-1', 'Exam MAS-I'])
  })

  it('is empty for an empty list', () => {
    expect(examsForSources([])).toEqual([])
  })
})
