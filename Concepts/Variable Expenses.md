---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c4167c1ac08335a6cc610c93d8daa3818e14e1bb7698825c192c42bac16a46cb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variable Expenses.md
---

**Variable Expenses** are underwriting expenses that move proportionally with premium — commissions, premium taxes, licences and fees — and are therefore expressed as a percentage $V$ of premium and carried in the **denominator** of the rate formula.

> $$V = \frac{\text{Variable Expenses}}{\text{Premium}}$$

> $$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- The denominator placement is not a convention but arithmetic: if commission is $15\%$ *of the rate being solved for*, the rate must be grossed up by dividing, not by adding $15\%$ of something else. Adding instead of dividing under-recovers the expense.
- Typical components: agent or broker commission ($10$–$20\%$, higher in some commercial lines), premium taxes ($2$–$3\%$), licences, fees and assessments, and the variable part of other acquisition. Total $V$ commonly runs $20$–$30\%$, and it varies sharply by **distribution channel**.
- Because commissions and taxes attach when a policy is **written**, these ratios are computed against [[Written Premium|written premium]]; expenses incurred as coverage is provided use [[Earned Premium|earned premium]]. Mixing the denominators misstates the provision in a growing or shrinking book.
- A **structural change** in distribution — moving business direct, renegotiating commission scales, adding a contingent commission — must be reflected prospectively rather than from historical ratios, since the ratemaking question is what the expenses *will* be.
- Contingent or profit-sharing commissions complicate the split: they are a percentage of premium (variable) but conditional on loss experience, so they behave partly like a loss-sensitive cost and are sometimes provided for separately.

![[Media/Figures/Variable_Expenses.svg|340]]

> [!example]- Building the Variable Expense Ratio and the Rate {Example}
> A personal auto insurer's expense study shows commissions $15\%$ of written premium, premium taxes $2\%$, other variable acquisition $3\%$. The projected pure premium is $\$300$, fixed expenses are $\$40$ per exposure, and the target underwriting profit provision is $5\%$.
>
> Compute the indicated rate.
>
> > [!answer]-
> > $$\begin{align*}
> > V &= 15\% + 2\% + 3\% = 20\% \\[6pt]
> > \text{Rate} &= \frac{\$300 + \$40}{1 - 0.20 - 0.05} \\
> > &= \frac{\$340}{0.75} \\
> > &= \$453.33
> > \end{align*}$$
> >
> > Verify that the rate actually funds everything:
> >
> > $$\begin{align*}
> > \text{Variable expenses} &= 0.20 \times \$453.33 = \$90.67 \\
> > \text{Profit} &= 0.05 \times \$453.33 = \$22.67 \\
> > \text{Losses} + \text{fixed} &= \$340.00 \\[4pt]
> > \text{Total} &= \$453.34 \;\checkmark
> > \end{align*}$$
> >
> > Had the $25\%$ been *added* to $\$340$ instead ($\$340 \times 1.25 = \$425$), commissions and profit would consume $\$106.25$ and only $\$318.75$ would be left for a $\$340$ obligation — a $\$21$ shortfall on every policy.

> [!example]- A Distribution Channel Shift {Example}
> An insurer currently writes entirely through independent agents at $17\%$ commission. It will move $40\%$ of new business to a direct channel with no commission but $\$18$ per policy of additional fixed marketing cost. Premium taxes are $2.5\%$, other variable expenses $2\%$, fixed expenses $\$45$ per exposure, target profit $5\%$, pure premium $\$420$.
>
> Compute the indicated rate before and after the shift.
>
> > [!answer]-
> > **Before:**
> >
> > $$\begin{align*}
> > V &= 17\% + 2.5\% + 2\% = 21.5\% \\[4pt]
> > \text{Rate} &= \frac{\$420 + \$45}{1 - 0.215 - 0.05} = \frac{\$465}{0.735} = \$632.65
> > \end{align*}$$
> >
> > **After** — the blended commission is $0.60 \times 17\% = 10.2\%$, and fixed expenses rise by $0.40 \times \$18 = \$7.20$:
> >
> > $$\begin{align*}
> > V &= 10.2\% + 2.5\% + 2\% = 14.7\% \\[4pt]
> > \text{Rate} &= \frac{\$420 + \$52.20}{1 - 0.147 - 0.05} = \frac{\$472.20}{0.803} = \$588.04
> > \end{align*}$$
> >
> > The indicated rate falls $7.1\%$ — the commission saving net of the added acquisition cost.
> >
> > Two cautions. First, the change must be reflected **prospectively**: historical expense ratios still contain the old channel mix and would overstate $V$. Second, the direct and agency books may not be the same risks; if the direct channel attracts a different [[Mix of Business|mix]], the loss side changes too and the expense saving cannot be taken in isolation.
