---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:add1b8fe1f777e75f02cec3c6859c6347906e25438fbd9247dd3b1c0b38711a6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Educational Note.md
---

**An Educational Note** is guidance published by the [[Canadian Institute of Actuaries (CIA)]] describing how the [[Standards of Practice]] may be applied in a particular situation. Educational notes are **not binding**: they illustrate accepted practice rather than defining it, and an actuary may depart from one — but must be prepared to explain why.

- **Their place in the hierarchy:** **Rules of Professional Conduct** (binding conduct), **Standards of Practice** (binding practice), **educational notes** (non-binding guidance), and **research and discussion papers** (informational only). Confusing a note with a standard, in either direction, is a common error.
- **Why they matter in practice.** The standards are principles-based and deliberately do not prescribe methods. Educational notes fill the gap — on [[IFRS 17]] application, [[IFRS 17 Discount Rates|discount rate]] construction, the [[Risk Adjustment for Non-Financial Risk|risk adjustment]], the [[Premium Allocation Approach|PAA]], [[Reinsurance Accounting|reinsurance]] treatment, [[FCT]], [[Runoff|run-off]] and wind-up valuations, [[Materiality]], and [[Subsequent Events]]. In a new area they are frequently the only detailed guidance available.
- **They are effectively expected.** An actuary who ignores a directly applicable educational note without explanation will be challenged by the [[External Auditor]], by [[OSFI]], and in any [[Peer Review]]. "Non-binding" describes their legal status, not the practical expectation.
- **They can conflict or lag.** Notes issued at different times may not be fully consistent, and one written before a standard changed may be superseded in part. The actuary must work out which guidance is current, and the standards prevail over any note.
- **Draft notes** circulated for comment carry less weight than final ones, but in a genuinely new area — as during the [[Transition to IFRS 17]] — a draft note may be the best available statement of emerging practice, and using it with disclosure is defensible.

> [!example]- Departing From an Educational Note {Example}
> A CIA educational note on constructing the [[IFRS 17 Discount Rates|IFRS 17 discount curve]] describes a bottom-up approach with an illiquidity premium derived from a specified reference portfolio. An insurer's [[Appointed Actuary]] concludes that its liabilities are considerably less liquid than the reference portfolio assumes and uses a higher illiquidity premium, raising the discount rate by $30$ basis points and reducing the [[Liability for Incurred Claims|LIC]] by $\$14$ million.
>
> Is this acceptable?
>
> > [!answer]-
> > **Yes, potentially — the note is not binding — but it is acceptable only if properly supported and disclosed**, and the burden is entirely on the actuary.
> >
> > **What must be present:**
> >
> > 1. **A reasoned basis.** [[IFRS 17]] requires the discount rate to reflect the **liquidity characteristics of the insurance contracts**. If this insurer's liabilities genuinely have a different liquidity profile from the reference portfolio, a different premium is not merely permitted — it is required by the standard, which outranks the note.
> > 2. **Evidence, not assertion.** The claim needs support: the payout profile, the absence of surrender or acceleration options, comparison with observable instruments of similar illiquidity. "Our liabilities feel illiquid" is not a basis.
> > 3. **Disclosure.** The [[Appointed Actuary's Report]] must state the departure, the reason, and the **$\$14$ million effect**. The financial statement [[Notes to Financial Statements|notes]] must disclose the methodology so readers can compare with other insurers.
> > 4. **Consistency.** The same reasoning must be applied every year, in both directions. Adopting a higher premium in a year when a lower liability is convenient, and reverting later, is a result-driven selection.
> >
> > **The test to apply.** $\$14$ million is [[Materiality|material]] on most balance sheets, and it moves the result in the insurer's favour — so it will attract the auditor's and OSFI's attention. The question the actuary should ask before signing is whether the reasoning would have been adopted had it moved $\$14$ million the *other* way. If not, the departure is not a technical judgement, and the note should have been followed.
