---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:12017635bc7d0a9770369cdaac287451d76f38f1ed51f06f0d6b56c20f167412
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statutory Accounting Principles.md
---

**Statutory Accounting Principles** (SAP) are the accounting rules U.S. insurers follow in the financial statements they file with state regulators. Codified by the NAIC in the *Accounting Practices and Procedures Manual* (effective January 1, 2001) and adopted by the states, they exist to measure **solvency** — an insurer's ability to pay policyholders — so they value conservatively, count only assets available to pay claims, and expense costs as they are incurred.

> $$\text{Admitted assets} = \text{Total assets} - \text{Nonadmitted assets}$$
>
> $$\text{Statutory surplus} = \text{Admitted assets} - \text{Liabilities}$$

- **The Manual** holds a Preamble (the statement of concepts, the statutory hierarchy and materiality) and the **Statements of Statutory Accounting Principles** (SSAPs), the highest level of authoritative guidance. Its three concepts are **conservatism** (a cautious approach to valuing assets and estimates), **consistency** (so regulators can compare insurers) and **recognition** (only assets available to meet policyholder obligations count). SSAPs central to P&C work: 5R liabilities and contingencies, 9 subsequent events, 53 premiums, 55 unpaid losses and LAE, 62R reinsurance, 63 underwriting pools, 65 P&C contracts, 66 retrospectively rated contracts.
- **Prescribed and permitted practices.** A state may *prescribe* a rule for all its domestic insurers or *permit* one insurer an exception; both are disclosed, with their effect on surplus and income, in the notes.
- **Nonadmitted assets** — such as furniture and equipment, prepaid expenses, uncollected premium more than 90 days overdue, and deferred tax assets beyond the admissibility limit — are excluded from the balance sheet, and changes in them go straight to surplus.
- **Main differences from [[GAAP]]:**
  - acquisition costs are **expensed as incurred**, while GAAP defers and amortises them, so statutory surplus omits the *equity in the unearned premium reserve*;
  - loss and unearned premium reserves are reported **net** of reinsurance, with a provision for unsecured and overdue reinsurance ([[Schedule F]]), where GAAP shows gross liabilities and a recoverable asset;
  - most bonds are carried at amortised cost rather than the fair value GAAP uses for available-for-sale securities;
  - surplus notes count as surplus rather than debt;
  - reporting is by **legal entity**, not consolidated group;
  - loss reserves are undiscounted unless a specific SSAP permits otherwise ([[Loss Reserve Discounting]]).
- **The third basis on the syllabus**, [[IFRS]] (through [[IFRS 17]]), discounts insurance liabilities and adds an explicit risk adjustment, where SAP and U.S. GAAP both generally carry P&C loss reserves undiscounted.
- **Why the actuary cares.** Statutory surplus drives [[Risk-Based Capital]], the [[IRIS Ratios]], premium-to-surplus leverage and dividend capacity; the Appointed Actuary opines on statutory reserves ([[Appointed Actuary Responsibilities]]); and pricing must fund the **surplus strain** of expensing acquisition costs up front — fast growth consumes statutory surplus even when the business is profitable. See [[Capital and Surplus]] and [[NAIC Annual Statement]].

> [!example]- Equity in the Unearned Premium Reserve {Example}
> An insurer writes $\$12{,}000{,}000$ of annual policies, all effective July 1. Acquisition costs (commissions, premium tax and other acquisition) are $20\%$ of written premium, paid at issue. Ignoring losses and tax, compare the year-end statutory and GAAP positions.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Unearned premium} &= 0.5 \times \$12{,}000{,}000 \\
> > &= \$6{,}000{,}000 \\[4pt]
> > \text{Acquisition cost} &= 0.20 \times \$12{,}000{,}000 \\
> > &= \$2{,}400{,}000 \\[4pt]
> > \text{GAAP DAC} &= 0.20 \times \$6{,}000{,}000 \\
> > &= \$1{,}200{,}000
> > \end{align*}$$
> >
> > Under SAP the full $\$2{,}400{,}000$ is expensed this year, while the unearned premium reserve is held at the full $\$6{,}000{,}000$. Under GAAP only $\$1{,}200{,}000$ is expensed and the other $\$1{,}200{,}000$ is an asset. GAAP equity is therefore $\$1{,}200{,}000$ higher before tax — the equity in the unearned premium reserve.
> >
> > At inception the gap was the whole $\$2{,}400{,}000$: writing the business drained statutory surplus by that amount on day one. That is the surplus strain that limits how fast a statutory-constrained insurer can grow.

> [!example]- From Total Assets to Statutory Surplus {Example}
> An insurer's total assets are $\$950$M and liabilities $\$700$M. Included in assets are furniture and equipment $\$6$M, prepaid expenses $\$3$M, uncollected premium more than 90 days overdue $\$5$M, and $\$8$M of deferred tax assets above the admissibility limit. Compute statutory surplus.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Nonadmitted} &= 6 + 3 + 5 + 8 \\
> > &= \$22\text{M} \\[4pt]
> > \text{Admitted assets} &= 950 - 22 \\
> > &= \$928\text{M} \\[4pt]
> > \text{Statutory surplus} &= 928 - 700 \\
> > &= \$228\text{M}
> > \end{align*}$$
> >
> > Had every asset been admitted, surplus would have been $\$250$M; nonadmission removes $8.8\%$ of it. Each excluded item is real, but none can be relied on to pay a claim in a wind-up — the recognition concept at work.
