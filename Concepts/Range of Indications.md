---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:a4de8282fdb9fdedd1c2cf063d1667addffc1655995e2b38477e72156e0e33f4
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

**A range of indications** is the spread of unpaid-claim estimates obtained when several reasonable methods, models or assumption sets are applied to the same data. It is the evidence from which the actuary selects a point estimate and states a range of reasonable estimates. It measures uncertainty about the **estimate of the mean**. That is a different thing than the range of possible **outcomes** described by an [[Unpaid Claim Distribution|unpaid claim distribution]].

> $$\text{Range} = \Big[\min_{m \in M} \hat R_m,\; \max_{m \in M} \hat R_m\Big]$$

> $$\text{Range of reasonable estimates} \subset \text{Range of possible outcomes}$$

- $M$ is the set of methods judged **appropriate** for the data, and $\hat R_m$ is method $m$'s estimate of unpaid claims or IBNR. Build it by accident year: paid and reported development, [[Expected Loss Method|expected claims]], [[Bornhuetter-Ferguson Method|BF]], [[Cape Cod Method|Cape Cod]], [[Benktander Method|Benktander]] and [[Frequency-Severity Method|frequency-severity]]. First drop any method whose assumptions a [[Data Diagnostic Analysis|diagnostic]] has shown to fail.
- **A method the data contradicts does not widen the range.** If settlement has sped up, the paid chain ladder's high answer is a known bias, not evidence of uncertainty. Leaving it in overstates the range; leaving out a sound method that disagrees understates it.
- **Stochastic version (Shapland).** Run several bootstrap models (paid and incurred chain ladder, BF, Cape Cod, GLM) and weight them by year to get a best-estimate *distribution*. The **modeled range** spans the means of every model used anywhere. The **weighted range** uses, for each year, only the models given weight in that year. It is the more representative view of uncertainty in the actuarial central estimate.
- **Reinsurance ranges are wider.** In Friedland's reinsurance examples, the range of indicated IBNR (maximum less minimum across methods) was wider for reinsurance than for primary business, for non-proportional than for proportional covers, and for catastrophe than for non-catastrophe property. See [[Reinsurance Reserving]].
- **Professional basis.** The CAS Statement of Principles on unpaid claims estimates (adopted November 2014, rescinded by the CAS Board in December 2020; Principle 2, see [[Actuarial Principles]]) says uncertainty "implies that a range of estimates can be reasonable". [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] §3.7.3 allows a point estimate, a range of estimates, a point estimate with a margin for adverse deviation, or a probability distribution. In the U.S., ASOP 36 treats carried reserves as a reasonable provision when they fall within a range of estimates the actuary considers reasonable.

> [!example]- Screening Methods Before Stating a Range {Example}
> Total IBNR indications (\$000s) for a commercial auto book: reported development $4{,}200$; paid development $6{,}100$; expected claims $5{,}000$; BF (reported) $4{,}700$; BF (paid) $5{,}300$. Closure rates at every maturity have risen sharply over the last two calendar years, and paid-to-reported ratios with them.
>
> State a range of reasonable estimates.
>
> > [!answer]-
> > The raw spread is $4{,}200$ to $6{,}100$, which is $1{,}900$ wide.
> >
> > Rising closure rates mean payments are running ahead of the historical pattern. The paid development method applies old, slower factors to a faster diagonal, so it is **biased high**. The same is true, to a lesser degree, of paid BF, whose "percentage unpaid" comes from the same stale pattern.
> >
> > Dropping paid development and noting the upward lean of paid BF:
> >
> > $$
> > \begin{align*}
> > \text{Range} &= [4{,}200,\ 5{,}300] \\
> > \text{Width} &= 1{,}100
> > \end{align*}
> > $$
> >
> > A selection near $4{,}800$, between reported BF and expected claims, is defensible. If the paid triangle were restated to current disposal rates ([[Berquist-Sherman Method|Berquist-Sherman]]), its result could come back into the range.
> >
> > A bootstrap on the same data might put the 25th to 75th percentiles of *outcomes* at $4{,}300$ to $5{,}600$. That band is not a competing range of reasonable estimates. It says where the actual payments may land, not where a reasonable estimate of their mean may lie.

> [!example]- Modeled Versus Weighted Range {Example}
> Three bootstrap models give mean unpaid (\$000s) for two accident years:
>
> - AY A (mature): paid CL $100$, incurred CL $110$, BF $105$. Weights $50\% / 50\% / 0\%$.
> - AY B (latest): paid CL $900$, incurred CL $700$, BF $760$. Weights $0\% / 25\% / 75\%$.
>
> Find the best estimate and both ranges.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Best}_A &= 0.5(100) + 0.5(110) \\
> > &= 105 \\
> > \text{Best}_B &= 0.25(700) + 0.75(760) \\
> > &= 745 \\
> > \text{Best} &= 850
> > \end{align*}
> > $$
> >
> > - **Weighted range**, using only the models given weight in each year: A is $[100, 110]$ and B is $[700, 760]$, so the total is $[800, 870]$.
> > - **Modeled range**, using the totals of every model used anywhere: paid CL $100 + 900 = 1{,}000$, incurred CL $110 + 700 = 810$ and BF $105 + 760 = 865$, so the range is $[810, 1{,}000]$.
> >
> > The modeled range's top end is set by the paid chain ladder on AY B, a model the actuary gave *no* weight for that year. The weighted range reflects the actual judgment and is the better statement of uncertainty in the central estimate.
