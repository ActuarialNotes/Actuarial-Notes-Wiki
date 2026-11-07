---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:235907c06c404c8d71ecc056b55163c5e6732ddeba4c3a1cf588ba7399ae8e0b
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶38 (P-7); SSAP No. 53 ¶7-8 (53-2 to 53-3, PDF pp.348-349), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 p.9, Ch.4 p.56, Ch.5 pp.64, 68-72 (PDF pp.21, 68, 76, 80-84) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earned Premium.md
---

![[Media/Figures/Earned_Premium.svg|340]]

**Earned Premium** is the portion of the [[Written Premium|written premium]] for the coverage already provided, the premium for the part of the policy term that has expired. It is the premium the insurer is entitled to keep should the policy be cancelled. When premium is earned evenly over the term, a policy's earned premium in a period is

> $$\text{Earned Premium} = \text{Written Premium} \times \frac{\text{Time in Force in the Period}}{\text{Policy Term}}$$

- $\text{Time in Force in the Period}$ is the part of the policy's own term that falls in the period, in months or in days.
- $\text{Policy Term}$ is the length of the policy's whole term, 6 or 12 months, in the same unit.

A policy that expired before the period starts earns nothing in it, and a policy whose whole term lies inside the period earns its full premium. No premium is earned before coverage begins, whenever it is paid. Over a policy's life, its earned premium in successive periods adds up to its written premium.

> [!example]- An annual homeowners policy is written on 10/1/2024 for $\$1{,}200$. How much of its premium is earned in 2024 and in 2025? {Example}
> - Three of its twelve months fall in 2024, so it earns $1{,}200 \times 3/12 = \$300$ in 2024.
> - The other nine fall in 2025, so it earns $1{,}200 \times 9/12 = \$900$ in 2025.
> - The two add up to the $\$1{,}200$ written in 2024.

> [!example]- An annual policy runs from 4/15/2024 to 4/14/2025 for $\$730$. What is its calendar year 2024 earned premium on the daily pro rata method? {Example}
> - The term is 365 days, and 261 of them, 4/15/2024 to 12/31/2024, fall in 2024.
> - The 2024 earned premium is $730 \times 261/365 = \$522$.

## Calendar year and policy year earned premium

Calendar year earned premium is the premium earned during the year on every policy in force, including policies written in the year before. For a book, it is

> $$\text{CY Earned Premium} = \text{CY Written Premium} + \text{Beginning UEP} - \text{Ending UEP}$$

- $\text{Beginning UEP}$ and $\text{Ending UEP}$ are the [[Unearned Premium|unearned premium]] reserves at the start and the end of the year.

Policy year earned premium is assigned to the year the policy was written. At an evaluation date, it is each policy's premium earned to that date, including what is earned after the policy year ends. Once every policy written in the year has expired, about 24 months after the policy year starts for annual policies, the policy year's earned premium equals its written premium. A loss ratio for a mature policy year uses that fully earned premium.

> [!example]- An insurer writes annual policies evenly through each year: $\$24{,}000{,}000$ in 2023 and $\$30{,}000{,}000$ in 2024. What is its calendar year 2024 earned premium? {Example}
> - With annual policies written evenly, half of each year's written premium is still unearned at year end.
> - The unearned premium reserve is $\$12{,}000{,}000$ at the start of 2024 and $\$15{,}000{,}000$ at the end.
> - The calendar year 2024 earned premium is $30{,}000{,}000 + 12{,}000{,}000 - 15{,}000{,}000 = \$27{,}000{,}000$.
> - That is the second half of the 2023 writings, $\$12{,}000{,}000$, and the first half of the 2024 writings, $\$15{,}000{,}000$.

## Endorsements and cancellations

An endorsement's premium is earned over its own coverage period, from its effective date to the end of the term, separately from the original premium. A cancellation stops the earning at the cancellation date, so a cancellation effective after the end of a year does not change that year's earned premium.

> [!example]- An annual policy is written on 1/1/2024 for $\$1{,}200$. On 7/1/2024 an endorsement adds $\$200$ of premium for the rest of the term. What is its earned premium at 9/30/2024? {Example}
> - The original premium is nine months into its twelve, so it has earned $1{,}200 \times 9/12 = \$900$.
> - The endorsement covers the six months from 7/1/2024, and three of them have passed, so it has earned $200 \times 3/6 = \$100$.
> - The policy's earned premium at 9/30/2024 is $900 + 100 = \$1{,}000$.

## Earning patterns other than pro rata

The even earning pattern does not hold for lines such as warranty, or for lines affected by seasonal fluctuations in writings, such as boat owners insurance. Actuaries analyzing those lines often specify other earning patterns based on historical experience. In a U.S. insurer's statutory statements, SSAP No. 53 earns premium by the daily or monthly pro rata method. Where the period of risk differs significantly from the contract period, premium is earned in proportion to the protection provided.

## Earned premium in ratemaking

Losses arise from the coverage provided in a period, so earned premium is the usual denominator of a [[Loss Ratio|loss ratio]]. A calendar year's earned premium comes from policies written at different rate levels, so before it is used in an indication, it is:

1. Brought to the current rate level ([[On-Leveling|on-leveling]]).
2. Developed to ultimate where it is still changing, such as policy year premium awaiting audits.
3. Trended for changes in average premium from shifts in the mix of business ([[Premium Trend|premium trend]]).

> [!trap] A loss ratio on premium not at current rate level
> Earned premium from years before a rate increase is lower than the same exposures would produce today. A loss ratio on that premium overstates what the current rates will produce. Use on-level earned premium in every loss ratio that is compared across years.
