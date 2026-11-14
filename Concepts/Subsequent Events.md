---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b537b73297e8205035b44684526d64c492ffd20d448acd363c10ecc4b3c430a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Subsequent Events.md
---
![[Media/Figures/Subsequent_Events.svg|340]]

A **Subsequent Event** is an event that occurs after the valuation date but before the report is completed and that may bear on the valuation. The [[Standards of Practice]] require the [[Appointed Actuary]] to consider subsequent events, and the treatment of each turns on whether it gives evidence about conditions that existed at the valuation date or creates a new condition afterwards.

Subsequent events fall into three categories:

1. **Adjusting events** tell the actuary something that was true at the valuation date but not then known. They change the liability.
2. **Non-adjusting events** create a condition that did not exist at the valuation date. They do not change the liability, but they may require disclosure if material to the reader's understanding.
3. **Going-concern events**, a category in Canadian practice, make the entity no longer a going concern. They change the whole basis of valuation, since a liability valued for [[Runoff|run-off]] or wind-up is measured differently from one valued on a going-concern basis.

Adjusting events include a [[Court Case|court decision]] interpreting a benefit definition (the law was always so), a large claim settling for far more than reserved, and a reinsurer's insolvency arising from conditions already present. Non-adjusting events include a catastrophe in January after a December year end, a new statute effective after the valuation date, and an acquisition.

The cut-off is the report date, not the valuation date. The actuary's obligation to consider events continues until the report is completed, which is why the opinion carries both dates.

Judgement is required at the boundary, and it is often contested. A settlement three weeks after year end usually reflects conditions existing at year end. A settlement driven entirely by a January change in the law does not.

An adjusting event moves the [[Statement of Actuarial Opinion]] and the [[MCT]] ratio, and failing to reflect one is a valuation error rather than a disclosure omission.

> [!example]- How should the actuary treat each of these events? {Example}
> An insurer's valuation date is December 31, and the report is signed on March 15. These events occur in between:
>
> 1. On January 20 an appellate court holds that a category of claims falls outside a benefit cap. $\$28$ million of open claims are affected.
> 2. On February 8 a windstorm causes $\$40$ million of insured losses.
> 3. On February 22 a claim carried at $\$2$ million settles for $\$11$ million, on facts fully known at December 31.
> 4. On March 1 the insurer's largest reinsurer is placed in liquidation, having been downgraded twice during the prior year. $\$60$ million is recoverable.
> 5. On March 10 the board approves the sale of a subsidiary at a $\$15$ million gain.
>
> > [!answer]-
> > - The question in every case is whether the condition was true on December 31.
> > - Event 1 is adjusting. The decision interprets the law as it always was, so the obligation existed at December 31. The [[Liability for Incurred Claims|LIC]] increases by the assessed effect on the $\$28$ million of claims.
> > - Event 2 is non-adjusting. The storm occurred in the new year and creates a new obligation belonging to the next accident year. It is disclosed if material to understanding the insurer's position, and $\$40$ million usually is.
> > - Event 3 is adjusting. The facts existed at the valuation date, and the settlement is evidence of what the claim was always worth. The liability increases by $\$11 - \$2 = \$9$ million, and the actuary asks whether the same under-reserving affects similar open claims.
> > - Event 4 is adjusting. The reinsurer's condition deteriorated during the prior year, so the liquidation is evidence of a condition existing at the valuation date. The [[Reinsurance Contracts Held|reinsurance asset]] is written down for expected non-recovery, and the $\$60$ million is a [[Concentration Risk|concentration]] and capital event that also belongs in the [[FCT]].
> > - Event 5 is neither adjusted for nor disclosed in the actuarial report, though the financial statements may disclose it. It does not affect the valuation of insurance contract liabilities.
> > - Events 1, 3 and 4 are adjusted for, event 2 is disclosed, and event 5 is neither.

> [!trap] Adjusting for every event before the report date
> An event dated after the valuation date is not adjusting just because the report is not yet signed. The January windstorm is a new condition and is disclosed. A January settlement on facts known at year end is evidence of the year-end liability and is adjusted for.
