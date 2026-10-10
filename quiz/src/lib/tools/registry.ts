import type { PracticeArea, ToolSpec } from './types'
import { interestConverter } from './finance/interestConverter'
import { annuity } from './finance/annuity'
import { presentValue } from './finance/presentValue'
import { internalRateOfReturn } from './finance/internalRateOfReturn'
import { loanSchedule } from './finance/loanSchedule'
import { bondPrice } from './finance/bondPrice'
import { bondYield } from './finance/bondYield'
import { bondAmortization } from './finance/bondAmortization'
import { durationConvexity } from './finance/durationConvexity'
import { redingtonImmunization } from './finance/redingtonImmunization'
import { ageToAgeFactors } from './reserving/ageToAge'
import { developmentToUltimate } from './reserving/developmentToUltimate'
import { chainLadder } from './reserving/chainLadder'
import { expectedClaims } from './reserving/expectedClaims'
import { bornhuetterFerguson } from './reserving/bornhuetterFerguson'
import { lossRatioMethod } from './ratemaking/lossRatioMethod'
import { fullCredibilityStandard } from './credibility/fullCredibility'
import { partialCredibility } from './credibility/partialCredibility'

/** Bumped whenever the engine's shared behaviour (input reading, the envelope) changes. */
export const ENGINE_VERSION = '0.1.0'

/** The practice areas in the order the catalogue lists them, with their names. */
export const AREAS: { id: PracticeArea; label: string }[] = [
  { id: 'reserving', label: 'Reserving' },
  { id: 'ratemaking', label: 'Ratemaking' },
  { id: 'distributions', label: 'Loss distributions' },
  { id: 'credibility', label: 'Credibility' },
  { id: 'finance', label: 'Financial mathematics' },
]

/** Every tool, in the order a chain runs within each area. */
export const TOOLS: ToolSpec[] = [
  ageToAgeFactors,
  developmentToUltimate,
  chainLadder,
  expectedClaims,
  bornhuetterFerguson,
  lossRatioMethod,
  fullCredibilityStandard,
  partialCredibility,
  interestConverter,
  annuity,
  presentValue,
  internalRateOfReturn,
  loanSchedule,
  bondPrice,
  bondYield,
  bondAmortization,
  durationConvexity,
  redingtonImmunization,
]

const BY_ID = new Map(TOOLS.map(t => [t.id, t]))

export function toolById(id: string): ToolSpec | undefined {
  return BY_ID.get(id)
}

/** The route segment for a tool: `reserving.chain_ladder` → `chain-ladder`. */
export function toolSlug(spec: ToolSpec): string {
  return spec.id.split('.')[1].replace(/_/g, '-')
}

export function toolBySlug(slug: string): ToolSpec | undefined {
  return TOOLS.find(t => toolSlug(t) === slug) ?? BY_ID.get(slug)
}
