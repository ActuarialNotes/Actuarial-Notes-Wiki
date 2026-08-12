**Net of Reinsurance** describes premium, losses or unpaid claims measured after cessions to reinsurers — the amount the primary insurer actually retains.

> $$\text{Net} = \text{Gross} - \text{Ceded}$$

> $$\text{Net Loss Ratio} = \frac{\text{Gross Losses} - \text{Ceded Losses}}{\text{Gross Premium} - \text{Ceded Premium}}$$

- Gross, [[Ceded Losses|ceded]] and [[Net Losses|net]] must each be internally consistent: net losses belong over net premium. Mixing bases — gross losses over net premium is the classic error — overstates the loss ratio by the whole cost of the reinsurance programme.
- **Ratemaking is normally performed gross**, then the *net cost of reinsurance* is loaded as an expense. Werner defines that net cost as ceded premium minus expected ceded losses; it belongs in the numerator of the indication alongside other [[Expense Provisions|expense provisions]], not buried in the loss ratio.
- Rating net directly is defensible only when the reinsurance structure is stable, because the net experience embeds the treaty terms of each historical year. A change in attachment point makes prior net years non-comparable, while gross years remain usable.
- Net experience is **less volatile** than gross — excess-of-loss reinsurance truncates exactly the [[Large Loss|large losses]] that drive volatility — which is why net data can look more credible than it is. The reinsurance is doing the smoothing, and the insurer is paying for it.
- On the reserving side, the [[Reinsurance Recovery|ceded triangle]] develops differently from the gross one: cessions attach to the large, slow, litigated claims, so ceded patterns are longer-tailed and thinner. Friedland's guidance is to estimate gross and ceded separately and derive net as the difference, not to develop a net triangle whose mix shifts with each treaty change.

> [!example]- Gross, Ceded and Net Loss Ratios {Example}
> An insurer writes $\$2{,}000{,}000$ of gross earned premium and cedes $10\%$ ($\$200{,}000$) under a $\$500{,}000$ excess of $\$250{,}000$ treaty. Gross incurred losses are $\$1{,}300{,}000$, of which $\$150{,}000$ is recovered from the reinsurer.
>
> Compute the gross, ceded and net loss ratios, and comment on the treaty's result.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross LR} &= \frac{\$1{,}300{,}000}{\$2{,}000{,}000} = 65.0\% \\[6pt]
> > \text{Ceded LR} &= \frac{\$150{,}000}{\$200{,}000} = 75.0\% \\[6pt]
> > \text{Net LR} &= \frac{\$1{,}150{,}000}{\$1{,}800{,}000} = 63.9\%
> > \end{align*}$$
> >
> > The net loss ratio ($63.9\%$) is below the gross ($65.0\%$) precisely because the **ceded** loss ratio ($75.0\%$) is above it: the treaty removed a slice of business worse than the book average, so what remains looks better. The cedant paid $\$200{,}000$ and recovered $\$150{,}000$ of loss plus the volatility protection; the reinsurer's own margin on the year is thin.
> >
> > One year proves nothing either way. An excess treaty is *expected* to run a low ceded loss ratio in most years and a very high one occasionally, so the treaty is evaluated over a full cycle — and the cedant's true cost is the multi-year net cost of reinsurance (ceded premium less expected ceded losses), not any single year's recovery.

> [!example]- Loading the Net Cost of Reinsurance into an Indication {Example}
> A commercial property indication is built gross: projected loss and ALAE ratio $58\%$, fixed expense ratio $6\%$, variable expense ratio $22\%$, target underwriting profit $5\%$. The insurer cedes $\$3{,}000{,}000$ of premium against $\$2{,}100{,}000$ of expected ceded losses, on a gross earned premium base of $\$40{,}000{,}000$.
>
> Calculate the indicated rate change with and without the reinsurance cost.
>
> > [!answer]-
> > Without the reinsurance load:
> >
> > $$\begin{align*}
> > \text{Indicated factor} &= \frac{0.58 + 0.06}{1 - 0.22 - 0.05} \\
> > &= \frac{0.64}{0.73} \\
> > &= 0.877
> > \end{align*}$$
> >
> > an indicated change of $-12.3\%$.
> >
> > The net cost of reinsurance is ceded premium less expected ceded losses:
> >
> > $$\begin{align*}
> > \text{Net cost} &= \$3{,}000{,}000 - \$2{,}100{,}000 \\
> > &= \$900{,}000 \\[4pt]
> > \text{as a ratio} &= \frac{\$900{,}000}{\$40{,}000{,}000} \\
> > &= 2.25\%
> > \end{align*}$$
> >
> > Treating it as a fixed cost in the numerator:
> >
> > $$\begin{align*}
> > \text{Indicated factor} &= \frac{0.58 + 0.06 + 0.0225}{0.73} \\
> > &= \frac{0.6625}{0.73} \\
> > &= 0.908
> > \end{align*}$$
> >
> > an indicated change of $-9.2\%$. Ignoring the net cost of reinsurance would have given away three points of rate that the insurer needs to pay for its own protection.
