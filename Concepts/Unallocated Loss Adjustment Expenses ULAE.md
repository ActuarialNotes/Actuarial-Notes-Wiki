**Unallocated Loss Adjustment Expense** (ULAE) is claims-handling cost that cannot be attributed to any individual claim — claims staff salaries, systems, occupancy, management — as opposed to [[Allocated Loss Adjustment Expense|ALAE]], which can. Because it is never in a case reserve, ULAE is estimated in bulk.

> $$\text{Classical ratio} = \frac{\text{CY Paid ULAE}}{\text{CY Paid Loss}}$$

> $$\text{ULAE Reserve} = R \times \left(0.5 \times \text{Case} + 1.0 \times \text{IBNR}\right)$$

Friedland's four approaches, in order of increasing sophistication:

- **Classical (dollar-based, paid-to-paid).** Compute the ratio $R$ of calendar-year paid ULAE to calendar-year paid loss, review it for trend, and apply it to unpaid claims. If ULAE is assumed to be spent half at reporting and half at settlement, only $50\%$ remains on reported-but-unpaid claims while $100\%$ remains on [[IBNR]] — the formula above. Assuming ULAE is spent purely with payments instead gives $R \times (\text{Case} + \text{IBNR})$.
- **Kittel's refinement.** The classical ratio is distorted in a growing book, because paid ULAE reflects today's claim *activity* (much of it on newly reported claims) while paid loss reflects older claims. Kittel divides by the **average of paid and incurred** loss instead:

> $$R_{\text{Kittel}} = \frac{\text{Paid ULAE}}{0.5(\text{Paid Loss}) + 0.5(\text{Incurred Loss})}$$

- **Mango-Allen bootstrap.** Where calendar-year paid losses are volatile, replace them with *expected* losses — apply reporting and payment patterns to accident-year ultimate estimates — so the denominator is smoothed rather than driven by one year's payment timing.
- **Conger-Nolibos generalized approach.** Drops the $50/50$ assumption entirely: ULAE is allocated to claim events (opening, maintenance, closing) with selected weights, and the resulting ratio is applied to the corresponding unpaid counts or dollars. This is the method for books whose growth rate or claim mix is changing materially.

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
