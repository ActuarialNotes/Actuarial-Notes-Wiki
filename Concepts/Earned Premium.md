---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:2b77fb6e204a6780b1a2cf0539dacd74417a5947f79ebc2b20d5792a9148dd41
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.9 (PDF p.21); Ch. 4 p.56 (PDF p.68); Ch. 5 pp.64, 68-72 (PDF pp.76, 80-84), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earned Premium.md
---

**Earned Premium** is the portion of premium corresponding to coverage the insurer has actually provided — the premium it has earned the right to keep, recognized pro rata as the policy term elapses.

> $$\text{Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$

> $$\text{EP for one policy} = \text{Full premium} \times \frac{\text{days elapsed}}{\text{policy term}}$$

- Earned premium is the usual denominator of a [[Loss Ratio|loss ratio]] — Werner & Modlin: "typically, the ratio uses total reported losses and total earned premium" — because it is the premium for the coverage already provided, the coverage under which the losses arose. Pairing losses with [[Written Premium|written premium]] flatters a growing book and penalizes a shrinking one.
- **Calendar year** earned premium blends policy cohorts: CY 2024 earned premium comes from policies written in both $2023$ and $2024$, at whatever rates were then in force. That is why it must be brought to current level ([[On-Leveling]]) before use.
- **Policy year** earned premium comes from one cohort only, and is fully earned $24$ months after the policy year begins (for annual policies).
- Earning is pro rata *by default*, but the pattern must match the exposure. Werner & Modlin note that an even earning pattern does not hold for lines such as warranty, or for lines with seasonal writings such as boat owners insurance, and actuaries specify other earning patterns for them from historical experience.
- The premium the ratemaking analysis actually uses is historical earned premium after three successive adjustments, each addressing a different distortion: brought to the **current rate level** ([[On-Leveling]]) for rate changes during and after the experience period, **developed to ultimate** where it is still changing (incomplete policy years, premium awaiting audit), and **trended** for the change in average premium from shifts in the mix of business ([[Premium Trend]]).
- **Statutory revenue recognition:** In a U.S. insurer's statutory statements, SSAP No. 53 recognizes premium as earned by the daily pro rata or monthly pro rata method, because the exposure under most property-casualty policies does not vary much over the term; where the period of risk differs significantly from the contract period, premium is earned in proportion to the protection provided. Revenue is recognized only as the underwriting earnings process is completed, which is the NAIC's recognition concept ([[Premium Accounting]]).

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
> > Earned premium lags written premium by $\$3{,}000{,}000$ — exactly the growth in the unearned reserve, and exactly the amount by which written premium would overstate the denominator of the loss ratio.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The revenue recognition objective asks how much of a policy's premium is earned in a period. Expect a policy written partway through a year, possibly with a mid-term endorsement or cancellation, and a question asking for the earned premium in each calendar year.
> - **Exam 5:** Ratemaking questions build calendar year and policy year earned premium for a book and bring it to current rate level.

> [!warning]- Exam traps
> - **Earned is not collected:** Premium earns with the passage of time, whether or not the insured has paid it.
> - **Monthly pro rata assumes mid-month:** A one-year policy written in January is $23/24$ earned by December 31 under the monthly method, not $12/12$.
> - **Calendar year mixes cohorts:** Calendar year earned premium includes the unearned premium carried in from the prior year's writings.
