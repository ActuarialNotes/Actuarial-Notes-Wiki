---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7fedb55fc7efe8185f3c33959d7c76a6edc8efa2f76fc3de4101d44b52bb5b8b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Assumptions.md
---

**Actuarial assumptions** are the statements about the future, explicit or implicit, on which an actuary's method or model rests. In estimating [[Unpaid Claims|unpaid claims]] they include the assumptions built into each [[Loss Reserving|reserving method]] (that past development patterns will repeat, that accident years are independent) and the parameters chosen to apply it (development factors, a [[Tail Factor|tail factor]], an expected loss ratio, a trend rate).

> $$E\left[C_{i,k+1} \mid C_{i1}, \dots, C_{ik}\right] = C_{ik}\,f_k$$

- This is the first of the three assumptions [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] shows the [[Chain Ladder Method|chain ladder]] makes implicitly: expected cumulative loss $C_{i,k+1}$ of accident year $i$ is the current cumulative loss $C_{ik}$ times a development factor $f_k$ common to all years. The other two are independence of accident years and a variance proportional to $C_{ik}$ ([[Mack Chain Ladder Model]]).
- **What the standard requires.** [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] §3.6.2 has the actuary consider the reasonableness of the assumptions underlying each method or model. Assumptions may be implicit or explicit, and may interpret past data or project future trends. They should have no known significant bias to underestimation or overestimation of the intended measure, and should not be internally inconsistent.
- **Sensitivity.** The actuary should consider the sensitivity of the estimate to reasonable alternative assumptions. When the effect would be material, the actuary should notify the principal and attempt to discuss it. Changes in assumptions with a material impact on an updated estimate are disclosed, with the reasons for them.
- **Testing them.** An implicit assumption can be tested against the data it was fitted to. [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] turns the chain ladder's assumptions into testable implications ([[Chain Ladder Assumptions]]): significant factors, linearity, stability, no [[Development Factor Correlation Test|correlation between development factors]] and no [[Calendar Year Effect|calendar-year effects]]. Residual diagnostics ([[Residual Plot|residual plots]], [[Heteroscedasticity|heteroscedasticity]], normality) test the assumptions of a stochastic model such as the [[ODP Bootstrap Model|ODP bootstrap]].
- A failed test points to the assumption to change, not only to a wider range: Venter's alternatives to the chain ladder (a constant added to the factor, [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]], [[Cape Cod Method|Cape Cod]]) each drop a different chain ladder assumption.

> [!example]- Sensitivity of Unpaid Claims to the Tail Factor {Example}
> Cumulative reported losses at the last age in the triangle total $\$50{,}000$K across accident years, and the rest of the unpaid claim estimate (case reserves and IBNR to that age) is $\$18{,}500$K. The actuary selects a tail factor of $1.03$; a tail of $1.06$ is also reasonable. How much does the choice move the unpaid claim estimate?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Tail IBNR}_{1.03} &= 50{,}000 \times 0.03 \\
> > &= 1{,}500 \\
> > \text{Tail IBNR}_{1.06} &= 50{,}000 \times 0.06 \\
> > &= 3{,}000
> > \end{align*}
> > $$
> >
> > The unpaid claim estimate is $\$20{,}000$K with the selected tail and $\$21{,}500$K with the alternative, a difference of $7.5\%$. If the actuary judges that material, ASOP 43 calls for notifying the principal and attempting to discuss the sensitivity, rather than only reporting the point estimate.

> [!example]- Is the Development Factor Significant? {Example}
> Following Venter, incremental reported loss from $12$ to $24$ months is regressed on cumulative loss at $12$ months across accident years, with no constant. The estimated factor (the age-to-age factor less $1$) is $0.35$ with a standard deviation of $0.20$. Does the factor pass Venter's significance test?
>
> > [!answer]-
> > Venter requires the absolute value of a factor to be at least twice its standard deviation:
> >
> > $$
> > \begin{align*}
> > 2 \times 0.20 &= 0.40 \\
> > 0.35 &< 0.40
> > \end{align*}
> > $$
> >
> > The factor is not significantly different from zero, so the chain ladder's assumption that the next period's development is proportional to the losses to date is not supported for this column. Venter treats this as a level of comfort rather than a strict statistical test, and the next step is to try the alternatives, such as a factor plus a constant or a Bornhuetter-Ferguson form, and compare their fit.
