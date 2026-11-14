---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2053da4ce49033a0b44dc179959d904b6242f7fc617f21e612a5f708adc7069e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Opinion Summary.md
---
An **Actuarial Opinion Summary** (AOS) is the confidential supplement in which a U.S. property-casualty insurer's [[Appointed Actuary]] gives the domiciliary regulator the numbers the public [[Statement of Actuarial Opinion]] leaves out. It reports the actuary's range and/or point estimate of loss and loss adjustment expense reserves, the company's carried reserves, and the difference between them, each net and gross of reinsurance.

The public opinion says only whether the carried reserve is reasonable ([[SAO Language]]). The AOS says where in the actuary's range it sits. Because that is proprietary, the AOS is not filed with the NAIC, is kept separate from any copy of the opinion and is not for public inspection, though it may refer to the opinion and its date.

## Required contents

The AOS is signed and dated by the actuary who signed the opinion. It contains:

- **(A)** the actuary's range of reasonable estimates, net and gross, when calculated.
- **(B)** the actuary's point estimate, net and gross, when calculated.
- **(C)** the company's carried loss and LAE reserves, net and gross.
- **(D)** the difference between the carried reserves and the estimates in (A) and (B), net and gross.
- **(E)** where the adverse development test below is met, an explicit description of the reserve elements or management decisions that were the major contributors.

An actuary who produces only a range reports only a range. For item (D), the difference for each estimate is

> $$\text{Difference} = \text{Carried} - \text{Actuary's estimate}$$

- $\text{Actuary's estimate}$ is the low end of the range, the point estimate or the high end of the range.

## The adverse development test

Item (E) is required when [[Schedule P]] Part 2 Summary shows one-year adverse development above $5\%$ of the prior year-end policyholders' surplus in three or more of the past five calendar years. The ratio tested for calendar year $t$ is

> $$\frac{\text{One-year adverse development}_t}{\text{Surplus}_{t-1}}$$

- $\text{One-year adverse development}_t$ is the development on prior-year reserves during calendar year $t$, adverse positive.
- $\text{Surplus}_{t-1}$ is policyholders' surplus at the end of year $t-1$.

> [!example]- What does this company's Actuarial Opinion Summary report? {Example}
> At year-end 2025, figures in $\$$ millions, the Appointed Actuary's net loss and LAE range is $410$ to $480$ with a point estimate of $440$, and the company carries $425$. Gross, the range is $520$ to $610$, the point estimate $560$ and the carried reserve $548$. One-year development on prior-year reserves from Schedule P Part 2 Summary, against the prior year-end surplus, is:
>
> | Calendar year | Development | Prior surplus |
> | :--- | ---: | ---: |
> | 2021 | 18 | 300 |
> | 2022 | 9 | 310 |
> | 2023 | 21 | 320 |
> | 2024 | 17 | 330 |
> | 2025 | 12 | 340 |
>
> > [!answer]-
> > - Items (A) to (C) are the figures given: the net and gross ranges, point estimates and carried reserves.
> > - Item (D), net: carried minus estimate is $425 - 410 = +15$ against the low end, $425 - 440 = -15$ against the point estimate and $425 - 480 = -55$ against the high end.
> > - Item (D), gross: $548 - 520 = +28$, $548 - 560 = -12$ and $548 - 610 = -62$.
> > - The development ratios are $18/300 = 6.0\%$, $9/310 = 2.9\%$, $21/320 = 6.6\%$, $17/330 = 5.2\%$ and $12/340 = 3.5\%$.
> > - Three of the five years (2021, 2023 and 2024) exceed $5\%$, so the AOS must also describe which reserve elements or management decisions drove that development.
> > - The public opinion will say the reserves are reasonable, because net carried is inside the range. The AOS shows that carried sits $15$ below the point estimate, only $15/70 = 21\%$ of the way up the range, at a company whose reserves have repeatedly developed adversely.

## Filing and access

Where the domiciliary state requires an AOS, it is filed there by March 15 (or a later date the state sets), two weeks after the opinion goes out with the [[NAIC Annual Statement]]. A non-domiciliary state can obtain it within 15 days of a request, no earlier than March 15, and only if it shows it can keep the document confidential. Exemptions are the same as for the opinion.

## Consistency with the other filings

The net and gross figures should reconcile to the Annual Statement, the opinion and the [[Actuarial Report]], or the difference must be explained. A pool member states its pooling percentage and reports its own share, and a $0\%$ participant reports the lead company's figures. If factually incorrect data made the AOS wrong, the same notice to the board within 5 business days and amended filing apply as for the opinion.

A carried reserve near the bottom of the range, combined with repeated adverse development, is the pattern [[Solvency Monitoring|solvency surveillance]] looks for. The AOS supplies it alongside the reserve tests in the [[IRIS Ratios]] without making it public. It is one of the [[Appointed Actuary Responsibilities]] and should follow ASOP Nos. 23, 41 and [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|43]].

## Net and gross opinions

When the opinion's scope covers both direct-and-assumed and net reserves, ASOP No. 36 requires an opinion on each basis. Exhibit B is completed on the net basis, and a different gross answer must be identified and discussed in the Relevant Comments.

> [!example]- What does this AOS show, and what follows for the opinion? {Example}
> Figures are in $\$$ millions. Net, the actuary's range is $300$ to $350$, the point estimate $325$ and the carried reserve $310$. Gross, the range is $420$ to $500$, the point estimate $460$ and the carried reserve $405$.
>
> > [!answer]-
> > - Net carried is $10$ above the low end and $15$ below the point estimate, so the net reserve is reasonable.
> > - Gross carried is $405 - 420 = -15$ against the low end, which is below the range.
> > - The gross opinion is therefore deficient or inadequate, and must disclose the minimum reasonable amount, $420$.
> > - Exhibit B is completed on the net basis (type R), and the different gross answer is identified and discussed in the Relevant Comments.
> > - At the point estimates the actuary expects $460 - 325 = 135$ to be recovered from reinsurers. The company carries $405 - 310 = 95$.
> > - Of the $55$ gross shortfall against the point estimate, $40$ is expected to be ceded, so the net figure is adequate only if reinsurers pay more than the company has booked.
> > - The reinsurers' ability to pay ([[Schedule F]], ratings, overdue recoverables) is the regulator's next question.

> [!trap] Reading a reasonable net reserve as reasonable gross
> A net carried reserve inside the range says nothing about the gross one. Check each basis against its own range. In the example above, the net reserve is reasonable while the gross reserve falls $15$ below its low end.
