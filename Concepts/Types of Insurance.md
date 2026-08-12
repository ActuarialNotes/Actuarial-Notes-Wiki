**Types of Insurance**, for ratemaking and reserving purposes, are distinguished less by what they cover than by three behavioural properties: **how long claims take to report and settle**, **how frequent and how severe** they are, and **what triggers coverage**. These three properties determine the data, the methods and the uncertainty of any analysis of the line.

> $$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$

**1. Tail length.**

- [[Long Tail Lines|Long-tail]] lines — medical malpractice, workers compensation, general liability, products, excess casualty — report and settle over many years, carry large [[IBNR]], and are dominated by development uncertainty.
- [[Short Tail Insurance|Short-tail]] lines — auto physical damage, homeowners property, inland marine — are near ultimate within a year or two; the estimate is mostly known, and the risk is a catastrophe rather than development.

**2. Frequency and severity.**

- **High frequency, low severity** (auto physical damage, comprehensive): stable, credible experience; small samples suffice; [[Chain Ladder Method|chain ladder]] works well.
- **Low frequency, high severity** (excess liability, medical malpractice, property catastrophe): a handful of claims drives the result, so a single [[Large Loss|large loss]] can move a whole accident year and raw experience is rarely [[Credibility|credible]] on its own.

**3. Coverage trigger.**

- [[Occurrence Coverage|Occurrence]] policies respond to losses *occurring* in the term, however late they are reported — so they generate pure IBNR and are organized on an [[Accident Year]] basis.
- [[Claims Made Coverage|Claims-made]] policies respond to claims *reported* in the term, so pure IBNR is nil, development is faster and [[Report Year]] is the natural cohort.

> [!example]- Reserve Sensitivity by Tail Length {Example}
> Two lines each show $\$1{,}000{,}000$ of reported losses at $24$ months. Auto physical damage is $95\%$ reported at that maturity; medical malpractice is $30\%$ reported.
>
> Compare the IBNR, and the effect of a $5\%$ error in the development factor.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{APD ultimate} &= \frac{\$1{,}000{,}000}{0.95} = \$1{,}052{,}600 \\
> > \text{APD IBNR} &= \$52{,}600 \\[6pt]
> > \text{Med mal ultimate} &= \frac{\$1{,}000{,}000}{0.30} = \$3{,}333{,}300 \\
> > \text{Med mal IBNR} &= \$2{,}333{,}300
> > \end{align*}$$
> >
> > Now overstate each CDF by $5\%$:
> >
> > $$\begin{align*}
> > \Delta\text{APD} &= \$1{,}000{,}000 \times 1.0526 \times 0.05 \approx \$53{,}000 \\
> > \Delta\text{Med mal} &= \$1{,}000{,}000 \times 3.3333 \times 0.05 \approx \$167{,}000
> > \end{align*}$$
> >
> > The same proportional error costs three times as much in the long-tail line, and it lands on a reserve that is itself $44$ times larger. This leverage is the whole reason long-tail lines are reserved with multiple methods and reviewed against [[External Information in Reserving|benchmarks]].

> [!example]- Choosing a Method from the Line's Properties {Example}
> Classify each line and name the reserving method you would lean on at $12$ months of maturity: (a) personal auto comprehensive, (b) a small book of architects' professional liability written claims-made, (c) commercial umbrella excess of $\$1$M.
>
> > [!answer]-
> > **(a) Auto comprehensive** — short-tail, high frequency, low severity, occurrence. Experience is credible almost immediately and development is nearly complete at $12$ months, so the [[Chain Ladder Method|chain ladder]] on paid data is fine. Watch for [[Catastrophe Loss|hail catastrophes]] distorting a diagonal.
> >
> > **(b) Architects' E&O, claims-made** — long-tail severity but no pure IBNR, small volume. Organize on [[Report Year]]; at $12$ months use a [[Bornhuetter-Ferguson Method|BF]] estimate against an a priori loss ratio, because the claim count is too thin for chain ladder and IBNER dominates.
> >
> > **(c) Umbrella excess of $\$1$M** — extremely long-tail, very low frequency, very high severity, occurrence. Almost nothing is reported at $12$ months; a chain ladder factor there would be meaningless or undefined. Use the [[Expected Loss Method|expected claims]] technique early, transitioning to BF and eventually chain ladder as the year matures, and price/reserve each large claim individually.
