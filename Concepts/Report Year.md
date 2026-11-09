---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:757b96195357deeeb44552bbe954b095d314454f536bf699cbe6a5a20c0b6136
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.42-43 (PDF pp.48-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.44 (PDF p.56), Ch. 6 p.93 (PDF p.105), Ch. 16 pp.313-318 (PDF pp.325-330), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Report Year.md
---

![[Media/Figures/Report_Year.svg|340]]

A **Report Year** of data is every claim reported to the insurer during a twelve-month period, regardless of when the loss occurred. Report year aggregation is like calendar-accident year aggregation, except that losses are grouped by the date the claim was reported instead of the date it occurred. A claim has no reported amount before its report year, and a claim reported after the year belongs to a later report year.

The time from a claim's accident date to its report date is its report lag. The time from its report date to its closure is its settlement lag. A report year's claims all have their report lag behind them, so only settlement lag remains.

> [!example]- A general liability loss occurs on 11/15/2023 and is reported on 2/3/2024. It is paid $\$20{,}000$ and closed on 9/1/2025. Which report year and which accident year does it belong to, and what are its report lag and settlement lag? {Example}
> - It was reported in 2024, so it belongs to report year 2024.
> - It occurred in 2023, so it belongs to [[Accident Year|accident year]] 2023, where at 12/31/2023 it was an unreported claim.
> - Its report lag is the 80 days from 11/15/2023 to 2/3/2024.
> - Its settlement lag is the 19 months from 2/3/2024 to 9/1/2025.

## Report year and claims-made coverage

A [[Claims Made Coverage|claims-made]] policy covers the claims reported during its policy period, regardless of when they occurred. With $L(Y, i)$ the losses reported in year $Y$ after a report lag of $i$ years and $N$ the maximum report lag, an annual claims-made policy written at the start of year $Y$ covers

> $$\text{Claims-Made Losses}(Y) = \sum_{i=0}^{N} L(Y, i)$$

An annual [[Occurrence Coverage|occurrence]] policy written at the start of year $Y$ covers the claims that occur in year $Y$, whenever they are reported:

> $$\text{Occurrence Losses}(Y) = \sum_{i=0}^{N} L(Y + i, i)$$

In a table of $L(Y, i)$ with a row for each report year and a column for each lag, a claims-made policy is a row and an occurrence policy is a diagonal. Report year aggregation therefore matches claims-made losses to the premium of the policy that covers them, and it is typically used for commercial lines written on claims-made policies, such as medical malpractice. The two triggers group the same claims differently, so claims-made and occurrence experience are not combined in one cohort. A claims-made policy also has a retroactive date, and it covers only claims that occur on or after that date.

> [!example]- A physician buys a claims-made policy for 2026 with a retroactive date of 1/1/2025. Which of these claims does it cover: one occurring in 2025 and reported in 2026, one occurring in 2026 and reported in 2026, and one occurring in 2026 and reported in 2027? {Example}
> - The 2025 accident reported in 2026 is covered, because it is reported in the policy period and occurred after the retroactive date.
> - The 2026 accident reported in 2026 is covered for the same reasons.
> - The 2026 accident reported in 2027 is not covered by the 2026 policy, because it is reported after the policy period. It falls to the policy in force in 2027.

## Report year development

The number of claims in a report year is fixed at the close of the year, apart from claims reported but not yet recorded. A report year therefore has no pure [[IBNR|IBNR]], and its development is only the development on known claims. That gives more stable data and more readily determinable development patterns than an accident year, whose claim count changes at each valuation. A report year triangle in which no claim develops past the last age observed needs no tail factor.

The same feature is its disadvantage. Pure IBNR is frequently the harder part of the unpaid claims to estimate, and a report year technique does not measure it, so other methods are needed for the pure IBNR of occurrence business. Report year data is also used to test the adequacy of case reserves on known claims over time. A technique that projects only known claims, such as the [[Case Outstanding Development Method|case outstanding development technique]], is suited to report year data and claims-made coverage for the same reason. Berquist and Sherman suggest substituting report year for accident year data when a dramatic shift in the social or legal climate makes claim severity correlate more with the report year than with the accident date.

## Average severity by report year

The average severity of a cohort at an age is

> $$\text{Average Reported Severity} = \frac{\text{Reported Losses}}{\text{Reported Claim Count}}$$

> $$\text{Average Paid Severity} = \frac{\text{Paid Losses}}{\text{Closed Claim Count}}$$

- The losses and counts are cumulative to the same age.

On a report year basis the reported claim count is fixed once the year closes, so a change in average reported severity is development on the same claims.

> [!example]- Report year 2024 has 820 claims, with reported losses of $\$6{,}150{,}000$ at 12 months and $\$7{,}380{,}000$ at 24 months. What is its average reported severity at each age, and what does the change measure? {Example}
> - At 12 months the average reported severity is $6{,}150{,}000/820 = \$7{,}500$.
> - No claim enters a report year after it closes, so the count is still 820 at 24 months.
> - At 24 months the average reported severity is $7{,}380{,}000/820 = \$9{,}000$.
> - The 20% increase is development on the same 820 claims, not a change in the claims counted.

> [!trap] Using report year data for occurrence reserves
> A report year triangle developed to ultimate gives the ultimate value of the claims already reported. On occurrence business, the claims that have occurred but not yet been reported are still missing. Add a separate estimate of pure IBNR, or use accident year data.
