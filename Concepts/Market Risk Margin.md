---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:09c0216ffd898665fa82e1a845b9f0b82b55781e7785375683f70e1fd830e8dd
  sources: []
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
- **It is the counterparty to the [[Diversification Credit]]**, which recognises that market risk and [[Insurance Risk Margin|insurance risk]] do not crystallise together.

> [!example]- The Capital Cost of an Equity Allocation {Example}
> An insurer holds $\$600$ million of investments, currently all in bonds yielding $4.2\%$. It is considering moving $\$90$ million into equities with an expected return of $8.5\%$. The equity risk factor is $30\%$; the bonds attract an interest rate margin of $3\%$ on the mismatched portion, unchanged by the switch. Capital available is $\$310$ million and the base solvency buffer is $\$185$ million.
>
> Evaluate.
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
> > **Effect on the buffer and the ratio:**
> >
> > $$\begin{align*}
> > \text{New BSB} &= \$185\text{M} + 1.5(\$27\text{M}) \\
> > &= \$225.5\text{M} \\[4pt]
> > \text{New MCT} &= \frac{\$310\text{M}}{\$225.5\text{M}} = 137\%
> > \end{align*}$$
> >
> > against $\$310/\$185 = 168\%$ before. **A $31$-point fall in the capital ratio to earn $\$3.87$ million a year.**
> >
> > **The return on the capital consumed**, after tax at $27\%$:
> >
> > $$\frac{0.73 \times \$3.87\text{M}}{\$40.5\text{M} \text{ (buffer increase)}} = 7.0\%$$
> >
> > which is at or below most insurers' cost of capital — before considering that equities can fall $30\%$ in a year, and tend to do so in the same conditions that produce underwriting losses.
> >
> > **Conclusion: decline, on these numbers.** And note the more general result the calculation illustrates — the MCT's equity factor is high enough that a P&C insurer's equity allocation is a capital decision before it is an investment decision. This is precisely why Canadian P&C balance sheets are bond-dominated, and it is not conservatism for its own sake.
