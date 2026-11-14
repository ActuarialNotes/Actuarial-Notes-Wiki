---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9636e6d4ff634c9366b7c972c7049539fd8bd9589bda992f9623fd45d9bdcd53
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Flood Insurance.md
---

![[Media/Figures/Flood_Insurance.svg|340]]

**Flood Insurance** covers damage from overland water (river, coastal and surface flooding), as distinct from sewer backup or water escaping from plumbing. Until roughly 2015 residential overland flood was uninsurable in Canada. It was excluded from every homeowner policy, and losses were met by ad hoc government payments under [[Disaster Financial Assistance Arrangements|DFAA]].

## Why flood was uninsurable

Flood violated the conditions for private insurability in three ways:

1. Losses are spatially correlated: one event hits every property in the floodplain at once.
2. Severe [[Adverse Selection|adverse selection]] means only floodplain residents would buy.
3. The risk could not be mapped at the property level without modern elevation and hydrological data.

High-resolution flood mapping and catastrophe modelling made property-level pricing possible, the 2013 Alberta and Toronto floods made the coverage gap politically visible, and reinsurers made capacity available. Insurers now offer overland flood as an endorsement, usually with a sub-limit, a separate deductible and eligibility screening.

## Pricing flood risk

Flood loss distributions are extremely heavy-tailed and correlated, so pricing depends on catastrophe models rather than experience. The [[Probable Maximum Loss|PML]] drives reinsurance and capital, and [[OSFI]] treats flood accumulation as a [[Concentration Risk|concentration]] and [[Climate Risk|climate]] issue.

Climate change is shifting the hazard itself, so the historical record understates the future. This non-stationarity makes conventional return-period language unreliable.

> [!example]- What happens if this community's flood coverage is offered at one average premium? {Example}
> A community of $10{,}000$ homes has three zones:
>
> | Zone | Homes | Annual flood probability | Average loss |
> | :--- | ---: | ---: | ---: |
> | 1 | 500 | 10% | $\$80{,}000$ |
> | 2 | 1,500 | 1% | $\$60{,}000$ |
> | 3 | 8,000 | 0.05% | $\$40{,}000$ |
>
> > [!answer]-
> > - The risk-based pure premiums are $0.10 \times 80{,}000 = \$8{,}000$, $0.01 \times 60{,}000 = \$600$ and $0.0005 \times 40{,}000 = \$20$.
> > - Weighted by homes, the total is $4{,}000{,}000 + 900{,}000 + 160{,}000 = \$5{,}060{,}000$, an average of $\$506$.
> > - At $\$506$, zone 3 homeowners pay 25 times their expected loss and do not buy, and zone 2 homeowners are near break-even and mostly do not buy.
> > - Zone 1 homeowners pay one sixteenth of their expected loss and all buy, so the pool needs $\$8{,}000$ a policy against $\$506$ collected. This is [[Adverse Selection|adverse selection]] in a single step.
> > - Priced to the zone, zones 2 and 3 are insurable privately. At $\$8{,}000$ nobody in zone 1 buys, and below it no insurer writes.

## The residual gap

The highest-risk properties, those in frequent-flood zones, remain effectively uninsurable at any premium a homeowner would pay. This is the coverage gap Canadian flood policy is trying to close.

Proposals for a national flood insurance program centre on a public high-risk pool with a federal backstop, private delivery, and risk-based pricing with the subsidy made explicit rather than hidden. Such a pool needs an explicit, funded subsidy and a mitigation or relocation requirement, paired with land-use rules that stop the high-risk zone from growing.

[[Moral Hazard|Moral hazard]] at the land-use level is the defining policy problem. Government disaster assistance after every flood, and any subsidised premium, both reduce the incentive to avoid building in floodplains or to invest in mitigation. A well-designed program prices the risk and subsidises the household, not the location.

> [!trap] Pricing from the flood record
> The historical record understates future flood losses because climate change is shifting the hazard. Price from catastrophe models of the current hazard, not from experience or historical return periods.
