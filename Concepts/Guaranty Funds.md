---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8afcc4abdd3751a6ed6c7d9733171303b6455ad03a5bc85c6a6377dfa23a914d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranty Funds.md
---

![[Media/Figures/Guaranty_Funds.svg|340]]

**Guaranty Funds** are industry-financed arrangements that pay the claims of an insolvent insurer's policyholders, up to defined limits, so that a failure does not leave claimants uncompensated. Canada's property and casualty fund is [[PACICC]], and membership is a condition of licensing in every province.

The Canadian model is post-assessment funding. The fund holds only modest standing resources and levies surviving insurers after a failure, in proportion to their market share in the affected jurisdiction and lines, so the assessment of surviving insurer $i$ is

> $$\text{Assessment}_i = \text{Shortfall} \times \frac{\text{Premium}_i}{\sum_j \text{Premium}_j}$$

- $\text{Shortfall}$ is the failed insurer's eligible claims left unpaid after its assets are applied, within the fund's coverage limits.
- $\text{Premium}_i$ is insurer $i$'s premium in the affected jurisdiction and lines.
- $\sum_j \text{Premium}_j$ is the industry's premium there.

Pre-funded models, as in some other countries, hold capital in advance instead. Life and health insurers have a separate fund, Assuris, distinct in coverage, funding and limits.

> [!example]- What is this surviving insurer's assessment? {Example}
> An insurer with $\$180$ million of premium fails, leaving a shortfall of $\$95$ million after its assets are applied. Guaranty fund coverage limits reduce eligible claims to $\$78$ million. Industry premium in the affected jurisdiction is $\$14$ billion, and a surviving insurer writes $\$420$ million there.
>
> > [!answer]-
> > - The surviving insurer's market share is $420/14{,}000 = 3.0\%$.
> > - Its assessment is $0.030 \times \$78\text{M} = \$2{,}340{,}000$, which is manageable for a failure of this size.
> > - The other $95 - 78 = \$17$ million of claims, above coverage limits or outside covered classes, are not paid by the fund. Those policyholders rank as unsecured creditors in the liquidation.
> > - The assessment is unrelated to prudence: the insurer pays $\$2.34$ million because it is large, not because it took risk.
> > - Had the failure been ten times larger, the same insurer's assessment would be $\$23.4$ million, absorbed by an industry already weakened by whatever caused the failure.

## Limits of coverage

[[PACICC]] pays defined maximums per claim and per policy, and refunds a portion of unearned premium. Large commercial claims above the cap, and claims of a kind excluded from coverage, are not made whole. A guaranty fund is a safety net, not a substitute for solvency.

## Moral hazard in assessments

Assessments are based on market share, not on the assessed insurer's own risk. A prudently capitalised insurer therefore pays for a reckless one's failure, and the reckless one's policyholders were protected all along. This is the standard criticism, and it is the argument for risk-based assessment, which no Canadian fund uses.

## Capacity of the fund

The fund can absorb the failure of small and medium insurers. The failure of a very large insurer, or of several at once after a catastrophe, would exceed what the survivors can be assessed without threatening their own solvency. This is why [[Solvency Regulation|solvency regulation]] does the real work and the fund handles the residual.

[[OSFI]] and [[PACICC]] share information, and OSFI's early-intervention ladder exists partly to give the fund an orderly wind-up rather than a disorderly failure. An insurer resolved early costs the fund far less.

> [!trap] Treating the fund as full coverage
> A guaranty fund pays covered claims up to its limits. The part of a claim above the cap, and claims outside covered classes, are left to the liquidation, where the claimant is an unsecured creditor.
