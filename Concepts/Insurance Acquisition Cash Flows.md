---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:294364f5480e56378a33e5cb6af7cd6c5c81b09ca8efc05349602d5882632210
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Acquisition Cash Flows.md
---

![[Media/Figures/Insurance_Acquisition_Cash_Flows.svg|340]]

**Insurance Acquisition Cash Flows** are the costs of selling, underwriting and starting a group of insurance contracts that are directly attributable to the portfolio the group belongs to. Under [[IFRS 17]] they are allocated to groups of contracts and absorbed into the measurement of the [[Liability for Remaining Coverage|liability for remaining coverage]] (LRC), not held as a separate [[Deferred Acquisition Cost|deferred acquisition cost]] asset.

Being directly attributable is the test:

| Acquisition cash flows | Expensed as incurred |
| :--- | :--- |
| Commissions | General overhead of the sales department |
| Premium taxes attributable to acquisition | Brand advertising |
| Underwriting and policy issuance costs | Product development |

This test is stricter than the old deferred acquisition cost practice, so some cost moves forward into current expense.

## Under the premium allocation approach

Under the [[Premium Allocation Approach|premium allocation approach]] (PAA), acquisition cash flows reduce the LRC. They no longer sit as an asset on the other side of the balance sheet, so the gross-up disappears and the balance sheet shrinks relative to the old presentation.

Where the coverage period of each contract in the group is one year or less, the insurer may elect to expense acquisition cash flows as incurred. Most personal-lines insurers take this simplification. It accelerates expense recognition and makes the LRC simply the unearned premium. The choice to defer or expense is applied consistently by group and must be disclosed.

> [!example]- How much acquisition expense does this insurer recognise in years 1 and 2, with deferral and with the expense-as-incurred election? {Example}
> An insurer writes $\$100$ million of annual premium evenly through year 1, with acquisition cash flows of $18\%$ of premium. Premium grows $25\%$ in year 2.
>
> > [!answer]-
> > - With business written evenly, about half of each year's premium is earned in the year it is written.
> > - Year 1 acquisition cash flows are $0.18 \times \$100\text{M} = \$18\text{M}$.
> > - With deferral, they are recognised in proportion to the coverage provided, so year 1 expense is $0.50 \times \$18\text{M} = \$9\text{M}$, and $\$9\text{M}$ reduces the LRC at year end.
> > - Expensed as incurred, the full $\$18\text{M}$ is charged in year 1, which is $\$9\text{M}$ more expense from the same cash flows.
> > - Year 2 premium is $\$125\text{M}$, so year 2 acquisition cash flows are $\$22.5\text{M}$.
> > - With deferral, year 2 expense is the $\$9\text{M}$ carried in plus $0.50 \times \$22.5\text{M} = \$11.25\text{M}$, a total of $\$20.25\text{M}$.
> > - Expensed as incurred, year 2 expense is $\$22.5\text{M}$, which is $\$2.25\text{M}$ more.
> > - In a growing book the expense-as-incurred election lowers reported earnings each year, because each year's larger acquisition spend is charged in full while the matching revenue is earned later. In a shrinking book it raises them.

## Acquisition cash flows for expected renewals

Acquisition cash flows attributable to anticipated renewals of the contracts in a group are allocated to those future groups. They are held as an asset until the renewal is recognised, which makes this one of the few IFRS 17 assets relating to contracts not yet issued. The asset is tested for recoverability each period.

## Effect on the onerous contract test

Acquisition cash flows are part of the [[Fulfilment Cash Flows|fulfilment cash flows]] of the group. A group with high commission and a thin margin can therefore be [[Onerous Contract|onerous]] at inception even where its claims alone would not make it so.

> [!trap] Comparing insurers that made different elections
> Two insurers with identical cash flows report different earnings if one defers acquisition cash flows and the other expenses them as incurred. The gap grows with the growth rate of the book, so check which election each insurer has made before comparing their results.
