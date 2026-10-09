import { ToolInputError, type ToolSpec } from '../types'

const FORMS = [
  { value: 'effective_interest', label: 'Effective interest i' },
  { value: 'effective_discount', label: 'Effective discount d' },
  { value: 'nominal_interest', label: 'Nominal interest i⁽ᵐ⁾' },
  { value: 'nominal_discount', label: 'Nominal discount d⁽ᵐ⁾' },
  { value: 'force', label: 'Force of interest δ' },
]

const SUPERSCRIPT: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const sup = (n: number) => String(n).replace(/\d/g, d => SUPERSCRIPT[d])

/** One rate in any form → the effective annual rate of interest. */
function toEffective(form: string, rate: number, m: number): number {
  switch (form) {
    case 'effective_discount':
      if (rate >= 1) throw new ToolInputError('rate', 'An effective discount rate must be below 1.')
      return rate / (1 - rate)
    case 'nominal_interest':
      return (1 + rate / m) ** m - 1
    case 'nominal_discount':
      if (rate >= m) throw new ToolInputError('rate', `A nominal discount rate convertible ${m} times must be below ${m}.`)
      return (1 - rate / m) ** -m - 1
    case 'force':
      return Math.exp(rate) - 1
    default:
      return rate
  }
}

export const interestConverter: ToolSpec = {
  id: 'finance.interest_converter',
  version: '1.0.0',
  name: 'Interest Converter',
  area: 'finance',
  answers: "What's this rate in another form?",
  fields: [
    { kind: 'choice', key: 'form', label: 'Given as', description: 'Which form the rate is given in.', options: FORMS, default: 'effective_interest' },
    { kind: 'number', key: 'rate', label: 'Rate', symbol: 'r', unit: 'percent', min: 0, max: 1, step: 0.0005, default: 0.05, description: 'The rate, as a decimal (0.05 for 5%).' },
    {
      kind: 'number', key: 'm', label: 'Conversions a year', symbol: 'm', unit: 'count', integer: true, min: 1, max: 365, sliderMax: 52, step: 1, default: 12,
      description: 'How many times a year the nominal rates convert (12 for monthly).',
    },
  ],
  notation: input => {
    const m = Number(input.m)
    return `1 + i = (1 + i${sup(m)}/${m})${sup(m)} = (1 − d)⁻¹ = e^δ`
  },
  view: 'table',
  compute: input => {
    const form = String(input.form)
    const rate = Number(input.rate)
    const m = Number(input.m)
    const i = toEffective(form, rate, m)
    const d = i / (1 + i)
    const delta = Math.log(1 + i)
    const im = m * ((1 + i) ** (1 / m) - 1)
    const dm = m * (1 - (1 + i) ** (-1 / m))
    const v = 1 / (1 + i)
    const rows = [
      { form: 'Effective interest', symbol: 'i', value: i },
      { form: 'Effective discount', symbol: 'd', value: d },
      { form: `Nominal interest, m = ${m}`, symbol: `i${sup(m)}`, value: im },
      { form: `Nominal discount, m = ${m}`, symbol: `d${sup(m)}`, value: dm },
      { form: 'Force of interest', symbol: 'δ', value: delta },
    ]
    return {
      tiles: [
        { symbol: 'i', label: 'Effective', value: i, unit: 'percent' },
        { symbol: 'd', label: 'Discount', value: d, unit: 'percent' },
        { symbol: 'δ', label: 'Force', value: delta, unit: 'percent' },
      ],
      table: {
        columns: [
          { key: 'form', label: 'Form', kind: 'text' },
          { key: 'symbol', label: '', kind: 'text' },
          { key: 'value', label: 'Rate', kind: 'number', unit: 'percent', computed: true },
        ],
        rows,
      },
      trace: [
        { label: 'Effective rate of interest', formula: form === 'effective_interest' ? 'i = r' : `i from the ${FORMS.find(f => f.value === form)?.label ?? form}`, result: i, unit: 'percent' },
        { label: 'Discount', formula: 'd = i / (1 + i)', result: d, unit: 'percent' },
        { label: 'Force of interest', formula: 'δ = ln(1 + i)', result: delta, unit: 'percent' },
        { label: `Nominal interest, m = ${m}`, formula: `i${sup(m)} = m[(1 + i)^(1/m) − 1]`, result: im, unit: 'percent' },
        { label: `Nominal discount, m = ${m}`, formula: `d${sup(m)} = m[1 − (1 + i)^(−1/m)]`, result: dm, unit: 'percent' },
        { label: 'Discount factor', formula: 'v = 1 / (1 + i)', result: v, unit: 'factor' },
      ],
      warnings: [],
      values: { i, d, delta, nominal_interest: im, nominal_discount: dm, v, m },
    }
  },
  method: {
    concepts: ['Effective Rate', 'Effective Discount Rate', 'Nominal Interest Rate Convertible m-thly', 'Force of Interest'],
    readings: [],
  },
}
