import { formatValue } from '../format'
import { ToolInputError, type ToolSpec } from '../types'

export const purePremiumMethod: ToolSpec = {
  id: 'ratemaking.pure_premium_method',
  version: '1.0.0',
  name: 'Pure Premium Method',
  area: 'ratemaking',
  answers: "What's the indicated average rate?",
  fields: [
    { kind: 'number', key: 'pure_premium', label: 'Pure premium', symbol: 'PP', unit: 'money', min: 0, max: 1e12, sliderMax: 2000, step: 1, default: 300, description: 'Projected ultimate loss and LAE per exposure (any per-exposure cost, such as net reinsurance, added in).' },
    { kind: 'number', key: 'fixed', label: 'Fixed expense per exposure', symbol: 'F', unit: 'money', min: 0, max: 1e12, sliderMax: 500, step: 1, default: 50, description: 'Projected fixed expenses per exposure.' },
    { kind: 'number', key: 'variable', label: 'Variable expense ratio', symbol: 'V', unit: 'percent', min: 0, max: 1, sliderMax: 0.5, step: 0.0025, default: 0.2, description: 'Variable expenses as a share of premium.' },
    { kind: 'number', key: 'profit', label: 'Profit & contingency', symbol: 'Q', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The target underwriting profit and contingency provision, as a share of premium.' },
    { kind: 'number', key: 'current', label: 'Current average rate', symbol: 'R₀', unit: 'money', min: 0, max: 1e12, sliderMax: 2000, step: 1, default: 0, zeroLabel: 'Not given', description: 'The current average rate per exposure, for the indicated change (0 to leave it out).' },
  ],
  notation: () => 'R = (PP + F) / (1 − V − Q)',
  view: 'none',
  compute: input => {
    const PP = Number(input.pure_premium)
    const F = Number(input.fixed)
    const V = Number(input.variable)
    const Q = Number(input.profit)
    const current = Number(input.current)
    const plr = 1 - V - Q
    if (plr <= 0) throw new ToolInputError('variable', 'V + Q must be below 100%: nothing would be left for losses and fixed expenses.')
    const rate = (PP + F) / plr
    const change = current > 0 ? rate / current - 1 : null
    return {
      tiles: [
        { symbol: 'R', label: 'Indicated rate', value: rate, unit: 'money' },
        { symbol: 'PLR', label: '1 − V − Q', value: plr, unit: 'percent' },
        ...(change === null ? [] : [{ symbol: 'ΔR', label: 'Indicated change', value: change, unit: 'percent' as const }]),
      ],
      trace: [
        { label: 'Variable permissible loss ratio', formula: `1 − ${V} − ${Q}`, result: plr, unit: 'percent' },
        { label: 'Indicated average rate', formula: `(${PP} + ${F}) / ${plr.toFixed(4)}`, result: rate, unit: 'money' },
        ...(change === null ? [] : [{ label: 'Indicated change', formula: `${formatValue(rate, 'money')} / ${current} − 1`, result: change, unit: 'percent' as const }]),
      ],
      warnings: [],
      values: { indicated_rate: rate, variable_permissible_loss_ratio: plr, indicated_change: change },
    }
  },
  method: {
    concepts: ['Pure Premium Method', 'Overall Rate Level Indication'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 8' }],
  },
}
