---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f196779fcf94d897a11f31919dfcdf27d4d15d387a399e09e09200144f4c4a69
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/FCT.md
---

**Financial Condition Testing** (FCT) is the [[Appointed Actuary]]'s annual examination of an insurer's financial condition under a base scenario and a range of **plausible adverse scenarios**, reported to the board and available to [[OSFI]]. It replaced Dynamic Capital Adequacy Testing (DCAT) in 2020 and broadened it — adding explicit **solvency** scenarios and **[[Reverse Stress Testing|reverse stress testing]]**.

> $$\text{Satisfactory} \iff \begin{cases} \text{Base scenario} \ge \text{supervisory target} \\[4pt] \text{All adverse scenarios} \ge \text{minimum} \end{cases}$$

- **The opinion.** The actuary opines that financial condition is **satisfactory** if, over the forecast period, the insurer meets the [[Supervisory Target Capital Ratio|supervisory target]] under the base scenario and the **minimum** capital requirement under every adverse scenario examined. Failing either, the condition is not satisfactory and the report must say so.
- **The two scenario types:** *going-concern* scenarios test whether the insurer can continue operating; *solvency* scenarios test whether it can meet obligations even if it must wind up. The second is the addition FCT made to DCAT, and it changes the question from "will it stay in business?" to "will policyholders be paid?"
- **Risk categories to consider:** insurance risk (frequency and severity), pricing, misestimation of [[Insurance Contract Liabilities|policy liabilities]], deterioration of asset values and investment return, expense, [[Reinsurance|reinsurance]] failure, government and political risk, off-balance-sheet exposures, and related-party risk. The actuary selects the scenarios that most threaten *this* insurer.
- **[[Ripple Effect|Ripple effects]] must be modelled.** An adverse scenario does not stop at its first impact: a catastrophe triggers reinstatement premium, reinsurance market hardening, rating pressure and higher borrowing costs. Ignoring them understates the scenario.
- **Management and corrective actions.** The report shows the effect before and after realistic management responses, and distinguishes routine management action from the corrective action that would be needed if the scenario materialised. Assuming heroic management action is the standard way to make an FCT report meaningless.
- **The relationship to [[ORSA]]:** ORSA is management's process determining how much capital is needed; FCT is the actuary's testing of whether condition holds under adversity. Both go to the board; only FCT carries an actuarial opinion.

> [!example]- Is Financial Condition Satisfactory? {Example}
> An insurer's forecast MCT ratios over the three-year forecast period:
>
> - **Base scenario:** $178\%$, $172\%$, $169\%$.
> - **Adverse 1 (catastrophe):** $178\%$, $118\%$, $124\%$.
> - **Adverse 2 (reserve deterioration plus rate suppression):** $178\%$, $141\%$, $96\%$.
> - **Adverse 3 (equity market decline):** $178\%$, $147\%$, $151\%$.
>
> The supervisory target is $150\%$; the minimum is $100\%$. What is the opinion?
>
> > [!answer]-
> > **The base scenario passes** — every year exceeds the $150\%$ supervisory target, though the downward trend from $178\%$ to $169\%$ deserves comment in its own right.
> >
> > **Adverse 1 and 3 pass** — both stay above the $100\%$ minimum, which is the test for an adverse scenario. Falling below the supervisory target in an adverse scenario is expected; that is what the buffer between $150\%$ and $100\%$ is for.
> >
> > **Adverse 2 fails.** The ratio reaches $96\%$ in year 3, below the minimum. **Financial condition is therefore not satisfactory**, and the actuary must say so plainly.
> >
> > **What the report must then contain:**
> >
> > - **The scenario's drivers**, so the board can see what combination produces the failure: reserve deterioration and rate suppression together, which are not independent — suppressed rates cause the losses that eventually emerge as deterioration.
> > - **Corrective actions** that would restore the position, and what they cost: raising capital, buying adverse development cover, reducing writings, or exiting the affected jurisdiction.
> > - **The plausibility argument.** Adverse 2 is not exotic; both components have occurred in Canadian auto markets within living memory, and the actuary should say how the scenario's severity was calibrated.
> > - **Any [[Ripple Effect|ripple effects]]** — a downgrade following the deterioration would raise reinsurance and borrowing costs and could accelerate the decline.
> >
> > **The escalation question.** A projected breach of the minimum is a matter with material adverse effects on financial condition. If management does not act on the report, the [[Duty to Report]] path under the [[Insurance Companies Act]] applies: the directors, and if necessary OSFI.
