---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cd107fbdcf7f56247bc539ea870d4ef234361e406a8ec789d7f4826a1c707845
  sources: []
  open_findings: 0
  log: .verify/Concepts/Reserve Adequacy.md
---

**Reserve Adequacy** is whether the carried [[Unpaid Claims|unpaid claim estimate]] is sufficient to pay the claims it covers. Testing it is a distinct step from computing the estimate: the methods produce numbers, and the adequacy review asks whether the resulting picture is coherent.

> $$\text{Redundancy / (Deficiency)} = \text{Carried Reserve} - \text{Indicated Reserve}$$

> $$\text{Implied Ultimate LR}_{\text{AY}} = \frac{\text{Selected Ultimate}}{\text{On-level Earned Premium}}$$

Friedland's reasonableness tests — each asks whether a *derived* statistic behaves sensibly:

- **Ultimate loss ratios** by accident year, on-level. They should move with rate adequacy and trend, not jump.
- **Ultimate severities and frequencies** by year. A selected ultimate implying a $30\%$ severity jump in one year needs a reason.
- **Ultimate pure premiums** per exposure — the premium-free version of the same test.
- **Implied development** in the selection: what CDF does the chosen ultimate imply, and is it consistent with the triangle?
- **IBNR to case ratios**, and **IBNR as a percentage of ultimate**, compared across years and against benchmarks.
- **Implied remaining payment pattern**: does the unpaid amount, spread over the expected payout pattern, look like the payments the book actually makes?

Further points:

- Reserve adequacy is best judged **over time, not at a point**. A single valuation cannot reveal bias; a series of valuations of the same accident year can — see [[Actual vs Expected Analysis]] and [[Roll Forward Analysis]].
- The **direction of error is asymmetric in consequence**. Redundancy is a profit deferral; deficiency understates the loss ratio, overstates surplus, and feeds an inadequate rate indication back into pricing, so the same error appears again in next year's business.
- Adequacy is tested **gross and net**, and by segment. A book can be adequate in aggregate while one line is severely deficient and another redundant.
- [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] requires the actuary to consider whether the estimate is reasonable, to disclose significant assumptions, and to identify material changes from the prior analysis.

![[Media/Figures/Reserve_Adequacy.svg|340]]

> [!example]- Testing the Selection Against Implied Statistics {Example}
> Selected ultimates and derived statistics for a book, on-level:
>
> | AY | On-level EP | Selected ultimate | Ultimate LR | Ultimate counts | Severity |
> |---|---|---|---|---|---|
> | $2021$ | $\$20{,}000$K | $\$13{,}400$K | $67.0\%$ | $1{,}340$ | $\$10{,}000$ |
> | $2022$ | $\$21{,}000$K | $\$14{,}280$K | $68.0\%$ | $1{,}360$ | $\$10{,}500$ |
> | $2023$ | $\$22{,}000$K | $\$15{,}180$K | $69.0\%$ | $1{,}380$ | $\$11{,}000$ |
> | $2024$ | $\$23{,}000$K | $\$14{,}950$K | $65.0\%$ | $1{,}300$ | $\$11{,}500$ |
>
> Is the selection reasonable?
>
> > [!answer]-
> > The severity series is clean: $\$10{,}000 \to \$11{,}500$, about $+4.8\%$ a year, consistent throughout including $2024$.
> >
> > The problem is **AY 2024's counts**: $1{,}340 \to 1{,}360 \to 1{,}380$, then $1{,}300$ — a fall of $5.8\%$ in a year when on-level premium grew $4.5\%$. That combination requires frequency to have dropped nearly $10\%$ per unit of exposure, and nothing in the severity series or the loss ratios suggests a change of that kind.
> >
> > The likely explanation is that AY 2024's **ultimate claim counts are under-projected** — the count development factor at $12$ months is the least certain in the triangle, and under-projecting it lowers both the count and, through it, the ultimate loss.
> >
> > That would also explain the loss ratio dropping to $65\%$ after three years of steady increase. The loss ratio series and the count series are telling the same story, and the story is about the estimate rather than the business.
> >
> > This is exactly what the reasonableness tests are for: each individual selection looked defensible, and only the derived statistics across years reveal that one of them is not.

> [!example]- Carried Versus Indicated {Example}
> An actuary's indicated unpaid claim estimate is $\$47{,}500{,}000$ against a carried reserve of $\$43{,}000{,}000$. Surplus is $\$60{,}000{,}000$ and the book earns $\$90{,}000{,}000$ of premium a year.
>
> Assess the significance.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Deficiency} &= \$47{,}500{,}000 - \$43{,}000{,}000 \\
> > &= \$4{,}500{,}000
> > \end{align*}$$
> >
> > That is $9.5\%$ of the indicated reserve and $7.5\%$ of surplus. Two consequences run in parallel:
> >
> > - **Balance sheet.** Correcting it reduces surplus to $\$55.5$M, a $7.5\%$ hit, and the premium-to-surplus ratio moves from $1.50$ to $1.62$.
> > - **Pricing.** The carried reserves imply loss ratios five percent lower than the indication does. If those understated loss ratios have been feeding rate indications, current rates are inadequate by roughly the same margin — and the deficiency will therefore repeat in the business being written now.
> >
> > The second consequence is the one that compounds, and it is the reason reserve adequacy findings belong in front of the pricing actuary as well as the CFO.
