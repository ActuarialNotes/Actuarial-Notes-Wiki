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
import { benktander } from './reserving/benktander'
import { capeCod } from './reserving/capeCod'
import { ratioTriangle } from './reserving/ratioTriangle'
import { lossRatioMethod } from './ratemaking/lossRatioMethod'
import { earnedPremium } from './ratemaking/earnedPremium'
import { onLevelFactors } from './ratemaking/onLevelFactors'
import { trendFit } from './ratemaking/trendFit'
import { trendFactor } from './ratemaking/trendFactor'
import { expenseRatios } from './ratemaking/expenseRatios'
import { permissibleLossRatio } from './ratemaking/permissibleLossRatio'
import { purePremiumMethod } from './ratemaking/purePremiumMethod'
import { fullCredibilityStandard } from './credibility/fullCredibility'
import { partialCredibility } from './credibility/partialCredibility'
import { buhlmannCredibility } from './credibility/buhlmann'
import { distribution } from './distributions/distribution'
import { limitedExpectedValue } from './distributions/limitedExpectedValue'
import { expectedPayment } from './distributions/expectedPayment'
import { lifeTable } from './data/lifeTable'
import { priceIndex } from './data/priceIndex'
import { yieldCurve } from './data/yieldCurve'

/** Bumped whenever the engine's shared behaviour (input reading, the envelope) changes. */
export const ENGINE_VERSION = '0.1.0'

/** The practice areas in the order the catalogue lists them, with their names. */
export const AREAS: { id: PracticeArea; label: string }[] = [
  // First: a chain starts from its data (docs/actuarial-tools.md §4.11).
  { id: 'data', label: 'Data Sources' },
  { id: 'reserving', label: 'Reserving' },
  { id: 'ratemaking', label: 'Ratemaking' },
  { id: 'distributions', label: 'Loss distributions' },
  { id: 'credibility', label: 'Credibility' },
  { id: 'finance', label: 'Financial mathematics' },
]

/** Every tool, in the order a chain runs within each area. */
export const TOOLS: ToolSpec[] = [
  lifeTable,
  priceIndex,
  yieldCurve,
  ratioTriangle,
  ageToAgeFactors,
  developmentToUltimate,
  chainLadder,
  expectedClaims,
  bornhuetterFerguson,
  benktander,
  capeCod,
  earnedPremium,
  onLevelFactors,
  trendFit,
  trendFactor,
  expenseRatios,
  permissibleLossRatio,
  lossRatioMethod,
  purePremiumMethod,
  distribution,
  limitedExpectedValue,
  expectedPayment,
  fullCredibilityStandard,
  partialCredibility,
  buhlmannCredibility,
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

/**
 * What a tool is found by, most identifying first: its name, the short names it
 * goes by, the question it answers, its method's concept pages and its practice
 * area. The Tools page's search (`lib/toolSearch.ts`) ranks on these in this
 * order, and the connector's `list_tools` matches its query against the same
 * words, so a person and an agent find a tool by the same words
 * (docs/actuarial-tools.md §6.2).
 */
export function toolSearchText(spec: ToolSpec): string[] {
  const area = AREAS.find(a => a.id === spec.area)?.label ?? spec.area
  return [spec.name, ...(spec.aka ?? []), spec.answers, ...spec.method.concepts, area]
}
