import type { ToolSpec } from '../types'
import { inverseNormalCdf } from '../numeric'

const BASES = [
  { value: 'frequency', label: 'Frequency' },
  { value: 'severity', label: 'Severity' },
  { value: 'pure_premium', label: 'Pure premium' },
]

export const fullCredibilityStandard: ToolSpec = {
  id: 'credibility.full_credibility_standard',
  version: '1.0.0',
  name: 'Full Credibility Standard',
  area: 'credibility',
  answers: 'How many expected claims make full credibility?',
  fields: [
    { kind: 'choice', key: 'basis', label: 'Estimating', description: 'What is being estimated. Frequency assumes Poisson claim counts.', options: BASES, default: 'frequency' },
    { kind: 'number', key: 'p', label: 'Probability', symbol: 'p', unit: 'percent', judgment: true, min: 0.5, max: 0.9999, step: 0.005, default: 0.9, description: 'The probability of being within k of the true value, as a decimal.' },
    { kind: 'number', key: 'k', label: 'Range', symbol: 'k', unit: 'percent', judgment: true, min: 0.001, max: 0.5, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'How close, as a share of the true value (0.05 for ±5%).' },
    {
      kind: 'number', key: 'cv', label: 'Severity CV', symbol: 'CV', unit: 'plain', min: 0, max: 20, sliderMax: 5, step: 0.05, default: 1,
      description: 'The coefficient of variation of claim severity (σ/μ). Used for severity and pure premium only.',
      showWhen: { field: 'basis', in: ['severity', 'pure_premium'] },
    },
  ],
  notation: input =>
    input.basis === 'severity' ? 'N = (z/k)² · CV²'
      : input.basis === 'pure_premium' ? 'N = (z/k)² · (1 + CV²)'
        : 'N = (z/k)²',
  view: 'none',
  compute: input => {
    const p = Number(input.p)
    const k = Number(input.k)
    const cv = Number(input.cv)
    const z = inverseNormalCdf((1 + p) / 2)
    const n0 = (z / k) ** 2
    const multiplier = input.basis === 'severity' ? cv ** 2 : input.basis === 'pure_premium' ? 1 + cv ** 2 : 1
    const standard = n0 * multiplier
    return {
      tiles: [
        { symbol: 'N', label: 'Claims', value: standard, unit: 'count' },
        { symbol: 'z', label: 'Quantile', value: z, unit: 'plain' },
      ],
      trace: [
        { label: 'Standard normal quantile', formula: `z = Φ⁻¹((1 + ${p})/2)`, result: z, unit: 'plain' },
        { label: 'Frequency standard', formula: `n₀ = (${z.toFixed(4)} / ${k})²`, result: n0, unit: 'count' },
        ...(multiplier !== 1 ? [{ label: 'Full standard', formula: input.basis === 'severity' ? `n₀ × ${cv}²` : `n₀ × (1 + ${cv}²)`, result: standard, unit: 'count' as const }] : []),
      ],
      warnings: [],
      values: { standard, z, n0 },
      summary: `Full credibility needs ${Math.round(standard * 100) / 100} expected claims (z = ${z.toFixed(4)}).`,
    }
  },
  method: {
    concepts: ['Full Credibility Standard', 'Limited Fluctuation Credibility'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 12' }],
  },
  next: [
    {
      tool: 'credibility.partial_credibility',
      label: 'Partial Credibility',
      build: (_input, output) => ({ standard: Math.round(Number(output.values.standard) * 100) / 100 }),
    },
  ],
}
