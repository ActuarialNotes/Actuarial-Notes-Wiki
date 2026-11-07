---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:588c48f5eaae981df768df291d90c9e207207235643acb546cfcf870f8db121f
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.15 (PDF 21); Part 3 intro pp.79-80 (PDF 85-86); Ch.7-10 mechanics; Ch.15 p.345 (PDF 351), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ultimate Loss.md
---

![[Media/Figures/Ultimate_Loss.svg|340]]

An **Ultimate Loss**, or ultimate claims, is the total value of a group of claims, such as an accident year's, once every claim has been settled and closed with no chance of reopening. It is the quantity every reserving method estimates, and it stays an estimate until the last claim closes. An accident year's ultimate claims are

> $$\text{Ultimate Claims} = \text{Paid Claims} + \text{Case Outstanding} + \text{IBNR}$$

- $\text{Paid Claims}$ are the claims paid to date.
- $\text{Case Outstanding}$ is the [[Case Reserves|case reserves]] on reported claims, so the paid claims plus the case outstanding are the reported claims.
- $\text{IBNR}$ is the [[IBNR|broad IBNR]], the estimate of everything not yet in the reported claims.

The methods differ in how they estimate the IBNR, not in what they estimate: the [[Chain Ladder Method|development technique]] scales the claims to date, the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] methods add expected unreported claims, and the [[Frequency-Severity Method|frequency-severity]] techniques multiply counts by severity. An ultimate is stated on a defined basis, gross or [[Net of Reinsurance|net of reinsurance]], with or without [[Allocated Loss Adjustment Expense|ALAE]], before or after [[Salvage and Subrogation|salvage and subrogation]], and the same basis is used on both sides of any comparison. The ultimate claim ratio, ultimate claims over earned premium, is the retrospective test of whether the year was priced adequately.

> [!example]- An accident year has paid claims of $\$500{,}000$, case outstanding of $\$300{,}000$ and IBNR of $\$400{,}000$. What are its reported and ultimate claims? {Example}
> - The reported claims are $500{,}000 + 300{,}000 = \$800{,}000$.
> - The ultimate claims are $800{,}000 + 400{,}000 = \$1{,}200{,}000$.

## Selecting ultimate claims

Selecting the ultimate is a separate step from running the methods. Several methods are run on both paid and reported data and laid side by side by accident year. The actuary leans on the methods that use an a priori expectation at immature ages and on the development methods at mature ones, and records the reasons. The selection is assessed against the range and average of the estimates: one outside the range needs an explanation, from which methods the data distort and which are stable. An independent benchmark, such as another technique's claim ratios by year, tests the reasonableness of the result.

> [!example]- AY 2024 at 12 months has paid claims of $\$300{,}000$ and reported claims of $\$500{,}000$. Earned premium is $\$1{,}200{,}000$ and the expected claims are $\$1{,}000{,}000$. The reported CDF is 2.400 and the paid CDF is 4.100. What are the candidate ultimates, and what do they say? {Example}
> - The reported development ultimate is $500{,}000 \times 2.400 = \$1{,}200{,}000$.
> - The paid development ultimate is $300{,}000 \times 4.100 = \$1{,}230{,}000$.
> - The expected claims ultimate is $\$1{,}000{,}000$.
> - The reported Bornhuetter-Ferguson ultimate is $500{,}000 + (1 - 1/2.400) \times 1{,}000{,}000 = \$1{,}083{,}333$.
> - The paid and reported development ultimates agree, so case adequacy and settlement speed are unlikely to be distorting the diagonal. At 12 months their CDFs are highly leveraged, so a selection between the Bornhuetter-Ferguson and development ultimates is defensible.

## Monitoring ultimates between valuations

Between full analyses, actual claim emergence is compared with expected emergence. The actual emergence is the change in reported claims over the period. The expected reported claims in the period are

> $$\text{Expected Emergence} = \frac{\text{Ultimate Claims} - \text{Reported Claims}}{1 - \text{Percent Reported}} \times (\text{New Percent Reported} - \text{Percent Reported})$$

- $\text{Ultimate Claims}$ are the ultimates selected at the prior valuation, and $\text{Reported Claims}$ the reported claims then.
- $\text{Percent Reported}$ is $1/\text{CDF}$ at the prior age, and $\text{New Percent Reported}$ is $1/\text{CDF}$ at the age one period later.

Actual emergence above expected suggests the factors and ultimates were understated, and below expected that they were overstated. The response depends on the cause. A real change in the losses, such as a deteriorating claim ratio, a catastrophe or an unexpected large claim, calls for a higher ultimate. A faster reporting or a strengthening of case reserves calls instead for revised factors or a [[Berquist-Sherman Method|Berquist-Sherman]] adjustment, and reported emergence with paid in line points to the case reserves. When emergence is consistent with expected, especially on reported claims, the selection need not change. Revised ultimates come from the revised CDFs applied to the latest reported claims and are never below them. An ultimate that rises at every valuation is systematically low: the factors or tail are too small, the a priori too optimistic, or a calendar-year change is hitting every open year, and management is asked about operational changes that could explain it.

> [!example]- At the last year-end AY 2023's selected ultimate was $\$2{,}798$ thousand, with $\$2{,}463$ thousand reported and 88.0% reported. A year later it should be 99.9% reported. What are the expected reported claims in the year? {Example}
> - The expected unreported claims at the last year-end are $2{,}798 - 2{,}463 = 335$.
> - Dividing by the 12.0% then unreported gives $335/0.120 = 2{,}792$, the amount the reporting pattern spreads over the remaining ages.
> - The year should report $2{,}792 \times (0.999 - 0.880) = \$332$ thousand.
> - If the year actually reported $\$450$ thousand, emergence ran ahead of expected, and the cause decides whether the ultimate or the factors are revised.

> [!trap] Reading a case strengthening as worse losses
> Reported claims emerging above expected while paid claims are in line does not by itself mean the ultimate is higher. If case reserves were strengthened, the extra reported claims are the same claims reserved more fully. Raising the ultimate by the excess and also developing the stronger diagonal with the old factors counts the strengthening twice.
