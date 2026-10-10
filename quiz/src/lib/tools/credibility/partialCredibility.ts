import type { ToolSpec } from '../types'

export const partialCredibility: ToolSpec = {
  id: 'credibility.partial_credibility',
  version: '1.0.0',
  name: 'Partial Credibility',
  area: 'credibility',
  answers: 'How much credibility does this experience get?',
  fields: [
    { kind: 'number', key: 'claims', label: 'Observed claims', symbol: 'n', unit: 'count', min: 0, max: 1e9, sliderMax: 2000, step: 1, default: 300, description: 'The number of claims in the experience.' },
    { kind: 'number', key: 'standard', label: 'Full standard', symbol: 'N', unit: 'count', judgment: true, min: 1, max: 1e9, sliderMax: 5000, step: 1, default: 1082, description: 'The number of claims for full credibility.' },
  ],
  notation: () => 'Z = min(1, √(n / N))',
  view: 'none',
  compute: input => {
    const n = Number(input.claims)
    const nf = Number(input.standard)
    const raw = Math.sqrt(n / nf)
    const Z = Math.min(1, raw)
    return {
      tiles: [{ symbol: 'Z', label: 'Credibility', value: Z, unit: 'percent' }],
      trace: [
        { label: 'Square-root rule', formula: `√(${n} / ${nf})`, result: raw, unit: 'percent' },
        ...(raw > 1 ? [{ label: 'Capped at full credibility', formula: 'min(1, …)', result: 1, unit: 'percent' as const }] : []),
      ],
      warnings: [],
      values: { z: Z },
    }
  },
  method: {
    concepts: ['Partial Credibility', 'Limited Fluctuation Credibility'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 12' }],
  },
}
