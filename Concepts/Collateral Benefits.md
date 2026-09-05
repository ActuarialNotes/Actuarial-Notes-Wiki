---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7f80eb7e6b0d4736420ff407390db5f4637b51010bc5a1651a758b40095f2459
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Collateral Benefits.md
---

**Collateral Benefits** are payments an injured person receives from a source other than the tortfeasor — [[Statutory Accident Benefits]], employer sick pay, disability insurance, [[Employment Insurance]], [[Health Care Insurance|public health care]] — that may be deducted from a [[Tort Litigation|tort]] award to prevent double recovery for the same loss.

> $$\text{Net award} = \text{Assessed damages} - \text{Deductible collateral benefits}$$

- **The competing principles.** Full compensation says the plaintiff should be made whole once, not twice; but the *collateral source rule* in its pure form says a wrongdoer should not benefit from insurance the plaintiff paid for. Canadian law resolves this **statutorily** in auto, where accident benefits are expressly deductible, and by common-law rules elsewhere.
- **Deductibility is matched by head of damage.** Income replacement benefits are deducted from the income-loss award; medical benefits from the future-care award. Deducting an income benefit from a non-pecuniary award would be a mismatch and is not permitted.
- **Subrogation is the alternative mechanism.** Where a benefit is *not* deducted, the payer typically has a right to recover from the tort award — provincial health insurers, for instance, have statutory subrogation for the cost of treating accident victims. Either way, the tortfeasor ultimately pays once and the plaintiff recovers once.
- **Why it matters to the insurer.** In auto, the same insurer often pays both the accident benefits and (through the liability policy of the at-fault driver) part of the tort award. Coordination determines the net cost of the system rather than merely who writes the cheque.
- **Actuarial consequence.** A change in the deductibility rules — or a benefit increase on the accident-benefit side — shifts cost between coverages without changing total system cost. A rate indication computed coverage by coverage will show a large movement in each, offsetting; treating either in isolation gets the answer wrong.
- Benefits from a source the plaintiff **paid for privately**, such as a personally purchased disability policy, are more likely to escape deduction than benefits mandated by statute — the distinction Canadian courts draw between charitable or self-funded benefits and statutory schemes.

> [!example]- Coordinating Benefits and a Tort Award {Example}
> A claimant's assessed damages are $\$500{,}000$: $\$220{,}000$ past and future income loss, $\$130{,}000$ future care, $\$150{,}000$ non-pecuniary. They have received $\$85{,}000$ of accident-benefit income replacement and $\$40{,}000$ of medical/rehabilitation benefits, both statutorily deductible. A $\$45{,}000$ tort deductible applies to the non-pecuniary award, and the claimant is $10\%$ contributorily negligent.
>
> Compute the net tort payment.
>
> > [!answer]-
> > Apply each adjustment to the correct head, in order.
> >
> > **Income loss:**
> >
> > $$\$220{,}000 - \$85{,}000 = \$135{,}000$$
> >
> > **Future care:**
> >
> > $$\$130{,}000 - \$40{,}000 = \$90{,}000$$
> >
> > **Non-pecuniary**, after the [[Tort Threshold and Deductible|deductible]]:
> >
> > $$\$150{,}000 - \$45{,}000 = \$105{,}000$$
> >
> > **Subtotal**, then contributory negligence:
> >
> > $$\begin{align*}
> > \text{Subtotal} &= \$135{,}000 + \$90{,}000 + \$105{,}000 \\
> > &= \$330{,}000 \\[4pt]
> > \text{Net award} &= 0.90 \times \$330{,}000 \\
> > &= \$297{,}000
> > \end{align*}$$
> >
> > The claimant receives $\$297{,}000$ in tort plus the $\$125{,}000$ of benefits already paid, for $\$422{,}000$ against $\$500{,}000$ assessed — the gap being the deductible and their own share of fault.
> >
> > For the insurer, the point is that **$\$125{,}000$ of the total cost was paid years earlier on the accident-benefit side**. Reserving the tort claim at assessed damages without allowing for the collateral offset over-reserves the liability coverage while the same cost sits, already paid, in the accident-benefit line.
