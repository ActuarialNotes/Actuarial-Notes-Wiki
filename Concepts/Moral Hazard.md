---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3dce258c3e2aa859c023655e6a8d4f5abf8e446f427c884b80803405b0514cb3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moral Hazard.md
---

![[Media/Figures/Moral_Hazard.svg|340]]

**Moral Hazard** is the change in an insured's behaviour caused by being insured: less care taken to prevent a loss (*ex ante*), or more cost incurred once a loss has occurred (*ex post*), because someone else pays. It is a consequence of the contract's incentives, unlike [[Adverse Selection|adverse selection]], which is a selection effect at purchase.

Moral hazard takes three forms:

1. **Ex ante moral hazard** is reduced loss prevention. An insured property owner may not install a sprinkler, and a fully insured driver may drive less carefully. It is usually modest in personal lines, because the insured still bears the injury, the inconvenience and the deductible.
2. **Ex post moral hazard** is inflated cost after the loss, and it is the larger effect in practice. Examples are extended treatment under [[Statutory Accident Benefits|accident benefits]], repair chosen over a cheaper alternative, and longer disability duration. It requires no dishonesty, only the absence of a reason to economise.
3. **Provider-side moral hazard** comes from the medical, legal, towing and repair providers, who respond to an insured payer rather than to the claimant. It is often the dominant form, and much of what is described as claimant behaviour in auto insurance is provider behaviour.

## Controls on moral hazard

An insurer limits moral hazard with:

- [[Deductible|Deductibles]] and coinsurance, under which the insured retains part of every loss.
- [[Experience Rating|Experience rating]] and no-claims discounts, under which today's claim raises tomorrow's price.
- Policy limits and exclusions.
- Treatment protocols, such as the [[Minor Injury Guideline]].
- Claims investigation.

> [!example]- How much of the difference between these two deductible groups is moral hazard? {Example}
> An insurer observes the following experience by deductible:
>
> | Deductible | Claim frequency | Average ground-up severity |
> | ---: | ---: | ---: |
> | $\$500$ | $0.082$ | $\$4{,}200$ |
> | $\$2{,}500$ | $0.049$ | $\$5{,}800$ |
>
> > [!answer]-
> > - A $\$2{,}500$ deductible removes every loss below $\$2{,}500$ from the reported count. Those losses occurred but were not reported, so they are not prevented losses.
> > - This truncation alone explains a lower frequency and a higher ground-up severity, because only the larger losses pass the filter.
> > - Policyholders who choose a high deductible are typically those who believe they are good risks, and who are better able to absorb a small loss. The two groups differ before any behaviour changes.
> > - Genuine moral hazard is the residual: with $\$2{,}500$ at stake, the insured takes more care and does not submit marginal claims.
> > - To isolate it, compare the frequency of losses above $\$2{,}500$ only in both groups, controlling for the risk characteristics that drove the choice of deductible.
> > - Any lower frequency left in the high-deductible group after both adjustments is moral hazard. Very little of the raw difference is necessarily moral hazard.

## Moral hazard and fraud

Moral hazard is a rational response to incentives and is legal. Fraud is misrepresentation and is not. Programs are evaluated on how well they manage moral hazard, not on how much fraud they catch.

## Moral hazard in government programs

Moral hazard is the standard criticism of government programs whose benefits are generous and whose funding is not experience-rated. It is the argument against [[Employment Insurance]] regional benefit variation and against uniform [[Workers Compensation Insurance]] assessment rates. It is also the reason [[Disaster Financial Assistance Arrangements|disaster assistance]] is said to discourage flood mitigation.

> [!trap] Reading every difference in claims as moral hazard
> An observed difference in claim experience between two coverage designs is mostly truncation and selection. The behavioural effect is what remains after both are removed.
