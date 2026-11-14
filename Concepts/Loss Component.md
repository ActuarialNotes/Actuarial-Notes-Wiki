---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9184afc626e4dcd3c31720be7e76c15e4b492d810f7b23b5eb8e8048f070ee90
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Component.md
---

![[Media/Figures/Loss_Component.svg|340]]

The **Loss Component** is the part of the [[Liability for Remaining Coverage|liability for remaining coverage]] (LRC) that tracks the loss recognised on an [[Onerous Contract|onerous]] group of contracts. When a group is onerous, the shortfall goes straight to profit or loss and is recorded as a loss component within the LRC, then released as the expected claims it represents are incurred.

The LRC of an onerous group is

> $$\text{LRC} = \text{Non-onerous portion} + \text{Loss component}$$

- The non-onerous portion is released as [[Insurance Revenue|insurance revenue]].
- The loss component is released against [[Insurance Service Expenses|insurance service expenses]].

The loss component is tracked separately because its loss has already been recognised. When the claims it anticipated occur, recognising them again as expense would count the loss twice, so the loss component is drawn down at the same time to offset the expense.

Nothing in the loss component becomes revenue. Revenue is recognised only on the non-onerous portion of the LRC, so the insurance revenue reported for an onerous group is less than the premium earned.

## Release of the loss component

Each period the loss component is released on a systematic basis, typically in proportion to the claims and expenses expected to be incurred. The released amount is excluded from that period's insurance service expenses.

> [!example]- How much of this loss component is released in period 1, and what is the period's expense? {Example}
> A group is recognised as onerous at inception with a loss of $\$12$ million, established as a loss component in the LRC. Total expected claims over the coverage period are $\$150$ million. In the first period, $\$60$ million of claims are incurred.
>
> > [!answer]-
> > - At inception the $\$12$ million loss is recognised in insurance service expenses, and the loss component is set at $\$12$ million.
> > - In period 1, $\$60\text{M}/\$150\text{M} = 40\%$ of the expected claims are incurred, so $0.40 \times \$12\text{M} = \$4.8$ million of the loss component is released.
> > - Insurance service expenses for period 1 are $\$60\text{M} - \$4.8\text{M} = \$55.2$ million.
> > - The loss component falls to $\$12\text{M} - \$4.8\text{M} = \$7.2$ million.
> > - Over the whole coverage period, $\$150$ million of claims less $\$12$ million released is $\$138$ million of expense, which with the $\$12$ million charged at inception totals $\$150$ million. The loss is recognised once, but earlier.

## Reversal

If later estimates improve, the loss component is reduced and a gain recognised before any [[Contractual Service Margin|CSM]] can be established. Under the [[General Measurement Model|GMM]], a group whose loss component is fully reversed can then begin building a CSM again.

## Loss-recovery component on reinsurance held

Where reinsurance covers an onerous group, a **loss-recovery component** on the [[Reinsurance Contracts Held|reinsurance contracts held]] asset recognises the recovery at the same time as the loss. The loss and its recovery are matched, rather than the loss appearing a year before the recovery.

> [!trap] Reading a period's loss ratio without the release
> In the example, period 1 reports $\$55.2$ million of claims expense against $\$60$ million incurred, so a loss ratio from reported expense looks better than the experience. Read it alongside the loss component released, which IFRS 17 requires to be disclosed separately.
