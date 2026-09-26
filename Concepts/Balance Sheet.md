---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:edab564456806ef66b1a1faec799e468fa9b1a6a96e2827be724c04b483a8380
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Balance Sheet.md
---

**The Balance Sheet** reports what an insurer owns and owes at a point in time. In the statutory [[NAIC Annual Statement]] it occupies two pages — Assets (page 2) and Liabilities, Surplus and Other Funds (page 3) — and counts only **admitted** assets, so the residual, *surplus as regards policyholders*, measures what is actually available to pay claims.

> $$\text{Surplus} = \text{Admitted assets} - \text{Liabilities}$$

> $$\text{Admitted assets} = \text{Total assets} - \text{Nonadmitted assets}$$

- **Assets** are dominated by invested assets — bonds (investment grade at amortised cost), common stocks (at fair value), cash and short-term investments — then premiums receivable, reinsurance recoverable on **paid** losses, investment income due and accrued, and the admitted part of the net deferred tax asset. Premiums more than 90 days past due, furniture and equipment, and deferred tax that fails the admissibility test are **nonadmitted**.
- **Liabilities** are dominated by the loss and LAE reserves ([[Unpaid Claims]]) and the [[Unearned Premium|unearned premium reserve]], both reported **net of reinsurance**; then commissions, expenses and taxes payable, ceded premiums payable, funds held under reinsurance treaties, and the **provision for reinsurance** — the [[Schedule F]] charge for recoverables that are unsecured or overdue.
- **Surplus** comprises capital stock, gross paid-in and contributed surplus, surplus notes, special surplus funds (such as the restricted gain on retroactive reinsurance) and unassigned funds, less treasury stock. Its movement over the year is the [[Capital and Surplus]] account.
- **Across regimes.** [[GAAP]] restores nonadmitted assets, adds a DAC asset, carries available-for-sale bonds at fair value and **grosses up** reinsurance; [[IFRS]] 17 also grosses up, discounts claim liabilities and folds acquisition costs into the liability for remaining coverage. The statutory balance sheet is the smallest and most conservative of the three.
- **Use.** Leverage tests are built on it — premium and reserves to surplus ([[Insurance Leverage]]), [[Risk-Based Capital]], the [[IRIS Ratios]] — and its loss and LAE reserve line is the figure the appointed actuary's opinion covers.

> [!example]- From Ledger to Surplus {Example}
> Year-end balances, in \$ millions: bonds $800$, common stocks $150$, cash and short-term $50$, premiums receivable $120$ (of which $15$ more than 90 days past due), reinsurance recoverable on paid losses $20$, furniture and equipment $10$, net deferred tax asset $30$ (of which $12$ admissible). Liabilities: net loss reserves $500$, net LAE reserves $90$, net unearned premium $260$, other liabilities $40$, provision for reinsurance $5$.
>
> Compute statutory surplus.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Total assets} &= 800 + 150 + 50 + 120 + 20 + 10 + 30 \\
> > &= 1{,}180 \\
> > \text{Nonadmitted} &= 15 + 10 + (30 - 12) \\
> > &= 43 \\
> > \text{Admitted assets} &= 1{,}180 - 43 \\
> > &= 1{,}137 \\
> > \text{Liabilities} &= 500 + 90 + 260 + 40 + 5 \\
> > &= 895 \\
> > \text{Surplus} &= 1{,}137 - 895 \\
> > &= 242
> > \end{align*}
> > $$
> >
> > Surplus is $\$242$M. The $\$43$M nonadmitted is not lost — the receivable may still be collected — but it is charged against surplus because a regulator could not count on it to pay claims.

> [!example]- One Reinsurance Program, Three Balance Sheets {Example}
> Gross unpaid losses are $\$1{,}000$M, of which $\$300$M is ceded to an authorised reinsurer; gross unearned premium is $\$500$M, of which $\$100$M is ceded. How does each regime present this?
>
> > [!answer]-
> > - **SAP:** loss reserves $\$700$M and unearned premium $\$400$M — net. The ceded $\$300$M and $\$100$M appear on no line of the balance sheet; they are visible only in [[Schedule F]].
> > - **GAAP:** liabilities $\$1{,}000$M and $\$500$M gross; assets of $\$300$M reinsurance recoverable (less a credit-loss allowance) and $\$100$M prepaid reinsurance premium.
> > - **IFRS 17:** gross insurance contract liabilities, measured on its own basis (discounted, with a risk adjustment), and a separately measured reinsurance contract asset reduced for non-performance risk.
> >
> > Net of reinsurance, SAP and GAAP agree (IFRS 17 differs only by its measurement basis), but only the grossed-up presentations show the $\$400$M of counterparty exposure on the face of the statement. A reserves-to-surplus ratio computed from the statutory balance sheet is a **net** leverage measure; gross leverage and [[Reinsurance Credit Risk|reinsurance credit risk]] must be read from Schedule F.
