---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:82534c48395cddcccdf6bf203d7b6e498b817491db85fbbc16aed074fe00e614
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §4.2.1 (margin for liability for incurred claims, x 1.10, risk factor table), §4.3.2.2, §4.3.3.2, §4.3.3.3, ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Risk Margin.md
---

**The Insurance Risk Margin** is the [[MCT]] component covering risk arising from the insurance business itself: that [[Liability for Incurred Claims|claim liabilities]] prove insufficient, that [[Liability for Remaining Coverage|premium liabilities]] prove insufficient for the unexpired coverage, and that catastrophes occur. It is normally the **largest** part of [[Capital Required]] for a Canadian P&C insurer.

> $$\text{Insurance risk} = \text{Claim liabilities} + \text{Premium liabilities} + \text{Catastrophe}$$

- **Claim liabilities margin** — by class of insurance, the best estimate [[Liability for Incurred Claims|LIC]] (excluding the risk adjustment for non-financial risk) less the best estimate asset for incurred claims on reinsurance contracts held, multiplied by the class's risk factor, with the sum multiplied by $1.10$. Long-tail liability lines attract higher factors than short-tail property, reflecting the greater uncertainty in their ultimate cost.
- **Premium liabilities margin** — factors applied to the unexpired portion of coverage, reflecting the risk that claims on business already written but not yet incurred exceed expectations.
- **Catastrophe risk** — an explicit requirement based on modelled exposure, with the [[Earthquake Exposure Risk Margin|earthquake]] requirement having its own detailed treatment covering the [[Probable Maximum Loss|PML]], reinsurance, and any capital markets protection.
- **Reinsurance reduces it**: the claim liabilities margin is measured net of the asset for incurred claims on reinsurance contracts held. Amounts recoverable from an [[Unregistered Reinsurance|unregistered]] reinsurer that are not covered by amounts payable to it or by acceptable collateral are deducted from [[Capital Available]], and unregistered reinsurance carries a margin of its own — and buying reinsurance substitutes a [[Credit Risk Margin|credit risk]] charge against the reinsurer for part of the insurance risk relieved.
- **It is why growth costs capital.** More business means more claim and premium liabilities, so the margin rises with volume even when the business is written profitably. See [[Capital Required]].
- **It is the target of the [[Diversification Credit]]**, which recognises that losses from insurance risk and from credit and [[Market Risk Margin|market risk]] are not perfectly correlated, and is permitted between the insurance risk requirement and the sum of the credit and market risk requirements.

![[Media/Figures/Insurance_Risk_Margin.svg|340]]

> [!example]- Where a Line Mix Shift Shows Up {Example}
> An insurer with $\$500$ million of net claim liabilities is shifting from personal property (claim liability factor $15\%$) toward commercial liability (factor $25\%$). Currently the split is $70/30$; the plan moves it to $40/60$ over three years, with total liabilities unchanged.
>
> What is the capital effect? (Ignore the change the shift makes to the operational risk margin and the [[Diversification Credit]].)
>
> > [!answer]-
> > **Current claim liabilities margin**, with the guideline's $1.10$ multiplier:
> >
> > $$\begin{align*}
> > &= 1.10\bigl[0.70(\$500\text{M})(0.15) + 0.30(\$500\text{M})(0.25)\bigr] \\
> > &= 1.10(\$52.5\text{M} + \$37.5\text{M}) \\
> > &= \$99\text{M}
> > \end{align*}$$
> >
> > **After the shift:**
> >
> > $$\begin{align*}
> > &= 1.10\bigl[0.40(\$500\text{M})(0.15) + 0.60(\$500\text{M})(0.25)\bigr] \\
> > &= 1.10(\$30\text{M} + \$75\text{M}) \\
> > &= \$115.5\text{M}
> > \end{align*}$$
> >
> > **An increase of $\$16.5$ million in the margin**, which flows through to an $\$11$ million increase in minimum capital required ($\$16.5\text{M} / 1.5$). On capital available of, say, $\$400$ million and minimum capital required of $\$210$ million, the ratio falls from $190\%$ to $181\%$ — with **no growth, no losses, and no change in the size of the balance sheet**.
> >
> > **What the strategy therefore requires.** Commercial liability must earn a higher return on capital than the personal property it replaces, or the shift destroys value even if both lines are profitable. The correct comparison is not loss ratio against loss ratio but **return on the capital each line consumes** — and this calculation is where that capital consumption becomes visible.
> >
> > **The second-order effects to raise with management:** longer-tail liabilities increase [[Duration|duration]] and therefore [[Market Risk Margin|interest rate]] sensitivity; reserve uncertainty rises, which argues for a higher [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and a higher [[Internal Target Capital Ratio|internal target]]; and the insurer is entering a line whose development it may not yet know — the [[PACICC]] failure pattern.
