---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4dea68316cdd770bb7a76ead6d6cd473cf02c12ab3576060e0c990964c5b959d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Required.md
---

**Capital Required** is the [[MCT]]'s measure of how much capital an insurer's risk profile demands. It is built by computing a margin for each category of risk and subtracting a credit for the fact that they do not all crystallise together.

> $$\text{CR} = \text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - \text{Diversification}$$

- **The four risk margins:**
  - **[[Insurance Risk Margin|Insurance risk]]** — factors applied to [[Insurance Contract Liabilities|claim liabilities]] and premium liabilities by line, plus catastrophe and [[Earthquake Exposure Risk Margin|earthquake]] requirements. Usually the largest component for a P&C insurer.
  - **[[Market Risk Margin|Market risk]]** — interest rate, equity, real estate, currency and other market exposures on the asset side.
  - **[[Credit Risk Margin|Credit risk]]** — counterparty default on invested assets, receivables and reinsurance recoverables.
  - **[[Operational Risk Margin|Operational risk]]** — a formula-based charge on premium, liabilities and growth.
- **The [[Diversification Credit]]** recognises that insurance risk and market risk are not perfectly correlated, and reduces the total accordingly.
- **The [[Base Solvency Buffer]] is $1.5 \times$ capital required**, and it is the denominator of the MCT ratio — so the effective requirement is that capital available exceed $1.5$ times capital required.
- **Growth raises it.** Writing more business increases claim and premium liabilities and therefore the insurance risk margin, so an insurer growing fast needs capital simply to stand still — a mechanism that turns rapid growth into a capital problem before it turns into a loss problem.
- **Reinsurance reduces it**, but only where the reinsurer is [[Registered Reinsurance|registered]] or the cession is collateralised, and buying reinsurance itself creates [[Credit Risk Margin|credit risk]] against the reinsurer. The net capital benefit is the reduction in insurance risk less the credit charge.
- **The formula is standardised**, which makes insurers comparable but means it cannot capture every insurer's actual risk — which is exactly why [[ORSA]] requires the insurer to form its **own** view of required capital alongside it.

> [!example]- The Capital Cost of Growth {Example}
> An insurer's capital required is $\$140$ million, of which $\$88$ million is insurance risk. Capital available is $\$330$ million. It plans to grow premium $20\%$, which will raise the insurance risk margin proportionally, with other margins unchanged and the diversification credit of $\$18$ million rising to $\$21$ million.
>
> What happens to the MCT ratio, assuming the growth is written at break-even?
>
> > [!answer]-
> > **Before:**
> >
> > $$\begin{align*}
> > \text{BSB} &= 1.5 \times \$140\text{M} = \$210\text{M} \\[4pt]
> > \text{MCT} &= \frac{\$330\text{M}}{\$210\text{M}} = 157\%
> > \end{align*}$$
> >
> > **After.** Insurance risk rises $20\%$ to $\$105.6$M, an increase of $\$17.6$M; the diversification credit rises $\$3$M:
> >
> > $$\begin{align*}
> > \text{CR} &= \$140\text{M} + \$17.6\text{M} - \$3\text{M} \\
> > &= \$154.6\text{M} \\[4pt]
> > \text{BSB} &= 1.5 \times \$154.6\text{M} = \$231.9\text{M} \\[4pt]
> > \text{MCT} &= \frac{\$330\text{M}}{\$231.9\text{M}} = 142\%
> > \end{align*}$$
> >
> > **The ratio falls $15$ points and breaches the $150\%$ supervisory target — from growth alone, with no losses.** Break-even business adds nothing to capital available while adding materially to the buffer.
> >
> > **What this means in practice.** Growth must be *funded*. To hold $157\%$ the insurer needs capital available of $1.57 \times \$231.9 = \$364$ million, or $\$34$ million more than it has. The sources are retained earnings (so the growth must be **profitable**, not break-even), a capital injection, or reinsurance to hold the insurance risk margin down.
> >
> > **And this is the benign case.** [[PACICC]]'s failure research describes insurers that grew fast at *inadequate* rates — where capital available falls at the same time the buffer rises, and both sides of the ratio move against them at once.
