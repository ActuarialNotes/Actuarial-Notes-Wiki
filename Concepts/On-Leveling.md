---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:9a171a0ae3715920088313ab3d5bffdc2dd2df23c75677d92a0896198dcb5571
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.71-80 (PDF pp.83-92); Ch. 5 p.82 (PDF p.94); Ch. 6 p.100 (PDF p.112), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/On-Leveling.md
---

![[Media/Figures/On-Leveling.svg|340]]

**On-Leveling** is the procedure that restates historical earned premium to the current rate level, producing [[On Level Premium|on-level premium]]. Werner & Modlin give two methods. The [[Parallelogram Method|parallelogram method]] works from aggregate premium and the dates of past [[Rate Change|rate changes]], and [[Extension of Exposures|extension of exposures]] re-rates every historical policy under the current manual. A year's premium is brought to the current rate level by

> $$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Average index for the year}}$$

- The current cumulative index is the rate level index after every rate change to date, including changes after the experience period.
- The average index for the year is the earned-premium-weighted average of the rate level indices in force during the year.

On-leveling handles rate changes only, law-mandated ones included. Changes in the average premium from distributional shifts in the business written are [[Premium Trend|premium trend]], and the effect of a coverage or benefit-level change on losses is a separate adjustment on the loss side.

> [!example]- Rates increased 12% for policies written on or after $7/1/2023$. Policies are annual, premium is written uniformly, and there have been no other changes. What are the on-level factors for Calendar Years 2023 and 2024? {Example}
> - With the pre-change index at $1.000$, the current index is $1.120$.
> - In 2023 the new level earns a triangle of $\tfrac{1}{2}(0.5)^2 = 0.125$ of the year's premium.
> - The 2023 average index is $0.875(1.000) + 0.125(1.120) = 1.0150$, so its on-level factor is $1.120/1.0150 = 1.1034$.
> - In 2024 the old level still earns the complementary triangle, $0.125$.
> - The 2024 average index is $0.125(1.000) + 0.875(1.120) = 1.1050$, so its on-level factor is $1.120/1.1050 = 1.0136$.
> - Calendar year $2025$ would be fully at the new level, with an on-level factor of $1.000$.

## Annual policies written uniformly

A calendar year is a unit square whose horizontal axis is calendar time and whose vertical axis is the fraction of the policy term elapsed. A rate change effective on date $d$ enters as a diagonal line, and each region's **area** is the share of the year's earned premium written at that rate level. For **annual** policies written uniformly, a rate change effective a fraction $p$ of the way through a year earns, in that same year, a triangle of area

> $$A_{\text{new}} = \tfrac{1}{2}(1 - p)^2$$

- $p$ is the fraction of the calendar year elapsed when the change takes effect.

So a $7/1$ change affects only $0.125$ of that year's earned premium, and a $1/1$ change affects $0.500$. A single mid-year change takes two calendar years to work through earned premium.

## Rate changes applied to policies in force

If the rate change applies to **in-force** policies rather than only to new and renewal business, it takes effect immediately across the whole book. Werner & Modlin's case is a change mandated by law. It is drawn as a **vertical** line rather than a diagonal one, and the share of a calendar year at the new level is simply $1 - p$. The on-level factor is still the current cumulative index over the year's average index.

> [!example]- A law change cuts rates 5% on all policies in force from $7/1/2024$. What share of Calendar Year 2024 earned premium is at the new level, and what is its on-level factor? {Example}
> - The change is a vertical line at $p = 0.5$, so half the year's earned premium is at the new level.
> - With the old index at $1.000$, the current index is $0.950$.
> - The average index is $0.5(1.000) + 0.5(0.950) = 0.975$.
> - The on-level factor is $0.950/0.975 = 0.9744$.

## Choosing a method

The parallelogram method's assumptions are its weaknesses: premium written **uniformly** through the year, a **single** policy term, and rate changes applied uniformly to all risks. Seasonal writing breaks the first, as with Werner & Modlin's boat owners policies, bought before the boating season. Because the method applies the overall average change, where the rate changes varied by class the on-level premium is unusable for classification ratemaking.

**Extension of exposures** has none of those assumptions. It re-rates each historical policy at today's rates, so it automatically captures differences by class and the historical mix of business. Its cost is data: policy-level detail for every historical year, and a rating engine that still knows the old policies' characteristics.

> [!example]- A crop insurer writes 80% of its annual policies in March and the rest through the year. It took a +15% rate change effective $7/1/2024$. Should it on-level Calendar Year 2024 with the parallelogram method? {Example}
> - The parallelogram method assumes premium is written uniformly, and this book's is not.
> - It would put $0.125$ of 2024's earned premium at the new level, when only the small share of policies written after $7/1$ is.
> - Extension of exposures re-rates the historical policies at current rates, at the cost of policy-level data.
> - Alternatively, the parallelogram method can be run by quarter or month, or the geometric areas replaced by the actual distribution of writings by rate level group.

> [!trap] Using the index at the end of the experience period
> The numerator is the current index, after every change to date. If rates rose a further 5% after the experience period, the 2023 factor in the first example becomes $1.176/1.0150 = 1.1586$, not $1.1034$.
