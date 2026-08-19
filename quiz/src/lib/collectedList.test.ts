import { describe, it, expect } from 'vitest'
import { buildCollectedList, type CollectedEntry } from './collectedList'
import type { WikiExamSyllabus } from './wikiParser'

function syllabus(
  examId: string,
  examLabel: string,
  topics: Record<string, string[]>,
): WikiExamSyllabus {
  return {
    examId,
    examLabel,
    examTopic: examLabel,
    resources: [],
    topics: Object.entries(topics).map(([name, concepts]) => ({
      name,
      concepts: concepts.map(c => ({ name: c, target: c })),
    })),
  }
}

const FM = syllabus('FM-2', 'Exam FM', {
  'Time Value of Money': ['Present Value', 'Force of Interest'],
  'Bonds': ['Bond Pricing'],
  'Loans': ['Amortization'],
})
const P = syllabus('P-1', 'Exam P', {
  'Probability Distributions': ['Poisson Distribution', 'Present Value'],
})

function collected(...entries: [string, number][]): CollectedEntry[] {
  return entries.map(([name, collectedAt]) => ({ name, collectedAt }))
}

describe('buildCollectedList', () => {
  it('returns nothing when no cards are collected', () => {
    expect(buildCollectedList([FM, P], [])).toEqual([])
  })

  it('lists every collected concept newest first, de-duplicated', () => {
    expect(buildCollectedList(
      [FM],
      collected(['Present Value', 100], ['Bond Pricing', 300], ['present value', 500]),
    )).toEqual(['Present Value', 'Bond Pricing'])
  })

  it('names concepts the way the syllabus spells them', () => {
    expect(buildCollectedList([FM], collected(['force of INTEREST', 1])))
      .toEqual(['Force of Interest'])
  })

  it('lists a concept once even when two syllabi claim it', () => {
    expect(buildCollectedList([FM, P], collected(['Present Value', 1])))
      .toEqual(['Present Value'])
  })

  it('keeps concepts no syllabus knows, spelled as collected', () => {
    expect(buildCollectedList([FM], collected(['Bond Pricing', 100], ['Copulas', 200])))
      .toEqual(['Copulas', 'Bond Pricing'])
  })
})
