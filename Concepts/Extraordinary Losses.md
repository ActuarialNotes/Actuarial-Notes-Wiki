---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c0f38776b95c833d75de78b2e345c7f354c5ecc1617e3494ee189c99e93975d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Extraordinary Losses.md
---

**Extraordinary Losses** are losses too rare and too large to be priced from a few years of experience — individual **shock losses** and **catastrophes**. In ratemaking they are removed from the historical data and replaced with a provision based on a long-term view, so that rates reflect their expected cost without jumping after a bad year and falling after a quiet one.

> $$\text{ELF} = 1 + \frac{\sum \text{Excess losses}}{\sum \text{Non-excess losses}}$$

> $$\text{PP} = \text{PP}_{\text{capped, non-cat}} \times \text{ELF} + \text{PP}_{\text{cat}}$$

- **Shock losses** are single high-severity claims — Werner's examples are a large multi-claimant liability claim, a total loss on an exceptionally valuable home, and the total permanent disability of a young worker. Each claim is capped at a threshold (the **non-excess** loss); the portion above it is **excess**. The excess loss factor (ELF) is the long-run ratio of excess to non-excess losses, applied to each year's capped losses. See [[Large Loss]].
- **Choosing the threshold** balances keeping as much actual experience as possible against removing volatility: the basic limit (the indication then assumes everyone buys the basic limit, and for a loss ratio indication premium is restated to basic limits too — higher limits are priced with [[Increased Limits|ILFs]]), a percentile of the size-of-loss distribution such as the 99th, or for property a percentage of the amount of insurance.
- **Choosing the period:** long enough to be stable, not so long the data are irrelevant — Werner contrasts about ten years for a medium-sized homeowners insurer's large fire losses with twenty for a small personal umbrella writer. Ideally the procedure censors *trended* losses, or indexes the threshold, since layers above a fixed threshold inflate faster.
- **Catastrophes** are events that produce a large number of claims — hurricanes, tornadoes, hail, earthquakes, wildfires, winter storms, explosions, oil spills, some terrorist attacks. Werner cites the ISO Property Claim Services definition: at least $\$25$ million of direct insured property loss affecting a significant number of policyholders and insurers. See [[Catastrophe Loss]].
  - *Non-modeled* perils that recur over decades (hail for auto comprehensive): a 10–30 year ratio of catastrophe to non-catastrophe losses, or catastrophe losses to exposures or amount-of-insurance years, applied to projected values.
  - *Modeled* perils too sporadic for any history (hurricane, earthquake): the [[Catastrophe Modelling|catastrophe model]]'s expected annual loss for the current exposure.
- **Order of adjustments:** a modeled provision is already at future cost and ultimate value, so add it to non-catastrophe losses *after* those are developed and trended — adding it before over-adjusts it. Catastrophes are also excluded from [[Loss Trend|trend]] data, and extraordinary losses from the data used to select development factors. Removing extraordinary losses without adding a provision back understates the rate.

> [!example]- An Excess Loss Factor from Twelve Years {Example}
> A liability line's reported losses over twelve years total $\$600{,}000{,}000$, including $30$ claims above the $\$500{,}000$ threshold with ground-up value $\$27{,}000{,}000$. The latest accident year's reported losses are $\$52{,}000{,}000$, including two shock losses of $\$2{,}400{,}000$ and $\$1{,}100{,}000$.
>
> Compute the excess loss factor and the latest year's adjusted losses.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Excess} &= \$27{,}000{,}000 - 30 \times \$500{,}000 \\
> > &= \$12{,}000{,}000 \\
> > \text{Non-excess} &= \$600{,}000{,}000 - \$12{,}000{,}000 \\
> > &= \$588{,}000{,}000 \\
> > \text{ELF} &= 1 + 12 / 588 = 1.0204
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Latest excess} &= \$1{,}900{,}000 + \$600{,}000 \\
> > &= \$2{,}500{,}000 \\
> > \text{Non-excess} &= \$52{,}000{,}000 - \$2{,}500{,}000 \\
> > &= \$49{,}500{,}000 \\
> > \text{Adjusted} &= \$49{,}500{,}000 \times 1.0204 \\
> > &= \$50{,}509{,}800
> > \end{align*}
> > $$
> >
> > The raw $\$52{,}000{,}000$ would overstate the year by $2.9\%$ because it happened to contain two shock losses; a year with none would be *loaded* up to its long-run level by the same factor.

> [!example]- Building a Homeowners Pure Premium with Two Catastrophe Provisions {Example}
> Developed and trended non-catastrophe pure premium is $\$620$. Over $25$ years, hail losses (trended) averaged $\$0.21$ per $\$1{,}000$ of amount-of-insurance years; the projected average amount of insurance is $\$400{,}000$. The hurricane model gives an expected annual loss of $\$1{,}800{,}000$ on $20{,}000$ house-years at the forecast cost level.
>
> Compute the pure premium. What goes wrong if the hurricane provision is added before a $1.13$ trend-and-development factor?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Hail PP} &= \$0.21 \times 400 = \$84 \\
> > \text{Hurricane PP} &= \$1{,}800{,}000 / 20{,}000 = \$90 \\
> > \text{Total PP} &= \$620 + \$84 + \$90 \\
> > &= \$794
> > \end{align*}
> > $$
> >
> > The hail provision rests on a long history because hail recurs often enough to be measured; the hurricane provision comes from a model because thirty years of history may not contain the storm that matters.
> >
> > The model output is already at the future cost level and ultimate. Adding it to the historical losses *before* the $1.13$ factor would turn $\$90$ into $\$101.70$ — an over-adjustment of $\$11.70$ per house-year, or $1.5\%$ of the pure premium.
