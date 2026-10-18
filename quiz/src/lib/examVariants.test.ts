import { describe, expect, it } from 'vitest'
import { groupExamVariants, variantCode, variantExamName, variantRegion } from './examVariants'

describe('examVariants', () => {
  it('names the region a variant is for', () => {
    expect(variantRegion('Exam 6C')).toBe('Canada')
    expect(variantRegion('Exam 6U')).toBe('United States')
    expect(variantRegion('Exam 6I')).toBe('International')
    expect(variantRegion('Exam 6T')).toBe('Chinese Taipei')
    expect(variantRegion('Exam GH-201C')).toBe('Canada')
    expect(variantRegion('6U')).toBe('United States')
    for (const label of ['Exam P-1', 'Exam MAS-I', 'Exam DISC-IA', 'Exam 5', 'Exam PCPA', 'Exam GH-101']) {
      expect(variantRegion(label), label).toBeNull()
    }
  })

  it('names the exam a variant is one of', () => {
    expect(variantExamName('Exam 6C')).toBe('Exam 6')
    expect(variantExamName('Exam ILA-201U')).toBe('Exam ILA-201')
    expect(variantExamName('Exam 5')).toBe('Exam 5')
    expect(variantCode('Exam 6C')).toBe('6C')
  })

  it('folds an exam’s variants into one entry, where the first stood', () => {
    const strip = [
      { label: 'Exam 5', key: 'CAS-5' },
      { label: 'Exam 6C', key: 'CAS-6' },
      { label: 'Exam 6I', key: 'CAS-6' },
      { label: 'Exam 6U', key: 'CAS-6' },
      { label: 'Exam 7', key: 'CAS-7' },
    ]
    const groups = groupExamVariants(strip)
    expect(groups.map(g => g.key)).toEqual(['CAS-5', 'CAS-6', 'CAS-7'])
    expect(groups[1]!.name).toBe('Exam 6')
    expect(groups[1]!.members.map(m => m.label)).toEqual(['Exam 6C', 'Exam 6I', 'Exam 6U'])
    expect(groups[0]!.name).toBe('Exam 5')
  })

  it('leaves entries that share a key without naming a region apart', () => {
    const groups = groupExamVariants([
      { label: 'Exam A', key: 'K' },
      { label: 'Exam B', key: 'K' },
    ])
    expect(groups).toHaveLength(2)
  })
})
