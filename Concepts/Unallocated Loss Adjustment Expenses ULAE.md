---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ae0bac012fad1a180d7c1a2b73f0d7933d4b1c07e10e79ea3a830abe8c914a75
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.17 pp.386-391, 402-404 (PDF 392-397, 408-410); Errata (PDF 451), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Unallocated Loss Adjustment Expenses ULAE.md
---

**Unallocated Loss Adjustment Expense** (ULAE) is claims-handling cost that cannot be attributed to any individual claim — claims staff salaries, systems, occupancy, management — as opposed to [[Allocated Loss Adjustment Expense|ALAE]], which can. Because it is never in a case reserve, ULAE is estimated in bulk.

> $$\text{Classical ratio} = \frac{\text{CY Paid ULAE}}{\text{CY Paid Loss}}$$

> $$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$

Friedland's four dollar-based techniques:

- **Classical (dollar-based, paid-to-paid).** Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, and apply it to unpaid claims. If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on reported-but-unpaid claims while $100\%$ remains on [[IBNR]] — the formula above. Assuming ULAE is spent purely with payments instead gives $R \times (\text{Case} + \text{IBNR})$.
- **Kittel's refinement.** The classical ratio is distorted in a growing book, because paid ULAE reflects today's claim *activity* (much of it on newly reported claims) while paid loss reflects older claims. Kittel divides by the **average of paid and incurred** loss instead:

> $$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$

- **Conger-Nolibos generalized approach.** Drops the $50/50$ assumption entirely: ULAE is allocated to claim events (opening, maintenance, closing) with selected weights, and the resulting ratio is applied to the corresponding unpaid dollars. This is the method for books whose growth rate or claim mix is changing materially.
- **Mango-Allen refinement.** Where calendar-year paid losses are volatile, replace them with *expected* losses — apply reporting and payment patterns to accident-year ultimate estimates — so the denominator is smoothed rather than driven by one year's payment timing.

When the classical technique fails (Friedland Ch.17, pp.388–391):

