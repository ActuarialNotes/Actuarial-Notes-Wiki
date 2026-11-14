---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6478aeec8356144f34ad888480236b15c3ffe792af1eb7f323ce19af66112217
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Automobile Insurance Reform.md
---

![[Media/Figures/Automobile_Insurance_Reform.svg|340]]

**Automobile Insurance Reform** is the periodic legislative restructuring of a province's compulsory auto product, changing what is covered, who may sue and how much benefit is payable, undertaken when premiums become politically unaffordable. Reform targets cost, because under [[Rate Regulation|rate regulation]] the only durable way to lower the price is to lower the cost of the product.

The reform cycle repeats across provinces and decades:

1. Costs rise faster than approved rates.
2. An affordability crisis and availability problems follow.
3. A legislative reform reduces benefits or access to [[Tort Litigation|tort]].
4. Premiums fall at first.
5. Costs creep back through claiming behaviour, judicial interpretation and inflation, leading to the next crisis.

Ontario (repeatedly since 1990) and Alberta (the 2004 minor-injury cap and the reviews after it) are the two reform histories the syllabus covers in detail, and each follows the same pattern.

## The levers of reform

Roughly in order of the savings they deliver, a reform can:

1. Restrict access to tort, with a [[Tort Threshold and Deductible|threshold or deductible]] on pain-and-suffering claims.
2. Cap or define benefits, as with the [[Minor Injury Guideline]] cap, [[Catastrophic Impairment]] definitions and medical and rehabilitation limits.
3. Convert coverage to first-party, as with [[Direct Compensation Property Damage]] and [[No-Fault Insurance|no-fault]] accident benefits.
4. Attack cost drivers directly, through fraud investigation, towing and storage regulation, treatment protocols and dispute-resolution reform.

## Reflecting a reform in rates

A reform that removes a share $r$ of the cost of a coverage that is a share $w$ of total loss cost saves

> $$\text{Savings} = w \times r$$

of total loss cost. Historical loss costs from before the reform are multiplied by $1 - \text{Savings}$ to restate them at the post-reform benefit level. A claim is affected by the reform according to its accident date, so claims occurring on or after the effective date are already at the post-reform level and are not adjusted.

> [!example]- How should the actuary restate this insurer's pre-reform loss costs? {Example}
> A province enacts a reform effective January 1 that caps minor-injury awards. The insurer's rate filing covers policies written in the following twelve months, and its data covers accident years before the reform. Bodily injury (BI) is $55\%$ of total loss cost, and industry analysis estimates the cap removes $20\%$ of BI cost.
>
> > [!answer]-
> > - The reform affects the BI portion only, so the savings are $0.55 \times 0.20 = 0.11$ of total loss cost.
> > - Every accident year in the data is before the reform, so each year's loss costs are multiplied by $1 - 0.11 = 0.89$.
> > - The restated loss costs are at the post-reform benefit level, ready to be trended forward.

Savings emerge over the payout tail, so the first-year premium effect and the ultimate cost effect are different numbers. Estimates of savings also go wrong in four standard ways:

1. Assuming the reform takes full and immediate effect.
2. Ignoring cost migration to the benefit heads left uncapped. In the example, minor-injury claimants who shift to accident-benefit heads or press for a [[Catastrophic Impairment]] designation bring part of the $20\%$ back.
3. Ignoring the behavioural response of claimants, counsel and providers.
4. Ignoring judicial reinterpretation, which erodes a definition over time. Once courts begin interpreting a cap's boundary, savings have historically shrunk, and the [[FCT]] adverse scenario should test it.

After a reform, the BI trend itself may differ from the historical trend, because a cap converts part of a severity-driven trend into a frequency-driven one. Continuing to use the historical BI trend can overstate future cost.

> [!trap] Fitting trend to unadjusted history
> Restate the history to the post-reform level before measuring and applying trend. A trend fitted to loss costs that span the reform includes the reform's one-time drop, so it understates the underlying trend.
