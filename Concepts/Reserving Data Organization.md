---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:354c59e9e241f34cc71b4c232fa9582ecf705e8c7dbcff95965c9ece5fa9f0af
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.29, 39-43 (PDF pp.35, 45-49), Ch.4 p.44 (PDF p.50), Ch.5 p.73 (PDF p.79), Ch.13 p.288 (PDF p.294), Ch.14 pp.330-331 (PDF pp.336-337), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reserving Data Organization.md
---

![[Media/Figures/Reserving_Data_Organization.svg|340]]

**Reserving Data Organization** is the grouping of claim and exposure data into cohorts and segments for estimating [[Unpaid Claims|unpaid claims]]. Claims are grouped in time by one of five bases:

1. **[[Accident Year|Accident year]]** groups claims by the date the accident occurred.
2. **[[Policy Year|Policy year]]** groups claims by the year the policy became effective.
3. **[[Underwriting Year|Underwriting year]]** groups claims by the year the reinsurance contract became effective.
4. **[[Report Year|Report year]]** groups claims by the date they were reported to the insurer.
5. **[[Calendar Year|Calendar year]]** groups transactions by the date they were made.

Accident year 2024, for example, consists of all claims with an occurrence date in 2024, so a claim with an accident date in any other year is excluded from it. Accident year is by far the most common grouping for estimating unpaid claims.

> [!example]- An annual policy is effective $7/1/2024$. A claim under it occurs on $3/15/2025$, is reported on $6/20/2025$, and is paid in 2026. To which year does the claim belong on each basis? {Example}
> - On the accident year basis it belongs to 2025, the year the accident occurred.
> - On the policy year basis it belongs to 2024, the year the policy became effective.
> - On the report year basis it belongs to 2025, the year it was reported.
> - Its payment is a 2026 calendar year transaction.

## Aggregation by accident, policy and report year

Each basis trades a closer match of claims to premium against the time it takes to know the answer:

| Basis | Advantage | Disadvantage |
| --- | --- | --- |
| Accident year | Easy to achieve and understand, ultimate claims are reliably estimable sooner, many industry benchmarks, isolates years with inflation, law changes or catastrophes | Only an approximate match of claims to calendar year earned premium |
| Policy or underwriting year | A true match between claims and the premium of the same policies | A 12-month policy year has accidents over 24 months, so claims take longer to report and ultimate claims longer to estimate |
| Report year | The number of claims is fixed at the close of the year, so development is more stable | Measures development on known claims only, with no pure IBNR |

Accident year data carry pure [[IBNR]] and match claims to the exposures that generated them, so they are preferred for liability lines. **[[Report Year]]** is the basis actuaries often prefer for [[Claims Made Coverage|claims-made]] business: a report year contains no pure [[IBNR]], and its claim count is fixed at the close of the year. Report year data have a settlement lag but no reporting lag, so another method is needed for the pure IBNR.

## Calendar year data

Calendar year data are transactional. Calendar year paid claims are the payments made in the year, and calendar year reported claims are

> $$\text{CY Reported Claims} = \text{CY Paid Claims} + \text{Ending Case Outstanding} - \text{Beginning Case Outstanding}$$

- $\text{CY Paid Claims}$ are the claim payments made during the calendar year.
- $\text{Ending Case Outstanding}$ and $\text{Beginning Case Outstanding}$ are the [[Case Reserves|case outstanding]] at the end and the start of the year.

A calendar year is one diagonal of every [[Development Triangle|development triangle]]. Its values are fixed and do not develop, which is its advantage and its disadvantage: they leave nothing to project future development or IBNR from, so very few techniques use calendar year claims. Calendar year exposures, such as earned premium, are often used with accident year claims.

> [!example]- A cumulative reported claims triangle has, for accident year 2023, $\$700$ at 12 months and $\$900$ at 24 months, and for accident year 2024, $\$750$ at 12 months. What are the calendar year 2024 reported claims of these two accident years? {Example}
> - The 2024 diagonal holds accident year 2023 at 24 months and accident year 2024 at 12 months.
> - Accident year 2023's reported claims grew by $900 - 700 = \$200$ during 2024.
> - Accident year 2024 is in its first year, so all of its $\$750$ was reported in 2024.
> - The calendar year 2024 reported claims are $200 + 750 = \$950$.

## Homogeneity and credibility

Estimation methods work best on [[Homogeneity|homogeneous]] data, so actuaries split the data into groups whose claims share these characteristics:

1. Consistency of the coverage triggered, so the claims are subject to similar laws, policy terms and claims handling.
2. Volume of claim counts.
3. Reporting patterns.
4. The ability to set an appropriate case outstanding from first report through the life of the claim.
5. Settlement, or payment, patterns.
6. Likelihood of a claim reopening.
7. Average settlement value, or [[Severity|severity]].

The goal is groups homogeneous enough without compromising the [[Credibility|credibility]] of the data. More homogeneity or more volume raises credibility, but too many groups leave each with too little data for a reliable analysis. The CAS Statement of Principles on loss and LAE reserves directs the actuary to consider both. Actuaries split by [[Line of Business|line]] and subline, coverage, [[Long Tail Lines|tail length]] and policy limits.

A segment with a large volume of data is credible on its own and is analyzed separately when its development differs. A thin line may be combined with another for credibility, but only if the two have similar development patterns, growth rates and mix. Segments are compared by their age-to-age factors at each age and by the trends in their earned exposures and ultimate claim counts.

> [!example]- A personal auto insurer writes bodily injury liability, property damage liability, collision and comprehensive. Property damage and physical damage claims close within months, and bodily injury claims run for several years. Should all four be developed in one triangle? {Example}
> - The coverages have different reporting and settlement patterns, so they are not homogeneous.
> - Combining them would average a multi-year liability pattern with an essentially immediate property pattern, producing development factors that fit neither.
> - Bodily injury has the volume to be credible in its own triangle.
> - Collision and comprehensive have similar patterns, so they may be combined if either is too thin to stand alone.

## Other choices in organizing the data

- **Gross, ceded and net.** The actuary may analyze gross and ceded claims and take net as the difference, or gross and net and take ceded as the difference, and then reviews the implied third for reasonableness.
- **Recoveries.** Whether [[Salvage and Subrogation|salvage and subrogation]] and [[Deductible Recovery|deductibles]] are in the claims data must be known and treated the same way in every year.
- **Claim counts.** Keep counts alongside dollars. Paid, reported, closed and open **claim counts** ([[Claim Count Triangle]]) are what make the dollar triangles diagnosable.
- **[[Large Loss|Large claims]].** They can be removed from the projection and added back with a case-specific estimate and a smoothed provision for their IBNR.

Development patterns and data volume can be read from the data itself. Changes in mix, coverages, limits, catastrophe exposure, regulation and claims operations cannot, and are learned by asking management.
