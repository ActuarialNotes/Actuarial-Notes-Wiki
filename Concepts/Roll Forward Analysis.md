---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b6db3c620a1780dfab444d0ca134da7707c47f34ddbbf21991ee0c47285a5541
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5, 9 fn.5 (PDF pp.10-11, 15); Ch.15 pp.350-351 (PDF pp.356-357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §3.6.2, p.6 (PDF p.11), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Roll Forward Analysis.md
---

![[Media/Figures/Roll_Forward_Analysis.svg|340]]

A **Roll Forward Analysis** carries an [[Unpaid Claims|unpaid claim estimate]] from the date of the last complete analysis to a later date without repeating the analysis. It compares the claims that emerged on the historical accident periods with the claims expected, and adds the effect of the exposure earned in the current period. The unpaid claims at the end of a period are

> $$\text{Unpaid}_{\text{end}} = \text{Unpaid}_{\text{start}} + \text{Incurred} - \text{Paid}$$

- $\text{Unpaid}_{\text{start}}$ and $\text{Unpaid}_{\text{end}}$ are the total unpaid claim estimates, case outstanding plus [[IBNR]], at the start and end of the period.
- $\text{Incurred}$ is the [[Calendar Year|calendar-period]] incurred claims, the claims on the new accident period plus the change in the estimated ultimate claims of the prior accident periods.
- $\text{Paid}$ is the claims paid in the period on all accident periods.

Some very large companies analyze unpaid claims in detail every quarter, but many actuaries use a roll forward between complete analyses. Monitoring the estimate this way serves financial reporting, budgeting and planning, pricing and other strategic decisions, and the planning of the next complete analysis.

> [!example]- Unpaid claims were $\$10{,}000{,}000$ at December 31, 2023. During 2024, the new accident year's ultimate claims are estimated at $\$2{,}500{,}000$, $\$3{,}200{,}000$ is paid on all accident years, and the prior accident years' ultimate claims are raised by $\$400{,}000$. What are the unpaid claims at December 31, 2024? {Example}
> - The calendar-year incurred claims are $2{,}500{,}000 + 400{,}000 = \$2{,}900{,}000$.
> - The unpaid claims at the end are the $\$10{,}000{,}000$ at the start, plus $\$2{,}900{,}000$ incurred, less $\$3{,}200{,}000$ paid, which is $\$9{,}700{,}000$.
> - The unpaid claims fell $\$300{,}000$ although the prior years' estimate rose by $\$400{,}000$, because payments exceeded the new accident year's claims.

## Prior-year development

The change in the estimated ultimate claims of the prior accident periods is their development. An increase is **adverse** development, which says the prior estimate was deficient. A decrease is **favourable** development, which says it was redundant. In a roll forward, the prior accident periods' ultimate claims are usually held at the last analysis's selections, so each one's unpaid claims at the new date are

> $$\text{Unpaid}_{\text{AY}} = \text{Ultimate}_{\text{AY}} - \text{Paid}_{\text{AY}}$$

- $\text{Ultimate}_{\text{AY}}$ is the accident year's selected ultimate claims.
- $\text{Paid}_{\text{AY}}$ is its cumulative paid claims at the new date.

An [[Actual vs Expected Analysis|actual vs expected analysis]] of the claims that emerged decides whether a held ultimate must be revised before it is rolled forward.

> [!example]- At the last analysis, accident year 2022's ultimate claims were selected at $\$8{,}000{,}000$. Six months later its paid claims are $\$5{,}100{,}000$ and its reported claims are $\$6{,}900{,}000$, both close to expected. What are its unpaid claims and IBNR at the new date? {Example}
> - The emergence is close to expected, so the ultimate is held at $\$8{,}000{,}000$.
> - The unpaid claims are $8{,}000{,}000 - 5{,}100{,}000 = \$2{,}900{,}000$.
> - The IBNR is the ultimate less reported claims, $8{,}000{,}000 - 6{,}900{,}000 = \$1{,}100{,}000$.

## Development over several roll forwards

One period's development can be random. Development in the same direction period after period is evidence that the method behind the estimate is biased, which a test of the method against its own history would show. The development is compared as a percentage of the unpaid claims at the start of each period.

> [!example]- In four successive years, development on prior accident years was $\$900$K, $\$1{,}300$K, $\$1{,}800$K and $\$2{,}400$K, adverse each time, on opening unpaid claims of $\$38{,}000$K, $\$41{,}000$K, $\$44{,}000$K and $\$47{,}000$K. What does the pattern say? {Example}
> - As a percentage of opening unpaid claims, the development was $2.4\%$, $3.2\%$, $4.1\%$ and $5.1\%$.
> - It was adverse in every year and the percentage grew each year, so it is not random variation around an unbiased estimate.
> - The assumptions behind the estimate, such as the development factors, the [[Tail Factor|tail]] and the expected claim ratio, are re-examined rather than topped up again by whatever emerged.
