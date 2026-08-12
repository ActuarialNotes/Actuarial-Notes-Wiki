import { describe, it, expect } from 'vitest'
import { parseExamWeight, splitWeightTag } from './examWeight'

describe('parseExamWeight', () => {
  it('averages a range', () => {
    expect(parseExamWeight('23-30%')).toBe(26.5)
  })

  it('accepts an en dash, as the vault writes some weights', () => {
    expect(parseExamWeight('45–55%')).toBe(50)
  })

  it('takes a single percentage as-is', () => {
    expect(parseExamWeight('15%')).toBe(15)
    expect(parseExamWeight('12.5%')).toBe(12.5)
  })

  it('tolerates spacing around the separator', () => {
    expect(parseExamWeight('5 - 15 %')).toBe(10)
  })

  it('returns null when there is no percentage', () => {
    expect(parseExamWeight('Ratemaking')).toBeNull()
    expect(parseExamWeight('')).toBeNull()
    expect(parseExamWeight(undefined)).toBeNull()
    expect(parseExamWeight(null)).toBeNull()
  })
})

describe('splitWeightTag', () => {
  it('lifts the weight out of a callout title', () => {
    expect(splitWeightTag('General Probability {23-30%}')).toEqual({
      title: 'General Probability',
      weight: '23-30%',
    })
  })

  it('closes the gap when the tag is mid-title', () => {
    expect(splitWeightTag('Time Value {5-15%} of Money')).toEqual({
      title: 'Time Value of Money',
      weight: '5-15%',
    })
  })

  it('leaves a non-percentage tag in the title for the inline pill', () => {
    expect(splitWeightTag('Ratemaking {optional}')).toEqual({
      title: 'Ratemaking {optional}',
      weight: null,
    })
  })

  it('leaves an untagged title untouched', () => {
    expect(splitWeightTag('Source Material')).toEqual({
      title: 'Source Material',
      weight: null,
    })
  })
})
