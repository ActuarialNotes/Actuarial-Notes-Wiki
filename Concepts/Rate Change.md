**Rate Change** is the percentage by which rates are altered. Two numbers must be kept distinct: the **indicated** change that falls out of the ratemaking analysis, and the **selected** (implemented) change actually filed after judgment, competitive and regulatory considerations.

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + \text{Fixed Expense Ratio}}{1 - V - Q} - 1$$

- The second form is the [[Loss Ratio Method]] indication with fixed expenses in the numerator: $V$ is the [[Variable Expenses|variable expense]] ratio and $Q$ the target [[Underwriting Profit|underwriting profit]] provision. The [[Pure Premium Method]] reaches the same answer through an indicated rate per exposure.
- The **selected** change may differ for reasons that are legitimate and must be documented: [[Credibility|credibility]] weighting against a [[Complement of Credibility|complement]], [[Ratemaking Constraints|regulatory caps]], rate capping to limit policyholder disruption, competitive position, and [[Lifetime Value|retention economics]].
- An overall rate change is implemented through the [[Rating Algorithm|rating algorithm]] — usually a base rate adjustment — and any simultaneous change to classification relativities must be **off-balanced** so the two together produce the intended overall effect, not the sum of both.
- Every rate change enters the rate level index used to compute [[On Level Premium|on-level premium]] in future analyses, so the history of changes (dates, magnitudes, and whether they applied to new business, renewals or in-force policies) is part of the ratemaking data.
- A rate change also changes the **mix**: price-sensitive risks shop, so a large increase can worsen the remaining experience through adverse selection — an effect the indication itself does not capture.

> [!example]- Indicated vs. Selected Change {Example}
> A personal auto indication produces $+14.2\%$. The state's largest competitor filed $+4\%$ last quarter; the regulator has informally signalled that increases above $10\%$ will draw a hearing; the book's retention is $88\%$ and each point of rate historically costs $0.4$ points of retention.
>
> What should the actuary recommend and document?
>
> > [!answer]-
> > The **indication is $+14.2\%$** and that number does not change — it is the estimate of the rate needed to cover expected costs and target profit, and it belongs in the filing.
> >
> > A **selected $+9.9\%$** is defensible, with the reasoning stated explicitly:
> >
> > - Filing under the $10\%$ threshold avoids a hearing that would delay the whole change by months, during which the book earns at the current inadequate level.
> > - At the competitor's $+4\%$, a $14\%$ increase would cost roughly $5.7$ points of retention and the shoppers who leave are disproportionately the better risks.
> > - The shortfall is not abandoned: it is carried into the next filing, and the actuary should say so, together with the expected underwriting result at $+9.9\%$.
> >
> > What is *not* acceptable is quietly re-deriving the indication to make it come out at $9.9\%$ — adjusting the trend selection or the profit provision until the answer matches the desired filing. The [[Principles of Ratemaking|CAS principles]] and [[ASOP 12 - Risk Classification (ASB - 2005)|actuarial standards]] require the indication and the departure from it to be separately identified.

> [!example]- Off-Balancing a Simultaneous Relativity Change {Example}
> An insurer's overall indication is $+8.0\%$. At the same time it revises territory relativities; applied to the current book, the new relativities alone would produce $+3.0\%$ of premium.
>
> What base rate change is needed?
>
> > [!answer]-
> > The relativity revision already delivers part of the increase, so the base rate must supply only the remainder — multiplicatively, not by subtraction:
> >
> > $$\begin{align*}
> > \text{Off-balance factor} &= \frac{1.080}{1.030} \\
> > &= 1.0485
> > \end{align*}$$
> >
> > The base rate rises $+4.85\%$. Combined with the relativity change:
> >
> > $$1.0485 \times 1.030 = 1.080 \;\checkmark$$
> >
> > Taking $+8.0\%$ on the base rate *and* implementing the new relativities would deliver $1.08 \times 1.03 = +11.2\%$ — three points more than intended, arriving unevenly across territories. See [[Considerations for Implementing Rates]].
