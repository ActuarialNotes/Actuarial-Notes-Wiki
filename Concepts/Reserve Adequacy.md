---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a54427b71a375ada2b81ba1e311224cc9949a25f6188bf8c681c02572beacf7d
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5 (PDF pp.10-11); Ch.3 p.34 (PDF p.40); Ch.15 pp.345-348 (PDF pp.351-354), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§3.6.5, 3.7.1, 4.1(f), 4.2(b), pp.7-10 (PDF pp.12-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Reserve Adequacy.md
---

![[Media/Figures/Reserve_Adequacy.svg|340]]

**Reserve Adequacy** is whether an [[Unpaid Claims|unpaid claim estimate]] is enough to pay the claims it covers. A redundant unpaid claim estimate is one that exceeds the amount ultimately needed to pay the claims, and an inadequate one falls below it. Against the actuary's indicated estimate, the carried estimate's margin is

> $$\text{Redundancy} = \text{Carried Unpaid Claims} - \text{Indicated Unpaid Claims}$$

- $\text{Carried Unpaid Claims}$ is the estimate held in the financial statements.
- $\text{Indicated Unpaid Claims}$ is the actuary's estimate of the amount needed.
- A negative redundancy is a deficiency.

Unpaid claim estimates feed into reported loss ratios and profitability. A redundant estimate makes a book look less profitable than it truly is, and an inadequate estimate makes it look more profitable.

> [!example]- The indicated unpaid claims are $\$47{,}500{,}000$ and the carried unpaid claims are $\$43{,}000{,}000$. Surplus is $\$60{,}000{,}000$. Is the carried estimate adequate, and by how much does it overstate surplus? {Example}
> - The redundancy is $43{,}000{,}000 - 47{,}500{,}000 = -\$4{,}500{,}000$, a deficiency, so the carried estimate is inadequate.
> - The deficiency is $4.5/47.5 = 9.5\%$ of the indicated unpaid claims.
> - The liabilities are understated by $\$4{,}500{,}000$, so surplus is overstated by that amount, $4.5/60 = 7.5\%$ of the surplus reported.

## Why an inaccurate estimate matters

Friedland looks at the accuracy of unpaid claim estimates from three viewpoints:

| Viewpoint | Uses the estimate for | An inadequate estimate | A redundant estimate |
| --- | --- | --- | --- |
| Internal management | Pricing, underwriting, reinsurance, capital allocation and strategy | Can lead to rate decreases and growth at rates too low to pay future claims, or to too little reinsurance or capital | Can lead to unnecessary rate increases, lost market share, or exiting a profitable line or region |
| Investors | The balance sheet, the income statement and the metrics drawn from them | Presents the insurer as stronger than it truly is | Presents the insurer as weaker than it truly is |
| Regulators | Supervising the insurer's financial position | Can mask a struggling insurer until it is too late to help it regain its strength | Misstates its true financial position |

The inadequate estimate in pricing compounds: rates set from understated losses are too low for the claims the new policies will produce, and gaining market share at those rates makes it worse, until the insurer's solvency can be at risk.

> [!example]- An insurer's reserves have been inadequate for several years. Why does the problem grow rather than stay the same size? {Example}
> - Understated unpaid claims understate the historical losses, so the loss ratios used in rate indications look better than they are.
> - Rates indicated from those loss ratios are too low, so the new business is underpriced as well.
> - The lower rates win market share, so more business is written at inadequate rates.
> - Each year's new business adds its own shortfall to the deficiency on the old business.

## Reasonableness tests of the selected ultimate claims

An important final check of the selected [[Ultimate Loss|ultimate claims]], particularly for the most recent accident years, looks at them in contexts outside the methods that produced them. By accident year, the selection implies

1. **[[Loss Ratio|Claim ratios]]**, the ultimate claims divided by the on-level [[Earned Premium|earned premium]], compared across years and with the expected or pricing claim ratio.
2. **[[Severity|Severities]]**, the ultimate claims divided by the ultimate claim counts.
3. **[[Pure Premium Analysis|Pure premiums]]**, the ultimate claims divided by the [[Earned Exposure|earned exposures]].
4. **[[Frequency|Frequencies]]**, the ultimate claim counts divided by the earned exposures, or by earned premium as a proxy when exposures are not available.
5. **Average unpaid amounts**, the implied average case outstanding on open claims and the average amount of each unreported claim.

Each statistic should be stable or follow a consistent trend from year to year, and should agree with what management and the industry say about the business. The review either gives the actuary greater confidence in the estimate or sends the actuary for more information before concluding. [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] requires the actuary to assess the reasonableness of the estimate with appropriate indicators or tests.

> [!example]- Is this selection reasonable? {Example}
> The selected ultimate claims and the statistics they imply, in thousands of dollars except the severity:
>
> | Accident year | On-level earned premium | Ultimate claims | Claim ratio | Ultimate counts | Severity |
> | --- | --- | --- | --- | --- | --- |
> | 2021 | 20,000 | 13,400 | 67.0% | 1,340 | $\$10{,}000$ |
> | 2022 | 21,000 | 14,280 | 68.0% | 1,360 | $\$10{,}500$ |
> | 2023 | 22,000 | 15,180 | 69.0% | 1,380 | $\$11{,}000$ |
> | 2024 | 23,000 | 14,950 | 65.0% | 1,300 | $\$11{,}500$ |
>
> - The severities rise about 5% a year, steadily, including in 2024.
> - Ultimate counts per $\$1{,}000$ of premium, a proxy for frequency, are 67.0, 64.8, 62.7 and then 56.5, a 9.9% drop in the last year.
> - Nothing else in the data explains such a drop in frequency, so the 2024 ultimate claim counts look under-projected.
> - The 2024 claim ratio falls to 65.0% after three years of increases, which points to the same problem.
> - The 2024 selection is not reasonable as it stands, and its claim count projection is revisited.
