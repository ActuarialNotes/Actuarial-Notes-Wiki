---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1c51c4769a701f6973c53f89f8cc67ae5d4601f5e2572778d34d3d81bc800bee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Collateral Benefits.md
---

![[Media/Figures/Collateral_Benefits.svg|340]]

A **Collateral Benefit** is a payment an injured person receives from a source other than the tortfeasor, such as [[Statutory Accident Benefits|statutory accident benefits]], employer sick pay, disability insurance, [[Employment Insurance]] or [[Health Care Insurance|public health care]], that may be deducted from a [[Tort Litigation|tort]] award to prevent double recovery for the same loss.

The net tort award is

> $$\text{Net award} = \text{Assessed damages} - \text{Deductible collateral benefits}$$

- $\text{Assessed damages}$ are the damages the court assesses for the injury.
- $\text{Deductible collateral benefits}$ are the collateral benefits the law allows to be deducted.

Two principles compete. Full compensation says the plaintiff should be made whole once, not twice. The *collateral source rule*, in its pure form, says a wrongdoer should not benefit from insurance the plaintiff paid for. Canadian law resolves this by statute in auto, where accident benefits are expressly deductible, and by common-law rules elsewhere. Benefits the plaintiff paid for privately, such as a personally purchased disability policy, are more likely to escape deduction than benefits mandated by statute.

## Matching by head of damage

A benefit is deducted from the head of damage it replaces. Income replacement benefits are deducted from the income loss award, and medical benefits from the future care award. Deducting an income benefit from a non-pecuniary award would be a mismatch and is not permitted.

> [!example]- What is this claimant's net tort payment? {Example}
> A claimant's assessed damages are $\$500{,}000$. They have received accident benefits that are statutorily deductible. A $\$45{,}000$ [[Tort Threshold and Deductible|tort deductible]] applies to the non-pecuniary award, and the claimant is $10\%$ contributorily negligent.
>
> | Head of damage | Assessed | Accident benefits received |
> | :--- | ---: | ---: |
> | Income loss | $\$220{,}000$ | $\$85{,}000$ income replacement |
> | Future care | $\$130{,}000$ | $\$40{,}000$ medical and rehabilitation |
> | Non-pecuniary | $\$150{,}000$ | none |
>
> > [!answer]-
> > - Income loss less income replacement is $\$220{,}000 - \$85{,}000 = \$135{,}000$.
> > - Future care less medical and rehabilitation benefits is $\$130{,}000 - \$40{,}000 = \$90{,}000$.
> > - Non-pecuniary damages less the deductible are $\$150{,}000 - \$45{,}000 = \$105{,}000$.
> > - The subtotal is $\$135{,}000 + \$90{,}000 + \$105{,}000 = \$330{,}000$.
> > - After $10\%$ contributory negligence, the net tort payment is $0.90 \times \$330{,}000 = \$297{,}000$.
> > - With the $\$125{,}000$ of benefits already paid, the claimant recovers $\$422{,}000$ against $\$500{,}000$ assessed. The gap is the deductible and their own share of fault.

## Subrogation

Where a benefit is not deducted, the payer typically has a right to recover it from the tort award. Provincial health insurers, for instance, have statutory subrogation for the cost of treating accident victims. Either way, the tortfeasor pays once and the plaintiff recovers once.

## Effect on insurers' costs

In auto, the same insurer often pays both the accident benefits and, through the at-fault driver's liability policy, part of the tort award, so coordination sets the net cost of the system. A change in the deductibility rules, or a benefit increase on the accident benefit side, shifts cost between coverages without changing total system cost. A rate indication computed coverage by coverage shows large offsetting movements in each, and treating either coverage in isolation gets the answer wrong.

> [!trap] Reserving the tort claim at assessed damages
> In the example, $\$125{,}000$ of the cost was paid years earlier on the accident benefit side. Reserving the tort claim at assessed damages without the collateral offset over-reserves the liability coverage for cost already paid in the accident benefit line.
