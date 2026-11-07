---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f4797ce5b75b98cd37d818c2253a3449acd404597a47e72d67d8fb7d90b87c07
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.5 p.55-56 (PDF 61-62) incremental paid triangle by calendar period; Ch.8 p.133 (PDF 139) reform restatement; Ch.9 p.152 (PDF 158) BF uses the development technique's patterns; Ch.11 pp.204, 209-210 (PDF 210, 215-216) reform-adjusted and trended severities; Ch.13 p.283 (PDF 289) report-year data after a legal shift, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS Exam 5 Spring 2017 — sample answers and examiner's report, Q23 part a, pp.88-89, sha256:f42f48b0e1bec884aba2e4c0eca91ee2b95b3f5cc6fd7f02de78086899f9e0c6 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp17-5.pdf"
    - "CAS Exam 5 Fall 2015 — sample answers and examiner's report, Q22 part b, p.85, sha256:a3367c88f08abf0726c14d2034c8772c03594cbcf07494b93b35b6433dbca42c — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f15-5.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Changing Conditions.md
---

**Changing Conditions** are changes in an insurer's internal operations or in its external environment that make its historical claims data a poor guide to how its current claims will develop. Every development-based estimate of [[Unpaid Claims|unpaid claims]] assumes that claims to date will continue to develop in the same way as past claims at the same ages, and a changing condition is whatever breaks that assumption.

A change is one of two kinds:

1. **Internal**, within management's control: changes in [[Claims Coding Changes|claims coding]], in [[Claims Processing Changes|claims processing]] such as [[Case Adequacy|case reserve adequacy]] and the [[Settlement Rate|settlement rate]], in [[Underwriting Changes|underwriting]], [[Policy Provision Changes|policy provisions]] and marketing, in [[Reinsurance|reinsurance]] retentions and limits, and in the treatment of [[Recoveries|recoveries]], subrogation, litigation and fraud.
2. **External**: changes in the legal and social environment, such as [[Tort Reform|tort reform]], new court rulings and backlogs in the courts, and in the economic environment, such as [[Inflation|inflation]].

A catastrophe is an external event, not an internal change. The reported [[Chain Ladder Method|development technique]] assumes that case reserve adequacy, claims processing and the mix of claims, limits and deductibles are unchanged, and the paid development technique assumes that the speed of settlement is unchanged. An external change, such as a legal change, can break both assumptions at once while case reserving and settlement speed stay the same.

> [!idea] The idea
> A change biases every technique that uses the data it touches, and leaves the others alone.

Friedland runs each technique, unadjusted, through these changes. Each entry is the bias in the estimate of unpaid claims.

| Technique | Rising claim ratios | Case reserves strengthened | Faster settlement | Growth in a slower-developing segment |
| --- | --- | --- | --- | --- |
| Reported development | None | Overstates | None | Understates |
| Paid development | None | None | Overstates | Understates |
| Expected claims | Understates | None | None | Understates |
| Reported Bornhuetter-Ferguson | Understates | Overstates, less than reported development | None | Understates |
| Paid Bornhuetter-Ferguson | Understates, more than reported BF | None | Overstates | Understates |
| Reported Cape Cod | Understates, less than BF | Overstates, more than reported BF | None | Understates |

The [[Expected Loss Method|expected claims technique]] responds to a rising claim ratio only if the actuary raises the expected claim ratio, and the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson technique]] inherits that weakness. Under case strengthening the reported development technique multiplies a higher reported diagonal by higher development factors, while reported BF applies its higher factors only to unchanged expected claims. The [[Cape Cod Method|Cape Cod technique]] derives its expected claim ratio from reported claims, so case strengthening raises both its ratio and its factors. A shift toward a faster-developing segment does the reverse of the last column: factors built on the older, slower mix are too high, and the techniques overstate.

> [!example]- A stable auto book develops each accident year to $\$10{,}000{,}000$. Historically $50\%$ of ultimate is reported and $30\%$ paid at $12$ months. This year case reserves were strengthened by $40\%$, so the latest year shows $\$3{,}000{,}000$ paid and $\$2{,}800{,}000$ of case outstanding at $12$ months. With an a priori of $\$10{,}000{,}000$, what do reported and paid development and reported and paid BF estimate? {Example}
> - The reported CDF is $1/0.50 = 2.000$, and the paid CDF is $1/0.30$.
> - Reported development gives $5{,}800{,}000 \times 2.000 = \$11{,}600{,}000$.
> - Paid development gives $3{,}000{,}000/0.30 = \$10{,}000{,}000$.
> - Reported BF adds the expected unreported claims, $10{,}000{,}000 \times (1 - 0.50)$, to the $\$5{,}800{,}000$ reported, for $\$10{,}800{,}000$.
> - Paid BF adds the expected unpaid claims, $10{,}000{,}000 \times (1 - 0.30)$, to the $\$3{,}000{,}000$ paid, for $\$10{,}000{,}000$.
> - The true ultimate is $\$10{,}000{,}000$. Reported development overstates it by $\$1{,}600{,}000$, reported BF by the $\$800{,}000$ of strengthening only, and the paid techniques are unaffected.

