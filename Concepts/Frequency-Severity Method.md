---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:644845bc333e59e33e5b1f124a0dcdbfae995e7a39c7c2078f6e1a456520bcac
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11 Frequency-Severity Techniques, PDF pp.200-203, 207-218 (printed 194-197, 201-212): Approach #2 (pp.202-204), disposal rate technique (pp.205-211), footnote 67 (p.211), When the Techniques Work (p.212), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Frequency-Severity Method.md
---

![[Media/Figures/Frequency-Severity_Method.svg|340]]

The **Frequency-Severity Method** is a family of reserving techniques that estimate an accident year's [[Ultimate Loss|ultimate claims]] as the product of its projected number of claims and its projected average value per claim, rather than projecting claim dollars directly. In its simplest form the ultimate claims are

> $$\text{Ultimate Claims} = \text{Ultimate Claim Counts} \times \text{Ultimate Severity}$$

- $\text{Ultimate Claim Counts}$ are the year's projected ultimate number of claims, usually developed from a [[Claim Count Triangle|claim count triangle]].
- $\text{Ultimate Severity}$ is the projected ultimate average value per claim, the [[Severity|severity]].

Strictly, [[Frequency|frequency]] is claims per unit of exposure, but the name is also used for counts times severity with no exposure in it. The techniques are used for all lines, more often for [[Long Tail Lines|long-tail lines]], whose development factors are unstable for the recent years and whose severities are not known for a long time. Friedland gives three approaches, below. Separating the two components also shows whether a change comes from the rate at which claims are reported and settled or from their average value.

> [!example]- An accident year has 400 reported claims and $\$3{,}200{,}000$ of reported claims at 24 months. Its count CDF is 1.25 and its severity CDF is 1.30. What are its ultimate claims and IBNR? {Example}
> - The ultimate claim counts are $400 \times 1.25 = 500$.
> - The reported severity is $3{,}200{,}000/400 = \$8{,}000$, so the ultimate severity is $8{,}000 \times 1.30 = \$10{,}400$.
> - The ultimate claims are $500 \times 10{,}400 = \$5{,}200{,}000$.
> - The IBNR is $5{,}200{,}000 - 3{,}200{,}000 = \$2{,}000{,}000$.

## Development of claim counts and severities

Friedland's Approach #1 applies the [[Chain Ladder Method|development technique]] separately to a claim count triangle and to a severity triangle. Each cell of the severity triangle is

> $$\text{Severity} = \frac{\text{Reported Claims}}{\text{Reported Claim Counts}}$$

- Both are cumulative, for the same accident year and age. A paid version divides paid claims by closed claim counts.

Age-to-age factors are selected for each triangle, chained into CDFs with a tail, and applied to the latest count and the latest severity. As a check, the implied frequency, ultimate counts over earned exposures, should be stable or follow a consistent trend across the years, and the implied severity, ultimate claims over ultimate counts, should follow a consistent trend. The approach assumes, like the development technique, that counts and severities to date will continue to develop as they have in the past.

## Exposures and inflation

Friedland's Approach #2 projects the most recent accident years, whose development factors are most leveraged, from an exposure base, a frequency and a trended severity. The ultimate claims of a year are

> $$\text{Ultimate Claims} = \text{Exposures} \times \text{Frequency} \times \text{Severity}$$

- $\text{Exposures}$ are the year's earned exposures, or its on-level earned premium when that is the only exposure data.
- $\text{Frequency}$ is the selected ultimate claim counts per exposure, from the trended ultimate counts of earlier years over their trended exposures.
- $\text{Severity}$ is the selected ultimate severity, from the developed severities of earlier years trended to the year's cost level.

Putting premium on the current rate level keeps rate changes out of the frequency, and dividing by an exposure keeps growth in the book out of it. Frequency and severity are selected at the latest year's level and moved back one year at a time. A severity moves back one year by dividing it by one year's severity trend factor. A frequency moves back by dividing it by one year's claim count trend factor and reversing one year of change in the exposure base, such as payroll inflation.

> [!example]- At the AY 2024 level the selected frequency is 0.0500 claims per car-year and the selected severity is $\$20{,}000$. Claim count trend is $-1\%$ a year and severity trend is $+5\%$. AY 2024 has 12,000 car-years and AY 2023 has 11,500. What are their ultimate claims? {Example}
> - AY 2024's ultimate claims are $12{,}000 \times 0.0500 \times 20{,}000 = \$12{,}000{,}000$.
> - For AY 2023 the frequency is $0.0500/0.99 = 0.05051$, since car-years do not inflate.
> - Its severity is $20{,}000/1.05 = \$19{,}048$.
> - AY 2023's ultimate claims are $11{,}500 \times 0.05051 \times 19{,}048 = \$11{,}063{,}011$.

