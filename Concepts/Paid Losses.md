**Paid Losses** are the cumulative cash payments made on covered claims through a valuation date — the only loss figure that contains no estimate.

> $$\text{Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$

> $$\text{Ultimate}_{\text{paid}} = \text{Paid}_n \times \text{CDF}^{\text{paid}}_{n \to \text{ult}}$$

- Paid data is **objective**. It carries no adjuster judgment, so a paid triangle is immune to changes in [[Case Adequacy|case reserve adequacy]] — the single most common distortion in reported triangles.
- The price of that immunity is **less information and more leverage**. Paid losses lag reported losses, so paid development factors are larger at every maturity and a paid chain ladder at an early age multiplies a small, volatile number by a large factor.
- Paid triangles are **not** immune to everything: they are highly sensitive to changes in [[Settlement Rate|settlement rate]]. Speeding up claim closure inflates the paid diagonal and makes historical paid factors too high; the [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment exists to restate the triangle onto a common disposal-rate basis.
- Running paid and reported methods **side by side** is standard practice. Agreement is reassuring; divergence is a diagnostic. Paid ultimates above reported ultimates suggest case reserves are inadequate; the reverse suggests they are strengthening (or claims are closing slowly).
- Paid losses are also what the **payment pattern** is built from, which drives discounting, cash-flow testing and the value of float in the [[Underwriting Profit|profit provision]].

![[Media/Figures/Paid_Losses.svg|340]]

> [!example]- Paid and Reported Chain Ladder on the Same Year {Example}
> Accident year $2023$ at $24$ months: paid $\$2{,}400{,}000$, case reserves $\$1{,}900{,}000$. Selected cumulative factors to ultimate are $2.05$ on paid and $1.28$ on reported.
>
> Compare the two estimates and interpret the difference.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Reported} &= \$2{,}400{,}000 + \$1{,}900{,}000 \\
> > &= \$4{,}300{,}000 \\[6pt]
> > \text{Ultimate}_{\text{paid}} &= \$2{,}400{,}000 \times 2.05 \\
> > &= \$4{,}920{,}000 \\[6pt]
> > \text{Ultimate}_{\text{reported}} &= \$4{,}300{,}000 \times 1.28 \\
> > &= \$5{,}504{,}000
> > \end{align*}$$
> >
> > The reported method is $\$584{,}000$ ($12\%$) higher. Two readings are consistent with that gap:
> >
> > - Case reserves have been **strengthened** relative to history, so the reported diagonal is high and the historical reported factors over-develop it.
> > - Claims are **closing more slowly**, so the paid diagonal is low relative to history and the paid method under-develops.
> >
> > The next step is not to average the two but to look at the diagnostics — average case outstanding and the ratio of closed to reported counts by maturity — and identify which story the data supports before selecting.

> [!example]- Why Paid Development Factors Are Larger {Example}
> A liability line reports the following cumulative percentages of ultimate at each maturity:
>
> | Maturity | Reported | Paid |
> |---|---|---|
> | $12$ mo | $55\%$ | $20\%$ |
> | $24$ mo | $78\%$ | $45\%$ |
> | $36$ mo | $90\%$ | $68\%$ |
> | $48$ mo | $96\%$ | $85\%$ |
>
> Compute the CDFs to ultimate at $12$ months and comment on the leverage.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CDF}^{\text{rep}}_{12} &= \frac{1}{0.55} = 1.818 \\[4pt]
> > \text{CDF}^{\text{paid}}_{12} &= \frac{1}{0.20} = 5.000
> > \end{align*}$$
> >
> > Now suppose the $12$-month figure is misstated by $\$100{,}000$ — one large claim paid or reserved slightly early:
> >
> > $$\begin{align*}
> > \text{Error}_{\text{reported}} &= \$100{,}000 \times 1.818 = \$181{,}800 \\
> > \text{Error}_{\text{paid}} &= \$100{,}000 \times 5.000 = \$500{,}000
> > \end{align*}$$
> >
> > The paid method magnifies the same distortion nearly three times as much. This is the trade-off in a sentence: **reported data is richer but contaminated by judgment; paid data is clean but thin.** At early maturities both give way to the [[Bornhuetter-Ferguson Method|BF]] approach, which limits the leverage by applying development only to the unemerged portion.
