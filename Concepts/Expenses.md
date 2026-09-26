---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:238032a5c62a148c32c182dcc79688f489198ac6542077e0bb51bf0b9fa91f02
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expenses.md
---

**Expenses** are an insurer's costs of providing insurance other than the loss payments themselves. They come in two kinds: **loss adjustment expense** (LAE), the cost of settling claims, and **underwriting expense**, the cost of acquiring and servicing policies. In individual risk rating what matters is which expenses move with the insured's own losses. Only those are recalculated when a policy is [[Retrospective Rating|retrospectively rated]] after it expires.

> $$\text{Expenses} = \text{LAE} + \text{Underwriting Expenses}$$

> $$R = (\text{BP} + \text{LCF} \times L) \times \text{TM}$$

- **Components.** LAE splits into [[Allocated Loss Adjustment Expense|ALAE]] (defence and experts, charged to a specific claim) and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] (the overhead of the claims department). Underwriting expenses are commissions and brokerage, other acquisition, general expenses, and premium taxes, licences and fees. Together they drive the [[Expense Ratio|expense ratio]].
- **Fixed or variable.** In a rate, [[Variable Expenses|variable expenses]] rise with premium and [[Fixed Expenses|fixed expenses]] are a dollar amount per exposure or per policy ([[Expense Provisions]]). Much of the cost of servicing an account doesn't grow with its size, so the expense *ratio* falls as premium grows. Large risks get premium discounts for that reason.
- **Where expenses sit in a retro plan (Exam 8).** $R$ is the retrospective premium, $L$ the insured's actual limited losses, $\text{LCF}$ the loss conversion factor and $\text{TM}$ the tax multiplier.
    - The loss conversion factor carries the LAE, which tracks losses, so it responds to actual experience.
    - The tax multiplier carries premium taxes and assessments, which are levied on whatever premium is finally charged.
    - The basic premium $\text{BP}$ carries the remaining expenses (acquisition and general) plus the net insurance charge for the plan's maximum and minimum. It does not respond to losses.
- **The basic premium formula.** $\text{BP} = e - (\text{LCF} - 1)\,E + \text{LCF} \times I$. Here $e$ is the expense provision excluding taxes, $E$ is expected losses and $I$ is the net insurance charge in loss dollars. Subtracting $(\text{LCF}-1)E$ removes the LAE that the conversion factor will collect, so it isn't charged twice.

> [!example]- Which Expenses Respond to a Good Year {Example}
> A retro plan has standard premium $\$500{,}000$, expected losses $E = \$325{,}000$ and an expense provision excluding taxes (LAE included) of $e = \$110{,}000$. The terms are $\text{LCF} = 1.12$, net insurance charge $I = \$30{,}000$ and $\text{TM} = 1.03$. Actual limited losses come in at $\$250{,}000$, inside the plan's limits.
>
> Find the basic premium and the retrospective premium, and say which expense provisions responded.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{BP} &= 110{,}000 - 0.12 \times 325{,}000 + 1.12 \times 30{,}000 \\
> > &= 110{,}000 - 39{,}000 + 33{,}600 \\
> > &= 104{,}600
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > R &= (104{,}600 + 1.12 \times 250{,}000) \times 1.03 \\
> > &= 384{,}600 \times 1.03 \\
> > &= 396{,}138
> > \end{align*}
> > $$
> >
> > The LAE collected is $0.12 \times 250{,}000 = \$30{,}000$, against $\$39{,}000$ expected, so it responded to the good year. Taxes of $0.03 \times 384{,}600 = \$11{,}538$ responded to the lower premium. The $\$104{,}600$ basic premium was fixed at inception.
> >
> > Check: on average the plan's limits remove $I$ of losses, so $E[R] = (104{,}600 + 1.12 \times 295{,}000) \times 1.03 = \$448{,}050$. That equals $(e + E) \times \text{TM}$, so the plan is balanced.

> [!example]- Expense Ratio by Policy Size {Example}
> An insurer's costs are $\$400$ per policy plus $15\%$ of premium. Compare the expense ratio for a $\$5{,}000$ policy and a $\$500{,}000$ account.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Small} &= \frac{400}{5{,}000} + 0.15 \\
> > &= 23.0\% \\[4pt]
> > \text{Large} &= \frac{400}{500{,}000} + 0.15 \\
> > &= 15.08\%
> > \end{align*}
> > $$
> >
> > A flat $23\%$ load would overcharge the large account by $0.0792 \times 500{,}000 = \$39{,}600$. Large-risk rating plans therefore grade the expense provision by size.