## The disposal rate technique

Friedland's Approach #3 projects the claims still to close and values them at a trended severity for the age at which they close. The disposal rate of an accident year at an age is

> $$\text{Disposal Rate} = \frac{\text{Closed Claim Counts}}{\text{Ultimate Claim Counts}}$$

- $\text{Closed Claim Counts}$ are cumulative to that age, and $\text{Ultimate Claim Counts}$ are the year's selected ultimate.

A disposal rate is selected for each age. The claims a year still has to close are spread over its future ages in proportion to the selected incremental disposal rates, each divided by one minus the selected rate at its latest age. The incremental paid severity of a cell is its incremental paid claims over its incremental closed counts. These severities are trended to a common cost level, selected by age, and moved back to each year's own level. The [[Unpaid Claims|unpaid claims]] are then

> $$\text{Unpaid Claims} = \sum \text{Future Closed Counts} \times \text{Incremental Severity}$$

- The sum is over the year's future ages, each age's projected incremental closed counts times its selected incremental severity.

The ultimate claims are the paid claims to date plus the unpaid claims. The technique matches paid dollars to closed counts, so it implicitly assumes no significant partial payments. Where they are material, paid claims on closed claims only, or paid claims over the claims open at the start of the interval, can be used. At the oldest ages, where few claims close and one large claim can dominate, the ages are combined into one tail severity: total trended incremental paid over total incremental closed counts at the selected age and older. The age to combine at depends on where the results become erratic, its influence on the total and the share of claims expected to close beyond it. Because it uses only paid claims and closed counts, the technique is unaffected by a change in case reserve adequacy.

> [!example]- An accident year has 1,000 ultimate claims, and 600 have closed by 24 months, its selected disposal rate. The selected disposal rates are 80% at 36 months, 95% at 48 months and 100% after. The selected incremental severities at its cost level are $\$12{,}000$, $\$18{,}000$ and $\$30{,}000$. What are its unpaid claims? {Example}
> - From 24 to 36 months, $(0.80 - 0.60) \times 1{,}000 = 200$ claims close.
> - From 36 to 48 months, $(0.95 - 0.80) \times 1{,}000 = 150$ claims close, and the last 50 close after 48 months.
> - The unpaid claims are $200 \times 12{,}000 + 150 \times 18{,}000 + 50 \times 30{,}000$.
> - That is $2{,}400{,}000 + 2{,}700{,}000 + 1{,}500{,}000 = \$6{,}600{,}000$.

## When the techniques work

1. **Claim counts are defined consistently and homogeneous.** A change in what counts as a claim, in the treatment of claims closed without payment or of reopened claims, or in waiting periods and statutes of limitation, invalidates the count development.
2. **The mix of claims is stable.** A stormy season of many minor slip-and-fall claims raises the counts and lowers the severities, and distorts the projection unless the mix is adjusted for.
3. **Inflation is reflected explicitly.** A known change in claim cost, such as a tort reform or a benefit change, can be built into the selected severities directly. The other side of it is that the result is highly sensitive to the trend assumption.
4. **Large claims are controlled.** The actuary may cap claims at a predetermined value or exclude large claims, and then adds a provision for large claims. Large and small claims can be projected separately and the ultimates summed.
5. **The data exist.** Claim counts are often unavailable, which is the most common reason the techniques are not used.

The same steps project ALAE, as ultimate counts times ultimate ALAE per claim.

> [!example]- An accident year's ultimate estimate rose 22% since the last valuation. Ultimate counts went from 1,200 to 1,215 and ultimate severity from $\$9{,}000$ to $\$10{,}830$. What changed? {Example}
> - The counts rose $1{,}215/1{,}200 - 1 = 1.3\%$, so reporting and the count projection are as expected.
> - The severity rose $10{,}830/9{,}000 - 1 = 20.3\%$, and $1.013 \times 1.203 = 1.219$.
> - The increase is in severity: development on known claims, a change in case adequacy, an inflation or legal change, or a few large claims.
> - A severity jump on the same diagonal in every open year is a calendar-year effect, and would also make the pricing severity trend stale.

> [!trap] Developing the product again
> Ultimate counts times ultimate severity is already an ultimate. In the first example, multiplying the $\$5{,}200{,}000$ by a reported claims CDF would develop claims that have been developed once through the counts and once through the severity. The CDFs belong to the counts and the severities, never to their product.
