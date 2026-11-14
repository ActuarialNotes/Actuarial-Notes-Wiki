---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:437b92843d1fa4d2f0b6d32a8bdf9d94ba052f34ec6b3d07dc70370ba34c42cc
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §5.3.1 (30% common-share factor), ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Market Risk Margin.md
---

![[Media/Figures/Market_Risk_Margin.svg|340]]

The **Market Risk Margin** is the [[MCT]] component covering the risk that the value of an insurer's assets, or the relationship between its assets and liabilities, moves adversely with market conditions. It is built from a requirement for each kind of market risk:

1. **Interest rate risk** is measured on the mismatch, not on the assets alone. An insurer whose asset [[Duration|duration]] matches its liability duration is largely immunised. One whose assets are much longer or shorter is exposed, and the margin reflects that gap.
2. **Equity risk** applies a factor to common share holdings, and it is high. Equities are volatile, and their fall correlates with the economic conditions in which insurers also suffer underwriting losses. This is the principal reason Canadian P&C insurers hold predominantly bonds.
3. **Real estate risk** attracts its own factor.
4. **Foreign exchange risk** attracts its own factor, measured net of matching liabilities in the same currency.

Other market exposures are captured as well.

The margin shapes portfolios. An insurer choosing between a bond yielding $4\%$ and an equity expected to return $8\%$ must compare the extra return against the capital the equity consumes. On a risk-adjusted basis the bond often wins, which is why Canadian P&C asset allocations look conservative.

> [!example]- Is this equity allocation worth its capital cost? {Example}
> An insurer holds $\$600$ million of investments, all in bonds yielding $4.2\%$. It is considering moving $\$90$ million into equities with an expected return of $8.5\%$. The equity risk factor is $30\%$, and the bonds' interest rate margin is unchanged by the switch. Capital available is $\$310$ million, minimum capital required is $\$185$ million and the tax rate is $27\%$. Ignore the change in the operational risk margin and the [[Diversification Credit]].
>
> > [!answer]-
> > - The extra expected return is $\$90\text{M} \times (0.085 - 0.042) = \$3.87\text{M}$ a year before tax.
> > - The extra capital required is $0.30 \times \$90\text{M} = \$27\text{M}$.
> > - Minimum capital required is capital required divided by $1.5$, so it rises by $\$27\text{M}/1.5 = \$18\text{M}$, to $\$203\text{M}$.
> > - The MCT ratio falls from $\$310/\$185 = 168\%$ to $\$310/\$203 = 153\%$, a 15-point fall to earn $\$3.87$ million a year.
> > - After tax, the return on the capital consumed is $0.73 \times \$3.87\text{M} / \$27\text{M} = 10.5\%$.
> > - That return has to beat the insurer's cost of capital, before considering that equities can fall $30\%$ in a year in the same conditions that produce underwriting losses.
> > - The MCT's equity factor is high enough that a P&C insurer's equity allocation is a capital decision before it is an investment decision.

## Interaction with IFRS 17 and the diversification credit

Assets at FVOCI move through [[Comprehensive Income|OCI]] and hence through [[Capital Available]]. If the [[Other Comprehensive Income Option|OCI option]] on liabilities is elected, part of that movement is offset, and the capital effect is limited to the duration mismatch.

A [[Diversification Credit]] is permitted between the sum of the credit and market risk requirements and the [[Insurance Risk Margin|insurance risk]] requirement, because losses across those risk categories are not perfectly correlated.

> [!trap] Measuring interest rate risk on the assets alone
> A long bond portfolio is not exposed if the liabilities are just as long. The margin is driven by the gap between asset and liability duration.
