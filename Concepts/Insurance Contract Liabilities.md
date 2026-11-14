---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f282883d1dd8f882d0675093be0c4782e8b453ef18d52e9d9fc2dde7aace369f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Contract Liabilities.md
---

![[Media/Figures/Insurance_Contract_Liabilities.svg|340]]

**Insurance Contract Liabilities** are the obligations an insurer carries under the insurance contracts it has issued. Under [[IFRS 17]] the insurance contract liability is

> $$\text{Insurance Contract Liability} = \text{LRC} + \text{LIC}$$

- $\text{LRC}$ is the [[Liability for Remaining Coverage|liability for remaining coverage]], for future service not yet provided.
- $\text{LIC}$ is the [[Liability for Incurred Claims|liability for incurred claims]], for claims that have already occurred, whether reported or not.

The two are measured on different bases. The LRC is premium-driven and is released as coverage is provided. The LIC is claim-driven and is released as claims are paid.

The valuation must be in accordance with [[Accepted Actuarial Practice|accepted actuarial practice]], the requirement in s. 365 of the [[Insurance Companies Act]]. For a Canadian insurer this means the [[Standards of Practice]] and the CIA's educational notes on applying IFRS 17. The [[Appointed Actuary]] opines on these liabilities in the [[Statement of Actuarial Opinion]], and they flow directly into [[Capital Available|capital available]] and hence the [[MCT]] ratio.

## The liability for incurred claims

The LIC covers case reserves, IBNR and the associated adjustment expenses. It is

> $$\text{LIC} = \text{PV of fulfilment cash flows} + \text{RA}$$

- $\text{PV of fulfilment cash flows}$ is the present value of the [[Fulfilment Cash Flows|fulfilment cash flows]] for incurred claims.
- $\text{RA}$ is the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].

## The liability for remaining coverage under the PAA

Under the [[Premium Allocation Approach|premium allocation approach]] (PAA), the LRC is

> $$\text{LRC} = \text{Unearned premium} - \text{Acquisition cash flows} + \text{Loss component}$$

- $\text{Acquisition cash flows}$ are the unamortised [[Insurance Acquisition Cash Flows|insurance acquisition cash flows]] deferred in the LRC.
- $\text{Loss component}$ is the [[Loss Component|loss component]], present only where the group is [[Onerous Contract|onerous]].

> [!example]- What are this PAA insurer's insurance contract liabilities at December 31? {Example}
> At December 31 a PAA insurer has:
>
> | Item | Amount ($M) |
> | :--- | ---: |
> | Unearned premium | 46 |
> | Unamortised acquisition cash flows | 11 |
> | Undiscounted case reserves and IBNR | 208 |
> | Effect of discounting | −14 |
> | Risk adjustment | 17 |
>
> No group is onerous.
>
> > [!answer]-
> > - The LRC is $\$46\text{M} - \$11\text{M} = \$35\text{M}$, with no loss component because no group is onerous.
> > - The LIC is $\$208\text{M} - \$14\text{M} + \$17\text{M} = \$211\text{M}$.
> > - The insurance contract liabilities are $\$35\text{M} + \$211\text{M} = \$246\text{M}$.

## Reinsurance contracts held

Reinsurance is not netted. [[Reinsurance Contracts Held|Reinsurance contracts held]] are a separate asset with their own measurement, so the balance sheet shows gross liabilities and a reinsurance asset rather than a net figure. This makes both sides larger than in the old presentation, and it makes the reinsurance counterparty exposure visible.

The risk adjustment on reinsurance held adds to the asset. It represents the risk the reinsurer relieves the cedant of, so it increases the value of the reinsurance held. The asset is reduced separately for the reinsurer's non-performance risk, which is a credit adjustment rather than a risk adjustment.

> [!example]- With $\$35$ million recoverable on unpaid claims and a $\$3$ million risk adjustment on reinsurance held, what is the reinsurance asset? {Example}
> - The recoverable is not netted against the LIC, so the insurance contract liabilities stay at $\$246\text{M}$.
> - The risk adjustment on reinsurance held adds to the asset.
> - The reinsurance contracts held asset is $\$35\text{M} + \$3\text{M} = \$38\text{M}$.

> [!trap] Subtracting the risk adjustment on reinsurance held
> The risk adjustment on the gross liability adds to the liability, and the risk adjustment on reinsurance held adds to the asset. Subtracting the $\$3$ million above would give an asset of $\$32$ million instead of $\$38$ million.
