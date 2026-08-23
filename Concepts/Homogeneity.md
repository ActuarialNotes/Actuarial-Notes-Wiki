---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1ba734e4f7519fdb2ed50937edc6a8ede954cb21adbf5c96e9e0ebc6ceacdab4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Homogeneity.md
---

**Homogeneity** is the property of a group of risks whose expected loss costs are similar enough that their experience can be averaged into one rate — or projected with one development pattern — without material distortion.

> $$\text{Homogeneous if } E[\text{Loss Cost}_i] \approx E[\text{Loss Cost}_j] \text{ for all } i,j \text{ in the group}$$

- Homogeneity is always traded against [[Credibility]]. Splitting a book finer makes each group more alike but leaves each with less data; combining groups buys volume at the price of averaging together risks that genuinely differ. Every segmentation decision in ratemaking and reserving is a point on that curve.
- In **ratemaking**, a non-homogeneous class means systematic cross-subsidy: the better risks in the class are overcharged and leave (see [[Classification Ratemaking]]), while the worse risks stay — the adverse selection spiral that risk classification exists to prevent.
- In **reserving**, homogeneity is about the *emergence pattern* rather than the loss cost. Two coverages may have similar loss ratios and completely different reporting and settlement speeds; combining them into one triangle produces development factors that describe neither. See [[Reserving Data Organization]].
- Werner's criteria for evaluating a rating variable are **actuarial** (statistically significant, accurate, homogeneous within class, credible), **operational** (objective, verifiable, cheap to administer), **social** (privacy, causality, affordability, controllability) and **legal** — homogeneity is one requirement inside the actuarial criterion, not the whole test.
- Homogeneity is checked, not assumed: compare loss ratios, frequencies and severities across subgroups within a proposed class, and look for a consistent difference that persists across years.

![[Media/Figures/Homogeneity.svg|340]]

> [!example]- Testing a Class for Homogeneity {Example}
> A commercial auto class "light trucks" is rated at a single rate. Splitting it by radius of operation gives:
>
> | Subgroup | Earned exposures | Losses | Pure premium |
> |---|---|---|---|
> | Local (under $50$ mi) | $6{,}000$ | $\$3{,}600{,}000$ | $\$600$ |
> | Intermediate | $2{,}500$ | $\$2{,}125{,}000$ | $\$850$ |
> | Long haul | $1{,}500$ | $\$2{,}250{,}000$ | $\$1{,}500$ |
>
> Is the class homogeneous, and what should be done?
>
> > [!answer]-
> > $$\text{Class pure premium} = \frac{\$7{,}975{,}000}{10{,}000} = \$797.50$$
> >
> > Relativities to the class average: $0.75$, $1.07$ and $1.88$. Long-haul risks cost more than twice what local risks cost, so the class is **not homogeneous** — a single rate overcharges local operators by $25\%$ and undercharges long haul by $47\%$.
> >
> > The remedy is to introduce radius of operation as a rating variable. The subgroup volumes support it: even the $1{,}500$-exposure long-haul cell carries a difference far too large to be noise, and the relativities should be [[Credibility|credibility-weighted]] against the class average rather than used raw.
> >
> > If the insurer does not split the class, competitors that do will quote the local operators below its rate and take them, leaving it with the long-haul risks at an inadequate rate.

> [!example]- Homogeneity in a Reserving Segmentation {Example}
> An actuary must reserve a $\$30{,}000{,}000$ commercial package book. Property claims (60% of premium) close within a year; liability claims (40%) take six years. One combined triangle gives a $12$–$24$ factor of $1.28$.
>
> Is the combined triangle acceptable?
>
> > [!answer]-
> > No — for two reasons, and the second is the one that bites.
> >
> > First, $1.28$ describes neither coverage: property alone would be near $1.05$, liability near $1.60$. The blended factor is only correct while the **mix** stays exactly where it was.
> >
> > Second, that is precisely what will not hold. If the insurer grows the liability side to $55\%$ of premium, the true blended factor rises, but the historical triangle still reports $1.28$ — the estimate is now biased low, and nothing in the triangle reveals why. This is the [[Mix of Business|mix-of-business]] distortion.
> >
> > Split into property and liability triangles. Each is homogeneous in emergence pattern, each has enough volume to be credible at this premium size, and the blended answer falls out of the sum rather than being baked into the factors.
