---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb9ae752147e34991af594e0a08c0b43f4ee2790f99c6a7f41663fa1814f8eb6
  sources:
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph #4, 2016), Section 6 pp.45-47 (PDF pp.53-55): text p.46 and footnote 62, Figures 6.1-6.3, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Study Note, 2022), Chapter 3 summary, PDF p.67, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapter 6 pp.68-77 (PDF pp.74-83), Chapter 7 p.96 (PDF p.102), Chapter 13 pp.288-291 (PDF pp.294-297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf"
    - "ASOP No. 36 (Doc. No. 213, March 2024), sec. 3.4.2 p.5 (PDF p.12), sec. 3.8.1 p.7 (PDF p.14), sha256:50c478415d77dc963b9b97d77cee43ea448efc90bd2fed4f6639803e3fbf5e70 — https://actuarialstandardsboard.org/wp-content/uploads/2024/05/asop036_213.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Unpaid Claims Estimates (2014), pp.1-2, header and Principle 2 (lines 59-64), sha256:433d161e2b374ce00e733ea956b38f42d784ed7501419704b88bee96a51edd19 — https://www.casact.org/sites/default/files/2021-04/Statement_of_Principles_Regarding_Property_and_Casualty_Unpaid_Claims_Estimates_2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Range of Indications.md
---

A **Range of Indications** is the spread of unpaid-claim estimates obtained when several reasonable methods, models or assumption sets are applied to the same data. It is the evidence from which the actuary selects a point estimate and states a range of reasonable estimates. It measures uncertainty about the estimate of the mean, which is a different thing from the range of possible outcomes described by an [[Unpaid Claim Distribution|unpaid claim distribution]].

The range of indications from a set $M$ of methods judged appropriate for the data is

> $$\text{Range} = \Big[\min_{m \in M} \hat R_m,\; \max_{m \in M} \hat R_m\Big]$$

- $\hat R_m$ is method $m$'s estimate of unpaid claims or IBNR.

The range is built by accident year from methods such as paid and reported development, [[Expected Loss Method|expected claims]], [[Bornhuetter-Ferguson Method|BF]], [[Cape Cod Method|Cape Cod]], [[Benktander Method|Benktander]] and [[Frequency-Severity Method|frequency-severity]]. Any method whose assumptions a [[Data Diagnostic Analysis|diagnostic]] has shown to fail is dropped first.

A method the data contradicts does not widen the range. If settlement has sped up, the paid chain ladder's high answer is a known bias, not evidence of uncertainty. Leaving it in overstates the range, and leaving out a sound method that disagrees understates it.

> [!example]- What range of reasonable estimates should the actuary state for this commercial auto book? {Example}
> Total IBNR indications for the book, in $\$000$s, are:
>
> | Method | IBNR |
> | :--- | ---: |
> | Reported development | 4,200 |
> | Paid development | 6,100 |
> | Expected claims | 5,000 |
> | BF (reported) | 4,700 |
> | BF (paid) | 5,300 |
>
> Closure rates at every maturity have risen sharply over the last two calendar years, and paid-to-reported ratios with them.
>
> > [!answer]-
> > - The raw spread is $4{,}200$ to $6{,}100$, which is $1{,}900$ wide.
> > - Rising closure rates mean payments are running ahead of the historical pattern. The paid development method applies old, slower factors to a faster diagonal, so it is biased high.
> > - Paid BF is biased high to a lesser degree, because its percentage unpaid comes from the same stale pattern.
> > - Dropping paid development and noting the upward lean of paid BF, the range of reasonable estimates is $[4{,}200,\ 5{,}300]$, which is $1{,}100$ wide.
> > - If the paid triangle were restated to current disposal rates ([[Berquist-Sherman Method|Berquist-Sherman]]), its result could come back into the range.

## Modeled and weighted ranges

In Shapland's stochastic version, the actuary runs several bootstrap models (paid and incurred chain ladder, BF, Cape Cod, GLM) and weights them by year to get a best-estimate distribution. Each accident year's best estimate uses the actuary's selected weights for that year, so it draws only on the models given weight in that year.

The **modeled range** spans the means of every model used anywhere. A model counts as used if it has weight in any accident year, and each model's total is the sum of its accident-year means.

The **weighted range** uses, for each year, only the models given weight in that year. Its ends are the sums, across accident years, of the lowest and of the highest of those models' means. It is the more representative view of uncertainty in the actuarial central estimate.

> [!example]- What are the best estimate, the weighted range and the modeled range for these two accident years? {Example}
> Three bootstrap models give mean unpaid claims, in $\$000$s, with the actuary's weights in brackets:
>
> | Model | AY A (mature) | AY B (latest) |
> | :--- | ---: | ---: |
> | Paid CL | 100 (50%) | 900 (0%) |
> | Incurred CL | 110 (50%) | 700 (25%) |
> | BF | 105 (0%) | 760 (75%) |
>
> > [!answer]-
> > - The best estimate for AY A is $0.5(100) + 0.5(110) = 105$.
> > - The best estimate for AY B is $0.25(700) + 0.75(760) = 745$, so the total best estimate is $850$.
> > - For the weighted range, AY A uses paid and incurred CL, giving $[100, 110]$, and AY B uses incurred CL and BF, giving $[700, 760]$. The weighted range is $[800, 870]$.
> > - For the modeled range, the model totals are $100 + 900 = 1{,}000$ for paid CL, $110 + 700 = 810$ for incurred CL and $105 + 760 = 865$ for BF. The modeled range is $[810, 1{,}000]$.
> > - The modeled range's top end is set by the paid chain ladder on AY B, a model the actuary gave *no* weight for that year. The weighted range reflects the actual judgment.

## Ranges for reinsurance

In Friedland's reinsurance examples, the range of indicated IBNR, the maximum less the minimum across methods, was wider for reinsurance than for primary business. It was also wider for non-proportional than for proportional covers, and for catastrophe than for non-catastrophe property ([[Reinsurance Reserving|reinsurance reserving]]).

## Ranges in the standards

The CAS Statement of Principles on unpaid claims estimates, adopted in November 2014 and rescinded by the CAS Board in December 2020, says in its [[Actuarial Principles#The unpaid claims principles|Principle 2]] that uncertainty "implies that a range of estimates can be reasonable". [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] §3.7.3 allows a point estimate, a range of estimates, a point estimate with a margin for adverse deviation, or a probability distribution. In the U.S., ASOP 36 treats carried reserves as a reasonable provision when they fall within a range of estimates the actuary considers reasonable.
