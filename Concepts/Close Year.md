---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:043a3b4fa6921fcd1f68763f387954e6581182a139503d1c848da2674b94ea59
  sources: []
  open_findings: 0
  log: .verify/Concepts/Close Year.md
---

**Close Year** is a data aggregation method that groups claims by the calendar year in which they were finally *settled and closed*, regardless of when the loss occurred, when it was reported, or when partial payments were made.

> $$\text{Settlement lag} = \text{Close date} - \text{Accident date}$$

- A close-year cohort is **complete and fully developed the moment it closes** — a settled claim has no further development — which makes closed-claim data the only loss data that needs no [[Loss Development|development]] at all.
- The trade-off is severe selection bias: within any recent accident year the claims that close first are the small, simple ones. Closed-claim severity therefore **understates** ultimate severity, and the bias is worst in the [[Long Tail Lines|long-tail lines]] where the expensive claims litigate for years.
- Close year is rarely a ratemaking basis. Its real work is **operational**: measuring the [[Settlement Rate|disposal rate]] (claims closed as a share of claims reported), claim-department throughput, and the average cost of a closed claim.
- Those same closed-claim counts drive the [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment and the disposal-rate variant of the [[Frequency-Severity Method]], where a triangle of *closed* counts is used to restate paid losses onto a common settlement pattern.
- A shift in closing speed is one of the operational changes an actuary must probe (Friedland Ch. 4): faster closing inflates historical paid development factors, slower closing deflates them — see [[Claims Processing Changes]].

![[Media/Figures/Close_Year.svg|340]]

> [!example]- One Claim Under Four Aggregation Bases {Example}
> An auto liability claim arises from an accident on $3/10/2022$ under a policy effective $9/1/2021$. It is reported $4/1/2022$, litigated, and settled $9/14/2024$.
>
> Assign the claim under each basis.
>
> > [!answer]-
> > | Basis | Year |
> > |---|---|
> > | [[Policy Year]] | 2021 |
> > | [[Accident Year]] | 2022 |
> > | [[Report Year]] | 2022 |
> > | **Close Year** | **2024** |
> >
> > The claim sits in a $2022$ development triangle for two and a half years, moving along the row as case reserves are revised, and only leaves the inventory in $2024$. Close year is the only basis that cannot be assigned until the claim is finished — which is why it is useless for a current-year rate indication and useful for measuring how long claims take.

> [!example]- Closed-Claim Severity Understates Ultimate Severity {Example}
> For accident year 2023, $1{,}000$ claims were reported. At $24$ months, $700$ are closed for total payments of $\$3{,}500{,}000$; the $300$ open claims carry case reserves of $\$4{,}200{,}000$.
>
> Compare average closed severity to the implied ultimate severity, ignoring further development.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Avg closed claim} &= \frac{\$3{,}500{,}000}{700} \\
> > &= \$5{,}000 \\[4pt]
> > \text{Avg open claim} &= \frac{\$4{,}200{,}000}{300} \\
> > &= \$14{,}000 \\[4pt]
> > \text{Avg reported claim} &= \frac{\$7{,}700{,}000}{1{,}000} \\
> > &= \$7{,}700
> > \end{align*}$$
> >
> > Closed claims average $\$5{,}000$ against $\$7{,}700$ on a reported basis — and the reported figure is itself understated, since case reserves on litigated claims typically develop upward.
> >
> > Pricing off closed-claim severity would understate the loss cost by roughly a third. The valid use of the $\$5{,}000$ figure is as a *diagnostic*: compare it across accident years at the same disposal rate to detect a real change in claim cost, rather than a change in what has closed so far.
