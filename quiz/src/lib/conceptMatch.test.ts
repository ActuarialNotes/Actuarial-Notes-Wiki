import { describe, it, expect } from 'vitest'
import {
  slugForLink,
  buildMasteryLookup,
  lookupConceptRecord,
  resolveConceptState,
  normalizeMasteryToDisplayNames,
} from './conceptMatch'
import { emptyRecord, type ConceptMasteryRecord } from './mastery'
import type { WikiExamSyllabus } from './wikiParser'

const NOW = new Date('2026-05-01T12:00:00Z')
const RECENT = new Date('2026-04-28T12:00:00Z').toISOString() // 3 days ago — within all decay windows

function rec(slug: string, overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
  return { ...emptyRecord('u1', 'FM', slug), ...overrides }
}

describe('slugForLink', () => {
  it('resolves a Concepts/ path with + as spaces to the base name', () => {
    expect(slugForLink('Concepts/Bond+Price')).toBe('Bond Price')
    expect(slugForLink('Concepts/Force+of+Interest')).toBe('Force of Interest')
  })

  it('resolves a bare concept name', () => {
    expect(slugForLink('Effective Rate')).toBe('Effective Rate')
  })

  it('falls back to the last path segment for a non-wiki URL', () => {
    // hrefToEntryRef returns null for external hosts, triggering the segment fallback.
    expect(slugForLink('https://example.com/unknown-thing')).toBe('unknown thing')
  })

  it('returns null for an empty link', () => {
    expect(slugForLink('')).toBeNull()
  })
})

describe('lookupConceptRecord', () => {
  it('finds a record stored under the display name', () => {
    const lookup = buildMasteryLookup([rec('Coupon Rate', { state: 'level2' })])
    const found = lookupConceptRecord(lookup, { name: 'Coupon Rate', target: 'Coupon Rate' })
    expect(found?.state).toBe('level2')
  })

  it('finds an aliased record via the target fallback', () => {
    // Stored slug is the file/base name "Bond Price"; syllabus displays alias "Price".
    const lookup = buildMasteryLookup([rec('Bond Price', { state: 'level3' })])
    const found = lookupConceptRecord(lookup, { name: 'Price', target: 'Bond Price' })
    expect(found?.state).toBe('level3')
  })

  it('returns undefined when neither name nor target matches', () => {
    const lookup = buildMasteryLookup([rec('Bond Price', { state: 'level3' })])
    expect(lookupConceptRecord(lookup, { name: 'Annuities', target: 'Annuities' })).toBeUndefined()
  })
})

describe('resolveConceptState', () => {
  it('returns the decay-adjusted state for an aliased mastered concept', () => {
    const lookup = buildMasteryLookup([rec('Bond Price', { state: 'level3', last_correct_at: RECENT })])
    expect(resolveConceptState(lookup, { name: 'Price', target: 'Bond Price' }, NOW)).toBe('level3')
  })

  it('defaults to "new" for an unknown concept', () => {
    const lookup = buildMasteryLookup([])
    expect(resolveConceptState(lookup, { name: 'Price', target: 'Bond Price' }, NOW)).toBe('new')
  })
})

describe('normalizeMasteryToDisplayNames', () => {
  const syllabus = {
    examId: 'FM-2',
    examLabel: 'Exam FM',
    examTopic: 'Financial Mathematics',
    resources: [],
    topics: [
      {
        name: 'Bonds',
        concepts: [
          { name: 'Price', target: 'Bond Price' },   // aliased
          { name: 'Coupon Rate', target: 'Coupon Rate' }, // plain
        ],
      },
    ],
  } as unknown as WikiExamSyllabus

  it('re-keys aliased records to the display name and leaves plain ones alone', () => {
    const out = normalizeMasteryToDisplayNames(
      [rec('Bond Price', { state: 'level3' }), rec('Coupon Rate', { state: 'level1' })],
      syllabus,
    )
    const bySlug = new Map(out.map(r => [r.concept_slug, r.state]))
    expect(bySlug.get('Price')).toBe('level3')        // re-keyed from "Bond Price"
    expect(bySlug.get('Coupon Rate')).toBe('level1')  // unchanged
    expect(bySlug.has('Bond Price')).toBe(false)
  })
})
