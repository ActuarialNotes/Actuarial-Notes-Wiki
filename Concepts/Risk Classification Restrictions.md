---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:00fd0180f44332dfdd3fb1c888c261867fd01155e958c5af189be8703a2f8432
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Classification Restrictions.md
---

**Risk Classification Restrictions** are regulatory prohibitions on rating variables an insurer may otherwise find predictive. In Canadian auto insurance the restricted list typically includes age, sex, marital status (in some provinces), credit score, and limits on [[Territorial Rating|territory]] — restrictions imposed on **social** grounds even where the variable is statistically valid.

- The regulator's test is not "does it predict?" but **"is it acceptable to price on this?"** — a distinction candidates must be able to hold. A prohibited variable can be highly correlated with loss and still be prohibited.
- **Standard criteria** for whether a classification variable is acceptable: actuarial (statistically significant, homogeneous, credible), operational (objective, cheap to verify, not manipulable), social (privacy, causality, affordability, controllability) and legal (permitted in the jurisdiction). Restrictions are the *social* and *legal* criteria overriding the actuarial one.
- **Consequences of a restriction** are predictable and appear on every exam: the removed variable's signal migrates into correlated **proxy** variables; cross-subsidy flows from the previously low-rated group to the previously high-rated one; [[Adverse Selection|adverse selection]] increases as the accurately-priced group's better risks leave; and [[Residual Market|residual market]] volumes grow if the restriction makes some segments unwritable at approved rates.
- **Proxy effects cut both ways.** Banning a variable does not remove its influence if a permitted variable stands in for it, which is why territory restrictions and postal-code debates recur — see [[Bias in Actuarial Practice]].
- Restrictions differ by province, so a national insurer maintains different classification plans by jurisdiction and cannot simply port a model across the country.

> [!example]- What Happens When a Variable Is Banned {Example}
> A province bans the use of **age** in private passenger auto rating, effective immediately, with no change to the overall rate level. Currently, drivers under $25$ have a pure premium of $\$1{,}200$ and drivers $25$ and over $\$600$; the under-$25$ group is $12\%$ of exposures.
>
> Describe the effects.
>
> > [!answer]-
> > The class-free average pure premium:
> >
> > $$\begin{align*}
> > \bar{P} &= 0.12(\$1{,}200) + 0.88(\$600) \\
> > &= \$144 + \$528 \\
> > &= \$672
> > \end{align*}$$
> >
> > Effects, in order of appearance:
> >
> > 1. **Cross-subsidy.** Under-$25$ drivers pay $\$672$ instead of $\$1{,}200$ — a $44\%$ decrease; over-$25$ drivers pay $\$672$ instead of $\$600$ — a $12\%$ increase. Roughly $\$63$ million per million exposures moves from young drivers to everyone else.
> > 2. **Proxy substitution.** Insurers reweight toward variables correlated with age — years licensed, vehicle type, marital status where permitted — recovering part of the signal. The ban is therefore *partly* undone in practice, which is why regulators often ban a cluster of variables rather than one.
> > 3. **[[Adverse Selection]].** Over-$25$ drivers are now overcharged; the best of them are the most likely to shop, and any insurer that finds a legal proxy can skim them. The insurer that moves last is left with the young drivers.
> > 4. **Availability.** Insurers restrict underwriting of segments they can no longer price, so young-driver risks migrate to the [[Facility Association]] — where they pay more than $\$1{,}200$, defeating the affordability purpose of the ban.
> >
> > The honest summary is that a classification ban redistributes cost and degrades market efficiency; whether that trade is worth making is a policy judgement, not an actuarial one. The actuary's role is to quantify it, clearly, before it is made.
