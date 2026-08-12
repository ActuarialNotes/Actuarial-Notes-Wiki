**On-Level Premium** is historical earned premium restated as though every policy had been written at the rate level currently in effect. It is what makes loss ratios from different years comparable, and it is the denominator of the [[Loss Ratio Method]] indication.

> $$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate level index for the period}}$$

> $$\text{On-Level Premium} = \text{Historical EP} \times \text{On-Level Factor}$$

- Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of $1.08 \times 1.05 = 1.134$, not $1.13$.
- The *average* index for a year is the earned-premium-weighted blend of the levels in force during that year. Computing those weights is the whole content of the [[On-Leveling|parallelogram method]]; the alternative, extension of exposures, re-rates each policy directly and skips the weighting.
- On-levelling adjusts for **rate changes only**. Drift in average premium from changing amounts of insurance, limits, deductibles or mix is a separate adjustment — see [[Premium Trend]] — and applying one in place of the other either double-counts or misses the effect entirely.
- Every year of the experience period gets its own on-level factor, and the factors decline as the years approach the present: the most recent year needs the least adjustment.
- The [[Pure Premium Method]] needs no on-levelling at all, because it never divides by premium. That is its principal practical advantage where rate history is messy or the book has been re-tiered.

> [!example]- Building a Rate Level Index {Example}
> Rate changes: $+8\%$ effective $1/1/2022$, $+5\%$ effective $7/1/2023$, $-3\%$ effective $1/1/2025$. All changes are effective for policies *written* on or after those dates; the current date is $12/31/2025$.
>
> Build the cumulative index and give the on-level factor for a calendar year fully at the $2022$ level.
>
> > [!answer]-
> > Anchoring the pre-$2022$ level at $1.000$:
> >
> > | Effective | Change | Cumulative index |
> > |---|---|---|
> > | — | — | $1.0000$ |
> > | $1/1/2022$ | $+8\%$ | $1.0800$ |
> > | $7/1/2023$ | $+5\%$ | $1.1340$ |
> > | $1/1/2025$ | $-3\%$ | $1.1000$ |
> >
> > $$1.0800 \times 1.05 = 1.1340 \qquad 1.1340 \times 0.97 = 1.1000$$
> >
> > A year earning entirely at the $2022$ level has an average index of $1.0800$, so
> >
> > $$\text{On-level factor} = \frac{1.1000}{1.0800} = 1.0185$$
> >
> > Note the current index is *below* the $2023$ peak because of the $-3\%$: on-level factors are not always greater than one, and a year written at a higher rate level than today's is adjusted **downward**.

> [!example]- On-Level Premium Changes the Indication {Example}
> A line has these calendar/accident year figures. Rates rose $+10\%$ on $1/1/2024$ and there have been no other changes.
>
> | AY | Earned premium | Ultimate losses | Avg. rate level index |
> |---|---|---|---|
> | $2022$ | $\$10{,}000{,}000$ | $\$7{,}200{,}000$ | $1.000$ |
> | $2023$ | $\$10{,}500{,}000$ | $\$7{,}560{,}000$ | $1.000$ |
> | $2024$ | $\$12{,}000{,}000$ | $\$7{,}920{,}000$ | $1.050$ |
>
> (Annual policies written uniformly, so CY 2024 earns half its premium at each level: $0.5(1.000) + 0.5(1.100) = 1.050$.) The permissible loss ratio is $65\%$. Compute the indication with and without on-levelling.
>
> > [!answer]-
> > The current index is $1.100$. On-level factors:
> >
> > $$\begin{align*}
> > 2022, 2023: \; \frac{1.100}{1.000} &= 1.1000 \\[4pt]
> > 2024: \; \frac{1.100}{1.050} &= 1.0476
> > \end{align*}$$
> >
> > On-level premium and loss ratios:
> >
> > | AY | On-level EP | Loss ratio |
> > |---|---|---|
> > | $2022$ | $\$11{,}000{,}000$ | $65.5\%$ |
> > | $2023$ | $\$11{,}550{,}000$ | $65.5\%$ |
> > | $2024$ | $\$12{,}571{,}000$ | $63.0\%$ |
> >
> > $$\begin{align*}
> > \text{Weighted LR} &= \frac{\$22{,}680{,}000}{\$35{,}121{,}000} \\
> > &= 64.6\% \\[4pt]
> > \text{Indication} &= \frac{0.646}{0.65} - 1 \\
> > &= -0.6\%
> > \end{align*}$$
> >
> > Without on-levelling, the raw loss ratios are $72.0\%$, $72.0\%$ and $66.0\%$:
> >
> > $$\begin{align*}
> > \text{Weighted LR} &= \frac{\$22{,}680{,}000}{\$32{,}500{,}000} = 69.8\% \\[4pt]
> > \text{Indication} &= \frac{0.698}{0.65} - 1 = +7.4\%
> > \end{align*}$$
> >
> > The unadjusted analysis asks for another $7.4\%$ on top of the $10\%$ the insurer already took — charging twice for the same rate increase, when the book is in fact adequately priced. On-levelling is not a refinement; omitting it produces a systematically wrong answer whenever rates have moved.
