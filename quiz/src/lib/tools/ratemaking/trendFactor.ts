import { dateOfYear, decimalYear, parseDate } from '../dates'
import { formatValue } from '../format'
import type { ToolSpec } from '../types'

export const trendFactor: ToolSpec = {
  id: 'ratemaking.trend_factor',
  version: '1.0.0',
  name: 'Trend Factor',
  area: 'ratemaking',
  answers: 'How far do these losses trend to the period the rates will cover?',
  aka: ['trend period', 'projected trend'],
  fields: [
    { kind: 'number', key: 'trend', label: 'Annual trend', symbol: 't', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.15, step: 0.0025, default: 0.03, description: 'The selected annual trend, as a decimal (from Trend Fit, or chosen).' },
    {
      kind: 'choice', key: 'basis', label: 'Experience period', description: 'Accident year losses occur, on average, mid-year; a policy year\'s, half a term later.',
      options: [{ value: 'accident', label: 'Accident year' }, { value: 'policy', label: 'Policy year' }], default: 'accident',
    },
    { kind: 'number', key: 'year', label: 'Experience year', symbol: 'Y', unit: 'count', integer: true, min: 1900, max: 2200, sliderMin: 2000, sliderMax: 2030, step: 1, default: 2023, description: 'The accident or policy year being trended.' },
    { kind: 'date', key: 'effective', label: 'Rates effective', symbol: 'E', default: '2025-01-01', description: 'The date the new rates take effect.' },
    { kind: 'number', key: 'in_effect', label: 'Rates in effect (months)', symbol: 'R', unit: 'count', integer: true, min: 1, max: 120, sliderMax: 36, step: 1, default: 12, description: 'How long the rates will be in effect, in months.' },
    { kind: 'number', key: 'term', label: 'Policy term (months)', symbol: 'T', unit: 'count', integer: true, min: 1, max: 120, sliderMax: 24, step: 1, default: 12, description: 'The policy term in months (6 for six-month auto policies).' },
  ],
  notation: () => 'TF = (1 + t)ᵖ, p = average accident date under the new rates − in the experience',
  view: 'none',
  compute: input => {
    const t = Number(input.trend)
    const Y = Number(input.year)
    const T = Number(input.term) / 12
    const R = Number(input.in_effect) / 12
    const E = decimalYear(parseDate(input.effective)!)
    const from = input.basis === 'policy' ? Y + 0.5 + T / 2 : Y + 0.5
    const to = E + R / 2 + T / 2
    const period = to - from
    const factor = (1 + t) ** period
    return {
      tiles: [
        { symbol: 'TF', label: 'Trend factor', value: factor, unit: 'factor' },
        { symbol: 'p', label: 'Years', value: period, unit: 'years' },
      ],
      trace: [
        { label: `Average accident date, ${input.basis === 'policy' ? 'policy' : 'accident'} year ${Y}`, formula: `${dateOfYear(from)}${input.basis === 'policy' ? ': mid-year plus half a term' : ': mid-year'}`, result: from, unit: 'years' },
        { label: 'Average accident date under the new rates', formula: `${dateOfYear(to)}: the effective date, plus half the time in effect and half a term`, result: to, unit: 'years' },
        { label: 'Trend period', formula: `${dateOfYear(from)} to ${dateOfYear(to)}`, result: period, unit: 'years' },
        { label: 'Trend factor', formula: `(1 + ${t})^${formatValue(period, 'years')}`, result: factor, unit: 'factor' },
      ],
      warnings: period < 0 ? ['The experience period is later than the period the rates cover: the trend runs backwards.'] : [],
      values: { factor, period, from: dateOfYear(from), to: dateOfYear(to) },
      summary: `Trend factor ${formatValue(factor, 'factor')} over ${formatValue(period, 'years')} years, from ${dateOfYear(from)} to ${dateOfYear(to)}.`,
    }
  },
  compare: [
    { key: 'from', label: 'From', unit: 'text' },
    { key: 'to', label: 'To', unit: 'text' },
    { key: 'period', label: 'Years', unit: 'years' },
    { key: 'factor', label: 'Trend factor', unit: 'factor' },
  ],
  method: {
    concepts: ['Loss Trend'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 6' }],
  },
  next: [
    {
      tool: 'ratemaking.two_step_trend',
      label: 'Two-Step Loss Trend',
      // An accident year's future end is the same date either way; the reader then picks where the past trend stops.
      build: (input, output) => (input.basis === 'accident'
        ? { past_trend: Number(input.trend), future_trend: Number(input.trend), year: Number(input.year), future: String(output.values.to) }
        : { past_trend: Number(input.trend), future_trend: Number(input.trend), future: String(output.values.to) }),
    },
  ],
}
