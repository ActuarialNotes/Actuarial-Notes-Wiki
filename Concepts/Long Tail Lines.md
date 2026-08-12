**Long Tail Lines** are lines of insurance whose claims take many years to be reported, litigated and paid — so that at any valuation date most of the ultimate cost is still an estimate rather than a fact.

> $$\text{Reported \%} = \frac{1}{\text{CDF}_{n \to \text{ult}}}$$

- Typical long-tail lines: medical malpractice, workers compensation (especially permanent total disability), general and products liability, excess casualty, environmental and asbestos exposures.
- Two lags compound. The **reporting lag** — latent occupational disease, defects discovered years later, injuries whose severity is not initially apparent — creates pure [[IBNR]]; the **settlement lag** from litigation creates IBNER on claims already known.
- Because the [[Cumulative Development Factor|CDF]] at early maturities is large, estimates are highly **leveraged**: a small proportional change in a factor moves ultimate by a large dollar amount. A [[Tail Factor|tail factor]] beyond the observed triangle is unavoidable and is often the single biggest judgment in the analysis.
- Long-tail reserves are also exposed to **calendar-year** forces that no accident-year pattern anticipates: [[Inflation|social and economic inflation]], legislative reform, judicial reinterpretation. These hit every open accident year at once.
- The long payout pattern means large held reserves, substantial investment income on them, and an [[Underwriting Profit|underwriting profit provision]] that may legitimately be lower than a short-tail line's — a fully developed answer to "why does workers compensation target a higher combined ratio".
- No single method dominates. Practice is to run [[Chain Ladder Method|chain ladder]], [[Bornhuetter-Ferguson Method|BF]], [[Expected Loss Method|expected claims]] and [[Frequency-Severity Method|frequency-severity]] on both paid and reported data, and to weight toward the a priori methods at immature ages.

> [!example]- Leverage in the Tail Factor {Example}
> A medical malpractice accident year has $\$3{,}000{,}000$ reported at $36$ months. Two actuaries select tail factors of $3.50$ and $3.75$ against the same age-to-age factors.
>
> Quantify the disagreement.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Ultimate}_A &= \$3{,}000{,}000 \times 3.50 = \$10{,}500{,}000 \\
> > \text{Ultimate}_B &= \$3{,}000{,}000 \times 3.75 = \$11{,}250{,}000
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{IBNR}_A &= \$7{,}500{,}000 \\
> > \text{IBNR}_B &= \$8{,}250{,}000
> > \end{align*}$$
> >
> > A $7.1\%$ difference in the factor is a $10.0\%$ difference in IBNR — $\$750{,}000$ on a single accident year, from a judgment about development beyond any data either actuary has. Multiply across ten open accident years and the tail selection alone can move the balance sheet by more than the entire reserve of a short-tail line.

> [!example]- Why the Chain Ladder Fails Early on a Long-Tail Year {Example}
> A general liability accident year has these reported figures. Selected age-to-age factors are $12$–$24$: $2.40$, $24$–$36$: $1.45$, $36$–ult: $1.60$.
>
> | Maturity | Reported |
> |---|---|
> | $12$ months | $\$800{,}000$ |
> | $12$ months (one large claim reserved late) | $\$1{,}100{,}000$ |
>
> Compare the chain ladder estimate under each figure, and comment.
>
> > [!answer]-
> > $$\text{CDF}_{12 \to \text{ult}} = 2.40 \times 1.45 \times 1.60 = 5.568$$
> >
> > $$\begin{align*}
> > \text{Ultimate (as reported)} &= \$800{,}000 \times 5.568 \\
> > &= \$4{,}454{,}400 \\[4pt]
> > \text{Ultimate (with the claim)} &= \$1{,}100{,}000 \times 5.568 \\
> > &= \$6{,}124{,}800
> > \end{align*}$$
> >
> > A single $\$300{,}000$ case reserve entered a few weeks earlier changes the ultimate estimate by $\$1{,}670{,}000$ — because the chain ladder multiplies whatever is on the diagonal by $5.568$.
> >
> > That sensitivity is the argument for the [[Bornhuetter-Ferguson Method|BF]] at immature maturities: BF applies the development factor only to the *unreported* portion and anchors the rest on an a priori expectation, so a one-off reserve entry moves the answer by its own amount rather than by five times its amount. See [[Large Loss]] for the parallel treatment in ratemaking.
