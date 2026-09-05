---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:76085cc292581e53e15b005a9f345e96e819f6a41c30ff72e40d25f0c59d6559
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bad Faith Damages.md
---

**Bad Faith Damages** are damages awarded against an insurer for breaching its [[Duty of Good Faith]] in handling a claim — awarded **in addition to** the policy benefits themselves, and not limited by the policy limit. They compensate the mental distress and consequential harm caused by the insurer's conduct, and where the conduct is sufficiently reprehensible they are accompanied by [[Punitive Damages]].

> $$\text{Total exposure} = \text{Policy benefit} + \text{Aggravated damages} + \text{Punitive damages} + \text{Costs}$$

- **The leading Canadian authority is *Whiten v. Pilot Insurance* (SCC, 2002)**: an insurer denied a fire claim on an unsupported allegation of arson, forcing an impoverished family through a long trial. The Supreme Court upheld $\$1$ million in punitive damages on a policy claim of roughly $\$345{,}000$ — the case candidates should be able to name and summarise.
- **What conduct qualifies:** denial without investigation, allegations of fraud unsupported by evidence, deliberate delay to force a discounted settlement, withholding information, and exploiting the insured's financial vulnerability. Merely being wrong about coverage is not enough.
- **Why it is not capped by the policy limit.** The claim is not on the contract; it arises from an independent breach of the duty owed in performing the contract. A $\$500{,}000$ policy can produce a multi-million dollar judgment.
- **Actuarial consequences:** exposure that cannot be estimated from the policy limit; a **fat, unbounded tail** on claims that look ordinary by limit; correlation with the insurer's own claims practices, so a systemic handling problem produces correlated bad-faith exposure across the book — and can become a [[Class Action]].
- **Reinsurance treatment matters.** Extra-contractual obligations and excess-of-policy-limits exposure are addressed explicitly in treaties, and are often excluded or sub-limited, so the net retained exposure can far exceed the gross-line expectation. This should be tested in the [[FCT]] scenarios.
- The deterrent works only if the award exceeds the profit from the practice — the express reasoning in *Whiten*, and the reason quantum is set by reference to the insurer's conduct rather than the insured's loss.

> [!example]- Exposure Beyond the Limit {Example}
> A homeowner's fire claim of $\$310{,}000$ is denied on an arson allegation the insurer never substantiated. After a four-year trial the court finds the loss covered, awards the policy benefit, $\$60{,}000$ in aggravated damages for mental distress, $\$700{,}000$ in punitive damages, and full costs of $\$240{,}000$. The policy limit is $\$400{,}000$.
>
> What is the insurer's exposure, and what does it imply for reserving?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Total} &= \$310{,}000 + \$60{,}000 + \$700{,}000 + \$240{,}000 \\
> > &= \$1{,}310{,}000
> > \end{align*}$$
> >
> > That is **$3.3$ times the policy limit** on a claim that would have been recorded, at first notice, as a routine fire loss well within limit.
> >
> > Implications:
> >
> > - **Limit-based reserving fails.** No case reserve set from the policy limit could have anticipated this. The exposure attaches to the *handling*, not to the peril.
> > - **The signal is in claims data, not loss data.** The insurer's early warning is complaint volume, denial rates, cycle times and litigation frequency — [[Market Conduct Regulation|conduct]] metrics. An actuary asked to quantify bad-faith exposure should be looking there.
> > - **It is correlated.** If this denial reflected a policy of alleging arson on marginal fire claims, every similar file carries the same exposure, and a [[Class Action]] becomes plausible.
> > - **Check the reinsurance.** If extra-contractual obligations are excluded, the entire $\$1$ million above the policy benefit is net retained.
