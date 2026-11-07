---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd26490490eb4074b7b08764fc15cd8aff5ee80dfb51dbbb340317dd9331b3c3
  sources:
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§3.3, 3.6.1, 3.8, 4.1-4.2, pp.3-10 (PDF pp.8-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5, 9-10 (PDF pp.10-11, 15-16); Ch.15 pp.350-351 (PDF pp.356-357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Reserve Communication.md
---

![[Media/Figures/Reserve_Communication.svg|340]]

**Reserve Communication** is the actuary's account of an [[Unpaid Claims|unpaid claim estimate]] to the people who will use it: what the estimate is, how it was derived, how uncertain it is and why it has changed. [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] sets what the communication must disclose, consistent with the estimate's intended purpose or use:

1. **Purpose.** The intended purpose or uses of the estimate.
2. **Limitations.** Any significant limitation that constrained the analysis, so that a more in-depth analysis could produce a materially different result.
3. **Scope.** The intended measure (such as an actuarial central estimate, a high or low estimate, or a mean plus a risk margin) and whether it is discounted, whether it is gross or net of specified recoverables, which claim adjustment expenses it covers, and which claims.
4. **Dates.** The accounting date, the valuation date of the data, and the review date through which information was considered.
5. **Risks and uncertainties.** Specific significant risks and uncertainties about whether actual results may vary from the estimate.
6. **Assumptions and reliances.** Significant events, assumptions or reliances with a material effect on the estimate, including assumptions supplied by others.
7. **Departures.** Any prescribed assumption or method, any reliance on other sources that disclaims responsibility for an assumption, and any material deviation from the standard.

> [!example]- An actuary's report says only "The best estimate of unpaid claims is $\$50{,}000{,}000$." What does it fail to tell the reader? {Example}
> - "Best estimate" describes the quality of the estimate, not its objective, so the intended measure is not identified.
> - It does not say whether the amount is discounted, gross or net of reinsurance and other recoverables, or which adjustment expenses and claims it covers.
> - It gives no accounting, valuation or review date, so the reader cannot tell what information it reflects.
> - It discloses no significant risks, uncertainties or assumptions, so the reader cannot tell how far the actual result could fall from it.

## Communicating a change in the estimate

When an estimate updates a previous one, the actuary discloses the changes in assumptions, procedures, methods or models that have a material effect on it, and the reasons for them as far as the actuary knows them. The standard does not require their effect to be quantified. A change in the unpaid claims also reflects the new accident period and the payments made, which are not a change of view, so the change of view is separated from them by a [[Roll Forward Analysis|roll forward]]. Within the change of view, the part caused by claims emerging differently from expected is separated from the part caused by a new method or assumption.

> [!example]- General liability unpaid claims rose $\$8.0$M in a year: $\$5.2$M from adverse development on accident years 2021–2023 as litigated claims settled for more, $\$1.9$M from a longer tail factor chosen after a benchmark study, and $\$0.9$M from the new accident year net of payments. How should the change be explained to management? {Example}
> - The $\$0.9$M is the ordinary arrival of a new accident year less payments, not a change of view.
> - The $\$5.2$M is claims emerging worse than expected, so it says the cost of litigated claims is higher than the estimate assumed.
> - The $\$1.9$M is a change of assumption, which is disclosed with its reason, the benchmark study.
> - Higher severity on litigated claims than assumed also bears on the current rates, so the explanation reaches pricing as well as the balance sheet.

## Communicating uncertainty

An estimate may be presented as a point estimate, a range of estimates, a point estimate with a margin for adverse deviation, or a probability distribution of the unpaid claims, chosen for its intended purpose. A range is disclosed with its basis: a range of reasonable estimates of the intended measure, or a confidence interval from a model or reflecting certain risks. An estimate that swings from one valuation to the next moves the reported results and the financial metrics that investors, rating agencies and regulators watch, so its volatility is part of what is communicated.

> [!example]- An actuary's central estimate is $\$47.5$M within a range of reasonable estimates of $\$43$M to $\$54$M. Management asks for "just the number". What should the communication give? {Example}
> - It gives the central estimate as the number, identified as an actuarial central estimate.
> - It discloses the range with its basis, a range of estimates each reasonable on its own.
> - It names the significant risks behind the range, such as the tail factor or the severity trend, so management knows which assumptions could move the result.
> - The range is $\$6.5$M above the central estimate and $\$4.5$M below it, so the upside risk to the liability is larger than the downside, which bears on how much capital to hold.
