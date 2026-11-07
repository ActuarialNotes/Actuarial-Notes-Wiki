---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:3fa82af2fa74b4bf828f94216dc721744644d74b316fbe7296b424f7b14943b4
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.4, 9-10 (PDF pp.16, 21-22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.126-131 (PDF pp.138-143), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.144 (PDF p.156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expense Ratio.md
---

![[Media/Figures/Expense_Ratio.svg|340]]

An **Expense Ratio** is underwriting expenses as a share of premium, the cost of writing and servicing business other than losses and LAE. With the [[Loss Ratio|loss and LAE ratio]] it makes up the [[Combined Ratio|combined ratio]]. The underwriting expense ratio is

> $$\text{UW Expense Ratio} = \frac{\text{Underwriting Expenses}}{\text{Premium}}$$

- $\text{Underwriting Expenses}$ are commissions and brokerage, other acquisition, taxes, licenses and fees, and general expenses. They exclude loss adjustment expense.
- $\text{Premium}$ is [[Written Premium|written premium]] for the expenses incurred at the onset of the policy (commissions, other acquisition, taxes, licenses and fees) and [[Earned Premium|earned premium]] for those incurred throughout the policy (general expenses).

The historical combined ratio puts all underwriting expenses over written premium. For the expense ratio itself, each category's expenses are divided by the premium that matches how they are incurred, and the category ratios are added. The choice matters little when volume is stable, since written and earned premium are then about equal. In a growing book, written premium runs proportionately above earned, and so do acquisition costs, which is why the expenses incurred at the onset of the policy are matched to written premium.

> [!example]- An insurer has written premium of $\$46{,}000{,}000$ and earned premium of $\$40{,}000{,}000$. Its commissions are $\$6{,}900{,}000$, premium taxes $\$1{,}150{,}000$, other acquisition $\$1{,}840{,}000$ and general expenses $\$2{,}530{,}000$. What is its underwriting expense ratio? {Example}
> - Commissions, taxes and other acquisition are incurred at the onset of the policy, so they are divided by written premium: $15.0\%$, $2.5\%$ and $4.0\%$.
> - General expenses are incurred throughout the policy, so they are divided by earned premium: $6.3\%$.
> - The underwriting expense ratio is the sum of the four, $27.8\%$.
> - All four over written premium, as the historical combined ratio puts them, would give $12{,}420{,}000/46{,}000{,}000 = 27.0\%$.

## Operating expense ratio

The operating expense ratio adds all loss adjustment expense, allocated and [[Unallocated Loss Adjustment Expenses ULAE|unallocated]], to the underwriting expense ratio, as a ratio to earned premium:

> $$\text{Operating Expense Ratio} = \text{UW Expense Ratio} + \frac{\text{LAE}}{\text{Earned Premium}}$$

It is the share of each premium dollar spent on loss adjustment and underwriting expenses. Companies may instead put LAE in the loss ratio, as a loss and LAE ratio. Either way LAE is counted once, so a loss ratio combined with the operating expense ratio excludes it.

> [!example]- The insurer's losses are $\$25{,}600{,}000$, its ALAE $\$2{,}000{,}000$ and its ULAE $\$1{,}600{,}000$, and its underwriting expense ratio is $27.0\%$ with all expenses over written premium. What are its operating expense ratio and combined ratio? {Example}
> - The LAE ratio to earned premium is $3{,}600{,}000/40{,}000{,}000 = 9.0\%$.
> - The operating expense ratio is $27.0\% + 9.0\% = 36.0\%$.
> - The loss ratio, without LAE, is $25{,}600{,}000/40{,}000{,}000 = 64.0\%$.
> - The combined ratio is the loss ratio plus the operating expense ratio, $64.0\% + 36.0\% = 100.0\%$, so the book breaks even on underwriting.

## Finding the LAE ratio from the combined ratio

When the LAE is given as a ratio to losses, its ratio to premium follows from the loss ratio. The combined ratio less the expense ratio is the loss and LAE ratio, and dividing that by one plus the LAE ratio to losses gives the loss ratio. The LAE ratio to premium is then

> $$\frac{\text{LAE}}{\text{Earned Premium}} = \frac{\text{Losses}}{\text{Earned Premium}} \times \frac{\text{LAE}}{\text{Losses}}$$

- $\text{Losses}/\text{Earned Premium}$ is the loss ratio without LAE.
- $\text{LAE}/\text{Losses}$ is the LAE ratio to losses.

> [!example]- A book's combined ratio is $104\%$, its underwriting expense ratio is $30\%$ and its LAE is $15\%$ of losses. What is the LAE ratio to premium? {Example}
> - The loss and LAE ratio is $104\% - 30\% = 74\%$, which is $\text{Loss Ratio} \times 1.15$.
> - The loss ratio without LAE is $74\%/1.15 = 64.3\%$.
> - The LAE ratio to premium is $64.3\% \times 0.15 = 9.7\%$.

## Expense ratios in ratemaking

For ratemaking, each category's ratio is split into [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]] parts where both are material, because the two enter the rate formula in different places ([[Expense Provisions#The premium-based projection method|premium-based projection method]]). The mix of expenses depends on distribution. A national direct writer may incur significant other acquisition costs for advertising. An agency-based company relies more on its agents to generate new business, so its other acquisition costs are lower, but at least partially offset by higher commissions.