- **Long-tail lines.** The $50/50$ split assumes ULAE is spent when a claim is opened and when it is closed. Johnson finds the classical technique gives good results only for very short-tailed, stable lines, and Rahardjo that the open-and-close assumption is definitely not true for liability claims, which keep incurring claims-handling expense while they stay open. Some actuaries respond by changing the percentages: for a long-tail professional liability portfolio with substantial claims-handling work during the life of the claim, one actuary assumes 25% of ULAE is spent opening claims and 75% closing them, implying 75% of the ratio applied to case outstanding and 100% to IBNR, which includes development on case outstanding (as corrected by the book's errata).
- **Inflation.** Kittel notes that the classical technique accounts for inflation only if the costs underlying ULAE inflate at the same rate as claim costs; if different rates of inflation underlie the claims experience and ULAE, the estimated unpaid ULAE may not be predictive of future experience. Mango and Allen add that the paid-to-paid ratio is distorted upward under inflation, because most claims paid in a calendar year were incurred in earlier years, so inflation reaches the denominator later than the numerator. Friedland's selection of a classical ratio weighs the relationship between claim and salary inflation (p.388).

Count-based techniques (Friedland Ch.17, pp.387, 402–404):

- Dollar-based techniques assume ULAE tracks claim dollars in timing and amount, so a $\$1{,}000$ claim requires ten times as much ULAE as a $\$100$ claim. Mango and Allen object that ULAE depends on the average claim size, not only on the claim dollars, and that a dollar-based estimate of unpaid ULAE becomes a rider on the estimate of unpaid claims, responding to whatever volatility is present in the estimate of ultimate claims.
- A key assumption of count-based techniques is that the same kind of transaction costs the same amount of ULAE regardless of the claim size, so the estimate does not move with the dollar value of the claims.
- **Wendy Johnson's technique** focuses on two transactions, reporting a new claim and maintaining a pending one, with an explicit relative weight on each. The cost per weighted claim count is historical ULAE divided by the weighted claim counts of the same period, and unpaid ULAE is that cost applied to the projected weighted counts (claims newly reported, and claims pending, in each future year) for claims that occurred before the valuation date.

Further points:

- ULAE runs roughly $5$–$8\%$ of loss in workers compensation, $4$–$6\%$ in auto liability, and lower in property — but the ratio is a function of the insurer's claims model, not just the line, so internal data beats a benchmark.
- The classical method's central weakness is **growth**: in a rapidly growing book, current paid ULAE supports a claim inventory much larger than current paid losses reflect, so the ratio overstates the true cost per dollar of loss; in a shrinking or runoff book, it understates it.
- In **ratemaking**, ULAE may be handled as a load on losses or as a [[Fixed Expenses|fixed expense]] provision. Either is acceptable; doing both double-counts, and doing neither leaves a real cost unfunded.

![[Media/Figures/Unallocated_Loss_Adjustment_Expenses_ULAE.svg|340]]

> [!example]- Classical and Kittel Estimates Side by Side {Example}
> Calendar year: paid ULAE $\$480{,}000$, paid loss $\$4{,}000{,}000$, incurred loss $\$8{,}000{,}000$. Unpaid claims are $\$6{,}000{,}000$ of case outstanding and $\$4{,}000{,}000$ of IBNR.
>
> Estimate the ULAE reserve under the classical ($50/100$) and Kittel approaches.
>
> > [!answer]-
> > **Classical:**
> >
> > $$\begin{align*}
> > R &= \frac{\$480{,}000}{\$4{,}000{,}000} = 12.0\% \\[6pt]
> > \text{Reserve} &= 0.12 \times \left(0.5 \times \$6{,}000{,}000 + \$4{,}000{,}000\right) \\
> > &= 0.12 \times \$7{,}000{,}000 \\
> > &= \$840{,}000
> > \end{align*}$$
> >
> > **Kittel:**
> >
> > $$\begin{align*}
> > R_{\text{Kittel}} &= \frac{\$480{,}000}{0.5(\$4{,}000{,}000) + 0.5(\$8{,}000{,}000)} \\
> > &= \frac{\$480{,}000}{\$6{,}000{,}000} \\
> > &= 8.0\% \\[6pt]
> > \text{Reserve} &= 0.08 \times \$7{,}000{,}000 \\
> > &= \$560{,}000
> > \end{align*}$$
> >
> > Incurred loss is double paid loss — a strong signal of a **growing** book. The classical ratio charges the whole ULAE spend against the small paid-loss base and produces $12\%$; Kittel recognizes that much of that spend supports claims that are reported but not yet paid, and lands at $8\%$.
> >
> > The $\$280{,}000$ difference is the growth distortion. In a mature, stable book the two ratios converge.

> [!example]- Why the Classical Ratio Fails in Runoff {Example}
> An insurer places a line in runoff. Its ULAE ratio history:
>
> | CY | Paid ULAE | Paid loss | Ratio |
> |---|---|---|---|
> | $2022$ | $\$1{,}000{,}000$ | $\$20{,}000{,}000$ | $5.0\%$ |
> | $2023$ | $\$900{,}000$ | $\$15{,}000{,}000$ | $6.0\%$ |
> | $2024$ | $\$800{,}000$ | $\$9{,}000{,}000$ | $8.9\%$ |
>
> Unpaid claims at $12/31/2024$ are $\$18{,}000{,}000$ (case $\$11$M, IBNR $\$7$M). What ratio should be selected?
>
> > [!answer]-
> > The ratio is climbing steeply, and the reason is structural rather than a cost problem: a runoff book's claims department has fixed costs — staff, systems, management — that do not shrink as fast as the payment stream. Each remaining dollar of loss genuinely costs more to administer.
> >
> > Selecting the three-year average of $6.6\%$ would understate the cost of running off the remaining claims. Selecting the latest $8.9\%$ is closer, but even that is a lagging figure if payments keep falling faster than expenses.
> >
> > This is precisely the situation the **Conger-Nolibos** approach is built for: estimate what it costs to *maintain and close* the remaining claim inventory — a cost per open claim per year plus a cost per closure — rather than a ratio to a shrinking payment base. The classical ratio's denominator is the wrong driver once the book stops behaving like a going concern.
