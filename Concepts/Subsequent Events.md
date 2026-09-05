---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f16a57a69c53c13f2b40b1eb18190f72aa28b7cf748512be1478388a57b2e3ba
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Subsequent Events.md
---

**Subsequent Events** are events occurring **after the valuation date but before the report is completed** that may bear on the valuation. The [[Standards of Practice]] require the [[Appointed Actuary]] to consider them, and the treatment turns on a single question: does the event provide evidence about conditions that **existed at the valuation date**, or does it create a **new** condition afterwards?

> $$\begin{cases} \text{Evidence of conditions at the valuation date} & \rightarrow \text{adjust} \\[4pt] \text{New condition arising after} & \rightarrow \text{disclose (or neither)} \end{cases}$$

- **Adjusting events** — the event tells the actuary something true at the valuation date that was not then known. A [[Court Case|court decision]] interpreting a benefit definition (the law was always thus), a large claim settling for far more than reserved, a reinsurer's insolvency arising from conditions already present. These **change the liability**.
- **Non-adjusting events** — the event creates a condition that did not exist at the valuation date. A catastrophe occurring in January after a December year end, a new statute effective after the date, an acquisition. These do **not** change the liability, but may require **disclosure** if material to the reader's understanding.
- **A third category** exists in Canadian practice: events that make the entity **no longer a going concern**. These change the entire basis of valuation, since a liability valued for [[Runoff|run-off]] or wind-up is measured differently from one valued on a going-concern basis.
- **The cut-off is the report date, not the valuation date.** The actuary's obligation to consider events continues until the report is completed, which is why the opinion carries both dates.
- **Judgement is required at the boundary**, and it is often contested. A settlement three weeks after year end usually reflects conditions existing at year end; a settlement driven entirely by a January change in the law does not.
- **The consequences are real:** an adjusting event of any size moves the [[Statement of Actuarial Opinion]] and the [[MCT]] ratio, and failing to reflect one is a valuation error rather than a disclosure omission.

> [!example]- Adjust, Disclose, or Neither? {Example}
> An insurer's valuation date is December 31; the report is signed on March 15. Classify each event.
>
> 1. On January 20 an appellate court holds that a category of claims falls outside a benefit cap. $\$28$ million of open claims are affected.
> 2. On February 8 a windstorm causes $\$40$ million of insured losses.
> 3. On February 22 a claim carried at $\$2$ million settles for $\$11$ million, on facts fully known at December 31.
> 4. On March 1 the insurer's largest reinsurer is placed in liquidation, having been downgraded twice during the prior year. $\$60$ million is recoverable.
> 5. On March 10 the board approves the sale of a subsidiary at a $\$15$ million gain.
>
> > [!answer]-
> > 1. **Adjust.** The decision interprets the law as it always was, so the obligation existed at December 31. Increase the [[Liability for Incurred Claims|LIC]] by the assessed effect on the $\$28$ million of claims.
> > 2. **Disclose, do not adjust.** The storm occurred in the new year and creates a new obligation belonging to the next accident year. It is disclosed if material to understanding the insurer's position — and $\$40$ million usually is.
> > 3. **Adjust.** The facts existed at the valuation date; the settlement is evidence of what the claim was always worth. Increase by $\$9$ million, and — more importantly — ask whether the same under-reserving affects similar open claims, which is where the larger number usually is.
> > 4. **Adjust.** The reinsurer's condition deteriorated during the prior year, and the liquidation is evidence of a condition existing at the valuation date. The [[Reinsurance Contracts Held|reinsurance asset]] must be written down for expected non-recovery — and $\$60$ million is a [[Concentration Risk|concentration]] and capital event that also belongs in [[FCT]].
> > 5. **Neither adjust nor disclose in the actuarial report**, though the financial statements may disclose it. It does not affect the valuation of insurance contract liabilities at all.
> >
> > **The discriminating question in every case:** *was this true on December 31?* Items 1, 3 and 4 were; items 2 and 5 were not.
