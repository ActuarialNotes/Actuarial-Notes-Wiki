---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fcd97dd5197bd5a2f875e00f0b06e13b14db41a5a2993f80e3c9ddcf28a60b43
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IFRS 17.md
---

![[Media/Figures/IFRS_17.svg|340]]

**IFRS 17 *Insurance Contracts*** is the accounting standard, effective in Canada from 1 January 2023, that governs how insurers measure and present insurance contracts. It replaced IFRS 4, under which each country kept its legacy practice, with a single current-value measurement model.

The insurance contract liability splits into the liability for future service and the liability for claims already occurred, so it is

> $$\text{Insurance Contract Liability} = \text{LRC} + \text{LIC}$$

- $\text{LRC}$ is the [[Liability for Remaining Coverage]], for future service under contracts already written.
- $\text{LIC}$ is the [[Liability for Incurred Claims]], for claims that have already occurred.

The old "unearned premium plus claims reserves" split maps onto this, but the measurement is different.

> [!example]- How does this P&C insurer's pre-transition balance sheet present under IFRS 17? {Example}
> The insurer's pre-transition balance sheet showed:
>
> | Item | Amount |
> | :--- | ---: |
> | Unearned premium | $\$120$ million |
> | Deferred acquisition costs | $\$28$ million |
> | Unpaid claims (discounted, including PfADs) | $\$340$ million |
> | Reinsurance recoverable, netted within unpaid claims | $\$60$ million |
>
> > [!answer]-
> > - Under the [[Premium Allocation Approach|PAA]], the LRC begins from unearned premium less the [[Insurance Acquisition Cash Flows|acquisition cash flows]] deferred against it, $\$120\text{M} - \$28\text{M} = \$92\text{M}$.
> > - The DAC asset disappears as a separate line, because it is now inside the LRC. If any group is [[Onerous Contract|onerous]], a [[Loss Component|loss component]] is added on top.
> > - The $\$340$ million of unpaid claims is remeasured as the LIC: the present value of [[Fulfilment Cash Flows|fulfilment cash flows]] at current discount rates, plus a risk adjustment in place of the PfADs.
> > - The $\$60$ million of reinsurance comes out of the liability and onto the asset side as a separate reinsurance contracts held asset, with its own risk adjustment and its own [[Credit Risk Margin|non-performance risk]] allowance.
> > - The effect on equity depends on whether the risk adjustment is larger or smaller than the PfADs it replaced, and on the current discount rate against the previous one. Two insurers with identical business could therefore report different equity.

## Measurement models

IFRS 17 has three measurement models:

- **[[General Measurement Model]]** (GMM, or building block approach) is the default.
- **[[Premium Allocation Approach]]** (PAA) is a permitted simplification for short-duration contracts, and is what most Canadian P&C business uses.
- **Variable fee approach** applies to direct participating contracts, which P&C insurers do not write.

## Changes for property and casualty insurers

The changes for a P&C insurer, in order of impact, are:

1. Discounting is mandatory. Claim liabilities are measured at present value using [[IFRS 17 Discount Rates|current rates]]. The old Canadian regime already discounted with a provision for adverse deviations, so the change here was less dramatic than in many jurisdictions.
2. A [[Risk Adjustment for Non-Financial Risk|risk adjustment]] replaces margins for adverse deviations. It is an entity-specific measure of compensation for bearing uncertainty rather than a prescribed margin, and its confidence level must be disclosed.
3. [[Level of Aggregation|Groups of contracts]] are defined by portfolio, annual cohort and profitability, and [[Onerous Contract|onerous contracts]] are recognised as a loss immediately.
4. [[Reinsurance Contracts Held]] are measured separately as assets, never netted against the underlying liabilities.
5. [[Insurance Revenue]] replaces written and earned premium on the face of the income statement, and deposit components are excluded.

## Presentation

The income statement separates an [[Insurance Service Result]] from [[Insurance Finance Income or Expenses]], with an accounting policy choice to present some finance effects in [[Other Comprehensive Income Option|OCI]].

## Application in Canada

The [[Canadian Institute of Actuaries (CIA)]] issued the [[Standards of Practice]] and educational notes that determine how IFRS 17 is applied in Canada, and [[OSFI]] rebuilt the [[MCT]] and the [[Canadian Annual Return]] around it.

> [!trap] Netting reinsurance against the claim liabilities
> Under IFRS 17 reinsurance contracts held are a separate asset with their own risk adjustment. Gross-up is mandatory, so a reinsurance recoverable netted within unpaid claims must come out of the liability.
