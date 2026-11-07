---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b0ca0ca973fe446999e2ed4ee459bf936101448d59afd48d26392d8456f6413
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7, PDF pp.96-99, 101, 103 (printed 90-93, 95, 97): CDF calculation, percentage reported = 1/CDF, leverage (CDF 4.00 example), paid vs reported CDFs, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cumulative Development Factor.md
---

![[Media/Figures/Cumulative_Development_Factor.svg|340]]

A **Cumulative Development Factor** (CDF) is the product of the selected [[Age to Age Factor|age-to-age factors]] from a cohort's current age onward and the [[Tail Factor|tail factor]]. It is also called an age-to-ultimate factor, and it projects the cohort's claims from their current age to ultimate. The CDF at age $n$ is

> $$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$

- $f_{k \to k+1}$ is the selected age-to-age factor from age $k$ to the next age, for every age $k$ from $n$ to the last age of the triangle.
- $\text{Tail}$ is the tail factor from the last age to ultimate, $1.000$ when no development is expected beyond it.

CDFs are calculated by successive multiplication, beginning with the tail factor and the oldest age-to-age factor and moving to younger ages. In the development technique, an accident year's ultimate claims are its latest claims times the CDF for its age:

> $$\text{Ultimate Claims} = C_{\text{AY},\,n} \times \text{CDF}_{n \to \text{ult}}$$

- $C_{\text{AY},n}$ is the accident year's reported or paid claims at its age $n$ on the latest diagonal.
- The CDF is the one built from the same kind of claims.

The CDF is largest for the most recent, immature accident years and smallest for the oldest. An accident year at the last age with no further development has a CDF of 1.000, so its ultimate claims are its current claims.

> [!example]- The selected age-to-age factors are 1.500 from 12 to 24 months, 1.200 from 24 to 36 months and 1.050 from 36 to 48 months, and the tail factor from 48 months is 1.020. An accident year has $\$600{,}000$ of reported claims at 12 months. What are the CDFs and its ultimate claims? {Example}
> - The CDF at 48 months is the tail factor, $1.020$.
> - The CDF at 36 months is $1.050 \times 1.020 = 1.071$.
> - The CDF at 24 months is $1.200 \times 1.071 = 1.285$.
> - The CDF at 12 months is $1.500 \times 1.285 = 1.928$.
> - The accident year's ultimate claims are $600{,}000 \times 1.928 = \$1{,}156{,}800$, and its IBNR is $\$556{,}800$.

## Percentage reported

The percentage of ultimate claims reported by age $n$ is the reciprocal of the reported CDF:

> $$\text{Reported \%} = \frac{1}{\text{CDF}_{n \to \text{ult}}}$$

The percentage unreported is $1 - 1/\text{CDF}_{n \to \text{ult}}$, and the same reciprocal of a paid CDF is the percentage paid. The reporting and payment patterns these give are what the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]], [[Cape Cod Method|Cape Cod]] and [[Benktander Method|Benktander]] techniques use. The CDF and the reporting pattern are the same information in two forms. The reporting pattern also gives the reported claims to date as the ultimate claims divided by the CDF.

> [!example]- With the CDFs above, what share of ultimate claims is reported at each age? {Example}
>
> | Age | CDF | Reported | Unreported |
> | --- | --- | --- | --- |
> | 12 | 1.928 | 51.9% | 48.1% |
> | 24 | 1.285 | 77.8% | 22.2% |
> | 36 | 1.071 | 93.4% | 6.6% |
> | 48 | 1.020 | 98.0% | 2.0% |
>
> - Each reported share is $1/\text{CDF}$, such as $1/1.928 = 51.9\%$ at 12 months.
> - Each unreported share is one minus the reported share.

## Leverage of a CDF

A CDF multiplies every dollar on the latest diagonal. At a CDF of 4.00, a dollar of distortion on the diagonal, such as a single large claim or a change in case adequacy, becomes four dollars of ultimate claims. Long-tail lines can have paid CDFs above 10.00 for the latest years, so their development projections are very sensitive. Techniques that develop only the unreported portion are preferred there ([[Long Tail Lines#Leverage of development factors|leverage]]).

## Paid and reported CDFs

A CDF is specific to the triangle it came from. Paid CDFs differ from reported CDFs, count CDFs from dollar CDFs, and a CDF on claims limited at a retention from one on unlimited claims. Paid CDFs are usually greater than reported CDFs at the same age, because payments lag reporting.

> [!example]- An accident year at 24 months has $\$1{,}800{,}000$ paid with a paid CDF of 2.40, and $\$3{,}150{,}000$ reported with a reported CDF of 1.30. How do the projections compare? {Example}
> - The paid projection is $1{,}800{,}000 \times 2.40 = \$4{,}320{,}000$.
> - The reported projection is $3{,}150{,}000 \times 1.30 = \$4{,}095{,}000$.
> - Both rest on the same claims, so the 5.5% gap is information about the latest diagonal, not about the ultimate.
> - A weakening of case adequacy would make the reported projection too low, and a faster settlement would make the paid projection too high.
> - The closed-to-reported count and average case outstanding triangles decide between them.
