---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:27ef3b558dd26031188bf41917aff635ca03e8e43328a6782631407b2366c55c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IFRS 17.md
---

**IFRS 17 *Insurance Contracts*** is the accounting standard, effective in Canada from 1 January 2023, that governs how insurers measure and present insurance contracts. It replaced IFRS 4 — under which each country kept its legacy practice — with a single current-value measurement model, and it is the framework behind every number in a Canadian P&C insurer's modern financial statements.

> $$\text{Insurance Contract Liability} = \text{LRC} + \text{LIC}$$

- **The two liabilities.** The **[[Liability for Remaining Coverage]]** (LRC) covers future service under contracts already written; the **[[Liability for Incurred Claims]]** (LIC) covers claims that have already occurred. The old "unearned premium plus claims reserves" split maps onto this, but the measurement is different.
- **Three measurement models.** The **[[General Measurement Model]]** (GMM, or building block approach) is the default; the **[[Premium Allocation Approach]]** (PAA) is a permitted simplification for short-duration contracts, which is what most Canadian P&C business uses; and the variable fee approach applies to direct participating contracts, which P&C insurers do not write.
- **What changed for P&C insurers**, in the order of impact:
  - **Discounting is mandatory.** [[Liability for Incurred Claims|Claim liabilities]] are measured at present value using [[IFRS 17 Discount Rates|current rates]] — under the old Canadian regime discounting with a provision for adverse deviations was already practice, so the change here was less dramatic than for many jurisdictions.
  - **[[Risk Adjustment for Non-Financial Risk|Risk adjustment]] replaces margins for adverse deviations**, and its **confidence level must be disclosed** — an entity-specific measure of compensation for bearing uncertainty rather than a prescribed margin.
  - **[[Level of Aggregation|Groups of contracts]]** are defined by portfolio, annual cohort and profitability, and **[[Onerous Contract|onerous contracts]]** are recognised as a loss immediately.
  - **[[Reinsurance Contracts Held]] are measured separately** as assets, never netted against the underlying liabilities.
  - **[[Insurance Revenue]] replaces written and earned premium** on the face of the income statement, and deposit components are excluded.
- **Presentation changes too:** an [[Insurance Service Result]] separated from [[Insurance Finance Income or Expenses]], with an accounting policy choice to present some finance effects in [[Other Comprehensive Income Option|OCI]].
- The Canadian layer sits on top: the [[Canadian Institute of Actuaries (CIA)]] issued the [[Standards of Practice]] and educational notes that determine how IFRS 17 is applied in practice here, and [[OSFI]] rebuilt the [[MCT]] and the [[Canadian Annual Return]] around it.

> [!example]- Mapping the Old Balance Sheet to the New {Example}
> A P&C insurer's pre-transition balance sheet showed: unearned premium $\$120$ million, deferred acquisition costs $\$28$ million, unpaid claims (discounted, including PfADs) $\$340$ million, and reinsurance recoverable $\$60$ million netted within unpaid claims.
>
> Describe the IFRS 17 presentation.
>
> > [!answer]-
> > **Liability for remaining coverage.** Under the [[Premium Allocation Approach|PAA]], the LRC begins from unearned premium less any [[Insurance Acquisition Cash Flows|acquisition cash flows]] deferred against it:
> >
> > $$\$120\text{M} - \$28\text{M} = \$92\text{M}$$
> >
> > The DAC asset disappears as a separate line — it is now *inside* the LRC. If any group is [[Onerous Contract|onerous]], a [[Loss Component]] is added on top.
> >
> > **Liability for incurred claims.** The $\$340$ million is remeasured: present value of [[Fulfilment Cash Flows|fulfilment cash flows]] at [[IFRS 17 Discount Rates|current discount rates]], plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]] in place of the PfADs — a different quantity with a **disclosed confidence level**.
> >
> > **Reinsurance.** The $\$60$ million comes **out** of the liability and onto the asset side as a separate [[Reinsurance Contracts Held]] asset, with its own risk adjustment and its own [[Credit Risk Margin|non-performance risk]] allowance. Gross-up is mandatory; netting is not permitted.
> >
> > **Net effect on equity** depends on whether the risk adjustment is larger or smaller than the PfADs it replaced, and on the current discount rate versus the previous one — which is why transition disclosure exists and why two insurers with identical business could report different equity.
