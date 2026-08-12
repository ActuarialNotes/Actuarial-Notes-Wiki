**Written Premium** is the full premium booked when a policy is issued, for the entire policy term, regardless of how much of the coverage period has elapsed.

> $$\text{Written Premium} = \sum_{\text{policies issued in period}} \text{full-term premium}$$

> $$\text{Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$

- Written premium is a **transaction** measure: the whole $\$1{,}200$ of an annual policy is written on the day it is bound, even though only $\$100$ has been [[Earned Premium|earned]] a month later. The unbooked remainder sits in the [[Unearned Premium|unearned premium reserve]].
- In a **growing** book written premium exceeds earned premium, because the UEP is rising; in a **shrinking** book the relationship reverses. The gap is therefore a measure of growth, not of profitability.
- Written premium is the right measure for production, market share, commission (paid on writings) and for the **average written premium** series used in [[Premium Trend|premium trend]] analysis — trend is a written-level phenomenon, since it is driven by what is being sold today.
- It is the *wrong* denominator for a [[Loss Ratio|loss ratio]]: losses in the period arise from coverage provided in the period, which is earned premium.
- Written premium may still change after issuance — endorsements, cancellations and [[Premium Audit|audits]] all book additional or return premium into a later period, so "written premium" for a policy year keeps moving until the audits close.

![[Media/Figures/Written_Premium.svg|340]]

> [!example]- Written, Earned and Unearned from One Policy {Example}
> A $12$-month homeowners policy is written $10/1/2024$ for $\$1{,}200$.
>
> Give calendar year $2024$'s written, earned and unearned premium for this policy.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CY 2024 written} &= \$1{,}200 \\
> > \text{CY 2024 earned} &= \$1{,}200 \times \tfrac{3}{12} = \$300 \\
> > \text{UEP at } 12/31/2024 &= \$1{,}200 \times \tfrac{9}{12} = \$900
> > \end{align*}$$
> >
> > The remaining $\$900$ earns during $2025$ — so this single policy contributes $\$1{,}200$ to CY 2024 written premium and only $\$300$ to CY 2024 earned premium. Checking the identity for CY 2024:
> >
> > $$\$1{,}200 - (\$900 - \$0) = \$300 \;\checkmark$$

> [!example]- Written Premium Growth Overstates Rate Adequacy {Example}
> An insurer reports the following:
>
> | Year | Written premium | Earned premium |
> |---|---|---|
> | $2023$ | $\$40{,}000{,}000$ | $\$37{,}000{,}000$ |
> | $2024$ | $\$52{,}000{,}000$ | $\$44{,}000{,}000$ |
>
> Incurred losses were $\$26{,}640{,}000$ in $2023$ and $\$31{,}680{,}000$ in $2024$. Management reports "the loss ratio improved from $66.6\%$ to $60.9\%$".
>
> Evaluate the claim.
>
> > [!answer]-
> > Management divided losses by **written** premium:
> >
> > $$\frac{\$26{,}640{,}000}{\$40{,}000{,}000} = 66.6\% \qquad \frac{\$31{,}680{,}000}{\$52{,}000{,}000} = 60.9\%$$
> >
> > On the correct **earned** basis:
> >
> > $$\frac{\$26{,}640{,}000}{\$37{,}000{,}000} = 72.0\% \qquad \frac{\$31{,}680{,}000}{\$44{,}000{,}000} = 72.0\%$$
> >
> > The loss ratio did not improve at all — it is flat at $72\%$. The apparent improvement is entirely an artefact of $30\%$ written-premium growth outrunning $19\%$ earned-premium growth: losses emerge on *earned* exposure, so a fast-growing book always looks better on a written basis than it is.
> >
> > This is one of the standard data-reasonableness checks: any loss ratio quoted against written premium in a growing book should be recomputed before it is believed.
