// The **chains** the tools run in (docs/tool-template-v3.md §4): the order a
// piece of work goes through them, as steps, a step holding the tools that are
// alternatives at that point (four methods for the reserving ultimate). A tool
// page in a chain draws it as a strip above its answer card, so a reader sees
// where the tool sits and can step back along it. Pure and tested.

export interface Chain {
  id: string
  label: string
  /** Each step's tools, alternatives side by side. */
  steps: string[][]
}

export const CHAINS: readonly Chain[] = [
  {
    id: 'reserving',
    label: 'Reserving chain',
    steps: [
      ['reserving.ratio_triangle'],
      ['reserving.age_to_age_factors'],
      ['reserving.development_to_ultimate'],
      ['reserving.chain_ladder', 'reserving.expected_claims', 'reserving.bornhuetter_ferguson', 'reserving.benktander', 'reserving.cape_cod'],
    ],
  },
  {
    // A rate indication in Werner & Modlin's order: premium at current rates,
    // losses trended to the future period, expenses, then the indication.
    id: 'ratemaking',
    label: 'Ratemaking chain',
    steps: [
      ['ratemaking.earned_premium'],
      ['ratemaking.on_level_factors'],
      ['ratemaking.trend_fit', 'ratemaking.combined_trend'],
      ['ratemaking.trend_factor', 'ratemaking.two_step_trend'],
      ['ratemaking.expense_ratios'],
      ['ratemaking.permissible_loss_ratio'],
      ['ratemaking.loss_ratio_method', 'ratemaking.pure_premium_method'],
    ],
  },
  {
    // A rate in the form the payments need, what the payments are worth, and the yield back.
    id: 'interest',
    label: 'Interest chain',
    steps: [
      ['finance.interest_converter'],
      ['finance.annuity', 'finance.present_value', 'finance.loan_schedule'],
      ['finance.internal_rate_of_return'],
    ],
  },
  {
    id: 'bonds',
    label: 'Bond chain',
    steps: [
      ['finance.bond_price', 'finance.bond_yield'],
      ['finance.bond_amortization', 'finance.duration_convexity'],
      ['finance.redington_immunization'],
    ],
  },
]

export interface ChainPlace {
  chain: Chain
  /** The steps before this tool's, one tool each where the step has one. */
  before: string[][]
  /** This tool, then the others it is an alternative to. */
  here: string
  alternatives: string[]
}

/** Where a tool sits in its chain, or null for a tool in none. */
export function chainPlace(toolId: string): ChainPlace | null {
  for (const chain of CHAINS) {
    const k = chain.steps.findIndex(step => step.includes(toolId))
    if (k < 0) continue
    return {
      chain,
      before: chain.steps.slice(0, k),
      here: toolId,
      alternatives: chain.steps[k].filter(id => id !== toolId),
    }
  }
  return null
}
