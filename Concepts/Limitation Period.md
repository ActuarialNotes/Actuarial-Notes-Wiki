---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8e419224f55320368e542823106bad7b2ed953ddd69a539823a166eba495292c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Limitation Period.md
---

![[Media/Figures/Limitation_Period.svg|340]]

A **Limitation Period** is the statutory deadline for starting a legal proceeding. Once it expires the claim is barred however meritorious it is, so limitation law determines when an insurer's exposure to unreported claims ends.

The modern Canadian model, with Ontario's *Limitations Act, 2002* as the template, has two periods:

1. A **basic limitation period** of two years from discovery.
2. An **ultimate limitation period** of fifteen years from the act or omission, regardless of discovery.

Policy conditions impose their own, shorter, notice requirements. Statutory limitation periods generally override contractual attempts to shorten them below the statutory floor.

## Discoverability

**Discoverability** is the doctrine that starts the two-year clock when the claimant knew or ought reasonably to have known that the injury occurred, was caused by the defendant and warranted a proceeding, not when the act occurred. It is what allows latent-injury and long-tail claims to surface decades later.

## Tolling

**Tolling** suspends the clock for minors, for persons under disability, and while the parties are engaged in a statutory dispute-resolution process. A claim by an infant can therefore be brought many years after the accident, which is why paediatric bodily injury claims have long reporting tails.

## Effect on reserves

The limitation period defines the IBNR reporting tail. Shortening it truncates late reporting and releases reserves. Lengthening it, or a decision expanding discoverability, extends the tail on claims already incurred, so the change moves reserves on business already written. The largest Canadian example is sexual abuse claims, for which several provinces removed the limitation period entirely. That change created liability on policies written decades earlier.

> [!example]- What is the actuarial problem when a limitation period is removed retroactively? {Example}
> A province abolishes the limitation period for claims arising from sexual abuse, with retroactive effect. An insurer wrote general liability for institutional clients from 1970 to 2000, with policies typically carrying $\$1$ million occurrence limits.
>
> > [!answer]-
> > - The insurer now has exposure on policies it stopped writing decades ago, priced with no allowance for these claims.
> > - No development triangle exists for a claim type that could not previously be brought, so standard development methods fail.
> > - Reporting is driven by social and legal factors, such as public inquiries, media coverage and other institutions' settlements, not by an exposure base.
> > - Coverage is uncertain too: which policy year responds, whether abuse is an occurrence, whether intentional-act exclusions apply, and how multiple years stack.
> > - The actuary can estimate from exposure, identifying the insured institutions at risk, estimating claims per institution from other jurisdictions' emergence, and applying limits policy year by policy year.
> > - The result is a range of scenarios with their drivers stated, a large [[Risk Adjustment for Non-Financial Risk|risk adjustment]], [[FCT]] scenario testing, and a review of whether recoveries on the old reinsurance treaties are collectible.

## Prescription in Quebec

Quebec's *prescription* periods under the *Civil Code of Québec* serve the same function with different rules. The period for personal injury is three years, running from the manifestation of the injury.

> [!trap] Treating the limitation period as running from the accident
> Under discoverability the basic period runs from when the claimant knew or ought to have known of the claim, and tolling can suspend it. A reporting tail cut off two years after the accident date will be too short.
