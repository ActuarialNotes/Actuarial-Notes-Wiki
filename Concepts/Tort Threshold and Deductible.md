---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b88761f50888055cd646f4df7eed7f88cb1ccf553781323c2b3019a843b2667c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Threshold and Deductible.md
---
![[Media/Figures/Tort_Threshold_and_Deductible.svg|340]]

The **Tort Threshold and Deductible** are the two devices that restrict access to bodily injury lawsuits in a partial [[No-Fault Insurance|no-fault]] auto system. The threshold is a qualitative or quantitative test an injury must meet before a claim for pain and suffering may be brought. The deductible is a fixed amount subtracted from any non-pecuniary award that does get through.

For a claim that clears the threshold, the award paid is

> $$\text{Award paid} = \max\bigl(0,\; \text{Assessed damages} - \text{Deductible}\bigr)$$

- $\text{Assessed damages}$ is the non-pecuniary award the court assesses.

Even a claim that clears the threshold has a substantial amount removed from its non-pecuniary award (in Ontario, tens of thousands of dollars, indexed annually). Because the deductible applies per claim, it eliminates the economics of small claims entirely.

The deductible is typically not disclosed to the jury in Ontario. Awards are therefore sometimes assessed just below the deductible and paid at zero after years of litigation.

> [!example]- What is paid to each of these four claimants for pain and suffering? {Example}
> The verbal threshold requires permanent serious impairment, and the deductible is $\$45{,}000$.
>
> | Claimant | Injury | Assessed damages ($) |
> | :--- | :--- | ---: |
> | A | Soft tissue, recovered in four months | 18,000 |
> | B | Permanent back injury | 40,000 |
> | C | Permanent back injury | 120,000 |
> | D | Catastrophic injuries | 350,000 |
>
> > [!answer]-
> > - A is paid $\$0$. The injury is not permanent or serious, so it fails the threshold and never reaches the deductible.
> > - B is paid $\$0$. The claim clears the threshold, but $\$40{,}000 - \$45{,}000 < 0$, so after years of litigation the claimant recovers nothing on this head.
> > - C is paid $\$120{,}000 - \$45{,}000 = \$75{,}000$, a $38\%$ reduction.
> > - D is paid $\$350{,}000 - \$45{,}000 = \$305{,}000$, a $13\%$ reduction.
> > - Total paid is $\$380{,}000$ against $\$528{,}000$ assessed, a $28\%$ saving.
> > - The deductible takes $100\%$ from B, $38\%$ from C and $13\%$ from D, so within the tort layer it falls hardest on the moderately injured.

## Types of threshold

- A **verbal (qualitative) threshold** requires the injury to be a "permanent serious impairment of an important physical, mental or psychological function," or death. It is Ontario's approach. It is judged case by case, which makes it flexible and litigated.
- A **monetary (quantitative) threshold** requires damages to exceed a stated dollar amount. It is simpler to administer but crude, and it invites damage estimates to cluster just above the line.

## Effect on the severity distribution

The threshold truncates the small claims out of the tort layer, and the deductible shifts what remains downward. The observed average tort award therefore rises after a threshold is introduced, even though total cost falls. In the example above, the mean assessed award of the four claims is $\$528{,}000/4 = \$132{,}000$, while the mean paid award of the two claims that pay is $\$380{,}000/2 = \$190{,}000$.

## Erosion

Savings estimated at enactment decline over time. A verbal threshold is defined by the courts, and each decision that admits a category of injury widens it. A fixed-dollar deductible loses its effect to inflation unless indexed.

> [!trap] Reading a rising average award as a failed reform
> After a threshold is introduced, the average paid award rises because the small claims are gone, not because costs rose. Compare total cost before and after, not the average award.