## Diagnosing a change from the estimates

A gap between the paid and the reported estimates signals that case reserves or settlement differ from history. Reported estimates above paid ones point to stronger case reserves or slower settlement, and paid estimates above reported ones to faster settlement or weaker case reserves. The [[Data Diagnostic Analysis|diagnostics]] decide which: average case outstanding, the ratio of closed to reported claim counts and the ratio of paid to reported claims. When an accident year's estimates shift from one evaluation to the next, the actuary asks management what has changed, such as case reserving, the speed of settlement or the handling of large claims.

Reported claims above expectation at a constant claim frequency, with no large or catastrophe claims and no change in case adequacy or claims handling, point to a higher severity (a shift in the mix of business, a legal change), more exposure, lower deductibles or more claims retained under the reinsurance.

A Bornhuetter-Ferguson estimate is the claims to date plus the expected claims times the percentage still to develop, so the expected claims behind it are

> $$\text{Expected Claims} = \frac{\text{BF Ultimate} - \text{Claims to Date}}{1 - 1/\text{CDF}}$$

- $\text{Claims to Date}$ and $\text{CDF}$ are both paid or both reported, as in the BF estimate.

> [!example]- The paid BF estimate of an accident year is $\$10{,}000{,}000$, with $\$3{,}000{,}000$ paid and a paid CDF of $1/0.30$. Reported claims are $\$5{,}800{,}000$ and the reported CDF is $2.000$. What is the reported BF estimate? {Example}
> - The percentage unpaid is $1 - 0.30 = 0.70$.
> - The BF estimate exceeds the paid claims by $\$7{,}000{,}000$, so the expected claims are $7{,}000{,}000/0.70 = \$10{,}000{,}000$.
> - The percentage unreported is $1 - 1/2.000 = 0.50$.
> - The reported BF estimate adds $10{,}000{,}000 \times 0.50$ to the $\$5{,}800{,}000$ reported, for $\$10{,}800{,}000$.

## Responding to a change

Berquist and Sherman's responses, as Friedland presents them, are:

1. **Use data the change does not touch**: paid techniques after a change in case reserving, reported techniques after a change in settlement speed, and the expected claims technique when a reliable expected claim ratio that reflects the new environment can be estimated.
2. **Rearrange the data**: [[Policy Year|policy year]] in place of accident year after a change in limits or deductibles, [[Report Year|report year]] after a shift in the legal climate that makes severity follow the report date, and homogeneous segments after a change in the [[Mix of Business|mix of business]].
3. **Adjust the data**: the [[Berquist-Sherman Method|Berquist-Sherman]] adjustments for case adequacy and settlement rate, and restating history to the current retention, deductible or benefit level.
4. **Adjust the a priori**: put the expected claim ratio on current [[Rate Level Change|rate level]], trend and legal environment.

After a change in reinsurance terms, the actuary estimates ultimate claims on gross data and applies the new contract, or restates the prior years' net data to the new terms. A change in the per-occurrence retention or limit changes the layer of loss in the data, so mixing retentions in one triangle distorts its age-to-age factors. A legal change that lowers severity on open claims makes historical development factors too high, so the development technique overstates. The Bornhuetter-Ferguson technique uses the same reporting and payment patterns, so its percentage unreported is distorted too. One that raises severity makes it understate, and the development technique recognizes the change only as it emerges in the claims. A change in severity that applies to payments made after a date is restated on the incremental paid triangle, since each incremental cell was paid in one calendar period. The incremental payments made before the date are restated to the new level, and the triangle is cumulated again before factors are selected.

> [!example]- A tort reform cuts the cost of claims by $20\%$ for accidents on or after $1/1/2025$. How are accident years $2022$ to $2025$ restated to the new legal environment? {Example}
> - Claims from accidents before the reform would cost $20\%$ less if they occurred today, so accident years $2022$ to $2024$ are multiplied by a reform factor of $1 - 0.20 = 0.80$.
> - Accident year $2025$ occurred entirely after the reform, so its claims are not adjusted.
> - A reform effective mid-year would affect only the part of that year's claims after the date, so that year's factor is pro rata.

> [!example]- An actuary learns that a new claims system opens a file per claimant rather than per accident, that the per-occurrence retention rose from $\$500{,}000$ to $\$1{,}000{,}000$, that a marketing push is growing commercial auto $30\%$ a year inside a personal auto book, and that a reform capped non-economic damages. Which changes are internal, and what does each distort? {Example}
> - The claimant files are an internal coding change. Reported counts jump with no change in cost, so frequency rises and severity falls.
> - The retention is an internal reinsurance change. Net factors from years capped at $\$500{,}000$ understate the development of the new net layer.
> - The marketing push is internal and shifts the mix toward a slower-developing segment. Factors from the old mix understate the recent years, so the triangles are split.
> - The reform is external. Factors and claim ratios from before it overstate the claims after it, so accident years are split at its date and the expected claim ratio is adjusted.
