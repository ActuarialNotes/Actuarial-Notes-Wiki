---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e9636ddc7b22d39f440d7e066b3f25c1152185e393865e065ba487c42044adc9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bad Faith Damages.md
---

![[Media/Figures/Bad_Faith_Damages.svg|340]]

**Bad Faith Damages** are damages awarded against an insurer for breaching its [[Duty of Good Faith|duty of good faith]] in handling a claim. They are awarded in addition to the policy benefit and are not limited by the policy limit.

An insurer found to have handled a claim in bad faith is exposed to

> $$\text{Exposure} = B + D_A + D_P + \text{Costs}$$

- $B$ is the policy benefit owed under the contract.
- $D_A$ is the aggravated damages, which compensate the mental distress and consequential harm caused by the insurer's conduct.
- $D_P$ is the [[Punitive Damages|punitive damages]], added where the conduct is sufficiently reprehensible.
- $\text{Costs}$ is the legal costs awarded against the insurer.

The award is not capped by the policy limit because the claim is not on the contract. It arises from an independent breach of the duty owed in performing the contract, so a $\$500{,}000$ policy can produce a multi-million dollar judgment.

> [!example]- What is the insurer's total exposure on this claim, and how does it compare with the policy limit? {Example}
> A homeowner's fire claim of $\$310{,}000$ is denied on an arson allegation the insurer never substantiated. After a four-year trial the court finds the loss covered. It awards the policy benefit, $\$60{,}000$ in aggravated damages for mental distress, $\$700{,}000$ in punitive damages and full costs of $\$240{,}000$. The policy limit is $\$400{,}000$.
>
> > [!answer]-
> > - The exposure is $\$310{,}000 + \$60{,}000 + \$700{,}000 + \$240{,}000 = \$1{,}310{,}000$.
> > - That is $1{,}310{,}000 / 400{,}000 = 3.3$ times the policy limit, on a claim recorded at first notice as a routine fire loss within limit.
> > - No case reserve set from the policy limit could have anticipated it, because the exposure attaches to the handling of the claim, not to the peril.

## Conduct that gives rise to bad faith damages

Bad faith damages follow conduct such as:

1. Denial of a claim without investigation.
2. An allegation of fraud unsupported by evidence.
3. Deliberate delay to force a discounted settlement.
4. Withholding information from the insured.
5. Exploiting the insured's financial vulnerability.

Merely being wrong about coverage is not enough.

The leading Canadian authority is *Whiten v. Pilot Insurance* (SCC, 2002). The insurer denied a fire claim on an unsupported allegation of arson and forced an impoverished family through a long trial. The Supreme Court upheld $\$1$ million in [[Punitive Damages|punitive damages]] on a policy claim of roughly $\$345{,}000$. Its express reasoning was that the deterrent works only if the award exceeds the profit from the practice, so the quantum is set by reference to the insurer's conduct rather than the insured's loss.

## Actuarial consequences

Bad faith exposure cannot be estimated from the policy limit. It puts a fat, unbounded tail on claims that look ordinary by limit.

The exposure is correlated with the insurer's own claims practices. A systemic handling problem, such as a practice of alleging arson on marginal fire claims, gives every similar file the same exposure and can become a [[Class Action|class action]]. The early warning is therefore in claims data rather than loss data: complaint volume, denial rates, cycle times and litigation frequency, the [[Market Conduct Regulation|conduct]] metrics.

Reinsurance treaties address extra-contractual obligations and excess-of-policy-limits exposure explicitly, and often exclude or sub-limit them. The net retained exposure can then far exceed the gross-line expectation, which should be tested in the [[FCT]] scenarios. In the example above, an exclusion of extra-contractual obligations would leave the whole $\$1$ million above the policy benefit retained.

> [!trap] Reserving bad faith exposure from the policy limit
> The policy limit bounds the contract claim only. The $\$1{,}310{,}000$ judgment above is 3.3 times a $\$400{,}000$ limit, so a reserve or a reinsurance test capped at the limit misses most of the exposure.
