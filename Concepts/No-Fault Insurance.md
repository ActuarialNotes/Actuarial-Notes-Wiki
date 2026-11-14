---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7b33d6da2c7103c41129453977b404aeb07cf4be0dd5bfc013ad92add8dcf276
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/No-Fault Insurance.md
---

![[Media/Figures/No-Fault_Insurance.svg|340]]

**No-Fault Insurance** in automobile insurance means that an injured person recovers defined benefits from their own insurer, regardless of who caused the collision. It trades the right to sue for certainty and speed of payment.

Auto injury systems are classified by whether the injured person's own insurer pays first-party benefits regardless of fault, and by whether the right to sue is restricted:

| System | First-party benefits from own insurer | Right to sue the at-fault driver |
| :--- | :--- | :--- |
| Tort | None | Unrestricted |
| Add-on | Yes | Unrestricted |
| Partial (threshold) no-fault | Yes | Only above a threshold |
| Pure no-fault | Yes | Abolished |

Under tort, the injured person is compensated through the at-fault driver's liability coverage. Quebec's public bodily injury scheme and Manitoba's are the Canadian examples of pure no-fault. Ontario, the Atlantic provinces and, in modified form, Alberta keep tort for serious injury. Canadian schemes are almost all partial no-fault, under which first-party [[Statutory Accident Benefits|accident benefits]] are payable immediately and the right to sue survives only above a [[Tort Threshold and Deductible|threshold]].

> [!example]- How much does this injured driver recover under pure tort, pure no-fault and threshold no-fault? {Example}
> A driver is injured by another driver's negligence. The driver has $\$18{,}000$ of medical and rehabilitation cost, $\$25{,}000$ of lost income, and pain and suffering a court would value at $\$45{,}000$. The no-fault benefit schedule pays medical costs in full and $80\%$ of income loss. Under threshold no-fault, the injury does not meet the threshold.
>
> > [!answer]-
> > - Under pure tort, the driver sues and, if liability is established, recovers all three heads of damage, $\$18{,}000 + \$25{,}000 + \$45{,}000 = \$88{,}000$.
> > - That recovery is reduced by any contributory negligence, comes after two to four years, and is net of legal costs.
> > - Under pure no-fault, the driver's own insurer pays promptly, with no litigation, $\$18{,}000 + 0.80 \times \$25{,}000 = \$38{,}000$.
> > - There is no pain-and-suffering award and the $20\%$ income gap is uncompensated, so the driver is $\$50{,}000$ worse off than under tort, but is paid within weeks and would have been paid even if at fault.
> > - Under threshold no-fault, the accident benefits of $\$38{,}000$ are payable, and the tort action for the $\$45{,}000$ is barred because the injury is below the threshold.
> > - The driver recovers $\$88{,}000$ under pure tort, $\$38{,}000$ under pure no-fault and $\$38{,}000$ under threshold no-fault.

## Arguments for and against no-fault

The arguments for no-fault are:

- Benefits are paid within weeks rather than after years of litigation.
- Every injured person is compensated, including those at fault.
- Transaction costs fall sharply, because legal and adjusting expense on contested liability disappears.
- Premiums are more stable, because severity is capped by a benefit schedule rather than by juries.

The arguments against no-fault are:

- The negligent driver bears no financial consequence, which weakens deterrence ([[Moral Hazard|moral hazard]]).
- Benefit schedules under-compensate the seriously injured relative to full tort damages.
- The right to sue is a legal right being removed.
- Disputes migrate from liability to entitlement, whether an injury meets a definition, so litigation is reduced rather than eliminated.

## Effect on the insurer

Under tort, the insurer defends against a stranger's claim. Under no-fault, it adjudicates its own policyholder's claim, which is a [[Duty of Good Faith|good faith]] and [[Market Conduct Regulation|conduct]] relationship rather than an adversarial one.

No-fault shifts cost from severity-driven and volatile (jury awards, tail development) to frequency-driven and bounded by the benefit schedule. This shortens the tail and improves reserve predictability, which is why no-fault provinces have less reserve development risk in auto.

> [!trap] Treating partial no-fault as a ban on suing
> Most Canadian schemes are partial no-fault. The injured person collects accident benefits from their own insurer and may still sue for an injury above the threshold.
