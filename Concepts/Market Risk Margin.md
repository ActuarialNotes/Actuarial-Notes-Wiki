---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4ec4deba4fcc7d370348b4700f9c9882590cc30a5ce7641fc55ec61231952d0b
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §5.3.1 (30% common-share factor), ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Market Risk Margin.md
---

**The Market Risk Margin** is the [[MCT]] component covering the risk that the value of an insurer's assets — or the relationship between its assets and liabilities — moves adversely with market conditions. It captures **interest rate risk**, **equity risk**, **real estate risk**, **foreign exchange risk**, and other market exposures.

- **Interest rate risk** is measured on the **mismatch**, not on the assets alone. An insurer whose asset [[Duration|duration]] matches its liability duration is largely immunised; one whose assets are much longer or shorter is exposed, and the margin reflects that gap.
- **Equity risk** applies a factor to common share holdings, and it is high — equities are volatile and their fall correlates with the economic conditions in which insurers also suffer underwriting losses. This is the principal reason Canadian P&C insurers hold predominantly bonds.
- **Real estate and foreign exchange** attract their own factors; currency exposure is measured net of matching liabilities in the same currency.
- **The margin shapes portfolios.** An insurer choosing between a bond yielding $4\%$ and an equity expected to return $8\%$ must compare the extra return against the capital the equity consumes. On a risk-adjusted basis the bond often wins, which is why Canadian P&C asset allocations look conservative.
- **It interacts with [[IFRS 17]] presentation.** Assets at FVOCI move through [[Comprehensive Income|OCI]] and hence through [[Capital Available]]; if the [[Other Comprehensive Income Option|OCI option]] on liabilities is elected, part of that movement is offset and the capital effect is limited to the duration mismatch.
- **It is the counterparty to the [[Diversification Credit]]**, which is permitted between the sum of the credit and market risk requirements and the [[Insurance Risk Margin|insurance risk]] requirement, because losses across those risk categories are not perfectly correlated.

![[Media/Figures/Market_Risk_Margin.svg|340]]

> [!example]- The Capital Cost of an Equity Allocation {Example}
> An insurer holds $\$600$ million of investments, currently all in bonds yielding $4.2\%$. It is considering moving $\$90$ million into equities with an expected return of $8.5\%$. The equity risk factor is $30\%$; the bonds attract an interest rate margin of $3\%$ on the mismatched portion, unchanged by the switch. Capital available is $\$310$ million and minimum capital required is $\$185$ million.
>
> Evaluate. (Ignore the change the switch makes to the operational risk margin and the [[Diversification Credit]].)
>
> > [!answer]-
> > **Additional expected return:**
> >
> > $$\begin{align*}
> > &= \$90\text{M} \times (0.085 - 0.042) \\
> > &= \$3.87\text{M} \text{ per year, pre-tax}
> > \end{align*}$$
> >
> > **Additional capital required:**
> >
> > $$0.30 \times \$90\text{M} = \$27\text{M}$$
> >
> > **Effect on minimum capital required and the ratio:**
> >
> > $$\begin{align*}
> > \text{New MCR} &= \$185\text{M} + \frac{\$27\text{M}}{1.5} \\
> > &= \$203\text{M} \\[4pt]
> > \text{New MCT} &= \frac{\$310\text{M}}{\$203\text{M}} = 153\%
> > \end{align*}$$
> >
> > against $\$310/\$185 = 168\%$ before. **A $15$-point fall in the capital ratio to earn $\$3.87$ million a year.**
> >
> > **The return on the capital consumed**, after tax at $27\%$:
> >
> > $$\frac{0.73 \times \$3.87\text{M}}{\$27\text{M} \text{ (capital required increase)}} = 10.5\%$$
> >
> > to be set against the insurer's cost of capital — before considering that equities can fall $30\%$ in a year, and tend to do so in the same conditions that produce underwriting losses.
> >
> > **Note the more general result** the calculation illustrates — the MCT's equity factor is high enough that a P&C insurer's equity allocation is a capital decision before it is an investment decision. This is precisely why Canadian P&C balance sheets are bond-dominated, and it is not conservatism for its own sake.
