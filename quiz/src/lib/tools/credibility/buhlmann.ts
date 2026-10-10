import { formatValue } from '../format'
import { ToolInputError, type ToolSpec } from '../types'

export const buhlmannCredibility: ToolSpec = {
  id: 'credibility.buhlmann_credibility',
  version: '1.0.0',
  name: 'Bühlmann Credibility',
  area: 'credibility',
  answers: "What's the credibility estimate from the structural parameters?",
  aka: ['Buhlmann', 'EPV', 'VHM', 'Z', 'k'],
  fields: [
    { kind: 'number', key: 'epv', label: 'Expected process variance', symbol: 'EPV', unit: 'plain', min: 0, max: 1e18, sliderMax: 1000, step: 1, default: 100, description: 'The expected value of the process variance, per unit of exposure: E[Var(X | Θ)].' },
    { kind: 'number', key: 'vhm', label: 'Variance of hypothetical means', symbol: 'VHM', unit: 'plain', min: 1e-18, max: 1e18, sliderMax: 100, step: 0.1, default: 10, description: 'The variance of the hypothetical means: Var(E[X | Θ]).' },
    { kind: 'number', key: 'exposure', label: 'Exposure', symbol: 'n', unit: 'count', min: 0, max: 1e12, sliderMax: 100, step: 1, default: 5, description: 'The risk\'s exposure in the experience: years for Bühlmann, the summed exposure units for Bühlmann-Straub.' },
    { kind: 'number', key: 'observed', label: 'Observed mean', symbol: 'X̄', unit: 'plain', min: -1e18, max: 1e18, sliderMax: 1000, step: 1, default: 60, description: 'The risk\'s own mean per unit of exposure.' },
    { kind: 'number', key: 'prior', label: 'Overall mean', symbol: 'μ', unit: 'plain', min: -1e18, max: 1e18, sliderMax: 1000, step: 1, default: 50, description: 'The complement: the mean over all risks, E[X].' },
  ],
  notation: () => 'k = EPV / VHM,  Z = n / (n + k),  P = Z·X̄ + (1 − Z)·μ',
  view: 'none',
  compute: input => {
    const epv = Number(input.epv)
    const vhm = Number(input.vhm)
    const n = Number(input.exposure)
    const xbar = Number(input.observed)
    const mu = Number(input.prior)
    if (!(vhm > 0)) throw new ToolInputError('vhm', 'The VHM must be positive: with no difference between risks, Z is 0.')
    const k = epv / vhm
    const Z = n / (n + k)
    const estimate = Z * xbar + (1 - Z) * mu
    return {
      tiles: [
        { symbol: 'P', label: 'Credibility estimate', value: estimate, unit: 'plain' },
        { symbol: 'Z', label: 'Credibility', value: Z, unit: 'percent' },
        { symbol: 'k', label: 'EPV / VHM', value: k, unit: 'plain' },
      ],
      trace: [
        { label: 'Bühlmann k', formula: `${epv} / ${vhm}`, result: k, unit: 'plain' },
        { label: 'Credibility', formula: `${n} / (${n} + ${formatValue(k, 'plain')})`, result: Z, unit: 'percent' },
        { label: 'Credibility estimate', formula: `${formatValue(Z, 'plain')} × ${xbar} + (1 − Z) × ${mu}`, result: estimate, unit: 'plain' },
      ],
      warnings: [],
      values: { k, z: Z, estimate },
      summary: `Z = ${formatValue(Z, 'percent')} (k = ${formatValue(k, 'plain')}); credibility estimate ${formatValue(estimate, 'plain')} per unit of exposure.`,
    }
  },
  method: { concepts: ['Bühlmann Credibility', 'Bühlmann-Straub Credibility'], readings: [] },
}
