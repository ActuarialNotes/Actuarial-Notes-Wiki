---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ccbab90da61173cb25bb09fcd5a8e852530921c6a106299a191cd2e67bd03d93
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Service Result.md
---

![[Media/Figures/Insurance_Service_Result.svg|340]]

The **Insurance Service Result** is [[IFRS 17]]'s measure of underwriting performance. It excludes all investment return and all interest-rate effects, which are reported separately as [[Insurance Finance Income or Expenses]].

The insurance service result (ISR) is

> $$\text{ISR} = \text{Revenue} - \text{Expenses} - \text{Reinsurance}$$

- $\text{Revenue}$ is [[Insurance Revenue|insurance revenue]].
- $\text{Expenses}$ is [[Insurance Service Expenses|insurance service expenses]].
- $\text{Reinsurance}$ is the net expense from [[Reinsurance Contracts Held|reinsurance contracts held]].

Under previous presentations, investment income and the unwinding of discount were mixed into an insurer's results, so a fall in interest rates could flatter or damage a figure meant to describe underwriting. The ISR isolates the question of whether the business was priced and selected well.

## The IFRS 17 income statement

The income statement runs in this order:

1. Insurance revenue, less insurance service expenses, less the net expense from reinsurance contracts held, gives the **insurance service result**.
2. Insurance finance income or expenses, plus investment income, gives the **net financial result**.
3. The two results sum to profit before tax.

Reinsurance appears as a single net line in the ISR. A heavily reinsured insurer therefore shows large gross revenue and expenses and a large negative reinsurance line, rather than netted figures.

> [!example]- What are this insurer's insurance service result and profit before tax? {Example}
> For the year, the insurer has:
>
> | Item | Amount ($ millions) |
> | :--- | ---: |
> | Insurance revenue | 480 |
> | Claims and expenses incurred | 390 |
> | Acquisition amortisation | 62 |
> | Loss on an onerous group | 9 |
> | Ceded premium relating to coverage received | 70 |
> | Amounts recoverable from reinsurers on incurred claims | 48 |
> | Unwinding of discount on liabilities | 16 |
> | Investment income | 95 |
>
> > [!answer]-
> > - Insurance service expenses are $390 + 62 + 9 = \$461$ million.
> > - The net expense from reinsurance held is $70 - 48 = \$22$ million.
> > - The ISR is $480 - 461 - 22 = -\$3$ million.
> > - The net financial result is investment income less the unwinding of discount, $95 - 16 = \$79$ million.
> > - Profit before tax is $-3 + 79 = \$76$ million.
> > - Every dollar of profit came from investment return. The old presentation would have shown only the $\$76$ million.

## Relation to the combined ratio

The ISR is close to an underwriting result, but the two are not identical. Revenue excludes deposit components and loss-component amounts, expenses exclude the unwinding of discount, and reinsurance is presented net. An insurer's disclosed [[Combined Ratio|combined ratio]] and its ISR should be reconcilable but will not match line for line.

## What can distort the result

A large [[Onerous Contract|onerous]] group charge lands entirely in one period. A change in the [[Coverage Units|coverage units]] driver changes the release of the CSM. A [[Risk Adjustment for Non-Financial Risk|risk adjustment]] release pattern that differs from claim emergence shifts profit between periods.

> [!trap] Reading profit as underwriting profit
> A positive profit before tax can sit on a negative ISR, as in the example above. Read the ISR for underwriting and the net financial result for investment return.
