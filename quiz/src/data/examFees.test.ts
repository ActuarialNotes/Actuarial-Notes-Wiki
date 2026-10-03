import { describe, expect, it } from 'vitest'
import { EXAM_FEES, dollars, examFee, feeFact, feeText, feeTotal } from './examFees'
import { EXAM_ABOUT, examAbout } from './examSittingDetails'

describe('feeText', () => {
  // The lines the info panel printed when the fees were typed into it by hand —
  // the table must still say exactly these.
  it.each([
    ['P', '$275'],
    ['FM', '$275'],
    ['MAS-I', '$550 ($440 full-time students)'],
    ['MAS-II', '$550 ($440 full-time students)'],
    ['CAS-5', '$850 ($680 full-time students)'],
    ['CAS-9', '$850 ($680 full-time students)'],
    ['CAS-PCPA', '$300 exam, $700 project ($240 and $560 full-time students)'],
  ])('%s → %s', (exam, text) => {
    expect(feeText(EXAM_FEES[exam]!)).toBe(text)
  })

  it('prints thousands with a separator', () => {
    expect(dollars(1234)).toBe('$1,234')
    expect(dollars(21.95)).toBe('$21.95')
  })
})

describe('feeFact', () => {
  it('is plural for a fee paid in parts', () => {
    expect(feeFact('CAS-PCPA').label).toBe('Fees')
    expect(feeFact('P').label).toBe('Fee')
  })

  it('throws for an exam with no transcribed fee rather than inventing one', () => {
    expect(() => feeFact('CAS-DA')).toThrow()
    expect(examFee('CAS-DA')).toBeNull()
  })

  it('is the row the info panel shows for every exam that has a fee', () => {
    for (const exam of Object.keys(EXAM_FEES)) {
      const about = exam === 'CAS-6' ? examAbout('CAS-6', '6c-1') : EXAM_ABOUT[exam]
      const row = about?.facts.find(f => f.label === 'Fee' || f.label === 'Fees')
      expect(row, exam).toEqual(feeFact(exam))
    }
  })
})

describe('feeTotal', () => {
  it('adds the parts, at the student rate when asked', () => {
    expect(feeTotal(EXAM_FEES['CAS-PCPA']!)).toBe(1000)
    expect(feeTotal(EXAM_FEES['CAS-PCPA']!, true)).toBe(800)
    expect(feeTotal(EXAM_FEES.P!, true)).toBe(275)
  })
})

describe('EXAM_FEES', () => {
  it('names its source page and when it was read', () => {
    for (const [exam, fee] of Object.entries(EXAM_FEES)) {
      expect(fee.source.url, exam).toMatch(/^https:\/\/www\.(soa|casact)\.org\//)
      expect(fee.checked, exam).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(fee.parts.length, exam).toBeGreaterThan(0)
      for (const part of fee.parts) {
        expect(part.amount, exam).toBeGreaterThan(0)
        if (part.student !== undefined) expect(part.student, exam).toBeLessThan(part.amount)
      }
    }
  })
})
