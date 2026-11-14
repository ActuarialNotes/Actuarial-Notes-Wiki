---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:40c4ad93fc235d842d7f6e27027f1b5f39054ec06f43a2db7c849ac72f742993
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Appointed Actuary's Report.md"
---

![[Media/Figures/Appointed_Actuarys_Report.svg|340]]

The **Appointed Actuary's Report** is the document supporting the [[Statement of Actuarial Opinion]]. It records the data used, the methods and assumptions selected, the reasoning behind the selections, the results and their sensitivity, and any limitations, in enough detail that another actuary could follow and reproduce the work.

It is prepared for the board and made available to [[OSFI]]. Following the [[Standards of Practice]] and OSFI's expectations, it contains:

1. **Data**: its sources, its reconciliation to the financial statements, and any deficiencies and how they were addressed.
2. **Methods**: by line and by [[Liability for Incurred Claims|LIC]] and [[Liability for Remaining Coverage|LRC]] component, with the reason each was chosen.
3. **Assumptions**: development factors, trends, the construction of the [[IFRS 17 Discount Rates|discount rate]], and the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] method and its confidence level.
4. **Results**: including a comparison with the prior valuation and an actual-versus-expected analysis explaining the difference.
5. **Sensitivity**: of the result to the key assumptions, and the range of reasonable estimates.
6. **Other matters**: [[Subsequent Events|subsequent events]], the [[Materiality|materiality]] standard used, and any reliance on the work of others.

Where a [[Peer Review|peer review]] is performed, it is documented in the report, and OSFI expects to see how its findings were addressed. The Standards of Practice require the report to be clear enough for its intended users, the board and the regulator, neither of whom will reconstruct a spreadsheet.

## Actual versus expected

The actual-versus-expected analysis shows whether last year's estimate turned out right, and why not if it did not. A pattern of one-sided deviation is the earliest available evidence of a biased process.

## Analysis of change

A change in method or assumption that moves the liability materially is identified and quantified, with its effect separated from the effect of experience. The roll-forward of the LIC from the prior valuation is

> $$\text{Closing} = \text{Opening} + \text{New} - \text{Paid} + \text{Dev} + \text{Assumptions} + \text{Discount}$$

- $\text{New}$ is the liability for the new accident year's claims.
- $\text{Paid}$ is the claims paid during the year.
- $\text{Dev}$ is the development on prior years.
- $\text{Assumptions}$ is the effect of changes in the actuary's assumptions.
- $\text{Discount}$ is the effect of the change in the discount rate.

New claims, payments and development are experience. Assumption changes are the actuary's judgement moving, and need the fullest explanation. The discount rate effect is financial and goes to [[Insurance Finance Income or Expenses|insurance finance income or expenses]], not to underwriting.

> [!example]- What does this year's change in the LIC tell the board? {Example}
> The LIC rose from $\$430$ million to $\$487$ million. The components of the change are:
>
> | Component | Amount |
> | :--- | ---: |
> | New accident year claims | $+\$210$M |
> | Claims paid during the year | $-\$186$M |
> | Favourable development on prior years | $-\$11$M |
> | Change in the tail factor assumption | $+\$14$M |
> | Risk adjustment raised from 6% to 7% of fulfilment cash flows | $+\$5$M |
> | Fall in the discount rate | $+\$25$M |
>
> > [!answer]-
> > - The components sum to $210 - 186 - 11 + 14 + 5 + 25 = \$57$M, the whole increase from $\$430$M to $\$487$M.
> > - The $-\$11$M favourable development says last year's estimate was slightly conservative.
> > - The tail factor and risk adjustment changes, $+\$19$M together, are assumption changes, so the report must explain the evidence for each.
> > - The discount rate effect, $+\$25$M, is the largest item and has nothing to do with claims.
> > - Underwriting experience was slightly better than expected, and the liability rose mainly because interest rates fell.

> [!trap] Reporting the change without separating it
> A liability that moved because an assumption changed reads the same as one that moved because experience changed, unless the report separates them. Presenting the $\$57$M increase in the example as one figure would leave the board believing experience had worsened.
