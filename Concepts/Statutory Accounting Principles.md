---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6ed50617a682ffd10b334df46ad082b53cc1291475bc0f06b55e7cb6618954fc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statutory Accounting Principles.md
---

**Statutory Accounting Principles** (SAP) are the accounting rules U.S. insurers follow in the financial statements they file with state regulators. They exist to measure **solvency**, an insurer's ability to pay policyholders, so they value conservatively, count only assets available to pay claims, and expense costs as they are incurred.

The NAIC codified SAP in the *Accounting Practices and Procedures Manual* (effective January 1, 2001), and the states adopted it. Its Preamble states three concepts:

1. **Conservatism**: a cautious approach to valuing assets and estimates.
2. **Consistency**: so regulators can compare insurers.
3. **Recognition**: only assets available to meet policyholder obligations count.

## The Manual

The Preamble also sets out the statutory hierarchy and materiality. The **Statements of Statutory Accounting Principles** (SSAPs) are the highest level of authoritative guidance. Those central to P&C work are SSAP 5R liabilities and contingencies, 9 subsequent events, 53 premiums, 55 unpaid losses and LAE, 62R reinsurance, 63 underwriting pools, 65 P&C contracts and 66 retrospectively rated contracts.

A state may *prescribe* a rule for all its domestic insurers or *permit* one insurer an exception. Both prescribed and permitted practices are disclosed in the notes, with their effect on surplus and income.

## Admitted assets and statutory surplus

**Nonadmitted assets**, such as furniture and equipment, prepaid expenses, uncollected premium more than 90 days overdue, and deferred tax assets beyond the admissibility limit, are excluded from the balance sheet. Changes in them go straight to surplus, not through income. The admitted assets are

> $$\text{Admitted assets} = \text{Total assets} - \text{Nonadmitted assets}$$

and statutory surplus is

> $$\text{Statutory surplus} = \text{Admitted assets} - \text{Liabilities}$$

> [!example]- What is this insurer's statutory surplus? {Example}
> An insurer's total assets are $\$950$M and its liabilities $\$700$M. Included in assets are furniture and equipment of $\$6$M, prepaid expenses of $\$3$M, uncollected premium more than 90 days overdue of $\$5$M, and $\$8$M of deferred tax assets above the admissibility limit.
>
> > [!answer]-
> > - The nonadmitted assets are $6 + 3 + 5 + 8 = \$22$M.
> > - The admitted assets are $950 - 22 = \$928$M.
> > - Statutory surplus is $928 - 700 = \$228$M.
> > - Had every asset been admitted, surplus would have been $\$250$M, so nonadmission removes $8.8\%$ of it. None of the excluded items can be relied on to pay a claim, which is the recognition concept.

## Differences from GAAP

The main differences between SAP and [[GAAP]] are:

| Item | SAP | GAAP |
| :--- | :--- | :--- |
| Acquisition costs | **Expensed as incurred** | [[Deferred Acquisition Cost|Deferred]] and amortized |
| Loss and unearned premium reserves | **Net** of reinsurance, with a provision for unsecured and overdue reinsurance ([[Schedule F]]) | Gross liabilities and a recoverable asset |
| Most bonds | Amortized cost | Fair value for available-for-sale securities |
| Surplus notes | Surplus | Debt |
| Reporting entity | Legal entity | Consolidated group |

Because acquisition costs are expensed as incurred, statutory surplus omits the *equity in the unearned premium reserve*. Under SAP, loss reserves are undiscounted unless a specific SSAP permits otherwise ([[Loss Reserve Discounting]]). The third basis on the syllabus, [[IFRS]] (through [[IFRS 17]]), discounts insurance liabilities and adds an explicit risk adjustment, where SAP and U.S. GAAP both generally carry P&C loss reserves undiscounted.

> [!example]- How do the year-end statutory and GAAP positions differ for this insurer? {Example}
> An insurer writes $\$12{,}000{,}000$ of annual policies, all effective July 1. Acquisition costs (commissions, premium tax and other acquisition) are $20\%$ of written premium, paid at issue. Ignore losses and tax.
>
> > [!answer]-
> > - At year end half the term remains, so the unearned premium is $0.5 \times 12{,}000{,}000 = \$6{,}000{,}000$.
> > - The acquisition cost is $0.20 \times 12{,}000{,}000 = \$2{,}400{,}000$.
> > - Under SAP the full $\$2{,}400{,}000$ is expensed this year, while the unearned premium reserve is held at the full $\$6{,}000{,}000$.
> > - Under GAAP the deferred acquisition cost is $0.20 \times 6{,}000{,}000 = \$1{,}200{,}000$, an asset, so only $\$1{,}200{,}000$ is expensed.
> > - GAAP equity is therefore $\$1{,}200{,}000$ higher before tax, which is the equity in the unearned premium reserve.
> > - At inception the gap was the whole $\$2{,}400{,}000$, so writing the business drained statutory surplus by that amount on day one.

## Why the actuary cares

Statutory surplus drives [[Risk-Based Capital]], the [[IRIS Ratios]], premium-to-surplus leverage and dividend capacity. The Appointed Actuary opines on statutory reserves ([[Appointed Actuary Responsibilities]]). Pricing must fund the **surplus strain** of expensing acquisition costs up front, so fast growth consumes statutory surplus even when the business is profitable. [[Capital and Surplus]] and the [[NAIC Annual Statement]] build on these rules.

> [!trap] Running the change in nonadmitted assets through income
> Under SAP the change in nonadmitted assets is charged or credited directly to surplus. It never appears in net income.
