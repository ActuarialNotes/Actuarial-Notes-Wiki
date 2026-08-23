---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7d167873ac069d73e9fe9a40e51eea0349cb93656dc5dcace5d23ab8cba0cebd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combined Ratio.md
---

**Combined Ratio** is the sum of the [[Loss Ratio|loss and LAE ratio]] and the underwriting expense ratio — the share of premium consumed by claims and the cost of doing business. A combined ratio below $100\%$ means the book is profitable **before** investment income; above $100\%$ means underwriting is losing money.

> $$\text{Combined Ratio} = \frac{L + \text{LAE}}{\text{Earned Premium}} + \frac{\text{UW Expenses}}{\text{Written Premium}}$$

> $$\text{Operating Ratio} = \text{Combined Ratio} - \text{Investment Income Ratio}$$

- **The two terms use different denominators.** The loss and LAE ratio is on [[Earned Premium|earned premium]] (losses are incurred as coverage is provided); the expense ratio is conventionally on [[Written Premium|written premium]] (commissions and taxes are incurred when the policy is written). This is the "trade basis" combined ratio used in U.S. statutory reporting. A **financial basis** combined ratio puts both on earned premium. The two diverge whenever the book is growing or shrinking, so the basis must be stated.
- Because it excludes investment income, a combined ratio above $100\%$ is not automatically unprofitable. [[Long Tail Lines|Long-tail lines]] hold premium for years before paying claims, so they can sustain combined ratios well above $100\%$; [[Short Tail Insurance|short-tail lines]] have little float and need combined ratios below $100\%$.
- The **target combined ratio** implied by a ratemaking analysis is $1 - Q_T$, where $Q_T$ is the target [[Profit and Contingency Provision|underwriting profit provision]]. A $5\%$ profit provision implies a $95\%$ target combined ratio.
- As a reserving diagnostic, a combined ratio that drifts down across successive [[Accident Year]]s at the same maturity may reflect genuine improvement — or under-reserving that later [[Loss Development|development]] will reverse (see [[Reserve Adequacy]]).

> [!example]- Trade Basis vs. Financial Basis {Example}
> An insurer reports earned premium $\$40{,}000{,}000$, written premium $\$46{,}000{,}000$, incurred losses and LAE $\$29{,}200{,}000$, and underwriting expenses $\$12{,}420{,}000$.
>
> Calculate the combined ratio on both bases.
>
> > [!answer]-
> > **Trade basis** — losses on earned, expenses on written:
> >
> > $$\frac{\$29{,}200{,}000}{\$40{,}000{,}000} + \frac{\$12{,}420{,}000}{\$46{,}000{,}000} = 0.730 + 0.270 = 100.0\%$$
> >
> > **Financial basis** — both on earned:
> >
> > $$\frac{\$29{,}200{,}000}{\$40{,}000{,}000} + \frac{\$12{,}420{,}000}{\$40{,}000{,}000} = 0.730 + 0.3105 = 104.1\%$$
> >
> > The book is growing ($\$46$M written vs. $\$40$M earned), so the trade basis spreads acquisition costs over a larger denominator and flatters the result by $4.1$ points. Growing insurers look better on a trade basis; shrinking ones look worse.
