---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3026647de31e17d1416422a6702058b879fd2821378a20c3410be345be574fec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moral Hazard.md
---

**Moral Hazard** is the change in an insured's behaviour caused by being insured: less care taken to prevent a loss (*ex ante*), or more cost incurred once a loss has occurred (*ex post*), because someone else pays. It is a behavioural consequence of the contract, not a selection effect at purchase — that is [[Adverse Selection]].

- **Ex ante moral hazard** — reduced loss prevention. An insured property owner may not install the sprinkler; a fully insured driver may drive less carefully. Usually modest in personal lines, because the insured still bears injury, inconvenience and deductible.
- **Ex post moral hazard** — inflated cost after the loss. The larger effect in practice: extended treatment under [[Statutory Accident Benefits|accident benefits]], repair rather than the cheaper alternative, longer disability duration. It requires no dishonesty at all, only the absence of a reason to economise.
- **Provider-side moral hazard** is often the dominant version: the medical, legal, towing and repair providers respond to an insured payer, not the claimant. Much of what is described as claimant behaviour in auto insurance is provider behaviour.
- **Controls:** [[Deductible|deductibles]] and coinsurance (the insured retains part of every loss), [[Experience Rating|experience rating]] and no-claims discounts (today's claim raises tomorrow's price), policy limits, exclusions, treatment protocols such as the [[Minor Injury Guideline]], and claims investigation.
- **Distinguish from fraud.** Moral hazard is a rational response to incentives and is legal; fraud is misrepresentation and is not. Programs are evaluated on how well they manage the former, not on how much of the latter they catch.
- Moral hazard is the standard **criticism of government programs** whose benefits are generous and whose funding is not experience-rated — the argument against [[Employment Insurance]] regional benefit variation and against uniform [[Workers Compensation Insurance]] assessment rates, and the reason [[Disaster Financial Assistance Arrangements|disaster assistance]] is said to discourage flood mitigation.

> [!example]- Deductible as a Moral Hazard Control {Example}
> An insurer observes that policyholders with a $\$500$ deductible have a claim frequency of $0.082$ and those with a $\$2{,}500$ deductible have $0.049$. Average claim severity (ground-up) is $\$4{,}200$ and $\$5{,}800$ respectively.
>
> How much of the difference is moral hazard, and how much is something else?
>
> > [!answer]-
> > Very little of the raw difference is necessarily moral hazard — and identifying the other causes is the point of the question.
> >
> > 1. **Truncation, not behaviour.** A $\$2{,}500$ deductible eliminates every loss below $\$2{,}500$ from the reported count. Losses that occur but are not reported are not prevented losses. This alone explains lower frequency *and* higher observed ground-up severity, since only larger losses survive the filter.
> > 2. **[[Adverse Selection]] in reverse — self-selection.** Policyholders who choose a high deductible are typically those who believe they are good risks, and who are better able to absorb a small loss. The groups differ before any behaviour changes.
> > 3. **Genuine moral hazard**, being the residual: with $\$2{,}500$ at stake, the insured takes more care and does not submit marginal claims.
> >
> > To isolate (3), the analyst must compare **losses above $\$2{,}500$ only** in both groups, and control for the risk characteristics that drove the deductible choice. If frequency above $\$2{,}500$ is still lower in the high-deductible group after controlling for those, the remainder is behaviour.
> >
> > The general lesson for evaluating any insurance program: an observed difference in claim experience between two coverage designs is mostly **truncation and selection**, and the behavioural effect is what remains after both are removed.
