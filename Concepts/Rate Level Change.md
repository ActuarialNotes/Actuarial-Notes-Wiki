**Rate Level Change** is the effect that past [[Rate Change|rate changes]] have on the comparability of data across years — the reason historical premium must be brought to a common level before any loss ratio, trend or a priori expectation built on it can be believed.

> $$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Index in force during the period}}$$

> $$\text{Adjusted ELR}_i = \text{ELR}_{\text{base}} \times \frac{\text{Rate level}_{\text{base}}}{\text{Rate level}_i} \times \frac{\text{Loss trend}_i}{\text{Loss trend}_{\text{base}}}$$

- In **ratemaking** the correction is [[On-Leveling|on-levelling]]: restate historical earned premium to current rates so that a rising loss ratio means rising costs rather than yesterday's cheaper prices.
- In **reserving** the same distortion attacks the *a priori* loss ratio. The [[Bornhuetter-Ferguson Method|BF]] and [[Expected Loss Method|expected claims]] techniques need an expected loss ratio per accident year, and a year written after a $+15\%$ rate change should carry a materially lower ELR than the year before it. Friedland's standard adjustment moves a base-year ELR across years by the ratio of rate level changes and loss trend, as above.
- The [[Cape Cod Method|Cape Cod]] technique is exposed in the same way, because its used-up premium denominator is actual premium: without on-levelling, years written at low rates get too much weight in the derived ELR.
- Rate changes also shift the **mix**. A large increase drives away the risks with the most alternatives — typically the better ones — so the remaining book's experience deteriorates in a way no on-level factor corrects. See [[Mix of Business]].
- Reconstructing rate level history is genuine work: changes may apply to new business only, to renewals at their anniversaries, or to policies in force; tier and underwriting-rule changes move effective price without appearing as a filed rate change at all.

> [!example]- Adjusting a Priori Loss Ratios for Rate Level {Example}
> An actuary sets a BF expected loss ratio for accident year $2024$. The base year is AY $2021$, whose ultimate loss ratio was $68\%$ and is considered a fair a priori. Since then rates rose $+6\%$ ($1/1/2022$), $+10\%$ ($1/1/2023$) and $+4\%$ ($1/1/2024$); annual loss trend is $5\%$.
>
> Derive the AY 2024 ELR.
>
> > [!answer]-
> > Cumulative rate level change from $2021$ to $2024$:
> >
> > $$1.06 \times 1.10 \times 1.04 = 1.2126$$
> >
> > Cumulative loss trend over three years:
> >
> > $$1.05^{3} = 1.1576$$
> >
> > $$\begin{align*}
> > \text{ELR}_{2024} &= 0.68 \times \frac{1.1576}{1.2126} \\
> > &= 0.68 \times 0.9546 \\
> > &= 64.9\%
> > \end{align*}$$
> >
> > Rates outran loss trend over the period, so the a priori loss ratio falls from $68\%$ to $64.9\%$. Carrying $68\%$ into the BF calculation would overstate AY 2024 IBNR — and would keep overstating it every year the insurer stayed ahead of trend, producing a reserve that runs redundant while the analysis appears stable.

> [!example]- A Rate Increase Hiding a Deteriorating Book {Example}
> A commercial auto book reports:
>
> | AY | Earned premium | Ultimate losses | Reported LR |
> |---|---|---|---|
> | $2022$ | $\$20{,}000{,}000$ | $\$14{,}400{,}000$ | $72.0\%$ |
> | $2023$ | $\$23{,}000{,}000$ | $\$15{,}870{,}000$ | $69.0\%$ |
> | $2024$ | $\$27{,}600{,}000$ | $\$18{,}216{,}000$ | $66.0\%$ |
>
> Rates rose $+12\%$ effective $1/1/2023$ and $+12\%$ effective $1/1/2024$; exposures are flat. Management concludes the book is improving.
>
> Test the conclusion.
>
> > [!answer]-
> > With $1/1$ changes and uniform annual writings, each calendar year earns half at each level. Taking $2022$'s level as $1.000$, the average indices are $1.000$, $1.060$ and $1.187$; the current level is $1.2544$.
> >
> > On-level factors: $1.2544$, $1.1834$, $1.0567$.
> >
> > $$\begin{align*}
> > \text{OL EP}_{2022} &= \$25{,}088{,}000 \Rightarrow \text{LR} = 57.4\% \\
> > \text{OL EP}_{2023} &= \$27{,}218{,}000 \Rightarrow \text{LR} = 58.3\% \\
> > \text{OL EP}_{2024} &= \$29{,}165{,}000 \Rightarrow \text{LR} = 62.5\%
> > \end{align*}$$
> >
> > On a constant rate level the loss ratio has **deteriorated** by five points, not improved by six. The apparent improvement was the two rate increases masking loss trend running faster than the rate action.
> >
> > This is exactly why an indication is built on on-level premium and why reserving ELRs are adjusted for rate level: the raw loss-ratio series says the opposite of the truth.
