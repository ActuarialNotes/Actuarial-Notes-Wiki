---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:a480918b7b65adb9ecf56790216b839249d2a0a8a2c0893b71923b947092eb70
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 pp.4-5, 9-10, 14 (PDF pp.10-11, 15-16, 20), Ch.3 pp.39-43 (PDF pp.45-49), Ch.4 p.44 (PDF p.50), Ch.15 pp.345, 351 (PDF pp.351, 357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§2.1, 3.3(a), 4.1(c),(f), 4.2(b), PDF pp.7-9, 14-15, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Reserving.md
---

![[Media/Figures/Loss_Reserving.svg|340]]

**Loss Reserving** is the estimation of an insurer's liability for [[Unpaid Claims|unpaid claims]], the claims that occurred on or before the valuation date and have not yet been paid. It is retrospective, where [[Ratemaking|ratemaking]] is prospective: it estimates what past claims will finally cost. An accident year's unpaid claims are

> $$\text{Unpaid Claims} = \text{Case Outstanding} + \text{IBNER} + \text{IBNYR}$$

- $\text{Case Outstanding}$ is the case reserves the claims department has set on known claims.
- $\text{IBNER}$ is the future development on known claims.
- $\text{IBNYR}$ is pure IBNR, the claims incurred but not yet reported.

Reopened claims and claims in transit, reported but not yet recorded, complete the broad [[IBNR]], which is everything in the unpaid claims except the case outstanding. The unpaid claims are also the [[Ultimate Loss|ultimate claims]] less the paid claims.

> [!example]- An insurer has $\$10{,}000{,}000$ of reported claims and $\$6{,}000{,}000$ of paid claims for accident year 2025. The analysis indicates ultimate claims of $\$13{,}000{,}000$. What are its case outstanding, IBNR and unpaid claims? {Example}
> - The case outstanding is $10{,}000{,}000 - 6{,}000{,}000 = \$4{,}000{,}000$.
> - The IBNR is $13{,}000{,}000 - 10{,}000{,}000 = \$3{,}000{,}000$, both IBNER on known claims and pure IBNR on claims not yet reported.
> - The unpaid claims are $4{,}000{,}000 + 3{,}000{,}000 = \$7{,}000{,}000$, the ultimate less the paid claims.

## The steps of an unpaid claims analysis

1. **Understand the business.** Meet claims, underwriting and management to learn of changes in business mix, coverages, limits, catastrophe exposure, regulation and claims operations, which the data cannot show. The development patterns and the volume of data come from the data itself.
2. **Organize the data** ([[Reserving Data Organization]]): accident, policy, report or underwriting year; gross, ceded and net; grouped for [[Homogeneity|homogeneity]] against [[Credibility|credibility]]. Catastrophe claims develop differently and are analyzed apart from other claims, with a catastrophe model or load for the events.
3. **Build the triangles** of [[Paid Losses|paid]] and [[Incurred Losses|reported]] claims, [[Claim Count Triangle|claim counts]], [[Allocated Loss Adjustment Expense|ALAE]] and recoveries.
4. **Diagnose the data** before estimating: paid-to-reported ratios, average case outstanding, closure rates, severities and frequencies by age.
5. **Adjust** where a diagnostic demands it, with the [[Berquist-Sherman Method|Berquist-Sherman]] adjustments for a change in [[Case Adequacy|case adequacy]] or [[Settlement Rate|settlement rate]], and separate treatment of [[Large Loss|large]] and [[Catastrophe Loss|catastrophe]] claims.
6. **Apply several methods** to paid and reported data: the [[Chain Ladder Method|development technique]], [[Expected Loss Method|expected claims]], [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]], [[Cape Cod Method|Cape Cod]], [[Benktander Method|Benktander]], [[Frequency-Severity Method|frequency-severity]] and [[Case Outstanding Development Method|case outstanding development]].
7. **Select** ultimate claims by accident year, with reasons, and add the [[Unallocated Loss Adjustment Expenses ULAE|ULAE]].
8. **Monitor** the estimate between analyses, with [[Actual vs Expected Analysis|actual-versus-expected]] and [[Roll Forward Analysis|roll-forward]] comparisons, and [[Reserve Communication|communicate]] it.

To choose among the methods, the actuary asks the claims department about changes in case reserving or settlement practice, confirms the cause with the diagnostics, and relies on the methods the change does not distort. When the estimates for a year shift across valuations, management is asked about operational changes that could explain it. [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] requires the actuary to identify the intended measure of the estimate, such as an actuarial central estimate, a mean, a median or a high or low estimate. The scope, the significant assumptions and any material change in assumptions or methods since a previous estimate are disclosed with it.

> [!example]- At 24 months, one accident year's ultimates are $\$8.9$M from paid development, $\$7.6$M from reported development, $\$7.8$M from expected claims and $\$7.7$M from reported Bornhuetter-Ferguson. What should the actuary investigate? {Example}
> - Three estimates cluster near $\$7.7$M, and the paid development estimate is 16% above them.
> - All four use the same claims, so the gap says something about the paid data.
> - Payments running ahead of their historical pattern point to faster settlement, or to a few large claims paid early.
> - The ratios of closed to reported counts and of paid to reported claims, against their history, tell which.
> - If settlement has sped up, the paid triangle is restated with the Berquist-Sherman adjustment and the paid method re-run, rather than the four estimates averaged.

## Why the estimate matters

Management uses the unpaid claims estimate in pricing, underwriting, strategic and financial decisions. An understated estimate makes recent results look more profitable than they are. The insurer may then cut rates, or keep rates that are inadequate, loosen underwriting, expand into unprofitable segments or pay out capital it lacks, and gaining market share at the lower rates makes it worse, until its solvency is at risk. An overstated estimate can lead to unnecessary rate increases, lost market share or the exit from a profitable line.

> [!example]- An insurer needs $\$3{,}000{,}000$ of IBNR for AY 2025, on $\$10{,}000{,}000$ of earned premium, but books $\$2{,}000{,}000$. What does the shortfall do? {Example}
> - Surplus is overstated by $\$1{,}000{,}000$.
> - The AY 2025 claim ratio is understated by $1{,}000{,}000/10{,}000{,}000 = 10$ points.
> - That understated ratio feeds the next rate indication, which then calls for rates that are too low on business already underpriced.

> [!trap] Averaging methods that disagree
> When paid and reported estimates disagree, the gap is a diagnostic about the data, not a range to average. In the 24-month example, averaging the four estimates gives $\$8.0$M, which carries a quarter of the paid method's $\$1.2$M distortion into the selection. The cause is found first, and the distorted method set aside or its data restated.
