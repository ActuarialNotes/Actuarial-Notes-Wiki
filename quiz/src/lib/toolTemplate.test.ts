import { describe, expect, it } from 'vitest'
import { TOOLS, toolById } from './tools'
import {
  TEMPLATE_TOOLS,
  columnNumbers,
  columnSource,
  formulaText,
  inputGroups,
  isScalar,
  keypadValue,
  originOf,
  pressKey,
  readingLabel,
  scalarSource,
  slidersInline,
} from './toolTemplate'

describe('the template tools', () => {
  it('are all real tools', () => {
    for (const id of TEMPLATE_TOOLS) expect(toolById(id), id).toBeDefined()
  })
  it('keep sliders inline on Permissible Loss Ratio and move them to the sheet on Bond Price', () => {
    const scalars = (id: string) => toolById(id)!.fields.filter(isScalar)
    expect(slidersInline(scalars('ratemaking.permissible_loss_ratio'))).toBe(true)
    expect(slidersInline(scalars('finance.bond_price'))).toBe(false)
  })
})

describe('inputGroups', () => {
  it('puts the judgments first, each group in the spec\'s order', () => {
    const plr = toolById('ratemaking.permissible_loss_ratio')!.fields.filter(isScalar)
    const { judgments, inputs } = inputGroups(plr)
    expect(judgments.map(f => f.key)).toEqual(['profit'])
    expect(inputs.map(f => f.key)).toEqual(['fixed', 'variable'])
  })
})

describe('scalarSource', () => {
  it('reads default, yours, linked and published, most specific first', () => {
    expect(scalarSource({ touched: false, value: 1 })).toEqual({ kind: 'default' })
    expect(scalarSource({ touched: true, value: 1 })).toEqual({ kind: 'yours' })
    const origin = originOf('Expense Ratios', 0.2)
    expect(scalarSource({ touched: true, value: 0.2, origin })).toEqual({ kind: 'linked', label: 'Expense Ratios' })
    // Changed since: the reader's now.
    expect(scalarSource({ touched: true, value: 0.25, origin })).toEqual({ kind: 'yours' })
    expect(scalarSource({ touched: true, value: 0.06, origin, published: { label: 'AIRB 2026 · p. 7', checked: false } }))
      .toEqual({ kind: 'published', label: 'AIRB 2026 · p. 7', checked: false })
  })
})

describe('columnSource', () => {
  const defaults = [{ origin: '2020', cdf: 1 }, { origin: '2021', cdf: 1.03 }]
  it('is the example\'s until a cell of that column changes', () => {
    expect(columnSource(undefined, defaults, 'cdf')).toEqual({ kind: 'default' })
    expect(columnSource([{ origin: '2020', cdf: 1 }, { origin: '2021', cdf: '1.03' }], defaults, 'cdf')).toEqual({ kind: 'default' })
    expect(columnSource([{ origin: '2020', cdf: 1.1 }, { origin: '2021', cdf: 1.03 }], defaults, 'cdf')).toEqual({ kind: 'yours' })
  })
  it('is linked while the column still holds what a tool filled it with', () => {
    const rows = [{ origin: '2020', cdf: 1.2 }, { origin: '2021', cdf: 1.1 }]
    const origin = originOf('Development to Ultimate', [1.2, 1.1])
    expect(columnSource(rows, defaults, 'cdf', origin)).toEqual({ kind: 'linked', label: 'Development to Ultimate' })
  })
})

describe('column numbers and formulas', () => {
  it('number every column but the origin, inputs then computed, and write a formula in them', () => {
    const bf = toolById('reserving.bornhuetter_ferguson')!
    const field = bf.fields.find(f => f.kind === 'table')!
    if (field.kind !== 'table') throw new Error()
    const numbers = columnNumbers(field.columns, [{ key: 'ultimate', label: 'Ultimate', kind: 'number' }, { key: 'reserve', label: 'IBNR', kind: 'number' }])
    expect([...numbers]).toEqual([['latest', 1], ['cdf', 2], ['expected', 3], ['ultimate', 4], ['reserve', 5]])
    expect(formulaText('{latest} + {reserve}', numbers)).toBe('(1) + (5)')
    expect(formulaText('{nope}', numbers)).toBe('{nope}')
  })
  it('every formula a tool writes names only its own columns', () => {
    for (const spec of TOOLS) {
      const res = (() => { try { return spec.compute(Object.fromEntries(spec.fields.map(f => [f.key, (f as { default: unknown }).default])) as never) } catch { return null } })()
      for (const c of res?.table?.columns ?? []) {
        if (!c.formula) continue
        const keys = new Set(res!.table!.columns.map(x => x.key))
        for (const [, k] of c.formula.matchAll(/\{(\w+)\}/g)) expect(keys.has(k), `${spec.id} ${c.key} → ${k}`).toBe(true)
      }
    }
  })
})

describe('readingLabel', () => {
  it('shortens the reading to its author and locator', () => {
    expect(readingLabel([{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 9' }])).toBe('Friedland, Ch. 9')
    expect(readingLabel([{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 7' }])).toBe('Werner, Ch. 7')
    expect(readingLabel([])).toBeNull()
  })
})

describe('the keypad', () => {
  const type = (keys: string, opts = {}) => [...keys].reduce((t, k) => pressKey(t, k as never, opts), '')
  it('types a number, one point at most', () => {
    expect(type('12.5.0')).toBe('12.50')
    expect(type('.5')).toBe('0.5')
    expect(type('007')).toBe('7')
  })
  it('takes no point in a whole number, and a sign only where the field takes negatives', () => {
    expect(type('2.5', { integer: true })).toBe('25')
    expect(type('5±')).toBe('5')
    expect(type('5±', { negative: true })).toBe('-5')
    expect(type('5±±', { negative: true })).toBe('5')
  })
  it('deletes back to empty', () => {
    expect(pressKey('-5', '⌫')).toBe('')
    expect(pressKey('12', '⌫')).toBe('1')
  })
  it('reads an entry as a number once it is one', () => {
    expect(keypadValue('')).toBeNull()
    expect(keypadValue('-')).toBeNull()
    expect(keypadValue('0.')).toBe(0)
    expect(keypadValue('-2.5')).toBe(-2.5)
  })
})
