import { formatValue } from '../format'
import type { ToolSpec } from '../types'

/** A gap between the combined and the direct trend wider than this is said. */
const WIDE = 0.01

export const combinedTrend: ToolSpec = {
  id: 'ratemaking.combined_trend',
  version: '1.0.0',
  name: 'Frequency × Severity Trend',
  area: 'ratemaking',
  answers: 'What pure premium trend do these frequency and severity trends make?',
  aka: ['pure premium trend', 'loss cost trend', 'frequency severity trend', 'combined trend'],
  fields: [
    { kind: 'number', key: 'frequency', label: 'Frequency trend', symbol: 't_f', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMin: -0.1, sliderMax: 0.1, step: 0.0025, default: 0, description: 'The selected annual frequency trend, as a decimal (from Trend Fit).' },
    { kind: 'number', key: 'severity', label: 'Severity trend', symbol: 't_s', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.15, step: 0.0025, default: 0.05, description: 'The selected annual severity trend, as a decimal (from Trend Fit).' },
    {
      kind: 'choice', key: 'compare', label: 'Compare with', description: 'Whether to set the combined trend beside a pure premium (loss cost) trend fitted directly.',
      options: [{ value: 'none', label: 'Nothing' }, { value: 'direct', label: 'A direct fit' }], default: 'none',
    },
    { kind: 'number', key: 'direct', label: 'Direct pure premium trend', symbol: 't_pp', unit: 'percent', min: -0.5, max: 1, sliderMax: 0.15, step: 0.0025, default: 0.05, showWhen: { field: 'compare', in: ['direct'] }, description: 'The annual trend of a fit to the pure premiums (loss costs) themselves, as a decimal (from Trend Fit). Read only when compare is "direct".' },
  ],
  notation: () => '1 + t_pp = (1 + t_f)(1 + t_s)',
  view: 'none',
  compute: input => {
    const f = Number(input.frequency)
    const s = Number(input.severity)
    const combined = (1 + f) * (1 + s) - 1
    const comparing = input.compare === 'direct'
    const direct = Number(input.direct)
    const gap = comparing ? combined - direct : null
    const warnings: string[] = []
    if (gap !== null && Math.abs(gap) > WIDE) {
      warnings.push(`The combined trend is ${formatValue(Math.abs(gap) * 100, 'plain')} points ${gap > 0 ? 'above' : 'below'} the direct fit. On the same points, window and marks the two agree; a gap this wide usually means the fits differ in window, exclusions or weighting, or that the pure premiums aren't the frequencies times the severities.`)
    }
    return {
      tiles: [
        { symbol: 't_pp', label: 'Combined trend', value: combined, unit: 'percent' },
        ...(comparing ? [
          { symbol: 't_pp', label: 'Direct fit', value: direct, unit: 'percent' as const },
          { symbol: 'Δ', label: 'Combined − direct', value: gap!, unit: 'percent' as const },
        ] : []),
      ],
      trace: [
        { label: 'Frequency factor', formula: `1 + ${f}`, result: 1 + f, unit: 'factor' },
        { label: 'Severity factor', formula: `1 + ${s}`, result: 1 + s, unit: 'factor' },
        { label: 'Combined trend', formula: `(1 + ${f})(1 + ${s}) − 1`, result: combined, unit: 'percent' },
        ...(comparing ? [{ label: 'Combined less direct', formula: `${formatValue(combined, 'percent')} − ${formatValue(direct, 'percent')}`, result: gap!, unit: 'percent' as const }] : []),
      ],
      warnings,
      values: { trend: combined, frequency: f, severity: s, direct: comparing ? direct : null, difference: gap },
      summary: `(1 + ${formatValue(f, 'percent')})(1 + ${formatValue(s, 'percent')}) − 1 = ${formatValue(combined, 'percent')}${comparing ? `, ${formatValue(Math.abs(gap!) * 100, 'plain')} points ${gap! >= 0 ? 'above' : 'below'} the direct fit's ${formatValue(direct, 'percent')}` : ''}.`,
    }
  },
  compare: [
    { key: 'frequency', label: 'Frequency', unit: 'percent' },
    { key: 'severity', label: 'Severity', unit: 'percent' },
    { key: 'trend', label: 'Combined', unit: 'percent' },
    { key: 'direct', label: 'Direct', unit: 'percent' },
    { key: 'difference', label: 'Combined − direct', unit: 'percent' },
  ],
  method: {
    concepts: ['Loss Trend'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 6' }],
  },
  next: [
    { tool: 'ratemaking.trend_factor', label: 'Trend Factor', build: (_input, output) => ({ trend: output.values.trend as number }) },
  ],
}
