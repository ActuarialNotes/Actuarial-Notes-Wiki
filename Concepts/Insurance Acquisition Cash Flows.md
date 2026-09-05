---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1176a33560e78f181c25f15fed09108db4030e42df0df6d6c85d121c8ef8e681
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Acquisition Cash Flows.md
---

**Insurance Acquisition Cash Flows** are the costs of selling, underwriting and starting a group of insurance contracts — commissions, premium taxes attributable to acquisition, underwriting and policy issuance costs — where they are **directly attributable** to the portfolio. Under [[IFRS 17]] they are not a separate deferred acquisition cost asset: they are allocated to groups of contracts and absorbed into the [[Liability for Remaining Coverage|LRC]] measurement.

- **Directly attributable is the test.** Commission on a policy qualifies; the sales department's general overhead, brand advertising and product development do not, and are expensed as incurred. This is stricter than the old deferred acquisition cost practice and moves some cost forward into current expense.
- **The DAC asset is gone.** Under the [[Premium Allocation Approach|PAA]], acquisition cash flows **reduce the LRC** rather than sitting as an asset on the other side of the balance sheet, so the gross-up disappears and the balance sheet shrinks relative to the old presentation.
- **The PAA expedient.** Where the coverage period of each contract in the group is **one year or less**, the insurer may elect to **expense acquisition cash flows as incurred**. This is a simplification most personal-lines insurers take; it accelerates expense recognition and makes the LRC simply the unearned premium.
- **Allocation to expected renewals.** Acquisition cash flows attributable to *anticipated renewals* of contracts in a group are allocated to those future groups and held as an **asset** until the renewal is recognised — one of the few IFRS 17 assets relating to contracts not yet issued. That asset is tested for **recoverability** each period.
- **They feed the [[Onerous Contract|onerous]] test.** Acquisition cash flows are part of the fulfilment cash flows for the group, so a group with high commission and a thin margin can be onerous at inception even where claims alone would not make it so.
- The policy choice — defer or expense — is applied consistently by group and must be disclosed, and it materially affects the timing of reported profit in a **growing** book.

> [!example]- Defer or Expense? {Example}
> An insurer writes $\$100$ million of annual premium evenly through the year, with acquisition cash flows of $18\%$. Premium grows $25\%$ the following year. Compare reported results in year 1 under (a) deferral within the LRC and (b) the expense-as-incurred expedient.
>
> > [!answer]-
> > With business written evenly, roughly **half** of each year's premium is earned in the year of writing.
> >
> > **(a) Deferral.** Acquisition cash flows of $\$18$ million are recognised in proportion to coverage provided:
> >
> > $$0.50 \times \$18\text{M} = \$9\text{M}$$
> >
> > with $\$9$ million reducing the LRC at year end.
> >
> > **(b) Expense as incurred.** The full $\$18$ million is charged in year 1.
> >
> > **Year 1 difference: $\$9$ million of additional expense** under the expedient — a real earnings difference from a policy election, with identical cash flows.
> >
> > **Year 2, with premium of $\$125$ million** and acquisition cash flows of $\$22.5$ million:
> >
> > - Under deferral: $\$9$M carried in from year 1 plus $0.50 \times \$22.5$M $= \$11.25$M, so $\$20.25$M expensed.
> > - Under the expedient: $\$22.5$M expensed.
> >
> > A difference of $\$2.25$ million — smaller, but still adverse to the expedient.
> >
> > **The pattern to remember:** in a **growing** book the expense-as-incurred election permanently depresses reported earnings, because each year's larger acquisition spend is charged in full while the matching revenue arrives later. In a **shrinking** book it flatters them. The election is administratively simpler and is widely taken, but its effect on the earnings pattern is a growth-rate effect, and an analyst comparing two insurers must know which election each has made.
