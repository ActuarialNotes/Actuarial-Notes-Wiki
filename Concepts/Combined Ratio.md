---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ba804134cf3ddc3de5d2b75e31335897a125eba5ae7cf2dc4790d70fe0f2a16f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combined Ratio.md
---

A **Combined Ratio** is the sum of the [[Loss Ratio|loss and LAE ratio]] and the [[Expense Ratio|underwriting expense ratio]], the share of premium consumed by claims and the cost of doing business. It is

> $$\text{Combined Ratio} = \text{Loss and LAE Ratio} + \text{Expense Ratio}$$

A combined ratio below $100\%$ means the book makes an underwriting profit, and above $100\%$ an underwriting loss. The ratio excludes [[Investment Income|investment income]], so it measures profit **before** investment income. The underwriting profit margin is one minus the combined ratio, so a ratemaking analysis's target [[Profit and Contingency Provision|underwriting profit provision]] $Q_T$ implies a target combined ratio of $1 - Q_T$. A $5\%$ profit provision implies a $95\%$ target combined ratio.

## Trade basis and financial basis

The loss and LAE ratio is on [[Earned Premium|earned premium]], because losses are incurred as coverage is provided. Commissions and taxes are incurred when the policy is written, so the expense ratio is conventionally on [[Written Premium|written premium]]. This trade basis combined ratio, used in U.S. statutory reporting, is

> $$\text{Combined Ratio} = \frac{L + \text{LAE}}{\text{Earned Premium}} + \frac{\text{UW Expenses}}{\text{Written Premium}}$$

- $L + \text{LAE}$ is the incurred losses and loss adjustment expenses.
- $\text{UW Expenses}$ is the underwriting expenses.

A financial basis combined ratio puts both terms on earned premium. The two diverge whenever the book is growing or shrinking, so the basis must be stated.

> [!example]- What is this insurer's combined ratio on a trade basis and on a financial basis? {Example}
> An insurer reports earned premium of $\$40{,}000{,}000$, written premium of $\$46{,}000{,}000$, incurred losses and LAE of $\$29{,}200{,}000$, and underwriting expenses of $\$12{,}420{,}000$.
>
> > [!answer]-
> > - The loss and LAE ratio is $29{,}200{,}000 / 40{,}000{,}000 = 73.0\%$ on either basis.
> > - On a trade basis the expense ratio is $12{,}420{,}000 / 46{,}000{,}000 = 27.0\%$, so the combined ratio is $100.0\%$.
> > - On a financial basis it is $12{,}420{,}000 / 40{,}000{,}000 = 31.05\%$, so the combined ratio is $104.1\%$.
> > - The book is growing, so the trade basis spreads the expenses over the larger written premium and shows a result $4.1$ points better. Shrinking insurers look worse on a trade basis.

## Operating ratio

Adding investment income back gives the operating ratio, which is

> $$\text{Operating Ratio} = \text{Combined Ratio} - \text{Investment Income Ratio}$$

- $\text{Investment Income Ratio}$ is investment income divided by premium.

An operating ratio below $100\%$ means the book is profitable overall. So a combined ratio above $100\%$ is not automatically unprofitable: investment income on policyholder-supplied funds and surplus can offset the underwriting loss. [[Long Tail Lines|Long-tail lines]] hold premium for years before paying claims, so they can sustain combined ratios well above $100\%$. [[Short Tail Insurance|Short-tail lines]] have little float and need combined ratios below $100\%$.

> [!example]- A book has a combined ratio of $103\%$ and an investment income ratio of $6\%$. Is it profitable? {Example}
> - The operating ratio is $103\% - 6\% = 97\%$.
> - The book makes an underwriting loss of $3\%$ of premium, but its operating ratio is below $100\%$, so it is profitable overall.

## Combined ratio as a reserving diagnostic

A combined ratio that drifts down across successive [[Accident Year|accident years]] at the same maturity may reflect genuine improvement. It may also reflect under-reserving that later [[Loss Development|development]] will reverse, which is a question of [[Reserve Adequacy|reserve adequacy]].

> [!trap] Reading a combined ratio above 100% as a loss
> The combined ratio leaves out investment income. A book above $100\%$ has an underwriting loss, but it can still earn an overall profit if its operating ratio is below $100\%$.
