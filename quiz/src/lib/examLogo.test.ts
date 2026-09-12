import { describe, it, expect } from 'vitest'
import { examMonogram, examMonogramLines, monogramFontScale } from './examLogo'

describe('examMonogramLines', () => {
  it('keeps a short exam name on one line', () => {
    expect(examMonogramLines('P')).toEqual(['P'])
    expect(examMonogramLines('FM')).toEqual(['FM'])
    expect(examMonogramLines('SRM')).toEqual(['SRM'])
    expect(examMonogramLines('FAM')).toEqual(['FAM'])
    expect(examMonogramLines('PA')).toEqual(['PA'])
  })

  it('drops the CAS- namespace so the tile says what the candidate says', () => {
    // The progress key is CAS-5; the exam is called "Exam 5".
    expect(examMonogramLines('CAS-5')).toEqual(['5'])
    expect(examMonogramLines('CAS-9')).toEqual(['9'])
  })

  it('splits a hyphenated name at its own hyphen', () => {
    expect(examMonogramLines('MAS-I')).toEqual(['MAS', 'I'])
    expect(examMonogramLines('MAS-II')).toEqual(['MAS', 'II'])
  })

  it('splits a long unhyphenated name down the middle, shorter line first', () => {
    // AL / AS is what tells the two apart, so it lands on the line read first.
    expect(examMonogramLines('ALTAM')).toEqual(['AL', 'TAM'])
    expect(examMonogramLines('ASTAM')).toEqual(['AS', 'TAM'])
  })

  it('never returns an empty monogram', () => {
    expect(examMonogramLines('')).toEqual(['?'])
    expect(examMonogramLines('   ')).toEqual(['?'])
  })
})

describe('monogramFontScale', () => {
  it('draws a single letter largest', () => {
    expect(monogramFontScale(['P'])).toBeGreaterThan(monogramFontScale(['FM']))
    expect(monogramFontScale(['FM'])).toBeGreaterThan(monogramFontScale(['SRM']))
  })

  it('shrinks a stacked monogram so two lines fit the square', () => {
    expect(monogramFontScale(['MAS', 'I'])).toBeLessThan(monogramFontScale(['FM']))
  })

  it('shrinks further for a line the tile was not sized for', () => {
    // Nothing on either ladder is this long, but a non-exam key can be
    // ('VEE-ECON'), and a fallback tile should still fit its own letters.
    expect(monogramFontScale(['VEE', 'ECON'])).toBeLessThan(monogramFontScale(['MAS', 'I']))
  })

  it('stays inside the tile', () => {
    for (const key of ['P', 'FM', 'SRM', 'MAS-I', 'MAS-II', 'ALTAM', 'CAS-5', 'VEE-ECON']) {
      const { lines, fontScale } = examMonogram(key)
      const longest = Math.max(...lines.map(l => l.length))
      // ~0.62em of advance per bold capital, and ~1.05em per stacked line.
      expect(fontScale * longest * 0.62).toBeLessThanOrEqual(0.9)
      expect(fontScale * lines.length * 1.05).toBeLessThanOrEqual(0.9)
    }
  })
})
