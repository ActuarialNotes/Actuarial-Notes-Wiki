---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:94c505f20780573d1b6444e8ac0c866e5ec87ccc2517ca9ca7b92c5a4e68d513
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Guaranty Funds.md
---

**Guaranty Funds** are industry-financed arrangements that pay the claims of an insolvent insurer's policyholders, up to defined limits, so that a failure does not leave claimants uncompensated. Canada's property and casualty fund is **[[PACICC]]**; membership is a condition of licensing in every province.

> $$\text{Assessment}_i = \text{Shortfall} \times \frac{\text{Premium}_i}{\sum_j \text{Premium}_j}$$

- **Post-assessment funding** is the Canadian model: the fund holds only modest standing resources and levies surviving insurers *after* a failure, in proportion to their market share in the affected jurisdiction and lines. Pre-funded models (as in some other countries) hold capital in advance instead.
- **Coverage is capped and partial.** [[PACICC]] pays defined maximums per claim and per policy and refunds a portion of unearned premium; large commercial claims above the cap, and claims of a kind excluded from coverage, are not made whole. A guaranty fund is a **safety net, not a substitute for solvency**.
- **The moral hazard problem is structural.** Assessments are based on market share, not on the assessed insurer's own risk, so a prudently capitalised insurer pays for a reckless one's failure and the reckless one's policyholders were protected all along. This is the standard criticism, and it is the argument for risk-based assessment — which no Canadian fund uses.
- **Capacity is finite.** The fund can absorb the failure of small and medium insurers; the failure of a very large one, or several at once after a catastrophe, would exceed what the survivors can be assessed without threatening *their* solvency. This is why [[Solvency Regulation]] does the real work and the fund handles the residual.
- **Interaction with the regulator.** [[OSFI]] and [[PACICC]] share information, and OSFI's early-intervention ladder exists partly to give the fund an orderly wind-up rather than a disorderly failure — an insurer resolved early costs the fund far less.
- Life and health insurers have a separate fund (Assuris); the two are distinct in coverage, funding and limits.

> [!example]- Sizing an Assessment {Example}
> An insurer with $\$180$ million of premium fails, leaving a shortfall of $\$95$ million after its assets are applied. Guaranty fund coverage limits reduce eligible claims to $\$78$ million. Industry premium in the affected jurisdiction is $\$14$ billion, and a surviving insurer writes $\$420$ million there.
>
> Compute the surviving insurer's assessment, and comment on the framework's limits.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Market share} &= \frac{\$420\text{M}}{\$14{,}000\text{M}} = 3.0\% \\[6pt]
> > \text{Assessment} &= 0.030 \times \$78\text{M} \\
> > &= \$2{,}340{,}000
> > \end{align*}$$
> >
> > Manageable — which is the point of a post-assessment fund for a failure of this size.
> >
> > **Three things the calculation exposes:**
> >
> > - **$\$17$ million of claims are not paid at all** ($\$95$M less $\$78$M), being above coverage limits or outside covered classes. Those policyholders rank as unsecured creditors in the liquidation. A guaranty fund does not make the market whole.
> > - **The assessment is unrelated to prudence.** The surviving insurer pays $\$2.34$ million because it is large, not because it took risk. Had assessments been risk-based, the failed insurer would have paid more in advance — the reform repeatedly proposed and not adopted.
> > - **Scale it up.** Had the failure been ten times larger, the same insurer's assessment would be $\$23.4$ million, and an industry already weakened by whatever caused the failure — a catastrophe, a reserve deficiency common to the market — would be absorbing it at the worst moment. That correlation between the cause of failure and the assessors' own weakness is the fund's real capacity constraint.
