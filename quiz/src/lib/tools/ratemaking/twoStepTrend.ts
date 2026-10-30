import { dateOfYear, decimalYear, parseDate } from '../dates'
import { formatValue } from '../format'
import type { ToolSpec } from '../types'

export const twoStepTrend: ToolSpec = {
  id: 'ratemaking.two_step_trend',
  version: '1.0.0',
  name: 'Two-Step Loss Trend',
  area: 'ratemaking',
  answers: 'How far do these losses trend when the past and the future trend differ?',
  aka: ['two-step trend', 'current trend', 'projected trend', 'experience trend'],
  fields: [
    { kind: 'number', key: 'past_trend', label: 'Past trend', symbol: 't₁', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.15, step: 0.0025, default: 0.03, description: 'The trend from the experience period to the latest data point (the current, or experience, trend), as a decimal.' },
    { kind: 'number', key: 'future_trend', label: 'Future trend', symbol: 't₂', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.15, step: 0.0025, default: 0.03, description: 'The trend from the latest data point to the period the rates cover (the projected, or prospective, trend), as a decimal.' },
    { kind: 'number', key: 'year', label: 'Accident year', symbol: 'Y', unit: 'count', integer: true, min: 1900, max: 2200, sliderMin: 2000, sliderMax: 2030, step: 1, default: 2023, description: 'The accident year being trended; its losses occur, on average, mid-year.' },
    { kind: 'date', key: 'trend_to', label: 'Latest data point', symbol: 'L', default: '2024-07-01', description: 'Where the past trend ends and the future one begins: the average accident date of the latest point in the trend data (the middle of the latest year-ending period).' },
    { kind: 'date', key: 'future', label: 'Future average date', symbol: 'F', default: '2026-01-01', description: 'The average accident date under the new rates: the effective date plus half the time the rates are in effect and half a policy term. Trend Factor works it out (its "to").' },
  ],
  notation: () => 'TF = (1 + t₁)^(L − (Y + ½)) × (1 + t₂)^(F − L)',
  view: 'none',
  compute: input => {
    const t1 = Number(input.past_trend)
    const t2 = Number(input.future_trend)
    const Y = Number(input.year)
    const from = Y + 0.5
    const pivot = decimalYear(parseDate(input.trend_to)!)
    const to = decimalYear(parseDate(input.future)!)
    const p1 = pivot - from
    const p2 = to - pivot
    const f1 = (1 + t1) ** p1
    const f2 = (1 + t2) ** p2
    const factor = f1 * f2
    const warnings: string[] = []
    if (p1 < 0) warnings.push(`The latest data point (${dateOfYear(pivot)}) is before accident year ${Y}'s average date: the past trend runs backwards.`)
    if (p2 < 0) warnings.push(`The future average date (${dateOfYear(to)}) is before the latest data point: the future trend runs backwards.`)
    return {
      tiles: [
        { symbol: 'TF', label: 'Total trend factor', value: factor, unit: 'factor' },
        { symbol: 'TF₁', label: `Past, ${formatValue(p1, 'years')} yrs`, value: f1, unit: 'factor' },
        { symbol: 'TF₂', label: `Future, ${formatValue(p2, 'years')} yrs`, value: f2, unit: 'factor' },
      ],
      trace: [
        { label: `Average accident date, accident year ${Y}`, formula: `${dateOfYear(from)}: mid-year`, result: from, unit: 'years' },
        { label: 'Past trend period', formula: `${dateOfYear(from)} to the latest data point, ${dateOfYear(pivot)}`, result: p1, unit: 'years' },
        { label: 'Past trend factor', formula: `(1 + ${t1})^${formatValue(p1, 'years')}`, result: f1, unit: 'factor' },
        { label: 'Future trend period', formula: `${dateOfYear(pivot)} to ${dateOfYear(to)}`, result: p2, unit: 'years' },
        { label: 'Future trend factor', formula: `(1 + ${t2})^${formatValue(p2, 'years')}`, result: f2, unit: 'factor' },
        { label: 'Total trend factor', formula: `${formatValue(f1, 'factor')} × ${formatValue(f2, 'factor')}`, result: factor, unit: 'factor' },
      ],
      warnings,
      values: { factor, past_factor: f1, future_factor: f2, past_period: p1, future_period: p2, from: dateOfYear(from), pivot: dateOfYear(pivot), to: dateOfYear(to) },
      summary: `Two-step trend factor ${formatValue(factor, 'factor')}: ${formatValue(f1, 'factor')} over ${formatValue(p1, 'years')} years at ${formatValue(t1, 'percent')}, then ${formatValue(f2, 'factor')} over ${formatValue(p2, 'years')} years at ${formatValue(t2, 'percent')}.`,
    }
  },
  compare: [
    { key: 'past_period', label: 'Past years', unit: 'years' },
    { key: 'past_factor', label: 'Past factor', unit: 'factor' },
    { key: 'future_period', label: 'Future years', unit: 'years' },
    { key: 'future_factor', label: 'Future factor', unit: 'factor' },
    { key: 'factor', label: 'Total factor', unit: 'factor' },
  ],
  method: {
    concepts: ['Loss Trend'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 6' }],
  },
}
