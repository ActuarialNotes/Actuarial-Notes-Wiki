---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c151d24585a382999d3635730b8cb22d9f49598560e03b9c131820f960ca34e2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Risk Margin.md
---

**The Insurance Risk Margin** is the [[MCT]] component covering risk arising from the insurance business itself: that [[Liability for Incurred Claims|claim liabilities]] prove insufficient, that [[Liability for Remaining Coverage|premium liabilities]] prove insufficient for the unexpired coverage, and that catastrophes occur. It is normally the **largest** part of [[Capital Required]] for a Canadian P&C insurer.

> $$\text{Insurance risk} = \text{Claim liabilities} + \text{Premium liabilities} + \text{Catastrophe}$$

- **Claim liabilities margin** — factors applied by line of business to the discounted [[Liability for Incurred Claims|LIC]] net of reinsurance credit. Long-tail liability lines attract higher factors than short-tail property, reflecting the greater uncertainty in their ultimate cost.
- **Premium liabilities margin** — factors applied to the unexpired portion of coverage, reflecting the risk that claims on business already written but not yet incurred exceed expectations.
- **Catastrophe risk** — an explicit requirement based on modelled exposure, with the [[Earthquake Exposure Risk Margin|earthquake]] requirement having its own detailed treatment covering the [[Probable Maximum Loss|PML]], reinsurance, and any capital markets protection.
- **Reinsurance reduces it**, but only where the reinsurer is [[Registered Reinsurance|registered]] or the cession collateralised — and buying reinsurance substitutes a [[Credit Risk Margin|credit risk]] charge against the reinsurer for part of the insurance risk relieved.
- **It is why growth costs capital.** More business means more claim and premium liabilities, so the margin rises with volume even when the business is written profitably. See [[Capital Required]].
- **It is the target of the [[Diversification Credit]]**, which recognises that insurance risk and [[Market Risk Margin|market risk]] do not peak together and reduces the sum of the two.

> [!example]- Where a Line Mix Shift Shows Up {Example}
> An insurer with $\$500$ million of net claim liabilities is shifting from personal property (claim liability factor $15\%$) toward commercial liability (factor $25\%$). Currently the split is $70/30$; the plan moves it to $40/60$ over three years, with total liabilities unchanged.
>
> What is the capital effect?
>
> > [!answer]-
> > **Current claim liabilities margin:**
> >
> > $$\begin{align*}
> > &= 0.70(\$500\text{M})(0.15) + 0.30(\$500\text{M})(0.25) \\
> > &= \$52.5\text{M} + \$37.5\text{M} \\
> > &= \$90\text{M}
> > \end{align*}$$
> >
> > **After the shift:**
> >
> > $$\begin{align*}
> > &= 0.40(\$500\text{M})(0.15) + 0.60(\$500\text{M})(0.25) \\
> > &= \$30\text{M} + \$75\text{M} \\
> > &= \$105\text{M}
> > \end{align*}$$
> >
> > **An increase of $\$15$ million in the margin**, which flows through to a $\$22.5$ million increase in the [[Base Solvency Buffer]] ($1.5 \times$). On capital available of, say, $\$400$ million and a buffer of $\$210$ million, the ratio falls from $190\%$ to $172\%$ — with **no growth, no losses, and no change in the size of the balance sheet**.
> >
> > **What the strategy therefore requires.** Commercial liability must earn a higher return on capital than the personal property it replaces, or the shift destroys value even if both lines are profitable. The correct comparison is not loss ratio against loss ratio but **return on the capital each line consumes** — and this calculation is where that capital consumption becomes visible.
> >
> > **The second-order effects to raise with management:** longer-tail liabilities increase [[Duration|duration]] and therefore [[Market Risk Margin|interest rate]] sensitivity; reserve uncertainty rises, which argues for a higher [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and a higher [[Internal Target Capital Ratio|internal target]]; and the insurer is entering a line whose development it may not yet know — the [[PACICC]] failure pattern.
