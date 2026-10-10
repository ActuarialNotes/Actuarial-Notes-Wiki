import { formatValue } from '../format'
import type { ToolSpec } from '../types'
import { FAMILY, PARAMETERS, lossModel } from './lossModels'

export const limitedExpectedValue: ToolSpec = {
  id: 'distributions.limited_expected_value',
  version: '1.0.0',
  name: 'Limited Expected Value',
  area: 'distributions',
  answers: "What's the expected loss, capped at u?",
  aka: ['LEV', 'limited expected value', 'LER', 'loss elimination ratio'],
  fields: [
    FAMILY,
    ...PARAMETERS,
    { kind: 'number', key: 'u', label: 'Limit', symbol: 'u', unit: 'money', min: 0, max: 1e12, sliderMax: 10000, step: 10, default: 2000, description: 'The cap: the policy limit, or a deductible whose eliminated losses are E[X ∧ u].' },
  ],
  notation: input => `E[X ∧ u] = ∫₀ᵘ S(x) dx,  X ~ ${lossModel(input).notation}`,
  view: 'none',
  compute: input => {
    const model = lossModel(input)
    const u = Number(input.u)
    const lev = model.lev(u)
    const ler = Number.isFinite(model.mean) ? lev / model.mean : 0
    const warnings = Number.isFinite(model.mean) ? [] : ['The mean is infinite (α ≤ 1), so the loss elimination ratio is 0: no cap removes a finite share of an infinite mean.']
    return {
      tiles: [
        { symbol: 'E[X∧u]', label: 'Limited', value: lev, unit: 'money' },
        { symbol: 'E[X]', label: 'Unlimited', value: model.mean, unit: 'money' },
        { symbol: 'LER', label: 'Share kept under u', value: ler, unit: 'percent' },
      ],
      trace: [
        { label: 'Probability the loss exceeds u', formula: `S(${u})`, result: model.survival(u), unit: 'percent' },
        { label: 'Limited expected value', formula: `E[X ∧ ${u}], in closed form for the ${model.label.toLowerCase()}`, result: lev, unit: 'money' },
        { label: 'Mean', formula: 'E[X]', result: model.mean, unit: 'money' },
        { label: 'Loss elimination ratio', formula: 'E[X ∧ u] / E[X]', result: ler, unit: 'percent' },
      ],
      warnings,
      values: { lev, mean: model.mean, ler, survival: model.survival(u) },
      summary: `E[X ∧ ${formatValue(u, 'money')}] = ${formatValue(lev, 'money')} for X ~ ${model.notation}; E[X] = ${formatValue(model.mean, 'money')}.`,
    }
  },
  method: { concepts: ['Limited Expected Value', 'Loss Elimination Ratio'], readings: [] },
  next: [
    { tool: 'distributions.expected_payment', label: 'Expected Payment', build: input => ({ family: input.family, theta: input.theta, alpha: input.alpha, tau: input.tau, mu: input.mu, sigma: input.sigma, a: input.a, b: input.b, limit: input.u }) },
  ],
}
