---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c5827dab66a444ad8d86e69c7466e5cc1cc35e1575b493c215f60723e0fa683
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Classification Restrictions.md
---

![[Media/Figures/Risk_Classification_Restrictions.svg|340]]

**Risk Classification Restrictions** are regulatory prohibitions on [[Rating Variable|rating variables]] an insurer may otherwise find predictive. In Canadian auto insurance the restricted list typically includes age, sex, marital status (in some provinces), credit score, and limits on [[Territorial Rating|territory]], imposed on **social** grounds even where the variable is statistically valid.

The standard criteria for whether a classification variable is acceptable fall into four groups:

1. **Actuarial**: statistically significant, homogeneous and credible.
2. **Operational**: objective, cheap to verify and not manipulable by the insured.
3. **Social**: privacy, causality, affordability and controllability.
4. **Legal**: permitted in the jurisdiction.

A restriction is the social and legal criteria overriding the actuarial one. A prohibited variable can be highly correlated with loss and still be prohibited. Restrictions differ by province, so a national insurer maintains different classification plans by jurisdiction and cannot simply port a model across the country.

## Consequences of a restriction

Removing a rating variable has four predictable effects:

1. **Cross-subsidy.** Premium is averaged across the groups the variable separated, so cross-subsidy flows from the previously low-rated group to the previously high-rated one.
2. **Proxy variables.** The removed variable's signal migrates into correlated permitted variables. Banning a variable does not remove its influence if a permitted variable stands in for it, which is why territory restrictions and postal-code debates recur ([[Bias in Actuarial Practice]]).
3. **[[Adverse Selection|Adverse selection]].** The better risks in the group that is now overcharged are the most likely to leave, and an insurer that finds a legal proxy can win them.
4. **Availability.** Insurers restrict underwriting of segments they can no longer price, and [[Residual Market|residual market]] volumes grow if the restriction makes some segments unwritable at approved rates.

> [!example]- What are the effects of this ban on age? {Example}
> A province bans the use of age in private passenger auto rating, with no change to the overall rate level. Drivers under $25$ make up $12\%$ of exposures:
>
> | Age group | Share of exposures | Pure premium |
> | :--- | ---: | ---: |
> | Under $25$ | $12\%$ | $\$1{,}200$ |
> | $25$ and over | $88\%$ | $\$600$ |
>
> > [!answer]-
> > - Without age, every driver pays the average pure premium, $0.12 \times \$1{,}200 + 0.88 \times \$600 = \$672$.
> > - Drivers under $25$ pay $\$672$ instead of $\$1{,}200$, a $44\%$ decrease. Drivers $25$ and over pay $\$672$ instead of $\$600$, a $12\%$ increase.
> > - Per million exposures, $120{,}000 \times (\$1{,}200 - \$672) = \$63.4$ million moves from drivers $25$ and over to young drivers.
> > - Insurers reweight toward variables correlated with age, such as years licensed and vehicle type, so part of the signal is recovered.
> > - The drivers $25$ and over are now overcharged, and the best of them are the most likely to shop, so adverse selection rises.
> > - Insurers restrict underwriting of young drivers they can no longer price, and those risks migrate to the [[Facility Association]], where they pay more than $\$1{,}200$. That defeats the affordability purpose of the ban.

> [!trap] Getting the direction of the subsidy backwards
> After a ban, the previously low-rated group pays more and subsidises the previously high-rated group. In the age example the $\$63.4$ million per million exposures flows to the young drivers, not from them.
