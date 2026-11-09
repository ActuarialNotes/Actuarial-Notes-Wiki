import { describe, expect, it } from 'vitest'
import { TOOLS, runTool, toolById } from './tools'
import {
  TEMPLATE_TOOLS,
  columnNumbers,
  columnSource,
  formulaText,
  arrivalOrigins,
  buildSenders,
  carried,
  comparison,
  contextLine,
  fills,
  givesTo,
  handoffPath,
  handoffValue,
  inputGroups,
  isScalar,
  locatorPage,
  ownChip,
  publishedLabel,
  sharedDefaultLabel,
  takesFrom,
  tilesInOrder,
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
  it('keeps three inputs or fewer in the formula\'s order, judgments among them', () => {
    const plr = toolById('ratemaking.permissible_loss_ratio')!.fields.filter(isScalar)
    const { judgments, inputs } = inputGroups(plr)
    expect(judgments).toEqual([])
    expect(inputs.map(f => f.key)).toEqual(['fixed', 'variable', 'profit'])
  })

  it('puts the judgments first past three inputs, each group in the spec\'s order', () => {
    const tf = toolById('ratemaking.trend_factor')!.fields.filter(isScalar)
    const { judgments, inputs } = inputGroups(tf)
    expect(judgments.map(f => f.key)).toEqual(['trend'])
    expect(inputs.map(f => f.key)).toEqual(['basis', 'year', 'effective', 'in_effect', 'term'])
  })
})

describe('Takes from / Gives to (template v2, §3.3)', () => {
  it('reads both directions off the tools\' hand-offs', () => {
    const plr = toolById('ratemaking.permissible_loss_ratio')!
    expect(takesFrom(plr.id).map(n => n.tool.id)).toEqual(['ratemaking.expense_ratios'])
    expect(givesTo(plr).map(n => n.tool.id)).toEqual(['ratemaking.loss_ratio_method'])
    const er = toolById('ratemaking.expense_ratios')!
    expect(takesFrom(er.id)).toEqual([])
    expect(givesTo(er).map(n => n.tool.id).sort()).toEqual(['ratemaking.loss_ratio_method', 'ratemaking.permissible_loss_ratio'])
    expect(takesFrom('ratemaking.trend_factor').map(n => n.tool.id).sort()).toEqual(['data.price_index', 'ratemaking.combined_trend', 'ratemaking.trend_fit'])
  })

  it('agrees with every tool\'s own next, both ways', () => {
    const senders = buildSenders(TOOLS)
    for (const t of TOOLS) for (const h of t.next ?? []) expect(senders.get(h.tool)?.some(n => n.tool.id === t.id)).toBe(true)
  })

  it('says which values a hand-off carries, in the arriving tool\'s order', () => {
    const er = toolById('ratemaking.expense_ratios')!
    const r = runTool(er, {})
    const [n] = givesTo(er).filter(x => x.tool.id === 'ratemaking.permissible_loss_ratio')
    const c = carried(n.tool, n.handoff.build(r.input, r))
    expect(c.map(x => x.field.key)).toEqual(['fixed', 'variable'])
    expect(c[0].value).toBeCloseTo(Number(r.values.fixed_provision), 12)
  })

  it('finds the value a sender would give a field, from its last run or none', () => {
    const [fit] = takesFrom('ratemaking.trend_factor').filter(n => n.tool.id === 'ratemaking.trend_fit')
    expect(fills(fit, 'trend')).toBe(true)
    expect(fills(fit, 'year')).toBe(false)
    expect(handoffValue(fit, 'trend', undefined)).toBeNull()
    const v = handoffValue(fit, 'trend', runTool(fit.tool, {}).input)
    expect(typeof v).toBe('number')
    expect(handoffValue(fit, 'year', runTool(fit.tool, {}).input)).toBeUndefined()
  })

  it('names the sender in a hand-off\'s path, and its values arrive linked', () => {
    expect(handoffPath('/tools/permissible-loss-ratio#input=abc', 'expense-ratios')).toBe('/tools/permissible-loss-ratio?from=expense-ratios#input=abc')
    const plr = toolById('ratemaking.permissible_loss_ratio')!
    const er = toolById('ratemaking.expense_ratios')!
    const origins = arrivalOrigins(plr, er, { fixed: 0.11, variable: 0.171 })
    expect(Object.keys(origins)).toEqual(['fixed', 'variable'])
    expect(scalarSource({ touched: true, value: 0.11, origin: origins.fixed })).toEqual({ kind: 'linked', label: 'Expense Ratios', tool: er.id })
    expect(arrivalOrigins(plr, undefined, { fixed: 0.11 })).toEqual({})
  })
})

describe('the from chip (template v2, §3.4)', () => {
  it('is on a judgment and on any changed input; the rest share one line', () => {
    expect(ownChip(true, { kind: 'default' })).toBe(true)
    expect(ownChip(false, { kind: 'default' })).toBe(false)
    expect(ownChip(false, { kind: 'yours' })).toBe(true)
    expect(sharedDefaultLabel([{ source: { kind: 'default' } }, { source: { kind: 'default' } }])).toBe('All')
    expect(sharedDefaultLabel([{ source: { kind: 'default' } }, { source: { kind: 'yours' } }])).toBe('The rest')
    expect(sharedDefaultLabel([{ judgment: true, source: { kind: 'default' } }])).toBeNull()
  })

  it('names a published figure by its short name and place', () => {
    expect(publishedLabel({ shortName: 'AIRB', publisher: 'Automobile Insurance Rate Board', jurisdiction: 'CA-AB' })).toBe('AIRB, Alberta')
    expect(publishedLabel({ publisher: 'A Board', jurisdiction: 'XX' })).toBe('A Board, XX')
  })
})

describe('a published figure in place (template v2, §3.5)', () => {
  it('says where and on what basis in one line', () => {
    expect(contextLine({ jurisdiction: 'CA-AB', line: 'Private passenger vehicles', basis: 'cap' })).toBe('Alberta, private passenger vehicles · cap')
    expect(contextLine({ jurisdiction: 'CA' })).toBe('Canada')
  })

  it('reads the page a locator cites', () => {
    expect(locatorPage('Profit (p. 7)')).toBe(7)
    expect(locatorPage('Implied factors (pp. 10–11)')).toBe(10)
    expect(locatorPage('1.2.1 MCT supervisory capital ratio')).toBeNull()
  })

  it('sets the reader\'s value against the figure only when they differ', () => {
    expect(comparison(0.2, 0.06, 'cap', '20%')).toBe('Your 20% is above this cap.')
    expect(comparison(0.04, 0.06, 'cap', '4%')).toBe('Your 4% is below this cap.')
    expect(comparison(0.0601, 0.06, 'cap', '6%')).toBeNull()
    expect(comparison(0.3, 0.278, 'selected', '30%')).toBe('Your 30% is above this figure.')
  })
})

describe('the answer card\'s lead', () => {
  it('leads Expense Ratios with the total, the others in their order', () => {
    const r = runTool(toolById('ratemaking.expense_ratios')!, {})
    expect(tilesInOrder('ratemaking.expense_ratios', r.tiles).map(t => t.symbol)).toEqual(['F + V', 'F', 'V'])
    expect(tilesInOrder('ratemaking.permissible_loss_ratio', r.tiles).map(t => t.symbol)).toEqual(['F', 'V', 'F + V'])
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
