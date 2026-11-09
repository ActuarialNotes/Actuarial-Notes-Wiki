---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:cae8af410201baad2b83c9ac147635bf26f5c9c48fdc135fb7c9abc8e6670696
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.5 pp.54-57, 61 (PDF 60-63, 67); Ch.7 pp.96-97 (PDF 102-103); Ch.13 p.283 (PDF 289), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Development Triangle.md
---

![[Media/Figures/Development_Triangle.svg|340]]

A **Development Triangle** is a table of how the value of each cohort of claims changes over time, with cohorts as rows, ages as columns and valuation dates as diagonals. The cohorts are usually [[Accident Year|accident years]], and the age, or maturity, is counted in months from the start of the cohort to the valuation date. A cumulative value is the incremental values to its left added up, so

> $$C_{\text{AY},\,n+1} = C_{\text{AY},\,n} + I_{\text{AY},\,n+1}$$

- $C_{\text{AY},n}$ is the cumulative value of accident year AY at age $n$, such as its paid claims through that age.
- $I_{\text{AY},n+1}$ is the incremental value of accident year AY in the period from age $n$ to age $n+1$.
- At the first age the cumulative and incremental values are the same.

The triangle is triangular because a $2024$ accident year cannot yet have a $36$-month valuation. Accident year 2021 is 12 months old at $12/31/2021$ and 48 months old at $12/31/2024$.

> [!example]- What does this triangle of cumulative reported claims show along a row, down a column and along its latest diagonal? {Example}
> The claims are in thousands of dollars, valued at $12/31/2024$:
>
> | AY | 12 | 24 | 36 | 48 |
> | --- | --- | --- | --- | --- |
> | 2021 | 2,000 | 3,000 | 3,450 | 3,588 |
> | 2022 | 2,200 | 3,300 | 3,795 | |
> | 2023 | 2,600 | 3,900 | | |
> | 2024 | 3,100 | | | |
>
> - Along the 2021 row the claims grow by factors of $3{,}000/2{,}000 = 1.500$, then $1.150$, then $1.040$, so development slows with age.
> - Down the 12-month column the claims grow 10%, 18% and 19% a year, so exposure or cost level is rising, and only the exposures or claim counts can say which.
> - The latest diagonal holds 3,588, 3,795, 3,900 and 3,100, and its factors of $1.040$, $1.150$ and $1.500$ match those of earlier years.
> - Nothing unusual happened in calendar year 2024.

## Rows, columns and diagonals

Each of the three directions says something different:

1. **A row** is one cohort, a fixed group of claims, and shows how it develops.
2. **A column** is one age, so reading down a column compares successive cohorts at the *same* maturity. A change down a column is a change in cost level, [[Mix of Business|mix]] or volume.
3. **A diagonal** is one valuation date, so the change from one diagonal to the next shows everything that happened in one calendar period. A change in [[Case Adequacy|case adequacy]], in [[Settlement Rate|settlement speed]] or in [[Inflation|inflation]] shows on the diagonals and reaches every accident year at once.

> [!example]- In a reported triangle, the age-to-age factors on the latest diagonal are 1.67 at 12 to 24 months, 1.29 at 24 to 36 months and 1.19 at 36 to 48 months. The averages of the earlier factors in those columns are 1.49, 1.16 and 1.06. What should the actuary conclude? {Example}
> - Each latest factor is about 12% above its column's history: $1.67/1.49 = 1.121$, $1.29/1.16 = 1.112$ and $1.19/1.06 = 1.123$.
> - A lift of the same size at every age on one diagonal is a calendar year effect, not a change in any one accident year.
> - The likely causes are a strengthening of case outstanding, an inflation or legal shock, or a change in claims handling, and the average case outstanding, paid and closed count triangles decide among them.
> - Averaging the elevated factors into the selections would be wrong. That applies a one-time level shift as though it were an ongoing pattern, and over-states every future year's development.

## Incremental and cumulative triangles

An incremental triangle holds what was paid or reported for each cohort in each calendar period, and the cumulative triangle is the running sum of the incremental cells along each row. Each payment goes in the row of its accident year and the column of the period it was made in, and a claim enters the triangle only once it is reported. The incremental cells on one diagonal add up to the calendar year's amount: each accident year's latest cumulative value minus its value on the previous diagonal, with the newest accident year's first value counted in full.

## Development from one age to the next

The development of a column into the next is measured by [[Age to Age Factor|age-to-age factors]]. Over the accident years that have both ages, the volume-weighted age-to-age factor from age $n$ to age $n+1$ is

> $$f_{n \to n+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,n+1}}{\sum_{\text{AY}} C_{\text{AY},\,n}}$$

- The sums run over the same accident years in the numerator and the denominator.

> [!example]- Using the reported triangle above, what is the volume-weighted factor from 12 to 24 months? {Example}
> - Accident years 2021 to 2023 have both ages.
> - At 24 months their claims add up to $3{,}000 + 3{,}300 + 3{,}900 = 10{,}200$.
> - At 12 months the same years add up to $2{,}000 + 2{,}200 + 2{,}600 = 6{,}800$.
> - The factor is $10{,}200/6{,}800 = 1.500$.

## Types of development triangles

The same claims are put in several triangles: [[Paid Losses|paid claims]], case outstanding, [[Incurred Losses|reported claims]], [[Claim Count Triangle|claim counts]] (reported, closed and open), [[Allocated Loss Adjustment Expense|ALAE]] and recoveries. Triangles of ratios and averages are built from them, such as paid-to-reported claims, closed-to-reported counts, average case outstanding and claims to earned premium. The *comparison* between them is where the diagnostics live: paid-to-reported ratios, average case outstanding, closure rates ([[Data Diagnostic Analysis|diagnostic triangles]]).

## Choosing the time interval

Triangles may be annual, semi-annual or quarterly. Finer periods are more responsive and show seasonality. They also thin the data and multiply the factors to select. Friedland names the credibility of the experience and the stability of development as the considerations.

An annual cohort is comparable with the years before it only if its claims are spread through the year in the same way. A cumulative factor for an accident year at 12 months is in effect an average of the factors for its accident months, from January at 12 months to December at 1 month. When exposures grow during a year, its average accident date is later, so it is less mature at each age than the history its factors came from, and those factors understate its ultimate. Berquist and Sherman substitute accident quarters for accident years when the growth rate of earned exposures changes markedly.

## Assumptions behind a development triangle

Projecting from a triangle assumes that each cohort develops in a similar pattern, that the pattern is stable over time and that the mix inside each cohort is comparable. Every distortion of a development projection is one of these failing.
