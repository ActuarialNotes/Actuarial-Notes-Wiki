---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5d69e249713208017b75961a751db7c74320470a516364758b7ce5c088b18f87
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability for Remaining Coverage.md
---

**The Liability for Remaining Coverage** (LRC) is the [[IFRS 17]] liability for **service the insurer has not yet provided** — the obligation to cover claims that have not yet occurred under contracts already in force. It is the successor to the unearned premium reserve, and under the [[Premium Allocation Approach|PAA]] it is measured much the same way.

> $$\text{LRC}_{\text{PAA}} = \text{Premiums received} - \text{Acquisition cash flows amortised} - \text{Revenue recognised}$$

- **Under the PAA**, the LRC starts at premiums received (or receivable) less [[Insurance Acquisition Cash Flows|acquisition cash flows]], and is drawn down as [[Insurance Revenue|revenue]] is recognised over the coverage period — normally on a time-proportional basis, matching the old unearned premium mechanics closely.
- **Under the [[General Measurement Model|GMM]]**, the LRC is the present value of future [[Fulfilment Cash Flows|fulfilment cash flows]] plus the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] plus the unearned profit held as a [[Contractual Service Margin]] — a fundamentally different construction that P&C insurers meet mainly on multi-year contracts.
- **Onerous groups add a [[Loss Component]].** If expected fulfilment cash flows for remaining coverage exceed the LRC carried, the shortfall is recognised **immediately** as a loss and tracked as a separate component of the LRC. This is the IFRS 17 successor to the premium deficiency reserve, and unlike the old test it is applied at the **group** level rather than across the whole book, so profitable business cannot offset unprofitable business.
- **Discounting the LRC is optional under the PAA** where the coverage period is one year or less, or where there is no significant financing component — which is why most Canadian personal lines LRCs are undiscounted.
- **The LRC does not contain claims already incurred.** The moment a claim occurs, its cost moves to the [[Liability for Incurred Claims]]. This transfer is the engine of the income statement: revenue is released from the LRC and expense is recognised in the LIC.

> [!example]- Rolling Forward the LRC {Example}
> A group of annual policies is written on July 1 with premiums of $\$24$ million and directly attributable acquisition cash flows of $\$4.8$ million. Revenue is recognised on a time basis. At December 31, expected fulfilment cash flows for the remaining six months of coverage are $\$11.5$ million including risk adjustment.
>
> Determine the LRC at December 31.
>
> > [!answer]-
> > Six of twelve months of coverage have been provided, so half the premium and half the acquisition cash flows have been recognised.
> >
> > $$\begin{align*}
> > \text{LRC} &= \bigl(\$24\text{M} - \$12\text{M}\bigr) - \bigl(\$4.8\text{M} - \$2.4\text{M}\bigr) \\
> > &= \$12\text{M} - \$2.4\text{M} \\
> > &= \$9.6\text{M}
> > \end{align*}$$
> >
> > **Now the onerous test.** Expected fulfilment cash flows for the remaining coverage are $\$11.5$ million against an LRC of $\$9.6$ million:
> >
> > $$\begin{align*}
> > \text{Loss component} &= \$11.5\text{M} - \$9.6\text{M} \\
> > &= \$1.9\text{M}
> > \end{align*}$$
> >
> > The group is **[[Onerous Contract|onerous]]**. The $\$1.9$ million is recognised in profit or loss **immediately**, and the LRC is carried at $\$9.6 + \$1.9 = \$11.5$ million, of which $\$1.9$ million is tracked as the [[Loss Component]].
> >
> > Two consequences worth stating. First, the loss is taken now, in full, rather than emerging over the remaining six months — IFRS 17 does not permit deferring a known loss. Second, because the test is applied to **this group**, a profitable group written the same month cannot absorb it; the old whole-portfolio premium deficiency test would have hidden this entirely.
