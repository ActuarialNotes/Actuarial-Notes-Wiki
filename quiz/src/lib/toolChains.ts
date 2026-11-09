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
