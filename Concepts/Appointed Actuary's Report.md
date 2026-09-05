---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:390b17890f7d2a937ca4ff216bff20ff6773c393900eb010625f766e4dc86026
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Appointed Actuary's Report.md"
---

**The Appointed Actuary's Report** is the document supporting the [[Statement of Actuarial Opinion]]: it records the data used, the methods and assumptions selected, the reasoning behind the selections, the results and their sensitivity, and any limitations. It is prepared for the board and made available to [[OSFI]], and it must be detailed enough that **another actuary could follow and reproduce the work**.

- **What it must contain**, following the [[Standards of Practice]] and [[OSFI]]'s expectations:
  - **Data** — sources, reconciliation to the financial statements, and any deficiencies and how they were addressed.
  - **Methods** — by line and by [[Liability for Incurred Claims|LIC]] / [[Liability for Remaining Coverage|LRC]] component, with the reason each was chosen.
  - **Assumptions** — development factors, trends, the [[IFRS 17 Discount Rates|discount rate]] construction, the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] method and its confidence level.
  - **Results**, including comparison with the prior valuation and an **actual-versus-expected** analysis explaining the difference.
  - **Sensitivity** of the result to the key assumptions, and the range of reasonable estimates.
  - **[[Subsequent Events]]**, [[Materiality|materiality]] standards used, and any reliance on others' work.
- **Actual versus expected is the report's most useful section.** It answers the question that matters: did last year's estimate turn out right, and if not, why? A pattern of one-sided deviation is the earliest available evidence of a biased process.
- **Changes must be disclosed and quantified.** A change in method or assumption that moves the liability materially must be identified, with its effect separated from the effect of experience — otherwise a reader cannot tell whether the liability moved because the world changed or because the model did.
- **It is a communication document, not a working paper dump.** The [[Standards of Practice]] require the report to be clear enough for its intended user, which includes the board and the regulator — neither of whom will reconstruct a spreadsheet.
- **[[Peer Review]]**, where performed, is documented here, and OSFI expects to see how findings were addressed.

> [!example]- Explaining the Change {Example}
> The [[Liability for Incurred Claims|LIC]] rose from $\$430$ million to $\$487$ million. The actuary must explain the $\$57$ million increase in the report.
>
> The components are: new accident year claims $\$210$M; claims paid during the year $\$186$M; favourable development on prior years $-\$11$M; a change in the tail factor assumption $+\$14$M; the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] increased from $6\%$ to $7\%$ of fulfilment cash flows $+\$5$M; and the effect of a fall in the [[IFRS 17 Discount Rates|discount rate]] $+\$25$M.
>
> Present the reconciliation and say what it tells the board.
>
> > [!answer]-
> > **The roll-forward:**
> >
> > $$\begin{align*}
> > \text{Opening} \quad &\$430\text{M} \\
> > \text{New accident year} \quad &+\$210\text{M} \\
> > \text{Claims paid} \quad &-\$186\text{M} \\
> > \text{Prior-year development} \quad &-\$11\text{M} \\
> > \text{Tail factor change} \quad &+\$14\text{M} \\
> > \text{Risk adjustment change} \quad &+\$5\text{M} \\
> > \text{Discount rate change} \quad &+\$25\text{M} \\
> > \text{Closing} \quad &\$487\text{M}
> > \end{align*}$$
> >
> > **What each line means for the board — and the categories matter more than the arithmetic:**
> >
> > - **New year, paid, and development** are *experience*. The $-\$11$M favourable development says last year's estimate was, if anything, slightly conservative — a good sign, and the actual-versus-expected analysis should confirm it was not concentrated in one line.
> > - **The tail factor and risk adjustment changes ($+\$19$M) are *assumption* changes** — the actuary's judgement moved, not the world. These require the fullest explanation: what evidence prompted the tail change, and why the risk adjustment's confidence level rose. Without that, a reader cannot distinguish a considered revision from a management-driven one.
> > - **The discount rate effect ($+\$25$M) is *financial*** and goes to [[Insurance Finance Income or Expenses]], not to underwriting. It is the largest single item and it has nothing to do with claims.
> >
> > **The headline for the board:** underwriting experience was slightly better than expected; the liability rose mainly because interest rates fell. Presenting the $\$57$ million increase without that decomposition would leave the board believing the opposite.
