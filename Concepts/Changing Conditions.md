---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b99d89acba68b3c1bcd8c15794ee42cb3c57d040552ead561e4ebf4858c8c79
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Changing Conditions.md
---

**Changing Conditions** are changes in an insurer's internal operations or in its external environment during the experience period that make historical claims data a biased guide to future development. Every development-based estimate of [[Unpaid Claims|unpaid claims]] assumes the past pattern will repeat; a changing condition is whatever breaks that assumption.

> $$\widehat{\text{Ult}}_i = C_{i,k} \times \text{CDF}_k^{\,\text{hist}}$$

- $C_{i,k}$ is accident year $i$'s reported (or paid) claims at age $k$ and $\text{CDF}_k^{\,\text{hist}}$ is estimated from older years. Friedland: with reported claims the [[Chain Ladder Method|development technique]] implicitly assumes no change in [[Case Adequacy|case adequacy]]; with paid claims, no change in the speed of settlement.
- **Internal (operating) changes** — the subjects of Friedland's management interview:
  - [[Claims Coding Changes|claims coding]] (claimant vs. occurrence counts, reopened claims) and [[Claims Processing Changes|claims processing]] (staffing, systems, case reserving guidelines, fast-track limits, [[Settlement Rate|settlement speed]]);
  - [[Underwriting Changes|underwriting]] and [[Policy Provision Changes|policy provisions]] (eligibility, deductibles, limits, forms);
  - **marketing** — new programs, target markets or distribution channels, which change *who* is insured;
  - [[Reinsurance|reinsurance]] retentions and limits, which change what a net triangle contains;
  - the treatment of [[Recoveries|recoveries]] — whether data are net or gross of [[Deductible Recovery|deductibles]] and [[Salvage and Subrogation|salvage and subrogation]].
- **External environment:** [[Inflation|inflation]] (a calendar-year effect on every open claim), the legal environment ([[Tort Reform|tort reform]], court decisions, [[Tort Litigation|litigation]] rates), and the [[Rate Level Change|rate level]] and [[Mix of Business|mix]] the market produces.
- **Which estimate each change biases** (Friedland's worked scenarios):
  - *Rising claim ratios*: development techniques still work; the [[Expected Loss Method|expected claims]] technique fails unless its ratio is updated; [[Bornhuetter-Ferguson Method|BF]] and [[Cape Cod Method|Cape Cod]] understate, partially.
  - *Case strengthening*: reported development overstates, reported BF and Cape Cod overstate less; paid methods and expected claims are unaffected.
  - *Faster settlement*: paid development overstates; reported methods are largely unaffected.
  - *Growth in a slower-developing segment*: every technique on the combined data understates.
- **Responses:** detect the change (interview plus [[Data Diagnostic Analysis|diagnostics]] — average case outstanding, closed-to-reported counts, paid-to-reported ratios); lean on methods the change does not touch; restate the data ([[Berquist-Sherman Method|Berquist-Sherman]]); adjust a priori ratios for rate level and trend; segment for mix; restate history to current retentions or benefit levels.

> [!example]- Case Strengthening Through Four Methods {Example}
> A stable auto liability book develops each accident year to $\$10{,}000{,}000$. Historically $50\%$ of ultimate is reported and $30\%$ paid at $12$ months (reported CDF $2.000$, paid CDF $3.333$). In $2025$ the claims department strengthened case reserves by $40\%$: AY $2025$ at $12$ months shows paid $\$3{,}000{,}000$ and case $\$2{,}800{,}000$ (reported $\$5{,}800{,}000$). The a priori expected ultimate is $\$10{,}000{,}000$.
>
> Estimate AY $2025$ ultimate by reported and paid development and by reported and paid BF.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Reported dev.} &= \$5{,}800{,}000 \times 2.000 \\
> > &= \$11{,}600{,}000 \\
> > \text{Paid dev.} &= \$3{,}000{,}000 / 0.30 \\
> > &= \$10{,}000{,}000 \\
> > \text{Reported BF} &= \$5{,}800{,}000 + \$10{,}000{,}000\left(1 - \tfrac{1}{2.000}\right) \\
> > &= \$10{,}800{,}000 \\
> > \text{Paid BF} &= \$3{,}000{,}000 + \$10{,}000{,}000\,(1 - 0.30) \\
> > &= \$10{,}000{,}000
> > \end{align*}
> > $$
> >
> > True IBNR is $\$4{,}200{,}000$. Reported development books $\$5{,}800{,}000$ — $\$1{,}600{,}000$ too much, because the extra $\$800{,}000$ of case is multiplied by a CDF built on weaker reserves. Reported BF books $\$5{,}000{,}000$ — too much by the strengthening itself, once: its IBNR comes from the a priori and the unreported *proportion*, so it takes no credit for the claims now booked in case. The paid methods are untouched. The fix is not to discard the reported data but to restate the historical case reserves to today's adequacy before selecting factors.

> [!example]- Reading a Management Interview {Example}
> A reserving actuary learns: (a) a new claims system from $1/1/2024$ opens a file per claimant rather than per accident; (b) the per-occurrence reinsurance retention rose from $\$500{,}000$ to $\$1{,}000{,}000$ for AY $2024$; (c) a marketing push into commercial auto is growing that segment $30\%$ a year inside a mostly personal auto book; (d) tort reform caps non-economic damages for accidents from $7/1/2024$.
>
> Classify each change and say what it distorts.
>
> > [!answer]-
> > - **(a) Internal — claims coding.** Reported counts jump on the $2024$ diagonal with no change in cost: frequency rises, severity falls, and count-based [[Frequency-Severity Method|frequency-severity]] projections break. Restate counts on one definition or use post-change data only.
> > - **(b) Internal — reinsurance.** Net data before $2024$ are capped at $\$500{,}000$, AY $2024$ at $\$1{,}000{,}000$, so historical net factors understate AY $2024$'s net development. Restate history at the new retention from claim-level data, or project gross and ceded separately.
> > - **(c) Internal — marketing, producing a mix shift.** Commercial auto develops more slowly, so combined factors — weighted toward the older mix — understate the recent years. Segment the triangles.
> > - **(d) External — legal.** Accidents after the reform should settle lower and possibly faster; the old pattern and claim ratios overstate them. Split accident years at the effective date and adjust expected claim ratios with a law-change estimate.
> >
> > None of these is visible as a cause in the triangle — only as a symptom. That is why the interview comes before the method selection.
