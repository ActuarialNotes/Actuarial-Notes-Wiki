import { describe, expect, it } from 'vitest'
import pearsonVue from '@/data/pearsonVueFunctions.json'
import {
  KEYPAD_FUNCTIONS, KEYPAD_ROWS, backspace, cellContent, closeBrackets, editEntry, isPointing, pointAt, readyEntry,
  typeFunction, typeInto, valueAsFormula,
} from './sheetKeypad'

describe('the keys', () => {
  it('offers only functions the exam-day spreadsheet has', () => {
    const list = new Set(pearsonVue.functions)
    for (const name of KEYPAD_FUNCTIONS) expect(list.has(name), name).toBe(true)
  })
  it('lays six keys in every row', () => {
    for (const row of KEYPAD_ROWS) expect(row).toHaveLength(6)
  })
})

describe('typing', () => {
  it('replaces a ready cell with the first key', () => {
    expect(typeInto(readyEntry('42'), '7')).toMatchObject({ text: '7', caret: 1, mode: 'edit' })
  })
  it('types at the caret when editing', () => {
    expect(typeInto({ ...editEntry('12'), caret: 1 }, '5')).toMatchObject({ text: '152', caret: 2 })
  })
  it('starts a formula from a function key', () => {
    expect(typeFunction(readyEntry('3'), 'SUM').text).toBe('=SUM(')
    expect(typeFunction(editEntry('=2*'), 'SQRT').text).toBe('=2*SQRT(')
  })
  it('deletes before the caret, and clears a ready cell', () => {
    expect(backspace(editEntry('123'))).toMatchObject({ text: '12', caret: 2 })
    expect(backspace(readyEntry('123'))).toMatchObject({ text: '', mode: 'edit' })
    expect(backspace({ ...editEntry('1'), caret: 0 }).text).toBe('1')
  })
})

describe('pointing', () => {
  it('points while a formula waits for an argument', () => {
    expect(isPointing(editEntry('=SUM('))).toBe(true)
    expect(isPointing(editEntry('=A1+'))).toBe(true)
    expect(isPointing(editEntry('=A1'))).toBe(false)
    expect(isPointing(editEntry('12+'))).toBe(false)
    expect(isPointing(readyEntry('=SUM('))).toBe(false)
  })
  it('types the address, and a second tap replaces it', () => {
    let e = pointAt(editEntry('=SUM('), 'B2')
    expect(e).toMatchObject({ text: '=SUM(B2', caret: 7 })
    expect(isPointing(e)).toBe(true)
    e = pointAt(e, 'C3')
    expect(e.text).toBe('=SUM(C3')
    e = typeInto(e, ':')
    e = pointAt(e, 'C9')
    expect(e.text).toBe('=SUM(C3:C9')
  })
})

describe('entering', () => {
  it('closes brackets left open', () => {
    expect(closeBrackets('=ROUND(SUM(A1:A3),2')).toBe('=ROUND(SUM(A1:A3),2)')
    expect(closeBrackets('=SUM(A1)')).toBe('=SUM(A1)')
    expect(closeBrackets('(3')).toBe('(3')
  })
  it('shows a formula over its value', () => {
    expect(cellContent('=A1*2', 4)).toBe('=A1*2')
    expect(cellContent(undefined, 4)).toBe('4')
    expect(cellContent(undefined, null)).toBe('')
    // An erroring formula still shows its formula, not its error.
    expect(cellContent('<span class="a">=</span><span class="b">LN</span><span>(</span><span>A6</span><span>)</span>', '#NUM!')).toBe('=LN(A6)')
  })
})

describe('valueAsFormula', () => {
  it('writes a number, a percentage and a label as formulas', () => {
    expect(valueAsFormula('42')).toBe('=42')
    expect(valueAsFormula('-1.5e3')).toBe('=-1.5e3')
    expect(valueAsFormula('5%')).toBe('=5%')
    expect(valueAsFormula('true')).toBe('=TRUE')
    expect(valueAsFormula('Loss "ratio"')).toBe('="Loss ""ratio"""')
  })
})
