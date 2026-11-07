---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:91a109101fc499b6a9a7307a3f14883471bdeb16954ec78f717675c74adc22ed
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.2 (PDF p.14) and Ch. 4 pp.51-56 (PDF pp.63-68), incl. Table 4.1 and footnote 8, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earned Exposure.md
---

![[Media/Figures/Earned_Exposure.svg|340]]

An **Earned Exposure** is the portion of a policy's written [[Exposure Base|exposure]] for which coverage has already been provided. A policy's written exposure is its number of insured units times its term in years, so one car insured for twelve months is one car-year and for six months is one-half of a car-year. When exposure is earned evenly over the term, a policy's earned exposure in a period is

> $$\text{Earned Exposure} = \text{Written Exposure} \times \frac{\text{Time in Force in the Period}}{\text{Policy Term}}$$

- $\text{Written Exposure}$ is the policy's exposure for its whole term, counted when it is written.
- $\text{Time in Force in the Period}$ is the part of the policy's term that falls in the period.
- $\text{Policy Term}$ is the length of the policy's whole term, in the same unit.

The earned and unearned exposures of a policy add up to its written exposure, and over its life its earned exposures in successive periods add up to its written exposure. Earned exposures are the denominator of the [[Pure Premium|pure premium]] and of [[Frequency|frequency]], so they cover the same period as the losses.

> [!example]- An insurer writes 100 annual auto policies on the first of each month of 2024 and wrote nothing before. How many car-years does it earn in calendar year 2024? {Example}
> - The January policies are in force for 12 of their 12 months in 2024, the February policies for 11, and so on down to 1 for the December policies.
> - The earned exposure is $100 \times (12 + 11 + \cdots + 1)/12 = 100 \times 78/12 = 650$ car-years.
> - The written exposure is 1,200 car-years, so 550 car-years are still unearned at 12/31/2024.

## Calendar year and policy year earned exposures

Written exposure belongs to the period in which the policy is written. A mid-term change, such as a cancellation or an added car, adds or subtracts exposure in proportion to the remaining term, in the calendar year of the change. Earned exposure is aggregated in two ways:

- **Calendar year** earned exposure is the exposure earned during the year, on every policy in force, whenever it was written.
- **Policy year** earned exposure is the exposure earned to the evaluation date on the policies written in the year, including what is earned after the year ends.

> [!example]- An insurer writes annual policies evenly through each year: 10,000 car-years in 2023 and 12,000 in 2024. Its accident year 2024 losses are $\$4{,}500{,}000$. What is its 2024 pure premium? {Example}
> - With annual policies written evenly, a calendar year earns half its own writings and half the prior year's.
> - The calendar year 2024 earned exposure is $0.5 \times 12{,}000 + 0.5 \times 10{,}000 = 11{,}000$ car-years.
> - The pure premium is $4{,}500{,}000/11{,}000 = \$409.09$ per car-year.

## Uniform writings and the average written date

When policies are written evenly through a period, they can be treated as all written on the period's average written date, its midpoint. Each is then earned evenly over the term that follows that date, and the share earned in a calendar year is the part of that term inside the year. This is the assumption of the [[Parallelogram Method|parallelogram method]], so it does not apply when writings are uneven or the actual policy dates are known.

> [!example]- An insurer writes six-month policies evenly through each year: 2,000 car-years in 2023 and 2,400 in 2024. What is its calendar year 2024 earned exposure? {Example}
> - Policies written in the first half of a year expire within it, and those written in the second half run into the next year.
> - Averaged over the year, 75% of a year's six-month writings are earned in the year and 25% in the next.
> - The calendar year 2024 earned exposure is $0.75 \times 2{,}400 + 0.25 \times 2{,}000 = 2{,}300$ car-years.

> [!example]- An insurer writes 1,000 car-years of annual policies evenly through the fourth quarter of 2024. How much exposure is earned in 2024 and in 2025? {Example}
> - The average written date is the middle of the quarter, 11/15/2024.
> - The average policy is in force for one and a half months of 2024, $1.5/12 = 1/8$ of its term.
> - It earns $1{,}000/8 = 125$ car-years in 2024 and the other 875 in 2025.

> [!trap] Written exposures as the denominator
> In a growing book, written exposures exceed earned exposures. Dividing the 2024 losses above by the 12,000 written car-years gives $\$375.00$, an 8% understatement of the $\$409.09$ pure premium. Divide losses by the exposures earned in the same period.
