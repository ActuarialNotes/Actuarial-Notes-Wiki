import { describe, it, expect } from 'vitest'
import { buildCollectedPacks, OTHER_PACK_KEY, type CollectedEntry } from './collectedPacks'
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

describe('buildCollectedPacks', () => {
  it('returns nothing when no cards are collected', () => {
    const { allConcepts, packs } = buildCollectedPacks([FM, P], [])
    expect(allConcepts).toEqual([])
    expect(packs).toEqual([])
  })

  it('lists every collected concept newest first, de-duplicated', () => {
    const { allConcepts } = buildCollectedPacks(
      [FM],
      collected(['Present Value', 100], ['Bond Pricing', 300], ['present value', 500]),
    )
    expect(allConcepts).toEqual(['Present Value', 'Bond Pricing'])
  })

  it('only emits packs for learning objectives with a collected concept', () => {
    const { packs } = buildCollectedPacks([FM], collected(['Bond Pricing', 1]))
    expect(packs).toEqual([
      { key: 'FM-2::Bonds', label: 'Bonds', sublabel: 'Exam FM', concepts: ['Bond Pricing'] },
    ])
  })

  it('keeps a concept in every syllabus that lists it', () => {
    const { packs, allConcepts } = buildCollectedPacks([FM, P], collected(['Present Value', 1]))
    expect(packs.map(p => p.key)).toEqual(['FM-2::Time Value of Money', 'P-1::Probability Distributions'])
    expect(allConcepts).toEqual(['Present Value'])
  })

  it('names concepts the way the syllabus spells them', () => {
    const { allConcepts, packs } = buildCollectedPacks([FM], collected(['force of INTEREST', 1]))
    expect(allConcepts).toEqual(['Force of Interest'])
    expect(packs[0].concepts).toEqual(['Force of Interest'])
  })

  it('orders each pack newest-collected first', () => {
    const { packs } = buildCollectedPacks(
      [FM],
      collected(['Present Value', 100], ['Force of Interest', 900]),
    )
    expect(packs[0].concepts).toEqual(['Force of Interest', 'Present Value'])
  })

  it('collects syllabus-less concepts into a trailing Other pack', () => {
    const { packs } = buildCollectedPacks(
      [FM],
      collected(['Bond Pricing', 100], ['Copulas', 200], ['Ruin Theory', 300]),
    )
    expect(packs.map(p => p.key)).toEqual(['FM-2::Bonds', OTHER_PACK_KEY])
    const other = packs[packs.length - 1]
    expect(other.concepts).toEqual(['Ruin Theory', 'Copulas'])
    expect(other.sublabel).toBeUndefined()
  })

  it('drops the Other pack when it would just restate the all-concepts pack', () => {
    const { allConcepts, packs } = buildCollectedPacks([FM], collected(['Copulas', 1]))
    expect(allConcepts).toEqual(['Copulas'])
    expect(packs).toEqual([])
  })
})
