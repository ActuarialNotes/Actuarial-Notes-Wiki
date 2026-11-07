---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:19f10e2d1a363bf97bfa9e55a15c263c83689769cbfd1661d00867fd385c715b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 72-79 (PDF pp. 84-91), Current Rate Level: parallelogram method Steps 1-6, Tables 5.18-5.21, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/On Level Premium.md
---

![[Media/Figures/On_Level_Premium.svg|340]]

**On-Level Premium** is historical earned premium restated as though every policy had been written at the rate level currently in effect. It makes loss ratios from different years comparable, and it is the denominator of the [[Loss Ratio Method|loss ratio method]] indication. A year's on-level premium is

> $$\text{On-Level Premium} = \text{Historical EP} \times \text{On-Level Factor}$$

> $$\text{On-Level Factor} = \frac{\text{Current cumulative rate level index}}{\text{Average rate level index for the period}}$$

- $\text{Historical EP}$ is the year's earned premium at the rates actually charged.
- The current cumulative rate level index is the product of $1 +$ each rate change to date.
- The *average* index for a year is the earned-premium-weighted blend of the levels in force during that year.

Rate level indices **compound**: successive changes of $+8\%$ and $+5\%$ give a cumulative index of $1.08 \times 1.05 = 1.134$, not $1.13$. The weights of the average index come from the [[Parallelogram Method|parallelogram method]], while [[Extension of Exposures|extension of exposures]] re-rates each policy directly and needs no weights. Each year of the experience period gets its own on-level factor.

> [!example]- Rates changed $+8\%$ on $1/1/2022$, $+5\%$ on $7/1/2023$ and $-3\%$ on $1/1/2025$, each for policies written on or after the date. What is the on-level factor for a calendar year earned entirely at the 2022 level? {Example}
> - With the level before 2022 at $1.0000$, the indices are $1.0800$, then $1.0800 \times 1.05 = 1.1340$, then $1.1340 \times 0.97 = 1.1000$.
> - The current index is $1.1000$, after the last change.
> - The year's average index is $1.0800$.
> - The on-level factor is $1.1000/1.0800 = 1.0185$.
> - A year written at a higher level than today's, such as one at $1.1340$, gets a factor below one, $1.1000/1.1340 = 0.9700$.

## On-level premium in the indication

A loss ratio on historical premium mixes the rate levels of past years. On-level premium puts every year at today's rate level, so the loss ratios measure today's rates. On-leveling adjusts for **rate changes only**. Drift in average premium from changing amounts of insurance, limits, deductibles or mix is [[Premium Trend|premium trend]], a separate adjustment.

The [[Pure Premium Method]] needs no on-leveling at all, because it never divides by premium. That is its principal practical advantage where rate history is messy or the book has been re-tiered.

> [!example]- Rates rose 10% on $1/1/2024$, with annual policies written uniformly. Earned premium was $\$10{,}000{,}000$, $\$10{,}500{,}000$ and $\$12{,}000{,}000$ in 2022 to 2024, and ultimate losses $\$7{,}200{,}000$, $\$7{,}560{,}000$ and $\$7{,}920{,}000$. The permissible loss ratio is 65%. What is the indication with and without on-leveling? {Example}
> - The average indices are $1.000$ for 2022 and 2023, and $0.5(1.000) + 0.5(1.100) = 1.050$ for 2024.
> - The on-level factors are $1.100$, $1.100$ and $1.100/1.050 = 1.0476$.
> - The on-level premiums are $\$11{,}000{,}000$, $\$11{,}550{,}000$ and $\$12{,}571{,}429$, a total of $\$35{,}121{,}429$.
> - The on-level loss ratio is $22{,}680{,}000/35{,}121{,}429 = 64.6\%$, an indication of $0.6458/0.65 - 1 = -0.7\%$.
> - Without on-leveling, the loss ratio is $22{,}680{,}000/32{,}500{,}000 = 69.8\%$, an indication of $+7.4\%$.
> - The unadjusted indication asks again for the 10% increase the insurer already took.

> [!trap] Leaving out a change made after the experience period
> The numerator is the current index, not the last index inside the experience period. In the first example, stopping at $1.1340$ gives a 2022 factor of $1.0500$ instead of $1.0185$, on-leveling to rates no longer charged.
