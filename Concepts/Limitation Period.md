---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4743f13ada3518fb0ae7b97c899c52aa1ea2f753cf45d7e8b23d4708081790fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Limitation Period.md
---

**A Limitation Period** is the statutory deadline for starting a legal proceeding. Once it expires the claim is barred no matter how meritorious it is, so limitation law determines when an insurer's exposure to unreported claims finally ends — and a change to it moves reserves on business already written.

- **The modern Canadian model** (Ontario's *Limitations Act, 2002* is the template) is a **basic limitation period of two years from discovery**, subject to an **ultimate limitation period** of fifteen years from the act or omission regardless of discovery.
- **Discoverability** is the doctrine that makes the two-year clock start when the claimant knew or ought reasonably to have known that the injury occurred, was caused by the defendant, and warranted a proceeding — not when the act occurred. It is what allows latent-injury and long-tail claims to surface decades later.
- **Tolling** suspends the clock for minors, for persons under disability, and while the parties are engaged in a statutory dispute-resolution process. A claim by an infant can therefore be brought many years after the accident, which is why paediatric bodily injury claims have such long reporting tails.
- **Actuarial consequences:** the limitation period defines the **IBNR reporting tail**. Shortening it truncates late reporting and releases reserve; lengthening it, or a decision expanding discoverability, extends the tail on **claims already incurred**. Sexual abuse claims, where several provinces removed the limitation period entirely, are the largest Canadian example — a legislative change that created liability on policies written decades earlier.
- Policy conditions impose their own, shorter, **notice** requirements, but statutory limitation periods generally override contractual attempts to shorten them below the statutory floor.
- Quebec's *prescription* periods under the *Civil Code of Québec* serve the same function with different rules — three years for personal injury, running from manifestation of the injury.

> [!example]- A Limitation Period Is Removed {Example}
> A province abolishes the limitation period for claims arising from sexual abuse, with retroactive effect. An insurer wrote general liability for institutional clients from 1970 to 2000, with policies typically carrying $\$1$ million occurrence limits.
>
> What is the actuarial problem?
>
> > [!answer]-
> > The insurer now has exposure on policies it stopped writing decades ago, priced with no allowance for this, and the ordinary reserving toolkit is unusable.
> >
> > **Why standard methods fail:**
> >
> > - No development triangle exists for a claim type that could not previously be brought. Historical patterns describe a legal regime that no longer applies.
> > - Reporting is driven by **social and legal factors** — public inquiries, media coverage, other institutions' settlements — not by an exposure base. Frequency is essentially unforecastable from the insurer's own data.
> > - Coverage questions are as uncertain as frequency: which policy year responds (occurrence versus manifestation), whether abuse is an "occurrence," whether intentional-act exclusions apply, and how multiple years stack.
> >
> > **What the actuary can actually do:**
> >
> > 1. **Exposure-based estimation.** Identify insured institutions of the type at risk, estimate claims per institution from other jurisdictions' emergence, and apply limits and attachment points policy year by policy year.
> > 2. **Scenario ranges, not a point estimate.** Present low/central/high with the drivers stated. A single number here conveys false precision.
> > 3. **A large [[Risk Adjustment for Non-Financial Risk|risk adjustment]]**, reflecting genuine parameter and model uncertainty rather than process variance.
> > 4. **[[FCT]] scenario testing** — this is the archetype of a latent liability that can threaten financial condition, and it belongs in front of the board.
> > 5. **Check the reinsurance.** Recoveries on thirty-year-old treaties depend on wordings, aggregate limits and, critically, whether those reinsurers are still solvent and collectible.
