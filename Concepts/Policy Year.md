---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3b0f2fe2e3fefffbb1f4b655454d24719d8810e1357d1326fa3a19f842fc666
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.43 (PDF p.55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.41-42 (PDF pp.47-48), and Ch. 13 p.283 (PDF p.289), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Year.md
---

![[Media/Figures/Policy_Year.svg|340]]

A **Policy Year** of data is every premium and loss transaction on the policies written during a twelve-month period, regardless of when the claims occur or are reported, reserved or paid. It is also called an underwriting year, and for a reinsurer it groups claims by the year the reinsurance contract became effective ([[Underwriting Year|underwriting year]]). At an evaluation date, a policy year's earned premium and its reported losses are

> $$\text{PY Earned Premium} = \sum \text{Premium} \times \text{Fraction of Term Expired}$$

> $$\text{PY Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$

- $\text{Premium}$ is the full-term premium of each policy effective in the policy year, with its endorsements.
- $\text{Fraction of Term Expired}$ is the part of each policy's term that has expired by the evaluation date.
- $\text{Paid Losses}$ are all payments to the evaluation date on claims covered by those policies.
- $\text{Case Reserves}$ are the current [[Case Reserves|case reserves]] on those claims.

Only transactions on or before the evaluation date are included. A midterm change on a policy enters its policy year when it is made, and a claim enters when it is reported, whatever calendar year that falls in. Policy year earned exposures are counted the same way, so they include exposure earned after the end of the year on the policies written in it.

> [!example]- An annual policy written on 4/1/2024 for $\$1{,}200$ has a loss on 2/10/2025, which is paid $\$3{,}000$ on 6/30/2025. What does it contribute to policy year 2024 at 12/31/2024 and at 12/31/2025? {Example}
> - At 12/31/2024, 9 of the 12 months have expired, so it contributes $1{,}200 \times 9/12 = \$900$ of earned premium and no losses.
> - At 12/31/2025, the policy has expired, so it contributes the full $\$1{,}200$ of earned premium.
> - The accident is in 2025, but the policy was written in 2024, so the $\$3{,}000$ payment is a policy year 2024 loss at 12/31/2025.

## Advantages of policy year aggregation

Policy year aggregation is the best match between losses and premium: losses on the policies written during the year are compared with the premium earned on those same policies. It isolates the effect of a change that attaches to the policy, such as a new deductible, a change in policy limits, a rate change or a change in underwriting. Berquist and Sherman suggest substituting policy year data for [[Accident Year|accident year]] data when policy limits or deductibles change significantly between successive policy years.

> [!example]- An insurer raised its minimum deductible from $\$500$ to $\$1{,}000$ on all policies written on or after 1/1/2024. Which aggregation separates losses on the two deductibles? {Example}
> - The change attaches to the policy, so policy year 2024 holds only $\$1{,}000$-deductible business and policy year 2023 only $\$500$-deductible business.
> - Accident year 2024 is a mix: accidents in 2024 occur both on policies written in 2024 and on policies written in 2023 still in force.
> - Policy year data separates the two deductibles, and the earlier policy years can be restated to the new deductible level.

A change that applies to policies written after a date appears in the policy years from that date. A change that applies to accidents after a date, such as a benefit change effective by accident date, affects every policy in force and appears in the accident years instead.

## Disadvantages of policy year aggregation

A policy year takes the longest to mature. Its premium and exposures are not fixed until every policy written in the year has expired, which for annual policies is 24 months after the policy year starts. Its claims occur over about 24 months, so they take longer to be reported, and its ultimate losses take longer to estimate reliably than an accident year's. Policy year data can also make it hard to isolate the effect of a single large event, such as a catastrophe or a major court ruling, which falls across two policy years.

At early maturities a policy year is only partly earned, so its age-to-age factors are large and a [[Chain Ladder Method|chain ladder]] projection is highly leveraged. A small fluctuation in the few losses reported is multiplied by a large $\text{CDF}$.

## Average dates of a policy year

When annual policies are written evenly through the year, the average written date of a policy year is mid-year, 7/1. Each policy is exposed for a year from its written date, so the average accident date is one year after the start of the policy year, 1/1 of the next year. That is six months later than the average accident date of the accident year with the same number. The same reasoning applies to any written date and term: the average accident date is the average written date plus half the policy term.

> [!example]- Annual policies are written evenly through policy year 2024. What are its average written date and average accident date, and how much of its premium is earned in calendar year 2024? {Example}
> - The average written date is the middle of the year, 7/1/2024.
> - The average policy covers 7/1/2024 to 6/30/2025, so the average accident date is half a term later, 1/1/2025.
> - The average policy has half its term in 2024, so half the policy year's premium is earned in calendar year 2024 and half in 2025.

> [!trap] Comparing a policy year and an accident year at the same age
> At 12/31/2025, policy year 2024 and accident year 2024 are both 24 months old, but the policy year's average accident date is six months later. Its losses are less developed, so it needs larger development factors than the accident year at the same age.
