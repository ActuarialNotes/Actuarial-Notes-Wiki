---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:feee2b6a2770b0be58b8e0f870d50a4a47e8faf834c0529324a5a7bcf5821f63
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §4.2.1 (margin for liability for incurred claims, x 1.10, risk factor table), §4.3.2.2, §4.3.3.2, §4.3.3.3, ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Risk Margin.md
---

![[Media/Figures/Insurance_Risk_Margin.svg|340]]

The **Insurance Risk Margin** is the [[MCT]] component covering risk that arises from the insurance business itself: that [[Liability for Incurred Claims|claim liabilities]] prove insufficient, that [[Liability for Remaining Coverage|premium liabilities]] prove insufficient for the unexpired coverage, and that catastrophes occur. It is normally the largest part of [[Capital Required]] for a Canadian P&C insurer.

The insurance risk margin is

> $$\text{Insurance risk} = \text{Claim} + \text{Premium} + \text{Catastrophe}$$

- $\text{Claim}$ is the margin for claim liabilities.
- $\text{Premium}$ is the margin for premium liabilities.
- $\text{Catastrophe}$ is the catastrophe risk requirement.

More business means more claim and premium liabilities, so the margin rises with volume even when the business is written profitably. This is why growth costs capital.

## Margin for claim liabilities

For each class of insurance, the best estimate [[Liability for Incurred Claims|LIC]] is reduced by the best estimate asset for incurred claims on reinsurance contracts held and multiplied by the class's risk factor. The margin for claim liabilities is the sum over classes multiplied by $1.10$:

> $$\text{Claim} = 1.10 \sum_c f_c\,(L_c - R_c)$$

- $c$ runs over the classes of insurance.
- $f_c$ is the risk factor for class $c$.
- $L_c$ is the best estimate LIC for class $c$, excluding the risk adjustment for non-financial risk.
- $R_c$ is the best estimate asset for incurred claims on reinsurance contracts held for class $c$.

Long-tail liability lines attract higher factors than short-tail property, reflecting the greater uncertainty in their ultimate cost.

> [!example]- What is the capital effect of this shift in line mix? {Example}
> An insurer has $\$500$ million of net claim liabilities. It is shifting from personal property (risk factor $15\%$) toward commercial liability (risk factor $25\%$). The split is $70/30$ now, and the plan moves it to $40/60$ over three years with total liabilities unchanged. Its capital available is $\$400$ million and its minimum capital required $\$210$ million. Ignore the change to the operational risk margin and the [[Diversification Credit]].
>
> > [!answer]-
> > - The margin now is $1.10\,[0.70(500)(0.15) + 0.30(500)(0.25)] = 1.10(52.5 + 37.5) = \$99$ million.
> > - After the shift it is $1.10\,[0.40(500)(0.15) + 0.60(500)(0.25)] = 1.10(30 + 75) = \$115.5$ million.
> > - The margin rises $\$16.5$ million, so minimum capital required rises $\$16.5\text{M}/1.5 = \$11$ million, to $\$221$ million.
> > - The MCT ratio falls from $400/210 = 190\%$ to $400/221 = 181\%$, with no growth, no losses and no change in the size of the balance sheet.
> > - Commercial liability must therefore earn a higher return on the capital it consumes than the personal property it replaces, or the shift destroys value even if both lines are profitable.

## Margin for premium liabilities

The margin for premium liabilities applies risk factors to the unexpired portion of coverage. It covers the risk that claims on business already written but not yet incurred exceed expectations.

## Catastrophe risk

Catastrophe risk is an explicit requirement based on modelled exposure. The [[Earthquake Exposure Risk Margin|earthquake]] requirement has its own detailed treatment, covering the [[Probable Maximum Loss|PML]], reinsurance and any capital markets protection.

## Reinsurance and the insurance risk margin

Reinsurance reduces the margin, because the margin for claim liabilities is measured net of the asset for incurred claims on reinsurance contracts held. Buying reinsurance substitutes a [[Credit Risk Margin|credit risk]] charge against the reinsurer for part of the insurance risk relieved. Amounts recoverable from an [[Unregistered Reinsurance|unregistered]] reinsurer that are not covered by amounts payable to it or by acceptable collateral are deducted from [[Capital Available]], and unregistered reinsurance carries a margin of its own.

## Diversification credit

The insurance risk margin is the target of the [[Diversification Credit]]. The credit recognises that losses from insurance risk and from credit and [[Market Risk Margin|market risk]] are not perfectly correlated, and it is permitted between the insurance risk requirement and the sum of the credit and market risk requirements.

> [!trap] Leaving out the $1.10$ multiplier
> The margin for claim liabilities is the sum of the class charges multiplied by $1.10$. Without it, the margin in the example above would be $\$90$ million rather than $\$99$ million.
