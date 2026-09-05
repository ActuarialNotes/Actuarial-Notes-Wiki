---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:777c5d6167dd91c3dc7359fcf6294a0223e36319207cdb3d62a7a0d137dc1fdc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Component.md
---

**The Loss Component** is the part of the [[Liability for Remaining Coverage]] that tracks the loss recognised on an [[Onerous Contract|onerous]] group of contracts. When a group is onerous, the shortfall goes straight to profit or loss and is recorded as a loss component within the LRC, then **released** as the expected claims it represents are incurred.

> $$\text{LRC} = \underbrace{\text{Remaining coverage (non-onerous portion)}}_{\text{released as revenue}} + \underbrace{\text{Loss component}}_{\text{released against expenses}}$$

- **Why it must be tracked separately.** The loss has already been recognised. When the claims it anticipated actually occur, recognising them again as [[Insurance Service Expenses|expense]] would double-count — so the loss component is drawn down at the same time, offsetting the expense. Without the separate tracking, an onerous group would report a loss twice.
- **Nothing in the loss component becomes [[Insurance Revenue|revenue]].** Revenue is recognised only on the non-onerous portion of the LRC, so an insurer's reported insurance revenue is *less* than premium earned for an onerous group. This is a real and often surprising presentation effect.
- **Systematic allocation.** Each period the loss component is released on a systematic basis — typically in proportion to the claims and expenses expected to be incurred — and the corresponding portion of incurred claims is excluded from insurance service expenses.
- **Reversal.** If subsequent estimates improve, the loss component is reduced (and a gain recognised) before any [[Contractual Service Margin|CSM]] can be established. Under the [[General Measurement Model|GMM]] a group whose loss component is fully reversed can then begin building a CSM again.
- **Reinsurance held has a mirror.** Where reinsurance covers an onerous group, a **loss-recovery component** on the [[Reinsurance Contracts Held]] asset recognises the recovery at the same time as the loss — so the two are matched rather than the loss appearing a year before its recovery.

> [!example]- Releasing the Loss Component {Example}
> A group is recognised as onerous at inception with a loss of $\$12$ million, established as a loss component in the LRC. Total expected claims over the coverage period are $\$150$ million. In the first period, $\$60$ million of claims are incurred.
>
> Show the effect on the income statement.
>
> > [!answer]-
> > **At inception**, the $\$12$ million loss is recognised in [[Insurance Service Expenses]] and the loss component is set at $\$12$ million.
> >
> > **In period 1**, $40\%$ of the expected claims are incurred ($\$60$M of $\$150$M), so $40\%$ of the loss component is released:
> >
> > $$\begin{align*}
> > \text{Loss component released} &= 0.40 \times \$12\text{M} \\
> > &= \$4.8\text{M}
> > \end{align*}$$
> >
> > **Insurance service expenses for period 1:**
> >
> > $$\begin{align*}
> > \text{Expense} &= \$60\text{M} - \$4.8\text{M} \\
> > &= \$55.2\text{M}
> > \end{align*}$$
> >
> > The loss component falls to $\$7.2$ million.
> >
> > **What the reader sees.** Period 1 reports $\$55.2$ million of claims expense against $\$60$ million actually incurred, because $\$4.8$ million of that cost was already charged at inception. Over the whole coverage period the arithmetic closes exactly: $\$150$M of claims less $\$12$M of loss component released equals $\$138$M of expense, and adding back the $\$12$M charged at inception gives $\$150$M in total. **The loss is recognised once, but earlier.**
> >
> > The presentational trap for an analyst: period 1's loss ratio, computed from reported expense, looks better than the underlying experience. The loss component release must be read alongside it, which is why IFRS 17 requires it to be disclosed separately.
