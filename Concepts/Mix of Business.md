---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5af5e3dd49800cbbc29b2221bd61e38e9a7c206cc983e8bc95527572cc834963
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 44, 47 (classes of business; mix questions); Ch. 6 p. 75 (type of claims changing); Ch. 7 pp. 103-105 (changing product mix); Chs. 8-10 product-mix sections; Ch. 13 p. 283 (homogeneous groups); Ch. 15 p. 349, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p. 82 (distributional changes -> premium trend); Ch. 6 p. 110 (distributional changes affect frequency and severity), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mix of Business.md
---

![[Media/Figures/Mix_of_Business.svg|340]]

The **Mix of Business** is the distribution of an insurer's book across segments whose claims behave differently, such as lines, coverages, classes, territories, limits and deductibles. A book's results are a weighted average of its segments', so its combined expected claim ratio is

> $$\text{Expected Claim Ratio} = \sum_i w_i \times \text{Expected Claim Ratio}_i$$

- $w_i$ is segment $i$'s share of the premium, and $\text{Expected Claim Ratio}_i$ is segment $i$'s expected claim ratio.

The combined ratio moves with the weights as well as with the segments' own results. A shift in the mix changes the combined results even when no segment's own experience has changed. Given the weights and the combined ratio, one segment's ratio can be backed out from the others'.

> [!example]- Two territories have stable loss ratios of $80\%$ (urban) and $55\%$ (rural). The urban share of premium moves from $40\%$ to $70\%$. What happens to the overall loss ratio? {Example}
> - Before the shift, the overall loss ratio is $0.40 \times 80\%$ plus $0.60 \times 55\%$, or $65.0\%$.
> - After it, the overall loss ratio is $0.70 \times 80\%$ plus $0.30 \times 55\%$, or $72.5\%$.
> - Neither territory's experience changed, so the $7.5$-point rise is entirely the shift in mix.
> - The response is at the level of the territory relativities, not the overall rate level.

## Mix of business in reserving

Data combined for an estimate of unpaid claims should be homogeneous: segments combined should have similar development patterns, trends and growth rates, and a stable mix between them. Combining segments with different patterns distorts the age-to-age factors as soon as the mix shifts, because historical factors reflect the past mix. A rapidly growing segment, with exposures and claim counts rising faster than the rest, is kept separate.

In Friedland's example, commercial auto, which reports and pays more slowly, grows $30\%$ a year inside a book that was growing at $5\%$. The combined age-to-age factors rise as the slower segment's share grows, but they still fall short. Every technique on the combined data understates the unpaid claims, the expected claims and Bornhuetter-Ferguson techniques because their expected claim ratio was not raised for the segment with the higher ultimate claim ratio. A shift toward a faster-reporting segment does the reverse: factors from the older, slower mix are too high. The development technique applies them to a higher base of reported claims, which magnifies the overstatement.

Analyzing segments separately lets a change in frequency, severity, settlement rate or case adequacy be attributed to the segment where it happens, instead of being masked. A shift toward larger risks or higher limits shows as the average severity rising down each column, and splitting the triangles shows whether one part of the book drives it. When small claims settle faster and large claims later, the data are split by size of loss and each part is developed separately. Higher deductibles slow development, since a larger share of the loss comes from large claims that settle later. A paid ALAE-to-paid claims ratio from the old mix may no longer apply to the new one.

> [!example]- A combined package triangle is $70\%$ property, with a $12$-to-$24$ factor of $1.05$, and $30\%$ liability, with $1.60$. Four years later the mix is $45\%$ property and $55\%$ liability. What are the combined factors, and what does an all-year average miss? {Example}
> - At the old mix the combined factor is $0.70 \times 1.05$ plus $0.30 \times 1.60$, or $1.215$.
> - At the new mix it is $0.45 \times 1.05$ plus $0.55 \times 1.60$, or $1.353$.
> - An average of the years between lands between the two, too low for the current year, the one it is applied to.
> - Splitting the triangle by coverage gives each segment its own factor, and the combined result at the current mix.

## Mix of business in ratemaking

Premium at current rate level excludes rate changes, so a change in average premium then comes from the characteristics of the business: a shift toward lower-premium classes or territories, or insureds choosing higher deductibles or lower limits. That is premium trend. A comparison of average premiums across companies is distorted by their differences in mix, such as risk profiles, limits, deductibles and underwriting guidelines. A competitor's trend reflects its own mix, underwriting, policy forms and claims handling, so it may not apply to the company's book. A large rate increase relative to competitors lowers the retention ratio and the close ratio, shrinking volume, while improving the loss ratio on the business retained.
