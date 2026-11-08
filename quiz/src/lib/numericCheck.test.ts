import { describe, expect, it } from 'vitest'
import {
  answerTargets, checkNumericAnswer, finalFigures, isCalculationPart, numericCheckMessage, parseNumbers, plainText,
} from './numericCheck'

const values = (s: string) => parseNumbers(s).map(n => n.value)
const part = (stem: string, answer: string, explanation = '') => ({ stem, answer, explanation })

describe('plainText', () => {
  it('reads currency, LaTeX separators and percent signs', () => {
    expect(plainText('\\$17,735')).toBe('17,735')
    expect(plainText('$15{,}000 \\times 1.1449$')).toBe(' 15,000  x  1.1449 ')
    expect(plainText('4.477\\%')).toBe('4.477%')
    expect(plainText('**+6.92%**')).toBe('+6.92%')
  })

  it('keeps a * between numbers, which multiplies, and drops one beside words', () => {
    expect(plainText('15000*1.1449')).toBe('15000*1.1449')
    expect(plainText('*Alternatively*, a trend')).toBe('Alternatively, a trend')
  })
})

describe('parseNumbers', () => {
  it('reads thousands separators, decimals, signs, percents and scale words', () => {
    expect(values('\\$330,750,000')).toEqual([330750000])
    expect(values('Approximately **+21.8%**')).toEqual([0.218])
    expect(values('-7% and .57')).toEqual([-0.07, 0.57])
    expect(values('\\$8,982k')).toEqual([8982000])
    expect(values('about 2.5 million')).toEqual([2500000])
  })

  it('leaves out labels: accident years, ages, dates, parts and policies', () => {
    expect(values('Trended ultimate loss ratio for AY 2012 ≈ 0.752')).toEqual([0.752])
    expect(values('As of December 31, 2010: 100')).toEqual([100])
    expect(values('AY 2010 at age 24, AY 2011 at age 12')).toEqual([])
    expect(values('Policy 1: 238.4')).toEqual([238.4])
    expect(values('36 months to ultimate, 12-24 factor of 1.25')).toEqual([1.25])
    expect(values('effective 1/1/2020')).toEqual([])
  })

  it('does not take a minus between two numbers for a sign', () => {
    expect(values('1-0.8')).toEqual([1, 0.8])
    expect(values('= 1 - 0.8')).toEqual([1, 0.8])
  })
})

describe('finalFigures', () => {
  it('reads the figure after the last = on the last line that has one', () => {
    expect(finalFigures('step one = 12\nTotal = 238.4 + 10 + 187.5 = 623.4').map(n => n.value)).toEqual([623.4])
    expect(finalFigures('$$15{,}000 \\times 1.1449 = 17{,}735$$\n\nAny of these was accepted.').map(n => n.value)).toEqual([17735])
    expect(finalFigures('So answer is 0.75 * 695000 = [521250]').map(n => n.value)).toEqual([521250])
  })

  it('reads a whole last line with no =, and stops at a table', () => {
    expect(finalFigures('Company A should charge $130 to low risk insureds').map(n => n.value)).toEqual([130])
    expect(finalFigures('| Total | 10,000 | 1.0816 |')).toEqual([])
  })

  it('stops at a last line whose only numbers are before its =', () => {
    expect(finalFigures('x = 5\n12 rows = many')).toEqual([])
  })
})

describe('isCalculationPart', () => {
  it('knows a part that asks for a figure', () => {
    expect(isCalculationPart(part('Calculate the indicated rate change.', ''))).toBe(true)
    expect(isCalculationPart(part('Using the data below, compute the ILF.', ''))).toBe(true)
    expect(isCalculationPart(part('Determine the projected ultimate losses.', ''))).toBe(true)
    expect(isCalculationPart(part('Briefly describe two factors that affect renewal.', ''))).toBe(false)
    expect(isCalculationPart(part('Using the Cape Cod technique, estimate the IBNR for accident year 2011.', ''))).toBe(true)
    expect(isCalculationPart(part('Explain how you would estimate it.', ''))).toBe(false)
  })
})

