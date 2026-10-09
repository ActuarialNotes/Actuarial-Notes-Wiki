import { formatValue } from '../format'
import type { ToolSpec } from '../types'

export const annuity: ToolSpec = {
  id: 'finance.annuity',
  version: '1.0.0',
  name: 'Annuity',
  area: 'finance',
  answers: "What's a level annuity worth today, and when it ends?",
  fields: [
    {
      kind: 'choice', key: 'timing', label: 'Payments', description: 'Whether each payment is at the end of its period (immediate) or the start (due).',
      options: [{ value: 'immediate', label: 'Immediate' }, { value: 'due', label: 'Due' }], default: 'immediate',
    },
    { kind: 'number', key: 'payment', label: 'Payment', symbol: 'P', unit: 'money', min: 0, max: 1e12, sliderMax: 10000, step: 10, default: 100, description: 'The level payment each period.' },
    { kind: 'number', key: 'n', label: 'Periods', symbol: 'n', unit: 'count', integer: true, min: 1, max: 1200, sliderMax: 60, step: 1, default: 10, description: 'How many payments.' },
    { kind: 'number', key: 'i', label: 'Rate per period', symbol: 'i', unit: 'percent', min: 0, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective rate per payment period, as a decimal.' },
  ],
  notation: input => {
    const due = input.timing === 'due'
    return due ? 'PV = P · ä⌉n = P(1 − vⁿ)/d' : 'PV = P · a⌉n = P(1 − vⁿ)/i'
  },
  view: 'none',
  compute: input => {
    const due = input.timing === 'due'
    const P = Number(input.payment)
    const n = Number(input.n)
    const i = Number(input.i)
    const v = 1 / (1 + i)
    const an = i === 0 ? n : (1 - v ** n) / i
    const sn = i === 0 ? n : ((1 + i) ** n - 1) / i
    const factor = due ? an * (1 + i) : an
    const accumulation = due ? sn * (1 + i) : sn
    const symbol = due ? 'ä' : 'a'
    const ssymbol = due ? 's̈' : 's'
    return {
      tiles: [
        { symbol: 'PV', label: 'Today', value: P * factor, unit: 'money' },
        { symbol: 'FV', label: 'At n', value: P * accumulation, unit: 'money' },
        { symbol: `${symbol}⌉n`, label: 'Factor', value: factor, unit: 'factor' },
      ],
      trace: [
        { label: 'Discount factor', formula: `v = 1/(1 + ${i})`, result: v, unit: 'factor' },
        { label: 'Annuity-immediate factor', formula: i === 0 ? 'a⌉n = n' : `a⌉n = (1 − v^${n}) / ${i}`, result: an, unit: 'factor' },
        ...(due ? [{ label: 'Annuity-due factor', formula: 'ä⌉n = a⌉n · (1 + i)', result: factor, unit: 'factor' as const }] : []),
        { label: 'Present value', formula: `PV = ${P} × ${symbol}⌉n`, result: P * factor, unit: 'money' },
        { label: 'Accumulated value', formula: `FV = ${P} × ${ssymbol}⌉n`, result: P * accumulation, unit: 'money' },
      ],
      warnings: [],
      values: { present_value: P * factor, accumulated_value: P * accumulation, annuity_factor: factor, accumulation_factor: accumulation },
      summary: `Annuity-${due ? 'due' : 'immediate'}: present value ${formatValue(P * factor, 'money')}, accumulated value ${formatValue(P * accumulation, 'money')} at the end of period ${n} (factor ${formatValue(factor, 'factor')}).`,
    }
  },
  method: { concepts: ['Annuity Immediate', 'Annuity Due'], readings: [] },
}
