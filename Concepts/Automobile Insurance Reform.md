---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e9487eca79f6274c69e4a9f4da36d17ad1a366fa0d8af308b184544e7804e0a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Automobile Insurance Reform.md
---

**Automobile Insurance Reform** is the periodic legislative restructuring of a province's compulsory auto product — changing what is covered, who may sue, and how much benefit is payable — undertaken when premiums become politically unaffordable. Reform targets **cost**, because under [[Rate Regulation|rate regulation]] the only durable way to lower price is to lower the cost of the product.

> $$\text{Premium} \approx \frac{\text{Frequency} \times \text{Severity}}{1 - \text{Expense \& Profit}}$$

- **The reform cycle** repeats across provinces and decades: costs rise faster than approved rates → affordability crisis and availability problems → legislative reform reducing benefits or access to [[Tort Litigation|tort]] → an initial premium reduction → cost creep back through claiming behaviour, judicial interpretation and inflation → the next crisis. Candidates should be able to narrate this cycle and explain why each stage follows.
- **The levers**, roughly in order of savings delivered:
  - Restricting access to tort — a [[Tort Threshold and Deductible|threshold or deductible]] on pain-and-suffering claims.
  - Capping or defining benefits — the [[Minor Injury Guideline]] cap, [[Catastrophic Impairment]] definitions, medical/rehabilitation limits.
  - Converting coverage to first-party — [[Direct Compensation Property Damage]], [[No-Fault Insurance|no-fault]] accident benefits.
  - Attacking cost drivers directly — fraud investigation, towing and storage regulation, treatment protocols, dispute-resolution reform.
- **Estimating reform savings** is the actuary's hard problem, and the standard errors are: assuming full and immediate effect; ignoring **cost migration** to the benefit heads left uncapped; ignoring behavioural response by claimants, counsel and providers; and ignoring judicial reinterpretation that erodes a definition over time.
- Savings emerge over the **payout tail**, so the first-year premium effect and the ultimate cost effect are different numbers. Filing one as the other is a classic error.
- Ontario (repeatedly since 1990) and Alberta (the 2004 minor-injury cap and subsequent reviews) are the two reform histories the syllabus covers in detail; the pattern in each is the same.

> [!example]- Pricing an Enacted Reform {Example}
> A province enacts a reform effective January 1 that caps minor-injury awards. An insurer's actuary must reflect it in a rate filing for policies written during the following twelve months. Bodily injury is $55\%$ of total loss cost, and industry analysis estimates the cap removes $20\%$ of BI cost.
>
> The insurer's data covers accident years before the reform. Outline the calculation and the traps.
>
> > [!answer]-
> > The reform adjustment applies to the BI portion only:
> >
> > $$\begin{align*}
> > \text{Savings} &= 0.55 \times 0.20 \\
> > &= 0.11
> > \end{align*}$$
> >
> > So historical loss costs are multiplied by $1 - 0.11 = 0.89$ to restate them at the post-reform benefit level, **before** trending forward.
> >
> > The traps, each of which has produced a rejected filing:
> >
> > - **Order of operations.** Restate to the current benefit level *first*, then trend. Trending unadjusted history and then applying the reform factor gives a different (and wrong) answer, because trend compounds on the pre-reform cost base.
> > - **Trend period.** Post-reform, the BI trend itself may differ from the historical trend — a cap converts part of a severity-driven trend into a frequency-driven one. Continuing to use the historical BI trend can overstate future cost.
> > - **Migration.** If minor-injury claimants shift to accident-benefit heads or press for a [[Catastrophic Impairment]] designation, part of the $20\%$ reappears elsewhere. A prudent filing quantifies this rather than assuming it away.
> > - **Erosion.** The $20\%$ is an estimate at enactment. Once courts begin interpreting the cap's boundary, savings historically shrink. The filing should say so and the [[FCT]] adverse scenario should test it.
