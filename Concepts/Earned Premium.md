---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9ed14f2a703be881b67d455725cdd5c98964401545c7dc99c937cc988231f9cc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earned Premium.md
---

**Earned Premium** is the portion of premium corresponding to coverage the insurer has actually provided — the premium it has earned the right to keep, recognized pro rata as the policy term elapses.

> $$\text{Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$

> $$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy term}}$$

- Earned premium is the correct denominator for a [[Loss Ratio|loss ratio]] and for any rate indication, because it covers the same period as the losses in the numerator. Pairing losses with [[Written Premium|written premium]] flatters a growing book and penalizes a shrinking one.
- **Calendar year** earned premium blends policy cohorts: CY 2024 earned premium comes from policies written in both $2023$ and $2024$, at whatever rates were then in force. That is why it must be brought to current level ([[On-Leveling]]) before use.
- **Policy year** earned premium comes from one cohort only, and is fully earned $24$ months after the policy year begins (for annual policies).
- Earning is pro rata *by default*, but the pattern must match the exposure. Warranty, crop and some construction covers earn on a non-uniform schedule because risk is not uniform over the term.
- The premium the ratemaking analysis actually uses is earned premium **at current rate level, trended** — three successive adjustments, each addressing a different distortion: mix of rate levels, then the drift in average premium per exposure ([[Premium Trend]]).

![[Media/Figures/Earned_Premium.svg|340]]

> [!example]- Earning a Single Policy {Example}
> A homeowners policy with an annual premium of $\$1{,}200$ is written effective $10/1/2024$.
>
> How much is earned by $12/31/2024$, and what happens in $2025$?
>
> > [!answer]-
> > The policy is in force for three of its twelve months during $2024$:
> >
> > $$\text{CY 2024 EP} = \$1{,}200 \times \frac{3}{12} = \$300$$
> >
> > The remaining $\$900$ sits in the [[Unearned Premium|unearned premium reserve]] at $12/31/2024$ and earns during $2025$:
> >
> > $$\text{CY 2025 EP} = \$1{,}200 \times \frac{9}{12} = \$900$$
> >
> > Both calendar years draw on one written premium transaction of $\$1{,}200$ booked in $2024$.

> [!example]- Calendar Year Earned Premium for a Book {Example}
> An insurer writes annual policies uniformly through the year:
>
> | Year | Written premium |
> |---|---|
> | $2023$ | $\$24{,}000{,}000$ |
> | $2024$ | $\$30{,}000{,}000$ |
>
> Compute CY 2024 earned premium, and verify with the unearned premium reserve.
>
> > [!answer]-
> > With uniform writing of annual policies, each calendar year earns half its own writings and half the prior year's:
> >
> > $$\begin{align*}
> > \text{CY 2024 EP} &= 0.5(\$30{,}000{,}000) + 0.5(\$24{,}000{,}000) \\
> > &= \$27{,}000{,}000
> > \end{align*}$$
> >
> > Checking against the reserve: the UEP at any year end is half of that year's writings, so
> >
> > $$\begin{align*}
> > \text{UEP}_{12/31/2023} &= \$12{,}000{,}000 \\
> > \text{UEP}_{12/31/2024} &= \$15{,}000{,}000 \\[4pt]
> > \text{EP} &= \$30{,}000{,}000 - (\$15{,}000{,}000 - \$12{,}000{,}000) \\
> > &= \$27{,}000{,}000 \;\checkmark
> > \end{align*}$$
> >
> > Earned premium lags written premium by $\$3{,}000{,}000$ — exactly the growth in the unearned reserve, and exactly the amount by which a written-premium loss ratio would understate the true one.
