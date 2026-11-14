---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:78581c206e0df1b2c082000665a9896ac93190ff55b3c71d34644e56c66f646e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability for Remaining Coverage.md
---

![[Media/Figures/Liability_for_Remaining_Coverage.svg|340]]

The **Liability for Remaining Coverage** (LRC) is the [[IFRS 17]] liability for service the insurer has not yet provided, the obligation to cover claims that have not yet occurred under contracts already in force. It is the successor to the unearned premium reserve.

The LRC does not contain claims already incurred. When a claim occurs, its cost moves to the [[Liability for Incurred Claims|liability for incurred claims]] (LIC). Revenue is released from the LRC and expense is recognised in the LIC.

Under the [[Premium Allocation Approach|PAA]], the LRC is

> $$\text{LRC} = P - A - R$$

- $P$ is the premiums received or receivable.
- $A$ is the [[Insurance Acquisition Cash Flows|insurance acquisition cash flows]] not yet amortised.
- $R$ is the [[Insurance Revenue|insurance revenue]] recognised to date.

Revenue is normally recognised on a time-proportional basis over the coverage period, so the LRC under the PAA runs down much as the unearned premium reserve did.

Discounting the LRC is optional under the PAA where the coverage period is one year or less, or where there is no significant financing component. This is why most Canadian personal lines LRCs are undiscounted.

> [!example]- What is the LRC at December 31 for this group of policies? {Example}
> A group of annual policies is written on July 1 with premiums of $\$24$ million and directly attributable acquisition cash flows of $\$4.8$ million. Revenue is recognised on a time basis.
>
> > [!answer]-
> > - Six of twelve months of coverage have been provided, so half the premium, $\$12$ million, has been recognised as revenue.
> > - Half the acquisition cash flows have been amortised, leaving $\$4.8\text{M} - \$2.4\text{M} = \$2.4$ million.
> > - The LRC is $\$24\text{M} - \$2.4\text{M} - \$12\text{M} = \$9.6$ million.

## The LRC under the General Measurement Model

Under the [[General Measurement Model|GMM]], the LRC is

> $$\text{LRC} = \text{PV} + \text{RA} + \text{CSM}$$

- $\text{PV}$ is the present value of the future [[Fulfilment Cash Flows|fulfilment cash flows]] for the remaining coverage.
- $\text{RA}$ is the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]].
- $\text{CSM}$ is the [[Contractual Service Margin|contractual service margin]], the unearned profit.

P&C insurers meet this construction mainly on multi-year contracts.

## The loss component of an onerous group

If the expected fulfilment cash flows for the remaining coverage exceed the LRC carried, the group is [[Onerous Contract|onerous]]. The shortfall is recognised as a loss immediately and tracked as a separate [[Loss Component|loss component]] of the LRC. This is the IFRS 17 successor to the premium deficiency reserve. Unlike the old test, it is applied at the group level rather than across the whole book, so profitable business cannot offset unprofitable business.

> [!example]- At December 31 the group above expects fulfilment cash flows of $\$11.5$ million, including risk adjustment, for its remaining six months. Is it onerous? {Example}
> - The expected cash flows of $\$11.5$ million exceed the LRC of $\$9.6$ million, so the group is onerous.
> - The loss component is $\$11.5\text{M} - \$9.6\text{M} = \$1.9$ million.
> - The $\$1.9$ million is recognised in profit or loss immediately, in full, rather than over the remaining six months.
> - The LRC is carried at $\$9.6\text{M} + \$1.9\text{M} = \$11.5$ million, of which $\$1.9$ million is the loss component.
