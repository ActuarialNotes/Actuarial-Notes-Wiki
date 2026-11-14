---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8de71728fbeffb39a5e5f4b13a21d341934a0fb313e7074632c4451686183095
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Balance Sheet.md
---
A **Balance Sheet** reports what an insurer owns and owes at a point in time. In the statutory [[NAIC Annual Statement]] it occupies two pages, Assets (page 2) and Liabilities, Surplus and Other Funds (page 3), and counts only **admitted** assets.

The residual, *surplus as regards policyholders*, measures what is actually available to pay claims. It is

> $$\text{Surplus} = \text{Admitted assets} - \text{Liabilities}$$

and the admitted assets are

> $$\text{Admitted assets} = \text{Total assets} - \text{Nonadmitted assets}$$

- $\text{Nonadmitted assets}$ are assets a regulator could not count on to pay claims, which statutory accounting leaves off the balance sheet.

Premiums more than 90 days past due, furniture and equipment, and deferred tax that fails the admissibility test are **nonadmitted**. A nonadmitted asset is not lost, since a receivable may still be collected, but it is charged against surplus.

> [!example]- What is this insurer's statutory surplus? {Example}
> Year-end balances, in \$ millions:
>
> | Item | Amount |
> | :--- | ---: |
> | Bonds | 800 |
> | Common stocks | 150 |
> | Cash and short-term | 50 |
> | Premiums receivable (15 more than 90 days past due) | 120 |
> | Reinsurance recoverable on paid losses | 20 |
> | Furniture and equipment | 10 |
> | Net deferred tax asset (12 admissible) | 30 |
> | Net loss reserves | 500 |
> | Net LAE reserves | 90 |
> | Net unearned premium | 260 |
> | Other liabilities | 40 |
> | Provision for reinsurance | 5 |
>
> > [!answer]-
> > - Total assets are $800 + 150 + 50 + 120 + 20 + 10 + 30 = 1{,}180$.
> > - Nonadmitted assets are $15 + 10 + (30 - 12) = 43$.
> > - Admitted assets are $1{,}180 - 43 = 1{,}137$.
> > - Liabilities are $500 + 90 + 260 + 40 + 5 = 895$.
> > - Surplus is $1{,}137 - 895 = \$242$M.

## Assets

Assets are dominated by invested assets: bonds (investment grade at amortised cost), common stocks (at fair value), and cash and short-term investments. Then come premiums receivable, reinsurance recoverable on **paid** losses, investment income due and accrued, and the admitted part of the net deferred tax asset.

## Liabilities

Liabilities are dominated by the loss and LAE reserves ([[Unpaid Claims]]) and the [[Unearned Premium|unearned premium reserve]], both reported **net of reinsurance**. Then come commissions, expenses and taxes payable, ceded premiums payable, funds held under reinsurance treaties, and the **provision for reinsurance**, the [[Schedule F]] charge for recoverables that are unsecured or overdue.

## Surplus

Surplus comprises capital stock, gross paid-in and contributed surplus, surplus notes, special surplus funds (such as the restricted gain on retroactive reinsurance) and unassigned funds, less treasury stock. Its movement over the year is the [[Capital and Surplus]] account.

## Statutory, GAAP and IFRS 17 balance sheets

[[GAAP]] restores nonadmitted assets, adds a DAC asset, carries available-for-sale bonds at fair value and **grosses up** reinsurance. [[IFRS]] 17 also grosses up, discounts claim liabilities and folds acquisition costs into the liability for remaining coverage. The statutory balance sheet is the smallest and most conservative of the three.

> [!example]- How does each regime present this reinsurance program? {Example}
> Gross unpaid losses are $\$1{,}000$M, of which $\$300$M is ceded to an authorised reinsurer. Gross unearned premium is $\$500$M, of which $\$100$M is ceded.
>
> > [!answer]-
> > - **SAP:** loss reserves $\$700$M and unearned premium $\$400$M — net. The ceded amounts appear on no line of the balance sheet and are visible only in [[Schedule F]].
> > - **GAAP:** liabilities $\$1{,}000$M and $\$500$M gross; assets of $\$300$M reinsurance recoverable (less a credit-loss allowance) and $\$100$M prepaid reinsurance premium.
> > - **IFRS 17:** gross insurance contract liabilities, discounted and with a risk adjustment, and a separately measured reinsurance contract asset reduced for non-performance risk.
> > - Net of reinsurance, SAP and GAAP agree, but only the grossed-up presentations show the $\$400$M of counterparty exposure on the face of the statement.

## Uses of the balance sheet

Leverage tests are built on the balance sheet: premium and reserves to surplus ([[Insurance Leverage]]), [[Risk-Based Capital]] and the [[IRIS Ratios]]. Its loss and LAE reserve line is the figure the appointed actuary's opinion covers.

> [!trap] Reading statutory leverage as gross leverage
> A reserves-to-surplus ratio computed from the statutory balance sheet is a **net** leverage measure. Gross leverage and [[Reinsurance Credit Risk|reinsurance credit risk]] must be read from Schedule F.