describe('answerTargets', () => {
  it('takes every result the answer line states, and nothing from the sample answers', () => {
    const t = answerTargets(part('Calculate the rate change.', 'Approximately +21.8% (CAS prints +21.77% and +21.5%)', 'x = 1.2177\nchange = 21.7%'))
    expect(t?.source).toBe('answer')
    expect(t?.targets.map(n => n.value)).toEqual([0.218, 0.2177, 0.215])
  })

  it('reads each clause of the answer after its =, ≈ or colon', () => {
    const v = (key: string) => answerTargets(part('Calculate it.', key))?.targets.map(n => n.value)
    expect(v('**Indicated ILF(\\$250,000) = 1.599**')).toEqual([1.599])
    expect(v('Scenario 1: \\$128,500. Scenario 2: \\$125,000.')).toEqual([128500, 125000])
    expect(v('IBNR = 1,525; total unpaid claims = 2,850.')).toEqual([1525, 2850])
    expect(v('i. \\$5.00 per \\$1,000 of coverage')).toEqual([5])
    expect(v('2014: 6,008; 2016: 8,394 (\\$000)')).toEqual([6008, 8394])
    expect(v('1. **Consult the claims department**')).toBeUndefined()
    expect(v('About \\$12,890: \\$12,886 with the rounded factors')).toEqual([12890, 12886])
  })

  it('reads nothing from a table, a prose answer, or an essay’s sample answer', () => {
    expect(answerTargets(part('Calculate the triangle.', '| AY | 12 | 24 |'))).toBeNull()
    expect(answerTargets(part('Explain.', 'The large loss adjustment is appropriate because the excess losses ranged from \\$0 to \\$9 million across the experience period, which is volatile.'))).toBeNull()
    expect(answerTargets(part('Briefly describe one shortcoming.', '', 'A rate change of 5% distorts it.'))).toBeNull()
  })

  it('falls back to where each sample answer ends for an unkeyed calculation', () => {
    const t = answerTargets(part('Calculate the IBNR.', '', 'BF = 7,720\nBenktander = 8,764.44\n\nAlternatively:\n\nIBNR = 8,770'))
    expect(t).toEqual({ source: 'sample', targets: [expect.objectContaining({ value: 8764.44 }), expect.objectContaining({ value: 8770 })] })
  })
})

describe('checkNumericAnswer', () => {
  const trend = part('Calculate the projected 2015 accident year loss and ALAE.', 'Approximately \\$17,735 (thousands)')

  it('matches the answer, with or without the reader’s working above it', () => {
    expect(checkNumericAnswer('17,735', trend)).toMatchObject({ verdict: 'match', suggestion: 'correct', source: 'answer', note: null })
    expect(checkNumericAnswer('15000*1.1449*0.8191*1.2608 = 17,736', trend)?.verdict).toBe('match')
    expect(checkNumericAnswer('Projected losses: $17.74k', trend)).toMatchObject({ verdict: 'match', note: null })
  })

  it('reads the answer in other units', () => {
    expect(checkNumericAnswer('17,735,000', trend)).toMatchObject({ verdict: 'match', suggestion: 'correct', note: 'units' })
  })

  it('reads a percent written with or without its sign, or as a fraction', () => {
    const rate = part('Calculate the indicated rate change.', '**Indicated rate change = +6.92%**')
    for (const r of ['6.92%', '6.92', '0.0692', '+6.9%']) expect(checkNumericAnswer(r, rate)?.verdict, r).toBe('match')
  })

  it('calls a figure within 3% close and suggests partial credit', () => {
    const rate = part('Calculate the indicated rate change.', '+6.92%')
    expect(checkNumericAnswer('7%', rate)).toMatchObject({ verdict: 'close', suggestion: 'partial' })
  })

  it('calls the right size with the wrong sign close, never a match', () => {
    const trendSel = part('Calculate the frequency trend.', '-7%')
    expect(checkNumericAnswer('7%', trendSel)).toMatchObject({ verdict: 'close', suggestion: 'partial', note: 'sign' })
  })

  it('suggests no credit for a miss against the answer, and nothing for a miss against a sample', () => {
    expect(checkNumericAnswer('15,000', trend)).toMatchObject({ verdict: 'mismatch', suggestion: 'incorrect', note: null })
    const unkeyed = part('Calculate the IBNR.', '', 'IBNR = 8,764.44')
    expect(checkNumericAnswer('9,600', unkeyed)).toMatchObject({ verdict: 'mismatch', suggestion: null, source: 'sample' })
  })

  it('checks nothing when either side has no figure', () => {
    expect(checkNumericAnswer('I would use the BF method.', trend)).toBeNull()
    expect(checkNumericAnswer('17,735', part('Briefly describe two disadvantages.', '', 'Not homogeneous.'))).toBeNull()
    expect(checkNumericAnswer('', trend)).toBeNull()
  })

  it('handles an answer of zero', () => {
    const z = part('Calculate the IBNR.', '0')
    expect(checkNumericAnswer('0', z)?.verdict).toBe('match')
    expect(checkNumericAnswer('5', z)?.verdict).toBe('mismatch')
  })
})

describe('numericCheckMessage', () => {
  const trend = part('Calculate the projected losses.', '\\$17,735')

  it('says what was compared, in the figures as written', () => {
    expect(numericCheckMessage(checkNumericAnswer('17,735', trend)!)).toEqual({
      title: 'Suggested grade: Full credit',
      body: 'Your final figure, 17,735, matches the answer, 17,735.',
    })
    expect(numericCheckMessage(checkNumericAnswer('17,735,000', trend)!).body).toBe(
      'Your final figure, 17,735,000, matches the answer, 17,735, in different units.')
    expect(numericCheckMessage(checkNumericAnswer('15,000', trend)!).title).toBe('Suggested grade: No credit')
  })

  it('suggests no grade when a sample answer is all there is to miss against', () => {
    const m = numericCheckMessage(checkNumericAnswer('9,600', part('Calculate the IBNR.', '', 'IBNR = 8,764.44'))!)
    expect(m.title).toBe('Check your final figure')
    expect(m.body).toContain('(8,764.44)')
  })
})
