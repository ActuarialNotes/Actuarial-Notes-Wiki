import { describe, expect, it } from 'vitest'
import { REF_COLORS, formulaRefs, formulaRuns, formulaText } from './formulaRefs'

describe('formulaRefs', () => {
  it('finds cells and blocks, zero-based', () => {
    const refs = formulaRefs('=SUM(B3:C9)+$A$1*b2')
    expect(refs.map(r => [r.top, r.left, r.bottom, r.right])).toEqual([[2, 1, 8, 2], [0, 0, 0, 0], [1, 1, 1, 1]])
  })
  it('colours each distinct reference, and repeats share a colour', () => {
    const [a, b, c] = formulaRefs('=A1+B2+$A$1')
    expect(a.color).toBe(REF_COLORS[0])
    expect(b.color).toBe(REF_COLORS[1])
    expect(c.color).toBe(REF_COLORS[0])
  })
  it('skips function names, strings and text', () => {
    expect(formulaRefs('=LOG10(A1)')).toHaveLength(1)
    expect(formulaRefs('="A1"&B2').map(r => r.left)).toEqual([1])
    expect(formulaRefs('A1+B2')).toEqual([])
  })
  it('places each reference in the formula', () => {
    const text = '=LN(ABS(A6))'
    const [ref] = formulaRefs(text)
    expect(text.slice(ref.start, ref.end)).toBe('A6')
  })
  it('handles a reference still being typed', () => {
    expect(formulaRefs('=SUM(A1:')).toHaveLength(1)
  })
})

describe('formulaRuns', () => {
  it('keeps every character', () => {
    const text = '=ROUND(SUM(B3:B9)/C2,2)'
    expect(formulaRuns(text).map(r => r.text).join('')).toBe(text)
    expect(formulaRuns(text).filter(r => r.color).map(r => r.text)).toEqual(['B3:B9', 'C2'])
  })
})

describe('formulaText', () => {
  it('reads the formula back out of Fortune-sheet’s HTML', () => {
    const html = '<span dir="auto" class="luckysheet-formula-text-color">=</span><span dir="auto" class="luckysheet-formula-text-func">SUM</span><span dir="auto" class="luckysheet-formula-text-lpar">(</span><span class="fortune-formula-functionrange-cell" rangeindex="0" dir="auto" style="color:#c1232b;">B3:B9</span><span dir="auto" class="luckysheet-formula-text-rpar">)</span><span dir="auto" class="luckysheet-formula-text-calc"><</span><span dir="auto" class="luckysheet-formula-text-string">"a&b"</span>'
    expect(formulaText(html)).toBe('=SUM(B3:B9)<"a&b"')
  })
})
